from fastapi import FastAPI, UploadFile, File, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
import io
import json
from dotenv import load_dotenv

# FastAPI security and router dependencies
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, status
from sqlalchemy.orm import Session
import jwt

# Database and Analysis Logic
from database import Base, engine, get_db, User
from auth import verify_password, get_password_hash, create_access_token, SECRET_KEY, ALGORITHM
from agents import analyze_cv_with_agents
from fallback_engine import extract_fallback_analysis
from pypdf import PdfReader

load_dotenv()

# Create tables in sqlite file specifically on launch (fail-safe)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="CV Analyzer API")

# Setup CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Recommendation(BaseModel):
    role: str
    match: int
    company: str
    location: str
    salary: str
    type: str # e.g. "Full-time", "Contract"
    logo: str # An image URL or a DiceBear seed URL like "https://api.dicebear.com/7.x/initials/svg?seed=Company"

class MissingSkill(BaseModel):
    skill: str
    courseName: str
    platform: str
    link: str

class AnalysisResult(BaseModel):
    score: int
    topSkills: List[str]
    missingSkills: List[MissingSkill]
    recommendations: List[Recommendation]

# ==== AUTHENTICATION SCHEMAS & ENDPOINTS ====
class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
        
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/api/register", response_model=Token)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email is already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = User(name=user.name, email=user.email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(data={"sub": new_user.email, "name": new_user.name})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/login", response_model=Token)
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Use OAuth2 form 'username' mapping to our 'email' column
    db_user = db.query(User).filter(User.email == form_data.username).first()
    if not db_user or not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": db_user.email, "name": db_user.name})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/me")
def read_users_me(current_user: User = Depends(get_current_user)):
    return {"name": current_user.name, "email": current_user.email}

@app.get("/api/dashboard")
def get_dashboard(current_user: User = Depends(get_current_user)):
    if current_user.cv_data:
        return json.loads(current_user.cv_data)
    return None

@app.post("/api/analyze-cv", response_model=AnalysisResult)
async def analyze_cv(file: UploadFile = File(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    print(f"Received file: {file.filename}")
    
    # Check for API Key
    if not os.getenv("GEMINI_API_KEY"):
         raise HTTPException(status_code=500, detail="Gemini API Key is missing. Please add it to the .env file.")

    try:
        # Read the uploaded file
        contents = await file.read()
        
        # Extract raw text for the fallback mechanism
        extracted_text = ""
        try:
            if file.filename.endswith(".pdf"):
                pdf_reader = PdfReader(io.BytesIO(contents))
                for page in pdf_reader.pages:
                    extracted_text += page.extract_text() + "\n"
            else:
                extracted_text = contents.decode("utf-8", errors="ignore")
        except:
            extracted_text = str(contents)

        try:
            # Process the file via AI
            result = await analyze_cv_with_agents(contents, file.filename)
            result_dict = result.dict() if hasattr(result, "dict") else result
            current_user.cv_data = json.dumps(result_dict)
            db.commit()
            return result
            
        except Exception as ai_e:
            import traceback
            traceback.print_exc()
            print(f"API failed. Falling back to local engine. Error: {ai_e}")
            fallback_data = extract_fallback_analysis(extracted_text)
            current_user.cv_data = json.dumps(fallback_data)
            db.commit()
            return AnalysisResult(**fallback_data)
            
    except Exception as general_error:
        print(f"Critical System Error: {general_error}")
        raise HTTPException(status_code=500, detail="A critical server error occurred.")

class ChatRequest(BaseModel):
    message: str
    contextSkills: List[MissingSkill] = []

@app.post("/api/chat")
async def chat_with_bot(request: ChatRequest):
    # This is a safe fallback to provide rich responses without hitting API limits
    msg = request.message.lower()
    skills = request.contextSkills
    
    import asyncio
    await asyncio.sleep(1) # simulate thinking
    
    if "skill" in msg or "missing" in msg or "gap" in msg:
        if not skills:
            return {"reply": "Please upload your CV first so I can analyze your missing skills!"}
        
        reply = "Here are your primary skill gaps and the exact courses I found for you:\n\n"
        for s in skills:
            reply += f"• **{s.skill}**: [{s.courseName}]({s.link}) on {s.platform}\n"
        return {"reply": reply}
        
    elif "cert" in msg or "aws" in msg or "azure" in msg:
        return {"reply": "Certifications are a massive resume booster! Based on current market data, the **AWS Certified Solutions Architect** is the most requested cert for Senior roles. You should prioritize the Udemy course I linked in your Learning Path."}
        
    elif "job" in msg or "role" in msg or "apply" in msg:
        return {"reply": "With your React and Node.js background, you should look for **Full Stack Engineer** or **Frontend Developer** roles. Focus on companies like Stripe or Vercel!"}
        
    elif "hello" in msg or "hi" in msg:
        return {"reply": "Hello! I am your AI Career Coach. Ask me about your missing skills, course recommendations, or job roles!"}
        
    else:
        return {"reply": "That's a great question! For your specific career trajectory, I'd highly recommend focusing on the gaps identified in your CV analysis. Ask me about your 'missing skills' for strict course URLs."}
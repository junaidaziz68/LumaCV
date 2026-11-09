# LumaCV - CV Analyzer & Career Coach

LumaCV is a full-stack AI-powered application designed to analyze CVs/resumes, provide career insights, identify skill gaps, and suggest learning paths and job roles.

## Prerequisites

Before running the application, ensure you have the following installed:
- **Node.js** (v18.x or later)
- **Python** (v3.9 or later)
- **npm** (v9.x or later)
- **pip** (v23.x or later)

---

## 1. Backend Setup (FastAPI)

The backend handles CV parsing, AI analysis via Google Gemini, and user authentication using SQLite.

1. **Navigate to the Backend directory:**
   ```bash
   cd BackEnd
   ```

2. **Create and activate a virtual environment (Recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration:**
   Create a `.env` file in the `BackEnd` directory with your Google Gemini API Key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

5. **Start the Backend Server:**
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   *The backend will be available at `http://127.0.0.1:8000`.*

---

## 2. Frontend Setup (React + Vite)

The frontend provides the interactive user interface for uploading CVs and viewing analysis dashboard components.

1. **Navigate to the Frontend directory:**
   ```bash
   cd FrontEnd
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   *The frontend will typically be available at `http://localhost:5173`.*

---

## 3. Using the Application

1. **Access the Website:** Open your browser and navigate to `http://localhost:5173`.
2. **Register/Login:** Create a new account or log in with your credentials.
3. **Upload CV:** On the dashboard, upload your CV in PDF or TXT format.
4. **AI Analysis:** The system will process your CV and generate:
   - Match scores for various roles.
   - Identified top skills.
   - Missing skills and recommended learning paths (courses).
   - A list of matching job roles.
5. **Career Coaching:** Use the integrated Chatbot widget to ask questions about your career path.

---

## Technical Stack
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend:** FastAPI (Python), SQLAlchemy, PyJWT, PyPDF.
- **AI Models:** Google Gemini AI (via LangChain).
- **Database:** SQLite (local file: `luma_cv.db`).

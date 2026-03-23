import os
import io
from pypdf import PdfReader
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel, Field
from typing import List

# Define the Pydantic schema for the LLM output.
# This forces the LLM to return JSON in the exact structure our frontend expects.
class Recommendation(BaseModel):
    role: str = Field(description="A recommended job role based on the skillset.")
    match: str = Field(description="A percentage match as a string, e.g., '92%'.")

class MissingSkill(BaseModel):
    skill: str = Field(description="The name of the missing skill or certification.")
    courseName: str = Field(description="The exact title of a recommended course to learn this skill.")
    platform: str = Field(description="The provider platform, strictly ONE of: Kaggle, Udemy, or Coursera.")
    link: str = Field(description="A realistic search URL or direct link for the course on the platform.")

class SkillsAnalysisOutput(BaseModel):
    score: int = Field(description="An overall score for the CV from 0 to 100 based on market competitiveness.")
    topSkills: List[str] = Field(description="A highly curated list of exactly 6-8 of the strongest skills found.")
    missingSkills: List[MissingSkill] = Field(description="A targeted list of 3-5 critical skills or certifications the candidate is missing for senior roles, complete with course recommendations.")
    recommendations: List[Recommendation] = Field(description="Exactly 3 top role recommendations with match percentages.")

# The Agentic Workflow Function
async def analyze_cv_with_agents(file_content: bytes, filename: str):
    # STEP 1: Text Extraction (Data Prep)
    extracted_text = ""
    if filename.endswith(".pdf"):
        pdf_reader = PdfReader(io.BytesIO(file_content))
        for page in pdf_reader.pages:
             extracted_text += page.extract_text() + "\n"
    elif filename.endswith(".txt"):
        extracted_text = file_content.decode("utf-8")
    else:
        extracted_text = file_content.decode("utf-8", errors="ignore")

    # Initialize the LLM for all agents
    llm = ChatGoogleGenerativeAI(temperature=0.3, model="gemini-2.0-flash")
    
    # ==========================================
    # AGENT 1: The "Critic" Agent
    # Focuses solely on finding technical gaps
    # ==========================================
    print("[Agent Workflow] -> Analyst Agent is reviewing the CV...")
    critic_prompt = PromptTemplate.from_template(
        "You are a strict Technical Screener. Analyze this CV and list 3 critical missing technical skills or certifications that prevent them from reaching a Senior level. Only output a comma-separated list of 3 skills.\n\nCV:\n{cv_text}"
    )
    critic_chain = critic_prompt | llm
    
    # ==========================================
    # AGENT 2: The "Researcher" Agent
    # Focuses on finding specific Coursera/Udemy/Kaggle courses to fix the gaps
    # ==========================================
    print("[Agent Workflow] -> Researcher Agent is finding corresponding courses...")
    researcher_prompt = PromptTemplate.from_template(
        "You are an Educational Researcher. Given these 3 missing skills: '{missing_skills}', recommend exactly one highly-rated course from Kaggle, Udemy, or Coursera for each skill. Output a short description of the courses."
    )
    researcher_chain = researcher_prompt | llm
    
    # ==========================================
    # AGENT 3: The "Manager" Agent
    # Synthesizes all information into the strict JSON schema for the frontend
    # ==========================================
    print("[Agent Workflow] -> Manager Agent is formatting the final JSON packet...")
    parser = JsonOutputParser(pydantic_object=SkillsAnalysisOutput)
    manager_prompt = PromptTemplate(
        template="""You are the Lead Career Strategist.
        You have the original CV, the Critic's gap analysis, and the Researcher's course recommendations.
        Combine all this into the final structured JSON response. Include the top skills you found in the CV, the missing skills with their matched courses, and 3 recommended job roles.
        For each recommended job role, invent a highly realistic matching Company, Location (e.g. Remote, San Francisco), Salary Range (e.g. $140k - $160k), Job Type (e.g. Full-time, Contract), and provide a logo URL strictly using this format: https://api.dicebear.com/7.x/initials/svg?seed=[CompanyInitials].
        
        CV:
        {cv_text}
        
        Critic's Gaps:
        {gaps}
        
        Researcher's Courses:
        {courses}
        
        {format_instructions}""",
        input_variables=["cv_text", "gaps", "courses"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    manager_chain = manager_prompt | llm | parser

    # ==========================================
    # ORCHESTRATE THE AGENT PIPELINE
    # ==========================================
    try:
        # We pass data sequentially between the autonomous agents
        cv_snippet = extracted_text[:8000]
        
        # 1. Critic acts
        gaps_result = await critic_chain.ainvoke({"cv_text": cv_snippet})
        
        # 2. Researcher acts based on Critic
        courses_result = await researcher_chain.ainvoke({"missing_skills": gaps_result.content})
        
        # 3. Manager synthesizes
        final_result = await manager_chain.ainvoke({
            "cv_text": cv_snippet,
            "gaps": gaps_result.content,
            "courses": courses_result.content
        })
        
        print("[Agent Workflow] -> Pipeline completed successfully.")
        return final_result
        
    except Exception as e:
        print(f"[Agent Workflow Error]: {e}")
        # In case the pipeline fails (e.g., Gemini Quota), raise to main.py to trigger the seamless mock fallback
        raise e

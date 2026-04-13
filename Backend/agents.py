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

# Analyze the CV text
async def analyze_cv_with_agents(file_content: bytes, filename: str):
    # Extract text based on file format
    extracted_text = ""
    if filename.endswith(".pdf"):
        pdf_reader = PdfReader(io.BytesIO(file_content))
        for page in pdf_reader.pages:
             extracted_text += page.extract_text() + "\n"
    elif filename.endswith(".txt"):
        extracted_text = file_content.decode("utf-8")
    else:
        extracted_text = file_content.decode("utf-8", errors="ignore")

    # Set up the LLM model
    llm = ChatGoogleGenerativeAI(temperature=0.3, model="gemini-2.0-flash")
    
    print("Reviewing the CV...")
    
    # Create the prompt combined with instructions
    parser = JsonOutputParser(pydantic_object=SkillsAnalysisOutput)
    prompt = PromptTemplate(
        template="""You are an expert Career Strategist, Technical Screener, and Educational Researcher. Analyse the given CV and output the response matching the JSON schema.
        
        Follow these exact steps:
        1. Identify the top 6-8 strongest skills from the CV.
        2. Give an overall score from 0-100 based on market competitiveness.
        3. Identify EXACTLY 3 critical missing technical skills or certifications that prevent them from reaching a Senior level in their field.
        4. For EACH missing skill, recommend exactly one highly-rated course strictly from Kaggle, Udemy, or Coursera (include a realistic specific course name and realistic search URL).
        5. Recommend exactly 3 top job roles. For each, invent a highly realistic matching Company, Location (e.g. Remote, San Francisco), Salary Range (e.g. $140k - $160k), Job Type (e.g. Full-time, Contract), and provide a logo URL strictly using this format: https://api.dicebear.com/7.x/initials/svg?seed=[CompanyInitials].
        
        CV:
        {cv_text}
        
        {format_instructions}""",
        input_variables=["cv_text"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    
    chain = prompt | llm | parser

    try:
        cv_snippet = extracted_text[:8000]
        
        final_result = await chain.ainvoke({"cv_text": cv_snippet})
        
        print("Pipeline completed.")
        return final_result
        
    except Exception as e:
        print(f"Error during analysis: {e}")
        # Throw exception to fall back to the local NLP engine
        raise e

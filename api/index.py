"""
Vercel Serverless Function entry point.
Wraps the FastAPI app from BackEnd/main.py for deployment.
"""
import sys
import os

# Add the BackEnd directory to the Python path so imports resolve
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'BackEnd'))

from main import app

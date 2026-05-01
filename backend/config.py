import os
from dotenv import load_dotenv

# Explicitly point to the .env file
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

class Config:
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    SQLALCHEMY_DATABASE_URI = "sqlite:///museum.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    GROQ_MODEL = "llama-3.3-70b-versatile"
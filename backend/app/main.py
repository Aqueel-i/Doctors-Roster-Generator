from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import roster  # Ensure this is the correct import path for your roster.py

app = FastAPI(title="Doctor Roster Generator API")

# Allow frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(roster.router, prefix="/api")  # Make sure this line is correctly included

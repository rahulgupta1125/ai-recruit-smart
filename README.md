# AI-Powered Job Recruitment Platform

A mobile-first full-stack web platform that connects job seekers and employers using AI-powered tools for resume analysis job matching and interview evaluation.

## Features

Mobile-first responsive UI with Tailwind CSS  
Secure JWT authentication with role-based access (Job Seeker and Employer)  
AI Resume Analyzer Extracts and evaluates resume content for grammar ATS relevance and skills  
Video Interview Evaluator Assesses tone confidence and clarity using AI (FER and Wav2Vec2)  
AI-Based Job Matching Recommends jobs and highlights skill gaps using Sentence-BERT  
Modular scalable architecture (React Redux Node.js Python microservices)  
Cloud-ready deployment setup (Vercel Render Fly.io)

## Tech Stack

### Frontend

React.js and Tailwind CSS  
Redux Toolkit for state management  
React Router for page navigation  
react-hook-form and yup for form validation

### Backend

Node.js and Express  
JWT-based auth (access and refresh tokens)  
PostgreSQL via Supabase

### AI Microservices (Python - FastAPI)

Resume text parsing using pdfminer.six and python-docx  
NLP models such as spaCy transformers Sentence-BERT  
Video and audio evaluation using OpenCV FER and Wav2Vec2

## Folder Structure

/frontend  
  /components  
  /pages  
  /store  
  App.js  
  index.js  

/backend  
  /routes  
  /controllers  
  /middleware  
  server.js  

/ai-services  
  resumeService.py  
  matchEngine.py  
  videoEvaluator.py

## Setup Instructions

### 1 Clone the Repository

git clone https://github.com/satheeshbhukya/job-recruitment-platform.git  
cd job-recruitment-platform

### 2 Environment Variables

Create a .env file in both /frontend and /backend with appropriate values

Example

JWT_SECRET=your_jwt_secret  
DATABASE_URL=your_database_url  
STRIPE_SECRET_KEY=your_stripe_key

### 3 Install Dependencies

Frontend  
cd frontend  
npm install  

Backend  
cd ../backend  
npm install  

AI Services (Python)  
cd ../ai-services  
pip install -r requirements.txt

### 4 Run Locally

Frontend  
npm start from /frontend  

Backend  
node server.js from /backend  

AI Services  
uvicorn resumeService:app --reload

## Deployment

Frontend Vercel  
Backend Render or Railway  
Python AI Services Fly.io or Docker

## Roadmap / Future Enhancements

AI-based interview question generator  
Admin dashboard with analytics  
Multi-language support  
OAuth login integration Google or LinkedIn

## License

This project is licensed under the MIT License

## Acknowledgements

HuggingFace Transformers  
OpenAI  
Stripe  
Supabase


import React from "react";
import Chatbot from "@/components/Chatbot";

const InterviewQuestionGenerator: React.FC = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">AI Interview Question Generator</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Get personalized interview questions based on your job title, industry, or specific skills.
        Our AI will generate relevant questions to help you prepare for your next interview.
      </p>
      
      <div className="grid grid-cols-1 gap-8">
        <Chatbot 
          title="Interview Question Generator" 
          placeholder="Enter job title, industry, or skills (e.g., 'Software Engineer', 'Healthcare', 'Project Management')"
          initialMessage="Hello! I can help generate tailored interview questions for your job search. Please enter a job title, industry, or specific skills you'd like questions for."
        />
      </div>
    </div>
  );
};

export default InterviewQuestionGenerator;

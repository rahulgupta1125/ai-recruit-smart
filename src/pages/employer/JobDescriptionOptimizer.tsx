
import React from "react";
import Chatbot from "@/components/Chatbot";

const JobDescriptionOptimizer: React.FC = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">AI Job Description Optimizer</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Create compelling and inclusive job descriptions that attract the right talent.
        Our AI will help you optimize your job postings for maximum engagement and qualified applicants.
      </p>
      
      <div className="grid grid-cols-1 gap-8">
        <Chatbot 
          title="Job Description Optimizer" 
          placeholder="Enter job title or paste your current job description to optimize"
          initialMessage="Welcome! I can help you create compelling job descriptions that attract top talent. Please enter a job title or paste an existing job description to get started."
        />
      </div>
    </div>
  );
};

export default JobDescriptionOptimizer;

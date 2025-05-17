
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 lg:py-32 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container relative">
          <div className="flex flex-col gap-4 md:max-w-[75%]">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl animate-fade-in">
              AI-Powered Recruitment Platform
            </h1>
            <p className="text-lg md:text-xl text-white/80 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Connect talent with opportunity using cutting-edge AI technology. Our platform helps job seekers 
              find the perfect match and employers hire the ideal candidates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Link to="/register">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90">
                  Get Started
                </Button>
              </Link>
              <Link to="/job-seeker/resume-analyzer">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
                  Try Resume Analyzer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">AI-Driven Recruitment Tools</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform uses cutting-edge AI technology to revolutionize the recruitment process
              for both job seekers and employers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-2 border-brand-100 transition-all duration-300 hover:shadow-lg hover:border-brand-300">
              <CardHeader>
                <div className="w-12 h-12 flex items-center justify-center bg-brand-100 rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-700"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                </div>
                <CardTitle>Resume Analyzer</CardTitle>
                <CardDescription>
                  AI-powered resume scanning and enhancement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Upload your resume and get instant feedback on how to improve it for ATS systems.
                  Our AI analyzes keyword density, grammar, formatting, and much more.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/job-seeker/resume-analyzer" className="text-brand-600 hover:text-brand-700 font-medium">
                  Try It Now →
                </Link>
              </CardFooter>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 border-brand-100 transition-all duration-300 hover:shadow-lg hover:border-brand-300">
              <CardHeader>
                <div className="w-12 h-12 flex items-center justify-center bg-brand-100 rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-700"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg>
                </div>
                <CardTitle>Video Interview Evaluator</CardTitle>
                <CardDescription>
                  Practice and improve your interview skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Record a short video pitch and our AI will analyze your facial expressions,
                  voice clarity, and confidence. Get personalized tips to ace your next interview.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/job-seeker/interviews" className="text-brand-600 hover:text-brand-700 font-medium">
                  Start Practicing →
                </Link>
              </CardFooter>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 border-brand-100 transition-all duration-300 hover:shadow-lg hover:border-brand-300">
              <CardHeader>
                <div className="w-12 h-12 flex items-center justify-center bg-brand-100 rounded-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-700"><path d="M20 20v-5h-5"></path><path d="M4 20L20 4"></path><path d="M15 4h5v5"></path><path d="M4 15l5 5"></path></svg>
                </div>
                <CardTitle>AI Job Matching</CardTitle>
                <CardDescription>
                  Find the perfect job match with AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our AI compares your skills and experience with job requirements to find
                  the perfect matches. It also identifies skill gaps and suggests training.
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/job-seeker/job-matches" className="text-brand-600 hover:text-brand-700 font-medium">
                  Find Matches →
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container">
          <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-accent1-600 p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-4 md:w-3/5">
                <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to transform your job search?</h3>
                <p className="text-white text-opacity-90 text-lg">
                  Join thousands who have already found their dream jobs using our AI-powered platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register?role=job_seeker">
                  <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90 w-full sm:w-auto">
                    Job Seekers Sign Up
                  </Button>
                </Link>
                <Link to="/register?role=employer">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 w-full sm:w-auto">
                    Employers Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © 2025 TalentMatchAI. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

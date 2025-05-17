
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";

const JobSeekerDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for dashboard
  const profileCompletion = 65;
  const recentJobs = [
    {
      id: "job1",
      title: "Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      matchScore: 92,
    },
    {
      id: "job2",
      title: "UX Designer",
      company: "Creative Solutions",
      location: "New York, NY",
      matchScore: 87,
    },
    {
      id: "job3",
      title: "Product Manager",
      company: "Innovate Ltd.",
      location: "San Francisco, CA",
      matchScore: 78,
    },
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Job Seeker Dashboard</h1>

      {/* Welcome Card */}
      <Card className="mb-8">
        <CardHeader className="bg-brand-50 rounded-t-lg">
          <CardTitle>Welcome back, {user?.name}!</CardTitle>
          <CardDescription>Here's an overview of your job search progress</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Profile Completion</span>
                <span className="text-sm font-medium">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Jobs Applied</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Interviews</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-muted-foreground">Resume Score</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Link to="/job-seeker/profile">
            <Button variant="outline">Complete Your Profile</Button>
          </Link>
          <Link to="/job-seeker/job-matches">
            <Button>View Job Matches</Button>
          </Link>
        </CardFooter>
      </Card>

      {/* AI Tools Section */}
      <h2 className="text-2xl font-bold mb-4">AI Career Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Resume Analyzer Card */}
        <Card className="border-2 border-brand-100 hover:border-brand-400 transition-all duration-300">
          <CardHeader>
            <CardTitle>Resume Analyzer</CardTitle>
            <CardDescription>Get AI feedback on your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Upload your resume and receive instant AI-powered feedback to improve your chances of getting interviews.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/job-seeker/resume-analyzer" className="w-full">
              <Button className="w-full">Analyze Resume</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Interview Practice Card */}
        <Card className="border-2 border-brand-100 hover:border-brand-400 transition-all duration-300">
          <CardHeader>
            <CardTitle>Interview Practice</CardTitle>
            <CardDescription>Practice with AI feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Record practice interviews and get AI analysis on your confidence, clarity, and presentation skills.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/job-seeker/interviews" className="w-full">
              <Button className="w-full">Practice Interviews</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Skill Gap Analysis Card */}
        <Card className="border-2 border-brand-100 hover:border-brand-400 transition-all duration-300">
          <CardHeader>
            <CardTitle>Skill Gap Analysis</CardTitle>
            <CardDescription>Discover skills to develop</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Identify skill gaps between your profile and desired jobs, with personalized learning recommendations.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/job-seeker/skill-analysis" className="w-full">
              <Button className="w-full">Analyze Skills</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Job Matches */}
      <h2 className="text-2xl font-bold mb-4">Top Job Matches</h2>
      <div className="grid grid-cols-1 gap-4">
        {recentJobs.map((job) => (
          <Card key={job.id} className="overflow-hidden border">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                <p className="text-muted-foreground">{job.company} • {job.location}</p>
              </div>
              <div className="flex items-center gap-4 p-6 bg-muted md:bg-transparent">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-600">{job.matchScore}%</div>
                  <div className="text-xs text-muted-foreground">Match</div>
                </div>
                <Button size="sm">
                  View Job
                </Button>
              </div>
            </div>
          </Card>
        ))}
        <div className="mt-4">
          <Link to="/job-seeker/job-matches">
            <Button variant="outline" className="w-full">View All Job Matches</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;

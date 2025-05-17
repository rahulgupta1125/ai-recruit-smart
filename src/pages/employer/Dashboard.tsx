
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EmployerDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for dashboard
  const profileCompletion = 70;
  const activeJobs = [
    {
      id: "job1",
      title: "Senior Frontend Developer",
      location: "Remote",
      applications: 18,
      daysLeft: 12,
    },
    {
      id: "job2",
      title: "Product Designer",
      location: "New York, NY",
      applications: 24,
      daysLeft: 8,
    },
  ];
  
  const topCandidates = [
    {
      id: "candidate1",
      name: "Sarah Johnson",
      role: "Frontend Developer",
      matchScore: 94,
    },
    {
      id: "candidate2",
      name: "Michael Chen",
      role: "UX Designer",
      matchScore: 89,
    },
    {
      id: "candidate3",
      name: "Emily Rodriguez",
      role: "Product Manager",
      matchScore: 85,
    },
  ];

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Employer Dashboard</h1>

      {/* Welcome Card */}
      <Card className="mb-8">
        <CardHeader className="bg-brand-50 rounded-t-lg">
          <CardTitle>Welcome back, {user?.name}!</CardTitle>
          <CardDescription>Here's an overview of your recruitment activity</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Company Profile Completion</span>
                <span className="text-sm font-medium">{profileCompletion}%</span>
              </div>
              <Progress value={profileCompletion} className="h-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">42</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-muted-foreground">Interview Requests</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Link to="/employer/profile">
            <Button variant="outline">Complete Company Profile</Button>
          </Link>
          <Link to="/employer/post-job">
            <Button>Post a New Job</Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Tabs for Jobs and Candidates */}
      <Tabs defaultValue="jobs" className="mb-8">
        <TabsList className="w-full grid grid-cols-2 mb-4">
          <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
          <TabsTrigger value="candidates">Top Candidates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs">
          <div className="grid grid-cols-1 gap-4">
            {activeJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden border">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                    <p className="text-muted-foreground">{job.location}</p>
                  </div>
                  <div className="flex items-center gap-6 p-6 bg-muted md:bg-transparent">
                    <div className="text-center">
                      <div className="text-lg font-bold">{job.applications}</div>
                      <div className="text-xs text-muted-foreground">Applications</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{job.daysLeft} days</div>
                      <div className="text-xs text-muted-foreground">Remaining</div>
                    </div>
                    <Button size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            <div className="mt-4">
              <Link to="/employer/jobs">
                <Button variant="outline" className="w-full">Manage All Jobs</Button>
              </Link>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="candidates">
          <div className="grid grid-cols-1 gap-4">
            {topCandidates.map((candidate) => (
              <Card key={candidate.id} className="overflow-hidden border">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-1">{candidate.name}</h3>
                    <p className="text-muted-foreground">{candidate.role}</p>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-muted md:bg-transparent">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-600">{candidate.matchScore}%</div>
                      <div className="text-xs text-muted-foreground">Match</div>
                    </div>
                    <Button size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            <div className="mt-4">
              <Link to="/employer/candidates">
                <Button variant="outline" className="w-full">View All Candidates</Button>
              </Link>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Tools for Employers */}
      <h2 className="text-2xl font-bold mb-4">AI Recruitment Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Resume Screening Card */}
        <Card className="border-2 border-brand-100 hover:border-brand-400 transition-all duration-300">
          <CardHeader>
            <CardTitle>AI Resume Screening</CardTitle>
            <CardDescription>Automate candidate screening</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Let our AI analyze resumes to find the best candidates that match your job requirements.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/employer/ai-screening" className="w-full">
              <Button className="w-full">Screen Candidates</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Job Description Optimizer */}
        <Card className="border-2 border-brand-100 hover:border-brand-400 transition-all duration-300">
          <CardHeader>
            <CardTitle>Job Description Optimizer</CardTitle>
            <CardDescription>Attract better candidates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Optimize your job descriptions with AI to attract qualified candidates and improve application quality.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/employer/job-optimizer" className="w-full">
              <Button className="w-full">Optimize Descriptions</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Interview Question Generator */}
        <Card className="border-2 border-brand-100 hover:border-brand-400 transition-all duration-300">
          <CardHeader>
            <CardTitle>Interview Question Generator</CardTitle>
            <CardDescription>Tailored interview questions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Generate role-specific interview questions that help identify the best candidates for your positions.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/employer/question-generator" className="w-full">
              <Button className="w-full">Generate Questions</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EmployerDashboard;

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for registered job seekers
interface JobSeeker {
  id: string;
  name: string;
  email: string;
  resumeUploaded: boolean;
  score?: number;
}

const mockJobSeekers: JobSeeker[] = [
  { id: "1", name: "Alex Johnson", email: "alex@example.com", resumeUploaded: true, score: 87 },
  { id: "2", name: "Jamie Smith", email: "jamie@example.com", resumeUploaded: true, score: 76 },
  { id: "3", name: "Taylor Brown", email: "taylor@example.com", resumeUploaded: false },
];

const ResumeAnalyzer: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<null | {
    overallScore: number;
    keywordScore: number;
    grammarScore: number;
    atsScore: number;
    skillsBalance: number;
    suggestions: string[];
  }>(null);
  const [jobSeekers, setJobSeekers] = useState<JobSeeker[]>([]);
  const [viewMode, setViewMode] = useState<"analyzer" | "jobSeekers">("analyzer");
  const { user } = useAuth();
  
  useEffect(() => {
    // In a real app, fetch this data from the backend
    // For now, we'll use mock data
    setJobSeekers(mockJobSeekers);
  }, []);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (fileExtension !== 'pdf' && fileExtension !== 'docx') {
      toast({
        title: "Invalid File Format",
        description: "Please upload a PDF or DOCX file.",
        variant: "destructive",
      });
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {  // 5MB limit
      toast({
        title: "File Too Large",
        description: "File size should not exceed 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    setFile(file);
    toast({
      title: "File Ready",
      description: `File "${file.name}" ready to analyze.`,
    });
  };
  
  const analyzeResume = () => {
    if (!file) {
      toast({
        title: "No File",
        description: "Please upload a resume first.",
        variant: "destructive",
      });
      return;
    }
    
    setAnalyzing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock analysis results
      setResults({
        overallScore: 78,
        keywordScore: 85,
        grammarScore: 92,
        atsScore: 72,
        skillsBalance: 62,
        suggestions: [
          "Add more quantifiable achievements to highlight your impact",
          "Include more industry-specific keywords to improve ATS score",
          "Balance your technical and soft skills section",
          "Consider adding a brief professional summary at the top",
          "Make sure to customize your resume for each specific job application"
        ]
      });
      setAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Resume analysis has been completed successfully.",
      });
    }, 3000);
  };
  
  const resetAnalysis = () => {
    setFile(null);
    setResults(null);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">AI Resume Analyzer</h1>
      <p className="text-muted-foreground mb-8 max-w-2xl">
        Upload your resume to receive an AI-powered analysis that helps you improve your chances 
        of landing interviews. Get feedback on ATS compatibility, keyword optimization, and more.
      </p>
      
      {user?.role === "employer" && (
        <div className="mb-6">
          <div className="flex space-x-4 mb-4">
            <Button
              variant={viewMode === "analyzer" ? "default" : "outline"}
              onClick={() => setViewMode("analyzer")}
            >
              Resume Analyzer
            </Button>
            <Button
              variant={viewMode === "jobSeekers" ? "default" : "outline"}
              onClick={() => setViewMode("jobSeekers")}
            >
              Registered Job Seekers
            </Button>
          </div>
        </div>
      )}
      
      {viewMode === "jobSeekers" && user?.role === "employer" ? (
        <Card>
          <CardHeader>
            <CardTitle>Registered Job Seekers</CardTitle>
            <CardDescription>
              View all job seekers who have registered on the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            {jobSeekers.length > 0 ? (
              <div className="divide-y">
                {jobSeekers.map(seeker => (
                  <div key={seeker.id} className="py-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{seeker.name}</h3>
                      <p className="text-sm text-muted-foreground">{seeker.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {seeker.resumeUploaded ? (
                        <>
                          <span className="text-sm font-medium">
                            Score: {seeker.score}/100
                          </span>
                          <Button size="sm">View Resume</Button>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          No resume uploaded
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No job seekers have registered yet.</p>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Upload Resume</CardTitle>
                <CardDescription>
                  Supported formats: PDF, DOCX (Max 5MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'bg-muted border-primary' : 'border-border'} transition-colors cursor-pointer`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('resume-upload')?.click()}
                >
                  <input 
                    type="file" 
                    id="resume-upload" 
                    className="hidden" 
                    accept=".pdf,.docx" 
                    onChange={handleFileInput}
                  />
                  <div className="flex flex-col items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    {file ? (
                      <div>
                        <p className="font-medium mb-1">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-medium mb-1">Drag and drop your resume or click to browse</p>
                        <p className="text-sm text-muted-foreground">PDF or DOCX files only</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-3">
                  <Button 
                    onClick={analyzeResume}
                    disabled={!file || analyzing} 
                    className="w-full"
                  >
                    {analyzing ? (
                      <>
                        <span className="animate-spin mr-2">⚪</span>
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Resume"
                    )}
                  </Button>
                  {file && (
                    <Button variant="outline" onClick={resetAnalysis} disabled={analyzing} className="flex-shrink-0">
                      Reset
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {!results && (
              <Card>
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                      <div className="bg-muted rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-medium">Upload Your Resume</h4>
                        <p className="text-sm text-muted-foreground">PDF or DOCX format, up to 5MB</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start">
                      <div className="bg-muted rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-medium">AI Analysis</h4>
                        <p className="text-sm text-muted-foreground">Our AI analyzes keywords, grammar, formatting, and ATS compatibility</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start">
                      <div className="bg-muted rounded-full w-7 h-7 flex items-center justify-center flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-medium">Get Actionable Feedback</h4>
                        <p className="text-sm text-muted-foreground">Review specific recommendations to improve your resume</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="lg:col-span-3">
            {results ? (
              <>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Resume Analysis Results</CardTitle>
                    <CardDescription>
                      Overall Score: <span className="font-semibold">{results.overallScore}/100</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Overall Score */}
                      <div className="mb-8">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Overall Score</span>
                        </div>
                        <div className="relative">
                          <Progress value={results.overallScore} className="h-2" />
                          <div 
                            className="absolute top-0 w-px h-6 bg-black transform -translate-y-2"
                            style={{ left: `75%` }}
                          />
                          <div className="text-xs text-muted-foreground mt-1">
                            <span className="absolute -translate-x-1/2" style={{ left: `75%` }}>
                              Industry Avg
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Score Breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Keyword Density */}
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Keyword Optimization</span>
                            <span className="text-sm font-medium">{results.keywordScore}/100</span>
                          </div>
                          <Progress value={results.keywordScore} className="h-2" />
                        </div>

                        {/* Grammar & Clarity */}
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Grammar & Clarity</span>
                            <span className="text-sm font-medium">{results.grammarScore}/100</span>
                          </div>
                          <Progress value={results.grammarScore} className="h-2" />
                        </div>

                        {/* ATS Compatibility */}
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">ATS Compatibility</span>
                            <span className="text-sm font-medium">{results.atsScore}/100</span>
                          </div>
                          <Progress value={results.atsScore} className="h-2" />
                        </div>

                        {/* Skills Balance */}
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Technical/Soft Skills Balance</span>
                            <span className="text-sm font-medium">{results.skillsBalance}/100</span>
                          </div>
                          <Progress value={results.skillsBalance} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Recommendations</CardTitle>
                    <CardDescription>
                      Action items to enhance your resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {results.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex gap-3 items-start">
                          <div className="flex-shrink-0 bg-accent rounded-full w-6 h-6 flex items-center justify-center text-accent-foreground text-sm">
                            {index + 1}
                          </div>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <Card className="w-full border-dashed">
                  <CardContent className="p-12 text-center">
                    <div className="flex flex-col items-center gap-2 mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                      <h3 className="text-xl font-medium">Analysis Results Will Appear Here</h3>
                      <p className="text-muted-foreground">
                        Upload your resume and click "Analyze Resume" to see detailed feedback and scores
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;

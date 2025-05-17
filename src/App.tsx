
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobSeekerDashboard from "./pages/job-seeker/Dashboard";
import EmployerDashboard from "./pages/employer/Dashboard";
import ResumeAnalyzer from "./pages/job-seeker/ResumeAnalyzer";
import InterviewQuestionGenerator from "./pages/job-seeker/InterviewQuestionGenerator";
import JobDescriptionOptimizer from "./pages/employer/JobDescriptionOptimizer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Job seeker protected routes */}
                <Route 
                  path="/job-seeker/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={["job_seeker"]}>
                      <JobSeekerDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/job-seeker/resume-analyzer" 
                  element={
                    <ProtectedRoute allowedRoles={["job_seeker", "employer"]}>
                      <ResumeAnalyzer />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/job-seeker/interview-questions" 
                  element={
                    <ProtectedRoute allowedRoles={["job_seeker"]}>
                      <InterviewQuestionGenerator />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Employer protected routes */}
                <Route 
                  path="/employer/dashboard" 
                  element={
                    <ProtectedRoute allowedRoles={["employer"]}>
                      <EmployerDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/employer/job-description-optimizer" 
                  element={
                    <ProtectedRoute allowedRoles={["employer"]}>
                      <JobDescriptionOptimizer />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

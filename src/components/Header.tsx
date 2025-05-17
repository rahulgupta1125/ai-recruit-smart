
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="font-bold text-xl text-primary">
            TalentMatch<span className="text-secondary">AI</span>
          </div>
        </Link>

        {/* Mobile menu button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  {user?.role === "job_seeker" ? (
                    <>
                      <Link
                        to="/job-seeker/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/job-seeker/resume-analyzer"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        Resume Analyzer
                      </Link>
                      <Link
                        to="/job-seeker/interviews"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        Video Interviews
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/employer/dashboard"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/employer/post-job"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        Post Job
                      </Link>
                      <Link
                        to="/employer/candidates"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        Candidates
                      </Link>
                    </>
                  )}
                  <Button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <div className="flex items-center">
                <span className="mr-4">
                  Hi, {user?.name} ({user?.role === "job_seeker" ? "Job Seeker" : "Employer"})
                </span>
                <Button onClick={logout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

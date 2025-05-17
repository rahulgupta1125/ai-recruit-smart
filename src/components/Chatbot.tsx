
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatbotProps {
  title: string;
  placeholder: string;
  initialMessage?: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ title, placeholder, initialMessage }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add initial message if provided
    if (initialMessage) {
      setMessages([{ role: "assistant", content: initialMessage }]);
    }
  }, [initialMessage]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // In a real implementation, you would make an API call to Gemini here
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response based on user input
      let response = "";
      
      if (title.includes("Interview")) {
        response = `Here are some interview questions based on your input: "${input}"\n\n1. Tell me about your experience with ${input}.\n2. How have you solved problems related to ${input} in your previous roles?\n3. What skills do you think are most important for working with ${input}?\n4. Describe a challenging situation involving ${input} and how you handled it.\n5. How do you stay updated with the latest trends in ${input}?`;
      } else {
        response = `Here's an optimized job description for: "${input}"\n\n# ${input.toUpperCase()} SPECIALIST\n\n## About the Role\nWe are seeking a talented ${input} specialist to join our innovative team. In this role, you will leverage your expertise to drive results and contribute to our company's success.\n\n## Key Responsibilities\n- Lead ${input} initiatives from concept to completion\n- Collaborate with cross-functional teams on ${input} projects\n- Analyze ${input} performance and provide strategic recommendations\n- Stay updated with industry trends related to ${input}\n\n## Qualifications\n- Proven experience in ${input} or related field\n- Strong communication and analytical skills\n- Problem-solving mindset and attention to detail\n- Passion for innovation and continuous improvement`;
      }
      
      // Add assistant response
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-[600px]">
      <CardContent className="flex flex-col h-full p-0">
        <div className="bg-primary p-3 text-primary-foreground font-medium">
          {title}
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="resize-none"
              rows={3}
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="shrink-0"
            >
              {isLoading ? "Loading..." : "Send"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Chatbot;

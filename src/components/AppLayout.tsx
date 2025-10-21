import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  // Get initial state from localStorage
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AppSidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      <main className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "lg:ml-64" : "lg:ml-20"
      )}>
        <div className={cn(
          "mx-auto max-w-[1600px] transition-all duration-300",
          sidebarOpen ? "px-4 md:px-6 lg:px-8" : "px-6 md:px-8 lg:px-10",
          className
        )}>
          {children}
        </div>
      </main>
    </div>
  );
}
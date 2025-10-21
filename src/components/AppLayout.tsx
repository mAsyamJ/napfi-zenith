import { useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { AppSidebar } from "@/components/AppSidebar";

export function AppLayout({ children, className }: { children: React.ReactNode; className?: string }) {
  const { isOpen: sidebarOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-black via-background to-transparent pointer-events-none" />
      
      {/* Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-96 bg-[#ffffff] opacity-[0.02] blur-[100px] pointer-events-none" />
      
      {/* Bottom Blue Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#26a0da]/20 via-[#26a0da]/5 to-transparent pointer-events-none" />
      
      {/* Bottom Dark Gradient (layered over blue) */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-background/80 to-transparent pointer-events-none" />
      
      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-96 bg-[#ffffff] opacity-[0.02] blur-[100px] pointer-events-none" />

      <div className="flex relative z-10">
        <AppSidebar />
        <main 
          className={cn(
            "flex-1 min-h-screen w-full transition-all duration-300 ease-in-out",
            sidebarOpen ? "lg:ml-64" : "lg:ml-20"
          )}
        >
          <div className={cn(
            "container mx-auto max-w-[1600px] p-4 md:p-6 lg:p-8 transition-all duration-300",
            className
          )}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

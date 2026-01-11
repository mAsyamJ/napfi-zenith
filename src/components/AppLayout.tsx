import { useEffect } from "react";
import { cn } from "@/lib/utils";
import AIChat from "@/components/AIChat";

export function AppLayout({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[#26a0da]/5 to-background relative overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#26a0da]/10 to-background pointer-events-none" />

      {/* Additional Gradient Accents */}
      <div className="absolute bottom-0 left-0 w-full h-[120%] bg-gradient-to-tr from-[#26a0da]/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-[120%] bg-gradient-to-bl from-[#26a0da]/10 via-transparent to-transparent pointer-events-none" />

      {/* Soft Glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#26a0da] opacity-[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#ffffff] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="flex relative z-10">
        <main className={cn("flex-1 min-h-screen w-full transition-all duration-300 ease-in-out")}>
          <div className={cn(
            "container mx-auto max-w-[1600px] p-4 md:p-6 lg:p-8 transition-all duration-300",
            className
          )}>
            {children}
          </div>
        </main>
      </div>
      <AIChat />
    </div>
  );
}

import { useState } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Droplets,
  Vote,
  Lock,
  Sparkles,
  Settings,
  FileText,
  Menu,
  X,
  Bot,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  icon: any;
  href: string;
}

const mainNavItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Swap", icon: ArrowLeftRight, href: "/swap" },
  { title: "Liquidity", icon: Droplets, href: "/liquidity" },
  { title: "Vote", icon: Vote, href: "/vote" },
  { title: "Lock", icon: Lock, href: "/lock" },
  { title: "Incentivize", icon: Sparkles, href: "/incentivize" },
];

const aiNavItems: NavItem[] = [
  { title: "AI Assistant", icon: Bot, href: "/ai" },
];

const deploymentNavItems: NavItem[] = [
  { title: "Deployments", icon: Rocket, href: "/deployments" },
];

const bottomNavItems: NavItem[] = [
  { title: "Settings", icon: Settings, href: "/settings" },
  { title: "Terms of Use", icon: FileText, href: "/terms" },
];

interface AppSidebarProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function AppSidebar({ isOpen: propIsOpen, onOpenChange }: AppSidebarProps) {
  const ctx = (() => {
    try {
      return useSidebar();
    } catch (e) {
      return undefined as any;
    }
  })();

  const [isOpenInternal, setIsOpenInternal] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Prefer prop, then context, then internal state
  const isOpen = propIsOpen ?? ctx?.isOpen ?? isOpenInternal;
  const setIsOpen = (value: boolean) => {
    if (propIsOpen !== undefined) {
      onOpenChange?.(value);
    } else if (ctx) {
      ctx.setIsOpen(value);
    } else {
      setIsOpenInternal(value);
    }
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-card/80 backdrop-blur-sm"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-[#0B0E11] border-r border-border/50 z-40 transition-all duration-300 ease-in-out flex flex-col shadow-2xl",
          isOpen ? "w-64" : "w-20",
          // Mobile responsive
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header with Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-border/50">
          {isOpen && (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-fade-in">
              NapFi
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:flex ml-auto hover:bg-primary/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                    isActive
                      ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                  )
                }
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && (
                  <span className="font-medium animate-fade-in">{item.title}</span>
                )}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-card rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-border">
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                )}
              </NavLink>
            );
          })}

          {/* AI Section */}
          {isOpen && (
            <div className="pt-6">
              <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                AI
              </h3>
              {aiNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                        isActive
                          ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                          : "text-muted-foreground hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      )
                    }
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium animate-fade-in">{item.title}</span>
                  </NavLink>
                );
              })}
            </div>
          )}

          {!isOpen && (
            <div className="pt-6">
              {aiNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                        isActive
                          ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                          : "text-muted-foreground hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      )
                    }
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="absolute left-full ml-2 px-3 py-2 bg-card rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-border">
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          )}

          {/* Deployment Section */}
          {isOpen && (
            <div className="pt-4">
              <h3 className="px-3 mb-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                Deployment
              </h3>
              {deploymentNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                        isActive
                          ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                          : "text-muted-foreground hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      )
                    }
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium animate-fade-in">{item.title}</span>
                  </NavLink>
                );
              })}
            </div>
          )}

          {!isOpen && (
            <div className="pt-4">
              {deploymentNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                        isActive
                          ? "bg-primary/20 text-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                          : "text-muted-foreground hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      )
                    }
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="absolute left-full ml-2 px-3 py-2 bg-card rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-border">
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          )}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-3 py-4 border-t border-border/50 space-y-1">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  )
                }
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {isOpen && (
                  <span className="text-sm font-medium animate-fade-in">
                    {item.title}
                  </span>
                )}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-card rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-border">
                    <span className="text-xs font-medium">{item.title}</span>
                  </div>
                )}
              </NavLink>
            );
          })}
        </div>
      </aside>
    </>
  );
}

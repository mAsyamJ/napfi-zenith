import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const TopNav = () => {
  const NavGroup = ({ label, children }: { label: string; children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const handleEnter = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setOpen(true);
    };

    const handleLeave = () => {
      // delay closing so user can move into menu
      timeoutRef.current = window.setTimeout(() => {
        setOpen(false);
        timeoutRef.current = null;
      }, 250);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    }, []);

    return (
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
        className="relative"
      >
        <DropdownMenu open={open} onOpenChange={(v) => setOpen(v)}>
          <DropdownMenuTrigger asChild>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
              {label}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" sideOffset={6} className="min-w-[12rem]">
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <header className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-background/80 backdrop-blur-md border border-border rounded-2xl shadow-lg px-4 sm:px-6">
          <div className="flex items-center justify-between py-4 gap-3">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-lg font-semibold text-foreground tracking-tight font-jakarta">
                NapaFi
              </Link>

              {/* Desktop grouped nav */}
              <nav className="hidden md:flex items-center gap-6">
                <NavGroup label="Explore">
                  <DropdownMenuLabel>Explore</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/">Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/Dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/portfolio">Portfolio</Link>
                  </DropdownMenuItem>
                </NavGroup>

                <NavGroup label="Trade">
                  <DropdownMenuLabel>Trading</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/swap">Swap</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/liquidity">Liquidity</Link>
                  </DropdownMenuItem>
                </NavGroup>

                <NavGroup label="Governance">
                  <DropdownMenuLabel>Governance</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/vote">Vote</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/lock">Lock</Link>
                  </DropdownMenuItem>
                </NavGroup>

                <NavGroup label="Deploy">
                  <DropdownMenuLabel>Deployments</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/deployments">Portal</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/deploy/token">Deploy Token</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/deploy/vault">Deploy Vault</Link>
                  </DropdownMenuItem>
                </NavGroup>

                <NavGroup label="Resources">
                  <DropdownMenuLabel>Resources</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <a href="#">Documentation</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/Whitepaper.pdf">Whitepaper</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/terms">Terms</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                </NavGroup>
              </nav>

              {/* Mobile: simple links */}
              <nav className="md:hidden flex items-center gap-4">
                <Link to="/" className="text-sm font-medium text-muted-foreground">Explore</Link>
                <Link to="/swap" className="text-sm font-medium text-muted-foreground">Swap</Link>
                <Link to="/deployments" className="text-sm font-medium text-muted-foreground">Deploy</Link>
              </nav>
            </div>

            <button
              className="relative h-10 min-w-[120px] px-4 rounded-full overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #ff6fb3 0%, #3ba6ff 50%, #e26a4c 100%)',
                boxShadow: '0 8px 24px rgba(59, 166, 255, 0.35), 0 2px 6px rgba(0, 0, 0, 0.25)'
              }}
            >
              <span className="relative z-10 text-white font-semibold text-sm">Connect Wallet</span>
              <span className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20" style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -8px 18px rgba(59,166,255,0.25)' }} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

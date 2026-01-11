import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export const TopNav = () => {
  const NavGroup = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => {
    const [open, setOpen] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

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
      }, 150);
    };

    const handleMenuEnter = () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const handleMenuLeave = () => {
      setOpen(false);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
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
        ref={containerRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative"
      >
        <DropdownMenu
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v && timeoutRef.current) {
              window.clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }}
        >
          <DropdownMenuTrigger asChild>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {label}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={6}
            className="min-w-[12rem]"
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMenuLeave}
          >
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <header className="sticky top-2 sm:top-4 z-40 px-2 sm:px-4 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-background/80 backdrop-blur-md border border-border rounded-xl sm:rounded-2xl shadow-lg px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between py-3 sm:py-4 gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-6 min-w-0">
              <Link
                to="/"
                className="text-base sm:text-lg font-semibold text-foreground tracking-tight font-jakarta whitespace-nowrap"
              >
                NapaFi
              </Link>

              {/* Desktop grouped nav */}
              <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
                <NavGroup label="Explore">
                  <DropdownMenuLabel>Explore</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link to="/">Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/portfolio">Portfolio</Link>
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

              {/* Mobile/Tablet: simple links */}
              <nav className="lg:hidden flex items-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto scrollbar-hide">
                <Link
                  to="/"
                  className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  Explore
                </Link>
                <Link
                  to="/swap"
                  className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  Swap
                </Link>
                <Link
                  to="/deployments"
                  className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  Deploy
                </Link>
                <Link
                  to="/ai"
                  className="text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                >
                  AI
                </Link>
              </nav>
            </div>

            <button
              className="relative h-9 sm:h-10 min-w-[100px] sm:min-w-[120px] px-3 sm:px-4 rounded-full overflow-hidden group flex-shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, #ff6fb3 0%, #3ba6ff 50%, #e26a4c 100%)',
                boxShadow:
                  '0 8px 24px rgba(59, 166, 255, 0.35), 0 2px 6px rgba(0, 0, 0, 0.25)',
              }}
            >
              <span className="relative z-10 text-white font-semibold text-xs sm:text-sm whitespace-nowrap">
                Connect Wallet
              </span>
              <span
                className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20"
                style={{
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -8px 18px rgba(59,166,255,0.25)',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

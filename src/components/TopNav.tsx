import { Link } from "react-router-dom";

export const TopNav = () => {
  return (
    <header className="sticky top-4 z-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="bg-background/80 backdrop-blur-md border border-border rounded-2xl shadow-lg px-4 sm:px-6">
          <div className="flex items-center justify-between py-4 gap-3">
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-lg font-semibold text-foreground tracking-tight font-jakarta"
            >
              NapaFi
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to="/" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
              >
                Explore
              </Link>
              <Link 
                to="/swap" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
              >
                Swap
              </Link>
              <a 
                href="#" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
              >
                Documentation
              </a>
            </nav>
          </div>

          <button 
            className="relative h-10 min-w-[120px] px-4 rounded-full overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #ff6fb3 0%, #3ba6ff 50%, #e26a4c 100%)',
              boxShadow: '0 8px 24px rgba(59, 166, 255, 0.35), 0 2px 6px rgba(0, 0, 0, 0.25)'
            }}
          >
            <span className="relative z-10 text-white font-semibold text-sm">
              Connect Wallet
            </span>
            <span 
              className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/20"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.35), inset 0 -8px 18px rgba(59, 166, 255, 0.25)'
              }}
            />
          </button>
          </div>
        </div>
      </div>
    </header>
  );
};

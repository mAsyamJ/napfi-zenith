import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Wallet, ChevronDown, ExternalLink, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BLOCK_EXPLORER_URLS } from "@/config/wagmi";

export const TopNav = () => {
  const location = useLocation();
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  const navItems = [
    { name: "Explore", path: "/" },
    { name: "Admin", path: "/admin" },
    { name: "Events", path: "/events" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const explorerUrl = BLOCK_EXPLORER_URLS[chainId as keyof typeof BLOCK_EXPLORER_URLS];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg shadow-black/20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">V</span>
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            VaultFi
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="https://docs.example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 flex items-center gap-1"
          >
            Docs
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Wallet Connection */}
        {isConnected && address ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 border-primary/30 bg-primary/10 hover:bg-primary/20"
              >
                <Wallet className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono">{shortenAddress(address)}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {explorerUrl && (
                <DropdownMenuItem asChild>
                  <a
                    href={`${explorerUrl}/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Explorer
                  </a>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => disconnect()}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            onClick={() => connect({ connector: injected() })}
            disabled={isPending}
            className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20"
          >
            <Wallet className="w-4 h-4" />
            {isPending ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}
      </div>
    </nav>
  );
};

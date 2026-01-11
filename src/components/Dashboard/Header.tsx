import { Globe, Wallet, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold gradient-text">
          NapFi
        </h1>
        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-2">
          BETA
        </span>
      </div>

      <div className="flex gap-4 items-center">
        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-xl border-border hover:border-primary/50 transition-all"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-card border-border hover:border-primary/50 transition-all"
            >
              <Globe className="h-4 w-4" />
              <span>Ethereum</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-card border-border">
            <DropdownMenuItem className="hover:bg-primary/10">
              <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
              Ethereum
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary/10">
              <span className="h-2 w-2 rounded-full bg-muted-foreground mr-2"></span>
              Polygon
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-primary/10">
              <span className="h-2 w-2 rounded-full bg-muted-foreground mr-2"></span>
              Arbitrum
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity glow-blue">
          <Wallet className="h-4 w-4" />
          <span>Connect Wallet</span>
        </Button>
      </div>
    </header>
  );
};

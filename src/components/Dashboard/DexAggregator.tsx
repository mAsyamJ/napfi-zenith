import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Info, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const DexAggregator = () => {
  const navigate = useNavigate();

  return (
    <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-lg cursor-pointer group" onClick={() => navigate("/swap")}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">DEX Aggregator</h2>
          <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-background rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">From</span>
            <span className="text-sm text-muted-foreground">Balance: 0.00</span>
          </div>
          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="0.0"
              className="text-2xl font-bold bg-transparent border-none p-0 h-auto"
            />
            <Button variant="outline" className="bg-muted">
              ETH
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-background p-2 rounded-full">
            <ArrowDownUp className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div className="bg-background rounded-xl p-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">To</span>
            <span className="text-sm text-muted-foreground">Balance: 0.00</span>
          </div>
          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="0.0"
              className="text-2xl font-bold bg-transparent border-none p-0 h-auto"
            />
            <Button variant="outline" className="bg-muted">
              USDC
            </Button>
          </div>
        </div>

        <div className="space-y-2 bg-background rounded-xl p-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Best Route</span>
            <span className="font-medium">1inch → Uniswap V3</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated Gas</span>
            <span className="font-medium">$12.43</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Slippage</span>
            <span className="font-medium">0.5%</span>
          </div>
        </div>

        <Button 
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity glow-blue"
          disabled
        >
          Connect Wallet to Swap
        </Button>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Info className="h-4 w-4" />
          <span>Aggregated rates from 1inch, 0x, and Uniswap</span>
        </div>
      </CardContent>
    </Card>
  );
};

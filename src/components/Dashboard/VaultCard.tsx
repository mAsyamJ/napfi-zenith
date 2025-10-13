import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VaultCardProps {
  name: string;
  token: string;
  network: string;
  apy: number;
  tvl: number;
  risk: "low" | "medium" | "high";
}

const getRiskBadge = (risk: string) => {
  const styles = {
    low: "bg-success/20 text-success",
    medium: "bg-warning/20 text-warning",
    high: "bg-destructive/20 text-destructive",
  };
  return styles[risk as keyof typeof styles] || styles.low;
};

const formatTVL = (tvl: number) => {
  return `$${(tvl / 1000000).toFixed(1)}M`;
};

const getAPYColor = (apy: number) => {
  if (apy >= 15) return "text-success";
  if (apy >= 8) return "text-warning";
  return "text-muted-foreground";
};

export const VaultCard = ({ name, token, network, apy, tvl, risk }: VaultCardProps) => {
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card border border-border rounded-xl px-4 py-3 hover:bg-muted/50 hover:shadow-[0_0_12px_hsl(var(--primary)/0.2)] transition-all duration-300 group">
      {/* Token + Vault Name */}
      <div className="flex items-center gap-3 min-w-0 md:flex-[2]">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary flex-shrink-0">
          {token}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-base group-hover:text-primary transition-colors truncate">
            {name}
          </h3>
          <p className="text-muted-foreground text-xs">{network}</p>
        </div>
      </div>

      {/* APY */}
      <div className="flex md:flex-col items-baseline md:items-end gap-1 md:flex-1">
        <span className="text-xs text-muted-foreground md:hidden">APY:</span>
        <p className={`text-xl md:text-2xl font-bold ${getAPYColor(apy)}`}>{apy}%</p>
        <span className="text-xs text-muted-foreground hidden md:block">APY</span>
      </div>

      {/* TVL */}
      <div className="flex md:flex-col items-baseline md:items-end gap-1 md:flex-1">
        <span className="text-xs text-muted-foreground md:hidden">TVL:</span>
        <p className="text-base md:text-lg font-semibold">{formatTVL(tvl)}</p>
        <span className="text-xs text-muted-foreground hidden md:block">TVL</span>
      </div>

      {/* Risk Badge */}
      <div className="md:flex-1 flex md:justify-center">
        <Badge className={`${getRiskBadge(risk)} border-0`}>
          {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 md:flex-[1.5]">
        <Button size="sm" className="flex-1 md:flex-initial">
          Deposit
        </Button>
        <Button size="sm" variant="outline" className="flex-1 md:flex-initial">
          Withdraw
        </Button>
        <Button size="sm" variant="outline" className="flex-1 md:flex-initial">
          Details
        </Button>
      </div>
    </div>
  );
};

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
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center bg-card border-b border-border px-4 py-4 hover:bg-muted/50 hover:shadow-[0_0_12px_hsl(var(--primary)/0.2)] transition-all duration-300 group rounded-lg">
      {/* Token Icon + Vault Name - 4 cols */}
      <div className="md:col-span-4 flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary flex-shrink-0 text-sm">
          {token}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-base group-hover:text-primary transition-colors truncate">
            {name}
          </h3>
          <p className="text-muted-foreground text-xs truncate">{network}</p>
        </div>
      </div>

      {/* APY - 2 cols */}
      <div className="md:col-span-2 flex md:flex-col items-baseline md:items-start gap-2 md:gap-0">
        <span className="text-xs text-muted-foreground md:mb-1">APY</span>
        <p className={`text-xl md:text-2xl font-bold ${getAPYColor(apy)}`}>{apy}%</p>
      </div>

      {/* TVL - 2 cols */}
      <div className="md:col-span-2 flex md:flex-col items-baseline md:items-start gap-2 md:gap-0">
        <span className="text-xs text-muted-foreground md:mb-1">TVL</span>
        <p className="text-base md:text-lg font-semibold">{formatTVL(tvl)}</p>
      </div>

      {/* Risk Badge - 1 col */}
      <div className="md:col-span-1 flex items-center">
        <Badge className={`${getRiskBadge(risk)} border-0 text-xs`}>
          {risk.charAt(0).toUpperCase() + risk.slice(1)}
        </Badge>
      </div>

      {/* Action Buttons - 3 cols */}
      <div className="md:col-span-3 flex gap-2">
        <Button size="sm" className="flex-1 md:flex-initial text-xs">
          Deposit
        </Button>
        <Button size="sm" variant="outline" className="flex-1 md:flex-initial text-xs">
          Withdraw
        </Button>
        <Button size="sm" variant="outline" className="flex-1 md:flex-initial text-xs">
          Details
        </Button>
      </div>
    </div>
  );
};

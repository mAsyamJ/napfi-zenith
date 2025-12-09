import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, Shield, Zap } from "lucide-react";

interface VaultCardProps {
  address: string;
  name: string;
  symbol: string;
  tvl: string;
  apy: string;
  strategies: number;
  risk: "low" | "medium" | "high";
  asset: string;
}

const getRiskConfig = (risk: string) => {
  const configs = {
    low: { color: "bg-success/20 text-success border-success/30", icon: Shield },
    medium: { color: "bg-warning/20 text-warning border-warning/30", icon: Zap },
    high: { color: "bg-destructive/20 text-destructive border-destructive/30", icon: TrendingUp },
  };
  return configs[risk as keyof typeof configs] || configs.low;
};

export const VaultCard = ({
  address,
  name,
  symbol,
  tvl,
  apy,
  strategies,
  risk,
  asset,
}: VaultCardProps) => {
  const riskConfig = getRiskConfig(risk);
  const RiskIcon = riskConfig.icon;

  return (
    <Card className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/20">
              <span className="text-primary font-bold text-lg">{symbol.slice(0, 2)}</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-muted-foreground text-sm">{asset} Vault</p>
            </div>
          </div>
          <Badge variant="outline" className={`${riskConfig.color} border gap-1`}>
            <RiskIcon className="w-3 h-3" />
            {risk}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1">TVL</p>
            <p className="text-lg font-semibold">${tvl}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">APY</p>
            <p className="text-lg font-semibold text-success">{apy}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Strategies</p>
            <p className="text-lg font-semibold">{strategies}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/vault/${address}`} className="flex-1">
            <Button className="w-full gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/30">
              View Vault
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

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

export const VaultCard = ({ name, token, network, apy, tvl, risk }: VaultCardProps) => {
  return (
    <Card className="bg-card border-border hover:border-primary/30 transition-all duration-300 group shadow-lg hover:shadow-primary/10">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
              {token}
            </div>
            <div>
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-muted-foreground text-sm">{network}</p>
            </div>
          </div>
          <Badge className={`${getRiskBadge(risk)} border-0`}>
            {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-background rounded-xl p-3">
            <p className="text-muted-foreground text-sm">APY</p>
            <p className="text-2xl font-bold text-primary">{apy}%</p>
          </div>
          <div className="bg-background rounded-xl p-3">
            <p className="text-muted-foreground text-sm">TVL</p>
            <p className="text-xl font-bold">{formatTVL(tvl)}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button className="bg-primary hover:bg-primary/90 transition-colors">
            Deposit
          </Button>
          <Button variant="outline" className="bg-background hover:bg-muted">
            Withdraw
          </Button>
          <Button variant="outline" className="bg-background hover:bg-muted">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

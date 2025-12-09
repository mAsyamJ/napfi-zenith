import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useReadContract } from "wagmi";
import { formatEther } from "viem";
import { Layers, Activity, TrendingUp, ExternalLink } from "lucide-react";
import VaultAggregatorABI from "@/abis/VaultAggregator.json";
import DAIStrategyCompoundLikeABI from "@/abis/DAIStrategyCompoundLike.json";

interface StrategyRowProps {
  index: number;
  vaultAddress: `0x${string}`;
}

const StrategyRow = ({ index, vaultAddress }: StrategyRowProps) => {
  const { data: strategyData } = useReadContract({
    address: vaultAddress,
    abi: VaultAggregatorABI,
    functionName: "strategies",
    args: [BigInt(index)],
  });

  const strategy = strategyData as [string, bigint, bigint, boolean] | undefined;
  const strategyAddress = strategy?.[0] as `0x${string}` | undefined;

  const { data: estimatedAssets } = useReadContract({
    address: strategyAddress,
    abi: DAIStrategyCompoundLikeABI,
    functionName: "estimatedTotalAssets",
    query: {
      enabled: !!strategyAddress,
    },
  });

  if (!strategy || strategy[0] === "0x0000000000000000000000000000000000000000") {
    return null;
  }

  const [addr, debtRatioBps, totalDebt, active] = strategy;
  const debtRatioPercent = Number(debtRatioBps) / 100;
  const totalDebtFormatted = formatEther(totalDebt);
  const estimatedAssetsFormatted = estimatedAssets ? formatEther(estimatedAssets as bigint) : "0";

  return (
    <div className="grid grid-cols-5 gap-4 py-4 px-4 border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Layers className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-medium text-sm">Strategy #{index + 1}</p>
          <p className="text-xs text-muted-foreground font-mono">
            {addr.slice(0, 6)}...{addr.slice(-4)}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <Badge
          variant="outline"
          className={active ? "bg-success/20 text-success border-success/30" : "bg-destructive/20 text-destructive border-destructive/30"}
        >
          {active ? "Active" : "Inactive"}
        </Badge>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm font-semibold">{debtRatioPercent.toFixed(1)}%</p>
        <p className="text-xs text-muted-foreground">Debt Ratio</p>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm font-semibold">{parseFloat(totalDebtFormatted).toFixed(2)} DAI</p>
        <p className="text-xs text-muted-foreground">Total Debt</p>
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm font-semibold text-success">{parseFloat(estimatedAssetsFormatted).toFixed(2)} DAI</p>
        <p className="text-xs text-muted-foreground">Est. Assets</p>
      </div>
    </div>
  );
};

interface StrategyTableProps {
  vaultAddress: `0x${string}`;
}

export const StrategyTable = ({ vaultAddress }: StrategyTableProps) => {
  // Try to fetch up to 10 strategies
  const strategyIndices = Array.from({ length: 10 }, (_, i) => i);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="w-5 h-5 text-primary" />
          Active Strategies
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 py-3 px-4 bg-muted/30 border-y border-border/30 text-xs text-muted-foreground font-medium">
          <span>Strategy</span>
          <span>Status</span>
          <span>Allocation</span>
          <span>Debt</span>
          <span>Assets</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/30">
          {strategyIndices.map((index) => (
            <StrategyRow key={index} index={index} vaultAddress={vaultAddress} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

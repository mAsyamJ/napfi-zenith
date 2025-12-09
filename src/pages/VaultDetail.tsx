import { useParams, Link } from "react-router-dom";
import { TopNav } from "@/components/TopNav";
import { DepositWidget } from "@/components/DepositWidget";
import { WithdrawWidget } from "@/components/WithdrawWidget";
import { StrategyTable } from "@/components/StrategyTable";
import { AdminPanel } from "@/components/AdminPanel";
import { useVaultContract } from "@/hooks/useVaultContract";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Wallet, TrendingUp, Layers, DollarSign, AlertTriangle } from "lucide-react";

const VaultDetail = () => {
  const { address } = useParams<{ address: string }>();
  const vaultAddress = address as `0x${string}`;

  const {
    vaultName,
    vaultSymbol,
    totalAssets,
    totalIdle,
    totalDebt,
    totalSupply,
    asset,
    emergencyShutdown,
  } = useVaultContract(vaultAddress);

  const stats = [
    { label: "Total Assets", value: `${parseFloat(totalAssets).toFixed(4)} DAI`, icon: DollarSign },
    { label: "Idle Funds", value: `${parseFloat(totalIdle).toFixed(4)} DAI`, icon: Wallet },
    { label: "Deployed to Strategies", value: `${parseFloat(totalDebt).toFixed(4)} DAI`, icon: TrendingUp },
    { label: "Share Supply", value: parseFloat(totalSupply).toFixed(4), icon: Layers },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TopNav />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Vaults
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{vaultName || "Loading Vault..."}</h1>
              {vaultSymbol && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  {vaultSymbol}
                </Badge>
              )}
              {emergencyShutdown && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Emergency Shutdown
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground font-mono text-sm break-all">{vaultAddress}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="bg-card/50 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <stat.icon className="w-4 h-4" />
                    <span className="text-xs">{stat.label}</span>
                  </div>
                  <p className="text-lg font-semibold truncate">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Strategies & Admin */}
            <div className="lg:col-span-2 space-y-6">
              <StrategyTable vaultAddress={vaultAddress} />
              <AdminPanel vaultAddress={vaultAddress} />
            </div>

            {/* Right Column - Deposit/Withdraw */}
            <div className="space-y-6">
              <DepositWidget
                vaultAddress={vaultAddress}
                assetAddress={(asset || "0x0000000000000000000000000000000000000000") as `0x${string}`}
              />
              <WithdrawWidget vaultAddress={vaultAddress} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VaultDetail;

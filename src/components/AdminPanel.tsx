import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAccount } from "wagmi";
import { useVaultContract } from "@/hooks/useVaultContract";
import { toast } from "sonner";
import { Loader2, Shield, Plus, AlertTriangle, RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface AdminPanelProps {
  vaultAddress: `0x${string}`;
}

export const AdminPanel = ({ vaultAddress }: AdminPanelProps) => {
  const [strategyAddress, setStrategyAddress] = useState("");
  const [debtRatioBps, setDebtRatioBps] = useState("");
  const { address, isConnected } = useAccount();

  const {
    owner,
    emergencyShutdown,
    addStrategy,
    rebalance,
    setEmergencyShutdown,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
    refetchAll,
  } = useVaultContract(vaultAddress);

  const isOwner = address && owner && address.toLowerCase() === owner.toLowerCase();

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Transaction confirmed!", {
        description: `Transaction: ${hash?.slice(0, 10)}...`,
      });
      setStrategyAddress("");
      setDebtRatioBps("");
      refetchAll();
    }
  }, [isConfirmed, hash, refetchAll]);

  useEffect(() => {
    if (error) {
      toast.error("Transaction failed", {
        description: error.message.slice(0, 100),
      });
    }
  }, [error]);

  const handleAddStrategy = () => {
    if (!strategyAddress || !debtRatioBps) return;
    addStrategy(strategyAddress as `0x${string}`, BigInt(debtRatioBps));
  };

  const handleRebalance = () => {
    rebalance();
  };

  const handleEmergencyToggle = (checked: boolean) => {
    setEmergencyShutdown(checked);
  };

  const isLoading = isPending || isConfirming;

  if (!isConnected) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="py-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
          <p className="text-muted-foreground">Connect wallet to access admin controls</p>
        </CardContent>
      </Card>
    );
  }

  if (!isOwner) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="py-8 text-center">
          <Shield className="w-12 h-12 mx-auto mb-3 text-destructive/50" />
          <p className="text-muted-foreground">Only vault owner can access admin controls</p>
          <p className="text-xs text-muted-foreground mt-2 font-mono">
            Owner: {owner?.slice(0, 8)}...{owner?.slice(-6)}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="w-5 h-5 text-primary" />
          Admin Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Strategy */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Strategy
          </h4>
          <div className="grid gap-3">
            <div className="space-y-2">
              <Label htmlFor="strategyAddress">Strategy Address</Label>
              <Input
                id="strategyAddress"
                placeholder="0x..."
                value={strategyAddress}
                onChange={(e) => setStrategyAddress(e.target.value)}
                className="bg-background/50 font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="debtRatio">Debt Ratio (BPS, max 10000)</Label>
              <Input
                id="debtRatio"
                type="number"
                placeholder="1000 = 10%"
                value={debtRatioBps}
                onChange={(e) => setDebtRatioBps(e.target.value)}
                className="bg-background/50"
              />
            </div>
            <Button
              onClick={handleAddStrategy}
              disabled={isLoading || !strategyAddress || !debtRatioBps}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Strategy
                </>
              )}
            </Button>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Rebalance */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Rebalance Vault
          </h4>
          <Button
            onClick={handleRebalance}
            disabled={isLoading}
            variant="outline"
            className="w-full gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Rebalancing...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Trigger Rebalance
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground">
            Redistributes idle funds to strategies based on debt ratios
          </p>
        </div>

        <Separator className="bg-border/50" />

        {/* Emergency Shutdown */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium flex items-center gap-2 text-warning">
            <AlertTriangle className="w-4 h-4" />
            Emergency Controls
          </h4>
          <div className="flex items-center justify-between p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div>
              <p className="font-medium">Emergency Shutdown</p>
              <p className="text-xs text-muted-foreground">
                Pauses all deposits and withdrawals
              </p>
            </div>
            <Switch
              checked={emergencyShutdown ?? false}
              onCheckedChange={handleEmergencyToggle}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

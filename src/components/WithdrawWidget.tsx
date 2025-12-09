import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccount, useReadContract } from "wagmi";
import { useVaultContract } from "@/hooks/useVaultContract";
import { formatEther } from "viem";
import { toast } from "sonner";
import { Loader2, ArrowUpFromLine, AlertCircle } from "lucide-react";
import VaultAggregatorABI from "@/abis/VaultAggregator.json";

interface WithdrawWidgetProps {
  vaultAddress: `0x${string}`;
}

export const WithdrawWidget = ({ vaultAddress }: WithdrawWidgetProps) => {
  const [shares, setShares] = useState("");
  const { address, isConnected } = useAccount();

  const { data: userShares, refetch: refetchShares } = useReadContract({
    address: vaultAddress,
    abi: VaultAggregatorABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const { data: convertedAssets } = useReadContract({
    address: vaultAddress,
    abi: VaultAggregatorABI,
    functionName: "convertToAssets",
    args: shares ? [BigInt(Math.floor(parseFloat(shares) * 1e18))] : undefined,
    query: {
      enabled: !!shares && parseFloat(shares) > 0,
    },
  });

  const {
    redeem,
    vaultSymbol,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
    refetchAll,
  } = useVaultContract(vaultAddress);

  const userSharesFormatted = userShares ? formatEther(userShares as bigint) : "0";
  const assetsToReceive = convertedAssets ? formatEther(convertedAssets as bigint) : "0";

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Withdrawal confirmed!", {
        description: `Transaction: ${hash?.slice(0, 10)}...`,
      });
      setShares("");
      refetchShares();
      refetchAll();
    }
  }, [isConfirmed, hash, refetchShares, refetchAll]);

  useEffect(() => {
    if (error) {
      toast.error("Transaction failed", {
        description: error.message.slice(0, 100),
      });
    }
  }, [error]);

  const handleWithdraw = () => {
    if (!shares || !address) return;
    redeem(shares, address, address);
  };

  const setMaxShares = () => {
    setShares(userSharesFormatted);
  };

  const isLoading = isPending || isConfirming;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ArrowUpFromLine className="w-5 h-5 text-primary" />
          Withdraw
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="text-center py-6 text-muted-foreground">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Connect your wallet to withdraw</p>
          </div>
        ) : (
          <>
            {/* Shares Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shares to Redeem</span>
                <button
                  onClick={setMaxShares}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Balance: {parseFloat(userSharesFormatted).toFixed(4)} {vaultSymbol}
                </button>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  className="pr-20 bg-background/50 border-border/50"
                />
                <button
                  onClick={setMaxShares}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary font-medium hover:text-primary/80"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Preview */}
            {shares && parseFloat(shares) > 0 && (
              <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">You will receive</span>
                  <span className="font-semibold text-success">
                    ~{parseFloat(assetsToReceive).toFixed(4)} DAI
                  </span>
                </div>
              </div>
            )}

            {/* Action Button */}
            <Button
              onClick={handleWithdraw}
              disabled={isLoading || !shares || parseFloat(shares) > parseFloat(userSharesFormatted)}
              className="w-full gap-2"
              variant="outline"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isConfirming ? "Confirming..." : "Withdrawing..."}
                </>
              ) : (
                <>
                  <ArrowUpFromLine className="w-4 h-4" />
                  Withdraw
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

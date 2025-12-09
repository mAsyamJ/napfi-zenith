import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAccount } from "wagmi";
import { useVaultContract } from "@/hooks/useVaultContract";
import { useERC20 } from "@/hooks/useERC20";
import { toast } from "sonner";
import { Loader2, ArrowDownToLine, Check, AlertCircle } from "lucide-react";

interface DepositWidgetProps {
  vaultAddress: `0x${string}`;
  assetAddress: `0x${string}`;
}

export const DepositWidget = ({ vaultAddress, assetAddress }: DepositWidgetProps) => {
  const [amount, setAmount] = useState("");
  const { address, isConnected } = useAccount();

  const {
    balance,
    symbol,
    allowance,
    approve,
    needsApproval,
    isPending: isApprovePending,
    isConfirming: isApproveConfirming,
    isConfirmed: isApproveConfirmed,
    refetchAllowance,
  } = useERC20(assetAddress, address, vaultAddress);

  const {
    deposit,
    isPending: isDepositPending,
    isConfirming: isDepositConfirming,
    isConfirmed: isDepositConfirmed,
    hash,
    error,
    refetchAll,
  } = useVaultContract(vaultAddress);

  const requiresApproval = amount ? needsApproval(amount) : false;

  useEffect(() => {
    if (isApproveConfirmed) {
      toast.success("Approval confirmed!");
      refetchAllowance();
    }
  }, [isApproveConfirmed, refetchAllowance]);

  useEffect(() => {
    if (isDepositConfirmed) {
      toast.success("Deposit confirmed!", {
        description: `Transaction: ${hash?.slice(0, 10)}...`,
      });
      setAmount("");
      refetchAll();
    }
  }, [isDepositConfirmed, hash, refetchAll]);

  useEffect(() => {
    if (error) {
      toast.error("Transaction failed", {
        description: error.message.slice(0, 100),
      });
    }
  }, [error]);

  const handleApprove = () => {
    if (!amount) return;
    approve(vaultAddress, amount);
  };

  const handleDeposit = () => {
    if (!amount || !address) return;
    deposit(amount, address);
  };

  const setMaxAmount = () => {
    setAmount(balance);
  };

  const isLoading = isApprovePending || isApproveConfirming || isDepositPending || isDepositConfirming;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ArrowDownToLine className="w-5 h-5 text-primary" />
          Deposit
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="text-center py-6 text-muted-foreground">
            <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Connect your wallet to deposit</p>
          </div>
        ) : (
          <>
            {/* Amount Input */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <button
                  onClick={setMaxAmount}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  Balance: {parseFloat(balance).toFixed(4)} {symbol}
                </button>
              </div>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pr-20 bg-background/50 border-border/50"
                />
                <button
                  onClick={setMaxAmount}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary font-medium hover:text-primary/80"
                >
                  MAX
                </button>
              </div>
            </div>

            {/* Allowance Info */}
            {amount && (
              <div className="flex items-center gap-2 text-sm">
                {requiresApproval ? (
                  <span className="text-warning flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    Approval required
                  </span>
                ) : (
                  <span className="text-success flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Approved
                  </span>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              {requiresApproval && (
                <Button
                  onClick={handleApprove}
                  disabled={isLoading || !amount}
                  className="w-full gap-2"
                  variant="outline"
                >
                  {isApprovePending || isApproveConfirming ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isApproveConfirming ? "Confirming..." : "Approving..."}
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Approve {symbol}
                    </>
                  )}
                </Button>
              )}

              <Button
                onClick={handleDeposit}
                disabled={isLoading || !amount || requiresApproval || parseFloat(amount) > parseFloat(balance)}
                className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80"
              >
                {isDepositPending || isDepositConfirming ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isDepositConfirming ? "Confirming..." : "Depositing..."}
                  </>
                ) : (
                  <>
                    <ArrowDownToLine className="w-4 h-4" />
                    Deposit
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import VaultAggregatorABI from '@/abis/VaultAggregator.json';

export function useVaultContract(vaultAddress: `0x${string}` | undefined) {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const { data: totalAssets, refetch: refetchTotalAssets } = useReadContract({
    address: vaultAddress,
    abi: VaultAggregatorABI,
    functionName: 'totalAssets',
    query: { enabled: !!vaultAddress },
  });

  const { data: totalIdle, refetch: refetchTotalIdle } = useReadContract({
    address: vaultAddress,
    abi: VaultAggregatorABI,
    functionName: 'totalIdle',
    query: { enabled: !!vaultAddress },
  });

  const { data: totalDebt, refetch: refetchTotalDebt } = useReadContract({
    address: vaultAddress,
    abi: VaultAggregatorABI,
    functionName: 'totalDebt',
    query: { enabled: !!vaultAddress },
  });

  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: vaultAddress,
    abi: VaultAggregatorABI,
    functionName: 'totalSupply',
    query: { enabled: !!vaultAddress },
  });

  const { data: vaultName } = useReadContract({
    address: vaultAddress,
    abi: VaultAggregatorABI,
    functionName: 'name',
    query: { enabled: !!vaultAddress },
  });

  const { data: vaultSymbol } = useReadContract({
    address: vaultAddress,
    abi: VaultAggregatorABI,
    functionName: 'symbol',
    query: { enabled: !!vaultAddress },
  });

  const { data: asset } = useReadContract({
    address: vaultAddress,
    abi: VaultAggregatorABI,
    functionName: 'asset',
    query: { enabled: !!vaultAddress },
  });

  const { data: owner } = useReadContract({
    address: vaultAddress,
    abi: VaultAggregatorABI,
    functionName: 'owner',
    query: { enabled: !!vaultAddress },
  });

  const { data: emergencyShutdown } = useReadContract({
    address: vaultAddress,
    abi: VaultAggregatorABI,
    functionName: 'emergencyShutdown',
    query: { enabled: !!vaultAddress },
  });

  const deposit = async (amount: string, receiver: `0x${string}`) => {
    writeContract({
      address: vaultAddress!,
      abi: VaultAggregatorABI,
      functionName: 'deposit',
      args: [parseEther(amount), receiver],
    });
  };

  const withdraw = async (amount: string, receiver: `0x${string}`, ownerAddr: `0x${string}`) => {
    writeContract({
      address: vaultAddress!,
      abi: VaultAggregatorABI,
      functionName: 'withdraw',
      args: [parseEther(amount), receiver, ownerAddr],
    });
  };

  const redeem = async (shares: string, receiver: `0x${string}`, ownerAddr: `0x${string}`) => {
    writeContract({
      address: vaultAddress!,
      abi: VaultAggregatorABI,
      functionName: 'redeem',
      args: [parseEther(shares), receiver, ownerAddr],
    });
  };

  const rebalance = async () => {
    writeContract({ address: vaultAddress!, abi: VaultAggregatorABI, functionName: 'rebalance' });
  };

  const addStrategy = async (strategyAddress: `0x${string}`, ratioBps: bigint) => {
    writeContract({
      address: vaultAddress!,
      abi: VaultAggregatorABI,
      functionName: 'addStrategy',
      args: [strategyAddress, ratioBps],
    });
  };

  const setEmergencyShutdown = async (flag: boolean) => {
    writeContract({
      address: vaultAddress!,
      abi: VaultAggregatorABI,
      functionName: 'setEmergencyShutdown',
      args: [flag],
    });
  };

  const refetchAll = () => {
    refetchTotalAssets();
    refetchTotalIdle();
    refetchTotalDebt();
    refetchTotalSupply();
  };

  return {
    totalAssets: totalAssets ? formatEther(totalAssets as bigint) : '0',
    totalIdle: totalIdle ? formatEther(totalIdle as bigint) : '0',
    totalDebt: totalDebt ? formatEther(totalDebt as bigint) : '0',
    totalSupply: totalSupply ? formatEther(totalSupply as bigint) : '0',
    vaultName: vaultName as string | undefined,
    vaultSymbol: vaultSymbol as string | undefined,
    asset: asset as `0x${string}` | undefined,
    owner: owner as `0x${string}` | undefined,
    emergencyShutdown: emergencyShutdown as boolean | undefined,
    deposit, withdraw, redeem, rebalance, addStrategy, setEmergencyShutdown,
    hash, isPending, isConfirming, isConfirmed, error, refetchAll,
  };
}

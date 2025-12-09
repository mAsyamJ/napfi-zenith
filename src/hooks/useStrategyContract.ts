import { useReadContract } from 'wagmi';
import { formatEther } from 'viem';
import DAIStrategyCompoundLikeABI from '@/abis/DAIStrategyCompoundLike.json';
import DAIStrategyYearnStyleABI from '@/abis/DAIStrategyYearnStyle.json';
import DAIStrategyAaveV3ABI from '@/abis/DAIStrategyAaveV3.json';

export type StrategyType = 'compound' | 'yearn' | 'aave';

const getABI = (type: StrategyType) => {
  switch (type) {
    case 'compound':
      return DAIStrategyCompoundLikeABI;
    case 'yearn':
      return DAIStrategyYearnStyleABI;
    case 'aave':
      return DAIStrategyAaveV3ABI;
    default:
      return DAIStrategyCompoundLikeABI;
  }
};

export function useStrategyContract(
  strategyAddress: `0x${string}` | undefined,
  strategyType: StrategyType = 'compound'
) {
  const abi = getABI(strategyType);

  const { data: estimatedTotalAssets, refetch: refetchAssets } = useReadContract({
    address: strategyAddress,
    abi,
    functionName: 'estimatedTotalAssets',
  });

  const { data: vault } = useReadContract({
    address: strategyAddress,
    abi,
    functionName: 'vault',
  });

  const { data: want } = useReadContract({
    address: strategyAddress,
    abi,
    functionName: 'want',
  });

  const { data: isActive } = useReadContract({
    address: strategyAddress,
    abi,
    functionName: 'isActive',
  });

  // Yearn-specific
  const { data: yieldFactor } = useReadContract({
    address: strategyAddress,
    abi: DAIStrategyYearnStyleABI,
    functionName: 'yieldFactor',
    query: {
      enabled: strategyType === 'yearn',
    },
  });

  const { data: totalDeposited } = useReadContract({
    address: strategyAddress,
    abi: DAIStrategyYearnStyleABI,
    functionName: 'totalDeposited',
    query: {
      enabled: strategyType === 'yearn',
    },
  });

  // Aave-specific
  const { data: aToken } = useReadContract({
    address: strategyAddress,
    abi: DAIStrategyAaveV3ABI,
    functionName: 'aToken',
    query: {
      enabled: strategyType === 'aave',
    },
  });

  const { data: pool } = useReadContract({
    address: strategyAddress,
    abi: DAIStrategyAaveV3ABI,
    functionName: 'pool',
    query: {
      enabled: strategyType === 'aave',
    },
  });

  // Compound-specific
  const { data: cDai } = useReadContract({
    address: strategyAddress,
    abi: DAIStrategyCompoundLikeABI,
    functionName: 'cDai',
    query: {
      enabled: strategyType === 'compound',
    },
  });

  return {
    estimatedTotalAssets: estimatedTotalAssets ? formatEther(estimatedTotalAssets as bigint) : '0',
    vault: vault as `0x${string}` | undefined,
    want: want as `0x${string}` | undefined,
    isActive: isActive as boolean | undefined,
    
    // Yearn-specific
    yieldFactor: yieldFactor as bigint | undefined,
    totalDeposited: totalDeposited ? formatEther(totalDeposited as bigint) : '0',
    
    // Aave-specific
    aToken: aToken as `0x${string}` | undefined,
    pool: pool as `0x${string}` | undefined,
    
    // Compound-specific
    cDai: cDai as `0x${string}` | undefined,
    
    refetchAssets,
  };
}

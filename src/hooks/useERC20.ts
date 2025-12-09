import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther, maxUint256 } from 'viem';

const ERC20_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export function useERC20(
  tokenAddress: `0x${string}` | undefined,
  userAddress: `0x${string}` | undefined,
  spenderAddress?: `0x${string}`
) {
  const { writeContractAsync, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: userAddress && spenderAddress ? [userAddress, spenderAddress] : undefined,
  });

  const { data: symbol } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'symbol',
  });

  const approve = async (spender: `0x${string}`, amount?: string) => {
    if (!tokenAddress) return;
    return (writeContractAsync as any)({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [spender, amount ? parseEther(amount) : maxUint256],
    });
  };

  const needsApproval = (amount: string): boolean => {
    if (!allowance) return true;
    return (allowance as bigint) < parseEther(amount);
  };

  return {
    balance: balance ? formatEther(balance as bigint) : '0',
    allowance: allowance ? formatEther(allowance as bigint) : '0',
    symbol: symbol as string | undefined,
    approve,
    needsApproval,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    refetchBalance,
    refetchAllowance,
  };
}

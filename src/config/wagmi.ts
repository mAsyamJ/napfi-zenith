import { http, createConfig } from 'wagmi';
import { sepolia, mainnet, hardhat } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// Contract addresses - update these after deployment
export const CONTRACT_ADDRESSES = {
  sepolia: {
    vaultAggregator: '0x0000000000000000000000000000000000000000', // Deploy and update
    mockDAI: '0x0000000000000000000000000000000000000000',
    strategyCompound: '0x0000000000000000000000000000000000000000',
    strategyYearn: '0x0000000000000000000000000000000000000000',
    strategyAave: '0x0000000000000000000000000000000000000000',
  },
  hardhat: {
    vaultAggregator: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    mockDAI: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    strategyCompound: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    strategyYearn: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    strategyAave: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
  }
} as const;

export const config = createConfig({
  chains: [sepolia, hardhat, mainnet],
  connectors: [
    injected(),
  ],
  transports: {
    [sepolia.id]: http(),
    [hardhat.id]: http('http://127.0.0.1:8545'),
    [mainnet.id]: http(),
  },
});

export const BLOCK_EXPLORER_URLS = {
  [sepolia.id]: 'https://sepolia.etherscan.io',
  [hardhat.id]: '',
  [mainnet.id]: 'https://etherscan.io',
} as const;

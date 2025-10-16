export interface Token {
  symbol: string;
  name: string;
  price: number;
  change: string;
  logo: string;
  liquidity?: string;
  volume24h?: string;
  marketCap?: string;
  change1h?: string;
  change24h?: string;
  change7d?: string;
}

export const mockTokens: Token[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    price: 1.0,
    change: "+0.02%",
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    liquidity: "$2.4B",
    volume24h: "$450M",
    marketCap: "$24.5B",
    change1h: "+0.01%",
    change24h: "+0.02%",
    change7d: "+0.05%"
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 1985.42,
    change: "-0.34%",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    liquidity: "$5.2B",
    volume24h: "$1.2B",
    marketCap: "$238B",
    change1h: "-0.12%",
    change24h: "-0.34%",
    change7d: "+2.5%"
  },
  {
    symbol: "COW",
    name: "CoW Protocol",
    price: 0.25,
    change: "+1.1%",
    logo: "https://cryptologos.cc/logos/cow-protocol-cow-logo.png",
    liquidity: "$54.2M",
    volume24h: "$12.8M",
    marketCap: "$89.5M",
    change1h: "+0.5%",
    change24h: "+1.1%",
    change7d: "+5.2%"
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    price: 1.0,
    change: "0.00%",
    logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png",
    liquidity: "$1.8B",
    volume24h: "$320M",
    marketCap: "$5.3B",
    change1h: "0.00%",
    change24h: "0.00%",
    change7d: "+0.01%"
  },
  {
    symbol: "ARB",
    name: "Arbitrum",
    price: 1.14,
    change: "-0.8%",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
    liquidity: "$890M",
    volume24h: "$180M",
    marketCap: "$1.5B",
    change1h: "-0.3%",
    change24h: "-0.8%",
    change7d: "+3.2%"
  },
  {
    symbol: "UNI",
    name: "Uniswap",
    price: 4.21,
    change: "+0.7%",
    logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
    liquidity: "$1.2B",
    volume24h: "$240M",
    marketCap: "$2.5B",
    change1h: "+0.2%",
    change24h: "+0.7%",
    change7d: "+4.1%"
  },
  {
    symbol: "MATIC",
    name: "Polygon",
    price: 0.56,
    change: "-1.2%",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    liquidity: "$650M",
    volume24h: "$150M",
    marketCap: "$5.2B",
    change1h: "-0.5%",
    change24h: "-1.2%",
    change7d: "-2.3%"
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    price: 11.32,
    change: "+2.3%",
    logo: "https://cryptologos.cc/logos/chainlink-link-logo.png",
    liquidity: "$780M",
    volume24h: "$190M",
    marketCap: "$6.3B",
    change1h: "+0.8%",
    change24h: "+2.3%",
    change7d: "+6.5%"
  },
  {
    symbol: "AAVE",
    name: "Aave",
    price: 64.78,
    change: "-0.5%",
    logo: "https://cryptologos.cc/logos/aave-aave-logo.png",
    liquidity: "$420M",
    volume24h: "$95M",
    marketCap: "$950M",
    change1h: "-0.2%",
    change24h: "-0.5%",
    change7d: "+1.8%"
  },
  {
    symbol: "COMP",
    name: "Compound",
    price: 47.15,
    change: "+0.9%",
    logo: "https://cryptologos.cc/logos/compound-comp-logo.png",
    liquidity: "$310M",
    volume24h: "$68M",
    marketCap: "$420M",
    change1h: "+0.3%",
    change24h: "+0.9%",
    change7d: "+3.7%"
  }
];

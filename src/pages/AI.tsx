import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  RefreshCw,
  Sparkles,
  MessageSquare,
  Zap,
  TrendingUp,
  Shield,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  Rocket,
  Code,
  Wallet,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockStrategies } from "@/data/mockStrategies";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  actions?: ActionButton[];
  vaultData?: any;
}

interface ActionButton {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'outline';
  action: string;
  vaultId?: string;
}

const AI = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant for NapFi. I can help you with DeFi strategies, portfolio analysis, yield farming opportunities, and answer questions about the platform. How can I assist you today?',
      role: 'assistant',
      timestamp: new Date(),
      actions: [
        { id: 'yield-search', label: 'Find Best Yields', type: 'primary', action: 'yield-search' },
        { id: 'portfolio-analysis', label: 'Analyze Portfolio', type: 'secondary', action: 'portfolio-analysis' },
        { id: 'create-vault', label: 'Create Vault', type: 'outline', action: 'create-vault' }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = generateAIResponse(input.trim());
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    
    // Flow 1: Yield Aggregator
    if (input.includes('usdc') && (input.includes('yield') || input.includes('best') || input.includes('optimism'))) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Scanning 42 live strategies across Aave, Curve, and Velodrome...

✅ Optimal yield: 8.32% APY via Aave v3 leveraged vault (NapV2)
• Risk Level: Moderate
• Utilization: 68%
• Fee: 0.5%

Would you like to auto-deposit into this vault or compare with Base Network rates?`,
        role: 'assistant',
        timestamp: new Date(),
        actions: [
          { id: 'auto-deposit', label: 'Auto Deposit', type: 'primary', action: 'auto-deposit', vaultId: '1' },
          { id: 'compare-chains', label: 'Compare Chains', type: 'secondary', action: 'compare-chains' },
          { id: 'view-vault', label: 'View Vault Details', type: 'outline', action: 'view-vault', vaultId: '1' }
        ],
        vaultData: mockStrategies[0]
      };
    }

    // Flow 2: DEX Aggregator
    if (input.includes('swap') && (input.includes('usdc') || input.includes('eth')) && input.includes('slippage')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Fetching routes across 12 DEXs...

🧭 Best Route Found:
• 60% Velodrome → ETH
• 40% Uniswap v3 (0.05% pool)
• Expected Output: 0.0538 ETH (+0.7% vs single DEX)
• Estimated Gas: 0.0013 ETH

Confirm swap?`,
        role: 'assistant',
        timestamp: new Date(),
        actions: [
          { id: 'confirm-swap', label: 'Confirm Swap', type: 'primary', action: 'confirm-swap' },
          { id: 'view-routes', label: 'View All Routes', type: 'secondary', action: 'view-routes' }
        ]
      };
    }

    // Flow 3: Artist Creator Deployment
    if (input.includes('musician') || (input.includes('artist') && input.includes('deploy')) || input.includes('spotify')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Yes — you can deploy a MusicVault that tokenizes your streaming revenue into on-chain yield shares.

To start, please provide:
1️⃣ Your revenue stream (Spotify, YouTube, etc.)
2️⃣ Token name & symbol (e.g. stTAYLOR)
3️⃣ Yield share ratio (Artist 70% / Fans 30%)

I'll deploy an ERC-4626 vault + ERC-721 strategy ownership NFT for you.

⚙️ Ready to create your artist vault?`,
        role: 'assistant',
        timestamp: new Date(),
        actions: [
          { id: 'deploy-vault', label: 'Deploy Vault', type: 'primary', action: 'deploy-vault' },
          { id: 'learn-more', label: 'Learn More', type: 'secondary', action: 'learn-more' },
          { id: 'view-examples', label: 'View Examples', type: 'outline', action: 'view-examples' }
        ]
      };
    }

    // Flow 4: Developer SDK Assistant
    if (input.includes('sdk') || (input.includes('build') && input.includes('strategy'))) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Excellent. NapFi SDK lets you plug in custom yield logic or analytics.

1️⃣ Install via npm:
\`\`\`bash
npm install @napfi/sdk
\`\`\`

2️⃣ Import base vault template:
\`\`\`typescript
import { createVault } from '@napfi/sdk';
const myVault = await createVault({ 
  asset: 'USDC', 
  strategy: 'aave-leverage' 
});
\`\`\`

3️⃣ Test locally, then deploy with \`napfi deploy\`

💡 You'll receive a StrategyOwnership NFT that controls fee routing and upgrades.

Would you like me to generate a starter repo or API key?`,
        role: 'assistant',
        timestamp: new Date(),
        actions: [
          { id: 'generate-repo', label: 'Generate Repo', type: 'primary', action: 'generate-repo' },
          { id: 'view-docs', label: 'View Docs', type: 'secondary', action: 'view-docs' },
          { id: 'get-api-key', label: 'Get API Key', type: 'outline', action: 'get-api-key' }
        ]
      };
    }

    // Flow 5: AI Portfolio Advisor
    if (input.includes('analyze') && (input.includes('portfolio') || input.includes('vaults')) && input.includes('reallocation')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Fetching your connected wallet...

Current Portfolio:
• stUSDC Vault: +7.8% APY
• stETH Vault: +4.9% APY  
• stARTIST Vault: +12.1% APY (High volatility)

🔁 Recommendation: Move 20% from stARTIST → stUSDC to reduce risk while maintaining 8% blended APY.

Would you like to auto-rebalance?`,
        role: 'assistant',
        timestamp: new Date(),
        actions: [
          { id: 'auto-rebalance', label: 'Auto Rebalance', type: 'primary', action: 'auto-rebalance' },
          { id: 'view-portfolio', label: 'View Portfolio', type: 'secondary', action: 'view-portfolio' },
          { id: 'custom-rebalance', label: 'Custom Rebalance', type: 'outline', action: 'custom-rebalance' }
        ]
      };
    }

    // Additional flows for comprehensive coverage
    if (input.includes('audit') || input.includes('security')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Security & Audit Status 🔒

Current Vault Audits:
• Uniswap V3 DAI/ETH LP: ✅ Audited by OpenZeppelin
• Yearn DAI/ETH LP Optimizer: ✅ Audited by ConsenSys
• DAI/ETH LP Staking: ✅ Audited by Trail of Bits

Insurance Coverage:
• Nexus Mutual: $2.5M coverage
• Risk Score: 85/100 (Low Risk)

Safety Recommendations:
• Never deposit more than 5% of portfolio in one vault
• Monitor for unusual activity
• Use hardware wallets for large amounts`,
        role: 'assistant',
        timestamp: new Date(),
        actions: [
          { id: 'view-audits', label: 'View Full Audits', type: 'primary', action: 'view-audits' },
          { id: 'check-insurance', label: 'Check Insurance', type: 'secondary', action: 'check-insurance' }
        ]
      };
    }

    if (input.includes('erc-4626') || input.includes('vault') && input.includes('explain')) {
      return {
        id: (Date.now() + 1).toString(),
        content: `ERC-4626 Vaults Explained 📚

What is ERC-4626?
ERC-4626 is the tokenized vault standard that provides a uniform interface for yield-bearing vaults.

Key Benefits:
• Standardized Interface: Works across all DeFi protocols
• Automatic Compounding: Rewards reinvest automatically
• Liquidity: Easy to enter/exit positions
• Transparency: All vault data is on-chain

How NapFi Uses It:
• Asset Management: Your tokens are managed by smart contracts
• Yield Optimization: AI automatically finds best strategies
• Risk Management: Built-in safety mechanisms

Example:
When you deposit 100 USDC, you receive 100 stUSDC tokens representing your share of the vault.`,
        role: 'assistant',
        timestamp: new Date(),
        actions: [
          { id: 'learn-more-erc4626', label: 'Learn More', type: 'primary', action: 'learn-more-erc4626' },
          { id: 'view-examples', label: 'View Examples', type: 'secondary', action: 'view-examples' }
        ]
      };
    }

    if (input.includes('top') && (input.includes('performing') || input.includes('vaults'))) {
      return {
        id: (Date.now() + 1).toString(),
        content: `Top Performing Vaults This Week 📈

🔥 Trending Strategies:
1. AAVE Boosted - 19.7% APY
   • Risk: High | TVL: $42.1M
   • Strategy: Leveraged lending

2. DAI/ETH LP - 12.4% APY  
   • Risk: Medium | TVL: $87.3M
   • Strategy: Liquidity provision

3. LINK Staking - 8.9% APY
   • Risk: Medium | TVL: $67.8M
   • Strategy: Native staking

4. stETH/WETH - 6.8% APY
   • Risk: Low | TVL: $324.5M
   • Strategy: Restaking

Market Insights:
• Total TVL: $1.2B (+15% this week)
• Average APY: 8.3%
• Risk Distribution: 40% Low, 35% Medium, 25% High`,
        role: 'assistant',
        timestamp: new Date(),
        actions: [
          { id: 'explore-top-vaults', label: 'Explore Vaults', type: 'primary', action: 'explore-top-vaults' },
          { id: 'set-alerts', label: 'Set Alerts', type: 'secondary', action: 'set-alerts' }
        ]
      };
    }

    // Default responses
    const defaultResponses = [
      {
        content: "I understand you're interested in DeFi strategies. Based on current market conditions, I'd recommend looking into yield farming opportunities with stablecoin pairs for lower risk, or exploring new protocol launches for higher potential returns.",
        actions: [
          { id: 'explore-yields', label: 'Explore Yields', type: 'primary', action: 'explore-yields' },
          { id: 'risk-assessment', label: 'Risk Assessment', type: 'secondary', action: 'risk-assessment' }
        ]
      },
      {
        content: "Risk management is crucial in DeFi. Always ensure you understand the smart contracts you're interacting with, and never invest more than you can afford to lose. Consider using our risk assessment tools.",
        actions: [
          { id: 'check-audits', label: 'Check Audit Status', type: 'primary', action: 'check-audits' },
          { id: 'learn-safety', label: 'Learn Safety Tips', type: 'secondary', action: 'learn-safety' }
        ]
      }
    ];

    const response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    return {
      id: (Date.now() + 1).toString(),
      content: response.content,
      role: 'assistant',
      timestamp: new Date(),
      actions: response.actions as ActionButton[]
    };
  };

  const handleAction = (action: string, vaultId?: string) => {
    if (action === 'view-vault' && vaultId) {
      navigate(`/vault/${vaultId}`);
      return;
    }

    if (action === 'auto-deposit') {
      // Mock auto-deposit action
      const depositMessage: Message = {
        id: Date.now().toString(),
        content: 'Transaction submitted! ✅\n\nYour 100 USDC has been deposited into the Aave v3 leveraged vault.\n\n• Transaction Hash: 0x1234...5678\n• Expected APY: 8.32%\n• Status: Pending confirmation',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, depositMessage]);
      return;
    }

    if (action === 'confirm-swap') {
      // Mock swap confirmation
      const swapMessage: Message = {
        id: Date.now().toString(),
        content: 'Swap confirmed! ✅\n\n• Input: 100 USDC\n• Output: 0.0538 ETH\n• Gas Used: 0.0013 ETH\n• Transaction Hash: 0xabcd...efgh\n• Status: Completed',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, swapMessage]);
      return;
    }

    // Handle other actions
    const actionMessages: Record<string, string> = {
      'auto-rebalance': 'Portfolio rebalanced successfully! ✅\n\n• stARTIST: 80% → 60%\n• stUSDC: 20% → 40%\n• Expected Blended APY: 8.2%\n• Risk Score: Reduced by 15%',
      'deploy-vault': 'Vault deployment initiated! 🚀\n\n• Vault Type: MusicVault\n• Token Symbol: stTAYLOR\n• Yield Split: 70% Artist / 30% Fans\n• Status: Deploying...',
      'generate-repo': 'Repository generated! 📁\n\n• Repo URL: github.com/napfi/starter-vault\n• API Key: nf_live_1234...5678\n• Documentation: docs.napfi.com/sdk\n• Status: Ready to code!'
    };

    if (actionMessages[action]) {
      const actionMessage: Message = {
        id: Date.now().toString(),
        content: actionMessages[action],
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, actionMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AppSidebar />
      
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        <div className="h-screen flex flex-col">
          {/* Header */}
          <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="p-4 md:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent">
                    AI Assistant
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Your intelligent DeFi companion
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea ref={scrollAreaRef} className="h-full">
              <div className="p-4 md:p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-4 max-w-4xl mx-auto",
                      message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                    )}
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src="" />
                      <AvatarFallback className={cn(
                        "text-xs",
                        message.role === 'user' 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-secondary text-secondary-foreground"
                      )}>
                        {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>

                    <Card className={cn(
                      "flex-1 max-w-3xl",
                      message.role === 'user' 
                        ? "bg-primary/5 border-primary/20" 
                        : "bg-card border-border"
                    )}>
                      <CardContent className="p-4">
                        <div className="prose prose-sm max-w-none">
                          <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                            {message.content}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        {message.actions && message.actions.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {message.actions.map((action) => (
                              <Button
                                key={action.id}
                                variant={action.type === 'primary' ? 'default' : action.type === 'secondary' ? 'secondary' : 'outline'}
                                size="sm"
                                onClick={() => handleAction(action.action, action.vaultId)}
                                className="h-8 px-3 text-xs"
                              >
                                {action.label}
                                {action.action === 'view-vault' && <ExternalLink className="h-3 w-3 ml-1" />}
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(message.content)}
                              className="h-8 w-8 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-4 max-w-4xl mx-auto">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <Card className="flex-1 max-w-3xl">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                          <span className="text-sm text-muted-foreground">AI is thinking...</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 bg-card/50 backdrop-blur-sm p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about DeFi, yield farming, portfolio optimization..."
                  className="min-h-[60px] max-h-[200px] resize-none pr-12 border-border/50 focus:border-primary/50"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute bottom-2 right-2 h-8 w-8 p-0"
                  size="sm"
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInput("Find me the best yield for USDC on Optimism right now")}
                  className="h-7 px-2 text-xs"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Find Best Yields
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInput("Swap 100 USDC to ETH with lowest slippage")}
                  className="h-7 px-2 text-xs"
                >
                  <ArrowRight className="h-3 w-3 mr-1" />
                  DEX Aggregator
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInput("I'm a musician, can I deploy a vault for my Spotify income?")}
                  className="h-7 px-2 text-xs"
                >
                  <Star className="h-3 w-3 mr-1" />
                  Create Vault
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInput("Analyze my current vaults and suggest reallocation")}
                  className="h-7 px-2 text-xs"
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Portfolio Analysis
                </Button>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>Press Enter to send, Shift+Enter for new line</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3 w-3" />
                  <span>Powered by AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AI;



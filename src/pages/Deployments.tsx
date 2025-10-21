import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  Coins, 
  TrendingUp, 
  Bot, 
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Star,
  Code,
  Users,
  BarChart3
} from "lucide-react";
import { cn } from "@/lib/utils";

const Deployments = () => {
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const features = [
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Token Deployment",
      description: "Deploy ERC-20 tokens with customizable supply, royalties, and distribution",
      features: ["Fixed/Mintable Supply", "Royalty Configuration", "Instant Deployment"],
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Vault Deployment", 
      description: "Create yield-generating vaults with AI-optimized strategies",
      features: ["ERC-4626 Standard", "AI Strategy Selection", "Auto-Compounding"],
      color: "from-green-500 to-blue-600"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Ownership NFTs",
      description: "Mint ERC-721 NFTs for vault ownership and governance rights",
      features: ["Governance Rights", "Fee Collection", "Strategy Control"],
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Revenue Sharing",
      description: "Distribute yield to fans and supporters via ERC-1155 tokens",
      features: ["Fractional Ownership", "Automatic Distribution", "Fan Engagement"],
      color: "from-orange-500 to-red-600"
    }
  ];

  const stats = [
    { label: "Vaults Deployed", value: "1,247", change: "+12%" },
    { label: "Total TVL", value: "$42.3M", change: "+8%" },
    { label: "Active Strategies", value: "156", change: "+5%" },
    { label: "Average APY", value: "8.7%", change: "+0.3%" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AppSidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
      
      <main className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "lg:ml-64" : "lg:ml-20"
      )}>
        <div className={cn(
          "mx-auto max-w-7xl transition-all duration-300",
          sidebarOpen ? "px-4 md:px-6 lg:px-8" : "px-6 md:px-8 lg:px-10"
        )}>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent mb-2">
                  NapFi Deployment Terminal
                </h1>
                <p className="text-xl text-muted-foreground">
                  Deploy tokens, vaults, and strategies in minutes with AI assistance
                </p>
              </div>
              <Button
                onClick={() => setAiSidebarOpen(true)}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                size="lg"
              >
                <Bot className="h-5 w-5 mr-2" />
                Ask NapFi Brain
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <Badge variant="secondary" className="text-green-600 bg-green-100">
                      {stat.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Deployment Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                    <Coins className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Deploy ERC-20 Token</CardTitle>
                    <p className="text-sm text-muted-foreground">Create your custom token</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Deploy ERC-20 tokens with customizable supply, royalties, and distribution mechanisms.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Secure smart contracts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>Instant deployment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Code className="h-4 w-4 text-blue-500" />
                    <span>ERC-20 standard</span>
                  </div>
                </div>
                <Button 
                  onClick={() => window.location.href = '/deploy/token'}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  size="lg"
                >
                  Deploy Token
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-blue-600/10 border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                    <TrendingUp className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Deploy Yield Vault</CardTitle>
                    <p className="text-sm text-muted-foreground">Create AI-optimized vault</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Deploy ERC-4626 vaults with AI-selected strategies for optimal yield generation.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Bot className="h-4 w-4 text-purple-500" />
                    <span>AI strategy selection</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BarChart3 className="h-4 w-4 text-green-500" />
                    <span>Auto-compounding</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span>ERC-4626 standard</span>
                  </div>
                </div>
                <Button 
                  onClick={() => window.location.href = '/deploy/vault'}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                  size="lg"
                >
                  Deploy Vault
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={cn("p-3 rounded-lg bg-gradient-to-r w-fit mb-4", feature.color)}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-1">
                      {feature.features.map((feat, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="h-1 w-1 bg-primary rounded-full" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Deployments */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Recent Deployments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    type: "Vault",
                    name: "stTAYLOR MusicVault",
                    apy: "12.4%",
                    tvl: "$2.3M",
                    status: "Active",
                    time: "2 hours ago"
                  },
                  {
                    type: "Token",
                    name: "ARTIST Token",
                    apy: "N/A",
                    tvl: "$850K",
                    status: "Deployed",
                    time: "5 hours ago"
                  },
                  {
                    type: "Vault",
                    name: "USDC Optimizer",
                    apy: "8.7%",
                    tvl: "$1.2M",
                    status: "Active",
                    time: "1 day ago"
                  }
                ].map((deployment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "p-2 rounded-lg",
                        deployment.type === "Vault" ? "bg-green-500/20" : "bg-blue-500/20"
                      )}>
                        {deployment.type === "Vault" ? (
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        ) : (
                          <Coins className="h-4 w-4 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{deployment.name}</p>
                        <p className="text-sm text-muted-foreground">{deployment.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">TVL</p>
                        <p className="font-medium">{deployment.tvl}</p>
                      </div>
                      {deployment.apy !== "N/A" && (
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">APY</p>
                          <p className="font-medium text-green-400">{deployment.apy}</p>
                        </div>
                      )}
                      <Badge 
                        variant={deployment.status === "Active" ? "default" : "secondary"}
                        className={deployment.status === "Active" ? "bg-green-500" : ""}
                      >
                        {deployment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* AI Chat Sidebar */}
      {aiSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex">
          <div className="ml-auto w-96 h-full bg-card border-l border-border shadow-2xl">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">NapFi Brain</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAiSidebarOpen(false)}
                >
                  ×
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="bg-muted/30 rounded-lg p-3">
                <p className="text-sm">💡 Quick suggestions:</p>
                <div className="mt-2 space-y-2">
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    Create low-risk USDC vault
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    Deploy artist revenue token
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    Optimize my portfolio
                  </Button>
                </div>
              </div>
              <div className="text-center text-muted-foreground">
                <p className="text-sm">AI chat integration coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deployments;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  TrendingUp, 
  CheckCircle, 
  ExternalLink,
  Copy,
  Bot,
  Info,
  Zap,
  Shield,
  Users,
  Star,
  BarChart3,
  Sparkles,
  Coins
} from "lucide-react";
import { cn } from "@/lib/utils";

const DeployVault = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    vaultName: "",
    symbol: "",
    description: "",
    underlyingToken: "",
    strategyType: "stable-yield",
    enableOwnershipNFT: true,
    enableFractionalToken: true,
    revenueSplit: 30,
    royaltyFee: 2.5,
    estimatedAPY: 0
  });

  const [deploymentResult, setDeploymentResult] = useState({
    vaultAddress: "",
    nftAddress: "",
    tokenAddress: "",
    transactionHash: "",
    explorerUrl: ""
  });

  const strategies = [
    {
      id: "stable-yield",
      name: "Stable Yield",
      description: "Low-risk stablecoin strategies with consistent returns",
      apy: "4.2-6.8%",
      risk: "Low",
      color: "bg-green-500/20 text-green-400 border-green-500/30"
    },
    {
      id: "lp-strategy",
      name: "LP Strategy",
      description: "Liquidity provision across multiple DEXs",
      apy: "8.1-12.4%",
      risk: "Medium",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30"
    },
    {
      id: "ai-auto",
      name: "AI Auto Strategy",
      description: "AI-optimized multi-strategy allocation",
      apy: "7.3-15.2%",
      risk: "Medium-High",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30"
    },
    {
      id: "custom",
      name: "Custom Strategy",
      description: "Deploy your own custom yield strategy",
      apy: "Variable",
      risk: "Variable",
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30"
    }
  ];

  const tokens = [
    { symbol: "USDC", name: "USD Coin", balance: "1,250" },
    { symbol: "USDT", name: "Tether USD", balance: "850" },
    { symbol: "DAI", name: "Dai Stablecoin", balance: "2,100" },
    { symbol: "ETH", name: "Ethereum", balance: "5.2" },
    { symbol: "ARTIST", name: "Artist Token", balance: "10,000" }
  ];

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Update estimated APY based on strategy
    if (field === 'strategyType') {
      const strategy = strategies.find(s => s.id === value);
      if (strategy) {
        const apyRange = strategy.apy.split('-');
        const avgAPY = (parseFloat(apyRange[0]) + parseFloat(apyRange[1])) / 2;
        setFormData(prev => ({ ...prev, estimatedAPY: avgAPY }));
      }
    }
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setDeploymentResult({
      vaultAddress: "0x8a4b2c6d9e1f3a5b7c9d2e4f6a8b0c2d4e6f8a0b",
      nftAddress: "0x9b5c3d7e0f2a4b6c8d1e3f5a7b9c0d2e4f6a8b0c",
      tokenAddress: "0xa6d4e5f7a9b2c4d6e8f0a3b5c7d9e1f4a6b8c0d2e",
      transactionHash: "0xb7e5f6a8b0c2d4e6f8a1b3c5d7e9f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f",
      explorerUrl: "https://optimistic.etherscan.io/address/0x8a4b2c6d9e1f3a5b7c9d2e4f6a8b0c2d4e6f8a0b"
    });
    
    setIsDeploying(false);
    setIsDeployed(true);
    setStep(5);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const steps = [
    { number: 1, title: "Vault Info", description: "Basic details" },
    { number: 2, title: "Strategy", description: "Yield strategy" },
    { number: 3, title: "Ownership", description: "NFT & tokens" },
    { number: 4, title: "Review", description: "Deployment summary" },
    { number: 5, title: "Complete", description: "Success!" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AppSidebar />
      
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/deployments')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Deployments
            </Button>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent mb-2">
                  Deploy Yield Vault
                </h1>
                <p className="text-muted-foreground">
                  Create an ERC-4626 vault with AI-optimized strategies and optional ownership features
                </p>
              </div>
              <Button
                onClick={() => setAiSidebarOpen(true)}
                variant="outline"
                className="border-primary/20 hover:border-primary/40"
              >
                <Bot className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between overflow-x-auto">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center min-w-0">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 flex-shrink-0",
                    step >= stepItem.number
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground/30 text-muted-foreground"
                  )}>
                    {step > stepItem.number ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="font-semibold">{stepItem.number}</span>
                    )}
                  </div>
                  <div className="ml-3 hidden sm:block min-w-0">
                    <p className="font-medium truncate">{stepItem.title}</p>
                    <p className="text-sm text-muted-foreground">{stepItem.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-8 h-0.5 mx-4 transition-all duration-300 flex-shrink-0",
                      step > stepItem.number ? "bg-primary" : "bg-muted-foreground/30"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Vault Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vaultName">Vault Name *</Label>
                        <Input
                          id="vaultName"
                          placeholder="My Yield Vault"
                          value={formData.vaultName}
                          onChange={(e) => handleInputChange('vaultName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="symbol">Symbol *</Label>
                        <Input
                          id="symbol"
                          placeholder="MYV"
                          value={formData.symbol}
                          onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                          maxLength={10}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your vault and its strategy..."
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="underlyingToken">Underlying Token *</Label>
                      <Select value={formData.underlyingToken} onValueChange={(value) => handleInputChange('underlyingToken', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                        <SelectContent>
                          {tokens.map((token) => (
                            <SelectItem key={token.symbol} value={token.symbol}>
                              <div className="flex items-center justify-between w-full">
                                <div>
                                  <span className="font-medium">{token.symbol}</span>
                                  <span className="text-muted-foreground ml-2">- {token.name}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{token.balance}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Select the token that will be deposited into this vault
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Strategy Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Choose Strategy Type</Label>
                      <RadioGroup
                        value={formData.strategyType}
                        onValueChange={(value) => handleInputChange('strategyType', value)}
                      >
                        <div className="grid grid-cols-1 gap-4">
                          {strategies.map((strategy) => (
                            <div key={strategy.id} className="flex items-start space-x-3">
                              <RadioGroupItem value={strategy.id} id={strategy.id} className="mt-1" />
                              <Label htmlFor={strategy.id} className="flex-1 cursor-pointer">
                                <Card className={cn("border-2 transition-all duration-200", 
                                  formData.strategyType === strategy.id ? strategy.color : "border-border/50 hover:border-border"
                                )}>
                                  <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <h3 className="font-semibold">{strategy.name}</h3>
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-xs">
                                          {strategy.apy}
                                        </Badge>
                                        <Badge 
                                          variant={strategy.risk === 'Low' ? 'default' : strategy.risk === 'Medium' ? 'secondary' : 'destructive'}
                                          className="text-xs"
                                        >
                                          {strategy.risk}
                                        </Badge>
                                      </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{strategy.description}</p>
                                  </CardContent>
                                </Card>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {formData.strategyType && (
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span className="font-medium">Estimated Performance</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Expected APY</p>
                            <p className="text-lg font-semibold text-green-400">
                              {formData.estimatedAPY.toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Risk Level</p>
                            <p className="text-lg font-semibold">
                              {strategies.find(s => s.id === formData.strategyType)?.risk}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Ownership & Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Ownership NFT (ERC-721)</Label>
                          <p className="text-sm text-muted-foreground">
                            Mint an NFT that represents ownership and governance rights
                          </p>
                        </div>
                        <Switch
                          checked={formData.enableOwnershipNFT}
                          onCheckedChange={(checked) => handleInputChange('enableOwnershipNFT', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-base font-medium">Fractional Yield Token (ERC-1155)</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable revenue sharing with fans and supporters
                          </p>
                        </div>
                        <Switch
                          checked={formData.enableFractionalToken}
                          onCheckedChange={(checked) => handleInputChange('enableFractionalToken', checked)}
                        />
                      </div>
                    </div>

                    {formData.enableFractionalToken && (
                      <>
                        <Separator />
                        
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label>Fan Revenue Share</Label>
                            <Badge variant="outline">{formData.revenueSplit}%</Badge>
                          </div>
                          <Slider
                            value={[formData.revenueSplit]}
                            onValueChange={(value) => handleInputChange('revenueSplit', value[0])}
                            max={50}
                            step={1}
                            className="w-full"
                          />
                          <p className="text-sm text-muted-foreground">
                            Percentage of vault revenue that goes to fan token holders
                          </p>
                        </div>
                      </>
                    )}

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Creator Royalty Fee</Label>
                        <Badge variant="outline">{formData.royaltyFee}%</Badge>
                      </div>
                      <Slider
                        value={[formData.royaltyFee]}
                        onValueChange={(value) => handleInputChange('royaltyFee', value[0])}
                        max={10}
                        step={0.1}
                        className="w-full"
                      />
                      <p className="text-sm text-muted-foreground">
                        Fee collected by the vault creator on all transactions
                      </p>
                    </div>

                    {(formData.enableOwnershipNFT || formData.enableFractionalToken) && (
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">Ownership Features</span>
                        </div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {formData.enableOwnershipNFT && (
                            <li>• Governance rights for strategy changes</li>
                          )}
                          {formData.enableOwnershipNFT && (
                            <li>• Fee collection from vault performance</li>
                          )}
                          {formData.enableFractionalToken && (
                            <li>• Automatic revenue distribution to fans</li>
                          )}
                          {formData.enableFractionalToken && (
                            <li>• Fan engagement and community building</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {step === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Deployment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Vault Name</p>
                          <p className="font-medium">{formData.vaultName || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Symbol</p>
                          <p className="font-medium">{formData.symbol || "Not specified"}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Underlying Token</p>
                          <p className="font-medium">{formData.underlyingToken || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Strategy</p>
                          <p className="font-medium capitalize">
                            {strategies.find(s => s.id === formData.strategyType)?.name || "Not specified"}
                          </p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Expected APY</p>
                          <p className="font-medium text-green-400">{formData.estimatedAPY.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Creator Royalty</p>
                          <p className="font-medium">{formData.royaltyFee}%</p>
                        </div>
                      </div>

                      {(formData.enableOwnershipNFT || formData.enableFractionalToken) && (
                        <>
                          <Separator />
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Additional Features</p>
                            <div className="flex flex-wrap gap-2">
                              {formData.enableOwnershipNFT && (
                                <Badge variant="secondary">Ownership NFT</Badge>
                              )}
                              {formData.enableFractionalToken && (
                                <Badge variant="secondary">Fan Revenue Share ({formData.revenueSplit}%)</Badge>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium mb-2">Deployment Details</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Vault contract will be deployed on Optimism</li>
                            <li>• Gas fee estimated: ~0.005 ETH</li>
                            <li>• Deployment time: ~45 seconds</li>
                            <li>• All contracts will be verified on Etherscan</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleDeploy}
                      disabled={isDeploying}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                      size="lg"
                    >
                      {isDeploying ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Deploying Vault...
                        </>
                      ) : (
                        "Deploy Vault"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 5 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      Vault Deployed Successfully!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <p className="font-medium text-green-700">Deployment Complete</p>
                      </div>
                      <p className="text-sm text-green-600">
                        Your vault has been successfully deployed to Optimism network with all requested features.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Vault Contract Address</p>
                        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                          <code className="flex-1 text-sm font-mono">{deploymentResult.vaultAddress}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(deploymentResult.vaultAddress)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {formData.enableOwnershipNFT && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">NFT Contract Address</p>
                          <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                            <code className="flex-1 text-sm font-mono">{deploymentResult.nftAddress}</code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(deploymentResult.nftAddress)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {formData.enableFractionalToken && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Fan Token Address</p>
                          <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                            <code className="flex-1 text-sm font-mono">{deploymentResult.tokenAddress}</code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(deploymentResult.tokenAddress)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}

                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Transaction Hash</p>
                        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                          <code className="flex-1 text-sm font-mono">{deploymentResult.transactionHash}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(deploymentResult.transactionHash)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Button
                        variant="outline"
                        onClick={() => window.open(deploymentResult.explorerUrl, '_blank')}
                        className="flex-1"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Explorer
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => navigate('/dashboard')}
                        className="flex-1"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Dashboard
                      </Button>
                      <Button
                        onClick={() => navigate('/deployments')}
                        className="flex-1"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Deploy Another
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              {step < 5 && (
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setStep(Math.min(5, step + 1))}
                    disabled={step === 4 && (!formData.vaultName || !formData.symbol || !formData.underlyingToken || !formData.strategyType)}
                  >
                    {step === 4 ? "Deploy Vault" : "Next"}
                  </Button>
                </div>
              )}
            </div>

            {/* AI Assistant Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm mb-3">💡 Quick tips for this step:</p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {step === 1 && (
                        <>
                          <li>• Choose a descriptive vault name</li>
                          <li>• Select the token you want to deposit</li>
                          <li>• Description helps users understand the vault</li>
                        </>
                      )}
                      {step === 2 && (
                        <>
                          <li>• AI Auto Strategy offers best risk/reward</li>
                          <li>• Stable Yield is safest option</li>
                          <li>• LP Strategy provides good returns</li>
                        </>
                      )}
                      {step === 3 && (
                        <>
                          <li>• Ownership NFT gives governance rights</li>
                          <li>• Fan tokens enable community building</li>
                          <li>• Revenue split should balance creator/fan interests</li>
                        </>
                      )}
                      {step === 4 && (
                        <>
                          <li>• Review all settings carefully</li>
                          <li>• Deployment creates multiple contracts</li>
                          <li>• Gas fees vary by feature complexity</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setAiSidebarOpen(true)}
                  >
                    <Bot className="h-4 w-4 mr-2" />
                    Ask NapFi Brain
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
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
                <p className="text-sm font-medium mb-2">Vault Deployment Help:</p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    Explain ERC-4626 standard
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    Compare strategy types
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    Optimize APY settings
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

export default DeployVault;

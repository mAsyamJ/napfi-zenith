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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Coins, 
  CheckCircle, 
  ExternalLink,
  Copy,
  Bot,
  Info,
  Zap,
  Shield,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";

const DeployToken = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    initialSupply: "",
    decimals: "18",
    distributionType: "fixed",
    royalty: 0,
    description: ""
  });

  const [deploymentResult, setDeploymentResult] = useState({
    contractAddress: "",
    transactionHash: "",
    explorerUrl: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setDeploymentResult({
      contractAddress: "0x742d35Cc6634C0532925a3b8D8C4b7e3e8F4B2A1",
      transactionHash: "0x8f4b2a1c9d7e5f3a6b8c2d4e7f9a1b3c5d7e9f2a4b6c8d0e2f4a6b8c0d2e4f6a8b",
      explorerUrl: "https://optimistic.etherscan.io/address/0x742d35Cc6634C0532925a3b8D8C4b7e3e8F4B2A1"
    });
    
    setIsDeploying(false);
    setIsDeployed(true);
    setStep(4);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const steps = [
    { number: 1, title: "Basic Info", description: "Token details" },
    { number: 2, title: "Supply", description: "Distribution settings" },
    { number: 3, title: "Review", description: "Deployment summary" },
    { number: 4, title: "Complete", description: "Success!" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AppSidebar />
      
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
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
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  Deploy ERC-20 Token
                </h1>
                <p className="text-muted-foreground">
                  Create your custom token with advanced features and royalty distribution
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
            <div className="flex items-center justify-between">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300",
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
                  <div className="ml-3 hidden sm:block">
                    <p className="font-medium">{stepItem.title}</p>
                    <p className="text-sm text-muted-foreground">{stepItem.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-12 h-0.5 mx-4 transition-all duration-300",
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
                      <Coins className="h-5 w-5" />
                      Basic Token Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Token Name *</Label>
                        <Input
                          id="name"
                          placeholder="My Awesome Token"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="symbol">Symbol *</Label>
                        <Input
                          id="symbol"
                          placeholder="MAT"
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
                        placeholder="Describe your token and its utility..."
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="decimals">Decimals</Label>
                      <Input
                        id="decimals"
                        type="number"
                        value={formData.decimals}
                        onChange={(e) => handleInputChange('decimals', e.target.value)}
                        min="0"
                        max="18"
                      />
                      <p className="text-sm text-muted-foreground">
                        Standard is 18 decimals. Lower values make the token less divisible.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Supply & Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="supply">Initial Supply *</Label>
                      <Input
                        id="supply"
                        placeholder="1000000"
                        value={formData.initialSupply}
                        onChange={(e) => handleInputChange('initialSupply', e.target.value)}
                        type="number"
                      />
                      <p className="text-sm text-muted-foreground">
                        Total number of tokens to mint initially
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Label>Distribution Type</Label>
                      <RadioGroup
                        value={formData.distributionType}
                        onValueChange={(value) => handleInputChange('distributionType', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fixed" id="fixed" />
                          <Label htmlFor="fixed" className="flex-1">
                            <div>
                              <p className="font-medium">Fixed Supply</p>
                              <p className="text-sm text-muted-foreground">
                                Supply is fixed and cannot be changed after deployment
                              </p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="mintable" id="mintable" />
                          <Label htmlFor="mintable" className="flex-1">
                            <div>
                              <p className="font-medium">Mintable</p>
                              <p className="text-sm text-muted-foreground">
                                Owner can mint additional tokens in the future
                              </p>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="burnable" id="burnable" />
                          <Label htmlFor="burnable" className="flex-1">
                            <div>
                              <p className="font-medium">Burnable</p>
                              <p className="text-sm text-muted-foreground">
                                Tokens can be burned to reduce total supply
                              </p>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Royalty Percentage</Label>
                        <Badge variant="outline">{formData.royalty}%</Badge>
                      </div>
                      <Slider
                        value={[formData.royalty]}
                        onValueChange={(value) => handleInputChange('royalty', value[0].toString())}
                        max={10}
                        step={0.1}
                        className="w-full"
                      />
                      <p className="text-sm text-muted-foreground">
                        Percentage of transactions that go to the token creator as royalties
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
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
                          <p className="text-sm text-muted-foreground">Token Name</p>
                          <p className="font-medium">{formData.name || "Not specified"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Symbol</p>
                          <p className="font-medium">{formData.symbol || "Not specified"}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Initial Supply</p>
                          <p className="font-medium">
                            {formData.initialSupply ? `${parseInt(formData.initialSupply).toLocaleString()} ${formData.symbol}` : "Not specified"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Decimals</p>
                          <p className="font-medium">{formData.decimals}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Distribution</p>
                          <p className="font-medium capitalize">{formData.distributionType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Royalty</p>
                          <p className="font-medium">{formData.royalty}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium mb-2">Deployment Details</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Contract will be deployed on Optimism</li>
                            <li>• Gas fee estimated: ~0.002 ETH</li>
                            <li>• Deployment time: ~30 seconds</li>
                            <li>• Contract will be verified on Etherscan</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleDeploy}
                      disabled={isDeploying}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      size="lg"
                    >
                      {isDeploying ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Deploying Token...
                        </>
                      ) : (
                        "Deploy Token"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 4 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      Token Deployed Successfully!
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <p className="font-medium text-green-700">Deployment Complete</p>
                      </div>
                      <p className="text-sm text-green-600">
                        Your token has been successfully deployed to Optimism network.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Contract Address</p>
                        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                          <code className="flex-1 text-sm font-mono">{deploymentResult.contractAddress}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(deploymentResult.contractAddress)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

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

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => window.open(deploymentResult.explorerUrl, '_blank')}
                        className="flex-1"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View on Explorer
                      </Button>
                      <Button
                        onClick={() => navigate('/deployments')}
                        className="flex-1"
                      >
                        Create Vault with this Token
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation Buttons */}
              {step < 4 && (
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setStep(Math.min(4, step + 1))}
                    disabled={step === 3 && (!formData.name || !formData.symbol || !formData.initialSupply)}
                  >
                    {step === 3 ? "Deploy Token" : "Next"}
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
                          <li>• Choose a memorable name and symbol</li>
                          <li>• Standard is 18 decimals for most tokens</li>
                          <li>• Description helps users understand your token</li>
                        </>
                      )}
                      {step === 2 && (
                        <>
                          <li>• Fixed supply is most secure</li>
                          <li>• Mintable allows future token creation</li>
                          <li>• Royalties provide ongoing revenue</li>
                        </>
                      )}
                      {step === 3 && (
                        <>
                          <li>• Review all details carefully</li>
                          <li>• Deployment is irreversible</li>
                          <li>• Gas fees are paid in ETH</li>
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
                <p className="text-sm font-medium mb-2">Token Deployment Help:</p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    Explain token standards
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    Calculate gas costs
                  </Button>
                  <Button variant="outline" size="sm" className="w-full text-left justify-start">
                    Best practices for naming
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

export default DeployToken;

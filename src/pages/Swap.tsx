import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, ChevronDown, Info } from "lucide-react";
import { mockTokens, Token } from "@/data/mockTokens";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useNavigate } from "react-router-dom";

const Swap = () => {
  const navigate = useNavigate();
  const [payToken, setPayToken] = useState<Token>(mockTokens[0]); // USDC
  const [receiveToken, setReceiveToken] = useState<Token>(mockTokens[2]); // COW
  const [payAmount, setPayAmount] = useState<string>("100");
  const [selectingToken, setSelectingToken] = useState<"pay" | "receive" | null>(null);

  const calculateReceiveAmount = () => {
    if (!payAmount || isNaN(parseFloat(payAmount))) return "0";
    const amount = parseFloat(payAmount);
    const rate = payToken.price / receiveToken.price;
    return (amount * rate).toFixed(6);
  };

  const calculateUsdValue = (amount: string, token: Token) => {
    if (!amount || isNaN(parseFloat(amount))) return "0.00";
    return (parseFloat(amount) * token.price).toFixed(2);
  };

  const handleSwapTokens = () => {
    const temp = payToken;
    setPayToken(receiveToken);
    setReceiveToken(temp);
  };

  const handleSelectToken = (token: Token) => {
    if (selectingToken === "pay") {
      setPayToken(token);
    } else if (selectingToken === "receive") {
      setReceiveToken(token);
    }
    setSelectingToken(null);
  };

  if (selectingToken) {
    return (
      <div className="min-h-screen bg-background text-foreground flex">
        <AppSidebar />
        
        <main className="flex-1 lg:ml-64 transition-all duration-300">
          {/* Upper Navbar */}
          <div className="border-b border-border bg-card">
            <div className="p-4 md:p-6">
              <div className="flex gap-6">
                <button className="px-4 py-2 font-medium text-foreground border-b-2 border-primary">
                  Swap
                </button>
                <button className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Pro
                </button>
                <button className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Portfolio
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            <button
              onClick={() => setSelectingToken(null)}
              className="mb-6 flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronDown className="h-4 w-4 mr-2 rotate-90" />
              Back to Swap
            </button>

            <Card className="max-w-2xl mx-auto bg-card border-border">
              <CardHeader>
                <CardTitle>Select Token</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="Search by name or symbol..."
                  className="mb-4"
                />

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {mockTokens.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => handleSelectToken(token)}
                      className="w-full p-4 bg-muted/50 hover:bg-muted rounded-lg transition-all duration-200 hover:border-primary/50 border border-transparent group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={token.logo}
                            alt={token.symbol}
                            className="w-10 h-10 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src = "https://cryptologos.cc/logos/placeholder-logo.png";
                            }}
                          />
                          <div className="text-left">
                            <div className="font-bold">{token.symbol}</div>
                            <div className="text-sm text-muted-foreground">{token.name}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold">
                            ${token.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                          <div
                            className={`text-sm ${
                              token.change.startsWith("+")
                                ? "text-success"
                                : token.change.startsWith("-")
                                ? "text-destructive"
                                : "text-muted-foreground"
                            }`}
                          >
                            {token.change}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-border/50 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <div>
                          <div>Liquidity</div>
                          <div className="text-foreground font-medium">{token.liquidity}</div>
                        </div>
                        <div>
                          <div>24h Volume</div>
                          <div className="text-foreground font-medium">{token.volume24h}</div>
                        </div>
                        <div>
                          <div>Market Cap</div>
                          <div className="text-foreground font-medium">{token.marketCap}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AppSidebar />
      
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        {/* Upper Navbar */}
        <div className="border-b border-border bg-card">
          <div className="p-4 md:p-6">
            <div className="flex gap-6">
              <button className="px-4 py-2 font-medium text-foreground border-b-2 border-primary">
                Swap
              </button>
              <button className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pro
              </button>
              <button className="px-4 py-2 font-medium text-muted-foreground hover:text-foreground transition-colors">
                Portfolio
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Swap</h1>
            <p className="text-muted-foreground">Trade tokens with best execution guaranteed</p>
          </div>

          <div className="max-w-lg mx-auto">
            <Card className="bg-card border-border shadow-lg">
              <CardHeader>
                <div className="flex gap-4 mb-4">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
                    Swap
                  </button>
                  <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
                    Limit
                  </button>
                  <button className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors">
                    TWAP
                  </button>
                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                {/* Pay Section */}
                <div className="bg-background rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Pay</span>
                    <span className="text-sm text-muted-foreground">Balance: 0.00</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Input
                      type="number"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      placeholder="0.0"
                      className="text-2xl font-bold bg-transparent border-none p-0 h-auto flex-1"
                    />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <button
                          onClick={() => setSelectingToken("pay")}
                          className="flex items-center gap-2 bg-muted hover:bg-muted/80 px-3 py-2 rounded-lg transition-colors group"
                        >
                          <img
                            src={payToken.logo}
                            alt={payToken.symbol}
                            className="w-6 h-6 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src = "https://cryptologos.cc/logos/placeholder-logo.png";
                            }}
                          />
                          <span className="font-medium">{payToken.symbol}</span>
                          <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                        </button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <img src={payToken.logo} alt={payToken.symbol} className="w-12 h-12 rounded-full" />
                            <div>
                              <h4 className="font-bold text-lg">{payToken.symbol}</h4>
                              <p className="text-sm text-muted-foreground">{payToken.name}</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Current Price</span>
                              <span className="font-medium">${payToken.price.toLocaleString()}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                           <div className="text-muted-foreground">1h</div>
                                <div className={payToken.change1h?.startsWith("+") ? "text-success" : "text-destructive"}>
                                  {payToken.change1h}
                                </div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">24h</div>
                                <div className={payToken.change24h?.startsWith("+") ? "text-success" : "text-destructive"}>
                                  {payToken.change24h}
                                </div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">7d</div>
                                <div className={payToken.change7d?.startsWith("+") ? "text-success" : "text-destructive"}>
                                  {payToken.change7d}
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">24h Volume</span>
                              <span className="font-medium">{payToken.volume24h}</span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    ≈ ${calculateUsdValue(payAmount, payToken)}
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center -my-2 relative z-10">
                  <button
                    onClick={handleSwapTokens}
                    className="bg-background hover:bg-muted p-2 rounded-full border border-border transition-colors"
                  >
                    <ArrowDownUp className="h-5 w-5 text-primary" />
                  </button>
                </div>

                {/* Receive Section */}
                <div className="bg-background rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Receive (estimated)</span>
                    <span className="text-sm text-muted-foreground">Balance: 0.00</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="text-2xl font-bold flex-1">
                      {calculateReceiveAmount()}
                    </div>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <button
                          onClick={() => setSelectingToken("receive")}
                          className="flex items-center gap-2 bg-muted hover:bg-muted/80 px-3 py-2 rounded-lg transition-colors group"
                        >
                          <img
                            src={receiveToken.logo}
                            alt={receiveToken.symbol}
                            className="w-6 h-6 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src = "https://cryptologos.cc/logos/placeholder-logo.png";
                            }}
                          />
                          <span className="font-medium">{receiveToken.symbol}</span>
                          <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                        </button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <img src={receiveToken.logo} alt={receiveToken.symbol} className="w-12 h-12 rounded-full" />
                            <div>
                              <h4 className="font-bold text-lg">{receiveToken.symbol}</h4>
                              <p className="text-sm text-muted-foreground">{receiveToken.name}</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Current Price</span>
                              <span className="font-medium">${receiveToken.price.toLocaleString()}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                           <div className="text-muted-foreground">1h</div>
                                <div className={receiveToken.change1h?.startsWith("+") ? "text-success" : "text-destructive"}>
                                  {receiveToken.change1h}
                                </div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">24h</div>
                                <div className={receiveToken.change24h?.startsWith("+") ? "text-success" : "text-destructive"}>
                                  {receiveToken.change24h}
                                </div>
                              </div>
                              <div>
                                <div className="text-muted-foreground">7d</div>
                                <div className={receiveToken.change7d?.startsWith("+") ? "text-success" : "text-destructive"}>
                                  {receiveToken.change7d}
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">24h Volume</span>
                              <span className="font-medium">{receiveToken.volume24h}</span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    ≈ ${calculateUsdValue(calculateReceiveAmount(), receiveToken)}
                  </div>
                </div>

                {/* Exchange Rate */}
                <div className="bg-background rounded-xl p-3 text-sm text-muted-foreground">
                  1 {receiveToken.symbol} = {(payToken.price / receiveToken.price).toFixed(6)} {payToken.symbol}
                </div>

                {/* Swap Button */}
                <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity h-12 text-base font-medium">
                  Connect Wallet
                </Button>

                {/* Footer */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
                  <Info className="h-3 w-3" />
                  <span>Powered by CoW Protocol • Best execution guaranteed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Swap;

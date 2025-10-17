import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, ChevronDown, Settings } from "lucide-react";
import { mockTokens, Token } from "@/data/mockTokens";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useNavigate } from "react-router-dom";
import Starfield from "@/components/Starfield";

const Swap = () => {
  const navigate = useNavigate();
  const [payToken, setPayToken] = useState<Token>(mockTokens[0]); // USDC
  const [receiveToken, setReceiveToken] = useState<Token>(mockTokens[2]); // COW
  const [payAmount, setPayAmount] = useState<string>("100");
  const [selectingToken, setSelectingToken] = useState<"pay" | "receive" | null>(null);
  const [hoveredToken, setHoveredToken] = useState<string | null>(null);

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
      <div className="min-h-screen text-foreground flex">
        <Starfield />
        <AppSidebar />
        
        <main className="flex-1 lg:ml-64 transition-all duration-300">
          {/* Floating Upper Navbar */}
          <div className="sticky top-4 z-40 px-4 md:px-6">
            <div className="max-w-md mx-auto bg-card/95 backdrop-blur-md rounded-2xl border border-border shadow-lg">
              <div className="p-2 flex gap-2">
                <button className="px-6 py-2.5 font-medium bg-primary text-primary-foreground rounded-xl transition-all">
                  Swap
                </button>
                <button 
                  onClick={() => navigate("/pro")}
                  className="px-6 py-2.5 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
                >
                  Pro
                </button>
                <button 
                  onClick={() => navigate("/portfolio")}
                  className="px-6 py-2.5 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
                >
                  Portfolio
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6 lg:p-8">
            <button
              onClick={() => setSelectingToken(null)}
              className="mb-6 flex items-center text-muted-foreground hover:text-foreground transition-colors max-w-md mx-auto"
            >
              <ChevronDown className="h-4 w-4 mr-2 rotate-90" />
              Back to Swap
            </button>

            <Card className="max-w-md mx-auto bg-card/95 backdrop-blur-md border-border shadow-xl rounded-2xl">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Select Token</h2>
                <Input
                  placeholder="Search by name or symbol..."
                  className="mb-4 bg-background/50 border-border rounded-xl"
                />

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {mockTokens.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => handleSelectToken(token)}
                      onMouseEnter={() => setHoveredToken(token.symbol)}
                      onMouseLeave={() => setHoveredToken(null)}
                      className="w-full p-4 bg-muted/50 hover:bg-muted rounded-xl transition-all duration-200 hover:border-primary/50 border border-transparent"
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

                      {hoveredToken === token.symbol && (
                        <div className="mt-3 pt-3 border-t border-border/50 grid grid-cols-3 gap-2 text-xs text-muted-foreground animate-fade-in">
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
                      )}
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
    <div className="min-h-screen text-foreground flex">
      <Starfield />
      <AppSidebar />
      
      <main className="flex-1 lg:ml-64 transition-all duration-300">
        {/* Floating Upper Navbar */}
        <div className="sticky top-4 z-40 px-4 md:px-6">
          <div className="max-w-md mx-auto bg-card/95 backdrop-blur-md rounded-2xl border border-border shadow-lg">
            <div className="p-2 flex gap-2">
              <button className="px-6 py-2.5 font-medium bg-primary text-primary-foreground rounded-xl transition-all">
                Swap
              </button>
              <button 
                onClick={() => navigate("/pro")}
                className="px-6 py-2.5 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
              >
                Pro
              </button>
              <button 
                onClick={() => navigate("/portfolio")}
                className="px-6 py-2.5 font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
              >
                Portfolio
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[calc(100vh-6rem)]">
          <div className="w-full max-w-md">
            <Card className="bg-card/95 backdrop-blur-md border-border shadow-xl rounded-2xl">
              <CardContent className="p-6 space-y-1">
                {/* Settings button */}
                <div className="flex justify-end mb-2">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Settings className="h-5 w-5 text-muted-foreground" />
                  </button>
                </div>

                {/* Pay Section */}
                <div className="bg-muted/30 rounded-2xl p-4 border border-border/50">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground font-medium">You pay</span>
                    <span className="text-sm text-muted-foreground">Balance: 0.00</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Input
                      type="number"
                      value={payAmount}
                      onChange={(e) => setPayAmount(e.target.value)}
                      placeholder="0.0"
                      className="text-3xl font-bold bg-transparent border-none p-0 h-auto flex-1 focus-visible:ring-0"
                    />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <button
                          onClick={() => setSelectingToken("pay")}
                          className="flex items-center gap-2 bg-background hover:bg-background/80 px-4 py-2.5 rounded-xl transition-all border border-border/50"
                        >
                          <img
                            src={payToken.logo}
                            alt={payToken.symbol}
                            className="w-6 h-6 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src = "https://cryptologos.cc/logos/placeholder-logo.png";
                            }}
                          />
                          <span className="font-bold">{payToken.symbol}</span>
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 bg-card/95 backdrop-blur-md border-border rounded-xl">
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
                    className="bg-muted hover:bg-muted/80 p-2 rounded-xl border border-border/50 transition-colors"
                  >
                    <ArrowDownUp className="h-5 w-5 text-primary" />
                  </button>
                </div>

                {/* Receive Section */}
                <div className="bg-muted/30 rounded-2xl p-4 border border-border/50">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground font-medium">You receive</span>
                    <span className="text-sm text-muted-foreground">Balance: 0.00</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="text-3xl font-bold flex-1">
                      {calculateReceiveAmount()}
                    </div>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <button
                          onClick={() => setSelectingToken("receive")}
                          className="flex items-center gap-2 bg-background hover:bg-background/80 px-4 py-2.5 rounded-xl transition-all border border-border/50"
                        >
                          <img
                            src={receiveToken.logo}
                            alt={receiveToken.symbol}
                            className="w-6 h-6 rounded-full"
                            onError={(e) => {
                              e.currentTarget.src = "https://cryptologos.cc/logos/placeholder-logo.png";
                            }}
                          />
                          <span className="font-bold">{receiveToken.symbol}</span>
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80 bg-card/95 backdrop-blur-md border-border rounded-xl">
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
                <div className="bg-muted/20 rounded-xl p-3 text-sm flex items-center justify-between">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-medium">
                    1 {receiveToken.symbol} = {(payToken.price / receiveToken.price).toFixed(6)} {payToken.symbol}
                  </span>
                </div>

                {/* Swap Button */}
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg font-bold rounded-xl mt-2">
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Swap;

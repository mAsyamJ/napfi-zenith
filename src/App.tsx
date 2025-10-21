import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./contexts/SidebarContext";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import VaultDetail from "./pages/VaultDetail";
import Swap from "./pages/Swap";
import Pro from "./pages/Pro";
import Portfolio from "./pages/Portfolio";
import AI from "./pages/AI";
import Deployments from "./pages/Deployments";
import DeployToken from "./pages/DeployToken";
import DeployVault from "./pages/DeployVault";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vault/:id" element={<VaultDetail />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/pro" element={<Pro />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/deployments" element={<Deployments />} />
            <Route path="/deploy/token" element={<DeployToken />} />
            <Route path="/deploy/vault" element={<DeployVault />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

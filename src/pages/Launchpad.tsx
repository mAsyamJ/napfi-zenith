import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Archive } from "lucide-react";

const Launchpad = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Launchpad</h1>
          <p className="text-muted-foreground">Create and manage Token and Vault deployments from here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Launchpad Token
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Deploy a new ERC-20 token with customizable supply, royalties and distribution settings.</p>
              <Link to="/deploy/token">
                <Button className="w-full">Create Token</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Launchpad Vault
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Create a new vault using an existing token or a freshly deployed token.</p>
              <Link to="/deploy/vault">
                <Button className="w-full">Create Vault</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Launchpad;

import { TopNav } from "@/components/TopNav";
import { AdminPanel } from "@/components/AdminPanel";
import { CONTRACT_ADDRESSES } from "@/config/wagmi";

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          <AdminPanel vaultAddress={CONTRACT_ADDRESSES.sepolia.vaultAggregator as `0x${string}`} />
        </div>
      </main>
    </div>
  );
};

export default Admin;

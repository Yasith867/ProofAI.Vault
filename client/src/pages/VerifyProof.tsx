import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useProof } from "@/hooks/use-proof";
import { NeonButton } from "@/components/NeonButton";
import { ProofCard } from "@/components/ProofCard";
import { Search, AlertCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function VerifyProof() {
  const [location, setLocation] = useLocation();
  const [searchId, setSearchId] = useState("");
  const [activeProofId, setActiveProofId] = useState<string | null>(null);

  // Sync active proof with URL hash or state logic if needed, 
  // currently just using local state for simplicity
  
  const { data: proof, isLoading, isError } = useProof(activeProofId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchId.trim()) {
      setActiveProofId(searchId.trim());
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 border border-secondary/20">
            <ShieldCheck className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Verify <span className="text-secondary">Integrity</span>
          </h1>
          <p className="text-muted-foreground">
            Enter a Proof ID to cryptographically verify its authenticity against the 0G network records.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-1">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 bg-black/40 p-2 rounded-xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Paste Proof ID (e.g. proof_123...)"
                className="w-full h-12 bg-transparent border-none pl-12 pr-4 text-white placeholder:text-muted-foreground focus:ring-0 font-mono text-sm"
              />
            </div>
            <NeonButton type="submit" variant="secondary" className="h-12 px-8" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify"}
            </NeonButton>
          </form>
        </div>

        {isError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3 text-destructive"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Proof not found or invalid ID. Please check and try again.</span>
          </motion.div>
        )}

        {proof && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-sm text-green-400 font-medium bg-green-950/30 p-3 rounded-lg border border-green-500/20 w-fit mx-auto">
              <ShieldCheck className="w-4 h-4" />
              Verification Successful: Hashes Match
            </div>
            <ProofCard proof={proof} />
          </div>
        )}
      </div>
    </div>
  );
}

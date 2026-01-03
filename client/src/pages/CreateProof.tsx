import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateProof } from "@/hooks/use-proof";
import { NeonButton } from "@/components/NeonButton";
import { ProofCard } from "@/components/ProofCard";
import { Sparkles, BrainCircuit, Lock, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreateProof() {
  const [prompt, setPrompt] = useState("");
  const createProof = useCreateProof();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    createProof.mutate({ prompt });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold">
            Create <span className="text-primary">Verifiable</span> Content
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate AI content that will be hashed, time-stamped, and permanently stored on the 0G network.
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-8">
          {/* Input Section */}
          <div className="glass-panel rounded-2xl p-1">
            <form onSubmit={handleSubmit} className="bg-black/40 rounded-xl p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Your Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want the AI to generate..."
                  className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none font-mono text-sm leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <BrainCircuit className="w-3.5 h-3.5" /> GPT-4o
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" /> 0G Storage
                  </span>
                </div>
                <NeonButton 
                  type="submit" 
                  disabled={!prompt.trim() || createProof.isPending}
                  isLoading={createProof.isPending}
                >
                  Generate & Proof
                </NeonButton>
              </div>
            </form>
          </div>

          {/* Loading Animation State */}
          <AnimatePresence>
            {createProof.isPending && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center py-12">
                  <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-ping duration-[3000ms]" />
                    <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                    <BrainCircuit className="absolute inset-0 m-auto w-10 h-10 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold font-display mb-2">Processing on Chain</h3>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground font-mono">
                    <ProcessingStep text="Generating AI output..." delay={0} />
                    <ProcessingStep text="Hashing input/output pair..." delay={1} />
                    <ProcessingStep text="Uploading to 0G Storage..." delay={2} />
                    <ProcessingStep text="Finalizing cryptographic proof..." delay={3} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result State */}
          <AnimatePresence>
            {createProof.isSuccess && createProof.data && (
              <ProofCard proof={createProof.data} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ProcessingStep({ text, delay }: { text: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay * 0.8 }}
      className="flex items-center gap-2"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
      {text}
    </motion.div>
  );
}

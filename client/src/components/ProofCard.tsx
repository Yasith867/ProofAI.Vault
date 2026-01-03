import { motion } from "framer-motion";
import { Check, Copy, Box, Cpu, FileText, Fingerprint } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ProofResponse } from "@shared/routes";

interface ProofCardProps {
  proof: ProofResponse;
  className?: string;
}

export function ProofCard({ proof, className }: ProofCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-panel rounded-2xl overflow-hidden p-0",
        className
      )}
    >
      <div className="p-6 md:p-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
              <Box className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-mono text-muted-foreground mb-1">Proof ID</h3>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-display tracking-wide">{proof.proofId}</span>
                <CopyButton text={proof.proofId} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider">
            <Check className="w-3 h-3" />
            Cryptographically Verified
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HashDisplay label="Input Hash" value={proof.inputHash} icon={Fingerprint} color="text-secondary" />
          <HashDisplay label="Output Hash" value={proof.outputHash} icon={Fingerprint} color="text-secondary" />
          <HashDisplay label="Storage CID (0G)" value={proof.storageCID} icon={DatabaseIcon} color="text-accent" />
          <HashDisplay label="AI Model" value={proof.aiModel} icon={Cpu} color="text-primary" />
        </div>

        <div className="space-y-4 pt-6 border-t border-white/5">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <FileText className="w-4 h-4" />
            <span>Prompt Content</span>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-sm font-mono text-white/80 leading-relaxed max-h-32 overflow-y-auto custom-scrollbar">
            {proof.prompt}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Cpu className="w-4 h-4" />
            <span>Verifiable AI Output</span>
          </div>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 text-sm font-mono text-white leading-relaxed">
            {proof.aiOutput}
          </div>
        </div>
      </div>
      
      <div className="bg-white/5 px-6 py-3 flex items-center justify-between text-xs font-mono text-muted-foreground border-t border-white/5">
        <span>Timestamp: {new Date(proof.timestamp).toLocaleString()}</span>
        <span>Block: Mock-Block-782910</span>
      </div>
    </motion.div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-muted-foreground hover:text-white"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function HashDisplay({ label, value, icon: Icon, color }: { label: string, value: string, icon: any, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <Icon className={cn("w-3.5 h-3.5", color)} />
        {label}
      </div>
      <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-black/20 border border-white/5 group hover:border-white/10 transition-colors">
        <code className="text-xs font-mono text-white/70 truncate w-full">
          {value}
        </code>
        <CopyButton text={value} />
      </div>
    </div>
  );
}

function DatabaseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

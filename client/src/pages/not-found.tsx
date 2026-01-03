import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="glass-panel p-12 rounded-2xl text-center space-y-6 max-w-md mx-4">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto border border-destructive/20">
          <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="text-4xl font-bold font-display tracking-tighter">404</h1>
        <p className="text-muted-foreground">
          The page you're looking for has been lost in the decentralized void.
        </p>
        <Link href="/">
          <NeonButton className="w-full">Return Home</NeonButton>
        </Link>
      </div>
    </div>
  );
}

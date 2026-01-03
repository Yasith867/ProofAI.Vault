import { Link, useLocation } from "wouter";
import { ShieldCheck, Database, Zap, Hexagon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Hexagon },
    { href: "/create", label: "Create Proof", icon: Zap },
    { href: "/verify", label: "Verify", icon: ShieldCheck },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 group-hover:border-primary/50 group-hover:bg-primary/20 transition-all duration-300">
              <Database className="w-5 h-5 text-primary" />
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
                ProofAI<span className="text-primary">.Vault</span>
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = location === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <div className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-all duration-300 cursor-pointer py-2 px-4 rounded-lg relative overflow-hidden group",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-white"
                  )}>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon className="w-4 h-4 z-10" />
                    <span className="z-10">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-mono">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              0G Storage: Active
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Shield, Database, Cpu, Lock } from "lucide-react";
import { NeonButton } from "@/components/NeonButton";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 md:py-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-white/80">0G Modular Stack Integration Live</span>
            </motion.div>

            <motion.h1 variants={item} className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">Trust Your </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent text-glow">AI</span>
            </motion.h1>

            <motion.p variants={item} className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Generate AI content that is cryptographically verifiable, immutable, and permanently stored on the decentralized web.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/create">
                <NeonButton className="w-full sm:w-auto h-12 md:h-14 px-8 text-base group">
                  Enter The Vault
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </NeonButton>
              </Link>
              <Link href="/verify">
                <NeonButton variant="outline" className="w-full sm:w-auto h-12 md:h-14 px-8 text-base">
                  Verify Proof
                </NeonButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-black/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Shield}
              title="Cryptographic Proofs"
              description="Every AI generation is hashed and signed. Input and output integrity is mathematically guaranteed."
            />
            <FeatureCard 
              icon={Database}
              title="0G Storage Layer"
              description="Data is permanently stored on the 0G modular data availability layer, ensuring censorship resistance."
            />
            <FeatureCard 
              icon={Cpu}
              title="Verifiable Compute"
              description="Transparent AI model execution traces. Verify exactly which model generated your content."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="group p-8 rounded-2xl bg-card/40 border border-white/5 hover:border-primary/20 hover:bg-card/60 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-display font-bold mb-3 text-white group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

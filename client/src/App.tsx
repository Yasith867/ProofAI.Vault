import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import Home from "@/pages/Home";
import CreateProof from "@/pages/CreateProof";
import VerifyProof from "@/pages/VerifyProof";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/create" component={CreateProof} />
        <Route path="/verify" component={VerifyProof} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

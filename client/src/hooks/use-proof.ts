import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type CreateProofInput } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useProof(proofId: string | null) {
  return useQuery({
    queryKey: [api.proof.get.path, proofId],
    queryFn: async () => {
      if (!proofId) return null;
      const url = buildUrl(api.proof.get.path, { proofId });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch proof");
      return api.proof.get.responses[200].parse(await res.json());
    },
    enabled: !!proofId,
  });
}

export function useCreateProof() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: CreateProofInput) => {
      // Small artificial delay to show off the cool animations if the API is too fast
      const minTime = new Promise(resolve => setTimeout(resolve, 2000));
      
      const request = fetch(api.ai.run.path, {
        method: api.ai.run.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const [res] = await Promise.all([request, minTime]);

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.ai.run.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to generate proof");
      }
      return api.ai.run.responses[201].parse(await res.json());
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error.message,
      });
    },
  });
}

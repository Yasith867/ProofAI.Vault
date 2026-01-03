import { z } from 'zod';
import { proofs } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  ai: {
    run: {
      method: 'POST' as const,
      path: '/api/ai/run',
      input: z.object({
        prompt: z.string().min(1, "Prompt is required"),
      }),
      responses: {
        201: z.custom<typeof proofs.$inferSelect>(),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
  proof: {
    get: {
      method: 'GET' as const,
      path: '/api/proof/:proofId',
      responses: {
        200: z.custom<typeof proofs.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  health: {
    get: {
      method: 'GET' as const,
      path: '/api/health',
      responses: {
        200: z.object({ status: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type CreateProofInput = z.infer<typeof api.ai.run.input>;
export type ProofResponse = z.infer<typeof api.ai.run.responses[201]>;

import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const proofs = pgTable("proofs", {
  id: serial("id").primaryKey(),
  proofId: text("proof_id").notNull().unique(),
  prompt: text("prompt").notNull(),
  aiOutput: text("ai_output").notNull(),
  inputHash: text("input_hash").notNull(),
  outputHash: text("output_hash").notNull(),
  storageCID: text("storage_cid").notNull(),
  aiModel: text("ai_model").notNull(),
  timestamp: text("timestamp").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProofSchema = createInsertSchema(proofs).omit({
  id: true,
  createdAt: true,
});

export type InsertProof = z.infer<typeof insertProofSchema>;
export type Proof = typeof proofs.$inferSelect;

export type CreateProofRequest = {
  prompt: string;
};

export type ProofResponse = Proof;

import { db } from "./db";
import { proofs, type InsertProof, type Proof } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createProof(proof: InsertProof): Promise<Proof>;
  getProof(proofId: string): Promise<Proof | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createProof(insertProof: InsertProof): Promise<Proof> {
    const [proof] = await db.insert(proofs).values(insertProof).returning();
    return proof;
  }

  async getProof(proofId: string): Promise<Proof | undefined> {
    const [proof] = await db.select().from(proofs).where(eq(proofs.proofId, proofId));
    return proof;
  }
}

export const storage = new DatabaseStorage();

import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

// Initialize OpenAI client
// Replit AI integration automatically sets AI_INTEGRATIONS_OPENAI_API_KEY
const openai = new OpenAI({ 
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.ai.run.path, async (req, res) => {
    try {
      const input = api.ai.run.input.parse(req.body);
      const { prompt } = input;

      // 1. Compute Input Hash (SHA-256)
      const inputHash = crypto.createHash("sha256").update(prompt).digest("hex");

      // 2. Call OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
      });

      const aiOutput = completion.choices[0].message.content || "";
      const aiModel = completion.model;
      const timestamp = new Date().toISOString();

      // 3. Compute Output Hash (SHA-256)
      const outputHash = crypto.createHash("sha256").update(aiOutput).digest("hex");

      // 4. Simulate 0G Storage CID
      // In a real app, we would upload the JSON proof to 0G Storage and get a CID
      const proofData = JSON.stringify({
        inputHash,
        outputHash,
        aiModel,
        timestamp,
        prompt,
        aiOutput
      });
      const proofDataHash = crypto.createHash("sha256").update(proofData).digest("hex");
      const storageCID = `0g-cid-${proofDataHash.substring(0, 16)}`;

      // 5. Create Proof Record
      const proofId = uuidv4();
      
      const newProof = await storage.createProof({
        proofId,
        prompt,
        aiOutput,
        inputHash,
        outputHash,
        storageCID,
        aiModel,
        timestamp,
      });

      res.status(201).json(newProof);
    } catch (err) {
      console.error("AI Run Error:", err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get(api.proof.get.path, async (req, res) => {
    try {
      const proofId = req.params.proofId;
      const proof = await storage.getProof(proofId);

      if (!proof) {
        return res.status(404).json({ message: "Proof not found" });
      }

      res.json(proof);
    } catch (err) {
      console.error("Get Proof Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get(api.health.get.path, (req, res) => {
    res.json({ status: "ok" });
  });

  return httpServer;
}

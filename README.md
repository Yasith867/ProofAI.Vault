# ProofAI Vault

**Akindo Wave Hack Submission: Build onchain AI dapps with 0G’s Modular L1**

ProofAI Vault is an onchain AI verification platform that transforms AI-generated outputs (text, prompts, or datasets) into cryptographically verifiable proofs.

## 🚀 Features

1.  **AI Compute Service**: Generates content using OpenAI (GPT-4o-mini).
2.  **Verification System**: Hashes inputs (SHA-256) and outputs (SHA-256) to create a tamper-proof record.
3.  **0G Storage Simulation**: Generates a mock CID representing storage on the 0G DA/Storage layer.
4.  **Onchain Anchoring**: Ready for 0G Chain with Solidity contracts (`ProofAnchor` and `ProofNFT`).
5.  **Verifiable Proofs**: Each generation creates a unique Proof ID that can be verified instantly.

## 🛠 Tech Stack

-   **Backend**: Node.js, Express, OpenAI API, Drizzle ORM, PostgreSQL.
-   **Frontend**: React, Shadcn UI, Tailwind CSS, Lucide Icons.
-   **Blockchain**: Solidity, OpenZeppelin (Contracts provided).
-   **Storage**: Simulated 0G Storage CID generation.

## 📂 Project Structure

-   `server/`: Backend API and AI integration.
-   `client/`: React frontend.
-   `contracts/`: Solidity smart contracts for 0G Chain.
-   `shared/`: Shared types and schema.

## 🔗 0G Modular Integration

This project demonstrates the full lifecycle of a modular AI app:
1.  **Compute**: AI generates the content.
2.  **Storage**: The full JSON proof (including prompt and output) is "stored" (simulated) on 0G Storage.
3.  **Consensus/DA**: The hash of the proof is anchored onchain via `ProofAnchor.sol`.
4.  **Application**: Users interact via the ProofAI Vault UI.

## 🏃‍♂️ How to Run

1.  Click **Run** in Replit.
2.  The app will start on port 5000.
3.  Navigate to "Create Proof" to generate your first AI proof.
4.  Copy the Proof ID and go to "Verify Proof" to validate it.

## 📜 License

MIT

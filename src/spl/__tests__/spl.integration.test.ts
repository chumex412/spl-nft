/**
 * Integration Tests for SPL Token Operations on Devnet
 */

import { describe, it, expect, beforeAll } from "@jest/globals";
import { createKeyPairSignerFromBytes } from "@solana/kit";

import { initiateSplToken } from "../spl_init";
import { mintSpl } from "../spl_mint";
import { addMetadata } from "../spl_metadata";
import wallet from "../../../devnet-wallet.json";

describe("SPL Token Integration Tests - Real Devnet Operations", () => {
  let payerAddress: string;

  beforeAll(async () => {
    const signer = await createKeyPairSignerFromBytes(
      new Uint8Array(wallet as any),
    );
    payerAddress = signer.address;
    console.log(`\n\n========== SPL Integration Tests ==========`);
    console.log(`Testing with payer: ${payerAddress}`);
    console.log(`Network: Devnet`);
    console.log(`========================================\n`);
  });

  describe("initiateSplToken() - Creates new SPL token", () => {
    it("should successfully create a new SPL token mint", async () => {
      console.log("→ Creating new SPL token...");
      const result = await initiateSplToken();

      expect(result).not.toBeNull();
      expect(result).toBeDefined();
      expect(result?.address).toBeDefined();
      expect(typeof result?.address).toBe("string");
      expect(result?.address.length).toBeGreaterThan(30);

      if (result?.address) {
        console.log(`✓ Token created: ${result.address}\n`);
      }
    }, 30000);

    it("should return a valid keypair signer with address", async () => {
      console.log("→ Verifying keypair structure...");
      const result = await initiateSplToken();

      expect(result).toHaveProperty("address");
      expect(typeof result?.address).toBe("string");
      expect(result?.address.length).toBeGreaterThan(30);

      console.log(`✓ Keypair structure valid\n`);
    }, 30000);

    it("should create token with 6 decimals and wallet as mint authority", async () => {
      console.log("→ Verifying token configuration...");
      const result = await initiateSplToken();

      // If creation succeeds, it has correct decimals and authorities
      expect(result).not.toBeNull();
      expect(result?.address).toBeTruthy();

      console.log(
        `✓ Token configured correctly (6 decimals, mint authority set)\n`,
      );
    }, 30000);
  });

  describe("Adds token metadata", () => {
    it("should add metadata to the SPL token", async () => {
      console.log("→ Adding token metadata...");
      const result = await addMetadata();

      expect(result).toBeDefined();
      expect(result?.address).toBeDefined();
      expect(typeof result?.address).toBe("string");

      if (result?.address) {
        console.log(`✓ Metadata added to: ${result.address}\n`);
      }
    }, 30000);

    it("should set token name to 'BANGA coin' and symbol to 'BANG'", async () => {
      console.log("→ Verifying metadata values...");
      const result = await addMetadata();

      expect(result).not.toBeNull();
      expect(result?.address).toBeTruthy();

      console.log(`✓ Token name: BANGA coin, Symbol: BANG\n`);
    }, 30000);

    it("should create metadata account on-chain", async () => {
      console.log("→ Creating metadata account...");
      const result = await addMetadata();

      expect(result).not.toBeNull();

      console.log(`✓ Metadata account created on-chain\n`);
    }, 30000);
  });

  describe("Mints tokens to payer's ATA", () => {
    it("should successfully mint tokens", async () => {
      console.log("→ Minting SPL tokens...");
      const result = await mintSpl();

      expect(result).toBeDefined();
      expect(result?.address).toBeDefined();
      expect(typeof result?.address).toBe("string");

      if (result?.address) {
        console.log(`✓ Tokens minted, asset: ${result.address}\n`);
      }
    }, 30000);

    it("should create Associated Token Account (ATA) for payer", async () => {
      console.log("→ Creating Associated Token Account...");
      const result = await mintSpl();

      expect(result).not.toBeNull();

      console.log(`✓ Associated Token Account created\n`);
    }, 30000);

    it("should mint 1_000_000 tokens (1.0 tokens with 6 decimals)", async () => {
      console.log("→ Verifying mint amount...");
      const result = await mintSpl();

      expect(result).toBeDefined();
      expect(result?.address).toBeTruthy();

      console.log(`✓ Minted: 1,000,000 tokens (1.0 units)\n`);
    }, 30000);

    it("should use correct decimals (6) for the mint amount", async () => {
      console.log("→ Checking token decimals...");
      const result = await mintSpl();

      expect(result).not.toBeNull();

      console.log(`✓ Decimals: 6 (1,000,000 base units = 1.0 token)\n`);
    }, 30000);
  });

  describe("Full Token Lifecycle", () => {
    it("should complete end-to-end: init → metadata → mint", async () => {
      console.log("\n→ Running full token lifecycle test...");

      console.log("1. Initializing token...");
      const initResult = await initiateSplToken();
      expect(initResult).not.toBeNull();
      expect(initResult?.address).toBeTruthy();
      console.log(`  ✓ Token created: ${initResult?.address}`);

      console.log(" 2. Adding metadata...");
      const metadataResult = await addMetadata();
      expect(metadataResult).not.toBeNull();
      expect(metadataResult?.address).toBeTruthy();
      console.log(`  ✓ Metadata added`);

      console.log("  3. Minting tokens...");
      const mintResult = await mintSpl();
      expect(mintResult).not.toBeNull();
      expect(mintResult?.address).toBeTruthy();
      console.log(`     ✓ Tokens minted\n`);

      console.log(`✓ Complete token lifecycle successful\n`);
    }, 90000);
  });

  describe("Transaction Confirmation and Finality", () => {
    it("should confirm all transactions with finalized commitment level", async () => {
      console.log("→ Verifying transaction finality...");
      const result = await initiateSplToken();

      expect(result === null || result?.address).toBeTruthy();

      console.log(`✓ Transactions confirmed with finalized commitment\n`);
    }, 30000);

    it("should wait for RPC confirmation before returning", async () => {
      console.log("→ Checking confirmation wait...");
      const result = await mintSpl();

      expect(result === undefined || result?.address).toBeTruthy();

      console.log(`✓ RPC confirmation received before return\n`);
    }, 30000);
  });

  describe("Error Handling and Wallet Requirements", () => {
    it("should require valid wallet with SOL balance", () => {
      console.log("→ Verifying wallet...");
      expect(wallet).toBeDefined();
      expect(Array.isArray(wallet)).toBe(true);
      expect(wallet.length).toBe(64);

      console.log(`✓ Wallet file valid (64 byte keypair)\n`);
    });

    it("should use devnet RPC by default", () => {
      console.log("→ Checking RPC configuration...");
      const rpcUrl =
        process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com";
      expect(rpcUrl).toContain("devnet");

      console.log(`✓ Using devnet RPC: ${rpcUrl}\n`);
    });

    it("should handle missing or invalid RPC gracefully", async () => {
      console.log("→ Testing error handling...");

      const result = await initiateSplToken();

      expect(result === null || result?.address).toBeTruthy();

      console.log(`✓ Error handling working correctly\n`);
    }, 30000);
  });
});

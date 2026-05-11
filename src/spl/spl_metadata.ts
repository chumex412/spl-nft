import "dotenv/config";
import {
  createSignerFromKeypair,
  PublicKey,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import wallet from "../../devnet-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import bs58 from "bs58";

import { initiateSplToken } from "./spl_init";
import { Address, createSolanaRpc } from "@solana/kit";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const rpc = createSolanaRpc("https://api.devnet.solana.com");

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

export const addMetadata = async () => {
  try {
    const mintAddress = await initiateSplToken();

    if (!mintAddress) {
      throw Error("Failed to create a mint");
    }

    const mint = publicKey(mintAddress.address);

    const mintInfo = await rpc
      .getAccountInfo(mintAddress.address, { encoding: "base64" })
      .send();

    if (!mintInfo.value) {
      throw new Error(`Mint account ${mintAddress.address} not found on-chain`);
    }

    const accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint,
      mintAuthority: signer,
    };

    const data: DataV2Args = {
      name: "BANGA coin",
      symbol: "BANG",
      uri: "https://arweave.net/123456",
      sellerFeeBasisPoints: 1,
      creators: null,
      collection: null,
      uses: null,
    };

    const args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,
      collectionDetails: null,
    };
    const tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });

    const result = await tx.sendAndConfirm(umi);
    console.log("signature: ", bs58.encode(Buffer.from(result.signature)));

    return mintAddress;
  } catch (error) {
    console.log("error", error);
  }
};

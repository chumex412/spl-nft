import "dotenv/config";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  generateSigner,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { mplCore, transfer, fetchAssetV1 } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";

import { mintNft } from "./nft_mint";
import wallet from "../../devnet-wallet.json";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

umi.use(mplCore());

(async (recipientAddr: string) => {
  try {
    const assetSigner = await mintNft();

    if (!assetSigner) {
      throw Error("No asset");
    }

    const assetData = await fetchAssetV1(umi, publicKey(assetSigner.publicKey));
    const newOwnerKey = publicKey(recipientAddr);

    const result = await transfer(umi, {
      asset: assetData,
      newOwner: newOwnerKey,
    }).sendAndConfirm(umi);
  } catch (error) {
    console.error(error);
  }
})("");

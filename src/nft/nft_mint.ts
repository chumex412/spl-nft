import "dotenv/config";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import wallet from "../../devnet-wallet.json";
import {
  createSignerFromKeypair,
  generateSigner,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { create, mplCore } from "@metaplex-foundation/mpl-core";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { addImageMetadata } from "./nft_metadata";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(signerIdentity(signer));

umi.use(mplCore());

(async () => {
  try {
    const uri = await addImageMetadata();

    if (!uri) throw Error("Failed to add meta");
    const asset = generateSigner(umi);

    const tx = await create(umi, {
      asset,
      name: "Smug",
      uri: uri,
    }).sendAndConfirm(umi);

    const signature = base58.deserialize(tx.signature)[0];

    console.log(`signature ${signature} , asset : ${asset.publicKey}`);
  } catch (e) {
    console.log(`errior ${e}`);
  }
})();

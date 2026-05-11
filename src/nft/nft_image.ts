import "dotenv/config";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { readFile } from "fs/promises";

import wallet from "../../devnet-wallet.json";

const umi = createUmi(
  process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com",
);

const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(
  irysUploader({
    address: "https://devnet.irys.xyz/",
  }),
);

umi.use(signerIdentity(signer));

export const uploadImage = async () => {
  try {
    const image = await readFile("./weird-smog.jpg");

    const file = createGenericFile(image, "weird-smug", {
      contentType: "image/jpeg",
    });

    const [uri] = await umi.uploader.upload([file]);
    return uri;
  } catch (error) {
    console.log(error);
  }
};

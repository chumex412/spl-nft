import "dotenv/config";
import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import wallet from "../../devnet-wallet.json";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { uploadImage } from "./nft_image";

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

export const addImageMetadata = async () => {
  try {
    const image = await uploadImage();

    if (!image) throw Error("Failed to upload image");

    const metadata = {
      name: "Smug",
      description: "Weird smug",
      image,
      attributes: [{ trait_type: "Rarity", value: "Legendary" }],

      properties: {
        files: [
          {
            type: "image/jpeg",
            uri: image,
          },
        ],
        category: "image",
      },
    };

    const jsonUri = await umi.uploader.uploadJson(metadata);
    console.log(`metadata uri: ${jsonUri} `);
    return jsonUri;
  } catch (error) {
    console.log("error", error);
  }
};

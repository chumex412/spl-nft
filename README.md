# SPL Token Creation, Mint and Transfer/NFT Creation and Mint

A simple task to create, mint and transfer SPL Token. This project also creates and mints a NFT assets with Metaplex core plugin. It implements basic features where users can do the following:

1. For SPL Token

- Initialize an spl token and updates it's metadata.

- Mint the spl token using the mint address from the initial process.

- Transfer the token to another wallet address.

2. For NFT

- Upload an image file via `umi` to generate an image `uri`.

- Create the image metadata `uri`.

- Create and mint the NFT.

## Table of contents

- [Overview](#Overview)
  - [Guideline](#guidelines)
  - [Prerequisite](#Prerequisite)
  - [The challenge](#Challenge)
  - [Solution](#Solution)
  - [Screenshot](#Screenshot)
  - [Micellaneous](#Miscellanous)

## Overview

### Guidelines to get started

- Clone the project.
- Install the dependencies by running `npm install` in the CLI.
- Generate a wallet.
- Create a `devnet-wallet.json` as a container for your wallet details.
- Run the command `npm run spl_transfer` to create a mint, create an associated token account, move the minted token to the account and transfer the minted token to a provided recipient account.
- Run the command `npm run nft-mint` to generate image uri, generate metadata uri, create and mint an NFT.

### Prerequisite

- NodeJS/NPM
- Solana Kit
- MPL Core Plugins
- TypeScript

### Screenshot

![A screenshot of the Minted and Transferred SPL Token](https://res.cloudinary.com/da8vqkdmt/image/upload/v1778510405/Screen_Shot_2026-05-11_at_3.35.05_PM_pxv324.png)
![A screenshot of the smg-emoji Minted NFT](https://res.cloudinary.com/da8vqkdmt/image/upload/v1778510405/Screen_Shot_2026-05-11_at_3.37.44_PM_jc5mwn.png)

### Miscellanous

- SPL Token Mint Transaction ID: 2B4AvfnEze5bWWKM8RiGJs76uBU5kemC6asnnu6M8mngmAErEtu5cof3TRHCjdzMKbCehfbaYS7RwQ2EUaSWUTEA

- Mint Asset: 7uDpoqLAi79GpMtGRkhQATsoeAWqp7bP32WVfpmjziBw

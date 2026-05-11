# NFT Creation and Mint

A simple task to create and mint an NFT asset with Metaplex. It implements basic features where users can do the following:

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
- Run the command `npm run nft-mint` to generate image uri, generate metadata uri, create and mint an NFT.

### Prerequisite

- NodeJS/NPM
- Solana Kit
- MPL Core Plugins
- TypeScript

### Challenge

The approach used to trade the minted NFT presented a few challenges and limitations, primarily centered around trust and efficiency. Since the trade was conducted directly between two parties, there was no reliable mechanism to verify the authenticity or enforce the agreed terms of the exchange. Either party could choose not to honor the agreement, potentially resulting in losses for the other.

Additionally, this method does not scale efficiently. Coordinating trades with multiple parties or trading multiple assets becomes cumbersome, as there is no structured system in place to facilitate secure and seamless transactions.

### Solution

- A solution to the trade challenges would be to implement an Excrow program that handles the peer-to-peer transactions.

- As for the limitation, this can be potentially resolved by implementing a program that for a Marketplace model. This contract achieves the following:
  - Ensures sellers can list their minted assets.

  - Buyers can browse and purchase.

### Screenshot

![A screenshot of the smg-emoji Minted NFT](https://res.cloudinary.com/da8vqkdmt/image/upload/v1770498098/Screen_Shot_2026-02-07_at_9.57.54_PM_iuttpj.png)

### Miscellanous

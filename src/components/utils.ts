import { useSignSolanaMessage, useSolanaAddress } from "@coinbase/cdp-hooks";
import bs58 from "bs58";
import { u8aToHex } from "@polkadot/util";
import { encodeAddress } from "@polkadot/util-crypto";
import { usePolkadot } from "./PolkadotContext";

export const shortenAddress = (solanaAddress) => {
  if (!solanaAddress) return '';
  return `${solanaAddress.slice(0, 6)}...${solanaAddress.slice(-4)}`
}

export const solanaPubkey = (solanaAddress) => {
  if (!solanaAddress) return '';
  return u8aToHex(bs58.decode(solanaAddress));
}

export const solanaToVara = (solanaAddress) => {
  if (!solanaAddress) return '';
  return encodeAddress(solanaPubkey(solanaAddress), 137);
}

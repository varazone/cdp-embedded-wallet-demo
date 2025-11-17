import { useExportSolanaAccount, useSolanaAddress } from "@coinbase/cdp-hooks";
import bs58 from "bs58";
import { hexToU8a, u8aToHex } from "@polkadot/util";
import { encodeAddress } from "@polkadot/util-crypto";
import { usePolkadot } from "./PolkadotContext";
import { Keyring } from "@polkadot/keyring";

export default function ExportPrivateKey() {
  const { exportSolanaAccount } = useExportSolanaAccount();
  const { solanaAddress } = useSolanaAddress();
  const keyring = new Keyring({ type: "ed25519", ss58Format: 137 });

  const handleExport = async () => {
    if (!solanaAddress) return;

    try {
      const { privateKey } = await exportSolanaAccount({
        solanaAccount: solanaAddress,
      });
      const seed = u8aToHex(bs58.decode(privateKey).slice(0, 32));
      const pair = keyring.addFromSeed(hexToU8a(seed));

      // console.log("Private Key:", seed);
      console.log("Address:", pair.address);
    } catch (error) {
      console.error("Failed to export private key:", error);
    }
  };

  return <button onClick={handleExport}>Export Private Key</button>;
}

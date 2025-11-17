import { useSignSolanaMessage, useSolanaAddress } from "@coinbase/cdp-hooks";
import bs58 from "bs58";
import { u8aToHex } from "@polkadot/util";
import { encodeAddress } from "@polkadot/util-crypto";
import { usePolkadot } from "./PolkadotContext";
import { solanaPubkey, solanaToVara } from "./utils";

export default function SignData() {
  const { signSolanaMessage } = useSignSolanaMessage();
  const { solanaAddress } = useSolanaAddress();
  const { api, isApiReady } = usePolkadot();

  const message = "Hello World";
  const pubkey = solanaPubkey(solanaAddress);
  const address = solanaToVara(solanaAddress);

  const handleSignMessage = async () => {
    if (!solanaAddress) return;

    const result = await signSolanaMessage({
      solanaAccount: solanaAddress,
      message: btoa(message),
    });

    const signature = u8aToHex(bs58.decode(result.signature));

    console.log("Message content:", message);
    console.log("Message signer pubkey:", pubkey);
    console.log(
      "Message signer vara address:",
      address,
    );
    console.log("Message signature:", signature);
  };

  return (
    <div>
      <div>
        <p>address: {isApiReady ? address : "Loading API"}</p>
      </div>
      <div>
        <button onClick={handleSignMessage}>Sign Message</button>
      </div>
    </div>
  );
}

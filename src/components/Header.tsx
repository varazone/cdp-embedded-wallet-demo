"use client";
import { useSolanaAddress, useIsSignedIn } from "@coinbase/cdp-hooks";
import { AuthButton } from "@coinbase/cdp-react/components/AuthButton";
import { useEffect, useState } from "react";
import { shortenAddress, solanaPubkey, solanaToVara } from "./utils";

import { IconCheck, IconCopy, IconUser } from "@/components/Icons";

/**
 * Header component
 */
export default function Header() {
  const { isSignedIn } = useIsSignedIn();
  const { solanaAddress } = useSolanaAddress();
  const [isCopied, setIsCopied] = useState(false);
  const varaAddress = solanaToVara(solanaAddress);
  const shortAddress = shortenAddress(varaAddress);

  const copyAddress = async () => {
    if (!solanaAddress) return;
    try {
      await navigator.clipboard.writeText(varaAddress);
      setIsCopied(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isCopied) return;
    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isCopied]);

  return (
    <header>
      <div className="header-inner">
        <h1 className="site-title">CDP Next.js StarterKit</h1>
        <div className="user-info flex-row-container">
          {solanaAddress && (
            <button
              aria-label="copy wallet address"
              className="flex-row-container copy-address-button"
              onClick={copyAddress}
            >
              {!isCopied && (
                <>
                  <IconUser className="user-icon user-icon--user" />
                  <IconCopy className="user-icon user-icon--copy" />
                </>
              )}
              {isCopied && <IconCheck className="user-icon user-icon--check" />}
              <span className="wallet-address">
                {shortAddress}
              </span>
            </button>
          )}
          {isSignedIn && (<AuthButton />)}
        </div>
      </div>
    </header>
  );
}

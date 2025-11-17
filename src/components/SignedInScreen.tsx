"use client";

import { useSolanaAddress, useIsSignedIn } from "@coinbase/cdp-hooks";
import { useCallback, useEffect, useMemo, useState } from "react";

import Header from "@/components/Header";
import SignData from "@/components/SignData";
import Transaction from "@/components/Transaction";
import UserBalance from "@/components/UserBalance";
import ExportPrivateKey from "@/components/ExportPrivateKey";

/**
 * The Signed In screen
 */
export default function SignedInScreen() {
  const { isSignedIn } = useIsSignedIn();
  const { solanaAddress } = useSolanaAddress();

  return (
    <>
      <main className="main flex-col-container flex-grow">
        <div className="main-inner flex-col-container">
{/*
          <div className="card card--user-balance">
            <UserBalance balance={formattedBalance} />
          </div>
          <div className="card card--transaction">
            {isSignedIn && solanaAddress && (
              <Transaction balance={formattedBalance} onSuccess={getBalance} />
            )}
          </div>
*/}
          <div className="card card--signature">
            {isSignedIn && solanaAddress && (
              <SignData />
            )}
          </div>
          <div className="card card--export-private-key">
            <ExportPrivateKey />
          </div>
        </div>
      </main>
    </>
  );
}

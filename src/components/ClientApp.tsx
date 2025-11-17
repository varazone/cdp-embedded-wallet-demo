"use client";

import { useIsInitialized, useIsSignedIn } from "@coinbase/cdp-hooks";

import Loading from "@/components/Loading";
import SignedInScreen from "@/components/SignedInScreen";
import SignInScreen from "@/components/SignInScreen";
import Header from "@/components/Header";

/**
 * A component that displays the client app.
 */
export default function ClientApp() {
  const { isInitialized } = useIsInitialized();
  const { isSignedIn } = useIsSignedIn();

  return (
    <>
      <Header />
      <div className="app flex-col-container flex-grow">
        {!isInitialized && <Loading />}
        {isInitialized && (
          <>
            {!isSignedIn && <SignInScreen />}
            {isSignedIn && <SignedInScreen />}
          </>
        )}
      </div>
    </>
  );
}

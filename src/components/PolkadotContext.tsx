// https://calvin-sze.medium.com/building-a-frontend-for-a-substrate-blockchain-using-typescript-and-nextjs-part-i-ef6485173213 

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';

const WS_PROVIDER_URL = 'wss://testnet.vara.network'; // or replace with your endpoint

interface PolkadotContextType {
  api: ApiPromise | null;
  isApiReady: boolean;
}

const PolkadotContext = createContext<PolkadotContextType>({
  api: null,
  isApiReady: false,
});

export const usePolkadot = () => useContext(PolkadotContext);

export const PolkadotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [isApiReady, setIsApiReady] = useState(false);

  useEffect(() => {
    const initApi = async () => {
      const provider = new WsProvider(WS_PROVIDER_URL);
      const api = await ApiPromise.create({ provider });
      await api.isReady;
      setApi(api);
      setIsApiReady(true);
    };

    initApi().catch(console.error);

    return () => {
      if (api) {
        api.disconnect();
      }
    };
  }, []);

  return (
    <PolkadotContext.Provider value={{ api, isApiReady }}>
      {children}
    </PolkadotContext.Provider>
  );
};

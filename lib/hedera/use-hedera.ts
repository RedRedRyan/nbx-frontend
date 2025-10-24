// lib/hedera/use-hedera.ts
"use client"

import { useState, useEffect, useCallback } from 'react';
import HederaService from './hedera-service';

export function useHedera() {
  const [isConnected, setIsConnected] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const hederaService = HederaService.getInstance();
    
    const initialize = async () => {
      try {
        await hederaService.init();
        setIsInitialized(true);
        
        if (hederaService.isConnected()) {
          setIsConnected(true);
          setAccountId(hederaService.getAccountId());
        }
      } catch (error) {
        console.error("Failed to initialize Hedera service:", error);
      }
    };

    initialize();

    // Set up event listeners
    const accountChangedUnsubscribe = hederaService.onAccountChanged((newAccountId) => {
      setAccountId(newAccountId);
    });

    const connectionStatusChangedUnsubscribe = hederaService.onConnectionStatusChanged((connected) => {
      setIsConnected(connected);
    });

    // Cleanup event listeners on component unmount
    return () => {
      accountChangedUnsubscribe();
      connectionStatusChangedUnsubscribe();
    };
  }, []);

  const connectWallet = useCallback(async () => {
    const hederaService = HederaService.getInstance();
    if (!isInitialized) {
      await hederaService.init();
      setIsInitialized(true);
    }
    return hederaService.connectToWallet();
  }, [isInitialized]);

  const disconnectWallet = useCallback(async () => {
    const hederaService = HederaService.getInstance();
    await hederaService.disconnect();
  }, []);

  const getSigner = useCallback(() => {
    const hederaService = HederaService.getInstance();
    return hederaService.getSigner();
  }, []);

  return {
    isConnected,
    accountId,
    isInitialized,
    connectWallet,
    disconnectWallet,
    getSigner
  };
}
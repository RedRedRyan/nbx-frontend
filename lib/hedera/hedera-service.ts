// lib/hedera/hedera-service.ts
import { HashConnect, HashConnectConnectionState, SessionData } from "hashconnect";
import { AccountId, LedgerId } from "@hashgraph/sdk";

const NETWORK = LedgerId.TESTNET;
const APP_METADATA = {
  name: "SME Stock Exchange",
  description: "A tokenized stock exchange for Small and Medium Enterprises",
  icons: ['/image.png'],
  url:"https://nbx-block-exchange.vercel.app/",
};

const PROJECT_ID = process.env.NEXT_PUBLIC_HASHCONNECT_PROJECT_ID || "c5b19adcab7d431cbe2c4c07e7356a4c";

class HederaService {
  private static instance: HederaService;
  private hashConnect: HashConnect;
  private pairingData: SessionData | null = null;
  private state: HashConnectConnectionState = HashConnectConnectionState.Disconnected;
  private accountId: string | null = null;
  private initialized = false;
  
  private onAccountChangedCallbacks: ((accountId: string | null) => void)[] = [];
  private onConnectionStatusChangedCallbacks: ((isConnected: boolean) => void)[] = [];

  private constructor() {
    if (!PROJECT_ID) throw new Error("HashConnect Project ID is required");
    this.hashConnect = new HashConnect(NETWORK, PROJECT_ID, APP_METADATA, true);
  }

  public static getInstance(): HederaService {
    if (!HederaService.instance) {
      HederaService.instance = new HederaService();
    }
    return HederaService.instance;
  }

  private setupEvents() {
    this.hashConnect.pairingEvent.on((pairingData) => {
      this.pairingData = pairingData;
      this.accountId = pairingData.accountIds[0];
      console.log("Paired with account:", this.accountId);
      
      this.onAccountChangedCallbacks.forEach(cb => cb(this.accountId));
      this.onConnectionStatusChangedCallbacks.forEach(cb => cb(true));
    });

    this.hashConnect.disconnectionEvent.on(() => {
      this.pairingData = null;
      this.accountId = null;
      this.state = HashConnectConnectionState.Disconnected;
      console.log("Wallet disconnected");
      
      this.onAccountChangedCallbacks.forEach(cb => cb(null));
      this.onConnectionStatusChangedCallbacks.forEach(cb => cb(false));
    });

    this.hashConnect.connectionStatusChangeEvent.on((state) => {
      this.state = state;
      this.onConnectionStatusChangedCallbacks.forEach(cb => cb(this.isConnected()));
    });
  }

  public onAccountChanged(callback: (accountId: string | null) => void): () => void {
    this.onAccountChangedCallbacks.push(callback);
    return () => {
      this.onAccountChangedCallbacks = this.onAccountChangedCallbacks.filter(cb => cb !== callback);
    };
  }

  public onConnectionStatusChanged(callback: (isConnected: boolean) => void): () => void {
    this.onConnectionStatusChangedCallbacks.push(callback);
    return () => {
      this.onConnectionStatusChangedCallbacks = this.onConnectionStatusChangedCallbacks.filter(cb => cb !== callback);
    };
  }

  public async init(): Promise<boolean> {
    if (this.initialized) return true;
    
    try {
      this.setupEvents();
      await this.hashConnect.init();
      
      // Check if there are any connected accounts after initialization
      const connectedAccounts = this.hashConnect.connectedAccountIds;
      if (connectedAccounts && connectedAccounts.length > 0) {
        // We have at least one connected account
        this.accountId = connectedAccounts[0].toString();
        this.state = HashConnectConnectionState.Paired;
        
        // Notify listeners of restored connection
        this.onAccountChangedCallbacks.forEach(cb => cb(this.accountId));
        this.onConnectionStatusChangedCallbacks.forEach(cb => cb(true));
      }
      
      this.initialized = true;
      return true;
    } catch (error) {
      console.error("HashConnect initialization failed:", error);
      throw error;
    }
  }

  public isConnected(): boolean {
    return this.state === HashConnectConnectionState.Connected || 
           this.state === HashConnectConnectionState.Paired;
  }

  public getAccountId(): string | null {
    return this.accountId;
  }

  public async connectToWallet(): Promise<string | null> {
    if (!this.initialized) await this.init();
    if (!this.hashConnect) throw new Error("HashConnect not initialized");
    
    await this.hashConnect.openPairingModal("dark");
    
    return new Promise((resolve) => {
      const handler = (pairingData: SessionData) => {
        this.accountId = pairingData.accountIds[0];
        resolve(this.accountId);
        this.hashConnect.pairingEvent.off(handler);
      };
      
      this.hashConnect.pairingEvent.on(handler);
      setTimeout(() => {
        this.hashConnect.pairingEvent.off(handler);
        resolve(null);
      }, 300000);
    });
  }

  public async disconnect(): Promise<void> {
    await this.hashConnect.disconnect();
  }

  public getSigner() {
    if (!this.accountId || !this.pairingData) {
      throw new Error("No account connected");
    }
    const accountId = AccountId.fromString(this.accountId);
    
    // Looking at the API, getSigner only needs the AccountId
    return this.hashConnect.getSigner(accountId);
  }
}

export default HederaService;
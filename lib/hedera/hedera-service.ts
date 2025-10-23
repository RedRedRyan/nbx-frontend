// lib/hedera/hedera-service.ts
import { AccountId } from "@hashgraph/sdk";
import ApiService from "../api/api-service";

// Connection states for the non-custodial wallet
enum ConnectionState {
  Disconnected = "Disconnected",
  Connected = "Connected"
}

class HederaService {
  private static instance: HederaService;
  private apiService: ApiService;
  private state: ConnectionState = ConnectionState.Disconnected;
  private accountId: string | null = null;
  private username: string | null = null;
  private accountType: string | null = null;
  private initialized = false;

  private onAccountChangedCallbacks: ((accountId: string | null) => void)[] = [];
  private onConnectionStatusChangedCallbacks: ((isConnected: boolean) => void)[] = [];

  private constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): HederaService {
    if (!HederaService.instance) {
      HederaService.instance = new HederaService();
    }
    return HederaService.instance;
  }

  // No need for event setup with the API-based approach

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
      // Check if there's a stored username and try to restore the session
      const storedUsername = localStorage.getItem('username');
      const storedAccountType = localStorage.getItem('accountType');
      if (storedUsername) {
        try {
          const userData = await this.apiService.getUser(storedUsername);
          this.username = storedUsername;
          this.accountId = userData.hederaAccountId;
          this.accountType = storedAccountType || userData.accountType || 'investor';
          this.state = ConnectionState.Connected;

          // Notify listeners of restored connection
          this.onAccountChangedCallbacks.forEach(cb => cb(this.accountId));
          this.onConnectionStatusChangedCallbacks.forEach(cb => cb(true));
        } catch (error) {
          console.error("Failed to restore session:", error);
          // Clear stored data if restoration fails
          localStorage.removeItem('username');
          localStorage.removeItem('accountType');
        }
      }

      this.initialized = true;
      return true;
    } catch (error) {
      console.error("Initialization failed:", error);
      throw error;
    }
  }

  public isConnected(): boolean {
    return this.state === ConnectionState.Connected;
  }

  public getAccountId(): string | null {
    return this.accountId;
  }

  public getUsername(): string | null {
    return this.username;
  }

  public getAccountType(): string | null {
    return this.accountType;
  }

  /**
   * Connect to a wallet by logging in with username and password
   */
  public async connectToWallet(username: string, password: string): Promise<string | null> {
    if (!this.initialized) await this.init();

    try {
      const response = await this.apiService.login(username, password);
      this.username = username;

      // Get user details to retrieve the Hedera account ID
      const userData = await this.apiService.getUser(username);
      this.accountId = userData.hederaAccountId;
      this.accountType = userData.accountType || 'investor';
      this.state = ConnectionState.Connected;

      // Store username and account type in localStorage for session persistence
      localStorage.setItem('username', username);
      localStorage.setItem('accountType', this.accountType);

      // Notify listeners of connection
      this.onAccountChangedCallbacks.forEach(cb => cb(this.accountId));
      this.onConnectionStatusChangedCallbacks.forEach(cb => cb(true));

      return this.accountId;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  }

  /**
   * Create a new wallet by registering a new user
   */
  public async createWallet(username: string, password: string, accountType: string = 'investor'): Promise<string | null> {
    if (!this.initialized) await this.init();

    try {
      const userData = await this.apiService.createUser(username, password, accountType);
      this.username = username;
      this.accountId = userData.hederaAccountId;
      this.accountType = userData.accountType || accountType;
      this.state = ConnectionState.Connected;

      // Store username and account type in localStorage for session persistence
      localStorage.setItem('username', username);
      localStorage.setItem('accountType', this.accountType);

      // Notify listeners of connection
      this.onAccountChangedCallbacks.forEach(cb => cb(this.accountId));
      this.onConnectionStatusChangedCallbacks.forEach(cb => cb(true));

      return this.accountId;
    } catch (error) {
      console.error("Account creation failed:", error);
      return null;
    }
  }

  public async disconnect(): Promise<void> {
    this.username = null;
    this.accountId = null;
    this.accountType = null;
    this.state = ConnectionState.Disconnected;

    // Remove stored username and account type
    localStorage.removeItem('username');
    localStorage.removeItem('accountType');

    // Notify listeners of disconnection
    this.onAccountChangedCallbacks.forEach(cb => cb(null));
    this.onConnectionStatusChangedCallbacks.forEach(cb => cb(false));
  }

  /**
   * Sign a transaction using the backend API
   */
  public async signTransaction(transaction: string, password: string): Promise<any> {
    if (!this.isConnected() || !this.username) {
      throw new Error("No account connected");
    }

    try {
      const response = await this.apiService.signTransaction(
        this.username,
        transaction,
        password
      );
      return response.receipt;
    } catch (error) {
      console.error("Transaction signing failed:", error);
      throw error;
    }
  }
}

export default HederaService;

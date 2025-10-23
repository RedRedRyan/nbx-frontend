// lib/auth/auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import HederaService from '../hedera/hedera-service';

export enum AccountType {
  INDIVIDUAL = 'investor',
  INSTITUTION = 'institution',
  COMPANY = 'company',
  REGULATOR = 'regulator',
}

interface AuthState {
  isAuthenticated: boolean;
  accountType: AccountType | null;
  username: string | null;
  accountId: string | null;
  
  // Actions
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, accountType: AccountType) => Promise<boolean>;
  logout: () => Promise<void>;
  
  // Permissions based on account type
  canTradeShares: () => boolean;
  canListTokens: () => boolean;
  canMoveLargeAmounts: () => boolean;
  canApproveTokenListings: () => boolean;
  canShareDividends: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      accountType: null,
      username: null,
      accountId: null,
      
      login: async (username: string, password: string) => {
        try {
          const hederaService = HederaService.getInstance();
          const accountId = await hederaService.connectToWallet(username, password);
          
          if (accountId) {
            const accountType = hederaService.getAccountType() as AccountType || AccountType.INDIVIDUAL;
            set({ 
              isAuthenticated: true, 
              username, 
              accountId,
              accountType,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Login failed:', error);
          return false;
        }
      },
      
      register: async (username: string, password: string, accountType: AccountType) => {
        try {
          const hederaService = HederaService.getInstance();
          const accountId = await hederaService.createWallet(username, password, accountType);
          
          if (accountId) {
            set({ 
              isAuthenticated: true, 
              username, 
              accountId,
              accountType,
            });
            return true;
          }
          return false;
        } catch (error) {
          console.error('Registration failed:', error);
          return false;
        }
      },
      
      logout: async () => {
        try {
          const hederaService = HederaService.getInstance();
          await hederaService.disconnect();
          set({ 
            isAuthenticated: false, 
            username: null, 
            accountId: null,
            accountType: null,
          });
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
      
      // Permission checks based on account type
      canTradeShares: () => {
        const { accountType } = get();
        return accountType === AccountType.INDIVIDUAL || 
               accountType === AccountType.INSTITUTION;
      },
      
      canListTokens: () => {
        const { accountType } = get();
        return accountType === AccountType.COMPANY;
      },
      
      canMoveLargeAmounts: () => {
        const { accountType } = get();
        return accountType === AccountType.INSTITUTION;
      },
      
      canApproveTokenListings: () => {
        const { accountType } = get();
        return accountType === AccountType.REGULATOR;
      },
      
      canShareDividends: () => {
        const { accountType } = get();
        return accountType === AccountType.COMPANY;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        accountType: state.accountType,
        username: state.username,
        accountId: state.accountId,
      }),
    }
  )
);

export default useAuthStore;
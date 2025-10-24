# NBX Security Token: Full-Stack Integration Guide

## 1. Smart Contract Development (Solidity)

### Prerequisites
- Foundry
- Solidity 0.8.x
- Hedera Token Service SDK
- Node.js
- Next.js

### Step 1: Project Setup
```bash
# Create a new project directory
mkdir nbx-security-token
cd nbx-security-token

# Initialize Foundry project
forge init --template hedera-hashgraph/hedera-smart-contracts

# Install dependencies
forge install 
npm install @hashgraph/sdk ethers
```

### Step 2: Smart Contract Development
Create `SMESecurityToken.sol` in `src/` directory:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@hashgraph/hedera-token-service/contracts/HTS.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract SMESecurityToken is Ownable {
    // [Previous contract implementation]
}
```

### Step 3: Deployment Script
Create `script/DeploySMEToken.s.sol`:
```solidity
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/SMESecurityToken.sol";

contract DeploySMEToken is Script {
    function run() external returns (SMESecurityToken) {
        vm.startBroadcast();
        
        SMESecurityToken token = new SMESecurityToken(
            "ExampleSME",
            address(0x123), // HTS Token ID
            msg.sender     // Treasury Wallet
        );
        
        vm.stopBroadcast();
        return token;
    }
}
```

### Step 4: Deployment
```bash
# Deploy to Hedera testnet
forge script script/DeploySMEToken.s.sol \
  --rpc-url https://testnet.hedera.com \
  --private-key $PRIVATE_KEY \
  --broadcast
```

## 2. Next.js Frontend Setup

### Step 1: Create Next.js Project
```bash
npx create-next-app@latest nbx-frontend
cd nbx-frontend

# Install additional dependencies
npm install ethers @hashgraph/sdk wagmi viem
```

### Step 2: ABI Generation
```bash
# Generate ABI from compiled contract
forge build
cp out/SMESecurityToken.sol/SMESecurityToken.json src/abis/SMESecurityToken.json
```

### Step 3: Web3 Provider Setup
`src/providers/Web3Provider.tsx`:
```typescript
'use client';

import { WagmiProvider } from 'wagmi';
import { hedera } from 'wagmi/chains';
import { createConfig, http } from 'wagmi';

const config = createConfig({
  chains: [hedera],
  transports: {
    [hedera.id]: http(process.env.NEXT_PUBLIC_HEDERA_RPC)
  }
});

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      {children}
    </WagmiProvider>
  );
}
```

### Step 4: Contract Interaction Hook
`src/hooks/useSecurityToken.ts`:
```typescript
import { useCallback } from 'react';
import { useWriteContract, useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import SMETokenABI from '../abis/SMESecurityToken.json';

export function useSecurityToken(contractAddress: string) {
  const { writeContract } = useWriteContract();

  const whitelistInvestor = useCallback((investor: string, status: boolean) => {
    writeContract({
      address: contractAddress,
      abi: SMETokenABI.abi,
      functionName: 'whitelistInvestor',
      args: [investor, status]
    });
  }, [contractAddress]);

  const claimDividends = useCallback(() => {
    writeContract({
      address: contractAddress,
      abi: SMETokenABI.abi,
      functionName: 'claimDividends'
    });
  }, [contractAddress]);

  const getShareholderInfo = useReadContract({
    address: contractAddress,
    abi: SMETokenABI.abi,
    functionName: 'getShareholderInfo'
  });

  return {
    whitelistInvestor,
    claimDividends,
    getShareholderInfo
  };
}
```

### Step 5: Frontend Component
`src/components/TokenDashboard.tsx`:
```typescript
'use client';

import { useSecurityToken } from '../hooks/useSecurityToken';
import { useAccount } from 'wagmi';

export function TokenDashboard() {
  const { address } = useAccount();
  const contractAddress = process.env.NEXT_PUBLIC_TOKEN_ADDRESS;
  
  const { 
    whitelistInvestor, 
    claimDividends, 
    getShareholderInfo 
  } = useSecurityToken(contractAddress);

  return (
    <div>
      <h1>SME Security Token Dashboard</h1>
      <button onClick={() => claimDividends()}>
        Claim Dividends
      </button>
    </div>
  );
}
```

## 3. Environment Configuration
Create `.env.local`:
```bash
NEXT_PUBLIC_HEDERA_RPC=https://testnet.hedera.com
NEXT_PUBLIC_TOKEN_ADDRESS=0x...
PRIVATE_KEY=...
```

## 4. Deployment Workflow
1. Deploy Smart Contract with Foundry
2. Export ABI
3. Configure Next.js environment
4. Deploy Next.js application

## 5. Additional Considerations
- Implement comprehensive error handling
- Add loading states
- Integrate Hedera Wallet Connect
- Implement robust security checks

## Troubleshooting
- Ensure compatible Solidity versions
- Verify RPC endpoints
- Check network configuration
- Validate smart contract interactions

## Security Notes
- Never expose private keys
- Use environment variables
- Implement comprehensive access controls
- Regular security audits
```

## Deployment Checklist
1. Smart Contract Deployment ✓
2. ABI Generation ✓
3. Frontend Configuration ✓
4. Web3 Provider Setup ✓
5. Contract Interaction Hooks ✓

## Next Steps
- Implement comprehensive testing
- Add more advanced governance features
- Create robust error handling
- Develop user authentication layer

Would you like me to elaborate on any specific part of the integration guide or discuss implementation details?

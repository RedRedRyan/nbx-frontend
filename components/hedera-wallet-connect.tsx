// components/hedera-wallet-connect.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut } from "lucide-react"
import HederaService from "@/lib/hedera/hedera-service" // Import the class
import { useToast } from "@/components/ui/use-toast"

export function HederaWalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [accountId, setAccountId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Get the singleton instance instead of creating a new instance
    const hederaService = HederaService.getInstance();
    
    const initializeHederaService = async () => {
      try {
        await hederaService.init()
        // Check if already connected
        if (hederaService.isConnected()) {
          setIsConnected(true)
          setAccountId(hederaService.getAccountId())
        }
      } catch (error) {
        console.error("Failed to initialize Hedera service:", error)
      }
    }

    initializeHederaService()
    
    // Set up event listeners
    const accountChangedUnsubscribe = hederaService.onAccountChanged((newAccountId) => {
      setAccountId(newAccountId)
    })

    const connectionStatusChangedUnsubscribe = hederaService.onConnectionStatusChanged((connected) => {
      setIsConnected(connected)
    })

    // Cleanup event listeners on component unmount
    return () => {
      accountChangedUnsubscribe()
      connectionStatusChangedUnsubscribe()
    }
  }, [])

  const connectWallet = async () => {
    setIsLoading(true)
    try {
      const hederaService = HederaService.getInstance()
      const newAccountId = await hederaService.connectToWallet()
      
      if (newAccountId) {
        toast({
          title: "Wallet Connected",
          description: `Connected to account ${newAccountId}`,
        })
      } else {
        // User closed the modal without connecting
        toast({
          title: "Connection Cancelled",
          description: "Wallet connection was cancelled or timed out.",
        })
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      toast({
        title: "Connection Failed",
        description: "Could not connect to Hedera wallet. Please make sure you have a wallet extension installed.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      const hederaService = HederaService.getInstance()
      await hederaService.disconnect()
      toast({
        title: "Wallet Disconnected",
        description: "Your Hedera wallet has been disconnected.",
      })
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
      toast({
        title: "Disconnection Failed",
        description: "Could not disconnect from Hedera wallet.",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      {!isConnected ? (
        <Button variant="outline" onClick={connectWallet} disabled={isLoading} className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          {isLoading ? "Connecting..." : "Connect Hedera Wallet"}
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            {accountId ? `${accountId.substring(0, 8)}...` : "Connected"}
          </Button>
          <Button variant="ghost" size="icon" onClick={disconnectWallet}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
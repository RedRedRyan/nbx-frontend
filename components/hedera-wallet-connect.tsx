// components/hedera-wallet-connect.tsx
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, User, Key } from "lucide-react"
import HederaService from "@/lib/hedera/hedera-service"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function HederaWalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [accountId, setAccountId] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loginUsername, setLoginUsername] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerUsername, setRegisterUsername] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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
          setUsername(hederaService.getUsername())
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
      if (!connected) {
        setUsername(null)
      }
    })

    // Cleanup event listeners on component unmount
    return () => {
      accountChangedUnsubscribe()
      connectionStatusChangedUnsubscribe()
    }
  }, [])

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const hederaService = HederaService.getInstance()
      const newAccountId = await hederaService.connectToWallet(loginUsername, loginPassword)

      if (newAccountId) {
        setUsername(loginUsername)
        setIsDialogOpen(false)
        toast({
          title: "Login Successful",
          description: `Connected to account ${newAccountId}`,
        })
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to login:", error)
      toast({
        title: "Login Failed",
        description: "Could not connect to your account. Please check your credentials.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    if (registerPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    if (registerPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const hederaService = HederaService.getInstance()
      const newAccountId = await hederaService.createWallet(registerUsername, registerPassword)

      if (newAccountId) {
        setUsername(registerUsername)
        setIsDialogOpen(false)
        toast({
          title: "Account Created",
          description: `Your Hedera account ${newAccountId} has been created successfully.`,
        })
      } else {
        toast({
          title: "Registration Failed",
          description: "Could not create your account. Username may already be taken.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Failed to register:", error)
      toast({
        title: "Registration Failed",
        description: "Could not create your account. Please try again later.",
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
        title: "Logged Out",
        description: "You have been logged out successfully.",
      })
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
      toast({
        title: "Logout Failed",
        description: "Could not log you out. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      {!isConnected ? (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Hedera Wallet</DialogTitle>
              <DialogDescription>
                Connect to your non-custodial Hedera wallet or create a new one.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">Username</Label>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="login-username" 
                      value={loginUsername} 
                      onChange={(e) => setLoginUsername(e.target.value)} 
                      placeholder="Enter your username" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="login-password" 
                      type="password" 
                      value={loginPassword} 
                      onChange={(e) => setLoginPassword(e.target.value)} 
                      placeholder="Enter your password" 
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleLogin} 
                  disabled={isLoading || !loginUsername || !loginPassword} 
                  className="w-full"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username">Username</Label>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="register-username" 
                      value={registerUsername} 
                      onChange={(e) => setRegisterUsername(e.target.value)} 
                      placeholder="Choose a username" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="register-password" 
                      type="password" 
                      value={registerPassword} 
                      onChange={(e) => setRegisterPassword(e.target.value)} 
                      placeholder="Create a password (min 8 characters)" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      placeholder="Confirm your password" 
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleRegister} 
                  disabled={isLoading || !registerUsername || !registerPassword || !confirmPassword} 
                  className="w-full"
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex flex-col space-y-2">
              <p className="text-xs text-muted-foreground text-center">
                Your private key will be encrypted and stored securely. You'll need your password to sign transactions.
              </p>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            {username ? `@${username}` : "Connected"}
            {accountId && <span className="text-xs text-muted-foreground ml-1">({accountId.substring(0, 6)}...)</span>}
          </Button>
          <Button variant="ghost" size="icon" onClick={disconnectWallet}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

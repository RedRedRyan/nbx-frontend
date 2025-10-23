"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, CheckCircle2, ChevronRight, Copy, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import HederaService from "@/lib/hedera/hedera-service"
import useAuthStore from "@/lib/auth/auth-store"

export default function ProfilePage() {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [accountId, setAccountId] = useState<string | null>(null)
  const [evmAddress, setEvmAddress] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [accountType, setAccountType] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copySuccess, setCopySuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const hederaService = HederaService.getInstance()
        await hederaService.init()

        if (!hederaService.isConnected()) {
          router.push("/auth/login")
          return
        }

        // Get user data from Hedera service
        setAccountId(hederaService.getAccountId())
        setUsername(hederaService.getUsername())
        setAccountType(hederaService.getAccountType())

        // Fetch additional user details from API
        if (hederaService.getUsername()) {
          const apiService = await import("@/lib/api/api-service")
          const api = apiService.default.getInstance()
          const userData = await api.getUser(hederaService.getUsername()!)
          setEvmAddress(userData.hederaEVMAccount)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(type)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const startVerification = () => {
    router.push("/auth/register")
  }

  if (isLoading) {
    return (
      <div className="container py-10">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <span className="ml-2">Loading profile...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your Hedera account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Username</h3>
              <p className="text-lg font-medium">{username || "Not available"}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Account Type</h3>
              <p className="text-lg font-medium capitalize">{accountType || "Individual"}</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Hedera Account ID</h3>
              <div className="flex items-center gap-2">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  {accountId || "Not available"}
                </code>
                {accountId && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => copyToClipboard(accountId, "accountId")}
                    className="h-8 w-8"
                  >
                    {copySuccess === "accountId" ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Hedera EVM Address</h3>
              <div className="flex items-center gap-2">
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm truncate max-w-[250px]">
                  {evmAddress || "Not available"}
                </code>
                {evmAddress && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => copyToClipboard(evmAddress, "evmAddress")}
                    className="h-8 w-8"
                  >
                    {copySuccess === "evmAddress" ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>Complete KYC to unlock investment opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Verification Required</AlertTitle>
              <AlertDescription>
                Your profile is not complete. Complete KYC to unlock investment opportunities.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-destructive"></div>
                <span>Identity verification pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-destructive"></div>
                <span>Address verification pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-destructive"></div>
                <span>Financial information pending</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={startVerification}>
              Start Verification <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Trading Status</CardTitle>
            <CardDescription>Your current trading capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Limited Trading Access</AlertTitle>
              <AlertDescription>
                You currently have limited access to trading features. Complete verification to unlock full trading capabilities.
              </AlertDescription>
            </Alert>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Button variant="outline" className="w-full" onClick={() => router.push("/market")}>
                View Market <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Trade Shares (Requires Verification)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
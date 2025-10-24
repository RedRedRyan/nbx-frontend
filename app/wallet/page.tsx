"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Clock, Download, ExternalLink, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock wallet data
const walletData = {
  balance: 2450.0,
  hbarBalance: 1250,
  hbarValue: 250.0,
  stablecoinBalance: 2200.0,
  transactions: [
    {
      id: 1,
      type: "deposit",
      amount: 500.0,
      currency: "USDC",
      date: "2023-10-15T10:30:00Z",
      status: "completed",
    },
    {
      id: 2,
      type: "buy",
      symbol: "TECH",
      amount: 250.0,
      quantity: 20,
      date: "2023-10-12T14:45:00Z",
      status: "completed",
    },
    {
      id: 3,
      type: "sell",
      symbol: "GFARM",
      amount: 180.0,
      quantity: 20,
      date: "2023-10-10T09:15:00Z",
      status: "completed",
    },
    {
      id: 4,
      type: "withdraw",
      amount: 100.0,
      currency: "USDC",
      date: "2023-10-05T16:20:00Z",
      status: "completed",
    },
    {
      id: 5,
      type: "deposit",
      amount: 1000.0,
      currency: "USDC",
      date: "2023-10-01T11:10:00Z",
      status: "completed",
    },
  ],
}

export default function WalletPage() {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDown className="h-4 w-4 text-green-500" />
      case "withdraw":
        return <ArrowUp className="h-4 w-4 text-red-500" />
      case "buy":
        return <ArrowDown className="h-4 w-4 text-green-500" />
      case "sell":
        return <ArrowUp className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getTransactionLabel = (transaction: any) => {
    switch (transaction.type) {
      case "deposit":
        return `Deposit ${transaction.currency}`
      case "withdraw":
        return `Withdraw ${transaction.currency}`
      case "buy":
        return `Buy ${transaction.symbol}`
      case "sell":
        return `Sell ${transaction.symbol}`
      default:
        return "Transaction"
    }
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
          <p className="text-muted-foreground">Manage your funds and transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Funds
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Funds</DialogTitle>
                <DialogDescription>Deposit funds to your wallet to start investing</DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="card" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="card">Credit Card</TabsTrigger>
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                </TabsList>
                <TabsContent value="card" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deposit-amount">Amount (USD)</Label>
                    <Input
                      id="deposit-amount"
                      type="number"
                      placeholder="100.00"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="crypto" className="space-y-4 pt-4">
                  <div className="rounded-md bg-muted p-4">
                    <div className="text-center">
                      <div className="mb-2 text-sm font-medium">Deposit HBAR or USDC</div>
                      <div className="mb-4 text-xs text-muted-foreground">Send to this Hedera account ID</div>
                      <div className="flex items-center justify-center gap-2">
                        <code className="rounded bg-background px-2 py-1 text-sm">0.0.1234567</code>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Funds will appear in your wallet after network confirmation
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Deposit Funds</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <ArrowUp className="mr-2 h-4 w-4" />
                Withdraw
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Withdraw Funds</DialogTitle>
                <DialogDescription>Withdraw funds from your wallet</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="rounded-md bg-muted p-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Available Balance</span>
                    <span className="font-medium">${walletData.balance.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="withdraw-currency">Currency</Label>
                  <select
                    id="withdraw-currency"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="usdc">USDC</option>
                    <option value="hbar">HBAR</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="withdraw-to">Withdraw To</Label>
                  <Input id="withdraw-to" placeholder="Hedera Account ID or EVM Address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">Amount</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="100.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Withdraw Funds</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Balance</CardTitle>
            <CardDescription>Your available funds</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${walletData.balance.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>HBAR</CardTitle>
            <CardDescription>Hedera native token</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold">{walletData.hbarBalance.toFixed(2)}</div>
              <div className="text-lg text-muted-foreground">${walletData.hbarValue.toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Stablecoins</CardTitle>
            <CardDescription>USDC, USDT, etc.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${walletData.stablecoinBalance.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Your recent transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {walletData.transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <div className="font-medium">{getTransactionLabel(transaction)}</div>
                      <div className="text-sm text-muted-foreground">{formatDate(transaction.date)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-medium ${transaction.type === "deposit" || transaction.type === "buy" ? "text-green-600" : transaction.type === "withdraw" || transaction.type === "sell" ? "text-red-600" : ""}`}
                    >
                      {transaction.type === "deposit"
                        ? "+"
                        : transaction.type === "withdraw"
                          ? "-"
                          : transaction.type === "buy"
                            ? "-"
                            : transaction.type === "sell"
                              ? "+"
                              : ""}
                      ${transaction.amount.toFixed(2)}
                    </div>
                    {(transaction.type === "buy" || transaction.type === "sell") && (
                      <div className="text-sm text-muted-foreground">
                        {transaction.quantity} {transaction.symbol}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <Button variant="outline">
              View All Transactions
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}


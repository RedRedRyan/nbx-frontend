"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Building,
  ChevronDown,
  ChevronUp,
  LineChart,
  PieChart,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock portfolio data
const portfolioData = {
  totalValue: 3750.0,
  totalGain: 250.0,
  totalGainPercentage: 7.14,
  holdings: [
    {
      id: 1,
      name: "TechInnovate Solutions",
      symbol: "TECH",
      quantity: 100,
      price: 12.45,
      value: 1245.0,
      costBasis: 1100.0,
      gain: 145.0,
      gainPercentage: 13.18,
    },
    {
      id: 2,
      name: "GreenFarm Produce",
      symbol: "GFARM",
      quantity: 150,
      price: 8.75,
      value: 1312.5,
      costBasis: 1275.0,
      gain: 37.5,
      gainPercentage: 2.94,
    },
    {
      id: 3,
      name: "MicroFinance Partners",
      symbol: "MFIN",
      quantity: 75,
      price: 15.2,
      value: 1140.0,
      costBasis: 1050.0,
      gain: 90.0,
      gainPercentage: 8.57,
    },
  ],
  dividends: [
    {
      id: 1,
      symbol: "TECH",
      amount: 25.0,
      date: "2023-09-15T10:00:00Z",
      status: "paid",
    },
    {
      id: 2,
      symbol: "GFARM",
      amount: 30.0,
      date: "2023-08-20T10:00:00Z",
      status: "paid",
    },
  ],
  votes: [
    {
      id: 1,
      company: "TechInnovate Solutions",
      symbol: "TECH",
      title: "Annual General Meeting",
      deadline: "2023-11-30T23:59:59Z",
      status: "open",
    },
    {
      id: 2,
      company: "GreenFarm Produce",
      symbol: "GFARM",
      title: "Board Member Election",
      deadline: "2023-10-25T23:59:59Z",
      status: "closed",
    },
  ],
}

export default function PortfolioPage() {
  const [sortField, setSortField] = useState("value")
  const [sortDirection, setSortDirection] = useState("desc")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const sortedHoldings = [...portfolioData.holdings].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField as keyof typeof a] > b[sortField as keyof typeof b] ? 1 : -1
    } else {
      return a[sortField as keyof typeof a] < b[sortField as keyof typeof b] ? 1 : -1
    }
  })

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ChevronDown className="h-4 w-4 opacity-50" />
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/market">
            <Button>Invest More</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Value</CardTitle>
            <CardDescription>Current portfolio value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${portfolioData.totalValue.toFixed(2)}</div>
            <div
              className={`flex items-center text-sm ${portfolioData.totalGain >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {portfolioData.totalGain >= 0 ? (
                <ArrowUp className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4" />
              )}
              ${Math.abs(portfolioData.totalGain).toFixed(2)} ({Math.abs(portfolioData.totalGainPercentage).toFixed(2)}
              %)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Distribution by company</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full">
              <PieChart className="h-16 w-16 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Performance</CardTitle>
            <CardDescription>Historical returns</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="flex h-[100px] w-full items-center justify-center">
              <LineChart className="h-16 w-16 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="holdings">
          <TabsList className="mb-6">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="dividends">Dividends</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings">
            <Card>
              <CardHeader>
                <CardTitle>Your Holdings</CardTitle>
                <CardDescription>Companies you've invested in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
                    <div className="col-span-4 md:col-span-3 flex items-center">
                      <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("name")}>
                        Company {getSortIcon("name")}
                      </Button>
                    </div>
                    <div className="col-span-2 text-right">
                      <Button
                        variant="ghost"
                        className="p-0 hover:bg-transparent"
                        onClick={() => handleSort("quantity")}
                      >
                        Quantity {getSortIcon("quantity")}
                      </Button>
                    </div>
                    <div className="col-span-2 text-right">
                      <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("price")}>
                        Price {getSortIcon("price")}
                      </Button>
                    </div>
                    <div className="col-span-2 text-right">
                      <Button variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleSort("value")}>
                        Value {getSortIcon("value")}
                      </Button>
                    </div>
                    <div className="col-span-2 md:col-span-3 text-right">
                      <Button
                        variant="ghost"
                        className="p-0 hover:bg-transparent"
                        onClick={() => handleSort("gainPercentage")}
                      >
                        Gain/Loss {getSortIcon("gainPercentage")}
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  {sortedHoldings.map((holding) => (
                    <div key={holding.id}>
                      <div className="grid grid-cols-12 gap-4 p-4 items-center">
                        <div className="col-span-4 md:col-span-3 flex items-center">
                          <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{holding.name}</div>
                            <div className="text-sm text-muted-foreground">{holding.symbol}</div>
                          </div>
                        </div>
                        <div className="col-span-2 text-right font-medium">{holding.quantity}</div>
                        <div className="col-span-2 text-right font-medium">${holding.price.toFixed(2)}</div>
                        <div className="col-span-2 text-right font-medium">${holding.value.toFixed(2)}</div>
                        <div className="col-span-2 md:col-span-3 text-right">
                          <div className={`font-medium ${holding.gain >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {holding.gain >= 0 ? "+" : ""}
                            {holding.gain.toFixed(2)} ({holding.gain >= 0 ? "+" : ""}
                            {holding.gainPercentage.toFixed(2)}%)
                          </div>
                          <div className="text-xs text-muted-foreground">Cost: ${holding.costBasis.toFixed(2)}</div>
                        </div>
                      </div>
                      <Separator />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dividends">
            <Card>
              <CardHeader>
                <CardTitle>Dividend History</CardTitle>
                <CardDescription>Income from your investments</CardDescription>
              </CardHeader>
              <CardContent>
                {portfolioData.dividends.length > 0 ? (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 gap-4 p-4 text-sm font-medium text-muted-foreground">
                      <div>Company</div>
                      <div className="text-right">Amount</div>
                      <div className="text-right">Date</div>
                      <div className="text-right">Status</div>
                    </div>
                    <Separator />
                    {portfolioData.dividends.map((dividend) => (
                      <div key={dividend.id}>
                        <div className="grid grid-cols-4 gap-4 p-4 items-center">
                          <div className="font-medium">{dividend.symbol}</div>
                          <div className="text-right font-medium">${dividend.amount.toFixed(2)}</div>
                          <div className="text-right text-sm">{formatDate(dividend.date)}</div>
                          <div className="text-right">
                            <Badge variant="outline" className="capitalize">
                              {dividend.status}
                            </Badge>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <BarChart3 className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-medium">No Dividends Yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Dividend payments will appear here when companies distribute profits
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance">
            <Card>
              <CardHeader>
                <CardTitle>Governance Voting</CardTitle>
                <CardDescription>Participate in company decisions</CardDescription>
              </CardHeader>
              <CardContent>
                {portfolioData.votes.length > 0 ? (
                  <div className="space-y-4">
                    {portfolioData.votes.map((vote) => (
                      <Card key={vote.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{vote.title}</CardTitle>
                            <Badge variant={vote.status === "open" ? "default" : "secondary"} className="capitalize">
                              {vote.status}
                            </Badge>
                          </div>
                          <CardDescription>
                            {vote.company} ({vote.symbol})
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Deadline</span>
                            <span>{formatDate(vote.deadline)}</span>
                          </div>
                        </CardContent>
                        <CardFooter>
                          {vote.status === "open" ? (
                            <Button className="w-full">Cast Your Vote</Button>
                          ) : (
                            <Button variant="outline" className="w-full" disabled>
                              Voting Closed
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Users className="mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-medium">No Active Votes</h3>
                    <p className="text-sm text-muted-foreground">
                      Governance votes will appear here when companies initiate voting events
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


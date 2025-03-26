"use client"

import { useState } from "react"
import Link from "next/link"
import { FileText, Plus, Upload, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock company data for SME
const companyData = {
  name: "TechInnovate Solutions",
  status: "Listed",
  tokenSymbol: "TECH",
  totalSupply: "100,000",
  circulatingSupply: "85,000",
  currentPrice: 12.45,
  marketCap: "$1.2M",
  shareholders: 156,
  documents: [
    { name: "Financial Statements 2023", type: "PDF", date: "2023-09-15" },
    { name: "Business Plan", type: "PDF", date: "2023-08-10" },
    { name: "Term Sheet", type: "PDF", date: "2023-07-22" },
  ],
  upcomingEvents: [
    { name: "Annual General Meeting", date: "2023-11-30", type: "Governance" },
    { name: "Q3 Earnings Release", date: "2023-10-25", type: "Financial" },
  ],
}

export default function CompaniesPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Dashboard</h1>
          <p className="text-muted-foreground">Manage your company listing and shareholders</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/companies/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Listing
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="dashboard" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="tokenization">Tokenization</TabsTrigger>
          <TabsTrigger value="shareholders">Shareholders</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Company Status</CardTitle>
                <CardDescription>Current listing status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{companyData.name}</div>
                  <Badge className="bg-green-600">{companyData.status}</Badge>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">Token Symbol: {companyData.tokenSymbol}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Market Data</CardTitle>
                <CardDescription>Current trading information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Current Price</div>
                    <div className="text-2xl font-bold">${companyData.currentPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Market Cap</div>
                    <div className="text-2xl font-bold">{companyData.marketCap}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Shareholders</CardTitle>
                <CardDescription>Investor information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{companyData.shareholders}</div>
                <div className="text-sm text-muted-foreground">Total unique shareholders</div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Token Distribution</CardTitle>
                <CardDescription>Current supply metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>Circulating Supply</span>
                      <span className="font-medium">
                        {companyData.circulatingSupply} / {companyData.totalSupply}
                      </span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>

                  <div className="rounded-md bg-muted p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Total Supply</div>
                        <div className="font-medium">{companyData.totalSupply}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Circulating</div>
                        <div className="font-medium">{companyData.circulatingSupply}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Reserved</div>
                        <div className="font-medium">10,000</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Locked</div>
                        <div className="font-medium">5,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Scheduled company events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {companyData.upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{event.name}</div>
                        <div className="text-sm text-muted-foreground">{formatDate(event.date)}</div>
                      </div>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Schedule New Event
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tokenization">
          <Card>
            <CardHeader>
              <CardTitle>Token Management</CardTitle>
              <CardDescription>Manage your security tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{companyData.tokenSymbol} Token</h3>
                    <p className="text-sm text-muted-foreground">Security Token</p>
                  </div>
                  <Badge className="bg-green-600">Active</Badge>
                </div>
                <Separator className="my-4" />
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Token Standard</div>
                    <div className="font-medium">Hedera Token Service</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Supply</div>
                    <div className="font-medium">{companyData.totalSupply}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Token ID</div>
                    <div className="font-medium">0.0.1234567</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Issue Additional Tokens</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Issue additional tokens for fundraising or employee compensation
                    </p>
                    <Button className="w-full">Issue Tokens</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Dividend Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Distribute dividends to all token holders</p>
                    <Button className="w-full">Distribute Dividends</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shareholders">
          <Card>
            <CardHeader>
              <CardTitle>Shareholder Management</CardTitle>
              <CardDescription>View and manage your investors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-4">Shareholder</div>
                  <div className="col-span-3 text-right">Tokens Held</div>
                  <div className="col-span-3 text-right">Ownership %</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                <Separator />
                <div className="p-4 text-center text-sm text-muted-foreground">
                  <Users className="mx-auto mb-2 h-8 w-8" />
                  <p>You have {companyData.shareholders} shareholders</p>
                  <p>Download the full shareholder registry for detailed information</p>
                </div>
                <Separator />
                <div className="p-4 flex justify-end">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Download Registry
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Governance Voting</CardTitle>
                <CardDescription>Create and manage shareholder votes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Annual General Meeting</h3>
                      <p className="text-sm text-muted-foreground">Voting opens on {formatDate("2023-11-15")}</p>
                    </div>
                    <Badge>Upcoming</Badge>
                  </div>
                </div>

                <Button className="w-full">Create New Vote</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>Upload and manage company documents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-5">Document</div>
                  <div className="col-span-3">Type</div>
                  <div className="col-span-2 text-right">Date</div>
                  <div className="col-span-2 text-right">Actions</div>
                </div>
                <Separator />
                {companyData.documents.map((doc, index) => (
                  <div key={index}>
                    <div className="grid grid-cols-12 gap-4 p-4 items-center">
                      <div className="col-span-5 font-medium">{doc.name}</div>
                      <div className="col-span-3">
                        <Badge variant="outline">{doc.type}</Badge>
                      </div>
                      <div className="col-span-2 text-right text-sm text-muted-foreground">{formatDate(doc.date)}</div>
                      <div className="col-span-2 text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>

              <div className="rounded-md border border-dashed p-8">
                <div className="flex flex-col items-center justify-center text-center">
                  <Upload className="mb-4 h-8 w-8 text-muted-foreground" />
                  <h3 className="mb-1 text-lg font-medium">Upload Document</h3>
                  <p className="mb-4 text-sm text-muted-foreground">Drag and drop files or click to browse</p>
                  <Button>Upload Document</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


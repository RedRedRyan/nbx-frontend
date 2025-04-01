"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { HederaWalletConnect } from "@/components/hedera-wallet-connect"
import {
  FileText,
  Plus,
  Upload,
  Users,
  Wallet,
  ArrowRight,
  DollarSign,
  Vote,
  BarChart3,
  Calendar,
  Settings
} from "lucide-react"

// Mock company data for dashboard
const companyData = {
  name: "TechInnovate Solutions",
  status: "Listed",
  tokenSymbol: "TECH",
  tokenId: "0.0.1234567",
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
  dividendHistory: [
    { date: "2023-06-15", amount: "$0.05 per token", total: "$4,250" },
    { date: "2023-03-15", amount: "$0.04 per token", total: "$3,400" },
  ],
  proposals: [
    { 
      id: "PROP-001", 
      title: "Expansion to East African Market", 
      status: "Active",
      endDate: "2023-12-15",
      votesFor: 65,
      votesAgainst: 12,
      description: "Proposal to allocate funds for expansion into neighboring East African countries."
    },
    { 
      id: "PROP-002", 
      title: "New Board Member Appointment", 
      status: "Closed",
      endDate: "2023-09-10",
      result: "Approved",
      votesFor: 80,
      votesAgainst: 5,
      description: "Appointment of Jane Doe as a new board member representing minority shareholders."
    }
  ]
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

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
          <p className="text-muted-foreground">Manage your company's tokens, dividends, and proposals</p>
        </div>
        <HederaWalletConnect />
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="token-issuance">Token Issuance</TabsTrigger>
          <TabsTrigger value="dividends">Dividends</TabsTrigger>
          <TabsTrigger value="proposals">Governance</TabsTrigger>
          <TabsTrigger value="shareholders">Shareholders</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
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
                <div className="mt-1 text-sm text-muted-foreground">Token ID: {companyData.tokenId}</div>
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
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New Event
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Token Issuance Tab */}
        <TabsContent value="token-issuance">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Issue New Tokens</CardTitle>
                <CardDescription>Create additional tokens for your company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="issue-amount">Amount to Issue</Label>
                  <Input id="issue-amount" type="number" placeholder="e.g. 10000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issue-purpose">Purpose</Label>
                  <select
                    id="issue-purpose"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select purpose</option>
                    <option value="fundraising">Fundraising</option>
                    <option value="employee">Employee Compensation</option>
                    <option value="acquisition">Acquisition</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issue-note">Note</Label>
                  <Textarea
                    id="issue-note"
                    placeholder="Reason for issuing additional tokens"
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Issue Tokens
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Token Information</CardTitle>
                <CardDescription>Details about your current token</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <div className="grid gap-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Token Symbol:</span>
                      <span className="font-medium">{companyData.tokenSymbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Token ID:</span>
                      <span className="font-medium">{companyData.tokenId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Supply:</span>
                      <span className="font-medium">{companyData.totalSupply}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Token Type:</span>
                      <span className="font-medium">Fungible</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created Date:</span>
                      <span className="font-medium">Jan 15, 2023</span>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Recent Token Operations</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Token Issuance</span>
                      <div className="text-right">
                        <div>5,000 tokens</div>
                        <div className="text-muted-foreground">Oct 5, 2023</div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Token Freeze</span>
                      <div className="text-right">
                        <div>1,000 tokens</div>
                        <div className="text-muted-foreground">Sep 12, 2023</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View Token History
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Dividends Tab */}
        <TabsContent value="dividends">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribute Dividends</CardTitle>
                <CardDescription>Pay dividends to your shareholders</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dividend-amount">Amount per Token (USD)</Label>
                  <Input id="dividend-amount" type="number" step="0.01" placeholder="e.g. 0.05" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dividend-date">Payment Date</Label>
                  <Input id="dividend-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dividend-snapshot">Snapshot Date</Label>
                  <Input id="dividend-snapshot" type="date" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Token holders as of this date will be eligible for dividends
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dividend-notes">Notes</Label>
                  <Textarea
                    id="dividend-notes"
                    placeholder="Additional information about this dividend payment"
                    rows={3}
                  />
                </div>
                
                <div className="rounded-md bg-muted p-4 mt-4">
                  <h3 className="text-sm font-medium mb-2">Dividend Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Circulating Supply:</span>
                      <span>{companyData.circulatingSupply} tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment per Token:</span>
                      <span>$0.05</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total Payment:</span>
                      <span>$4,250.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Distribute Dividends
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dividend History</CardTitle>
                <CardDescription>Past dividend payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
                    <div className="col-span-4">Date</div>
                    <div className="col-span-4">Amount</div>
                    <div className="col-span-4 text-right">Total Paid</div>
                  </div>
                  <Separator />
                  {companyData.dividendHistory.map((dividend, index) => (
                    <div key={index}>
                      <div className="grid grid-cols-12 gap-4 p-4 items-center">
                        <div className="col-span-4 font-medium">{formatDate(dividend.date)}</div>
                        <div className="col-span-4">{dividend.amount}</div>
                        <div className="col-span-4 text-right">{dividend.total}</div>
                      </div>
                      {index < companyData.dividendHistory.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
                
                <div className="rounded-md bg-muted p-4 mt-6">
                  <h3 className="text-sm font-medium mb-2">Dividend Policy</h3>
                  <p className="text-sm text-muted-foreground">
                    TechInnovate Solutions aims to distribute quarterly dividends based on company performance,
                    with a target payout ratio of 30% of quarterly profits.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Update Dividend Policy
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Proposals Tab */}
        <TabsContent value="proposals">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Governance Proposals</CardTitle>
                  <CardDescription>Create and manage shareholder voting proposals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {companyData.proposals.map((proposal, index) => (
                    <div key={index} className="rounded-md border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-medium">{proposal.title}</h3>
                          <p className="text-sm text-muted-foreground">ID: {proposal.id}</p>
                        </div>
                        <Badge 
                          className={proposal.status === "Active" ? "bg-green-600" : "bg-gray-600"}
                        >
                          {proposal.status}
                        </Badge>
                      </div>
                      <p className="text-sm mb-4">{proposal.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Voting Progress</span>
                          <span>
                            {proposal.votesFor + proposal.votesAgainst} votes ({proposal.status === "Active" ? "Ends " + formatDate(proposal.endDate) : "Closed"})
                          </span>
                        </div>
                        <div className="flex h-2 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="bg-green-500 transition-all"
                            style={{ width: `${(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                          />
                          <div
                            className="bg-red-500 transition-all"
                            style={{ width: `${(proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>For: {proposal.votesFor} ({Math.round((proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100)}%)</span>
                          <span>Against: {proposal.votesAgainst} ({Math.round((proposal.votesAgainst / (proposal.votesFor + proposal.votesAgainst)) * 100)}%)</span>
                        </div>
                      </div>
                      {proposal.result && (
                        <div className="mt-4 flex items-center">
                          <Badge className={proposal.result === "Approved" ? "bg-green-600" : "bg-red-600"}>
                            {proposal.result}
                          </Badge>
                        </div>
                      )}
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Create Proposal</CardTitle>
                  <CardDescription>Submit a new proposal for shareholder voting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="proposal-title">Proposal Title</Label>
                    <Input id="proposal-title" placeholder="Enter proposal title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proposal-type">Proposal Type</Label>
                    <select
                      id="proposal-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select type</option>
                      <option value="governance">Governance Change</option>
                      <option value="strategic">Strategic Decision</option>
                      <option value="board">Board Member Election</option>
                      <option value="financial">Financial Decision</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proposal-description">Description</Label>
                    <Textarea
                      id="proposal-description"
                      placeholder="Describe the proposal in detail"
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proposal-end-date">Voting End Date</Label>
                    <Input id="proposal-end-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proposal-document">Attach Document (Optional)</Label>
                    <Input id="proposal-document" type="file" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    <Vote className="mr-2 h-4 w-4" />
                    Create Proposal
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Shareholders Tab */}
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

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Shareholder Analytics</CardTitle>
                <CardDescription>Insights about your investor base</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <h3 className="text-sm font-medium mb-2">Investor Distribution</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Retail Investors</span>
                        <span>68%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-blue-500" style={{ width: "68%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Institutional Investors</span>
                        <span>22%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: "22%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Founding Team</span>
                        <span>10%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-yellow-500" style={{ width: "10%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h3 className="text-sm font-medium mb-2">Top Shareholders</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Venture Capital Fund X</span>
                      <span>15.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>John Smith (Founder)</span>
                      <span>8.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Institutional Investor Y</span>
                      <span>6.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Angel Investor Group</span>
                      <span>4.3%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Full Analytics
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shareholder Communication</CardTitle>
                <CardDescription>Send messages to your investors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message-subject">Subject</Label>
                  <Input id="message-subject" placeholder="Enter message subject" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message-recipients">Recipients</Label>
                  <select
                    id="message-recipients"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="all">All Shareholders</option>
                    <option value="major">Major Shareholders (>1%)</option>
                    <option value="retail">Retail Investors</option>
                    <option value="institutional">Institutional Investors</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message-content">Message</Label>
                  <Textarea
                    id="message-content"
                    placeholder="Type your message here"
                    rows={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message-attachment">Attachment (Optional)</Label>
                  <Input id="message-attachment" type="file" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
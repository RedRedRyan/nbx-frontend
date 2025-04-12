"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Building,
  ChevronDown,
  ChevronUp,
  LineChart,
  PieChart as RechartsPieChart,
  Vote,
  Clock,
  Check,
  X,
  Calendar,
  FileText,
  Bell,
} from "lucide-react";
import * as Recharts from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HederaWalletConnect } from "@/components/hedera-wallet-connect";
import { Progress } from "@/components/ui/progress";

// Define types for portfolio data
type Holding = {
  id: number;
  name: string;
  symbol: string;
  quantity: number;
  price: number;
  value: number;
  costBasis: number;
  gain: number;
  gainPercentage: number;
  color: string;
};

type Dividend = {
  id: number;
  company: string;
  symbol: string;
  amount: number;
  date: string;
  status: string;
};

type Vote = {
  id: number;
  company: string;
  symbol: string;
  title: string;
  description: string;
  deadline: string;
  status: "open" | "closed";
  votesFor: number;
  votesAgainst: number;
  result?: "approved" | "rejected";
};

type UpcomingVote = {
  id: number;
  company: string;
  symbol: string;
  title: string;
  description: string;
  date: string;
};

type PortfolioData = {
  totalValue: number;
  totalGain: number;
  totalGainPercentage: number;
  holdings: Holding[];
  dividends: Dividend[];
  votes: Vote[];
  upcomingVotes: UpcomingVote[];
};

// Mock portfolio data
const portfolioData: PortfolioData = {
  totalValue: 3750.0,
  totalGain: 250.0,
  totalGainPercentage: 7.14,
  holdings: [
    {
      id: 1,
      name: "Tech Innovate Solutions",
      symbol: "TECH",
      quantity: 100,
      price: 12.45,
      value: 1245.0,
      costBasis: 1100.0,
      gain: 145.0,
      gainPercentage: 13.18,
      color: "#4f46e5",
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
      color: "#16a34a",
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
      color: "#ea580c",
    },
  ],
  dividends: [
    {
      id: 1,
      company: "Tech Innovate Solutions",
      symbol: "TECH",
      amount: 25.0,
      date: "2023-09-15T10:00:00Z",
      status: "paid",
    },
    {
      id: 2,
      company: "GreenFarm Produce",
      symbol: "GFARM",
      amount: 30.0,
      date: "2023-08-20T10:00:00Z",
      status: "paid",
    },
  ],
  votes: [
    {
      id: 1,
      company: "Tech Innovate Solutions",
      symbol: "TECH",
      title: "Expansion to East African Market",
      description:
        "Proposal to allocate funds for expansion into neighboring East African countries.",
      deadline: "2023-11-30T23:59:59Z",
      status: "open",
      votesFor: 65,
      votesAgainst: 12,
    },
    {
      id: 2,
      company: "GreenFarm Produce",
      symbol: "GFARM",
      title: "New Board Member Appointment",
      description:
        "Appointment of Jane Doe as a new board member representing minority shareholders.",
      deadline: "2023-10-25T23:59:59Z",
      status: "closed",
      result: "approved",
      votesFor: 80,
      votesAgainst: 5,
    },
    {
      id: 3,
      company: "Tech Innovate Solutions",
      symbol: "TECH",
      title: "Annual General Meeting",
      description:
        "Vote on annual financial statements and business strategy for the upcoming year.",
      deadline: "2023-12-15T23:59:59Z",
      status: "open",
      votesFor: 45,
      votesAgainst: 8,
    },
    {
      id: 4,
      company: "MicroFinance Partners",
      symbol: "MFIN",
      title: "Dividend Policy Amendment",
      description:
        "Proposal to increase quarterly dividend payments from 3% to 4% of profits.",
      deadline: "2023-10-10T23:59:59Z",
      status: "closed",
      result: "rejected",
      votesFor: 35,
      votesAgainst: 55,
    },
  ],
  upcomingVotes: [
    {
      id: 5,
      company: "GreenFarm Produce",
      symbol: "GFARM",
      title: "Sustainability Initiative Vote",
      description:
        "Vote on allocating 2% of annual profits to sustainability and environmental projects.",
      date: "2023-12-05T10:00:00Z",
    },
  ],
};

export default function PortfolioPage() {
  const [userType, setUserType] = useState<"investor" | "institution" | "company" | "regulator">("investor");
  const [sortField, setSortField] = useState<keyof Holding>("value");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [activeVoteTab, setActiveVoteTab] = useState<"active" | "closed" | "upcoming">("active");
  const [votes, setVotes] = useState<Vote[]>(portfolioData.votes);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const formatTimeRemaining = (deadlineString: string): string => {
    const deadline = new Date(deadlineString);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      return `${diffDays} days remaining`;
    } else if (diffDays === 1) {
      return "1 day remaining";
    } else {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours > 0) {
        return `${diffHours} hours remaining`;
      } else {
        return "Closing soon";
      }
    }
  };

  const activeVotes = votes.filter((vote) => vote.status === "open");
  const closedVotes = votes.filter((vote) => vote.status === "closed");

  const sortedHoldings = [...portfolioData.holdings].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });

  const pieChartData = portfolioData.holdings.map((holding) => ({
    name: holding.name,
    symbol: holding.symbol,
    value: holding.value,
    color: holding.color,
  }));

  const chartColorConfig: Record<string, { color: string }> = {};
  portfolioData.holdings.forEach((holding) => {
    chartColorConfig[holding.symbol] = { color: holding.color };
  });

  const handleSort = (field: keyof Holding) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const getSortIcon = (field: keyof Holding) => {
    if (sortField !== field) return <ChevronDown className="h-4 w-4 opacity-50" />;
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const handleVote = (voteId: number, voteType: "for" | "against") => {
    setVotes((prevVotes) =>
      prevVotes.map((vote) =>
        vote.id === voteId
          ? {
              ...vote,
              votesFor: voteType === "for" ? vote.votesFor + 1 : vote.votesFor,
              votesAgainst: voteType === "against" ? vote.votesAgainst + 1 : vote.votesAgainst,
            }
          : vote
      )
    );
  };

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground">Welcome back, Jude Tulel</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs defaultValue={userType} onValueChange={(value: string) => setUserType(value as "investor" | "institution" | "company" | "regulator")} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="investor">Investor</TabsTrigger>
              <TabsTrigger value="institution">Institution</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
              <TabsTrigger value="regulator">Regulator</TabsTrigger>
            </TabsList>
          </Tabs>
          <HederaWalletConnect />
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
              ${Math.abs(portfolioData.totalGain).toFixed(2)} (
              {Math.abs(portfolioData.totalGainPercentage).toFixed(2)}%)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Distribution by company</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full">
              <ChartContainer config={chartColorConfig}>
                <Recharts.ResponsiveContainer width="100%" height="100%">
                  <Recharts.PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <Recharts.Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="symbol"
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      innerRadius={40}
                      strokeWidth={2}
                      labelLine={false}
                      label={({ symbol, percent }) => `${symbol} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Recharts.Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Recharts.Pie>
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value, name) => {
                            const holding = portfolioData.holdings.find((h) => h.symbol === name);
                            return [
                              `$${(value as number).toFixed(2)} (${(
                                ((value as number) / portfolioData.totalValue) *
                                100
                              ).toFixed(1)}%)`,
                              holding?.name || name,
                            ];
                          }}
                        />
                      }
                    />
                  </Recharts.PieChart>
                </Recharts.ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Performance</CardTitle>
            <CardDescription>Historical returns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full">
              <ChartContainer config={{ value: { color: "#4f46e5" } }}>
                <Recharts.ResponsiveContainer width="100%" height="100%">
                  <Recharts.LineChart
                    data={[
                      { date: "Jan", value: 3200 },
                      { date: "Feb", value: 3350 },
                      { date: "Mar", value: 3100 },
                      { date: "Apr", value: 3400 },
                      { date: "May", value: 3500 },
                      { date: "Jun", value: 3650 },
                      { date: "Jul", value: 3500 },
                      { date: "Aug", value: 3600 },
                      { date: "Sep", value: 3750 },
                    ]}
                    margin={{ top: 10, right: 10, bottom: 20, left: 20 }}
                  >
                    <Recharts.CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Recharts.XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      padding={{ left: 10, right: 10 }}
                    />
                    <Recharts.YAxis
                      tickFormatter={(value) => `$${value}`}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Recharts.Line
                      type="monotone"
                      dataKey="value"
                      strokeWidth={2}
                      dot={{ r: 0 }}
                      activeDot={{ r: 4 }}
                    />
                    <Recharts.Tooltip
                      formatter={(value) => [`$${value}`, "Value"]}
                      labelFormatter={(label) => `${label}`}
                    />
                  </Recharts.LineChart>
                </Recharts.ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {activeVotes.length > 0 && (
        <Card className="mt-6 border-primary/20 bg-primary/5">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Vote className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">You have {activeVotes.length} active voting sessions</h3>
                  <p className="text-sm text-muted-foreground">
                    Your vote matters! Participate in company governance decisions
                  </p>
                </div>
              </div>
              <div>
                <Button variant="outline" onClick={() => document.getElementById("governance-tab")?.click()}>
                  <Vote className="mr-2 h-4 w-4" />
                  View Voting Sessions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-6">
        <Tabs defaultValue="holdings">
          <TabsList className="mb-6">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="dividends">Dividends</TabsTrigger>
            <TabsTrigger id="governance-tab" value="governance">
              Governance
            </TabsTrigger>
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
                      <Button
                        variant="ghost"
                        className="p-0 hover:bg-transparent"
                        onClick={() => handleSort("name")}
                      >
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
                      <Button
                        variant="ghost"
                        className="p-0 hover:bg-transparent"
                        onClick={() => handleSort("price")}
                      >
                        Price {getSortIcon("price")}
                      </Button>
                    </div>
                    <div className="col-span-2 text-right">
                      <Button
                        variant="ghost"
                        className="p-0 hover:bg-transparent"
                        onClick={() => handleSort("value")}
                      >
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
                          <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: holding.color }}
                          ></div>
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
                          <div className="text-xs text-muted-foreground">
                            Cost: ${holding.costBasis.toFixed(2)}
                          </div>
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
                    <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
                      <div className="col-span-4">Company</div>
                      <div className="col-span-3 text-right">Amount</div>
                      <div className="col-span-3 text-right">Date</div>
                      <div className="col-span-2 text-right">Status</div>
                    </div>
                    <Separator />
                    {portfolioData.dividends.map((dividend) => (
                      <div key={dividend.id}>
                        <div className="grid grid-cols-12 gap-4 p-4 items-center">
                          <div className="col-span-4">
                            <div className="font-medium">{dividend.company}</div>
                            <div className="text-sm text-muted-foreground">{dividend.symbol}</div>
                          </div>
                          <div className="col-span-3 text-right font-medium">${dividend.amount.toFixed(2)}</div>
                          <div className="col-span-3 text-right text-sm">{formatDate(dividend.date)}</div>
                          <div className="col-span-2 text-right">
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
            <div className="space-y-6">
              <Tabs value={activeVoteTab} onValueChange={(value) => setActiveVoteTab(value as "active" | "closed" | "upcoming")}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold tracking-tight">Governance Voting</h2>
                  <TabsList>
                    <TabsTrigger value="active" className="relative">
                      Active
                      {activeVotes.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {activeVotes.length}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="closed">Past</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="active">
                  {activeVotes.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2">
                      {activeVotes.map((vote) => (
                        <Card key={vote.id} className="border-primary/20">
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <Badge className="bg-green-600">Open for Voting</Badge>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="mr-1 h-4 w-4" />
                                {formatTimeRemaining(vote.deadline)}
                              </div>
                            </div>
                            <CardTitle className="mt-2">{vote.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Building className="mr-1 h-4 w-4" />
                              {vote.company} ({vote.symbol})
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <p className="text-sm mb-3">{vote.description}</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Current Results</span>
                                <span>
                                  {vote.votesFor + vote.votesAgainst} votes • Ends {formatDate(vote.deadline)}
                                </span>
                              </div>
                              <Progress
                                value={(vote.votesFor / (vote.votesFor + vote.votesAgainst)) * 100}
                                className="h-2"
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>
                                  For: {vote.votesFor} (
                                  {Math.round((vote.votesFor / (vote.votesFor + vote.votesAgainst)) * 100)}%)
                                </span>
                                <span>
                                  Against: {vote.votesAgainst} (
                                  {Math.round((vote.votesAgainst / (vote.votesFor + vote.votesAgainst)) * 100)}
                                  %)
                                </span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="grid grid-cols-2 gap-4">
                            <Button variant="outline" onClick={() => handleVote(vote.id, "against")}>
                              <X className="mr-2 h-4 w-4" />
                              Vote Against
                            </Button>
                            <Button onClick={() => handleVote(vote.id, "for")}>
                              <Check className="mr-2 h-4 w-4" />
                              Vote For
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                        <Vote className="mb-4 h-12 w-12 text-muted-foreground" />
                        <h3 className="mb-2 text-lg font-medium">No Active Votes</h3>
                        <p className="text-sm text-muted-foreground">
                          There are currently no active voting sessions requiring your participation
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="closed">
                  {closedVotes.length > 0 ? (
                    <div className="space-y-4">
                      {closedVotes.map((vote) => (
                        <Card key={vote.id}>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{vote.title}</CardTitle>
                              <Badge
                                variant={vote.result === "approved" ? "default" : "destructive"}
                                className="capitalize"
                              >
                                {vote.result === "approved" ? "Approved" : "Rejected"}
                              </Badge>
                            </div>
                            <CardDescription>
                              {vote.company} ({vote.symbol})
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="pb-4">
                            <p className="text-sm mb-3">{vote.description}</p>
                            <div className="flex justify-between text-sm mb-3">
                              <span className="text-muted-foreground">Ended on</span>
                              <span>{formatDate(vote.deadline)}</span>
                            </div>
                            <Progress
                              value={(vote.votesFor / (vote.votesFor + vote.votesAgainst)) * 100}
                              className="h-2 mb-2"
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>
                                For: {vote.votesFor} (
                                {Math.round((vote.votesFor / (vote.votesFor + vote.votesAgainst)) * 100)}%)
                              </span>
                              <span>
                                Against: {vote.votesAgainst} (
                                {Math.round((vote.votesAgainst / (vote.votesFor + vote.votesAgainst)) * 100)}
                                %)
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                        <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                        <h3 className="mb-2 text-lg font-medium">No Past Votes</h3>
                        <p className="text-sm text-muted-foreground">
                          Past voting results will appear here once votes have concluded
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="upcoming">
                  {portfolioData.upcomingVotes.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2">
                      {portfolioData.upcomingVotes.map((vote) => (
                        <Card key={vote.id}>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline">Upcoming</Badge>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-4 w-4" />
                                {formatDate(vote.date)}
                              </div>
                            </div>
                            <CardTitle className="mt-2">{vote.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              <Building className="mr-1 h-4 w-4" />
                              {vote.company} ({vote.symbol})
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">{vote.description}</p>
                          </CardContent>
                          <CardFooter>
                            <Button variant="outline" className="w-full">
                              <Bell className="mr-2 h-4 w-4" />
                              Remind Me
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-8 text-center">
                        <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
                        <h3 className="mb-2 text-lg font-medium">No Upcoming Votes</h3>
                        <p className="text-sm text-muted-foreground">
                          Upcoming voting sessions will appear here when scheduled
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
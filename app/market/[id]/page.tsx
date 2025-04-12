"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Building, Download, FileText, Share2, Users } from "lucide-react"
import * as RechartsPrimitive from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock company data to fetch from hedera
const company = {
  id: 1,
  name: "TechInnovate Solutions",
  symbol: "TECH",
  sector: "Technology",
  price: 12.45,
  change: 2.3,
  marketCap: "1.2M",
  volume: "45K",
  totalSupply: "100,000",
  circulatingSupply: "85,000",
  description:
    "TechInnovate Solutions is a leading provider of innovative software solutions for small businesses across East Africa. The company specializes in cloud-based enterprise resource planning (ERP) systems, customer relationship management (CRM) tools, and digital marketing platforms tailored for the unique needs of emerging markets.",
  highlights: [
    "Founded in 2018, profitable since 2020",
    "35% year-over-year revenue growth",
    "Serving over 500 SMEs across 4 countries",
    "Strategic partnerships with major telecom providers",
  ],
  team: [
    { name: "Jane Mwangi", position: "CEO & Founder" },
    { name: "David Ochieng", position: "CTO" },
    { name: "Sarah Kimani", position: "CFO" },
  ],
  documents: [
    { name: "Financial Statements 2023", type: "PDF" },
    { name: "Business Plan", type: "PDF" },
    { name: "Term Sheet", type: "PDF" },
  ],
  priceHistory: [
    { date: "Jan", price: 8.2 },
    { date: "Feb", price: 8.75 },
    { date: "Mar", price: 9.3 },
    { date: "Apr", price: 10.15 },
    { date: "May", price: 9.8 },
    { date: "Jun", price: 10.5 },
    { date: "Jul", price: 11.25 },
    { date: "Aug", price: 12.0 },
    { date: "Sep", price: 11.75 },
    { date: "Oct", price: 12.45 },
  ],
}

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState("100")
  const [orderPrice, setOrderPrice] = useState(company.price.toString())
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy")

  const totalCost = Number.parseFloat(quantity) * Number.parseFloat(orderPrice)

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center">
          <Building className="mr-3 h-8 w-8" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
              <Badge>{company.symbol}</Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>{company.sector}</span>
              <span>•</span>
              <span>Market Cap: ${company.marketCap}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Price Chart</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={company.change >= 0 ? "default" : "destructive"} className="text-xs">
                    {company.change >= 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {company.change >= 0 ? "+" : ""}
                    {company.change.toFixed(2)}%
                  </Badge>
                  <div className="text-2xl font-bold">${company.price.toFixed(2)}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full rounded-md border p-4">
                <ChartContainer
                  config={{
                    price: { color: "#4f46e5" },
                  }}
                >
                  <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">

                    <RechartsPrimitive.LineChart
                      data={company.priceHistory}
                      margin={{ top: 10, right: 10, bottom: 20, left: 20 }}
                    >
                      <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <RechartsPrimitive.XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        padding={{ left: 10, right: 10 }}
                      />
                      <RechartsPrimitive.YAxis
                        tickFormatter={(value) => `$${value}`}
                        tickLine={false}
                        axisLine={false}
                        domain={['auto', 'auto']}
                        width={60}
                      />
                      <RechartsPrimitive.Line
                        type="monotone"
                        dataKey="price"
                        strokeWidth={2}
                        dot={{ r: 1 }}
                        activeDot={{ r: 4 }}
                      />
                      <RechartsPrimitive.Area
                        type="monotone"
                        dataKey="price"
                        fill="url(#colorPrice)"
                        strokeWidth={0}
                        fillOpacity={0.1}
                      />
                      <RechartsPrimitive.Tooltip
                        formatter={(value) => [`$${value}`, 'Price']}
                        labelFormatter={(label) => `${label}`}
                        content={<ChartTooltipContent />}
                      />
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-price)" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="var(--color-price)" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                    </RechartsPrimitive.LineChart>
                  </RechartsPrimitive.ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{company.description}</p>

              <div>
                <h3 className="font-medium mb-2">Key Highlights</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {company.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="team">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Team
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {company.team.map((member, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="font-medium">{member.name}</span>
                          <span className="text-muted-foreground">{member.position}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="documents">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      Documents
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {company.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span>{doc.name}</span>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Trade {company.symbol}</CardTitle>
              <CardDescription>Buy or sell tokenized shares</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="market" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="market">Market</TabsTrigger>
                  <TabsTrigger value="limit">Limit</TabsTrigger>
                </TabsList>
                <TabsContent value="market" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={orderType === "buy" ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setOrderType("buy")}
                    >
                      Buy
                    </Button>
                    <Button
                      variant={orderType === "sell" ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setOrderType("sell")}
                    >
                      Sell
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                  </div>

                  <div className="rounded-md bg-muted p-3">
                    <div className="flex justify-between text-sm">
                      <span>Market Price</span>
                      <span className="font-medium">${company.price.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-sm">
                      <span>Estimated Total</span>
                      <span className="font-medium">${(Number.parseFloat(quantity) * company.price).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full">
                    {orderType === "buy" ? "Buy" : "Sell"} {company.symbol}
                  </Button>
                </TabsContent>
                <TabsContent value="limit" className="space-y-4 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={orderType === "buy" ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setOrderType("buy")}
                    >
                      Buy
                    </Button>
                    <Button
                      variant={orderType === "sell" ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setOrderType("sell")}
                    >
                      Sell
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="limit-price">Limit Price</Label>
                    <Input
                      id="limit-price"
                      type="number"
                      value={orderPrice}
                      onChange={(e) => setOrderPrice(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="limit-quantity">Quantity</Label>
                    <Input
                      id="limit-quantity"
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>

                  <div className="rounded-md bg-muted p-3">
                    <div className="flex justify-between text-sm">
                      <span>Limit Price</span>
                      <span className="font-medium">${Number.parseFloat(orderPrice).toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-sm">
                      <span>Quantity</span>
                      <span className="font-medium">{quantity}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-sm">
                      <span>Estimated Total</span>
                      <span className="font-medium">${totalCost.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full">Place {orderType === "buy" ? "Buy" : "Sell"} Limit Order</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Token Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Supply</span>
                  <span>{company.totalSupply}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Circulating Supply</span>
                  <span>{company.circulatingSupply}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token Standard</span>
                  <span>ERC 20</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token Type</span>
                  <span>Security Token</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Smart Contract</span>
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <a href="https://hashscan.io/testnet/contract/0xd120E0C278d1b2aeE35495F94187D61F5229eD33">View on Explorer</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


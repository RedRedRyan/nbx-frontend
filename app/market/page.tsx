"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, Building, Filter, Search, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for SME listings
const smeListings = [
  {
    id: 1,
    name: "TechInnovate Solutions",
    symbol: "TECH",
    sector: "Technology",
    price: 12.45,
    change: 2.3,
    marketCap: "1.2M",
    volume: "45K",
    description: "Leading provider of innovative software solutions for small businesses.",
    trending: true,
  },
  {
    id: 2,
    name: "GreenFarm Produce",
    symbol: "GFARM",
    sector: "Agriculture",
    price: 8.75,
    change: -0.5,
    marketCap: "875K",
    volume: "32K",
    description: "Sustainable farming and organic produce distribution across East Africa.",
  },
  {
    id: 3,
    name: "MicroFinance Partners",
    symbol: "MFIN",
    sector: "Finance",
    price: 15.2,
    change: 1.2,
    marketCap: "3.2M",
    volume: "78K",
    description: "Providing microloans and financial services to underserved communities.",
    trending: true,
  },
  {
    id: 4,
    name: "CleanEnergy Solutions",
    symbol: "CLEAN",
    sector: "Energy",
    price: 9.3,
    change: 0.8,
    marketCap: "1.5M",
    volume: "56K",
    description: "Renewable energy solutions for residential and commercial applications.",
  },
  {
    id: 5,
    name: "HealthTech Innovations",
    symbol: "HLTH",
    sector: "Healthcare",
    price: 18.75,
    change: -1.2,
    marketCap: "2.8M",
    volume: "62K",
    description: "Developing affordable healthcare technology for rural communities.",
  },
  {
    id: 6,
    name: "EduTech Academy",
    symbol: "EDUT",
    sector: "Education",
    price: 7.5,
    change: 3.2,
    marketCap: "950K",
    volume: "41K",
    description: "Digital education platforms and learning management systems.",
    trending: true,
  },
]

export default function MarketPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedSectors, setSelectedSectors] = useState<string[]>([])

  const sectors = Array.from(new Set(smeListings.map((listing) => listing.sector)))

  const filteredListings = smeListings.filter((listing) => {
    const matchesSearch =
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(listing.sector)
    return matchesSearch && matchesSector
  })

  const toggleSector = (sector: string) => {
    setSelectedSectors((prev) => (prev.includes(sector) ? prev.filter((s) => s !== sector) : [...prev, sector]))
  }

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market</h1>
          <p className="text-muted-foreground">Browse and invest in tokenized SME shares</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search companies..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setFilterOpen(!filterOpen)}
            className={filterOpen ? "bg-accent" : ""}
          >
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
        <CollapsibleContent className="mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-medium">Sectors</h3>
                  <div className="flex flex-wrap gap-2">
                    {sectors.map((sector) => (
                      <Badge
                        key={sector}
                        variant={selectedSectors.includes(sector) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleSector(sector)}
                      >
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => setSelectedSectors([])}>
                    Clear Filters
                  </Button>
                  <Button size="sm" onClick={() => setFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Companies</TabsTrigger>
          <TabsTrigger value="trending">
            Trending <TrendingUp className="ml-1 h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="new">New Listings</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-4 md:col-span-3 flex items-center">
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                  Company <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </div>
              <div className="col-span-2 hidden md:block">Sector</div>
              <div className="col-span-2 text-right">
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                  Price <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </div>
              <div className="col-span-2 text-right">
                <Button variant="ghost" className="p-0 hover:bg-transparent">
                  Change <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </div>
              <div className="col-span-2 hidden md:block text-right">Market Cap</div>
              <div className="col-span-2 hidden md:block text-right">Volume</div>
              <div className="col-span-2 md:col-span-1 text-right">Action</div>
            </div>
            <Separator />
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <div key={listing.id}>
                  <div className="grid grid-cols-12 gap-4 p-4 items-center">
                    <div className="col-span-4 md:col-span-3 flex items-center">
                      <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{listing.name}</div>
                        <div className="text-sm text-muted-foreground">{listing.symbol}</div>
                      </div>
                      {listing.trending && (
                        <Badge variant="secondary" className="ml-2">
                          <TrendingUp className="mr-1 h-3 w-3" /> Trending
                        </Badge>
                      )}
                    </div>
                    <div className="col-span-2 hidden md:block text-sm">{listing.sector}</div>
                    <div className="col-span-2 text-right font-medium">${listing.price.toFixed(2)}</div>
                    <div
                      className={`col-span-2 text-right font-medium ${listing.change >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {listing.change >= 0 ? "+" : ""}
                      {listing.change.toFixed(2)}%
                    </div>
                    <div className="col-span-2 hidden md:block text-right text-sm">${listing.marketCap}</div>
                    <div className="col-span-2 hidden md:block text-right text-sm">${listing.volume}</div>
                    <div className="col-span-2 md:col-span-1 text-right">
                      <Link href={`/market/${listing.id}`}>
                        <Button size="sm">Trade</Button>
                      </Link>
                    </div>
                  </div>
                  <Separator />
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">No companies found matching your criteria</div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="trending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredListings
              .filter((listing) => listing.trending)
              .map((listing) => (
                <Card key={listing.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Building className="mr-2 h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">{listing.name}</CardTitle>
                      </div>
                      <Badge>{listing.symbol}</Badge>
                    </div>
                    <CardDescription>{listing.sector}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Price</div>
                        <div className="text-xl font-bold">${listing.price.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Change</div>
                        <div className={`text-xl font-bold ${listing.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {listing.change >= 0 ? "+" : ""}
                          {listing.change.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm">{listing.description}</div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/market/${listing.id}`} className="w-full">
                      <Button className="w-full">Trade</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="new">
          <div className="rounded-md border p-6 text-center">
            <Building className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">New Listings Coming Soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">Stay tuned for new company listings on our platform</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


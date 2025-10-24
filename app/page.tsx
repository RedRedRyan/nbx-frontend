import Link from "next/link"
import { ArrowRight, BarChart3, Building, LineChart, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Invest in Kenya&apos;s Future
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  The first tokenized stock exchange for Small and Medium Enterprises. Invest, trade, and grow be part of
                  Kenya&apos;s most promising businesses.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/register">
                  <Button size="lg" className="w-full">
                    Get Started
                  </Button>
                </Link>
                <Link href="/market">
                  <Button size="lg" variant="outline" className="w-full">
                    Explore Market
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] rounded-full bg-muted p-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <LineChart className="h-40 w-40 text-[green]" />
                </div>
                <div className="absolute top-10 left-0 flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-lg">
                  <Building className="h-10 w-10 text-[gold]" />
                </div>
                <div className="absolute bottom-10 left-0 flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-lg">
                  <Users className="h-10 w-10 text-[gold]" />
                </div>
                <div className="absolute top-10 right-0 flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-lg">
                  <BarChart3 className="h-10 w-10 text-[gold]" />
                </div>
                <div className="absolute bottom-10 right-0 flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-lg">
                  <Shield className="h-10 w-10 text-[gold]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Designed for Every Stakeholder
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform connects investors, companies, institutions, and regulators in a secure and transparent
                ecosystem.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <Users className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Individual Investors</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Simple KYC/AML process</li>
                  <li>Fund wallet with HBAR/stablecoin</li>
                  <li>Browse & invest in SME shares</li>
                  <li>Trade in secondary market</li>
                  <li>Receive dividends & vote</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/auth/register?type=investor">
                  <Button variant="outline" className="w-full">
                    Start Investing <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Building className="h-12 w-12 text-primary mb-2" />
                <CardTitle>SACCOs & Institutions</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Bulk investments</li>
                  <li>Portfolio management</li>
                  <li>Trading & liquidity provisioning</li>
                  <li>Stake tokens for governance</li>
                  <li>Institutional-grade compliance</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/auth/register?type=institution">
                  <Button variant="outline" className="w-full">
                    Institutional Access <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <LineChart className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Companies (SMEs)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Register & verify company</li>
                  <li>Issue security tokens (IPO/STO)</li>
                  <li>Manage shareholders</li>
                  <li>Distribute dividends</li>
                  <li>Conduct governance voting</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/auth/register?type=company">
                  <Button variant="outline" className="w-full">
                    List Your Company <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <Shield className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Regulators</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Access real-time data</li>
                  <li>Verify financial disclosures</li>
                  <li>Ensure compliance</li>
                  <li>Flag suspicious transactions</li>
                  <li>Regulatory reporting</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/auth/register?type=regulator">
                  <Button variant="outline" className="w-full">
                    Regulator Access <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}


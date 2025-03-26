"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function NewListingPage() {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create New Listing</h1>
        <p className="text-muted-foreground">List your company on the SME Stock Exchange</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "border bg-background"}`}
            >
              1
            </div>
            <div className={`mx-2 h-1 w-16 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "border bg-background"}`}
            >
              2
            </div>
            <div className={`mx-2 h-1 w-16 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "border bg-background"}`}
            >
              3
            </div>
            <div className={`mx-2 h-1 w-16 ${step >= 4 ? "bg-primary" : "bg-muted"}`} />
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 4 ? "bg-primary text-primary-foreground" : "border bg-background"}`}
            >
              4
            </div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-4 text-center text-sm">
          <div>Company Details</div>
          <div>Financial Information</div>
          <div>Tokenization</div>
          <div>Review & Submit</div>
        </div>
      </div>

      <Card className="mb-6">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>Provide basic information about your company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="e.g. TechInnovate Solutions" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registration-number">Registration Number</Label>
                <Input id="registration-number" placeholder="e.g. REG123456" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="incorporation-date">Date of Incorporation</Label>
                <Input id="incorporation-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-sector">Business Sector</Label>
                <select
                  id="business-sector"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a sector</option>
                  <option value="technology">Technology</option>
                  <option value="agriculture">Agriculture</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="energy">Energy</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="services">Services</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-description">Company Description</Label>
                <Textarea
                  id="company-description"
                  placeholder="Describe your company, products/services, and market position"
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-website">Company Website</Label>
                <Input id="company-website" type="url" placeholder="https://www.example.com" />
              </div>
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>Provide financial details about your company</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="annual-revenue">Annual Revenue (USD)</Label>
                <Input id="annual-revenue" type="number" placeholder="e.g. 500000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profit-margin">Profit Margin (%)</Label>
                <Input id="profit-margin" type="number" placeholder="e.g. 15" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="years-profitable">Years Profitable</Label>
                <Input id="years-profitable" type="number" placeholder="e.g. 3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-valuation">Current Valuation (USD)</Label>
                <Input id="current-valuation" type="number" placeholder="e.g. 2000000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="funding-sought">Funding Sought (USD)</Label>
                <Input id="funding-sought" type="number" placeholder="e.g. 500000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="use-of-funds">Use of Funds</Label>
                <Textarea id="use-of-funds" placeholder="Describe how you plan to use the funds raised" rows={3} />
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <Label>Financial Documents</Label>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="financial-statements">Financial Statements</Label>
                    <Input id="financial-statements" type="file" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business-plan">Business Plan</Label>
                    <Input id="business-plan" type="file" />
                  </div>
                </div>
              </div>
            </CardContent>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>Tokenization Details</CardTitle>
              <CardDescription>Configure your security token offering</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token-symbol">Token Symbol (3-5 characters)</Label>
                <Input id="token-symbol" placeholder="e.g. TECH" maxLength={5} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token-supply">Total Token Supply</Label>
                <Input id="token-supply" type="number" placeholder="e.g. 100000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tokens-for-sale">Tokens Available for Sale</Label>
                <Input id="tokens-for-sale" type="number" placeholder="e.g. 30000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="token-price">Initial Token Price (USD)</Label>
                <Input id="token-price" type="number" step="0.01" placeholder="e.g. 1.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-investment">Minimum Investment (USD)</Label>
                <Input id="min-investment" type="number" placeholder="e.g. 100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lockup-period">Lockup Period (months)</Label>
                <Input id="lockup-period" type="number" placeholder="e.g. 6" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dividend-policy">Dividend Policy</Label>
                <Textarea id="dividend-policy" placeholder="Describe your dividend policy and frequency" rows={3} />
              </div>
            </CardContent>
          </>
        )}

        {step === 4 && (
          <>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>Review your listing details before submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-md bg-muted p-4">
                <h3 className="mb-2 font-medium">Company Details</h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company Name:</span>
                    <span className="font-medium">TechInnovate Solutions</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Registration Number:</span>
                    <span className="font-medium">REG123456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Business Sector:</span>
                    <span className="font-medium">Technology</span>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <h3 className="mb-2 font-medium">Financial Information</h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Revenue:</span>
                    <span className="font-medium">$500,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Valuation:</span>
                    <span className="font-medium">$2,000,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Funding Sought:</span>
                    <span className="font-medium">$500,000</span>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <h3 className="mb-2 font-medium">Tokenization Details</h3>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Token Symbol:</span>
                    <span className="font-medium">TECH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Supply:</span>
                    <span className="font-medium">100,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Initial Price:</span>
                    <span className="font-medium">$1.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tokens for Sale:</span>
                    <span className="font-medium">30,000</span>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 text-yellow-800 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200">
                <h3 className="mb-2 font-medium">Important Notice</h3>
                <p className="text-sm">
                  By submitting this listing, you confirm that all information provided is accurate and complete. Your
                  listing will be reviewed by our team before being approved for the platform.
                </p>
              </div>
            </CardContent>
          </>
        )}

        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <Link href="/companies">
              <Button variant="outline">Cancel</Button>
            </Link>
          )}

          {step < 4 ? (
            <Button onClick={handleNext}>
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Link href="/companies">
              <Button>Submit Listing</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Building, ChevronRight, Shield, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const userType = searchParams.get("type") || "investor"
  const [step, setStep] = useState(1)
  const [selectedType, setSelectedType] = useState(userType)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const renderUserTypeIcon = (type: string) => {
    switch (type) {
      case "investor":
        return <User className="h-5 w-5" />
      case "institution":
        return <Users className="h-5 w-5" />
      case "company":
        return <Building className="h-5 w-5" />
      case "regulator":
        return <Shield className="h-5 w-5" />
      default:
        return <User className="h-5 w-5" />
    }
  }

  return (
    <div className="container flex items-center justify-center py-10">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Join the SME Stock Exchange platform to start investing or listing your company.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Select account type</h3>
                <p className="text-sm text-muted-foreground">Choose the type of account you want to create.</p>
              </div>
              <RadioGroup
                defaultValue={selectedType}
                onValueChange={setSelectedType}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <div>
                  <RadioGroupItem value="investor" id="investor" className="peer sr-only" />
                  <Label
                    htmlFor="investor"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <User className="mb-3 h-6 w-6" />
                    <p className="text-base font-medium">Individual Investor</p>
                    <p className="text-sm font-normal text-muted-foreground">
                      Invest in SME shares and trade in the secondary market
                    </p>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="institution" id="institution" className="peer sr-only" />
                  <Label
                    htmlFor="institution"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Users className="mb-3 h-6 w-6" />
                    <p className="text-base font-medium">SACCO / Institution</p>
                    <p className="text-sm font-normal text-muted-foreground">
                      Make bulk investments and manage institutional portfolios
                    </p>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="company" id="company" className="peer sr-only" />
                  <Label
                    htmlFor="company"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Building className="mb-3 h-6 w-6" />
                    <p className="text-base font-medium">Company (SME)</p>
                    <p className="text-sm font-normal text-muted-foreground">
                      List your company and issue security tokens
                    </p>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="regulator" id="regulator" className="peer sr-only" />
                  <Label
                    htmlFor="regulator"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <Shield className="mb-3 h-6 w-6" />
                    <p className="text-base font-medium">Regulator</p>
                    <p className="text-sm font-normal text-muted-foreground">
                      Access transaction data and ensure compliance
                    </p>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {renderUserTypeIcon(selectedType)}
                </div>
                <h3 className="text-lg font-medium capitalize">{selectedType} Registration</h3>
              </div>

              <div className="space-y-4">
                {(selectedType === "investor" || selectedType === "institution") && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input id="phone" type="tel" placeholder="+254 700 000000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </>
                )}

                {selectedType === "company" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company name</Label>
                      <Input id="company-name" placeholder="Acme Inc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registration-number">Registration number</Label>
                      <Input id="registration-number" placeholder="REG123456" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-email">Company email</Label>
                      <Input id="company-email" type="email" placeholder="info@acme.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Company phone</Label>
                      <Input id="company-phone" type="tel" placeholder="+254 700 000000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </>
                )}

                {selectedType === "regulator" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="regulator-name">Regulatory body</Label>
                      <Input id="regulator-name" placeholder="Capital Markets Authority" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="regulator-id">Regulator ID</Label>
                      <Input id="regulator-id" placeholder="REG-AUTH-123" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="official-email">Official email</Label>
                      <Input id="official-email" type="email" placeholder="official@regulator.gov" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-4 text-lg font-medium">KYC/AML Verification</h3>
                <Tabs defaultValue="id" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="id">ID Verification</TabsTrigger>
                    <TabsTrigger value="address">Address Proof</TabsTrigger>
                    <TabsTrigger value="additional">Additional Info</TabsTrigger>
                  </TabsList>
                  <TabsContent value="id" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="id-type">ID Type</Label>
                      <select
                        id="id-type"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="national-id">National ID</option>
                        <option value="passport">Passport</option>
                        <option value="drivers-license">Driver's License</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="id-number">ID Number</Label>
                      <Input id="id-number" placeholder="Enter your ID number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="id-front">Upload ID Front</Label>
                      <Input id="id-front" type="file" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="id-back">Upload ID Back</Label>
                      <Input id="id-back" type="file" />
                    </div>
                  </TabsContent>
                  <TabsContent value="address" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="address-line1">Address Line 1</Label>
                      <Input id="address-line1" placeholder="Street address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address-line2">Address Line 2 (Optional)</Label>
                      <Input id="address-line2" placeholder="Apartment, suite, etc." />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="City" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postal-code">Postal Code</Label>
                        <Input id="postal-code" placeholder="Postal code" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <select
                        id="country"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="kenya">Kenya</option>
                        <option value="uganda">Uganda</option>
                        <option value="tanzania">Tanzania</option>
                        <option value="rwanda">Rwanda</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="proof-address">Upload Proof of Address</Label>
                      <Input id="proof-address" type="file" />
                    </div>
                  </TabsContent>
                  <TabsContent value="additional" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      <Input id="occupation" placeholder="Your occupation" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="source-of-funds">Source of Funds</Label>
                      <select
                        id="source-of-funds"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="salary">Salary/Employment</option>
                        <option value="business">Business Income</option>
                        <option value="investment">Investment Returns</option>
                        <option value="inheritance">Inheritance</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="investment-purpose">Investment Purpose</Label>
                      <select
                        id="investment-purpose"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="growth">Long-term Growth</option>
                        <option value="income">Regular Income</option>
                        <option value="trading">Active Trading</option>
                        <option value="diversification">Portfolio Diversification</option>
                      </select>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <Link href="/auth/login">
              <Button variant="outline">Already have an account?</Button>
            </Link>
          )}
          {step < 3 ? (
            <Button onClick={handleNext}>
              Continue <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Link href="/dashboard">
              <Button>Complete Registration</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}


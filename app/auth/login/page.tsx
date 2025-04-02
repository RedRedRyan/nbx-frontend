import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center py-10" id="login-container">
      <Card className="w-full max-w-md" id="login-card">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" id="email-label">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" id="password-label">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                    id="forgot-password-link"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" />
              </div>
              <Button type="submit" className="w-full" id="login-button">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          <div className="text-sm text-muted-foreground" id="signup-text">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-primary underline-offset-4 hover:underline" id="signup-link">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

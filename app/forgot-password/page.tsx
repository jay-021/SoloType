"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2, Mail } from "lucide-react"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase/config"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setIsLoading(true)

    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
    } catch (error: any) {
      console.error("Password reset error:", error)
      setError(error.message || "Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          className="flex items-center text-sm text-gray-400 hover:text-white"
          onClick={() => router.push("/login")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Login
        </Button>
      </div>

      <Card className="w-full max-w-md backdrop-blur-lg bg-solo-black/90 border-solo-purple/30">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-solo-purple-light">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success ? (
            <Alert className="bg-green-900/20 border-green-900 text-green-300">
              <AlertDescription>
                Password reset email sent! Check your inbox for further instructions.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-solo-darkgray border-solo-purple/30 focus:border-solo-purple"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-solo-purple hover:bg-solo-purple-dark"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending email...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Reset Link
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center w-full text-gray-400">
            Remember your password?{" "}
            <Link href="/login" className="text-solo-purple hover:text-solo-purple-light">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}


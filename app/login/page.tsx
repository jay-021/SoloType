"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
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

export default function LoginPage() {
  const router = useRouter()
  const { signIn, signInWithGoogle } = useAuth()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await signIn(email, password)
      router.push("/")
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Failed to sign in. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setIsLoading(true)

    try {
      await signInWithGoogle()
      router.push("/")
    } catch (error: any) {
      console.error("Google sign in error:", error)
      setError(error.message || "Failed to sign in with Google. Please try again.")
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
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>

      <Card className="w-full max-w-md backdrop-blur-lg bg-solo-black/90 border-solo-purple/30">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-solo-purple-light">
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
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
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-solo-purple hover:text-solo-purple-light"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-solo-black px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-gray-700 hover:bg-gray-800"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="text-sm text-center text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-solo-purple hover:text-solo-purple-light">
              Sign up
            </Link>
          </div>
          <div className="text-xs text-center text-gray-500">
            By signing in, you agree to our{" "}
            <Link href="/terms-of-service" className="text-solo-purple hover:text-solo-purple-light">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="text-solo-purple hover:text-solo-purple-light">
              Privacy Policy
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}


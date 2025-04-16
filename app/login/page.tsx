"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, LogIn, ArrowLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

// Form validation schema
const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .refine(
      (email) => {
        // Check for common email domains or at least proper TLD format
        return /\.[a-z]{2,}$/i.test(email) && 
               email.includes('@') && 
               email.split('@')[1].includes('.');
      },
      {
        message: "Please enter a complete email with a valid domain (e.g., example@domain.com)"
      }
    ),
  password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { login, signInWithGoogle, error: authError, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    clearError()
    setIsLoading(true)
    
    try {
      await login(data.email, data.password)
      router.push("/")
    } catch (error) {
      // Error is handled in the auth context
      console.error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    clearError()
    setIsGoogleLoading(true)
    
    try {
      await signInWithGoogle()
      router.push("/")
    } catch (error) {
      console.error("Google sign-in error details:", error)
      // Error is handled in the auth context
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="system-background"></div>

      <div className="container max-w-md mx-auto px-4 py-8 flex-1 flex flex-col justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button asChild variant="ghost" className="mb-6 text-cyan-300 hover:text-cyan-100 hover:bg-transparent">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-center mb-2 system-text">HUNTER LOGIN</h1>
          <p className="text-center text-gray-400 mb-8">Access your account to continue your journey</p>
        </motion.div>

        {authError && (
          <Alert variant="destructive" className="mb-6 bg-red-950/50 border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{authError}</AlertDescription>
          </Alert>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="system-container"
        >
          <div className="system-border-top"></div>

          <div className="system-content p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-cyan-300">
                  Email
                </label>
                <div className="system-input-container">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="system-input"
                    {...register("email")}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-cyan-300">
                  Password
                </label>
                <div className="system-input-container relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="system-input pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" className="text-cyan-300 hover:text-cyan-100">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full system-button" disabled={isLoading}>
                <LogIn className="mr-2 h-4 w-4" />
                {isLoading ? "Logging in..." : "Enter the System"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#0a0f1a] text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                >
                  <div className="mr-2 h-4 w-4 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </div>
                  {isGoogleLoading ? "Signing in..." : "Sign in with Google"}
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Not a Hunter yet?{" "}
                <Link href="/signup" className="text-cyan-300 hover:text-cyan-100">
                  Register here
                </Link>
              </p>
            </div>
          </div>

          <div className="system-border-bottom"></div>
        </motion.div>
      </div>
    </div>
  )
}


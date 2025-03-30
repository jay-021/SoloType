"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, UserPlus, ArrowLeft, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/context/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Form validation schema
const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupFormValues = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const { signup, confirmSignup } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [verificationStep, setVerificationStep] = useState(false)
  const [email, setEmail] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      await signup(data.email, data.username, data.password)
      setEmail(data.email)
      setVerificationStep(true)
    } catch (error: any) {
      console.error("Signup error:", error)
      setError(error.message || "An error occurred during signup. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const code = formData.get("code") as string

    try {
      await confirmSignup(email, code)
      router.push("/guide")
    } catch (error: any) {
      console.error("Verification error:", error)
      setError(error.message || "Invalid verification code. Please try again.")
    } finally {
      setIsLoading(false)
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
          <h1 className="text-3xl font-bold text-center mb-2 system-text">
            {verificationStep ? "VERIFY ACCOUNT" : "HUNTER REGISTRATION"}
          </h1>
          <p className="text-center text-gray-400 mb-8">
            {verificationStep
              ? "Enter the verification code sent to your email"
              : "Create your account to begin your typing journey"}
          </p>
        </motion.div>

        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-950/50 border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
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
            {verificationStep ? (
              <form onSubmit={handleVerification} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="code" className="block text-sm font-medium text-cyan-300">
                    Verification Code
                  </label>
                  <div className="system-input-container">
                    <Input
                      id="code"
                      name="code"
                      placeholder="Enter verification code"
                      className="system-input"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full system-button" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify Account"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-cyan-300">
                    Hunter Name
                  </label>
                  <div className="system-input-container">
                    <Input
                      id="username"
                      placeholder="Enter your hunter name"
                      className="system-input"
                      {...register("username")}
                    />
                  </div>
                  {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>

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
                      placeholder="Create a password"
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

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-cyan-300">
                    Confirm Password
                  </label>
                  <div className="system-input-container relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="system-input pr-10"
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-300"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full system-button" disabled={isLoading}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  {isLoading ? "Registering..." : "Register as Hunter"}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already a Hunter?{" "}
                <Link href="/login" className="text-cyan-300 hover:text-cyan-100">
                  Login here
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


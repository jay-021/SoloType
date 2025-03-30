"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, AlertCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Form validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [verificationStep, setVerificationStep] = useState(false)
  const [email, setEmail] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // This would be replaced with actual AWS Cognito forgotPassword call
      // For now, we'll simulate a successful request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setEmail(data.email)
      setVerificationStep(true)
      setSuccess("Reset code sent to your email. Please check your inbox.")
    } catch (error: any) {
      console.error("Forgot password error:", error)
      setError(error.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(e.currentTarget)
    const code = formData.get("code") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // This would be replaced with actual AWS Cognito confirmForgotPassword call
      // For now, we'll simulate a successful request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Password reset successful. You can now login with your new password.")
    } catch (error: any) {
      console.error("Reset password error:", error)
      setError(error.message || "An error occurred. Please try again.")
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
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-center mb-2 system-text">
            {verificationStep ? "RESET PASSWORD" : "FORGOT PASSWORD"}
          </h1>
          <p className="text-center text-gray-400 mb-8">
            {verificationStep
              ? "Enter the verification code and your new password"
              : "Enter your email to receive a password reset code"}
          </p>
        </motion.div>

        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-950/50 border-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-green-950/50 border-green-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
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
              <form onSubmit={handleResetPassword} className="space-y-6">
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

                <div className="space-y-2">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-cyan-300">
                    New Password
                  </label>
                  <div className="system-input-container">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      placeholder="Enter new password"
                      className="system-input"
                      required
                      minLength={8}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-cyan-300">
                    Confirm Password
                  </label>
                  <div className="system-input-container">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm new password"
                      className="system-input"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full system-button" disabled={isLoading}>
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            ) : (
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

                <Button type="submit" className="w-full system-button" disabled={isLoading}>
                  <Send className="mr-2 h-4 w-4" />
                  {isLoading ? "Sending..." : "Send Reset Code"}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Remember your password?{" "}
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


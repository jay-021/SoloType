'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, UserPlus, ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Form validation schema
const signupSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z
      .string()
      .email('Please enter a valid email')
      .refine(
        (email) => {
          // Check for common email domains or at least proper TLD format
          return (
            /\.[a-z]{2,}$/i.test(email) &&
            email.includes('@') &&
            email.split('@')[1].includes('.')
          );
        },
        {
          message:
            'Please enter a complete email with a valid domain (e.g., example@domain.com)',
        }
      ),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { signup, signInWithGoogle, error: authError, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  // Watch the password field to evaluate requirements in real-time
  const watchedPassword = watch('password', '');

  // Password validation conditions
  const hasMinLength = watchedPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(watchedPassword);
  const hasLowercase = /[a-z]/.test(watchedPassword);
  const hasNumber = /[0-9]/.test(watchedPassword);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(watchedPassword);

  const onSubmit = async (data: SignupFormValues) => {
    clearError();
    setIsLoading(true);

    try {
      await signup(data.email, data.username, data.password);
      router.push('/');
    } catch (error) {
      // Error is handled in the auth context
      console.error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    clearError();
    setIsGoogleLoading(true);

    try {
      await signInWithGoogle();
      router.push('/');
    } catch (error) {
      // Error is handled in the auth context
      console.error('Google sign-in failed');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="system-background"></div>

      <div className="container relative z-10 mx-auto flex max-w-md flex-1 flex-col justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button
            asChild
            variant="ghost"
            className="mb-6 text-cyan-300 hover:bg-transparent hover:text-cyan-100"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="system-text mb-2 text-center text-3xl font-bold">
            HUNTER REGISTRATION
          </h1>
          <p className="mb-8 text-center text-gray-400">
            Create your account to begin your typing journey
          </p>
        </motion.div>

        {authError && (
          <Alert
            variant="destructive"
            className="mb-6 border-red-800 bg-red-950/50"
          >
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
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-cyan-300"
                >
                  Hunter Name
                </label>
                <div className="system-input-container">
                  <Input
                    id="username"
                    placeholder="Enter your hunter name"
                    className="system-input"
                    {...register('username')}
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-cyan-300"
                >
                  Email
                </label>
                <div className="system-input-container">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="system-input"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-cyan-300"
                >
                  Password
                </label>
                <div className="system-input-container relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="system-input pr-10"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-cyan-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
                <div className="mt-1 space-y-1 text-xs text-gray-400">
                  <p>Password requirements:</p>
                  <ul className="list-disc space-y-0.5 pl-4">
                    <li
                      className={
                        hasMinLength ? 'text-green-500' : 'text-red-500'
                      }
                    >
                      Minimum 8 characters
                    </li>
                    <li
                      className={
                        hasUppercase ? 'text-green-500' : 'text-red-500'
                      }
                    >
                      At least one uppercase letter (A-Z)
                    </li>
                    <li
                      className={
                        hasLowercase ? 'text-green-500' : 'text-red-500'
                      }
                    >
                      At least one lowercase letter (a-z)
                    </li>
                    <li
                      className={hasNumber ? 'text-green-500' : 'text-red-500'}
                    >
                      At least one number (0-9)
                    </li>
                    <li
                      className={
                        hasSpecialChar ? 'text-green-500' : 'text-red-500'
                      }
                    >
                      At least one special character
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-cyan-300"
                >
                  Confirm Password
                </label>
                <div className="system-input-container relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="system-input pr-10"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-cyan-300"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="system-button w-full"
                disabled={isLoading}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                {isLoading ? 'Creating Account...' : 'Create Your Account'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-[#0a0f1a] px-2 text-gray-400">
                    Or continue with
                  </span>
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
                  <div className="relative mr-2 h-4 w-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                    >
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
                  {isGoogleLoading ? 'Signing in...' : 'Sign in with Google'}
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-cyan-300 hover:text-cyan-100"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>

          <div className="system-border-bottom"></div>
        </motion.div>
      </div>
    </div>
  );
}

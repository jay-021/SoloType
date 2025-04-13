"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth"
import { auth } from "@/lib/firebase/config"
import SystemNotification from "@/components/system-notification"

/*
 * NOTE: Authentication is temporarily disabled
 * The following imports and implementation are preserved for future use
 * Uncomment when ready to implement actual authentication
 *
 * import {
 *   CognitoUserPool,
 *   CognitoUser,
 *   AuthenticationDetails,
 *   CognitoUserAttribute,
 *   type CognitoUserSession,
 * } from "amazon-cognito-identity-js"
 */

// AWS Cognito configuration - preserved for future use
/*
const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "us-east-1_example",
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || "example-client-id",
}

// Initialize the Cognito User Pool
const userPool = new CognitoUserPool(poolData)
*/

// User type definition
export interface User {
  id: string
  username: string
  email: string
  rank: "e" | "d" | "c" | "b" | "a" | "s"
  level: number
  xp: number
  xpToNextLevel: number
  joinDate: string
  completedQuests: number
  isFirstLogin: boolean
  role: "player" | "admin"
}

// Define the shape of our auth context
interface AuthContextType {
  user: FirebaseUser | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// AuthProvider props interface
interface AuthProviderProps {
  children: ReactNode
}

// Create the Auth Provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  // Sign up with email and password
  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      // Set display name as username from email
      if (userCredential.user) {
        const username = email.split('@')[0]
        await updateProfile(userCredential.user, {
          displayName: username
        })
      }
    } catch (error) {
      console.error("Error signing up:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error("Error signing in:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("Error signing in with Google:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true)
      await firebaseSignOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Auth context value
  const value = {
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the Auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


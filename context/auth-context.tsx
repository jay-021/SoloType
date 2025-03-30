"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
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

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, username: string, password: string) => Promise<void>
  confirmSignup: (email: string, code: string) => Promise<void>
  logout: () => void
  showNotification: (type: "signup" | "login" | "levelup" | "quest", data?: any) => void
  notificationState: {
    show: boolean
    type: "signup" | "login" | "levelup" | "quest"
    data?: any
  }
  closeNotification: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false) // Changed to false since we're not actually loading
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [notificationState, setNotificationState] = useState<{
    show: boolean
    type: "signup" | "login" | "levelup" | "quest"
    data?: any
  }>({ show: false, type: "login" })

  // Check for existing session on mount - temporarily disabled
  useEffect(() => {
    // Authentication check is disabled
    setIsLoading(false)

    /* Original implementation preserved for future use
    const checkAuth = async () => {
      try {
        // Get current Cognito user
        const cognitoUser = userPool.getCurrentUser()

        if (cognitoUser) {
          // Get session to verify authentication
          cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
            if (err) {
              console.error("Session error:", err)
              setIsLoading(false)
              return
            }

            if (session && session.isValid()) {
              // Get user attributes
              cognitoUser.getUserAttributes((err, attributes) => {
                if (err) {
                  console.error("Get attributes error:", err)
                  setIsLoading(false)
                  return
                }

                if (attributes) {
                  // Create user object from attributes
                  const userData: Partial<User> = {
                    id: cognitoUser.getUsername(),
                    email: attributes.find((attr) => attr.Name === "email")?.Value || "",
                    username:
                      attributes.find((attr) => attr.Name === "preferred_username")?.Value || cognitoUser.getUsername(),
                    // Default values for new users
                    rank: "e",
                    level: 1,
                    xp: 0,
                    xpToNextLevel: 100,
                    joinDate: new Date().toISOString(),
                    completedQuests: 0,
                    isFirstLogin: attributes.find((attr) => attr.Name === "custom:first_login")?.Value === "true",
                    role:
                      (attributes.find((attr) => attr.Name === "custom:role")?.Value as "player" | "admin") || "player",
                  }

                  setUser(userData as User)
                  setIsAuthenticated(true)
                }

                setIsLoading(false)
              })
            } else {
              setIsLoading(false)
            }
          })
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Authentication error:", error)
        setIsLoading(false)
      }
    }

    checkAuth()
    */
  }, [])

  // Sign up with AWS Cognito - temporarily disabled
  const signup = async (email: string, username: string, password: string) => {
    console.log("Signup functionality is coming soon")
    return Promise.resolve()

    /* Original implementation preserved for future use
    setIsLoading(true)

    return new Promise<void>((resolve, reject) => {
      // Prepare attributes
      const attributeList = [
        new CognitoUserAttribute({ Name: "email", Value: email }),
        new CognitoUserAttribute({ Name: "preferred_username", Value: username }),
        new CognitoUserAttribute({ Name: "custom:rank", Value: "e" }),
        new CognitoUserAttribute({ Name: "custom:level", Value: "1" }),
        new CognitoUserAttribute({ Name: "custom:first_login", Value: "true" }),
        new CognitoUserAttribute({ Name: "custom:role", Value: "player" }),
      ]

      // Sign up the user
      userPool.signUp(email, password, attributeList, [], (err, result) => {
        setIsLoading(false)

        if (err) {
          console.error("Signup error:", err)
          reject(err)
          return
        }

        if (result) {
          // Show signup notification
          showNotification("signup")
          resolve()
        }
      })
    })
    */
  }

  // Confirm signup with verification code - temporarily disabled
  const confirmSignup = async (email: string, code: string) => {
    console.log("Confirm signup functionality is coming soon")
    return Promise.resolve()

    /* Original implementation preserved for future use
    return new Promise<void>((resolve, reject) => {
      const userData = {
        Username: email,
        Pool: userPool,
      }

      const cognitoUser = new CognitoUser(userData)

      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          console.error("Confirm signup error:", err)
          reject(err)
          return
        }

        resolve()
      })
    })
    */
  }

  // Login with AWS Cognito - temporarily disabled
  const login = async (email: string, password: string) => {
    console.log("Login functionality is coming soon")
    return Promise.resolve()

    /* Original implementation preserved for future use
    setIsLoading(true)

    return new Promise<void>((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      })

      const userData = {
        Username: email,
        Pool: userPool,
      }

      const cognitoUser = new CognitoUser(userData)

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          // Get user attributes
          cognitoUser.getUserAttributes((err, attributes) => {
            setIsLoading(false)

            if (err) {
              console.error("Get attributes error:", err)
              reject(err)
              return
            }

            if (attributes) {
              // Create user object from attributes
              const userData: Partial<User> = {
                id: cognitoUser.getUsername(),
                email: attributes.find((attr) => attr.Name === "email")?.Value || "",
                username:
                  attributes.find((attr) => attr.Name === "preferred_username")?.Value || cognitoUser.getUsername(),
                // Get custom attributes or use defaults
                rank: (attributes.find((attr) => attr.Name === "custom:rank")?.Value || "e") as any,
                level: Number.parseInt(attributes.find((attr) => attr.Name === "custom:level")?.Value || "1"),
                xp: Number.parseInt(attributes.find((attr) => attr.Name === "custom:xp")?.Value || "0"),
                xpToNextLevel: Number.parseInt(
                  attributes.find((attr) => attr.Name === "custom:xp_to_next_level")?.Value || "100",
                ),
                joinDate:
                  attributes.find((attr) => attr.Name === "custom:join_date")?.Value || new Date().toISOString(),
                completedQuests: Number.parseInt(
                  attributes.find((attr) => attr.Name === "custom:completed_quests")?.Value || "0",
                ),
                isFirstLogin: attributes.find((attr) => attr.Name === "custom:first_login")?.Value === "true",
                role: (attributes.find((attr) => attr.Name === "custom:role")?.Value as "player" | "admin") || "player",
              }

              setUser(userData as User)
              setIsAuthenticated(true)

              // Show login notification
              showNotification("login")
              resolve()
            }
          })
        },
        onFailure: (err) => {
          setIsLoading(false)
          console.error("Login error:", err)
          reject(err)
        },
      })
    })
    */
  }

  // Logout - temporarily simplified
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)

    /* Original implementation preserved for future use
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser) {
      cognitoUser.signOut()
      setUser(null)
      setIsAuthenticated(false)
    }
    */
  }

  // Show system notification
  const showNotification = (type: "signup" | "login" | "levelup" | "quest", data?: any) => {
    setNotificationState({ show: true, type, data })
  }

  // Close notification
  const closeNotification = () => {
    setNotificationState((prev) => ({ ...prev, show: false }))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        signup,
        confirmSignup,
        logout,
        showNotification,
        notificationState,
        closeNotification,
      }}
    >
      {children}
      {notificationState.show && (
        <SystemNotification type={notificationState.type} data={notificationState.data} onClose={closeNotification} />
      )}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


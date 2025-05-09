"use client"

import type React from "react"

import { createContext, useContext } from "react"

// Define the context type
type GlobalContextType = {}

// Create the context with a default value of null
const GlobalContext = createContext<GlobalContextType | null>(null)

// Create a provider component (optional, if you need to provide values)
interface GlobalContextProviderProps {
  children: React.ReactNode
}

export function GlobalContextProvider({ children }: GlobalContextProviderProps) {
  // Add any state or functions you want to provide to the context here
  const contextValue: GlobalContextType = {
    // Example:
    // someState: 'initial value',
  }

  return <GlobalContext.Provider value={contextValue}>{children}</GlobalContext.Provider>
}

// Create a custom hook to use the context
export function useGlobalContext() {
  const context = useContext(GlobalContext)
  if (!context) {
    // Throw an error if the hook is used outside of the provider
    // This is important to prevent unexpected behavior
    // and to make sure the context is properly initialized
    throw new Error("useGlobalContext must be used within a GlobalContextProvider")
  }
  return context
}


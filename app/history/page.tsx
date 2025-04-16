"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import { auth } from "@/lib/firebase/config"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, History, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { debugLog, debugError, redactSensitive } from '@/lib/logger'

// Define the TestResult interface
interface TestResult {
  _id: string
  userId: string
  wpm: number
  accuracy: number
  rank: 'e' | 'd' | 'c' | 'b' | 'a' | 's'
  testDuration: number
  wordsTyped: number
  timestamp: string
}

export default function HistoryPage() {
  const { user, isLoading: isAuthLoading } = useAuth()
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    // Only fetch data when we're mounted (client-side) and auth is ready
    if (!isMounted || isAuthLoading) return
    
    async function fetchTestResults() {
      setIsLoading(true)
      setError(null)
      
      try {
        debugLog('Fetching test results, auth state:', redactSensitive({ 
          isAuthLoading, 
          hasUser: !!user 
        }))

        if (!user) {
          setError('You must be logged in to view your test history')
          setIsLoading(false)
          return
        }

        // Get the Firebase user object from auth
        const firebaseUser = auth.currentUser
        debugLog('Firebase currentUser:', redactSensitive({ 
          uid: firebaseUser?.uid,
          isAuthenticated: !!firebaseUser 
        }))
        
        if (!firebaseUser) {
          debugError('Firebase user not available')
          setError('Firebase authentication issue. Please try logging out and back in.')
          setIsLoading(false)
          return
        }

        // Get the token from the Firebase user object
        debugLog('Attempting to get ID token...')
        let idToken
        try {
          idToken = await firebaseUser.getIdToken(true) // Force token refresh
          debugLog('ID token obtained successfully')
        } catch (tokenError) {
          debugError('Error getting ID token:', tokenError)
          setError('Error getting authentication token. Please try again.')
          setIsLoading(false)
          return
        }
        
        debugLog('Fetching test results from API')
        const response = await fetch('/api/test-results', {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        })
        
        // Enhanced error handling
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          debugError('Failed to fetch test results:', {
            status: response.status,
            statusText: response.statusText,
            error: errorData.error
          })
          throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        debugLog('Test results fetched:', { count: data.results?.length || 0 })
        setTestResults(data.results || [])
      } catch (err) {
        debugError('Error fetching test results:', err)
        setError(err instanceof Error ? err.message : 'Failed to load test history')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchTestResults()
  }, [user, isMounted, isAuthLoading])

  // Return null during SSR to prevent hydration mismatch
  if (!isMounted) return null

  // Function to format the date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a')
    } catch (e) {
      debugError('Date formatting error:', e)
      return dateString
    }
  }

  // Get the style for rank display
  const getRankStyle = (rank: string) => {
    switch (rank.toLowerCase()) {
      case 's': return 'text-yellow-400'
      case 'a': return 'text-red-400'
      case 'b': return 'text-purple-400'
      case 'c': return 'text-blue-400'
      case 'd': return 'text-green-400'
      case 'e': return 'text-gray-400'
      default: return ''
    }
  }

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center">
          <Button asChild variant="ghost" className="mr-4">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="solo-font text-3xl font-bold glow-text flex items-center">
            <History className="mr-2 h-6 w-6" />
            Test History
          </h1>
        </div>
      </div>

      <Card className="p-6 bg-solo-darkgray/80 border-solo-purple/20">
        {isLoading && (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin mr-2">
              <Loader2 className="h-6 w-6 text-solo-purple" />
            </div>
            <span className="ml-3">Loading history...</span>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/20 text-red-400 p-4 rounded-md">
            <p>{error}</p>
            <p className="mt-2 text-sm">
              Please try again later or contact support if the problem persists.
            </p>
          </div>
        )}
        
        {!isLoading && !error && testResults.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No test results found yet.</p>
            <Button asChild className="bg-solo-purple hover:bg-solo-purple-dark">
              <Link href="/test">
                Take a Typing Test
              </Link>
            </Button>
          </div>
        )}
        
        {!isLoading && !error && testResults.length > 0 && (
          <Table>
            <TableCaption>Your recent typing test results</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead className="text-right">WPM</TableHead>
                <TableHead className="text-right">Accuracy</TableHead>
                <TableHead className="text-right">Duration</TableHead>
                <TableHead className="text-right">Words</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testResults.map((result) => (
                <TableRow key={result._id} className="hover:bg-solo-darkgray/50">
                  <TableCell>{formatDate(result.timestamp)}</TableCell>
                  <TableCell className={`font-bold uppercase ${getRankStyle(result.rank)}`}>
                    {result.rank.toUpperCase()}
                  </TableCell>
                  <TableCell className="text-right">{result.wpm}</TableCell>
                  <TableCell className="text-right">{result.accuracy}%</TableCell>
                  <TableCell className="text-right">
                    {result.testDuration === 0.5 ? '30 sec' : `${result.testDuration} min`}
                  </TableCell>
                  <TableCell className="text-right">{result.wordsTyped}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  )
} 
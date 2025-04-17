"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import { auth } from "@/lib/firebase/config"
import { debugLog, errorLog } from "@/lib/logger"

interface TestResult {
  id: string
  wpm: number
  accuracy: number
  rank: 'e' | 'd' | 'c' | 'b' | 'a' | 's'
  testDuration: number
  wordsTyped: number
  timestamp: string
}

export default function HistoryPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return;
    
    if (!isAuthenticated || !user) {
      setError("Please log in to view your test history")
      setIsLoading(false)
      return
    }

    const fetchResults = async () => {
      try {
        debugLog('[HistoryPage] User object from context:', user);
        const firebaseUser = auth.currentUser;
        debugLog('[HistoryPage] auth.currentUser object:', firebaseUser);
        
        // Add a robust check before proceeding
        if (!firebaseUser || typeof firebaseUser.getIdToken !== 'function') {
           errorLog('[HistoryPage] Error: auth.currentUser is null or invalid for getIdToken.', { firebaseUser });
           setError('Authentication error. Try refreshing.');
           setIsLoading(false);
           return;
        }
        
        // Now attempt to get token
        debugLog('[HistoryPage] Attempting firebaseUser.getIdToken(true)...');
        try {
           const idToken = await firebaseUser.getIdToken(true);
           debugLog('[HistoryPage] ID token obtained.');
           
           const response = await fetch("/api/test-results", {
             headers: {
               Authorization: `Bearer ${idToken}`,
             },
           });

           // Log response details
           debugLog('[HistoryPage] Response status:', response.status);
           debugLog('[HistoryPage] Response headers:', Object.fromEntries([...response.headers.entries()]));
           
           if (!response.ok) {
             throw new Error("Failed to fetch test results");
           }

           // Get the response text
           const responseText = await response.text();
           debugLog('[HistoryPage] Raw response text:', responseText);
           
           // Parse the JSON
           let data;
           try {
             data = JSON.parse(responseText);
             debugLog('[HistoryPage] Parsed response data:', data);
           } catch (parseError) {
             errorLog('[HistoryPage] Failed to parse response as JSON:', parseError);
             throw new Error("Invalid JSON response from API");
           }
           
           // Log the API response for debugging
           debugLog('[HistoryPage] Raw API Response Data:', data); 
           debugLog('[HistoryPage] Type of data.results:', typeof data.results);
           debugLog('[HistoryPage] Is data.results an array?:', Array.isArray(data.results));
           
           // Ensure we always set an array, even if API response is unexpected
           const resultsArray = data && data.results && Array.isArray(data.results) 
             ? data.results 
             : [];
           
           // Map the results to ensure consistent ID fields (MongoDB uses _id)
           const mappedResults = resultsArray.map(result => ({
             ...result,
             // Ensure we have an id field (use _id as fallback)
             id: result.id || (result._id ? result._id.toString() : `fallback-${Date.now()}-${Math.random()}`),
           }));
           
           // Set the results state with the mapped array
           setResults(mappedResults);
           debugLog('[HistoryPage] testResults state updated to:', mappedResults);
           
           setError(null);
        } catch (tokenError) {
           errorLog('[HistoryPage] Error calling firebaseUser.getIdToken:', tokenError);
           setError('Failed to get authentication token.');
           setIsLoading(false);
           return;
        }
      } catch (err) {
        setError("Failed to load test history")
        errorLog("Error fetching test results:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchResults()
  }, [user, isAuthenticated, isMounted])

  if (!isMounted) {
    return null
  }

  if (!isAuthenticated) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Test History</h1>
        <p className="text-solo-purple-light">Please log in to view your test history.</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Test History</h1>
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Test History</h1>
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : results.length === 0 ? (
        <p className="text-solo-purple-light">No test results found. Complete a typing test to see your history.</p>
      ) : (
        <div className="rounded-md border border-solo-purple/20">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">WPM</TableHead>
                <TableHead className="text-right">Accuracy</TableHead>
                <TableHead className="text-right">Duration</TableHead>
                <TableHead className="text-right">Words</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Add safety check before mapping */}
              {Array.isArray(results) && results.map((result) => (
                <TableRow key={result.id || result._id}>
                  <TableCell>{format(new Date(result.timestamp), "MMM d, yyyy h:mm a")}</TableCell>
                  <TableCell className="text-right">{Math.round(result.wpm)}</TableCell>
                  <TableCell className="text-right">{Math.round(result.accuracy)}%</TableCell>
                  <TableCell className="text-right">
                    {result.testDuration === 0.5 ? '30 sec' : `${result.testDuration} min`}
                  </TableCell>
                  <TableCell className="text-right">{result.wordsTyped}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
} 
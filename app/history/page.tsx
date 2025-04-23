'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/lib/firebase/config';
import { debugLog, errorLog } from '@/lib/logger';

interface TestResult {
  id: string;
  wpm: number;
  accuracy: number;
  rank: 'e' | 'd' | 'c' | 'b' | 'a' | 's';
  testDuration: number;
  wordsTyped: number;
  timestamp: string;
}

export default function HistoryPage() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!isAuthenticated || !user) {
      errorLog('[HistoryPage] Error: No user object found in context.');
      setError('Please log in to view your test history');
      setIsLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        // Add detailed auth state logging
        debugLog('[HistoryPage] Auth State:', {
          isAuthenticated,
          userUid: user?.id,
          userEmail: user?.email,
          userProvider: user?.provider,
        });

        // Get and log Firebase currentUser details
        const firebaseUser = auth.currentUser;
        debugLog('[HistoryPage] auth.currentUser Check:', {
          exists: !!firebaseUser,
          uid: firebaseUser?.uid,
          email: firebaseUser?.email,
          isAnonymous: firebaseUser?.isAnonymous,
          emailVerified: firebaseUser?.emailVerified,
          providerData: firebaseUser?.providerData,
          hasGetIdToken: typeof firebaseUser?.getIdToken === 'function',
        });

        // Add a robust check before proceeding
        if (!firebaseUser || typeof firebaseUser.getIdToken !== 'function') {
          errorLog(
            '[HistoryPage] Error: auth.currentUser is null or invalid before calling getIdToken.',
            {
              firebaseUser,
              authInitialized: !!auth,
              authCurrentUser: !!auth.currentUser,
            }
          );
          setError('Authentication error. Try refreshing.');
          setIsLoading(false);
          return;
        }

        // Now attempt to get token with detailed error catching
        debugLog('[HistoryPage] Attempting firebaseUser.getIdToken(true)...');
        try {
          const idToken = await firebaseUser.getIdToken(true);
          debugLog(
            '[HistoryPage] ID token obtained successfully. Token length:',
            idToken?.length || 0
          );

          // Log request details
          debugLog('[HistoryPage] Making API request to /api/test-results');
          const response = await fetch('/api/test-results', {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });

          // Log response details
          debugLog('[HistoryPage] API Response status:', response.status);
          debugLog(
            '[HistoryPage] API Response headers:',
            Object.fromEntries([...response.headers.entries()])
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch test results. Status: ${response.status}`
            );
          }

          // Get the response text
          const responseText = await response.text();
          debugLog(
            '[HistoryPage] API Response text length:',
            responseText.length
          );

          // Parse the JSON
          let data;
          try {
            data = JSON.parse(responseText);
            debugLog('[HistoryPage] Parsed response data structure:', {
              hasSuccess: 'success' in data,
              successValue: data.success,
              hasResults: 'results' in data,
              resultsIsArray: Array.isArray(data.results),
              resultsLength: Array.isArray(data.results)
                ? data.results.length
                : 'not an array',
            });
          } catch (parseError) {
            errorLog(
              '[HistoryPage] Failed to parse response as JSON:',
              parseError
            );
            throw new Error('Invalid JSON response from API');
          }

          // ENHANCED SAFETY CHECK: Ensure we ALWAYS have an array to work with
          let resultsArray: TestResult[] = [];

          if (data?.success === true && data?.results) {
            if (Array.isArray(data.results)) {
              resultsArray = data.results;
            } else {
              // Log unexpected data structure
              errorLog(
                '[HistoryPage] API returned success but results is not an array',
                data
              );
            }
          }

          // Ensure each result has an id property (using _id as fallback)
          const normalizedResults = resultsArray.map((result) => ({
            ...result,
            id:
              result.id ||
              (result._id
                ? result._id.toString()
                : `fallback-${Date.now()}-${Math.random()}`),
          }));

          // Update state with guaranteed array
          setResults(normalizedResults);
          debugLog(
            '[HistoryPage] Results state updated with array of length:',
            normalizedResults.length
          );

          setError(null);
        } catch (tokenError) {
          errorLog(
            '[HistoryPage] Error calling firebaseUser.getIdToken:',
            tokenError
          );
          // Log more details about the token error
          if (tokenError instanceof Error) {
            debugLog('[HistoryPage] Token error details:', {
              name: tokenError.name,
              message: tokenError.message,
              stack: tokenError.stack,
            });
          }
          setError('Failed to get authentication token.');
          setIsLoading(false);
          return;
        }
      } catch (err) {
        setError('Failed to load test history');
        errorLog('[HistoryPage] Error fetching test results:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [user, isAuthenticated, isMounted]);

  // Debug log right before rendering
  debugLog(
    '[HistoryPage] Rendering with results type:',
    typeof results,
    'Is Array:',
    Array.isArray(results),
    'Length:',
    results.length,
    'Sample item type:',
    results.length > 0 ? typeof results[0] : 'none'
  );

  if (!isMounted) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="container py-8">
        <h1 className="mb-4 text-2xl font-bold">Test History</h1>
        <p className="text-solo-purple-light">
          Please log in to view your test history.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <h1 className="mb-4 text-2xl font-bold">Test History</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="mb-4 text-2xl font-bold">Test History</h1>
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : results.length === 0 ? (
        <p className="text-solo-purple-light">
          No test results found. Complete a typing test to see your history.
        </p>
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
              {results.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>
                    {format(new Date(result.timestamp), 'MMM d, yyyy h:mm a')}
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.round(result.wpm)}
                  </TableCell>
                  <TableCell className="text-right">
                    {Math.round(result.accuracy)}%
                  </TableCell>
                  <TableCell className="text-right">
                    {result.testDuration === 0.5
                      ? '30 sec'
                      : `${result.testDuration} min`}
                  </TableCell>
                  <TableCell className="text-right">
                    {result.wordsTyped}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

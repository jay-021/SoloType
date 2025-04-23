/**
 * Custom hook to manage test history data fetching and display
 */
import { useState, useEffect } from 'react';
import { TestResultRecord, testResultsService } from '@/services/test-results';
import { errorLog, debugLog } from '@/lib/logger';
import { useAuth } from '@/context/auth-context';

export interface TestHistoryState {
  /** Array of test result records */
  results: TestResultRecord[];
  /** Whether data is currently loading */
  isLoading: boolean;
  /** Error message if there was a problem loading data */
  error: string | null;
}

export interface TestHistoryActions {
  /** Manually refresh the history data */
  refreshHistory: () => Promise<void>;
}

/**
 * Hook for fetching and managing typing test history
 *
 * @returns Test history state and actions
 */
export function useTestHistory(): [TestHistoryState, TestHistoryActions] {
  const [results, setResults] = useState<TestResultRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get authentication state
  const { user, isAuthenticated } = useAuth();

  /**
   * Fetch test history from the API
   */
  const fetchHistory = async () => {
    debugLog('[useTestHistory] Fetching history, auth status:', {
      isAuthenticated,
      userId: user?.uid,
    });

    if (!isAuthenticated || !user) {
      setError('Please log in to view your test history');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      debugLog('[useTestHistory] Calling testResultsService.fetchHistory()');
      const historyData = await testResultsService.fetchHistory();
      debugLog('[useTestHistory] Received history data:', {
        count: historyData.length,
      });

      setResults(historyData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to load test history';
      setError(errorMessage);
      errorLog('[useTestHistory] Error fetching test results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch history when authenticated status changes or component mounts
  useEffect(() => {
    debugLog('[useTestHistory] Auth state changed, fetching history');
    fetchHistory();
  }, [isAuthenticated, user]);

  return [
    {
      results,
      isLoading,
      error,
    },
    {
      refreshHistory: fetchHistory,
    },
  ];
}

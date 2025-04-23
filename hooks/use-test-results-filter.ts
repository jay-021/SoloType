/**
 * Custom hook to filter test results by various criteria
 */
import { useState, useMemo, useCallback } from 'react';
import { TestResultRecord } from '@/services/test-results';

export interface TestResultsFilter {
  /** Filter by test duration (in minutes) */
  duration: number | null;
  /** Filter by test rank (difficulty) */
  rank: string | null;
  /** Filter by starting date */
  dateFrom: Date | null;
  /** Filter by ending date */
  dateTo: Date | null;
}

export interface TestResultsFilterActions {
  /** Set duration filter */
  setDurationFilter: (duration: number | null) => void;
  /** Set rank filter */
  setRankFilter: (rank: string | null) => void;
  /** Set date range filter */
  setDateRange: (from: Date | null, to: Date | null) => void;
  /** Clear all filters */
  clearFilters: () => void;
}

/**
 * Hook for filtering test results by various criteria
 *
 * @param results - The test results to filter
 * @returns Filtered results and filter actions
 */
export function useTestResultsFilter(
  results: TestResultRecord[]
): [TestResultRecord[], TestResultsFilter, TestResultsFilterActions] {
  // Filter state
  const [filters, setFilters] = useState<TestResultsFilter>({
    duration: null,
    rank: null,
    dateFrom: null,
    dateTo: null,
  });

  /**
   * Filter by test duration
   */
  const setDurationFilter = useCallback((duration: number | null) => {
    setFilters((prev) => ({
      ...prev,
      duration,
    }));
  }, []);

  /**
   * Filter by rank/difficulty
   */
  const setRankFilter = useCallback((rank: string | null) => {
    setFilters((prev) => ({
      ...prev,
      rank,
    }));
  }, []);

  /**
   * Filter by date range
   */
  const setDateRange = useCallback(
    (dateFrom: Date | null, dateTo: Date | null) => {
      setFilters((prev) => ({
        ...prev,
        dateFrom,
        dateTo,
      }));
    },
    []
  );

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    setFilters({
      duration: null,
      rank: null,
      dateFrom: null,
      dateTo: null,
    });
  }, []);

  /**
   * Apply filters to test results
   */
  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      // Filter by duration
      if (
        filters.duration !== null &&
        result.testDuration !== filters.duration
      ) {
        return false;
      }

      // Filter by rank
      if (filters.rank !== null && result.rank !== filters.rank) {
        return false;
      }

      // Filter by date range
      const resultDate = new Date(result.timestamp);

      if (filters.dateFrom !== null && resultDate < filters.dateFrom) {
        return false;
      }

      if (filters.dateTo !== null) {
        // Set the date to end of day for inclusive comparison
        const endDate = new Date(filters.dateTo);
        endDate.setHours(23, 59, 59, 999);

        if (resultDate > endDate) {
          return false;
        }
      }

      return true;
    });
  }, [results, filters]);

  const filterActions: TestResultsFilterActions = {
    setDurationFilter,
    setRankFilter,
    setDateRange,
    clearFilters,
  };

  return [filteredResults, filters, filterActions];
}

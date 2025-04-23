/**
 * Test Results Service
 *
 * Handles API requests related to typing test results
 */
import { auth } from '@/lib/firebase/config';
import { errorLog, debugLog } from '@/lib/logger';

/**
 * Test result object as returned by the API
 */
export interface TestResultRecord {
  id: string;
  userId: string;
  wpm: number;
  accuracy: number;
  rank: 'e' | 'd' | 'c' | 'b' | 'a' | 's';
  testDuration: number;
  wordsTyped: number;
  timestamp: string;
}

/**
 * Test result submission payload
 */
export interface TestResultSubmission {
  wpm: number;
  accuracy: number;
  duration: number;
  difficulty: string;
  wordsTyped: number;
  selectedRank?: string;
  createdAt?: string;
}

// Define interface for raw API result from the database
interface RawTestResult {
  _id?: string;
  id?: string;
  userId: string;
  wpm: number;
  accuracy: number;
  rank: 'e' | 'd' | 'c' | 'b' | 'a' | 's';
  testDuration: number;
  wordsTyped: number;
  timestamp: string;
  [key: string]: unknown; // For any other fields that might be present
}

/**
 * Test results service for API operations
 */
export const testResultsService = {
  /**
   * Fetch test history for the current user
   *
   * @returns Promise with the fetched test results
   */
  async fetchHistory(): Promise<TestResultRecord[]> {
    try {
      // Get current user
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No authenticated user found');
      }

      // Get authentication token
      const idToken = await user.getIdToken(true);

      debugLog('Fetching test results with token');

      // Fetch results from API
      const response = await fetch('/api/v1/test-results', {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      // Check response
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      // Parse response data
      const data = await response.json();
      debugLog('Received API response:', data);

      // Check if response has results array
      if (!data || !Array.isArray(data.results)) {
        debugLog('Unexpected API response format:', data);
        throw new Error('Unexpected API response format');
      }

      // Ensure consistent ID format (MongoDB uses _id, we want id)
      return data.results.map((result: RawTestResult) => ({
        ...result,
        id:
          result.id ||
          (result._id ? result._id.toString() : `unknown-${Date.now()}`),
      }));
    } catch (error) {
      errorLog('Error fetching test results:', error);
      throw error;
    }
  },

  /**
   * Save a new test result
   *
   * @param result The test result to save
   * @returns Promise with the saved result ID
   */
  async saveResult(result: TestResultSubmission): Promise<string> {
    try {
      // Get current user
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No authenticated user found');
      }

      // Get authentication token
      const idToken = await user.getIdToken(true);

      // Send result to API
      const response = await fetch('/api/v1/test-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(result),
      });

      // Check response
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      // Parse response
      const data = await response.json();

      // Updated to handle the new API response format
      if (!data || !data.id) {
        debugLog('Unexpected API response format:', data);
        throw new Error('Unexpected API response format');
      }

      return data.id;
    } catch (error) {
      errorLog('Error saving test result:', error);
      throw error;
    }
  },
};

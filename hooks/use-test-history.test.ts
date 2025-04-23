import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useTestHistory } from './use-test-history';
import { testResultsService, type TestResultRecord } from '@/services/test-results';
import { useAuth } from '@/context/auth-context';
import React from 'react';

// Mock types for stronger typing
interface MockAuthContext {
  user: { id: string } | null;
  isAuthenticated: boolean;
}

// Mock dependencies
vi.mock('@/services/test-results', () => ({
  testResultsService: {
    fetchHistory: vi.fn(),
  },
}));

vi.mock('@/context/auth-context', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/lib/logger', () => ({
  errorLog: vi.fn(),
}));

// Create a wrapper to properly test useEffect
const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => {
    return React.createElement(React.StrictMode, null, children);
  };
};

describe('useTestHistory', () => {
  const mockResults: TestResultRecord[] = [
    {
      id: '1',
      userId: 'user1',
      wpm: 60,
      accuracy: 95,
      rank: 'a',
      testDuration: 1,
      wordsTyped: 60,
      timestamp: '2023-01-01T12:00:00Z',
    },
    {
      id: '2',
      userId: 'user1',
      wpm: 65,
      accuracy: 98,
      rank: 's',
      testDuration: 2,
      wordsTyped: 130,
      timestamp: '2023-01-02T12:00:00Z',
    },
  ];

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Default mock implementations
    (useAuth as unknown as jest.Mock<MockAuthContext>).mockReturnValue({
      user: { id: 'user1' },
      isAuthenticated: true,
    });

    (testResultsService.fetchHistory as jest.Mock<Promise<TestResultRecord[]>>).mockResolvedValue(mockResults);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useTestHistory(), {
      wrapper: createWrapper(),
    });

    expect(result.current[0].isLoading).toBe(true);
    expect(result.current[0].results).toEqual([]);
    expect(result.current[0].error).toBeNull();
  });

  it('should fetch results when authenticated', async () => {
    const { result } = renderHook(() => useTestHistory(), {
      wrapper: createWrapper(),
    });

    // Wait for fetch to complete
    await waitFor(() => {
      expect(result.current[0].isLoading).toBe(false);
    });

    expect(testResultsService.fetchHistory).toHaveBeenCalledTimes(1);
    expect(result.current[0].results).toEqual(mockResults);
    expect(result.current[0].error).toBeNull();
  });

  it('should set error when not authenticated', async () => {
    (useAuth as unknown as jest.Mock<MockAuthContext>).mockReturnValue({
      user: null,
      isAuthenticated: false,
    });

    const { result } = renderHook(() => useTestHistory(), {
      wrapper: createWrapper(),
    });

    // Wait for error to be set
    await waitFor(() => {
      expect(result.current[0].isLoading).toBe(false);
    });

    expect(testResultsService.fetchHistory).not.toHaveBeenCalled();
    expect(result.current[0].error).toBe(
      'Please log in to view your test history'
    );
  });

  it('should set error when fetch fails', async () => {
    const testError = new Error('Failed to fetch');
    (testResultsService.fetchHistory as jest.Mock<Promise<TestResultRecord[]>>).mockRejectedValue(testError);

    const { result } = renderHook(() => useTestHistory(), {
      wrapper: createWrapper(),
    });

    // Wait for error to be set
    await waitFor(() => {
      expect(result.current[0].isLoading).toBe(false);
    });

    expect(testResultsService.fetchHistory).toHaveBeenCalledTimes(1);
    expect(result.current[0].error).toBe('Failed to fetch');
  });

  it('should allow manual refresh of history', async () => {
    const { result } = renderHook(() => useTestHistory(), {
      wrapper: createWrapper(),
    });

    // Wait for initial fetch to complete
    await waitFor(() => {
      expect(result.current[0].isLoading).toBe(false);
    });

    expect(testResultsService.fetchHistory).toHaveBeenCalledTimes(1);

    // Setup mock for new data
    const newResults: TestResultRecord[] = [
      ...mockResults,
      {
        id: '3',
        userId: 'user1',
        wpm: 70,
        accuracy: 97,
        rank: 's',
        testDuration: 1,
        wordsTyped: 70,
        timestamp: '2023-01-03T12:00:00Z',
      },
    ];

    (testResultsService.fetchHistory as jest.Mock<Promise<TestResultRecord[]>>).mockResolvedValue(newResults);

    // Trigger manual refresh
    await act(async () => {
      await result.current[1].refreshHistory();
    });

    // Verify results updated
    expect(testResultsService.fetchHistory).toHaveBeenCalledTimes(2);
    expect(result.current[0].results).toEqual(newResults);
    expect(result.current[0].isLoading).toBe(false);
  });
});

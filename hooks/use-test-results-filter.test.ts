import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTestResultsFilter } from './use-test-results-filter';
import type { TestResultRecord } from '@/services/test-results';

describe('useTestResultsFilter', () => {
  // Sample test results
  const mockResults: TestResultRecord[] = [
    { 
      id: '1',
      userId: 'user1',
      wpm: 60,
      accuracy: 95,
      rank: 'a',
      testDuration: 1,
      wordsTyped: 60,
      timestamp: '2023-01-01T12:00:00Z'
    },
    { 
      id: '2',
      userId: 'user1',
      wpm: 65,
      accuracy: 98,
      rank: 's',
      testDuration: 2,
      wordsTyped: 130,
      timestamp: '2023-02-15T12:00:00Z'
    },
    { 
      id: '3',
      userId: 'user1',
      wpm: 55,
      accuracy: 90,
      rank: 'a',
      testDuration: 1,
      wordsTyped: 55,
      timestamp: '2023-03-20T12:00:00Z'
    },
    { 
      id: '4',
      userId: 'user1',
      wpm: 70,
      accuracy: 95,
      rank: 'b',
      testDuration: 5,
      wordsTyped: 350,
      timestamp: '2023-04-10T12:00:00Z'
    }
  ];

  it('should return all results when no filters are applied', () => {
    const { result } = renderHook(() => useTestResultsFilter(mockResults));
    
    const [filteredResults, filters, _] = result.current;
    
    expect(filteredResults).toHaveLength(4);
    expect(filters.duration).toBeNull();
    expect(filters.rank).toBeNull();
    expect(filters.dateFrom).toBeNull();
    expect(filters.dateTo).toBeNull();
  });

  it('should filter by duration', () => {
    const { result } = renderHook(() => useTestResultsFilter(mockResults));
    
    act(() => {
      const [_, __, actions] = result.current;
      actions.setDurationFilter(1);
    });
    
    const [filteredResults, filters, _] = result.current;
    
    expect(filteredResults).toHaveLength(2);
    expect(filteredResults[0].id).toBe('1');
    expect(filteredResults[1].id).toBe('3');
    expect(filters.duration).toBe(1);
  });

  it('should filter by rank', () => {
    const { result } = renderHook(() => useTestResultsFilter(mockResults));
    
    act(() => {
      const [_, __, actions] = result.current;
      actions.setRankFilter('a');
    });
    
    const [filteredResults, filters, _] = result.current;
    
    expect(filteredResults).toHaveLength(2);
    expect(filteredResults[0].id).toBe('1');
    expect(filteredResults[1].id).toBe('3');
    expect(filters.rank).toBe('a');
  });

  it('should filter by date range', () => {
    const { result } = renderHook(() => useTestResultsFilter(mockResults));
    
    act(() => {
      const [_, __, actions] = result.current;
      actions.setDateRange(new Date('2023-02-01'), new Date('2023-03-31'));
    });
    
    const [filteredResults, filters, _] = result.current;
    
    expect(filteredResults).toHaveLength(2);
    expect(filteredResults[0].id).toBe('2');
    expect(filteredResults[1].id).toBe('3');
    expect(filters.dateFrom).toEqual(new Date('2023-02-01'));
    expect(filters.dateTo).toEqual(new Date('2023-03-31'));
  });

  it('should apply multiple filters combined', () => {
    const { result } = renderHook(() => useTestResultsFilter(mockResults));
    
    // Apply duration filter
    act(() => {
      const [_, __, actions] = result.current;
      actions.setDurationFilter(1);
    });
    
    // Apply rank filter
    act(() => {
      const [_, __, actions] = result.current;
      actions.setRankFilter('a');
    });
    
    // Apply date range filter
    act(() => {
      const [_, __, actions] = result.current;
      actions.setDateRange(new Date('2023-03-01'), null);
    });
    
    const [filteredResults, filters, _] = result.current;
    
    // Only one result should match all filters
    expect(filteredResults).toHaveLength(1);
    expect(filteredResults[0].id).toBe('3');
    expect(filters.duration).toBe(1);
    expect(filters.rank).toBe('a');
    expect(filters.dateFrom).toEqual(new Date('2023-03-01'));
    expect(filters.dateTo).toBeNull();
  });

  it('should clear all filters', () => {
    const { result } = renderHook(() => useTestResultsFilter(mockResults));
    
    // Apply some filters
    act(() => {
      const [_, __, actions] = result.current;
      actions.setDurationFilter(1);
      actions.setRankFilter('a');
    });
    
    // Clear filters
    act(() => {
      const [_, __, actions] = result.current;
      actions.clearFilters();
    });
    
    const [filteredResults, filters, _] = result.current;
    
    expect(filteredResults).toHaveLength(4); // All results
    expect(filters.duration).toBeNull();
    expect(filters.rank).toBeNull();
    expect(filters.dateFrom).toBeNull();
    expect(filters.dateTo).toBeNull();
  });

  it('should handle empty results array', () => {
    const { result } = renderHook(() => useTestResultsFilter([]));
    
    act(() => {
      const [_, __, actions] = result.current;
      actions.setDurationFilter(1);
    });
    
    const [filteredResults, _, __] = result.current;
    
    expect(filteredResults).toHaveLength(0);
  });
}); 
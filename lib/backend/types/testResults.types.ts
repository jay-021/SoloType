import { z } from 'zod';

/**
 * Schema for test result submission
 */
export const testResultSchema = z.object({
  wpm: z.number().positive().min(1).max(500),
  accuracy: z.number().min(0).max(100),
  rank: z.enum(['e', 'd', 'c', 'b', 'a', 's']).default('e'),
  testDuration: z.number().positive().min(0.5).max(30),
  wordsTyped: z.number().int().nonnegative(),
  difficulty: z.string().min(1),
  selectedRank: z.string().optional(),
  createdAt: z.string().datetime().optional(),
});

export type TestResultSubmission = z.infer<typeof testResultSchema>;

/**
 * Type for a test result that has been saved to the database
 */
export interface SavedTestResult extends TestResultSubmission {
  id: string;
  userId: string;
  createdAt: string;
}

/**
 * Options for finding test results
 */
export interface TestResultFindOptions {
  limit?: number;
  skip?: number;
  sort?: Record<string, 1 | -1>;
}

/**
 * Pagination metadata
 */
export interface PaginationMetadata {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Sort metadata
 */
export interface SortMetadata {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

/**
 * Schema for validating query parameters
 */
export const queryParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type QueryParams = z.infer<typeof queryParamsSchema>; 
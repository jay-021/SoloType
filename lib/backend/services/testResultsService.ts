import { TestResultsRepository } from '../repositories/testResultsRepository';
import { 
  SavedTestResult, 
  TestResultFindOptions, 
  TestResultSubmission, 
  PaginationMetadata,
  QueryParams
} from '../types/testResults.types';
import { debugLog, errorLog } from '@/lib/logger';

/**
 * Service for handling test results business logic
 */
export class TestResultsService {
  private repository: TestResultsRepository;
  
  constructor(repository?: TestResultsRepository) {
    this.repository = repository || new TestResultsRepository();
  }
  
  /**
   * Submits a new test result
   */
  async submitResult(userId: string, resultData: TestResultSubmission): Promise<SavedTestResult> {
    debugLog(`Processing test result submission for user ${userId}`);
    
    // Additional business logic can be added here if needed
    // For example, enriching the data, performing validations, etc.
    
    return this.repository.save(userId, resultData);
  }
  
  /**
   * Gets the test results history for a user with pagination
   */
  async getUserHistory(
    userId: string, 
    queryParams: QueryParams
  ): Promise<{
    results: SavedTestResult[],
    pagination: PaginationMetadata,
    meta: { sortBy: string, sortOrder: 'asc' | 'desc' }
  }> {
    debugLog(`Getting test history for user ${userId}`);
    
    const { page, limit, sortBy, sortOrder } = queryParams;
    const skip = (page - 1) * limit;
    
    // Create sort object for MongoDB
    const sort: Record<string, 1 | -1> = { 
      [sortBy]: sortOrder === 'asc' ? 1 : -1 
    };
    
    // Get total count for pagination
    const totalCount = await this.repository.countByUserId(userId);
    const totalPages = Math.ceil(totalCount / limit);
    
    // Get results with pagination and sorting
    const options: TestResultFindOptions = { limit, skip, sort };
    const results = await this.repository.findByUserId(userId, options);
    
    // Create pagination metadata
    const pagination: PaginationMetadata = {
      total: totalCount,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
    
    return {
      results,
      pagination,
      meta: {
        sortBy,
        sortOrder,
      },
    };
  }
} 
import { NextRequest } from 'next/server';
import { TestResultsService } from '../services/testResultsService';
import { 
  testResultSchema, 
  queryParamsSchema,
  TestResultSubmission 
} from '../types/testResults.types';
import { parseAndValidateBody, parseAndValidateQuery } from '../utils/requestUtils';
import { createSuccessResponse, handleError } from '../utils/responseUtils';
import { debugLog } from '@/lib/logger';

/**
 * Controller for handling test results API requests
 */
export class TestResultsController {
  private service: TestResultsService;
  
  constructor(service?: TestResultsService) {
    this.service = service || new TestResultsService();
  }
  
  /**
   * Handles POST requests to create a new test result
   */
  async handlePost(req: NextRequest, userId: string): Promise<Response> {
    try {
      debugLog('Processing POST request for test result');
      
      // Parse and validate the request body
      const resultData = await parseAndValidateBody<TestResultSubmission>(
        req, 
        testResultSchema
      );
      
      // Submit the test result
      const savedResult = await this.service.submitResult(userId, resultData);
      
      // Return success response
      return createSuccessResponse(
        {
          message: 'Test result saved successfully',
          id: savedResult.id,
          testResult: savedResult,
        },
        201
      );
    } catch (error) {
      return handleError(error);
    }
  }
  
  /**
   * Handles GET requests to fetch test results
   */
  async handleGet(req: NextRequest, userId: string): Promise<Response> {
    try {
      debugLog('Processing GET request for test results');
      
      // Parse and validate query parameters
      const queryParams = parseAndValidateQuery(req, queryParamsSchema);
      
      // Get the user's test history
      const result = await this.service.getUserHistory(userId, queryParams);
      
      // Return success response
      return createSuccessResponse(result);
    } catch (error) {
      return handleError(error);
    }
  }
} 
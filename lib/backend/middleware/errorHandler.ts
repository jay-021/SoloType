import { NextRequest } from 'next/server';
import { handleError } from '../utils/responseUtils';
import { errorLog } from '@/lib/logger';

/**
 * Higher-order function that wraps API route handlers with standardized error handling
 * 
 * @param handler The original API route handler function
 * @returns A new function that wraps the original handler with try-catch error handling
 */
export function withErrorHandler(
  handler: (req: NextRequest, ...args: any[]) => Promise<Response>
) {
  return async (req: NextRequest, ...args: any[]): Promise<Response> => {
    try {
      // Call the original handler
      return await handler(req, ...args);
    } catch (error: unknown) {
      // Log the error
      errorLog('API error caught by centralized handler:', error);
      
      // Convert the error to a standardized response and return it
      return handleError(error);
    }
  };
} 
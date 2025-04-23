import { NextRequest } from 'next/server';
import { TestResultsController } from '@/lib/backend/controllers/testResultsController';
import { authenticateRequest } from '@/lib/backend/utils/authUtils';
import { debugLog } from '@/lib/logger';
import { withErrorHandler } from '@/lib/backend/middleware/errorHandler';

// Create controller instance
const controller = new TestResultsController();

/**
 * GET handler for /api/v1/test-results
 */
export const GET = withErrorHandler(async (req: NextRequest): Promise<Response> => {
  debugLog('[API] GET /api/v1/test-results - Request received');
  
  // Authenticate the request
  const userId = await authenticateRequest(req);
  
  // Delegate to controller
  return controller.handleGet(req, userId);
});

/**
 * POST handler for /api/v1/test-results
 */
export const POST = withErrorHandler(async (req: NextRequest): Promise<Response> => {
  debugLog('[API] POST /api/v1/test-results - Request received');
  
  // Authenticate the request
  const userId = await authenticateRequest(req);
  
  // Delegate to controller
  return controller.handlePost(req, userId);
});

/**
 * OPTIONS handler for CORS preflight requests
 */
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

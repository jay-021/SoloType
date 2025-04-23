import { z } from 'zod';
import { NextRequest } from 'next/server';
import { verifyToken } from './auth-admin';
import { errorLog } from './logger';

/**
 * Schema for test result submission
 */
export const testResultSchema = z.object({
  wpm: z.number().positive().min(1).max(500),
  accuracy: z.number().min(0).max(100),
  rank: z.enum(['e', 'd', 'c', 'b', 'a', 's']).default('e'),
  testDuration: z.number().positive().min(0.5).max(30),
  wordsTyped: z.number().int().nonnegative(),
});

export type TestResultSubmission = z.infer<typeof testResultSchema>;

// Standard API response structure
interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

/**
 * Creates a standardized success response
 */
export function createSuccessResponse<T>(data: T, status = 200): Response {
  const responseBody: ApiResponse<T> = {
    success: true,
    data,
  };

  return new Response(JSON.stringify(responseBody), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Creates a standardized error response
 */
export function createErrorResponse(
  message: string,
  status = 400,
  details?: unknown,
  code?: string
): Response {
  const responseBody: ApiResponse = {
    success: false,
    error: {
      message,
      code,
      details,
    },
  };

  return new Response(JSON.stringify(responseBody), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

/**
 * Parses JSON from request body with error handling
 */
export async function parseJSON(req: NextRequest) {
  try {
    const data = await req.json();
    return { success: true, data };
  } catch (error) {
    errorLog('[API] Error parsing JSON:', error);
    const response = createErrorResponse('Invalid JSON body', 400);
    return { success: false, response };
  }
}

/**
 * Authenticates a request using the Authorization header
 */
export async function authenticateRequest(req: NextRequest) {
  try {
    // Extract Bearer token from Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        success: false,
        response: createErrorResponse(
          'Authorization header missing or invalid',
          401
        ),
      };
    }

    const token = authHeader.substring(7);
    if (!token) {
      return {
        success: false,
        response: createErrorResponse('Token missing', 401),
      };
    }

    // Verify token
    const decodedToken = await verifyToken(token);
    return {
      success: true,
      data: {
        uid: decodedToken.uid,
        email: decodedToken.email,
      },
    };
  } catch (error) {
    errorLog('[API] Authentication error:', error);
    return {
      success: false,
      response: createErrorResponse('Authentication failed', 401),
    };
  }
}

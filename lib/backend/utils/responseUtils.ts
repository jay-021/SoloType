import { ApiError } from '../errors/customErrors';

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
 * Creates an error response from an ApiError or general Error
 */
export function handleError(error: unknown): Response {
  if (error instanceof ApiError) {
    return createErrorResponse(
      error.message,
      error.status,
      error.details,
      error.code
    );
  }
  
  // For general errors
  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  return createErrorResponse(message, 500);
} 
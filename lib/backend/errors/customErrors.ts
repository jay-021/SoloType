/**
 * Base class for all custom API errors
 */
export class ApiError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(message: string, status = 500, code = 'INTERNAL_SERVER_ERROR', details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.details = details;
    
    // Ensures proper instanceof checks and proper stack traces in NodeJS
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error for when a resource is not found
 */
export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found', details?: unknown) {
    super(message, 404, 'NOT_FOUND', details);
  }
}

/**
 * Error for validation failures
 */
export class ValidationError extends ApiError {
  constructor(message = 'Validation failed', details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

/**
 * Error for database operations
 */
export class DatabaseError extends ApiError {
  constructor(message = 'Database operation failed', details?: unknown) {
    super(message, 500, 'DATABASE_ERROR', details);
  }
}

/**
 * Error for authentication failures
 */
export class AuthenticationError extends ApiError {
  constructor(message = 'Authentication failed', details?: unknown) {
    super(message, 401, 'AUTHENTICATION_ERROR', details);
  }
}

/**
 * Error for authorization failures
 */
export class AuthorizationError extends ApiError {
  constructor(message = 'Not authorized', details?: unknown) {
    super(message, 403, 'AUTHORIZATION_ERROR', details);
  }
} 
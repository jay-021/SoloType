/**
 * Logger utility for consistent logging across the application
 * Uses Pino for structured logging
 */
import pino from 'pino';

// Determine environment
const isProduction = process.env.NODE_ENV === 'production';
const isDebugEnabled = 
  !isProduction || 
  process.env.NEXT_PUBLIC_ENABLE_DEBUG_LOGGING === 'true';

// Configure Pino logger based on environment
const pinoLogger = pino({
  level: isDebugEnabled ? 'debug' : 'info',
  
  // Different configuration for development vs production
  ...(isProduction 
    ? {
        // Production: Use JSON format with standard fields
        // Pino defaults to including pid, hostname, level, time, msg
      } 
    : {
        // Development: Use pretty-printing for readability
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname',
          },
        },
      }
  ),
});

/**
 * Debug level logging
 */
export function debugLog(message: string, data?: unknown) {
  if (data) {
    pinoLogger.debug({ data }, message);
  } else {
    pinoLogger.debug(message);
  }
}

/**
 * Info level logging
 */
export function infoLog(message: string, data?: unknown) {
  if (data) {
    pinoLogger.info({ data }, message);
  } else {
    pinoLogger.info(message);
  }
}

/**
 * Warning level logging
 */
export function warnLog(message: string, data?: unknown) {
  if (data) {
    pinoLogger.warn({ data }, message);
  } else {
    pinoLogger.warn(message);
  }
}

/**
 * Error level logging
 * Ensures error stack traces are included when available
 */
export function errorLog(message: string, error?: unknown) {
  if (error) {
    // Check if error is an Error object that has a stack trace
    if (error instanceof Error) {
      // Pass error directly to ensure stack trace is captured
      pinoLogger.error({ err: error }, message);
    } else {
      // Handle case where error might be a string or other type
      pinoLogger.error({ data: error }, message);
    }
  } else {
    pinoLogger.error(message);
  }
}

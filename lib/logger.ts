/**
 * Logger utility for consistent logging across the application
 */

// Define log levels
const LOG_LEVELS = {
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
};

// Set the current log level based on environment
// In production, we might want to suppress debug logs
const CURRENT_LOG_LEVEL = process.env.NODE_ENV === 'production'
  ? LOG_LEVELS.INFO
  : LOG_LEVELS.DEBUG;

/**
 * Debug level logging
 */
export function debugLog(message: string, data?: any) {
  if (CURRENT_LOG_LEVEL <= LOG_LEVELS.DEBUG) {
    if (data) {
      console.log(`[DEBUG] ${message}`, data);
    } else {
      console.log(`[DEBUG] ${message}`);
    }
  }
}

/**
 * Info level logging
 */
export function infoLog(message: string, data?: any) {
  if (CURRENT_LOG_LEVEL <= LOG_LEVELS.INFO) {
    if (data) {
      console.log(`[INFO] ${message}`, data);
    } else {
      console.log(`[INFO] ${message}`);
    }
  }
}

/**
 * Warning level logging
 */
export function warnLog(message: string, data?: any) {
  if (CURRENT_LOG_LEVEL <= LOG_LEVELS.WARN) {
    if (data) {
      console.warn(`[WARN] ${message}`, data);
    } else {
      console.warn(`[WARN] ${message}`);
    }
  }
}

/**
 * Error level logging
 */
export function errorLog(message: string, error?: any) {
  if (CURRENT_LOG_LEVEL <= LOG_LEVELS.ERROR) {
    if (error) {
      console.error(`[ERROR] ${message}`, error);
    } else {
      console.error(`[ERROR] ${message}`);
    }
  }
} 
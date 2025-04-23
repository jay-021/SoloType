/**
 * Test script to verify the enhanced logger functionality
 * Run with: pnpm tsx scripts/test-logger.ts
 * Test production mode: NODE_ENV=production pnpm tsx scripts/test-logger.ts
 */
import { debugLog, infoLog, warnLog, errorLog } from '../lib/logger';

// Test different log levels
debugLog('This is a debug message');
debugLog('Debug message with data', { userId: '123', action: 'login' });

infoLog('This is an info message');
infoLog('Info message with data', { status: 'success', count: 42 });

warnLog('This is a warning message');
warnLog('Warning message with data', { threshold: 90, current: 95 });

// Test error logging with different types of errors
errorLog('Basic error message without error object');

// Test with Error object to verify stack traces
try {
  throw new Error('Test error with stack trace');
} catch (error) {
  errorLog('Error with stack trace', error);
}

// Test with string error
errorLog('Error with string data', 'Something went wrong');

// Test with object error
errorLog('Error with object data', { code: 'ERR_INTERNAL', message: 'Internal server error' });

console.log('\nLogger test complete. Check the output format above.');
console.log('In development: Should see pretty-printed, colorized logs');
console.log('In production: Should see JSON-formatted logs with proper structure'); 
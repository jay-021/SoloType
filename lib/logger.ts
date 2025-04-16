/**
 * Debug logging utility that can be enabled/disabled via environment variables
 * 
 * To enable debug logging:
 * - For server-side code (API routes, config): Set ENABLE_DEBUG_LOGGING=true in .env.local
 * - For client-side code (pages, components): Set NEXT_PUBLIC_ENABLE_DEBUG_LOGGING=true in .env.local
 * 
 * To disable debug logging:
 * - Remove these variables from .env.local or set them to 'false'
 */

export function debugLog(...args: any[]) {
  // Check if we're in a browser environment
  const isBrowser = typeof window !== 'undefined'
  
  // Use the appropriate environment variable based on context
  const isEnabled = isBrowser
    ? process.env.NEXT_PUBLIC_ENABLE_DEBUG_LOGGING === 'true'
    : process.env.ENABLE_DEBUG_LOGGING === 'true'

  if (isEnabled) {
    console.log('[DEBUG]', ...args)
  }
}

export function debugError(...args: any[]) {
  // Always log errors in development, respect env vars in production
  if (process.env.NODE_ENV === 'development' || process.env.ENABLE_DEBUG_LOGGING === 'true') {
    console.error('[ERROR]', ...args)
  }
}

// Helper to redact sensitive information from logs
export function redactSensitive(obj: any, sensitiveKeys: string[] = ['token', 'key', 'password', 'secret']): any {
  if (typeof obj !== 'object' || obj === null) return obj
  
  const result = Array.isArray(obj) ? [...obj] : { ...obj }
  
  for (const key in result) {
    if (typeof result[key] === 'object') {
      result[key] = redactSensitive(result[key], sensitiveKeys)
    } else if (sensitiveKeys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
      const strValue = String(result[key])
      result[key] = strValue.length > 8 
        ? `${strValue.substring(0, 4)}...${strValue.substring(strValue.length - 4)}`
        : '***'
    }
  }
  
  return result
} 
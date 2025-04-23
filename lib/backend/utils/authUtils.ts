import { NextRequest } from 'next/server';
import { authAdmin } from '@/lib/firebase/adminConfig';
import { AuthenticationError } from '../errors/customErrors';
import { debugLog, errorLog } from '@/lib/logger';

/**
 * Verifies a Firebase authentication token
 * Includes check for token revocation
 */
export async function verifyToken(token: string) {
  try {
    // Add second parameter 'true' to check for token revocation
    return await authAdmin.verifyIdToken(token, true);
  } catch (error) {
    // Check specifically for revoked token error
    if (error instanceof Error && 'code' in error && error.code === 'auth/id-token-revoked') {
      errorLog('Token has been revoked:', error);
      throw new AuthenticationError('Token has been revoked. Please log in again.');
    }
    
    // Handle other verification errors
    errorLog('Token verification failed:', error);
    throw new AuthenticationError('Invalid or expired token');
  }
}

/**
 * Authenticates a request using the Authorization header
 * and returns the user ID if successful
 */
export async function authenticateRequest(req: NextRequest): Promise<string> {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Missing or invalid authorization header');
    }

    const token = authHeader.split('Bearer ')[1];
    debugLog('Verifying authentication token');
    const decodedToken = await verifyToken(token);
    const userId = decodedToken.uid;

    if (!userId) {
      throw new AuthenticationError('User ID not found in token');
    }

    debugLog(`User authenticated: ${userId}`);
    return userId;
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    // Enhanced logging to capture the specific error reason
    debugLog('Authentication processing error:', error instanceof Error ? error.message : error);
    errorLog('Authentication error:', error);
    throw new AuthenticationError('Authentication failed');
  }
} 
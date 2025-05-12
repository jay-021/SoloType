import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { debugLog, errorLog } from '@/lib/logger';

// Check if we already have initialized apps
const apps = getApps();

// Private key comes from environment variable as a string with escaped newlines
// We need to properly format it by replacing \\n with actual newlines
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY 
  ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (!privateKey) {
  errorLog('[Firebase Admin] FIREBASE_ADMIN_PRIVATE_KEY is not defined');
  throw new Error('FIREBASE_ADMIN_PRIVATE_KEY must be defined');
}

// Validate required environment variables
const requiredEnvVars = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: privateKey,
};

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    errorLog(`[Firebase Admin] Missing required environment variable: ${key}`);
    throw new Error(`${key} must be defined`);
  }
});

// Initialize Firebase Admin SDK if not already initialized
if (!apps.length) {
  try {
    debugLog('[Firebase Admin] Initializing Firebase Admin SDK with config:', {
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKeyLength: privateKey?.length
    });

    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
    
    debugLog('[Firebase Admin] Successfully initialized Firebase Admin SDK');
  } catch (error) {
    errorLog('[Firebase Admin] Error initializing Firebase Admin SDK:', error);
    throw error;
  }
} else {
  debugLog('[Firebase Admin] Firebase Admin SDK already initialized');
}

// Export the auth admin instance
export const authAdmin = getAuth();

// Helper function to verify Firebase ID tokens
export async function verifyToken(token: string) {
  try {
    debugLog('[Firebase Admin] Attempting to verify token');
    const decodedToken = await authAdmin.verifyIdToken(token);
    debugLog('[Firebase Admin] Token verified successfully:', {
      uid: decodedToken.uid,
      email: decodedToken.email
    });
    return decodedToken;
  } catch (error) {
    errorLog('[Firebase Admin] Token verification failed:', error);
    throw error;
  }
}
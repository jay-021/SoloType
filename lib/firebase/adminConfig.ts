import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Check if we already have initialized apps
const apps = getApps();

// Private key comes from environment variable as a string with escaped newlines
// We need to properly format it by replacing \\n with actual newlines
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY
  ? process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

if (!privateKey) {
  console.warn(
    '[Firebase Admin] Warning: FIREBASE_ADMIN_PRIVATE_KEY is not defined'
  );
}

// Initialize Firebase Admin SDK if not already initialized
if (!apps.length) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
    console.log('[Firebase Admin] Initialized Firebase Admin SDK');
  } catch (error) {
    console.error(
      '[Firebase Admin] Error initializing Firebase Admin SDK:',
      error
    );
    throw error;
  }
} else {
  console.log('[Firebase Admin] Firebase Admin SDK already initialized');
}

// Export the auth admin instance
export const authAdmin = getAuth();

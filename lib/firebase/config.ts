import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth"
import { debugLog, errorLog } from '@/lib/logger';

// Validate required environment variables
const requiredEnvVars = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    errorLog(`[Firebase Client] Missing required environment variable: NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}`);
    throw new Error(`NEXT_PUBLIC_FIREBASE_${key.toUpperCase()} must be defined`);
  }
});

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase (prevent multiple initializations)
let firebaseApp;
let auth;

try {
  debugLog('[Firebase Client] Initializing Firebase client');
  
  if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    
    // Connect to auth emulator in development
    if (process.env.NODE_ENV === 'development') {
      connectAuthEmulator(auth, 'http://127.0.0.1:9099');
    }
  } else {
    firebaseApp = getApp();
    auth = getAuth(firebaseApp);
  }
  
  debugLog('[Firebase Client] Firebase client initialized successfully');
} catch (error) {
  errorLog('[Firebase Client] Error initializing Firebase:', error);
  throw error;
}

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Enable debug logging in development mode
if (process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ENABLE_DEBUG_LOGGING === 'true') {
  debugLog('[Firebase Client] Configuration:', {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 5) + '...',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

export { firebaseApp, auth, googleProvider }
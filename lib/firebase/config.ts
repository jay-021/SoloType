import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Validate required config values
const requiredConfig = ['apiKey', 'authDomain', 'projectId'] as const
for (const field of requiredConfig) {
  if (!firebaseConfig[field]) {
    throw new Error(`Firebase ${field} is required but not provided`)
  }
}

// Initialize Firebase (prevent multiple initializations)
let firebaseApp
try {
  console.log('Initializing Firebase with config:', {
    apiKey: firebaseConfig.apiKey?.substring(0, 5) + '...',
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    currentHost: typeof window !== 'undefined' ? window.location.hostname : 'server-side',
  })
  
  firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp()
  
  console.log('Firebase initialization successful')
} catch (error) {
  console.error('Firebase initialization error:', error)
  throw error
}

// Initialize Firebase services
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

// Initialize Google Auth Provider with custom parameters
const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account',
  // Explicitly set auth domain to match Firebase config
  auth_domain: firebaseConfig.authDomain
})

// Enable debug logging in development mode
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase Auth state:', {
    isInitialized: !!auth,
    currentUser: auth.currentUser,
    authDomain: auth.config.authDomain,
    providerId: googleProvider.providerId
  })
}

export { firebaseApp, auth, db, storage, googleProvider } 
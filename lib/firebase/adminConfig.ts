import * as admin from 'firebase-admin';
import { debugLog, debugError, redactSensitive } from '@/lib/logger';

// Get environment variables
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

// Log environment variables check
debugLog('Firebase Admin Environment Variables Check:', redactSensitive({
  projectId: projectId || 'Not Found',
  clientEmail: clientEmail || 'Not Found',
  privateKey: privateKey ? `Length: ${privateKey.length}` : 'Not Found'
}));

// Helper function to properly format the private key
function formatPrivateKey(key: string | undefined): string {
  if (!key) {
    debugError('FIREBASE_ADMIN_PRIVATE_KEY is not defined');
    return '';
  }
  
  debugLog('Raw privateKey type:', typeof key);
  
  // Handle JSON stringified format
  if (key.startsWith('"') && key.endsWith('"')) {
    try {
      key = JSON.parse(key);
      debugLog('Parsed privateKey from JSON string');
    } catch (e) {
      debugError('Failed to parse privateKey as JSON string:', e);
    }
  }
  
  // Replace escaped newlines with actual newlines
  if (key.includes('\\n')) {
    debugLog('Found escaped newlines in privateKey, replacing with literal newlines');
    key = key.replace(/\\n/g, '\n');
  }
  
  debugLog('Formatted privateKey:', redactSensitive({
    length: key.length,
    containsNewlines: key.includes('\n'),
    firstChars: key.substring(0, 10)
  }));
  
  return key;
}

// Initialize the Firebase Admin SDK
if (!admin.apps.length) {
  try {
    debugLog('Initializing Firebase Admin SDK...');
    
    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Missing required Firebase Admin environment variables');
    }
    
    // Format the private key
    const formattedKey = formatPrivateKey(privateKey);
    
    if (!formattedKey) {
      throw new Error('Failed to format private key');
    }
    
    // Initialize the app with credential
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: formattedKey
      })
    });
    
    // Test the initialization by accessing auth
    const auth = admin.auth();
    debugLog('Firebase Admin SDK initialized successfully with auth:', !!auth);
  } catch (error) {
    debugError('Firebase Admin SDK initialization error:', error);
    if (error instanceof Error) {
      debugError('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    // Re-throw to prevent silent failure
    throw error;
  }
}

export default admin; 
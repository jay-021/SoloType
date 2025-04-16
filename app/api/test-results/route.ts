import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb/connect';
import TestResult from '@/models/TestResult';
import admin from '@/lib/firebase/adminConfig';
import { saveTestResultService, type TestResultInput } from '@/lib/services/resultsService';
import { debugLog, debugError, redactSensitive } from '@/lib/logger';

// Helper function to verify Firebase ID token
async function verifyAuthToken(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('No token provided');
    }

    const token = authHeader.split('Bearer ')[1];
    debugLog('Verifying token:', redactSensitive({ token }));
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    debugLog('Token verified successfully:', redactSensitive({ uid: decodedToken.uid }));
    return decodedToken.uid;
  } catch (error) {
    debugError('Auth token verification error:', error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split('Bearer ')[1];

    // Parse request body
    const resultData: TestResultInput = await request.json();

    // Call service function
    const result = await saveTestResultService(token, resultData);

    // Return response based on service result
    return NextResponse.json(
      { 
        success: result.success, 
        data: result.data, 
        error: result.error 
      }, 
      { status: result.status }
    );
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    debugLog('GET /api/test-results: Handler started');
    
    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization');
    debugLog('Authorization header present:', !!authHeader);
    
    if (!authHeader?.startsWith('Bearer ')) {
      debugError('No valid Authorization header found');
      return NextResponse.json(
        { success: false, error: 'Authorization token missing or invalid format' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split('Bearer ')[1];
    debugLog('Token extracted:', redactSensitive({ token }));

    if (!token) {
      debugError('No token extracted from header');
      return NextResponse.json(
        { success: false, error: 'Authorization token missing' },
        { status: 401 }
      );
    }

    // Verify token and get user ID
    debugLog('Attempting to verify Firebase token...');
    let decodedToken;
    try {
      debugLog('Admin apps initialized:', admin.apps?.length || 0);
      decodedToken = await admin.auth().verifyIdToken(token);
      debugLog('Token verified successfully:', redactSensitive({ uid: decodedToken.uid }));
    } catch (tokenError) {
      debugError('Token verification failed:', tokenError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid authentication token', 
          details: tokenError instanceof Error ? tokenError.message : 'Unknown error' 
        },
        { status: 403 }
      );
    }
    
    const uid = decodedToken.uid;

    // Connect to MongoDB and fetch results
    debugLog('Connecting to MongoDB...');
    let client;
    try {
      client = await Promise.race([
        clientPromise,
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('MongoDB connection timeout')), 5000)
        )
      ]);
      debugLog('MongoDB connection established');
    } catch (dbError) {
      debugError('MongoDB connection error:', dbError);
      return NextResponse.json(
        { success: false, error: 'Database connection failed' },
        { status: 500 }
      );
    }

    if (!client) {
      debugError('MongoDB client undefined after connection');
      return NextResponse.json(
        { success: false, error: 'Database connection unavailable' },
        { status: 500 }
      );
    }

    // Access the database and collection
    debugLog('Accessing database and collection...');
    try {
      const db = client.db('solotype');
      const collection = db.collection('testresults');

      // Get the latest 10 results for the user
      debugLog('Querying for user results:', { userId: uid });
      const results = await collection
        .find({ userId: uid })
        .sort({ timestamp: -1 })
        .limit(10)
        .toArray();
      
      debugLog(`Found ${results.length} results for user`);
      return NextResponse.json({ 
        success: true, 
        results // Changed from data to results to match frontend expectation
      });
    } catch (queryError) {
      debugError('Error querying collection:', queryError);
      return NextResponse.json(
        { success: false, error: 'Failed to query test results' },
        { status: 500 }
      );
    }
  } catch (error) {
    debugError('Error in GET /api/test-results:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 
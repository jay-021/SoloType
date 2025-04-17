import { NextResponse } from 'next/server';
import { authAdmin } from '@/lib/firebase/adminConfig';
import { connectToDatabase } from '@/lib/mongodb/connect';
import { debugLog, errorLog, infoLog } from '@/lib/logger';

/**
 * GET handler for /api/test-results
 * Fetches test results for the authenticated user
 */
export async function GET(request: Request) {
  try {
    debugLog('[API] GET /api/test-results - Request received');
    
    // Extract authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      errorLog('[API] GET /api/test-results - Missing or invalid Authorization header');
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Missing or invalid token' },
        { status: 401 }
      );
    }
    
    // Extract the token
    const token = authHeader.split('Bearer ')[1];
    
    if (!token) {
      errorLog('[API] GET /api/test-results - Empty token');
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Empty token' },
        { status: 401 }
      );
    }
    
    // Verify the token
    let decodedToken;
    try {
      debugLog('[API] GET /api/test-results - Verifying token');
      decodedToken = await authAdmin.verifyIdToken(token);
    } catch (error) {
      errorLog('[API] GET /api/test-results - Token verification failed', error);
      return NextResponse.json(
        { success: false, error: 'Forbidden - Invalid token' },
        { status: 403 }
      );
    }
    
    // Get the user ID from the decoded token
    const uid = decodedToken.uid;
    debugLog(`[API] GET /api/test-results - Token verified for user: ${uid}`);
    
    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const collection = db.collection('testresults');
    
    // Query for user's test results, sorted by timestamp (newest first)
    debugLog(`[API] GET /api/test-results - Querying database for user: ${uid}`);
    const results = await collection
      .find({ userId: uid })
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();
    
    // Log the number of results found
    infoLog(`[API] GET /api/test-results - Found ${results.length} results for user: ${uid}`);
    
    return NextResponse.json({
      success: true,
      results: results
    });
  } catch (error) {
    // Log and return error
    errorLog('[API] GET /api/test-results - Server error occurred', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/**
 * POST handler for /api/test-results
 * Saves a new test result for the authenticated user
 */
export async function POST(request: Request) {
  try {
    debugLog('[API] POST /api/test-results - Request received');
    
    // Extract authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      errorLog('[API] POST /api/test-results - Missing or invalid Authorization header');
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Missing or invalid token' },
        { status: 401 }
      );
    }
    
    // Extract the token
    const token = authHeader.split('Bearer ')[1];
    
    if (!token) {
      errorLog('[API] POST /api/test-results - Empty token');
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Empty token' },
        { status: 401 }
      );
    }
    
    // Verify the token
    let decodedToken;
    try {
      debugLog('[API] POST /api/test-results - Verifying token');
      decodedToken = await authAdmin.verifyIdToken(token);
    } catch (error) {
      errorLog('[API] POST /api/test-results - Token verification failed', error);
      return NextResponse.json(
        { success: false, error: 'Forbidden - Invalid token' },
        { status: 403 }
      );
    }
    
    // Get the user ID from the decoded token
    const uid = decodedToken.uid;
    debugLog(`[API] POST /api/test-results - Token verified for user: ${uid}`);
    
    // Parse request body
    const requestBody = await request.json();
    
    // Validate request body
    if (!requestBody.wpm || !requestBody.accuracy || !requestBody.testDuration || requestBody.wordsTyped === undefined) {
      errorLog('[API] POST /api/test-results - Missing required fields in request body');
      return NextResponse.json(
        { success: false, error: 'Bad Request - Missing required fields' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    const { db } = await connectToDatabase();
    const collection = db.collection('testresults');
    
    // Create test result document
    const testResult = {
      userId: uid,
      wpm: requestBody.wpm,
      accuracy: requestBody.accuracy,
      rank: requestBody.rank || 'e',
      testDuration: requestBody.testDuration,
      wordsTyped: requestBody.wordsTyped,
      timestamp: new Date().toISOString(),
    };
    
    // Insert test result
    debugLog(`[API] POST /api/test-results - Saving result for user: ${uid}`);
    const result = await collection.insertOne(testResult);
    
    // Log result and return success
    infoLog(`[API] POST /api/test-results - Saved result with ID: ${result.insertedId} for user: ${uid}`);
    
    return NextResponse.json({
      success: true,
      resultId: result.insertedId
    });
  } catch (error) {
    // Log and return error
    errorLog('[API] POST /api/test-results - Server error occurred', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 
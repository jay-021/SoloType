import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authAdmin } from '@/lib/firebase/adminConfig';
import { connectToDatabase } from '@/lib/mongodb/connect';
import { debugLog, errorLog, infoLog } from '@/lib/logger';

// Schema for validating test result data
const testResultSchema = z.object({
  wpm: z.number().min(1).max(300),
  accuracy: z.number().min(0).max(100),
  duration: z.number().min(1),
  difficulty: z.string().min(1),
  wordsTyped: z.number().min(1),
  selectedRank: z.string().optional(),
  createdAt: z.string().datetime().optional()
});

// Schema for validating query parameters
const queryParamsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
});

/**
 * Authenticates the request and returns the user ID
 */
async function authenticateRequest(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Missing or invalid authorization header');
    }
    
    const token = authHeader.split('Bearer ')[1];
    debugLog('[API] Verifying authentication token');
    const decodedToken = await authAdmin.verifyIdToken(token);
    const userId = decodedToken.uid;
    
    if (!userId) {
      throw new Error('User ID not found in token');
    }
    
    debugLog(`[API] User authenticated: ${userId}`);
    return userId;
  } catch (error) {
    errorLog('[API] Authentication error:', error);
    throw error;
  }
}

/**
 * GET handler for /api/v1/test-results
 * Fetches paginated test results for the authenticated user
 */
export async function GET(req: NextRequest) {
  try {
    debugLog('[API] GET /api/v1/test-results - Request received');
    
    // Authenticate the request
    let userId;
    try {
      userId = await authenticateRequest(req);
    } catch (error) {
      return NextResponse.json(
        { error: 'Authentication failed', message: error.message },
        { status: 401 }
      );
    }
    
    // Parse query parameters
    const url = new URL(req.url);
    const queryParams = {
      page: url.searchParams.get('page') || '1',
      limit: url.searchParams.get('limit') || '10',
      sortBy: url.searchParams.get('sortBy') || 'createdAt',
      sortOrder: url.searchParams.get('sortOrder') || 'desc'
    };
    
    // Validate query parameters
    const validatedParams = queryParamsSchema.safeParse(queryParams);
    if (!validatedParams.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: validatedParams.error.format() },
        { status: 400 }
      );
    }
    
    const { page, limit, sortBy, sortOrder } = validatedParams.data;
    const skip = (page - 1) * limit;
    
    // Connect to the database
    const { db } = await connectToDatabase();
    const collection = db.collection('test_results');
    
    // Build the sort object
    const sortObject = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
    
    // Fetch total count for pagination
    const totalCount = await collection.countDocuments({ userId });
    const totalPages = Math.ceil(totalCount / limit);
    
    // Fetch paginated results
    const results = await collection
      .find({ userId })
      .sort(sortObject)
      .skip(skip)
      .limit(limit)
      .toArray();
    
    debugLog(`[API] Retrieved ${results.length} test results for user ${userId}`);
    
    // Return the paginated results
    return NextResponse.json({
      results,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      meta: {
        sortBy,
        sortOrder
      }
    });
  } catch (error) {
    errorLog('[API] Error fetching test results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test results', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * POST handler for /api/v1/test-results
 * Saves a new test result for the authenticated user
 */
export async function POST(req: NextRequest) {
  try {
    debugLog('[API] POST /api/v1/test-results - Request received');
    
    // Authenticate the request
    let userId;
    try {
      userId = await authenticateRequest(req);
    } catch (error) {
      return NextResponse.json(
        { error: 'Authentication failed', message: error.message },
        { status: 401 }
      );
    }
    
    // Parse and validate request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid request body', message: 'Could not parse JSON' },
        { status: 400 }
      );
    }
    
    const validatedData = testResultSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid test result data', details: validatedData.error.format() },
        { status: 400 }
      );
    }
    
    // Prepare the test result for insertion
    const testResult = {
      ...validatedData.data,
      userId,
      createdAt: validatedData.data.createdAt || new Date().toISOString()
    };
    
    // Connect to the database
    const { db } = await connectToDatabase();
    const collection = db.collection('test_results');
    
    // Insert the test result
    const result = await collection.insertOne(testResult);
    debugLog(`[API] Saved test result for user ${userId}: ${result.insertedId}`);
    
    return NextResponse.json(
      { 
        message: 'Test result saved successfully',
        id: result.insertedId,
        testResult
      }, 
      { status: 201 }
    );
  } catch (error) {
    errorLog('[API] Error saving test result:', error);
    return NextResponse.json(
      { error: 'Failed to save test result', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
} 
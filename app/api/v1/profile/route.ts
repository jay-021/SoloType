import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authAdmin } from '@/lib/firebase/adminConfig';
import { connectToDatabase } from '@/lib/mongodb/connect';
import { debugLog, errorLog, infoLog } from '@/lib/logger';

const profileSchema = z.object({
  displayName: z.string().min(1).max(50).optional(),
  preferredDuration: z.number().min(10).max(600).optional(),
  theme: z.enum(['light', 'dark', 'system']).optional(),
  updatedAt: z.string().datetime().optional()
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
 * GET handler for /api/v1/profile
 * Fetches the profile for the authenticated user
 */
export async function GET(req: NextRequest) {
  try {
    infoLog('[API] GET /api/v1/profile - Request received');
    
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
    
    debugLog(`[API] Profile fetch for user ${userId}`);
    
    // Connect to database
    const { db } = await connectToDatabase();
    const collection = db.collection('profiles');
    
    // Get profile
    const profile = await collection.findOne({ userId });
    
    if (!profile) {
      // Return empty profile if none exists
      return NextResponse.json({
        profile: { userId }
      });
    }
    
    // Return profile
    return NextResponse.json({
      profile: {
        userId,
        displayName: profile.displayName,
        preferredDuration: profile.preferredDuration,
        theme: profile.theme,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt
      }
    });
  } catch (error) {
    errorLog('[API] Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile', message: error.message },
      { status: 500 }
    );
  }
}

/**
 * PUT handler for /api/v1/profile
 * Updates the profile for the authenticated user
 */
export async function PUT(req: NextRequest) {
  try {
    infoLog('[API] PUT /api/v1/profile - Request received');
    
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
    
    debugLog(`[API] Profile update for user ${userId}`);
    
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
    
    const validatedData = profileSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid profile data', details: validatedData.error.format() },
        { status: 400 }
      );
    }
    
    const profileData = validatedData.data;
    
    // Connect to database
    const { db } = await connectToDatabase();
    const collection = db.collection('profiles');
    
    // Update profile
    const now = new Date().toISOString();
    const updateData = {
      ...profileData,
      updatedAt: now
    };
    
    const result = await collection.updateOne(
      { userId },
      { 
        $set: updateData,
        $setOnInsert: { createdAt: now }
      },
      { upsert: true }
    );
    
    debugLog(`[API] Profile update result:`, result);
    
    // Return updated profile
    return NextResponse.json({
      profile: {
        userId,
        ...updateData
      },
      message: 'Profile updated successfully'
    });
  } catch (error) {
    errorLog('[API] Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile', message: error.message },
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
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
} 
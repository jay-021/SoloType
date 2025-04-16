import { NextResponse } from 'next/server';
import dbConnect from '@/utils/mongodb';
import TestResult from '@/models/TestResult';
import admin from '@/lib/firebase/adminConfig';
import { saveTestResultService, type TestResultInput } from '@/lib/services/resultsService';

// Helper function to verify Firebase ID token
async function verifyAuthToken(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('No token provided');
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error('Auth error:', error);
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
    // Extract token from Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authorization token missing' },
        { status: 401 }
      );
    }

    // Verify token and get user ID
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Connect to MongoDB and fetch results
    const client = await dbConnect();
    const db = client.db('solotype');
    const collection = db.collection('testresults');

    // Get the latest 10 results for the user
    const results = await collection
      .find({ userId: uid })
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray();

    return NextResponse.json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching test results:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 
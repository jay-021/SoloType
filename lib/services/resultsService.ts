import { Collection } from 'mongodb'
import clientPromise from '../mongodb/connect'
import admin from '../firebase/adminConfig'

export interface TestResultInput {
  wpm: number
  accuracy: number
  rank: string
  testDuration: number
  wordsTyped: number
}

export interface TestResult extends TestResultInput {
  userId: string
  timestamp: Date
}

export async function saveTestResultService(
  token: string | undefined,
  resultData: TestResultInput
): Promise<{ success: boolean; data?: any; error?: string; status: number }> {
  // Check if token exists
  if (!token) {
    return { success: false, error: 'Authorization token missing', status: 401 }
  }

  try {
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token)
    const uid = decodedToken.uid

    // Validate input data
    if (!validateTestResult(resultData)) {
      return { success: false, error: 'Invalid input data', status: 400 }
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('solotype')
    const collection: Collection<TestResult> = db.collection('testresults')

    // Create the test result document
    const testResult: TestResult = {
      ...resultData,
      userId: uid,
      timestamp: new Date()
    }

    // Save to database
    const result = await collection.insertOne(testResult)

    if (result.acknowledged) {
      return {
        success: true,
        data: { id: result.insertedId, ...testResult },
        status: 201
      }
    } else {
      throw new Error('Failed to save test result')
    }
  } catch (error) {
    console.error('Error saving test result:', error)
    
    if (error instanceof Error && error.message.includes('auth')) {
      return { success: false, error: 'Invalid token', status: 403 }
    }
    
    return { success: false, error: 'Database error', status: 500 }
  }
}

function validateTestResult(data: TestResultInput): boolean {
  return (
    typeof data.wpm === 'number' &&
    data.wpm >= 0 &&
    typeof data.accuracy === 'number' &&
    data.accuracy >= 0 &&
    data.accuracy <= 100 &&
    typeof data.rank === 'string' &&
    ['e', 'd', 'c', 'b', 'a', 's'].includes(data.rank.toLowerCase()) &&
    typeof data.testDuration === 'number' &&
    data.testDuration > 0 &&
    typeof data.wordsTyped === 'number' &&
    data.wordsTyped >= 0
  )
} 
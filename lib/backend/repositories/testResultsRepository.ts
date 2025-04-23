import { Collection, ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb/connect';
import { 
  SavedTestResult, 
  TestResultFindOptions, 
  TestResultSubmission 
} from '../types/testResults.types';
import { DatabaseError, NotFoundError } from '../errors/customErrors';
import { debugLog, errorLog } from '@/lib/logger';

/**
 * Repository class for test results
 */
export class TestResultsRepository {
  private collectionName = 'test_results';
  
  /**
   * Saves a new test result to the database
   */
  async save(userId: string, resultData: TestResultSubmission): Promise<SavedTestResult> {
    try {
      debugLog(`Saving test result for user ${userId}`);
      const { db } = await connectToDatabase();
      const collection = db.collection(this.collectionName);
      
      // Prepare the test result document
      const testResult = {
        ...resultData,
        userId,
        createdAt: resultData.createdAt || new Date().toISOString(),
      };
      
      // Insert the document
      const result = await collection.insertOne(testResult);
      
      if (!result.acknowledged) {
        throw new DatabaseError('Failed to save test result');
      }
      
      debugLog(`Test result saved with ID: ${result.insertedId}`);
      
      // Return the saved test result with ID
      return {
        ...testResult,
        id: result.insertedId.toString(),
      } as SavedTestResult;
    } catch (error) {
      errorLog('Error saving test result:', error);
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError('Failed to save test result to database');
    }
  }
  
  /**
   * Finds test results by user ID with pagination and sorting
   */
  async findByUserId(
    userId: string,
    options: TestResultFindOptions = {}
  ): Promise<SavedTestResult[]> {
    try {
      debugLog(`Finding test results for user ${userId}`);
      const { db } = await connectToDatabase();
      const collection = db.collection(this.collectionName);
      
      // Set default options
      const { 
        limit = 10, 
        skip = 0, 
        sort = { createdAt: -1 } 
      } = options;
      
      // Find the documents
      const cursor = collection
        .find({ userId })
        .sort(sort)
        .skip(skip)
        .limit(limit);
      
      const results = await cursor.toArray();
      
      debugLog(`Found ${results.length} test results for user ${userId}`);
      
      // Map the results to SavedTestResult type
      return results.map(result => ({
        ...result,
        id: result._id.toString(),
        _id: undefined
      })) as SavedTestResult[];
    } catch (error) {
      errorLog('Error finding test results:', error);
      throw new DatabaseError('Failed to fetch test results from database');
    }
  }
  
  /**
   * Gets the count of test results for a user
   */
  async countByUserId(userId: string): Promise<number> {
    try {
      const { db } = await connectToDatabase();
      const collection = db.collection(this.collectionName);
      
      return await collection.countDocuments({ userId });
    } catch (error) {
      errorLog('Error counting test results:', error);
      throw new DatabaseError('Failed to count test results');
    }
  }
} 
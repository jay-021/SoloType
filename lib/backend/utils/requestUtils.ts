import { NextRequest } from 'next/server';
import { ZodSchema } from 'zod';
import { ValidationError } from '../errors/customErrors';
import { errorLog } from '@/lib/logger';

/**
 * Parses and validates JSON from request body
 */
export async function parseAndValidateBody<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<T> {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);
    
    if (!result.success) {
      throw new ValidationError('Invalid request data', result.error.format());
    }
    
    return result.data;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    
    if (error instanceof SyntaxError) {
      throw new ValidationError('Invalid JSON body');
    }
    
    errorLog('Error parsing request body:', error);
    throw new ValidationError('Could not process request data');
  }
}

/**
 * Parses and validates query parameters
 */
export function parseAndValidateQuery<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): T {
  try {
    const url = new URL(req.url);
    const queryParams: Record<string, string> = {};
    
    url.searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
    
    const result = schema.safeParse(queryParams);
    
    if (!result.success) {
      throw new ValidationError('Invalid query parameters', result.error.format());
    }
    
    return result.data;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    
    errorLog('Error parsing query parameters:', error);
    throw new ValidationError('Could not process query parameters');
  }
} 
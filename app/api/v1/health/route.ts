import { NextResponse } from 'next/server';
import { infoLog } from '@/lib/logger';

/**
 * GET handler for /api/v1/health
 * Simple health check endpoint that returns the API status
 */
export async function GET() {
  infoLog('[API] Health check requested');
  
  return NextResponse.json({
    status: 'OK',
    version: 'v1',
    timestamp: new Date().toISOString()
  });
} 
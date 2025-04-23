import { NextRequest, NextResponse } from 'next/server';
import { debugLog, warnLog } from '@/lib/logger';

/**
 * GET handler for legacy /api/profile endpoint
 * Redirects to the new versioned API endpoint
 */
export async function GET(req: NextRequest) {
  warnLog('[API] DEPRECATED: /api/profile GET called, redirecting to v1 endpoint');
  
  // Preserve query parameters in the redirect
  const url = new URL(req.url);
  const queryParams = new URLSearchParams(url.search);
  
  // Construct the new URL with the same query parameters
  const redirectUrl = new URL('/api/v1/profile', url.origin);
  queryParams.forEach((value, key) => {
    redirectUrl.searchParams.append(key, value);
  });
  
  debugLog(`[API] Redirecting to: ${redirectUrl.toString()}`);
  
  // Return redirect response
  return NextResponse.redirect(redirectUrl.toString(), {
    status: 307, // Temporary redirect
    headers: {
      'Deprecation': 'true',
      'Sunset': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString(), // 30 days from now
      'Link': `<${redirectUrl.toString()}>; rel="successor-version"`,
    }
  });
}

/**
 * PUT handler for legacy /api/profile endpoint
 * Redirects to the new versioned API endpoint
 */
export async function PUT(req: NextRequest) {
  warnLog('[API] DEPRECATED: /api/profile PUT called, redirecting to v1 endpoint');
  
  const redirectUrl = new URL('/api/v1/profile', new URL(req.url).origin);
  debugLog(`[API] Redirecting to: ${redirectUrl.toString()}`);
  
  // Return redirect response with appropriate headers
  return NextResponse.redirect(redirectUrl.toString(), {
    status: 307, // Temporary redirect
    headers: {
      'Deprecation': 'true',
      'Sunset': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString(), // 30 days from now
      'Link': `<${redirectUrl.toString()}>; rel="successor-version"`,
    }
  });
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
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Auth pages are now enabled, no redirection needed
  return NextResponse.next()
}

// We're not redirecting any paths now
export const config = {
  matcher: [], // Empty matcher as we're not intercepting any routes
}


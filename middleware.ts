import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Only redirect the guide page, as login and signup are now functional
  if (path === "/guide" || path === "/forgot-password") {
    // Redirect to the home page
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Continue with the request
  return NextResponse.next()
}

// Updated matcher to only target restricted pages
export const config = {
  matcher: ["/guide", "/forgot-password"],
}


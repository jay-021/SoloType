import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path is one of the auth pages that are temporarily disabled
  if (path === "/login" || path === "/signup" || path === "/guide" || path === "/forgot-password") {
    // Redirect to the home page
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Continue with the request
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/signup", "/guide", "/forgot-password"],
}


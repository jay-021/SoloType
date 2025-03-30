"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, LogIn, UserPlus } from "lucide-react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import AuthComingSoon from "@/components/auth-coming-soon"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuth()

  // Add state for the coming soon popup
  const [showAuthPopup, setShowAuthPopup] = useState(false)
  const [authPopupType, setAuthPopupType] = useState<"login" | "signup">("login")

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  // Function to show the coming soon popup
  const showComingSoon = (type: "login" | "signup") => {
    setAuthPopupType(type)
    setShowAuthPopup(true)
    setIsMenuOpen(false)
  }

  // Don't show header on auth pages
  if (pathname === "/login" || pathname === "/signup" || pathname === "/guide" || pathname === "/forgot-password") {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-solo-purple/20 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="solo-font text-2xl font-bold text-solo-purple-light glow-text transition-all duration-300 group-hover:scale-110">
              SoloType
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-solo-purple-light transition-colors">
            Home
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium hover:text-solo-purple-light transition-colors ${pathname === "/about" ? "text-solo-purple-light" : ""}`}
          >
            About
          </Link>
          <Link
            href="/custom-test"
            className={`text-sm font-medium hover:text-solo-purple-light transition-colors ${pathname === "/custom-test" ? "text-solo-purple-light" : ""}`}
          >
            Custom Test
          </Link>
          <Link
            href="/leaderboard"
            className={`text-sm font-medium hover:text-solo-purple-light transition-colors ${pathname === "/leaderboard" ? "text-solo-purple-light" : ""}`}
          >
            Leaderboard
          </Link>

          {/* Replace the auth buttons with coming soon buttons */}
          <Button
            variant="outline"
            className="border-solo-purple-light text-solo-purple-light hover:bg-solo-purple hover:text-white"
            onClick={() => showComingSoon("login")}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
          <Button
            className="bg-solo-purple hover:bg-solo-purple-dark text-white"
            onClick={() => showComingSoon("signup")}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? (
            <X className="h-6 w-6 text-solo-purple-light" />
          ) : (
            <Menu className="h-6 w-6 text-solo-purple-light" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-solo-black/95 backdrop-blur-lg border-b border-solo-purple/20 animate-fadeIn">
          <nav className="container flex flex-col py-4 gap-4">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium hover:bg-solo-purple/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium hover:bg-solo-purple/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/custom-test"
              className="px-4 py-2 text-sm font-medium hover:bg-solo-purple/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Custom Test
            </Link>
            <Link
              href="/leaderboard"
              className="px-4 py-2 text-sm font-medium hover:bg-solo-purple/20 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>

            <div className="flex flex-col gap-2 px-4 pt-2">
              {/* Replace the auth buttons with coming soon buttons */}
              <Button
                variant="outline"
                className="border-solo-purple-light text-solo-purple-light hover:bg-solo-purple hover:text-white w-full"
                onClick={() => showComingSoon("login")}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button
                className="bg-solo-purple hover:bg-solo-purple-dark text-white w-full"
                onClick={() => showComingSoon("signup")}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Auth Coming Soon Popup */}
      <AuthComingSoon isOpen={showAuthPopup} onClose={() => setShowAuthPopup(false)} type={authPopupType} />
    </header>
  )
}


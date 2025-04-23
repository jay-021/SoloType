'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn, UserPlus, LogOut, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  // Don't show header on auth pages
  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/guide' ||
    pathname === '/forgot-password'
  ) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-solo-purple/20 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="group flex items-center gap-2">
            <span className="solo-font glow-text text-2xl font-bold text-solo-purple-light transition-all duration-300 group-hover:scale-110">
              SoloType
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-solo-purple-light"
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-solo-purple-light ${pathname === '/about' ? 'text-solo-purple-light' : ''}`}
          >
            About
          </Link>
          <Link
            href="/custom-test"
            className={`text-sm font-medium transition-colors hover:text-solo-purple-light ${pathname === '/custom-test' ? 'text-solo-purple-light' : ''}`}
          >
            Custom Test
          </Link>
          <Link
            href="/leaderboard"
            className={`text-sm font-medium transition-colors hover:text-solo-purple-light ${pathname === '/leaderboard' ? 'text-solo-purple-light' : ''}`}
          >
            Leaderboard
          </Link>
          <Link
            href="/history"
            className={`text-sm font-medium transition-colors hover:text-solo-purple-light ${pathname === '/history' ? 'text-solo-purple-light' : ''}`}
          >
            History
          </Link>

          {isLoading ? (
            // Show loading state
            <div className="h-9 w-20 animate-pulse rounded-md bg-solo-purple/20"></div>
          ) : isAuthenticated && user ? (
            // Show user account dropdown when authenticated
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-solo-purple-light text-solo-purple-light hover:bg-solo-purple hover:text-white"
                >
                  <User className="mr-2 h-4 w-4" />
                  {user.username}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 border border-solo-purple/20 bg-solo-black"
              >
                <DropdownMenuLabel className="text-solo-purple-light">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-solo-purple/20" />
                <DropdownMenuItem className="cursor-pointer focus:bg-solo-purple/20 focus:text-white">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer focus:bg-solo-purple/20 focus:text-white">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-solo-purple/20" />
                <DropdownMenuItem
                  className="cursor-pointer text-red-500 focus:bg-red-900/20 focus:text-red-400"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // Show auth buttons when not authenticated
            <>
              <Button
                variant="outline"
                className="border-solo-purple-light text-solo-purple-light hover:bg-solo-purple hover:text-white"
                asChild
              >
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button
                className="bg-solo-purple text-white hover:bg-solo-purple-dark"
                asChild
              >
                <Link href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-solo-purple-light" />
          ) : (
            <Menu className="h-6 w-6 text-solo-purple-light" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-16 animate-fadeIn border-b border-solo-purple/20 bg-solo-black/95 backdrop-blur-lg md:hidden">
          <nav className="container flex flex-col gap-4 py-4">
            <Link
              href="/"
              className="rounded-md px-4 py-2 text-sm font-medium hover:bg-solo-purple/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="rounded-md px-4 py-2 text-sm font-medium hover:bg-solo-purple/20"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/custom-test"
              className="rounded-md px-4 py-2 text-sm font-medium hover:bg-solo-purple/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Custom Test
            </Link>
            <Link
              href="/leaderboard"
              className="rounded-md px-4 py-2 text-sm font-medium hover:bg-solo-purple/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link
              href="/history"
              className="rounded-md px-4 py-2 text-sm font-medium hover:bg-solo-purple/20"
              onClick={() => setIsMenuOpen(false)}
            >
              History
            </Link>

            <div className="flex flex-col gap-2 px-4 pt-2">
              {isAuthenticated && user ? (
                // Show user info and logout button when authenticated
                <>
                  <div className="flex items-center gap-2 px-2 py-1">
                    <User className="h-4 w-4 text-solo-purple-light" />
                    <span className="text-sm font-medium">{user.username}</span>
                  </div>
                  <Button
                    variant="destructive"
                    className="w-full bg-red-900/20 text-red-500 hover:bg-red-900/40 hover:text-red-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </>
              ) : (
                // Show auth buttons when not authenticated
                <>
                  <Button
                    variant="outline"
                    className="w-full border-solo-purple-light text-solo-purple-light hover:bg-solo-purple hover:text-white"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                  <Button
                    className="w-full bg-solo-purple text-white hover:bg-solo-purple-dark"
                    asChild
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link href="/signup">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

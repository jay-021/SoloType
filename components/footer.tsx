import Link from 'next/link';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-solo-purple/20 bg-solo-black/50 backdrop-blur-sm">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="solo-font text-xl font-bold text-solo-purple-light">
              SoloType
            </h3>
            <p className="text-sm text-gray-300">
              Level up your typing skills with our Solo Leveling themed typing
              test website.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-300 hover:text-solo-purple-light"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-solo-purple-light"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-solo-purple-light"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-solo-purple-light"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-300 hover:text-solo-purple-light"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-300 hover:text-solo-purple-light"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-test"
                  className="text-sm text-gray-300 hover:text-solo-purple-light"
                >
                  Custom Test
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-sm text-gray-300 hover:text-solo-purple-light"
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-300 hover:text-solo-purple-light"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/tips"
                  className="text-sm text-gray-300 hover:text-solo-purple-light"
                >
                  Typing Tips
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-gray-300 hover:text-solo-purple-light"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-300 hover:text-solo-purple-light"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-gray-300 hover:text-solo-purple-light"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-gray-300 hover:text-solo-purple-light"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-gray-300 hover:text-solo-purple-light"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-solo-purple/20 pt-8 text-center text-sm text-gray-300">
          <p>© {new Date().getFullYear()} SoloType. All rights reserved.</p>
          <p className="mt-2">
            Solo Leveling is a trademark of D&C Media Co., Ltd. This is a fan
            project and is not affiliated with the official Solo Leveling
            franchise.
          </p>
        </div>
      </div>
    </footer>
  );
}

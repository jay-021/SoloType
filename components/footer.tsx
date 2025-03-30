import Link from "next/link"
import { Facebook, Twitter, Instagram, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-solo-purple/20 bg-solo-black/50 backdrop-blur-sm">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="solo-font text-xl font-bold text-solo-purple-light">SoloType</h3>
            <p className="text-sm text-gray-300">
              Level up your typing skills with our Solo Leveling themed typing test website.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-solo-purple-light">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-solo-purple-light">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-solo-purple-light">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-solo-purple-light">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-solo-purple-light text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-solo-purple-light text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/custom-test" className="text-gray-300 hover:text-solo-purple-light text-sm">
                  Custom Test
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-300 hover:text-solo-purple-light text-sm">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-solo-purple-light text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tips" className="text-gray-300 hover:text-solo-purple-light text-sm">
                  Typing Tips
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-solo-purple-light text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-solo-purple-light text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-solo-purple-light text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-solo-purple-light text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-300 hover:text-solo-purple-light text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-solo-purple/20 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>© {new Date().getFullYear()} SoloType. All rights reserved.</p>
          <p className="mt-2">
            Solo Leveling is a trademark of D&C Media Co., Ltd. This is a fan project and is not affiliated with the
            official Solo Leveling franchise.
          </p>
        </div>
      </div>
    </footer>
  )
}


import type React from "react"
import "../globals.css"
import "../auth.css"

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


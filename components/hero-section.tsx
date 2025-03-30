import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 relative z-10">
          <h1 className="solo-font text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter glow-text animate-float">
            Level Up Your Typing Skills!
          </h1>
          <p className="max-w-[700px] text-lg md:text-xl text-gray-300 animate-fadeIn">
            Take typing tests, improve your speed and accuracy, and unlock new levels of proficiency!
          </p>
          <Button
            asChild
            size="lg"
            className="mt-6 bg-solo-purple hover:bg-solo-purple-dark text-white text-lg px-8 py-6 glow-box animate-fadeIn"
          >
            <Link href="/test">Start Your Quest</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}


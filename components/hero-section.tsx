import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="relative z-10 flex flex-col items-center space-y-8 text-center">
          <h1 className="solo-font glow-text animate-float text-4xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
            Level Up Your Typing Skills!
          </h1>
          <p className="max-w-[700px] animate-fadeIn text-lg text-gray-300 md:text-xl">
            Take typing tests, improve your speed and accuracy, and unlock new
            levels of proficiency!
          </p>
          <Button
            asChild
            size="lg"
            className="glow-box mt-6 animate-fadeIn bg-solo-purple px-8 py-6 text-lg text-white hover:bg-solo-purple-dark"
          >
            <Link href="/test">Start Your Quest</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

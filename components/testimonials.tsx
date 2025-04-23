'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Since I started using SoloType, my typing speed has increased from 45 WPM to over 90 WPM. The leveling system keeps me motivated to improve every day!',
    author: 'Jin-Woo Sung',
    title: 'E-Rank Hunter',
  },
  {
    quote:
      'The daily challenges are addictive! I find myself coming back every day to maintain my streak and climb the leaderboard rankings.',
    author: 'Cha Hae-In',
    title: 'S-Rank Hunter',
  },
  {
    quote:
      'As a programmer, typing speed is crucial for my productivity. SoloType has helped me become much more efficient at work.',
    author: 'Go Gun-Hee',
    title: 'Hunter Association Chairman',
  },
  {
    quote:
      'The Solo Leveling theme makes practicing typing so much more enjoyable than other boring typing websites. I love the animations!',
    author: 'Yoo Jin-Ho',
    title: 'C-Rank Hunter',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const next = () => {
    setCurrent((current + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(interval);
  }, [current, autoplay]);

  return (
    <section className="bg-solo-black py-20 backdrop-blur-sm">
      <div className="container px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center space-y-4 text-center">
          <h2 className="solo-font glow-text text-3xl font-bold tracking-tighter md:text-4xl">
            What Users Say
          </h2>
          <p className="max-w-[700px] text-gray-300">
            Hear from our community of typing enthusiasts
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div
            className="rounded-lg border border-solo-purple/20 bg-gradient-to-b from-solo-darkgray/50 to-transparent p-8 shadow-[0_0_15px_rgba(139,92,246,0.1)] md:p-12"
            onMouseEnter={() => setAutoplay(false)}
            onMouseLeave={() => setAutoplay(true)}
          >
            <Quote className="mb-4 h-12 w-12 text-solo-purple-light opacity-50" />
            <blockquote className="mb-6 text-xl italic md:text-2xl">
              "{testimonials[current].quote}"
            </blockquote>
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">
                {testimonials[current].author}
              </p>
              <p className="text-solo-purple-light">
                {testimonials[current].title}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={prev}
              className="rounded-full border border-solo-purple/30 bg-solo-black p-2 transition-colors hover:bg-solo-darkgray"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-solo-purple-light" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-3 w-3 rounded-full ${index === current ? 'bg-solo-purple-light' : 'bg-solo-purple/30'}`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="rounded-full border border-solo-purple/30 bg-solo-black p-2 transition-colors hover:bg-solo-darkgray"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-solo-purple-light" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

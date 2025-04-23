'use client';

import { useEffect, useState } from 'react';
import { useTypingSpeed } from '@/context/typing-speed-context';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { typingSpeed } = useTypingSpeed();

  useEffect(() => {
    // Create particles only on client side
    const newParticles: Particle[] = [];
    const colors =
      typingSpeed === 'fast'
        ? ['#3B82F6', '#60A5FA', '#93C5FD'] // Blue colors for fast typing
        : ['#8B5CF6', '#A78BFA', '#C4B5FD']; // Purple colors for slow typing

    // Adjust particle count based on typing speed
    const particleCount = typingSpeed === 'fast' ? 40 : 30;

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + (typingSpeed === 'fast' ? 2 : 1), // Faster for fast typing
        opacity: Math.random() * 0.3 + 0.05,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles(newParticles);
  }, [typingSpeed]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-particles rounded-full"
          style={{
            left: `${particle.x}%`,
            bottom: '-10px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            animationDuration: `${20 + particle.speed * 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

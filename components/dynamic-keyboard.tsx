'use client';

import { useEffect, useRef } from 'react';

// Define the Particle class shape
interface ParticleType {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  alpha: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

interface DynamicKeyboardProps {
  activeKeys: string[];
  typingSpeed: 'slow' | 'fast';
}

export default function DynamicKeyboard({
  activeKeys,
  typingSpeed,
}: DynamicKeyboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ParticleType[]>([]);
  const requestRef = useRef<number>();

  // Keyboard layout
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    ['space'],
  ];

  // Setup canvas for particle effects
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const keyboardContainer = canvas.parentElement;
      if (keyboardContainer) {
        canvas.width = keyboardContainer.clientWidth;
        canvas.height = keyboardContainer.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;

      constructor(x: number, y: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * size + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * -3 - 1; // Always move upward
        this.color = color;
        this.alpha = 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.02;
        this.size -= 0.1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        particlesRef.current[i].update();
        particlesRef.current[i].draw(ctx);

        // Remove particles that are too small or transparent
        if (
          particlesRef.current[i].size <= 0.5 ||
          particlesRef.current[i].alpha <= 0
        ) {
          particlesRef.current.splice(i, 1);
          i--;
        }
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Create particles when keys are pressed
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const keyElements = document.querySelectorAll('.key');

    activeKeys.forEach((key) => {
      const keyElement = Array.from(keyElements).find(
        (el) =>
          el.textContent?.toLowerCase() === key.toUpperCase() ||
          (key === 'space' && el.textContent === 'Space')
      ) as HTMLElement;

      if (keyElement) {
        const rect = keyElement.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        // Calculate position relative to canvas
        const x = rect.left + rect.width / 2 - canvasRect.left;
        const y = rect.top + rect.height / 2 - canvasRect.top;

        // Create particles
        const particleCount = typingSpeed === 'fast' ? 8 : 5;
        const particleSize = typingSpeed === 'fast' ? 4 : 3;
        const particleColor =
          typingSpeed === 'fast'
            ? 'rgba(59, 130, 246, 0.8)'
            : 'rgba(139, 92, 246, 0.8)';

        for (let i = 0; i < particleCount; i++) {
          const particle = new Particle(x, y, particleSize, particleColor);
          particlesRef.current.push(particle);
        }
      }
    });
  }, [activeKeys, typingSpeed]);

  return (
    <div className="keyboard-container relative mt-8">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10"
      />
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            const isActive = activeKeys.includes(key);
            const keyClass = `key ${key === 'space' ? 'space' : ''} ${isActive ? 'active' : ''}`;
            const glowClass = isActive
              ? typingSpeed === 'fast'
                ? 'key-glow-blue'
                : 'key-glow-purple'
              : '';

            return (
              <div
                key={key}
                className={`${keyClass} ${glowClass} transition-all duration-300`}
              >
                {key === 'space' ? 'Space' : key.toUpperCase()}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

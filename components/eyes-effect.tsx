'use client';

import { useEffect, useState } from 'react';
import { useTypingSpeed } from '@/context/typing-speed-context';

export default function EyesEffect() {
  const [visible, setVisible] = useState(false);
  const { typingSpeed } = useTypingSpeed();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show eyes after scrolling a bit
      if (scrollPosition > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    // Initial check
    handleScroll();

    // Add event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`eyes-container ${visible ? 'visible' : ''}`}>
      <div
        className={`eye eye-left ${typingSpeed === 'fast' ? 'eye-blue' : ''}`}
        style={{
          transition: 'all 1s ease-in-out',
          background:
            typingSpeed === 'fast'
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0) 70%)'
              : 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0) 70%)',
          boxShadow:
            typingSpeed === 'fast'
              ? '0 0 20px 10px rgba(59, 130, 246, 0.3)'
              : '0 0 20px 10px rgba(139, 92, 246, 0.3)',
        }}
      ></div>
      <div
        className={`eye eye-right ${typingSpeed === 'fast' ? 'eye-blue' : ''}`}
        style={{
          transition: 'all 1s ease-in-out',
          background:
            typingSpeed === 'fast'
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0) 70%)'
              : 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(59, 130, 246, 0) 70%)',
          boxShadow:
            typingSpeed === 'fast'
              ? '0 0 20px 10px rgba(59, 130, 246, 0.3)'
              : '0 0 20px 10px rgba(59, 130, 246, 0.3)',
        }}
      ></div>
    </div>
  );
}

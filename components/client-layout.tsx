'use client';

import React from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import ParticleBackground from '@/components/particle-background';
import EyesEffect from '@/components/eyes-effect';
import { TypingSpeedProvider } from '@/context/typing-speed-context';
import { AuthProvider } from '@/context/auth-context';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AuthProvider>
        <TypingSpeedProvider>
          <div className="main-wrapper relative min-h-screen">
            <ParticleBackground />
            <EyesEffect />
            <div className="content-layer relative z-10 flex min-h-screen flex-col">
              <Header />
              <main className="content-wrapper flex-1">{children}</main>
              <Footer />
            </div>
          </div>
        </TypingSpeedProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

import type React from 'react';
import '../globals.css';
import '../auth.css';

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import './globals.css';
import React from 'react';

export const metadata = {
  title: 'UIOS Studio | AI-Powered Modular UI/UX Intelligence System',
  description: 'Orchestration workbench for designing world-class user interfaces with decomposed specialist AI engines.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#08090a] text-[#f7f8f8] antialiased">
        {children}
      </body>
    </html>
  );
}

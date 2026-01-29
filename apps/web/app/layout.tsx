import { Databuddy } from '@databuddy/sdk/react';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Suspense } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Email Renderer',
  description: 'HTML or React Email renderer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-800 antialiased">
        <Suspense>{children}</Suspense>
        <Databuddy clientId="b7fc05bc-70ca-4c88-9a37-085b81593113" />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

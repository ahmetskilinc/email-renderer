import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { Databuddy } from "@databuddy/sdk/react";

export const metadata: Metadata = {
  title: "Email Renderer",
  description: "HTML or React Email renderer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-800">
        <Suspense>{children}</Suspense>
        <Databuddy
          clientId="b7fc05bc-70ca-4c88-9a37-085b81593113" />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

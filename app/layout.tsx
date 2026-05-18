import type { Metadata, Viewport } from "next";
import { LanguageProvider } from "@/hooks/use-language";
import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "A Next.js application",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

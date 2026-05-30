import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CSI Website',
  description: 'Computer Science Institute - Your gateway to technology education',
  keywords: ['computer science', 'technology', 'education', 'CSI'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}

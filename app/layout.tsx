import type { Metadata } from "next";
import { Geist, Geist_Mono, Kanit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/hooks/use-language";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aphisit Danchaodang - Full Stack Developer Portfolio",
  description: "Full Stack Web Developer and Programmer specializing in modern web technologies",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read preferred language from cookie on the server to keep SSR and CSR in sync
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value;
  const initialLanguage = langCookie === "th" ? "th" : "en";
  // Note: we can't use hooks here (server component), so we set lang dynamically on client via script
  return (
    <html lang={initialLanguage}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);var e=document.documentElement;e.classList[d?'add':'remove']('dark');}catch(e){}})();",
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} antialiased`}>
        <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>
      </body>
    </html>
  );
}

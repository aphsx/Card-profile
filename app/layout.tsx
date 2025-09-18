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
  const themeCookie = cookieStore.get("theme")?.value;
  const initialLanguage = langCookie === "th" ? "th" : "en";
  
  // Determine initial theme - prefer cookie, fallback to light for SSR consistency
  const initialTheme = themeCookie || "light";
  
  return (
    <html lang={initialLanguage} className={initialTheme === "dark" ? "dark" : ""}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var theme = localStorage.getItem('theme') || document.cookie.split(';').find(row => row.trim().startsWith('theme='))?.split('=')[1] || 'light';
                  var prefersDark = !theme && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = theme === 'dark' || prefersDark;
                  document.documentElement.classList.toggle('dark', isDark);
                  // Sync cookie if using localStorage
                  if (localStorage.getItem('theme') && localStorage.getItem('theme') !== theme) {
                    document.cookie = 'theme=' + localStorage.getItem('theme') + '; path=/; max-age=' + (60*60*24*365);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} antialiased`}>
        <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>
      </body>
    </html>
  );
}

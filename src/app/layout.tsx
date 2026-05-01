import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aurelius Private Equity | Wealth Management Dashboard",
  description:
    "Premium wealth management platform for ultra-high-net-worth individuals.",
};

import { ToastContainer, DocumentPreviewer } from "@/components/ui/Feedback";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
          <ToastContainer />
          <DocumentPreviewer />
        </ThemeProvider>
      </body>
    </html>
  );
}

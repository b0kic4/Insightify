import type { Metadata } from "next";
import "./globals.css";
import { Libre_Franklin } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Toaster } from "@/components/ui/toaster";
import Providers from "./providers";

const libre = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Insightify",
  description: "AI Website Analyzer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Analytics />
      <SpeedInsights/>
      <body className={`${libre.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MindWell - Mental Health Wellness Platform",
  description: "Connecting students with mental health professionals through an intuitive platform. Track your mood, book appointments, access resources, and prioritize your mental well-being.",
  keywords: ["MindWell", "Mental Health", "Wellness", "Students", "Doctors", "Therapy", "Counseling", "Smart India Hackathon"],
  authors: [{ name: "MindWell Team" }],
  openGraph: {
    title: "MindWell - Mental Health Wellness Platform",
    description: "Your comprehensive mental health wellness platform for students and professionals.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MindWell - Mental Health Wellness Platform",
    description: "Connecting students with mental health professionals through an intuitive platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ThemeToggle />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

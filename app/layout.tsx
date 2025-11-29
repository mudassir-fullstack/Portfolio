import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import Resume from "@/components/resume";
import { ThemeProvider } from "@/hooks/useThemeContext";

// ✅ Professional fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// ✅ SEO-optimized metadata for portfolio
export const metadata: Metadata = {
  title: "Muhammad Mudassir | Full Stack Developer (Next.js, MERN, React)",
  description:
    "Welcome to the portfolio of Muhammad Mudassir — a professional Full Stack Developer specializing in Next.js, React, Node.js, and MongoDB. Explore my projects, achievements, and development expertise.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
    keywords: [
    "Muhammad Mudassir",
    "Full Stack Developer",
    "Next.js Developer",
    "MERN Developer",
    "React Developer",
    "Web Developer Pakistan",
    "Frontend Developer",
    "Backend Developer",
    "Node.js Developer",
    "MongoDB",
    "JavaScript Engineer",
    "Software Engineer",
    "Portfolio Website",
  ],
  authors: [{ name: "Muhammad Mudassir", url: "https://www.linkedin.com/in/muhammad-mudassir-31873138a" }],
  creator: "Muhammad Mudassir",
  publisher: "Muhammad Mudassir",
  metadataBase: new URL("https://mudassir-fullstack-portfolio.vercel.app/"),
  openGraph: {
    title: "Muhammad Mudassir | Full Stack Developer Portfolio",
    description:
      "Explore the portfolio of Muhammad Mudassir — a Full Stack Developer passionate about modern web development using Next.js, React, Node.js, and MongoDB.",
    url: "https://mudassir-fullstack-portfolio.vercel.app/",
    siteName: "Muhammad Mudassir Portfolio",
   
    images: [
      {
        url: "https://mudassir-fullstack-portfolio.vercel.app/", 
        width: 1200,
        height: 630,
        alt: "Muhammad Mudassir Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Mudassir | Full Stack Developer",
    description:
      "Discover Muhammad Mudassir’s portfolio — Full Stack Developer skilled in Next.js, React, Node.js, and MongoDB.",
    creator: "@mudassirdev", // add your handle if available
    images: ["https://mudassir-fullstack-portfolio.vercel.app//og-image.jpg"],
  },
  alternates: {
    canonical: "https://mudassir-fullstack-portfolio.vercel.app/",
  },
  verification: {
    me: "https://www.linkedin.com/in/muhammad-mudassir-31873138a",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${firaCode.variable}  container font-sans antialiased 
          bg-#231917 transition-colors duration-300`}
      >
        <ThemeProvider> 
          <Resume />
          {children}
          </ThemeProvider>
      </body>
    </html>
  );
}

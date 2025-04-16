import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { QueryProvider } from "@/components/providers/query-provider"
import { Toaster } from "@/components/ui/toast"

const inter = Inter({ subsets: ["latin"] })

// SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://faangcode.vercel.app"),
  title: {
    default: "AceCode – Crack FAANG Interviews with Real Company Questions",
    template: "%s | AceCode",
  },
  description:
    "Discover company-wise LeetCode questions, curated coding resources, and nearby hackathons. Your all-in-one prep dashboard for cracking coding interviews.",
  keywords: [
    "FAANG",
    "LeetCode",
    "Coding Interview",
    "Coding Questions",
    "Company-wise problems",
    "Software Engineer Prep",
    "Hackathons",
    "Code Challenges",
    "Interview Preparation",
    "Tech Interview",
  ],
  authors: [{ name: "AceCode Team" }],
  creator: "AceCode",
  publisher: "AceCode",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://faangcode.vercel.app/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://faangcode.vercel.app/",
    title: "AceCode – Crack FAANG Interviews with Real Company Questions",
    description:
      "Discover company-wise LeetCode questions, curated coding resources, and nearby hackathons. Your all-in-one prep dashboard for cracking coding interviews.",
    siteName: "AceCode",
    images: [
      {
        url: "https://faangcode.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "AceCode - Your coding interview preparation platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AceCode – Crack FAANG Interviews with Real Company Questions",
    description:
      "Discover company-wise LeetCode questions, curated coding resources, and nearby hackathons. Your all-in-one prep dashboard for cracking coding interviews.",
    images: ["https://faangcode.vercel.app/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "cSIEEuj6dNGbJFOCiNwZf9Ir1RMeWjJ_qdGWRmHtYDw",
  },
  category: "technology",
}

// Viewport metadata
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://faangcode.vercel.app/#organization",
                  name: "AceCode",
                  url: "https://faangcode.vercel.app/",
                  logo: {
                    "@type": "ImageObject",
                    "@id": "https://faangcode.vercel.app/#logo",
                    inLanguage: "en-US",
                    url: "https://faangcode.vercel.app/logo.png",
                    contentUrl: "https://faangcode.vercel.app/logo.png",
                    width: 512,
                    height: 512,
                    caption: "AceCode",
                  },
                  image: {
                    "@id": "https://faangcode.vercel.app/#logo",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://faangcode.vercel.app/#website",
                  url: "https://faangcode.vercel.app/",
                  name: "AceCode",
                  description:
                    "Discover company-wise LeetCode questions, curated coding resources, and nearby hackathons. Your all-in-one prep dashboard for cracking coding interviews.",
                  publisher: {
                    "@id": "https://faangcode.vercel.app/#organization",
                  },
                  potentialAction: [
                    {
                      "@type": "SearchAction",
                      target: {
                        "@type": "EntryPoint",
                        urlTemplate: "https://faangcode.vercel.app/search?q={search_term_string}",
                      },
                      "query-input": "required name=search_term_string",
                    },
                  ],
                  inLanguage: "en-US",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <AuthProvider>
              <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Toaster />
              </div>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

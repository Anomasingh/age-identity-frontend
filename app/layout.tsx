import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI-Based ID & Age Verifier",
  description: "Verify age and identity with AI-powered OCR and face matching technology",
  keywords: "age verification, identity verification, AI, OCR, face matching, Aadhar",
  authors: [{ name: "AI Verifier Team" }],
  openGraph: {
    title: "AI-Based ID & Age Verifier",
    description: "Secure age and identity verification using advanced AI technology",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

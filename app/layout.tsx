import { Outfit } from "next/font/google";
import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '../src/components/providers/AuthProvider'
import { Toaster } from '@/components/ui/sonner'
import { Toaster as ToastToaster } from '@/components/ui/toaster'

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: 'HackPlatform - Host & Join Amazing Hackathons',
  description: 'A comprehensive platform for hosting hackathons, managing events, and funding innovative projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
          {children}
          <Toaster />
          <ToastToaster />
       
      </body>
    </html>
  )
}
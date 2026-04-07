import type { Metadata } from 'next'
import { MedievalSharp, Cinzel } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const medievalSharp = MedievalSharp({ 
  weight: '400',
  subsets: ["latin"],
  variable: '--font-medieval'
});

const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: '--font-cinzel'
});

export const metadata: Metadata = {
  title: 'Ancient Realm - Enter the Portal',
  description: 'A dark fantasy medieval login interface',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${medievalSharp.variable} ${cinzel.variable}`}>
      <body className="font-sans antialiased overflow-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

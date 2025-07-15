import './globals.css'
import type { Metadata } from 'next'
import { Inter, Sora, Roboto_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { SmoothScrollProvider } from '@/components/providers/smooth-scroll-provider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({ 
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Gaba | Software Engineer',
  description: 'Writing code & playing games. Building web apps, games, and tools.',
  keywords: ['Software Engineer', 'Web Developer', 'Game Development', 'Portfolio', 'React', 'Gaming'],
  authors: [{ name: 'Sébastien Gimenez', url: 'https://gabadev.com' }],
  creator: 'Sébastien Gimenez',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gabadev.com',
    title: 'Gaba | Software Engineer',
    description: 'Writing code & playing games. Building web apps, games, and tools.',
    siteName: 'Sébastien Gimenez Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sébastien Gimenez Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gaba | Software Engineer',
    description: 'Writing code & playing games. Building web apps, games, and tools.',
    creator: '@MetaForgeLol',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#6d28d9',
      },
    ],
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://gabadev.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} ${robotoMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

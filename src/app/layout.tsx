import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Upload Image to Convert to PDF - Free and Easy',
  description:
    'Upload your image document and convert it to PDF for free! Fast and easy image to PDF conversion.',
  keywords: 'image to PDF, PDF conversion, free PDF converter, image converter',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  authors: {
    name: 'Shlomi Nugarker',
    url: 'https://shlomi-nugarker-portfolio.vercel.app/',
  },
  applicationName: 'JPEG to PDF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://image-to-pdf-free.vercel.app/" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

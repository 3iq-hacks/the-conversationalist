import { Flowbite, ThemeModeScript } from 'flowbite-react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Conversationalist',
  description: 'Meet your favourite celebrity. Talk to anime girls. We don\'t discriminate.',
  icons: '/imgs/favicon.png',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
        <link rel="icon" href="/imgs/favicon.png" />
      </head>
      <body className='min-h-screen flex flex-col'>
        <Flowbite>
          <Navbar />
          {children}
        </Flowbite>
      </body>
    </html>
  )
}

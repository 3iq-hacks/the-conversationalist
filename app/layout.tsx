import { Flowbite, ThemeModeScript } from 'flowbite-react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
        <title>HackED 2024</title>
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

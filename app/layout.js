import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata = {
  title: 'Smart School - Zamonaviy Ta\'lim Platformasi',
  description: 'Professional raqamli maktab platformasi - Smart School Ecosystem',
  keywords: 'maktab, ta\'lim, smart school, education',
}

export default function RootLayout({ children }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
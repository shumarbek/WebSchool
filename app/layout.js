import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'

export const metadata = {
  title: 'Smart School - Zamonaviy Ta\'lim Platformasi',
  description: 'Professional raqamli maktab platformasi - Smart School Ecosystem',
  keywords: 'maktab, ta\'lim, smart school, education',
}

export default function RootLayout({ children }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

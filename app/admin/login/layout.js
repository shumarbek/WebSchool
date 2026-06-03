import ThemeProvider from '@/components/ThemeProvider'

export default function LoginLayout({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}

export const metadata = {
  title: 'Admin Login - DOSOV',
}
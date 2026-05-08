import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NewsLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
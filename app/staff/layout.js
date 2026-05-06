import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function StaffLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
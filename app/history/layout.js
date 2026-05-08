import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function HistoryLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
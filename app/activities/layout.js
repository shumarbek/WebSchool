import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ActivitiesLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
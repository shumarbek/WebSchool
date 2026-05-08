import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AchievementsLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
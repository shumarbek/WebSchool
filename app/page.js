import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import News from '@/components/News'
import Achievements from '@/components/Achievements'
import Activities from '@/components/Activities'
import Staff from '@/components/Staff'
import History from '@/components/History'
import Library from '@/components/Library'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <News />
      <Achievements />
      <Activities />
      <Staff featuredOnly />
      <Library />
      <History />
      <Contact />
      <Footer />
      <AIAssistant />
    </main>
  )
}

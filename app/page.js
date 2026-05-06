'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import News from '@/components/News'
import Achievements from '@/components/Achievements'
import Activities from '@/components/Activities'
import Staff from '@/components/Staff'
import History from '@/components/History'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className={`min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <Hero />
      <Stats />
      <News />
      <Achievements />
      <Activities />
      <Staff />
      <History />
      <Contact />
      <Footer />
      <AIAssistant />
    </main>
  )
}
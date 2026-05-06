'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import News from '@/components/News'
import Achievements from '@/components/Achievements'
import Activities from '@/components/Activities'
import Staff from '@/components/Staff'
import History from '@/components/History'
import Dashboard from '@/components/Dashboard'
import Schedule from '@/components/Schedule'
import Library from '@/components/Library'
import Map from '@/components/Map'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import AIAssistant from '@/components/AIAssistant'

const lazyComponents = {
  Stats: dynamic(() => import('@/components/Stats'), { ssr: false }),
  News: dynamic(() => import('@/components/News'), { ssr: false }),
  Achievements: dynamic(() => import('@/components/Achievements'), { ssr: false }),
  Activities: dynamic(() => import('@/components/Activities'), { ssr: false }),
  Staff: dynamic(() => import('@/components/Staff'), { ssr: false }),
  History: dynamic(() => import('@/components/History'), { ssr: false }),
  Dashboard: dynamic(() => import('@/components/Dashboard'), { ssr: false }),
  Schedule: dynamic(() => import('@/components/Schedule'), { ssr: false }),
  Library: dynamic(() => import('@/components/Library'), { ssr: false }),
  Map: dynamic(() => import('@/components/Map'), { ssr: false }),
  Contact: dynamic(() => import('@/components/Contact'), { ssr: false }),
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className={`min-h-screen transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Navbar />
      <Hero />
      
      <lazyComponents.Stats />
      <lazyComponents.News />
      <lazyComponents.Achievements />
      <lazyComponents.Activities />
      <lazyComponents.Staff />
      <lazyComponents.History />
      <lazyComponents.Dashboard />
      <lazyComponents.Schedule />
      <lazyComponents.Library />
      <lazyComponents.Map />
      <lazyComponents.Contact />
      
      <Footer />
      <AIAssistant />
    </main>
  )
}
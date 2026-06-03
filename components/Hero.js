'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

const fallbackHero = {
  title: 'DOSOV Maktabi',
  subtitle: "Zamonaviy ta'lim va ochiq boshqaruv platformasi",
  cta_text: 'Yangiliklar',
  cta_link: '#news',
  background_type: 'gradient',
}

export default function Hero() {
  const [hero, setHero] = useState(fallbackHero)
  const supabase = createClient()

  useEffect(() => {
    async function loadHero() {
      const { data } = await supabase
        .from('hero_settings')
        .select('*')
        .eq('is_active', true)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (data) setHero({ ...fallbackHero, ...data })
    }

    loadHero()
  }, [])

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      {hero.background_type === 'image' && hero.background_url ? (
        <img src={hero.background_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : hero.background_type === 'video' && hero.video_url ? (
        <video src={hero.video_url} className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.14),transparent_28%),linear-gradient(135deg,var(--bg-primary),var(--bg-secondary))]" />
      )}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/65" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-left">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Maktab boshqaruv platformasi</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6 text-5xl font-bold leading-tight text-gray-950 dark:text-white lg:text-7xl">
            {hero.title}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            {hero.subtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link href={hero.cta_link || '#news'} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent-purple px-8 py-4 font-semibold text-white shadow-lg shadow-primary/25">
              {hero.cta_text || 'Batafsil'}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

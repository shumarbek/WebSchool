'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Camera, GraduationCap, Mail, MapPin, Phone, PlayCircle, Send } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

const footerLinks = {
  platform: {
    title: 'Platforma',
    links: [
      { name: 'Bosh sahifa', href: '#home' },
      { name: 'Yangiliklar', href: '#news' },
      { name: 'Yutuqlar', href: '#achievements' },
      { name: 'Faoliyat', href: '/activities' },
      { name: 'Tarix', href: '/history' },
    ],
  },
  services: {
    title: 'Xizmatlar',
    links: [
      { name: 'Hodimlar', href: '/staff' },
      { name: 'Dars jadvali', href: '/schedule' },
      { name: 'Kutubxona', href: '/library' },
    ],
  },
}

export default function Footer() {
  const [settings, setSettings] = useState({})
  const supabase = createClient()

  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase.from('platform_settings').select('*').limit(1).maybeSingle()
      setSettings(data || {})
    }

    loadSettings()
  }, [])

  const contacts = useMemo(() => [
    settings.address && { icon: MapPin, text: settings.address, href: settings.address_map_url || mapSearchUrl(settings.address) },
    settings.phone && { icon: Phone, text: settings.phone },
    settings.email && { icon: Mail, text: settings.email },
  ].filter(Boolean), [settings])

  const socials = [
    { icon: Send, href: settings.telegram_url, label: 'Telegram' },
    { icon: Camera, href: settings.instagram_url, label: 'Instagram' },
    { icon: PlayCircle, href: settings.youtube_url, label: 'YouTube' },
  ].filter((item) => item.href)

  return (
    <footer className="bg-dark-50 dark:bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">DOSOV</span>
                <p className="text-xs text-gray-400">Zamonaviy Ta'lim</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">Zamonaviy ta'lim platformasi.</p>
            <div className="space-y-3">
              {contacts.length ? contacts.map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-gray-400">
                  <item.icon className="w-4 h-4" />
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="text-sm hover:text-primary">{item.text}</a>
                  ) : (
                    <span className="text-sm">{item.text}</span>
                  )}
                </div>
              )) : <p className="text-sm text-gray-400">Aloqa ma'lumotlari hali kiritilmagan.</p>}
            </div>
            {socials.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socials.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="rounded-lg bg-white/10 p-2 text-gray-300 hover:text-primary" title={item.label}>
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </motion.div>

          {Object.entries(footerLinks).map(([key, section], index) => (
            <motion.div key={key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index + 1) * 0.1 }}>
              <h3 className="text-white font-bold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© 2026 DOSOV. Barcha huquqlar himoyalangan.</p>
          <p className="text-sm text-gray-400">
            Platforma{' '}
            <a href="https://shumarbek.netlify.app" target="_blank" rel="noreferrer" className="font-medium text-primary hover:underline">
              ShUmarbek
            </a>{' '}
            tomonidan ishlab chiqilgan
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

function mapSearchUrl(address) {
  if (!address?.trim()) return ''
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.trim())}`
}

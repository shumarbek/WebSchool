'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Clock, Mail, MapPin, Phone, PlayCircle, Send } from 'lucide-react'
import { createClient } from '@/lib/supabase'

export default function Contact() {
  const [settings, setSettings] = useState({})
  const supabase = createClient()

  useEffect(() => {
    async function loadSettings() {
      const { data } = await supabase.from('platform_settings').select('*').limit(1).maybeSingle()
      setSettings(data || {})
    }

    loadSettings()
  }, [])

  const contactInfo = useMemo(() => [
    { icon: MapPin, label: 'Manzil', value: settings.address || 'Manzil hali kiritilmagan', href: settings.address ? settings.address_map_url || mapSearchUrl(settings.address) : null },
    { icon: Phone, label: 'Telefon', value: settings.phone || 'Telefon hali kiritilmagan', href: settings.phone ? `tel:${settings.phone.replace(/\s/g, '')}` : null },
    { icon: Mail, label: 'Email', value: settings.email || 'Email hali kiritilmagan', href: settings.email ? `mailto:${settings.email}` : null },
    { icon: Clock, label: 'Ish vaqti', value: 'Dush-Jum: 08:00-18:00', href: null },
  ], [settings])

  const socials = [
    { name: 'Telegram', icon: Send, href: settings.telegram_url },
    { name: 'Instagram', icon: Camera, href: settings.instagram_url },
    { name: 'YouTube', icon: PlayCircle, href: settings.youtube_url },
  ].filter((item) => item.href)

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-dark-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Biz bilan <span className="gradient-text">Bog'lanish</span></h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Savollar yoki takliflar bo'lsa, biz bilan bog'laning</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">Bog'lanish ma'lumotlari</h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent-purple flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    {item.href ? <a href={item.href} className="font-medium hover:text-primary transition-colors">{item.value}</a> : <p className="font-medium">{item.value}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
            {socials.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 mb-4">Ijtimoiy tarmoqlar</p>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <motion.a key={social.name} href={social.href} target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-primary/10 transition-colors" title={social.name}>
                      <social.icon className="w-5 h-5 text-primary" />
                    </motion.a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass rounded-3xl p-8">
            <h3 className="text-2xl font-bold mb-6">Xabar yuborish</h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Ismingiz" className="w-full px-4 py-3 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                <input type="tel" placeholder="+998 90 000-00-00" className="w-full px-4 py-3 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50" />
              <textarea placeholder="Xabaringizni yozing..." rows={4} className="w-full px-4 py-3 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent-purple text-white font-semibold flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                Yuborish
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function mapSearchUrl(address) {
  if (!address?.trim()) return ''
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.trim())}`
}

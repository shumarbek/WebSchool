'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  platform: {
    title: 'Platforma',
    links: [
      { name: 'Bosh sahifa', href: '#home' },
      { name: 'Yangiliklar', href: '#news' },
      { name: 'Yutuqlar', href: '#achievements' },
      { name: 'Hodimlar', href: '#staff' },
      { name: 'Faoliyat', href: '#activities' },
      { name: 'Tarix', href: '#history' },
    ]
  },
  services: {
    title: 'Xizmatlar',
    links: [
      { name: 'Dars jadvali', href: '#schedule' },
      { name: 'Kutubxona', href: '#library' },
      { name: 'Statistika', href: '#stats' },
      { name: 'Interaktiv xarita', href: '#map' },
      { name: 'AI Yordamchi', href: '#ai' },
    ]
  },
  contact: {
    title: 'Bog\'lanish',
    links: [
      { name: 'Manzil: Toshkent, Yunusobod', href: '#' },
      { name: 'Telefon: +998 90 000-00-00', href: 'tel:+998900000000' },
      { name: 'Email: info@smartschool.uz', href: 'mailto:info@smartschool.uz' },
      { name: 'Ish vaqti: 08:00-18:00', href: null },
    ]
  }
}

export default function Footer() {
  return (
    <footer className="bg-dark-50 dark:bg-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Smart School</span>
                <p className="text-xs text-gray-400">Zamonaviy Ta'lim</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              Zamonaviy ta'lim platformasi - kelajak yetakchilarini tayyorlaymiz.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Toshkent, Yunusobod</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+998 90 000-00-00</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@smartschool.uz</span>
              </div>
            </div>
          </motion.div>

          {Object.entries(footerLinks).map(([key, section], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 1) * 0.1 }}
            >
              <h3 className="text-white font-bold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, i) => (
                  <li key={i}>
                    {link.href ? (
                      <Link 
                        href={link.href} 
                        className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </Link>
                    ) : (
                      <span className="text-gray-400">{link.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-400 text-sm">
            © 2026 Smart School. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-primary transition-colors">Maxfiylik siyosati</a>
            <a href="#" className="hover:text-primary transition-colors">Foydalanish shartlari</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
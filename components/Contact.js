'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react'

const contactInfo = [
  { icon: MapPin, label: 'Manzil', value: 'Toshkent shahri, Yunusobod tumani, Universitet ko\'chasi 15', href: '#' },
  { icon: Phone, label: 'Telefon', value: '+998 90 000-00-00', href: 'tel:+998900000000' },
  { icon: Mail, label: 'Email', value: 'info@smartschool.uz', href: 'mailto:info@smartschool.uz' },
  { icon: Clock, label: 'Ish vaqti', value: 'Dush-Jum: 08:00-18:00', href: null },
]

const socials = [
  { name: 'Telegram', icon: '💬', href: '#' },
  { name: 'Instagram', icon: '📸', href: '#' },
  { name: 'Facebook', icon: '📘', href: '#' },
  { name: 'YouTube', icon: '▶️', href: '#' },
]

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Biz bilan <span className="gradient-text">Bog'lanish</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Savollar yoki takliflar bo'lsa, biz bilan bog'laning
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Bog'lanish ma'lumotlari</h3>
            
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent-purple flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 mb-4">Ijtimoiy tarmoqlar</p>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-xl hover:bg-primary/10 transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Xabar yuborish</h3>
            
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Ism</label>
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    className="w-full px-4 py-3 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Telefon</label>
                  <input
                    type="tel"
                    placeholder="+998 90 000-00-00"
                    className="w-full px-4 py-3 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full px-4 py-3 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">Xabar</label>
                <textarea
                  placeholder="Xabaringizni yozing..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent-purple text-white font-semibold flex items-center justify-center gap-2"
              >
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
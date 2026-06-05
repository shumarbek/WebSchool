'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, GraduationCap, BookOpen, Calendar, Award, Users, Clock, Map, Library, Bell, ChevronDown, User, Building2 } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { createClient } from '@/lib/supabase'

const mainNavItems = [
  { name: 'Bosh Sahifa', href: '/', icon: GraduationCap },
  { name: 'Yangiliklar', href: '/news', icon: BookOpen },
  { name: 'Yutuqlar', href: '/achievements', icon: Award },
  { name: 'Faoliyat', href: '/activities', icon: Calendar },
]

const oquvchiItems = [
  { name: 'Dars Jadvali', href: '/schedule', icon: Calendar },
  { name: 'Kutubxona', href: '/library', icon: Library },
]

const maktabItems = [
  { name: 'Hodimlar', href: '/staff', icon: Users },
  { name: 'Tarix', href: '/history', icon: Clock },
  { name: 'Xarita', href: '/map', icon: Map },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [oquvchiOpen, setOquvchiOpen] = useState(false)
  const [maktabOpen, setMaktabOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [readIds, setReadIds] = useState([])
  const { theme, toggleTheme } = useTheme()
  const supabase = createClient()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('webschool_read_notifications') || '[]')
    setReadIds(stored)

    async function loadNotifications() {
      const { data } = await supabase
        .from('news')
        .select('id,title,category,published_at,event_start_at')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(30)

      setNotifications((data || []).filter(shouldNotify).map((item) => ({
        ...item,
        href: '/news',
        message: item.category === 'tadbir'
          ? eventMessage(item)
          : "Yangi yangilik qo'shildi",
      })))
    }

    loadNotifications()
  }, [])

  const unreadCount = notifications.filter((item) => !readIds.includes(item.id)).length

  function openNotifications() {
    setNotificationsOpen((value) => !value)
    const ids = notifications.map((item) => item.id)
    const nextRead = Array.from(new Set([...readIds, ...ids]))
    setReadIds(nextRead)
    localStorage.setItem('webschool_read_notifications', JSON.stringify(nextRead))
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'glass py-3 shadow-lg shadow-black/10' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center"
              >
                <GraduationCap className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span className="text-xl font-bold gradient-text">DOSOV</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Zamonaviy Ta'lim</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                >
                  {item.name}
                </Link>
              ))}

              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
                  <User className="w-4 h-4" />
                  O'quvchi
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 glass rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {oquvchiItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors rounded-lg hover:bg-primary/5">
                  <Building2 className="w-4 h-4" />
                  Maktab
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 glass rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {maktabItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-dark-100 hover:bg-gray-200 dark:hover:bg-dark-200 transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-primary" />
                )}
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openNotifications}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors relative"
                  aria-label="Xabarnomalar"
                >
                  <Bell className="w-5 h-5 text-primary" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </motion.button>
                <AnimatePresence>
                  {notificationsOpen && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 top-full mt-3 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-dark-50">
                      <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                        <p className="font-bold">Xabarnomalar</p>
                        <p className="text-xs text-gray-500">Yangilik va tadbir eslatmalari</p>
                      </div>
                      <div className="max-h-96 overflow-y-auto p-2">
                        {notifications.length === 0 ? (
                          <p className="p-4 text-sm text-gray-500">Hozircha yangi xabarnoma yo'q.</p>
                        ) : notifications.map((item) => (
                          <Link key={item.id} href={item.href} onClick={() => setNotificationsOpen(false)} className="block rounded-xl p-3 hover:bg-primary/10">
                            <p className="text-sm font-semibold line-clamp-2">{item.title}</p>
                            <p className="mt-1 text-xs text-primary">{item.message}</p>
                            <p className="mt-1 text-xs text-gray-500">{formatNotifyDate(item.event_start_at || item.published_at)}</p>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-100"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-dark-100 shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold gradient-text">Menyu</span>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-2">
                {mainNavItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-4 pb-2">
                  <p className="text-xs text-gray-500 px-3">O'quvchi</p>
                </div>
                {oquvchiItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (mainNavItems.length + index) * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}

                <div className="pt-4 pb-2">
                  <p className="text-xs text-gray-500 px-3">Maktab</p>
                </div>
                {maktabItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (mainNavItems.length + oquvchiItems.length + index) * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/10 transition-colors"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent-purple/10">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Kirby olish uchun<br />
                  <span className="text-primary font-semibold">Kirish</span> tugmasini bosing
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function shouldNotify(item) {
  const now = new Date()
  const dayMs = 24 * 60 * 60 * 1000

  if (item.category === 'tadbir' && item.event_start_at) {
    const eventDate = new Date(item.event_start_at)
    const startWindow = new Date(eventDate.getTime() - 3 * dayMs)
    const endWindow = new Date(eventDate.getTime() + dayMs)
    return now >= startWindow && now < endWindow
  }

  const published = item.published_at ? new Date(item.published_at) : null
  if (!published) return false
  return now.getTime() - published.getTime() <= 3 * dayMs
}

function eventMessage(item) {
  if (!item.event_start_at) return 'Yangi tadbir yangiligi'
  const eventDate = new Date(item.event_start_at)
  const now = new Date()
  const sameDay = eventDate.toDateString() === now.toDateString()
  if (sameDay) return 'Tadbir bugun bo\'lib o\'tadi'
  return 'Rejalashtirilgan tadbir eslatmasi'
}

function formatNotifyDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleString('uz-UZ', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
}

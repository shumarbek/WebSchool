'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, GraduationCap, BookOpen, Calendar, Award, Users, Clock, Map, Library, MessageSquare, Bell } from 'lucide-react'
import { useTheme } from './ThemeProvider'

const navItems = [
  { name: 'Bosh Sahifa', href: '#home', icon: GraduationCap },
  { name: 'Yangiliklar', href: '#news', icon: BookOpen },
  { name: 'Yutuqlar', href: '#achievements', icon: Award },
  { name: 'Faoliyat', href: '#activities', icon: Calendar },
  { name: 'Hodimlar', href: '#staff', icon: Users },
  { name: 'Tarix', href: '#history', icon: Clock },
  { name: 'Statistika', href: '#stats', icon: BarChart },
  { name: 'Jadval', href: '#schedule', icon: Calendar },
  { name: 'Kutubxona', href: '#library', icon: Library },
  { name: 'Xarita', href: '#map', icon: Map },
  { name: 'AI Yordamchi', href: '#ai', icon: MessageSquare },
]

function BarChart(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg> }

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
                <span className="text-xl font-bold gradient-text">Smart School</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Zamonaviy Ta'lim</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.slice(0, 6).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors rounded-lg hover:bg-primary/5"
                >
                  {item.name}
                </Link>
              ))}
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

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors relative"
              >
                <Bell className="w-5 h-5 text-primary" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </motion.button>

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
                {navItems.map((item, index) => (
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
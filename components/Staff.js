'use client'

import { motion } from 'framer-motion'
import { Users, BookOpen, Award, GraduationCap, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const staffCounts = [
  { subject: 'Matematika', count: 8, icon: '📐', color: 'from-blue-500 to-cyan-500' },
  { subject: 'Fizika', count: 6, icon: '⚛️', color: 'from-purple-500 to-pink-500' },
  { subject: 'Ingliz tili', count: 7, icon: '🌍', color: 'from-amber-500 to-orange-500' },
  { subject: 'Kimyo', count: 4, icon: '🧪', color: 'from-green-500 to-emerald-500' },
  { subject: 'Informatika', count: 5, icon: '💻', color: 'from-indigo-500 to-purple-500' },
  { subject: 'Tarix', count: 3, icon: '📜', color: 'from-rose-500 to-red-500' },
  { subject: 'Adabiyot', count: 5, icon: '📚', color: 'from-teal-500 to-cyan-500' },
  { subject: 'Biologiya', count: 3, icon: '🧬', color: 'from-lime-500 to-green-500' },
  { subject: 'Geografiya', count: 2, icon: '🌍', color: 'from-sky-500 to-blue-500' },
  { subject: 'Jismoniy tarbiya', count: 4, icon: '⚽', color: 'from-orange-500 to-amber-500' },
  { subject: 'Boshqaruv', count: 12, icon: '🏢', color: 'from-gray-500 to-slate-500' },
]

export default function Staff() {
  const totalTeachers = staffCounts.reduce((acc, curr) => acc + curr.count, 0)

  return (
    <section id="staff" className="py-20 bg-gray-50 dark:bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Professional <span className="gradient-text">Hodimlar</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Maktabimizdagi tajribali va malakali o'qituvchilar va hodimlar
            </p>
          </div>
          <Link href="/staff" className="mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-medium"
            >
              Barcha hodimlar
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-8 mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold gradient-text">{totalTeachers}</p>
              <p className="text-sm text-gray-500">Jami o'qituvchilar</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold gradient-text">12</p>
              <p className="text-sm text-gray-500">Boshqaruv</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-3">
                <Award className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold gradient-text">15+</p>
              <p className="text-sm text-gray-500">Yillik tajriba</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold gradient-text">10</p>
              <p className="text-sm text-gray-500">Fanlar</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {staffCounts.map((item, index) => (
            <motion.div
              key={item.subject}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-5 hover-lift"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{item.subject}</h3>
                  <p className="text-sm text-gray-500">{item.count} ta hodim</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
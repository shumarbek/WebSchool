'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Users, GraduationCap, TrendingUp, Award, BookOpen, Clock, Target, Calendar } from 'lucide-react'

const statCards = [
  { icon: Users, label: "Jami o'quvchilar", value: 5200, change: '+12%', color: 'from-blue-500 to-cyan-500' },
  { icon: GraduationCap, label: 'Bitiruvchilar', value: 1250, change: '+8%', color: 'from-purple-500 to-pink-500' },
  { icon: Award, label: 'Yutuqlar', value: 342, change: '+25%', color: 'from-amber-500 to-orange-500' },
  { icon: TrendingUp, label: "O'rtacha ball", value: 87.5, change: '+3.2%', color: 'from-green-500 to-emerald-500' }
]

const attendanceData = [
  { name: 'Dushanba', value: 95 },
  { name: 'Seshanba', value: 92 },
  { name: 'Chorshanba', value: 94 },
  { name: 'Payshanba', value: 91 },
  { name: 'Juma', value: 88 },
  { name: 'Shanba', value: 75 }
]

const subjectPerformance = [
  { name: 'Matematika', value: 89 },
  { name: 'Fizika', value: 85 },
  { name: 'Ingliz tili', value: 92 },
  { name: 'Kimyo', value: 87 },
  { name: 'Tarix', value: 78 },
  { name: 'Informatika', value: 94 }
]

const monthlyProgress = [
  { month: 'Sep', students: 4800 },
  { month: 'Oct', students: 4900 },
  { month: 'Nov', students: 5000 },
  { month: 'Dec', students: 4850 },
  { month: 'Jan', students: 5100 },
  { month: 'Feb', students: 5200 }
]

export default function Dashboard() {
  const [animatedValues, setAnimatedValues] = useState({
    students: 0,
    graduates: 0,
    achievements: 0,
    average: 0
  })

  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 2000
          const steps = 60
          const interval = duration / steps

          let step = 0
          const timer = setInterval(() => {
            step++
            const progress = step / steps

            setAnimatedValues({
              students: Math.floor(5200 * progress),
              graduates: Math.floor(1250 * progress),
              achievements: Math.floor(342 * progress),
              average: Math.floor(87.5 * progress * 10) / 10
            })

            if (step >= steps) clearInterval(timer)
          }, interval)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats" className="py-20 bg-gray-50 dark:bg-dark-100 relative overflow-hidden">
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
            Statistika <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Maktabimizning real vaqt rejimidagi statistik ma'lumotlari
          </p>
        </motion.div>

        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 hover-lift"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold mb-1">
                {index === 0 ? animatedValues.students :
                 index === 1 ? animatedValues.graduates :
                 index === 2 ? animatedValues.achievements :
                 animatedValues.average}
              </p>
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <span className="text-xs text-green-500 font-medium">{stat.change} oylik</span>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass rounded-3xl p-6"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Haftalik davomat (%)
            </h3>
            <div className="flex items-end justify-between h-48 gap-2">
              {attendanceData.map((day, index) => (
                <motion.div
                  key={day.name}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${day.value}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex-1 rounded-t-lg bg-gradient-to-t from-primary to-accent-purple relative group"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-100 dark:bg-white text-white dark:text-dark px-2 py-1 rounded text-sm">
                    {day.value}%
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {attendanceData.map((day) => (
                <span key={day.name} className="text-xs text-gray-500">{day.name}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass rounded-3xl p-6"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Fan bo'yicha natijalar
            </h3>
            <div className="space-y-4">
              {subjectPerformance.map((subject, index) => (
                <div key={subject.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{subject.name}</span>
                    <span className="font-medium">{subject.value}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${subject.value}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-accent-purple rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 glass rounded-3xl p-6"
        >
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Oylik o'quvchilar soni
          </h3>
          <div className="relative h-32">
            <svg className="w-full h-full" viewBox="0 0 600 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0,${100 - (monthlyProgress[0].students / 5200) * 100} 
                    ${monthlyProgress.map((m, i) => `L ${(i + 1) * 100},${100 - (m.students / 5200) * 100}`).join(' ')}
                    L 600,100 L 0,100 Z`}
                fill="url(#areaGradient)"
              />
              <path
                d={`M 0,${100 - (monthlyProgress[0].students / 5200) * 100} 
                    ${monthlyProgress.map((m, i) => `L ${(i + 1) * 100},${100 - (m.students / 5200) * 100}`).join(' ')}`}
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
              />
            </svg>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
              {monthlyProgress.map((m) => (
                <span key={m.month} className="text-xs text-gray-500">{m.month}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
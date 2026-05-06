'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Users, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Fan olimpiadalari',
    type: 'academic',
    date: '15 may, 2026',
    time: '09:00',
    location: 'Akademik bino',
    participants: 234,
    description: 'Matematika, fizika va kimyo bo\'yicha yillik olimpiada',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Sport bayrami',
    type: 'sport',
    date: '18 may, 2026',
    time: '10:00',
    location: 'Sport kompleksi',
    participants: 450,
    description: 'Voleybol, basketbol va futsal musobaqalari',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 3,
    title: 'Ilmiy seminar',
    type: 'seminar',
    date: '20 may, 2026',
    time: '14:00',
    location: 'Konferentsiya zali',
    participants: 120,
    description: 'Sun\'iy intellekt va ta\'lim texnologiyalari',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 4,
    title: 'Kitob o\'qish kuni',
    type: 'club',
    date: '22 may, 2026',
    time: '11:00',
    location: 'Kutubxona',
    participants: 180,
    description: 'Adabiyotseverlar klubi uchrashuvi',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 5,
    title: 'Robototexnika musobaqasi',
    type: 'tech',
    date: '25 may, 2026',
    time: '13:00',
    location: 'Texnologiya markazi',
    participants: 85,
    description: 'LEGO robotlar musobaqasi va demo',
    color: 'from-rose-500 to-red-500'
  }
]

export default function Activities() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  const getDaysUntil = (dateStr) => {
    const eventDate = new Date(dateStr.replace(', 2026', '-2026'))
    const today = new Date()
    const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }

  return (
    <section id="activities" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
        >
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Kelajakdagi <span className="gradient-text">Tadbirlar</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Maktabimizdagi muhim tadbirlar va hisobotlar
            </p>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-primary/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-primary/10"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `${-currentIndex * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex"
            >
              {events.map((event, index) => (
                <div key={event.id} className="w-full flex-shrink-0 px-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-3xl overflow-hidden"
                  >
                    <div className={`h-2 bg-gradient-to-r ${event.color}`} />
                    
                    <div className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        <div className="lg:w-1/2">
                          <div className="flex items-center gap-3 mb-4">
                            <span className={`px-4 py-1 rounded-full bg-gradient-to-r ${event.color} text-white text-sm font-medium`}>
                              {event.type === 'academic' ? 'Akademik' :
                               event.type === 'sport' ? 'Sport' :
                               event.type === 'seminar' ? 'Seminar' :
                               event.type === 'club' ? 'Klub' : 'Texnika'}
                            </span>
                            {getDaysUntil(event.date) > 0 && (
                              <span className="flex items-center gap-1 text-sm text-primary">
                                <Sparkles className="w-4 h-4" />
                                {getDaysUntil(event.date)} kundan
                              </span>
                            )}
                          </div>

                          <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {event.description}
                          </p>

                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-500">
                              <Calendar className="w-4 h-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <Users className="w-4 h-4" />
                              {event.participants} + ishtirokchilar
                            </div>
                          </div>
                        </div>

                        <div className="lg:w-1/2">
                          <div className={`rounded-2xl p-6 bg-gradient-to-br ${event.color} text-white`}>
                            <p className="text-sm opacity-80 mb-2">Kalendar</p>
                            <p className="text-3xl font-bold mb-1">{new Date(event.date.replace(', 2026', '-2026')).getDate()}</p>
                            <p className="text-lg">{new Date(event.date.replace(', 2026', '-2026')).toLocaleDateString('uz-UZ', { month: 'long' })}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-8 bg-gradient-to-r from-primary to-accent-purple' 
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
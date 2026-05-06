'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Star, Mail, Phone, Calendar, BookOpen, Award, Users } from 'lucide-react'

const teachers = [
  {
    id: 1,
    name: 'Aziz Qodirov',
    subject: 'Matematika',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    experience: 15,
    rating: 4.9,
    students: 280,
    email: 'aziz.qodirov@school.uz',
    phone: '+998 90 123-45-67',
    schedule: 'Dush-Jum 08:00-14:00',
    achievements: ['Xalqaro olimpiada murabbiyi', 'Yil eng yaxshi oqituvchi 2024']
  },
  {
    id: 2,
    name: 'Malika Yusupova',
    subject: 'Fizika',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    experience: 12,
    rating: 4.8,
    students: 195,
    email: 'malika.yusupova@school.uz',
    phone: '+998 90 234-56-78',
    schedule: 'Dush-Jum 09:00-15:00',
    achievements: ['Fizika fan nomzodi', 'Respublika olimpiada g\'olibi']
  },
  {
    id: 3,
    name: 'Bobur Aliyev',
    subject: 'Ingliz tili',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    experience: 8,
    rating: 4.9,
    students: 320,
    email: 'bobur.aliyev@school.uz',
    phone: '+998 90 345-67-89',
    schedule: 'Dush-Jum 10:00-16:00',
    achievements: ['CELTA Sertifikati', 'Xalqaro til olimpiadasi murabbiyi']
  },
  {
    id: 4,
    name: 'Nilufar Ahmedova',
    subject: 'Kimyo',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    experience: 10,
    rating: 4.7,
    students: 165,
    email: 'nilufar.ahmedova@school.uz',
    phone: '+998 90 456-78-90',
    schedule: 'Dush-Jum 08:00-14:00',
    achievements: ['Kimyo fan doktori', 'Ilmiy loyiha rahbari']
  },
  {
    id: 5,
    name: 'Jahongir Sobirov',
    subject: 'Informatika',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    experience: 7,
    rating: 4.9,
    students: 210,
    email: 'jahongir.sobirov@school.uz',
    phone: '+998 90 567-89-01',
    schedule: 'Dush-Jum 11:00-17:00',
    achievements: ['Robototexnika ustasi', 'ACM dasturlash musobaqasi g\'olibi']
  },
  {
    id: 6,
    name: 'Gulnora Karimova',
    subject: 'Tarix',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
    experience: 18,
    rating: 4.8,
    students: 150,
    email: 'gulnora.karimova@school.uz',
    phone: '+998 90 678-90-12',
    schedule: 'Dush-Jum 09:00-15:00',
    achievements: ['Tarix fan nomzodi', 'Yil eng yaxshi oqituvchi 2023']
  }
]

const subjects = ['Hammasi', 'Matematika', 'Fizika', 'Ingliz tili', 'Kimyo', 'Informatika', 'Tarix']

export default function Staff() {
  const [activeSubject, setActiveSubject] = useState('Hammasi')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = teachers.filter(t => {
    const subjectMatch = activeSubject === 'Hammasi' || t.subject === activeSubject
    const searchMatch = t.name.toLowerCase().includes(searchQuery.toLowerCase())
    return subjectMatch && searchMatch
  })

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
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Professional <span className="gradient-text">Hodimlar</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tajribali va malakali o'qituvchilarimiz
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Hodimlarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {subjects.map((subj) => (
              <button
                key={subj}
                onClick={() => setActiveSubject(subj)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeSubject === subj
                    ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                    : 'glass hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass rounded-3xl overflow-hidden hover-lift"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-sm">
                      {teacher.subject}
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/90 text-white text-sm">
                      <Star className="w-3 h-3 fill-white" />
                      {teacher.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">{teacher.name}</h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <BookOpen className="w-4 h-4 text-primary" />
                    {teacher.experience} yillik tajriba
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 text-primary" />
                    {teacher.students} o'quvchi
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{teacher.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {teacher.schedule}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {teacher.achievements.map((achievement, i) => (
                    <span key={i} className="px-2 py-1 bg-primary/10 rounded-lg text-xs text-primary">
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
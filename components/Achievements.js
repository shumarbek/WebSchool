'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Star, TrendingUp, Users } from 'lucide-react'

const achievements = [
  {
    id: 1,
    title: 'Xalqaro Matematika Olimpiadasi',
    type: 'olympiad',
    level: 'Xalqaro',
    year: 2026,
    medals: { gold: 3, silver: 2, bronze: 1 },
    students: ['Aziz Karimov', 'Malika Yusupova', 'Bobur Aliyev'],
    rank: 1,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800'
  },
  {
    id: 2,
    title: 'Respublika Fizika Cup',
    type: 'sport',
    level: 'Respublika',
    year: 2026,
    medals: { gold: 2, silver: 3, bronze: 2 },
    students: ['Davlat Rashodov', 'Nilufar Ahmedova'],
    rank: 2,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800'
  },
  {
    id: 3,
    title: 'Robototexnika Championship',
    type: 'tech',
    level: 'Xalqaro',
    year: 2025,
    medals: { gold: 1, silver: 2, bronze: 1 },
    students: ['Jahongir Sobirov', 'Sabina Valiyeva'],
    rank: 1,
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800'
  },
  {
    id: 4,
    title: 'Ingliz Tili Lingua Cup',
    type: 'olympiad',
    level: 'Respublika',
    year: 2025,
    medals: { gold: 2, silver: 1, bronze: 3 },
    students: ['Ozoda Nurmatova', 'Akbar Toshmatov'],
    rank: 1,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800'
  },
  {
    id: 5,
    title: 'Voleybol turniri',
    type: 'sport',
    level: 'Viloyat',
    year: 2025,
    medals: { gold: 1, silver: 0, bronze: 0 },
    students: ['Maktab voleybol jamoasi'],
    rank: 1,
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800'
  },
  {
    id: 6,
    title: 'Kimyo fan olimpiadasi',
    type: 'olympiad',
    level: 'Respublika',
    year: 2025,
    medals: { gold: 1, silver: 2, bronze: 2 },
    students: ['Ulugbek Kholmatov', 'Gulnora Ismailova'],
    rank: 3,
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800'
  }
]

const trophyColors = {
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32'
}

export default function Achievements() {
  const [activeFilter, setActiveFilter] = useState('Hammasi')

  const filtered = activeFilter === 'Hammasi' 
    ? achievements 
    : achievements.filter(a => a.type === activeFilter)

  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Maktab <span className="gradient-text">Yutuqlari</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            O'quvchilarimizning ilmiy, sport va texnik sohalardagi muvaffaqiyatlari
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {['Hammasi', 'olympiad', 'sport', 'tech'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  : 'glass hover:bg-amber-500/10'
              }`}
            >
              {filter === 'Hammasi' ? 'Hammasi' : 
               filter === 'olympiad' ? 'Olimpiadalar' :
               filter === 'sport' ? 'Sport' : 'Texnika'}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group glass rounded-3xl overflow-hidden hover-lift"
            >
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-50"
                />
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6" style={{ color: trophyColors[item.rank === 1 ? 'gold' : item.rank === 2 ? 'silver' : 'bronze'] }} />
                    <span className="text-2xl font-bold text-white">#{item.rank}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.level === 'Xalqaro' ? 'bg-purple-500' :
                    item.level === 'Respublika' ? 'bg-primary' : 'bg-green-500'
                  } text-white`}>
                    {item.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{item.year}</p>

                <div className="flex gap-3 mb-4">
                  {item.medals.gold > 0 && (
                    <div className="flex items-center gap-1">
                      <Medal className="w-4 h-4" style={{ color: trophyColors.gold }} />
                      <span className="text-sm font-bold">{item.medals.gold}</span>
                    </div>
                  )}
                  {item.medals.silver > 0 && (
                    <div className="flex items-center gap-1">
                      <Medal className="w-4 h-4" style={{ color: trophyColors.silver }} />
                      <span className="text-sm font-bold">{item.medals.silver}</span>
                    </div>
                  )}
                  {item.medals.bronze > 0 && (
                    <div className="flex items-center gap-1">
                      <Medal className="w-4 h-4" style={{ color: trophyColors.bronze }} />
                      <span className="text-sm font-bold">{item.medals.bronze}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <p className="text-xs text-gray-500 mb-2">G'oliblar:</p>
                  <div className="flex flex-wrap gap-1">
                    {item.students.slice(0, 2).map((student, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/10 rounded-lg text-xs">
                        {student}
                      </span>
                    ))}
                    {item.students.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs">
                        +{item.students.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
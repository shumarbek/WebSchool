'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Star, TrendingUp, Users, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const achievements = [
  {
    id: 1,
    title: 'IELTS 7.5',
    type: 'certificate',
    level: 'Xalqaro',
    year: 2026,
    certificate: 'IELTS',
    score: '7.5',
    student: 'Aziz Karimov',
    rank: 1,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800'
  },
  {
    id: 2,
    title: 'Milliy sertifikat - B2',
    type: 'certificate',
    level: 'Milliy',
    year: 2026,
    certificate: 'Milliy',
    score: 'B2',
    student: 'Malika Yusupova',
    rank: 1,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
  },
  {
    id: 3,
    title: 'CEFR C1 Sertifikati',
    type: 'certificate',
    level: 'Xalqaro',
    year: 2025,
    certificate: 'CEFR',
    score: 'C1',
    student: 'Bobur Aliyev',
    rank: 1,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800'
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
    title: 'Ingliz Tili Lingua Cup',
    type: 'olympiad',
    level: 'Respublika',
    year: 2025,
    medals: { gold: 2, silver: 1, bronze: 3 },
    students: ['Ozoda Nurmatova', 'Akbar Toshmatov'],
    rank: 1,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800'
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
    ? achievements.slice(0, 3)
    : achievements.filter(a => a.type === activeFilter).slice(0, 3)

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
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Maktab <span className="gradient-text">Yutuqlari</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              O'quvchilarimizning ilmiy, sport va sertifikatlar bo'yicha muvaffaqiyatlari
            </p>
          </div>
          <Link href="/achievements" className="mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium"
            >
              Barcha yutuqlar
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {['Hammasi', 'olympiad', 'sport', 'certificate'].map((filter) => (
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
               filter === 'sport' ? 'Sport' : 'Sertifikat'}
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
                    item.level === 'Respublika' ? 'bg-primary' : 
                    item.level === 'Milliy' ? 'bg-green-500' : 'bg-amber-500'
                  } text-white`}>
                    {item.level}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {item.type === 'certificate' ? (
                  <>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">{item.year}</p>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xl">
                        {item.score}
                      </div>
                      <span className="text-sm text-gray-500">{item.certificate}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="text-xs text-gray-500 mb-1">O'quvchi:</p>
                      <span className="px-2 py-1 bg-primary/10 rounded-lg text-sm">
                        {item.student}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, ChevronLeft, ChevronRight, Calendar, Clock, BookOpen, MapPin } from 'lucide-react'

const classes = ['9-A', '9-B', '10-A', '10-B', '11-A', '11-B']

const scheduleData = {
  '9-A': [
    { time: '08:00-08:45', subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
    { time: '08:55-09:40', subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
    { time: '10:00-10:45', subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
    { time: '11:05-11:50', subject: 'Tarix', teacher: 'Gulnora Karimova', room: '401', color: 'from-green-500 to-emerald-500' },
    { time: '12:10-12:55', subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
  ],
  '9-B': [
    { time: '08:00-08:45', subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
    { time: '08:55-09:40', subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
    { time: '10:00-10:45', subject: 'Informatika', teacher: 'Jahongir Sobirov', room: '501', color: 'from-indigo-500 to-purple-500' },
    { time: '11:05-11:50', subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
    { time: '12:10-12:55', subject: 'Geografiya', teacher: 'Samir Valiyev', room: '403', color: 'from-teal-500 to-cyan-500' },
  ],
  '10-A': [
    { time: '08:00-08:45', subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
    { time: '08:55-09:40', subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
    { time: '10:00-10:45', subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
    { time: '11:05-11:50', subject: 'Adabiyot', teacher: 'Dilshod Rahimov', room: '202', color: 'from-pink-500 to-rose-500' },
    { time: '12:10-12:55', subject: 'Informatika', teacher: 'Jahongir Sobirov', room: '501', color: 'from-indigo-500 to-purple-500' },
  ],
  '10-B': [
    { time: '08:00-08:45', subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
    { time: '08:55-09:40', subject: 'Biologiya', teacher: 'Kamola Saidova', room: '304', color: 'from-green-500 to-emerald-500' },
    { time: '10:00-10:45', subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
    { time: '11:05-11:50', subject: 'Tarix', teacher: 'Gulnora Karimova', room: '401', color: 'from-green-500 to-emerald-500' },
    { time: '12:10-12:55', subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
  ],
  '11-A': [
    { time: '08:00-08:45', subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
    { time: '08:55-09:40', subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
    { time: '10:00-10:45', subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
    { time: '11:05-11:50', subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
    { time: '12:10-12:55', subject: 'Adabiyot', teacher: 'Dilshod Rahimov', room: '202', color: 'from-pink-500 to-rose-500' },
  ],
  '11-B': [
    { time: '08:00-08:45', subject: 'Informatika', teacher: 'Jahongir Sobirov', room: '501', color: 'from-indigo-500 to-purple-500' },
    { time: '08:55-09:40', subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
    { time: '10:00-10:45', subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
    { time: '11:05-11:50', subject: 'Chizmachilik', teacher: 'Rustam Jurayev', room: '502', color: 'from-gray-500 to-slate-500' },
    { time: '12:10-12:55', subject: 'Jismoniy tarbiya', teacher: 'Bekzod Qodirov', room: 'Sport zali', color: 'from-orange-500 to-amber-500' },
  ]
}

const today = new Date()
const dayNames = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']
const todayName = dayNames[today.getDay()]

const todaySchedule = scheduleData['9-A'].slice(0, 3)

export default function Schedule() {
  const [selectedClass, setSelectedClass] = useState('9-A')
  const [weekOffset, setWeekOffset] = useState(0)

  return (
    <section id="schedule" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
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
              Dars <span className="gradient-text">Jadvali</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Har bir sinf uchun alohida jadval va real vaqt yangilanishlari
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-primary/10"
            >
              <Download className="w-4 h-4" />
              PDF yuklash
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">Bugungi darslar</span>
            </div>
            <span className="px-4 py-1 rounded-full bg-primary/20 text-primary font-medium">
              {todayName}
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {todaySchedule.map((lesson, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-4 bg-gradient-to-br ${lesson.color} text-white`}
              >
                <div className="flex items-center gap-2 text-sm opacity-80 mb-2">
                  <Clock className="w-4 h-4" />
                  {lesson.time}
                </div>
                <p className="text-lg font-bold mb-1">{lesson.subject}</p>
                <p className="text-sm opacity-80">{lesson.teacher}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-5 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                  selectedClass === cls
                    ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                    : 'glass hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {cls} sinf
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setWeekOffset(weekOffset - 1)}
              className="p-2 rounded-xl glass hover:bg-primary/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-4 py-2 glass rounded-xl text-sm">
              {weekOffset === 0 ? 'Joriy hafta' : `${Math.abs(weekOffset)} hafta oldin`}
            </span>
            <button
              onClick={() => setWeekOffset(weekOffset + 1)}
              className="p-2 rounded-xl glass hover:bg-primary/10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-dark-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Vaqt</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Fan</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">O'qituvchi</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Xona</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {scheduleData[selectedClass].map((lesson, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-dark-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{lesson.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${lesson.color}`} />
                        <span className="font-medium">{lesson.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span>{lesson.teacher}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{lesson.room}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
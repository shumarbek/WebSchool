'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, BookOpen, MapPin, Users, ChevronLeft, ChevronRight, Play } from 'lucide-react'

const classes = ['9-sinf', '10-sinf', '11-sinf']

const days = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma']

const lessonTimes = [
  { number: 1, start: '9:00', end: '9:45' },
  { number: 2, start: '9:50', end: '10:35' },
  { number: 3, start: '10:40', end: '11:25' },
  { number: 4, start: '11:30', end: '12:15' },
  { number: 5, start: '12:45', end: '13:30' },
  { number: 6, start: '13:35', end: '14:20' },
]

const scheduleData = {
  '9-sinf': {
    'Dushanba': [
      { number: 1, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 2, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
      { number: 3, subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
      { number: 4, subject: 'Tarix', teacher: 'Gulnora Karimova', room: '401', color: 'from-green-500 to-emerald-500' },
      { number: 5, subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
      { number: 6, subject: 'Jismoniy tarbiya', teacher: 'Bekzod Qodirov', room: 'Sport zali', color: 'from-indigo-500 to-purple-500' },
    ],
    'Seshanba': [
      { number: 1, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
      { number: 2, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 3, subject: 'Informatika', teacher: 'Jahongir Sobirov', room: '501', color: 'from-indigo-500 to-purple-500' },
      { number: 4, subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
      { number: 5, subject: 'Geografiya', teacher: 'Samir Valiyev', room: '403', color: 'from-teal-500 to-cyan-500' },
      { number: 6, subject: 'Adabiyot', teacher: 'Dilshod Rahimov', room: '202', color: 'from-pink-500 to-rose-500' },
    ],
    'Chorshanba': [
      { number: 1, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 2, subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
      { number: 3, subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
      { number: 4, subject: 'Biologiya', teacher: 'Kamola Saidova', room: '304', color: 'from-green-500 to-emerald-500' },
      { number: 5, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
      { number: 6, subject: 'Musiqa', teacher: 'Laylo Islamova', room: '403', color: 'from-violet-500 to-purple-500' },
    ],
    'Payshanba': [
      { number: 1, subject: 'Informatika', teacher: 'Jahongir Sobirov', room: '501', color: 'from-indigo-500 to-purple-500' },
      { number: 2, subject: 'Tarix', teacher: 'Gulnora Karimova', room: '401', color: 'from-green-500 to-emerald-500' },
      { number: 3, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 4, subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
      { number: 5, subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
      { number: 6, subject: 'Chizmachilik', teacher: 'Rustam Jurayev', room: '502', color: 'from-gray-500 to-slate-500' },
    ],
    'Juma': [
      { number: 1, subject: 'Adabiyot', teacher: 'Dilshod Rahimov', room: '202', color: 'from-pink-500 to-rose-500' },
      { number: 2, subject: 'Geografiya', teacher: 'Samir Valiyev', room: '403', color: 'from-teal-500 to-cyan-500' },
      { number: 3, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
      { number: 4, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 5, subject: 'Biologiya', teacher: 'Kamola Saidova', room: '304', color: 'from-green-500 to-emerald-500' },
      { number: 6, subject: 'Jismoniy tarbiya', teacher: 'Bekzod Qodirov', room: 'Sport zali', color: 'from-indigo-500 to-purple-500' },
    ],
  },
  '10-sinf': {
    'Dushanba': [
      { number: 1, subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
      { number: 2, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 3, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
      { number: 4, subject: 'Adabiyot', teacher: 'Dilshod Rahimov', room: '202', color: 'from-pink-500 to-rose-500' },
      { number: 5, subject: 'Informatika', teacher: 'Jahongir Sobirov', room: '501', color: 'from-indigo-500 to-purple-500' },
      { number: 6, subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
    ],
    'Seshanba': [
      { number: 1, subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
      { number: 2, subject: 'Biologiya', teacher: 'Kamola Saidova', room: '304', color: 'from-green-500 to-emerald-500' },
      { number: 3, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 4, subject: 'Tarix', teacher: 'Gulnora Karimova', room: '401', color: 'from-green-500 to-emerald-500' },
      { number: 5, subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
      { number: 6, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
    ],
    'Chorshanba': [
      { number: 1, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
      { number: 2, subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
      { number: 3, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 4, subject: 'Geografiya', teacher: 'Samir Valiyev', room: '403', color: 'from-teal-500 to-cyan-500' },
      { number: 5, subject: 'Adabiyot', teacher: 'Dilshod Rahimov', room: '202', color: 'from-pink-500 to-rose-500' },
      { number: 6, subject: 'Informatika', teacher: 'Jahongir Sobirov', room: '501', color: 'from-indigo-500 to-purple-500' },
    ],
    'Payshanba': [
      { number: 1, subject: 'Biologiya', teacher: 'Kamola Saidova', room: '304', color: 'from-green-500 to-emerald-500' },
      { number: 2, subject: 'Tarix', teacher: 'Gulnora Karimova', room: '401', color: 'from-green-500 to-emerald-500' },
      { number: 3, subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
      { number: 4, subject: 'Informatika', teacher: 'Jahongir Sobirov', room: '501', color: 'from-indigo-500 to-purple-500' },
      { number: 5, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
      { number: 6, subject: 'Jismoniy tarbiya', teacher: 'Bekzod Qodirov', room: 'Sport zali', color: 'from-indigo-500 to-purple-500' },
    ],
    'Juma': [
      { number: 1, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 2, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
      { number: 3, subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
      { number: 4, subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
      { number: 5, subject: 'Adabiyot', teacher: 'Dilshod Rahimov', room: '202', color: 'from-pink-500 to-rose-500' },
      { number: 6, subject: 'Chizmachilik', teacher: 'Rustam Jurayev', room: '502', color: 'from-gray-500 to-slate-500' },
    ],
  },
  '11-sinf': {
    'Dushanba': [
      { number: 1, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 2, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
      { number: 3, subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
      { number: 4, subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
      { number: 5, subject: 'Adabiyot', teacher: 'Dilshod Rahimov', room: '202', color: 'from-pink-500 to-rose-500' },
      { number: 6, subject: 'Informatika', teacher: 'Jahongir Sobirov', room: '501', color: 'from-indigo-500 to-purple-500' },
    ],
    'Seshanba': [
      { number: 1, subject: 'Informatika', teacher: 'Jahongir Sobirov', room: '501', color: 'from-indigo-500 to-purple-500' },
      { number: 2, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 3, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
      { number: 4, subject: 'Chizmachilik', teacher: 'Rustam Jurayev', room: '502', color: 'from-gray-500 to-slate-500' },
      { number: 5, subject: 'Tarix', teacher: 'Gulnora Karimova', room: '401', color: 'from-green-500 to-emerald-500' },
      { number: 6, subject: 'Jismoniy tarbiya', teacher: 'Bekzod Qodirov', room: 'Sport zali', color: 'from-indigo-500 to-purple-500' },
    ],
    'Chorshanba': [
      { number: 1, subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
      { number: 2, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
      { number: 3, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 4, subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
      { number: 5, subject: 'Biologiya', teacher: 'Kamola Saidova', room: '304', color: 'from-green-500 to-emerald-500' },
      { number: 6, subject: 'Adabiyot', teacher: 'Dilshod Rahimov', room: '202', color: 'from-pink-500 to-rose-500' },
    ],
    'Payshanba': [
      { number: 1, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
      { number: 2, subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
      { number: 3, subject: 'Informatika', teacher: 'Jahongir Sobirov', room: '501', color: 'from-indigo-500 to-purple-500' },
      { number: 4, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 5, subject: 'Tarix', teacher: 'Gulnora Karimova', room: '401', color: 'from-green-500 to-emerald-500' },
      { number: 6, subject: 'Ingliz tili', teacher: 'Bobur Aliyev', room: '102', color: 'from-amber-500 to-orange-500' },
    ],
    'Juma': [
      { number: 1, subject: 'Adabiyot', teacher: 'Dilshod Rahimov', room: '202', color: 'from-pink-500 to-rose-500' },
      { number: 2, subject: 'Matematika', teacher: 'Aziz Qodirov', room: '201', color: 'from-blue-500 to-cyan-500' },
      { number: 3, subject: 'Fizika', teacher: 'Malika Yusupova', room: '305', color: 'from-purple-500 to-pink-500' },
      { number: 4, subject: 'Geografiya', teacher: 'Samir Valiyev', room: '403', color: 'from-teal-500 to-cyan-500' },
      { number: 5, subject: 'Kimyo', teacher: 'Nilufar Ahmedova', room: '302', color: 'from-rose-500 to-red-500' },
      { number: 6, subject: 'Informatika', teacher: 'Jahongir Sobirov', room: '501', color: 'from-indigo-500 to-purple-500' },
    ],
  },
}

export default function SchedulePage() {
  const [selectedClass, setSelectedClass] = useState('9-sinf')
  const currentHour = new Date().getHours()
  const currentDayIndex = new Date().getDay()
  const today = currentDayIndex >= 1 && currentDayIndex <= 5 ? days[currentDayIndex - 1] : null

  const isCurrentTimeInRange = (startTime, endTime) => {
    const [startHour, startMin] = startTime.split(':').map(Number)
    const [endHour, endMin] = endTime.split(':').map(Number)
    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    const startMinutes = startHour * 60 + startMin
    const endMinutes = endHour * 60 + endMin
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Dars Jadvali</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            DOSOV maktabining haftalik dars jadvali - {selectedClass}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-3 mb-8"
        >
          {classes.map((cls) => (
            <button
              key={cls}
              onClick={() => setSelectedClass(cls)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                selectedClass === cls
                  ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                  : 'glass hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {cls}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-5 gap-4"
        >
          {days.map((day, dayIndex) => {
            const isToday = day === today
            const schedule = scheduleData[selectedClass][day]

            return (
              <div
                key={day}
                className={`glass rounded-3xl overflow-hidden ${
                  isToday ? 'ring-2 ring-primary ring-offset-2 dark:ring-offset-dark-100' : ''
                }`}
              >
                <div className={`p-4 text-center ${
                  isToday 
                    ? 'bg-gradient-to-r from-primary to-accent-purple text-white' 
                    : 'bg-gray-100 dark:bg-dark-50'
                }`}>
                  <p className="font-bold">{day}</p>
                  {isToday && (
                    <p className="text-xs opacity-80">Bugun</p>
                  )}
                </div>

                <div className="p-3 space-y-2">
                  {schedule.map((lesson) => {
                    const time = lessonTimes[lesson.number - 1]
                    const isCurrentLesson = isToday && isCurrentTimeInRange(time.start, time.end)

                    return (
                      <motion.div
                        key={lesson.number}
                        whileHover={{ scale: 1.02 }}
                        className={`rounded-xl p-3 ${
                          isCurrentLesson
                            ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                            : `bg-gradient-to-br ${lesson.color} text-white opacity-90`
                        }`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-xs font-medium opacity-80">
                            {time.start}-{time.end}
                          </span>
                          {isCurrentLesson && (
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse ml-auto" />
                          )}
                        </div>
                        <p className="font-bold text-sm line-clamp-1">{lesson.subject}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs opacity-80">
                          <Users className="w-3 h-3" />
                          <span className="line-clamp-1">{lesson.teacher}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs opacity-80">
                          <MapPin className="w-3 h-3" />
                          <span>{lesson.room}</span>
                        </div>
                      </motion.div>
                    )
                  })}

                  {schedule.length < 6 && (
                    <div className="h-full rounded-xl p-3 border-2 border-dashed border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-400 text-center">Dars yo'q</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass rounded-2xl p-6"
        >
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Dars vaqtlari
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {lessonTimes.map((lesson) => (
              <div key={lesson.number} className="text-center p-3 rounded-xl bg-gray-100 dark:bg-dark-50">
                <p className="font-bold text-primary">{lesson.number}-dars</p>
                <p className="text-sm text-gray-500">{lesson.start}-{lesson.end}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 text-sm text-amber-600">
            <p className="flex items-center gap-2">
              <span className="font-bold">Eslatma:</span>
              4-darsdan keyin 30 daqiqalik tanaffuz (12:15-12:45)
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
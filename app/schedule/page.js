'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, BookOpen, MapPin, Users, ChevronLeft, ChevronRight, Play } from 'lucide-react'

const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

const daysLower = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma']
const daysUpper = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']

const lessonTimes = [
  { number: 1, start: '9:00', end: '9:45' },
  { number: 2, start: '9:50', end: '10:35' },
  { number: 3, start: '10:40', end: '11:25' },
  { number: 4, start: '11:30', end: '12:15' },
  { number: 5, start: '12:45', end: '13:30' },
  { number: 6, start: '13:35', end: '14:20' },
]

const subjects = ['Matematika', 'Fizika', 'Kimyo', 'Biologiya', 'Ingliz tili', 'Informatika', 'Tarix', 'Geografiya', 'Adabiyot', 'Musiqa', 'Chizmachilik', 'Jismoniy tarbiya']
const teachers = ['Aziz Qodirov', 'Malika Yusupova', 'Bobur Aliyev', 'Gulnora Karimova', 'Nilufar Ahmedova', 'Jahongir Sobirov', 'Dilshod Rahimov', 'Kamola Saidova', 'Samir Valiyev', 'Bekzod Qodirov', 'Laylo Islamova', 'Rustam Jurayev']
const rooms = ['201', '305', '102', '401', '302', '501', '202', '304', '403', 'Sport zali', '502']
const colors = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-amber-500 to-orange-500',
  'from-green-500 to-emerald-500',
  'from-rose-500 to-red-500',
  'from-indigo-500 to-purple-500',
  'from-teal-500 to-cyan-500',
  'from-pink-500 to-rose-500',
  'from-violet-500 to-purple-500',
  'from-gray-500 to-slate-500',
]

const generateSchedule = (grade, tur) => {
  const isUpper = grade >= 5
  const days = isUpper ? daysUpper : daysLower
  const schedule = {}
  
  days.forEach(day => {
    const daySchedule = []
    const numLessons = 6
    const usedSubjects = new Set()
    
    for (let i = 1; i <= numLessons; i++) {
      let subject
      do {
        subject = subjects[Math.floor(Math.random() * subjects.length)]
      } while (usedSubjects.has(subject) && usedSubjects.size < subjects.length - 2)
      usedSubjects.add(subject)
      
      const colorIndex = (grade + tur + day.length + i) % colors.length
      
      daySchedule.push({
        number: i,
        subject,
        teacher: teachers[Math.floor(Math.random() * teachers.length)],
        room: rooms[Math.floor(Math.random() * rooms.length)],
        color: colors[colorIndex],
      })
    }
    
    schedule[day] = daySchedule
  })
  
  return schedule
}

const getDayIndex = (day) => {
  const dayMap = {
    'Dushanba': 1,
    'Seshanba': 2,
    'Chorshanba': 3,
    'Payshanba': 4,
    'Juma': 5,
    'Shanba': 6,
  }
  return dayMap[day]
}

export default function SchedulePage() {
  const [selectedGrade, setSelectedGrade] = useState(null)
  const [selectedTur, setSelectedTur] = useState(null)
  const [showTurSelect, setShowTurSelect] = useState(false)
  const [mobileDayIndex, setMobileDayIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileClasses, setShowMobileClasses] = useState(false)
  
  const currentDayIndex = new Date().getDay()
  const currentDayName = currentDayIndex >= 1 && currentDayIndex <= 6 
    ? (currentDayIndex === 6 ? 'Shanba' : daysLower[currentDayIndex - 1])
    : 'Dushanba'

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const isUpper = selectedGrade && selectedGrade >= 5
    const days = isUpper ? daysUpper : daysLower
    const todayIndex = days.findIndex(d => d === currentDayName)
    setMobileDayIndex(todayIndex >= 0 ? todayIndex : 0)
  }, [selectedGrade, currentDayName])

  const handleGradeClick = (grade) => {
    setSelectedGrade(grade)
    setShowTurSelect(true)
  }

  const handleTurSelect = (tur) => {
    setSelectedTur(tur)
    setShowTurSelect(false)
  }

  const getCurrentDays = () => {
    if (!selectedGrade) return []
    return selectedGrade >= 5 ? daysUpper : daysLower
  }

  const scheduleData = selectedGrade && selectedTur 
    ? generateSchedule(selectedGrade, selectedTur === 'A' ? 1 : 2)
    : null

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
            {selectedGrade && selectedTur 
              ? `${selectedGrade}-sinf ${selectedTur}"-sinf haftalik dars jadvali`
              : 'Sinfni tanlang'}
          </p>
        </motion.div>

        {!selectedGrade ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3"
          >
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => handleGradeClick(cls)}
                className="px-4 py-4 rounded-xl font-bold text-lg transition-all glass hover:bg-primary/20 hover:scale-105"
              >
                {cls}-sinf
              </button>
            ))}
          </motion.div>
        ) : showTurSelect ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="glass rounded-2xl p-8 text-center max-w-md">
              <h3 className="text-xl font-bold mb-4">Turini tanlang</h3>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => handleTurSelect('A')}
                  className="px-8 py-4 rounded-xl font-bold text-2xl bg-gradient-to-r from-primary to-accent-purple text-white hover:scale-105 transition-transform"
                >
                  {selectedGrade}"A"
                </button>
                <button
                  onClick={() => handleTurSelect('B')}
                  className="px-8 py-4 rounded-xl font-bold text-2xl bg-gradient-to-r from-accent-purple to-primary text-white hover:scale-105 transition-transform"
                >
                  {selectedGrade}"B"
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedGrade(null)
                setSelectedTur(null)
                setShowTurSelect(false)
              }}
              className="text-primary hover:underline"
            >
              Orqaga qaytish
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-3 mb-8"
            >
              <button
                onClick={() => isMobile ? setShowMobileClasses(true) : setShowTurSelect(true)}
                className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-primary to-accent-purple text-white flex items-center gap-2"
              >
                <span>{selectedGrade}"{selectedTur}"</span>
                {isMobile ? (
                  <ChevronLeft className="w-4 h-4 rotate-90" />
                ) : (
                  <ChevronLeft className="w-4 h-4 rotate-180" />
                )}
              </button>
              {!isMobile && classes.filter(c => c !== selectedGrade).slice(0, 10).map((cls) => (
                <button
                  key={cls}
                  onClick={() => handleGradeClick(cls)}
                  className="px-4 py-3 rounded-xl font-medium glass hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {cls}-sinf
                </button>
              ))}
            </motion.div>

            {isMobile && showMobileClasses && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-4 mb-6"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">Sinfni tanlang</span>
                  <button onClick={() => setShowMobileClasses(false)} className="p-1">
                    <ChevronLeft className="w-5 h-5 rotate-45" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {classes.map((cls) => (
                    <button
                      key={cls}
                      onClick={() => handleGradeClick(cls)}
                      className="px-3 py-2 rounded-lg font-medium glass hover:bg-primary/20 text-sm"
                    >
                      {cls}-sinf
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {isMobile ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setMobileDayIndex(prev => Math.max(0, prev - 1))}
                    disabled={mobileDayIndex === 0}
                    className="p-2 rounded-lg glass disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-bold text-lg">
                    {getCurrentDays()[mobileDayIndex]}
                    {getCurrentDays()[mobileDayIndex] === currentDayName && (
                      <span className="ml-2 text-primary text-sm">(Bugun)</span>
                    )}
                  </span>
                  <button
                    onClick={() => setMobileDayIndex(prev => Math.min(getCurrentDays().length - 1, prev + 1))}
                    disabled={mobileDayIndex === getCurrentDays().length - 1}
                    className="p-2 rounded-lg glass disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
                  {getCurrentDays().map((day, dayIndex) => (
                    <button
                      key={day}
                      onClick={() => setMobileDayIndex(dayIndex)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium ${
                        dayIndex === mobileDayIndex
                          ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                          : 'glass'
                      }`}
                    >
                      {day}
                      {day === currentDayName && (
                        <span className="ml-1 text-xs opacity-80">(B)</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="glass rounded-2xl p-4 mt-4">
                  <div className="space-y-2">
                    {scheduleData && scheduleData[getCurrentDays()[mobileDayIndex]]?.map((lesson) => {
                      const time = lessonTimes[lesson.number - 1]
                      const isCurrentLesson = getCurrentDays()[mobileDayIndex] === currentDayName && isCurrentTimeInRange(time.start, time.end)

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
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">
                              {lesson.number}-dars • {time.start}-{time.end}
                            </span>
                            {isCurrentLesson && (
                              <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                            )}
                          </div>
                          <p className="font-bold text-base">{lesson.subject}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs opacity-80">
                            <Users className="w-3 h-3" />
                            <span>{lesson.teacher}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-xs opacity-80">
                            <MapPin className="w-3 h-3" />
                            <span>{lesson.room}</span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <div className="flex gap-3 min-w-max">
                    {getCurrentDays().map((day, dayIndex) => (
                      <div
                        key={day}
                        className={`w-40 flex-shrink-0 glass rounded-2xl overflow-hidden ${
                          dayIndex === mobileDayIndex ? 'ring-2 ring-primary' : ''
                        }`}
                      >
                        <div className={`p-3 text-center ${
                          day === currentDayName
                            ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                            : 'bg-gray-100 dark:bg-dark-50'
                        }`}>
                          <p className="font-bold text-sm">{day}</p>
                        </div>
                        <div className="p-2 space-y-1">
                          {scheduleData && scheduleData[day]?.map((lesson) => (
                            <div key={lesson.number} className="text-xs">
                              <span className="font-medium">{lesson.number}.</span> {lesson.subject}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-5 xl:grid-cols-6 gap-4"
              >
                {getCurrentDays().map((day) => {
                  const isToday = day === currentDayName
                  const schedule = scheduleData?.[day] || []

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

                      <div className="p-2 space-y-2">
                        {schedule.map((lesson) => {
                          const time = lessonTimes[lesson.number - 1]
                          const isCurrentLesson = isToday && isCurrentTimeInRange(time.start, time.end)

                          return (
                            <motion.div
                              key={lesson.number}
                              whileHover={{ scale: 1.02 }}
                              className={`rounded-xl p-2 ${
                                isCurrentLesson
                                  ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                                  : `bg-gradient-to-br ${lesson.color} text-white opacity-90`
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs font-medium opacity-80">
                                  {lesson.number}-dars • {time.start}-{time.end}
                                </span>
                                {isCurrentLesson && (
                                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                )}
                              </div>
                              <p className="font-bold text-sm line-clamp-1">{lesson.subject}</p>
                              <div className="flex items-center gap-1 mt-1 text-xs opacity-80">
                                <Users className="w-2.5 h-2.5" />
                                <span className="line-clamp-1">{lesson.teacher}</span>
                              </div>
                              <div className="flex items-center gap-1 mt-0.5 text-xs opacity-80">
                                <MapPin className="w-2.5 h-2.5" />
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
            )}

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
              <div className="mt-2 p-3 rounded-xl bg-blue-500/10 text-sm text-blue-600">
                <p className="flex items-center gap-2">
                  <span className="font-bold">Qoidasi:</span>
                  1-4-sinflar: Dushanba-Juma, 5-11-sinflar: Dushanba-Shanba
                </p>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </main>
  )
}
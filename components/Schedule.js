'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, UserRound } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import EmptyState from '@/components/EmptyState'
import StaffProfileModal from '@/components/StaffProfileModal'

const days = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']

function timeRange(lesson) {
  if (lesson.start_time && lesson.end_time) return `${lesson.start_time.slice(0, 5)} - ${lesson.end_time.slice(0, 5)}`
  return `${lesson.lesson_number}-dars`
}

export default function Schedule() {
  const [schedule, setSchedule] = useState([])
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadSchedule() {
      const { data } = await supabase
        .from('schedule')
        .select('*, staff(id, full_name, role, subject, position, photo_url, phone, email, bio, experience_years, qualification_level, awards, work_type)')
        .eq('is_active', true)
        .order('grade', { ascending: true })
        .order('tur', { ascending: true })
        .order('lesson_number', { ascending: true })

      const rows = data || []
      setSchedule(rows)
      if (rows.length > 0) setSelectedClass(`${rows[0].grade}-${rows[0].tur}`)
      setLoading(false)
    }

    loadSchedule()
  }, [])

  const classSet = useMemo(() => new Set(schedule.map((item) => `${item.grade}-${item.tur}`)), [schedule])
  const classGrades = useMemo(() => Array.from(new Set(schedule.map((item) => item.grade))).sort((a, b) => a - b), [schedule])
  const selectedLessons = useMemo(() => schedule.filter((item) => `${item.grade}-${item.tur}` === selectedClass), [schedule, selectedClass])
  const grouped = useMemo(() => {
    return days.reduce((acc, day) => {
      acc[day] = selectedLessons.filter((lesson) => lesson.day === day).sort((a, b) => a.lesson_number - b.lesson_number)
      return acc
    }, {})
  }, [selectedLessons])
  const visibleDays = useMemo(() => loading ? days : days.filter((day) => grouped[day]?.length), [grouped, loading])

  return (
    <section id="schedule" className="py-20 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Dars <span className="gradient-text">jadvali</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
            Haftalik jadval sinf bo'yicha ko'rsatiladi.
          </p>
        </motion.div>

        {!loading && schedule.length === 0 ? (
          <EmptyState icon={Calendar} title="Hali dars jadvali mavjud emas" />
        ) : (
          <>
            <div className="mb-6 overflow-x-auto pb-2">
              <div className="inline-flex min-w-max flex-col gap-2 rounded-2xl bg-gray-50 p-2 dark:bg-dark-50">
                {['A', 'B'].map((tur) => (
                  <div key={tur} className="flex gap-2">
                    {classGrades.map((grade) => {
                      const cls = `${grade}-${tur}`
                      const exists = classSet.has(cls)
                      return (
                        <button
                          key={cls}
                          type="button"
                          disabled={!exists}
                          onClick={() => setSelectedClass(cls)}
                          className={`h-11 min-w-24 whitespace-nowrap rounded-xl px-4 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-35 ${selectedClass === cls ? 'bg-gradient-to-r from-primary to-accent-purple text-white shadow-lg shadow-primary/20' : 'bg-white text-gray-600 hover:text-primary dark:bg-dark-100 dark:text-gray-300'}`}
                        >
                          {cls} sinf
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              {visibleDays.map((day) => (
                <div key={day} className="glass rounded-2xl p-4">
                  <h3 className="mb-4 font-bold text-primary">{day}</h3>
                  <div className="space-y-3">
                    {loading ? (
                      <div className="h-24 rounded-xl bg-primary/10" />
                    ) : (
                      grouped[day].map((lesson) => (
                        <div key={lesson.id} className="rounded-xl bg-white/70 p-4 shadow-sm dark:bg-dark-50">
                          <p className="flex items-center gap-2 text-xs text-gray-500"><Clock className="h-3.5 w-3.5" />{timeRange(lesson)}</p>
                          <p className="mt-2 font-semibold">{lesson.subject}</p>
                          {lesson.staff?.full_name && (
                            <div className="mt-3">
                              <p className="text-xs text-gray-400">Biriktirilgan ustoz</p>
                              <button type="button" onClick={() => setSelectedTeacher(lesson.staff)} className="mt-1 flex items-center gap-2 text-left text-sm text-primary">
                                <UserRound className="h-4 w-4" />
                                {lesson.staff.full_name}
                              </button>
                            </div>
                          )}
                          {lesson.room && <div className="mt-3"><p className="text-xs text-gray-400">Xona</p><p className="mt-1 flex items-center gap-2 text-xs text-gray-500"><MapPin className="h-3.5 w-3.5" />{lesson.room}</p></div>}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <StaffProfileModal staff={selectedTeacher} onClose={() => setSelectedTeacher(null)} />
    </section>
  )
}

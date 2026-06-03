'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Calendar, Clock, Mail, MapPin, Phone, UserRound, X } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import EmptyState from '@/components/EmptyState'

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
        .select('*, staff(id, full_name, role, subject, position, photo_url, phone, email, bio, experience_years, qualification_level)')
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

  const classes = useMemo(() => Array.from(new Set(schedule.map((item) => `${item.grade}-${item.tur}`))), [schedule])
  const selectedLessons = useMemo(() => schedule.filter((item) => `${item.grade}-${item.tur}` === selectedClass), [schedule, selectedClass])
  const grouped = useMemo(() => {
    return days.reduce((acc, day) => {
      acc[day] = selectedLessons.filter((lesson) => lesson.day === day).sort((a, b) => a.lesson_number - b.lesson_number)
      return acc
    }, {})
  }, [selectedLessons])

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
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              {classes.map((cls) => (
                <button key={cls} onClick={() => setSelectedClass(cls)} className={`whitespace-nowrap rounded-xl px-5 py-2 font-medium transition-all ${selectedClass === cls ? 'bg-gradient-to-r from-primary to-accent-purple text-white' : 'glass hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                  {cls} sinf
                </button>
              ))}
            </div>

            <div className="grid gap-5 xl:grid-cols-6">
              {(loading ? days : days).map((day) => (
                <div key={day} className="glass rounded-2xl p-4">
                  <h3 className="mb-4 font-bold text-primary">{day}</h3>
                  <div className="space-y-3">
                    {loading ? (
                      <div className="h-24 rounded-xl bg-primary/10" />
                    ) : grouped[day]?.length ? (
                      grouped[day].map((lesson) => (
                        <div key={lesson.id} className="rounded-xl bg-white/70 p-4 shadow-sm dark:bg-dark-50">
                          <p className="flex items-center gap-2 text-xs text-gray-500"><Clock className="h-3.5 w-3.5" />{timeRange(lesson)}</p>
                          <p className="mt-2 text-xs text-gray-400">Fan nomi</p>
                          <p className="font-semibold">{lesson.subject}</p>
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
                    ) : (
                      <p className="rounded-xl bg-gray-50 p-3 text-sm text-gray-400 dark:bg-dark-50">Jadval yo'q</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedTeacher && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTeacher(null)}>
            <motion.article initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-dark-50">
              <button onClick={() => setSelectedTeacher(null)} className="ml-auto flex rounded-full bg-gray-100 p-2 dark:bg-dark-100"><X className="h-5 w-5" /></button>
              <div className="mt-2 flex gap-5">
                <div className="aspect-[3/4] w-32 overflow-hidden rounded-2xl bg-primary/10">
                  {selectedTeacher.photo_url ? <img src={selectedTeacher.photo_url} alt={selectedTeacher.full_name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><UserRound className="h-10 w-10 text-primary/40" /></div>}
                </div>
                <div>
                  <p className="text-sm text-primary">{selectedTeacher.subject ? `${selectedTeacher.subject} o'qituvchisi` : selectedTeacher.position}</p>
                  <h3 className="text-2xl font-bold">{selectedTeacher.full_name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{selectedTeacher.experience_years || 0} yil tajriba</p>
                  {selectedTeacher.phone && <p className="mt-4 flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-primary" />{selectedTeacher.phone}</p>}
                  {selectedTeacher.email && <p className="mt-2 flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-primary" />{selectedTeacher.email}</p>}
                </div>
              </div>
              <p className="mt-5 whitespace-pre-line text-sm leading-6 text-gray-600 dark:text-gray-300">{selectedTeacher.bio || "Bio hali kiritilmagan."}</p>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

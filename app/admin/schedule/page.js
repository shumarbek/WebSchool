'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { Clock, Edit2, Plus, Trash2, X } from 'lucide-react'

const days = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']
const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const turs = ['A', 'B']
const subjects = ['Matematika', 'Tarix', 'Ona tili', 'Ingliz tili', 'Rus tili', 'Fizika', 'Kimyo', 'Biologiya', 'Geografiya', 'Informatika', 'Jismoniy tarbiya'].sort((a, b) => a.localeCompare(b, 'uz'))
const timeSlots = [
  { start_time: '09:00', end_time: '09:45' },
  { start_time: '09:50', end_time: '10:35' },
  { start_time: '10:40', end_time: '11:25' },
  { start_time: '11:30', end_time: '12:15' },
  { start_time: '12:45', end_time: '13:30' },
  { start_time: '13:35', end_time: '14:20' },
]
const emptyLesson = { subject: '', teacher_id: '', room: '' }

export default function AdminSchedulePage() {
  const [rows, setRows] = useState([])
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedClass, setSelectedClass] = useState('1-A')
  const [showModal, setShowModal] = useState(false)
  const [editingKey, setEditingKey] = useState(null)
  const [formData, setFormData] = useState({ grade: 1, tur: 'A', day: 'Dushanba', lessons: [{ ...emptyLesson }] })
  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const [{ data: scheduleRows }, { data: staffRows }] = await Promise.all([
      supabase.from('schedule').select('*, staff(full_name, subject)').order('grade').order('tur').order('day').order('lesson_number'),
      supabase.from('staff').select('id, full_name, subject').eq('role', 'pedagog').eq('is_active', true).order('full_name'),
    ])
    const nextRows = scheduleRows || []
    setRows(nextRows)
    setTeachers(staffRows || [])
    setSelectedClass((current) => {
      if (current && nextRows.some((row) => `${row.grade}-${row.tur}` === current)) return current
      if (nextRows.length > 0) return `${nextRows[0].grade}-${nextRows[0].tur}`
      return current || '1-A'
    })
    setLoading(false)
  }

  const groups = useMemo(() => {
    const map = new Map()
    rows.forEach((row) => {
      const key = `${row.grade}-${row.tur}-${row.day}`
      if (!map.has(key)) map.set(key, { key, grade: row.grade, tur: row.tur, day: row.day, lessons: [] })
      map.get(key).lessons.push(row)
    })
    return Array.from(map.values()).sort((a, b) => {
      if (a.grade !== b.grade) return a.grade - b.grade
      if (a.tur !== b.tur) return a.tur.localeCompare(b.tur)
      return days.indexOf(a.day) - days.indexOf(b.day)
    })
  }, [rows])

  const classSet = useMemo(() => new Set(rows.map((row) => `${row.grade}-${row.tur}`)), [rows])
  const classGrades = useMemo(() => grades, [])
  const selectedGroups = useMemo(() => groups.filter((group) => `${group.grade}-${group.tur}` === selectedClass), [groups, selectedClass])

  const availableDays = useMemo(() => {
    const used = new Set(rows.filter((row) => row.grade === parseInt(formData.grade) && row.tur === formData.tur).map((row) => row.day))
    if (editingKey) return days
    return days.filter((day) => !used.has(day))
  }, [editingKey, formData.grade, formData.tur, rows])

  function resetForm() {
    const [gradeValue, turValue] = (selectedClass || '1-A').split('-')
    const grade = parseInt(gradeValue) || 1
    const tur = turValue || 'A'
    const firstDay = days.find((day) => !rows.some((row) => row.grade === grade && row.tur === tur && row.day === day)) || days[0]
    setFormData({ grade, tur, day: firstDay, lessons: [{ ...emptyLesson }] })
  }

  function openCreate() {
    setEditingKey(null)
    resetForm()
    setShowModal(true)
  }

  function openEdit(group) {
    setEditingKey(group.key)
    setFormData({
      grade: group.grade,
      tur: group.tur,
      day: group.day,
      lessons: group.lessons.sort((a, b) => a.lesson_number - b.lesson_number).map((lesson) => ({
        subject: lesson.subject || '',
        teacher_id: lesson.teacher_id || '',
        room: lesson.room || '',
      })),
    })
    setShowModal(true)
  }

  function updateLesson(index, key, value) {
    setFormData((current) => ({
      ...current,
      lessons: current.lessons.map((lesson, idx) => idx === index ? { ...lesson, [key]: value } : lesson),
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const lessons = formData.lessons.filter((lesson) => lesson.subject.trim())
    if (lessons.length === 0) {
      alert('Kamida bitta dars kiriting')
      return
    }
    if (lessons.length > timeSlots.length) {
      alert('Kuniga hozircha 6 ta dars qo\'shish mumkin')
      return
    }

    try {
      const { error: deleteError } = await supabase
        .from('schedule')
        .delete()
        .eq('grade', parseInt(formData.grade))
        .eq('tur', formData.tur)
        .eq('day', formData.day)

      if (deleteError) throw deleteError

      const payload = lessons.map((lesson, index) => ({
        grade: parseInt(formData.grade),
        tur: formData.tur,
        day: formData.day,
        lesson_number: index + 1,
        subject: lesson.subject,
        teacher_id: lesson.teacher_id || null,
        room: lesson.room,
        start_time: timeSlots[index]?.start_time || null,
        end_time: timeSlots[index]?.end_time || null,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))

      const { error } = await supabase.from('schedule').insert(payload)
      if (error) throw error

      setShowModal(false)
      setEditingKey(null)
      resetForm()
      loadData()
    } catch (error) {
      console.error('Error saving schedule:', error)
      alert('Xatolik yuz berdi')
    }
  }

  async function handleDelete(group) {
    if (!confirm("Bu kun jadvalini o'chirishni xohlaysizmi?")) return
    const { error } = await supabase.from('schedule').delete().eq('grade', group.grade).eq('tur', group.tur).eq('day', group.day)
    if (error) console.error('Error deleting schedule:', error)
    loadData()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl"><span className="gradient-text">Dars jadvali</span></h1>
          <p className="text-gray-500">Kunlik jadvalni bir martada qo'shish va tahrirlash</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent-purple px-4 py-2.5 font-medium text-white"><Plus className="h-5 w-5" />Kun qo'shish</button>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="inline-flex min-w-max flex-col gap-2 rounded-2xl bg-white p-2 shadow-sm dark:bg-dark-50">
          {['A', 'B'].map((tur) => (
            <div key={tur} className="flex gap-2">
              {classGrades.map((grade) => {
                const cls = `${grade}-${tur}`
                const hasSchedule = classSet.has(cls)
                return (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setSelectedClass(cls)}
                    className={`h-11 min-w-20 rounded-xl px-3 text-sm font-semibold transition-all ${selectedClass === cls ? 'bg-gradient-to-r from-primary to-accent-purple text-white shadow-lg shadow-primary/20' : hasSchedule ? 'bg-gray-50 text-gray-700 hover:text-primary dark:bg-dark-100 dark:text-gray-300' : 'bg-gray-50 text-gray-400 hover:text-primary dark:bg-dark-100 dark:text-gray-500'}`}
                  >
                    {cls}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>
      ) : selectedGroups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-12 text-center dark:border-gray-700 dark:bg-dark-50">
          <Clock className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <p className="font-medium text-gray-600 dark:text-gray-300">{selectedClass} sinf uchun jadval yo'q</p>
          <p className="mt-1 text-sm text-gray-500">Kun qo'shish tugmasi orqali haftalik jadvalni kiriting.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">{selectedClass} sinf haftalik jadvali</h2>
            <p className="text-sm text-gray-500">Faqat jadval biriktirilgan hafta kunlari ko'rsatiladi.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {selectedGroups.map((group) => (
            <div key={group.key} className="glass rounded-2xl p-4">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{group.grade}-{group.tur} sinf</h3>
                  <p className="text-primary">{group.day}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(group)} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"><Edit2 className="h-4 w-4 text-gray-500" /></button>
                  <button onClick={() => handleDelete(group)} className="rounded-lg p-2 hover:bg-red-50"><Trash2 className="h-4 w-4 text-red-500" /></button>
                </div>
              </div>
              <div className="space-y-2">
                {group.lessons.sort((a, b) => a.lesson_number - b.lesson_number).map((lesson) => (
                  <div key={lesson.id} className="rounded-xl bg-white/70 p-3 text-sm dark:bg-dark-50">
                    <p className="font-medium">{lesson.lesson_number}. {lesson.subject}</p>
                    <p className="text-gray-500">{lesson.start_time ? `${lesson.start_time.slice(0, 5)} - ${lesson.end_time?.slice(0, 5) || ''}` : 'Vaqt kiritilmagan'} | {lesson.staff?.full_name || 'Ustoz tanlanmagan'} | {lesson.room || 'Xona yoq'}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}>
            <motion.div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-dark-50" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">{editingKey ? 'Kun jadvalini tahrirlash' : "Kun jadvali qo'shish"}</h2>
                <button onClick={() => setShowModal(false)} className="rounded-lg p-2 hover:bg-gray-100"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-3">
                  <Select label="Sinf" value={formData.grade} options={grades} onChange={(value) => setFormData({ ...formData, grade: parseInt(value), day: '' })} disabled={!!editingKey} suffix="-sinf" />
                  <Select label="Tur" value={formData.tur} options={turs} onChange={(value) => setFormData({ ...formData, tur: value, day: '' })} disabled={!!editingKey} />
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">Kun</span>
                    <select required value={formData.day} onChange={(e) => setFormData({ ...formData, day: e.target.value })} disabled={!!editingKey} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none disabled:opacity-60 dark:border-gray-700 dark:bg-dark-100">
                      <option value="">Tanlang</option>
                      {availableDays.map((day) => <option key={day} value={day}>{day}</option>)}
                    </select>
                  </label>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Darslar</h3>
                    <button type="button" disabled={formData.lessons.length >= timeSlots.length} onClick={() => setFormData({ ...formData, lessons: [...formData.lessons, { ...emptyLesson }] })} className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm text-primary disabled:opacity-50">Dars qo'shish</button>
                  </div>
                  {formData.lessons.map((lesson, index) => (
                    <div key={index} className="grid gap-3 rounded-2xl bg-gray-50 p-3 dark:bg-dark-100 md:grid-cols-[100px_1fr_1fr_1fr_auto]">
                      <div className="rounded-xl bg-white px-3 py-2 text-sm text-gray-500 dark:bg-dark-50">
                        {index + 1}-dars<br />{timeSlots[index]?.start_time} - {timeSlots[index]?.end_time}
                      </div>
                      <select required value={lesson.subject} onChange={(e) => updateLesson(index, 'subject', e.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-dark-50">
                        <option value="">Fan</option>
                        {subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
                      </select>
                      <select value={lesson.teacher_id} onChange={(e) => updateLesson(index, 'teacher_id', e.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-dark-50">
                        <option value="">Ustoz</option>
                        {teachers.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.full_name}</option>)}
                      </select>
                      <input value={lesson.room} onChange={(e) => updateLesson(index, 'room', e.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-dark-50" placeholder="Xona" />
                      <button type="button" onClick={() => setFormData({ ...formData, lessons: formData.lessons.filter((_, idx) => idx !== index) })} className="rounded-xl bg-red-50 px-3 py-2 text-red-500">O'chirish</button>
                    </div>
                  ))}
                </div>

                <button className="w-full rounded-xl bg-gradient-to-r from-primary to-accent-purple py-3 font-medium text-white">Saqlash</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Select({ label, value, options, onChange, disabled = false, suffix = '' }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none disabled:opacity-60 dark:border-gray-700 dark:bg-dark-100">
        {options.map((option) => <option key={option} value={option}>{option}{suffix}</option>)}
      </select>
    </label>
  )
}

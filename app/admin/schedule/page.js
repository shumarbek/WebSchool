'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { 
  Plus, Search, Edit2, Trash2, X, Clock, BookOpen, Users, Building2
} from 'lucide-react'

const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const turOptions = ['A', 'B']
const daysLower = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma']
const daysUpper = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']
const lessonNumbers = [1, 2, 3, 4, 5, 6]
const subjects = ['Matematika', 'Fizika', 'Kimyo', 'Biologiya', 'Ingliz tili', 'Informatika', 'Tarix', 'Geografiya', 'Adabiyot', 'Musiqa', 'Chizmachilik', 'Jismoniy tarbiya']
const rooms = ['201', '202', '301', '302', '303', '304', '305', '401', '402', '403', '501', '502', 'Sport zali']

export default function AdminSchedulePage() {
  const [schedule, setSchedule] = useState([])
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterGrade, setFilterGrade] = useState('all')
  const [filterTur, setFilterTur] = useState('all')
  const [filterDay, setFilterDay] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    grade: 9,
    tur: 'A',
    day: 'Dushanba',
    lesson_number: 1,
    subject: '',
    teacher_id: '',
    room: '',
    week_type: 'both',
    is_active: true,
  })
  const supabase = createClient()

  useEffect(() => {
    loadSchedule()
    loadStaff()
  }, [])

  async function loadSchedule() {
    try {
      const { data, error } = await supabase
        .from('schedule')
        .select('*, staff(full_name)')
        .order(['grade', 'tur', 'day', 'lesson_number'])
      
      if (error) throw error
      setSchedule(data || [])
    } catch (error) {
      console.error('Error loading schedule:', error)
    } finally {
      setLoading(false)
    }
  }

  async function loadStaff() {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('id, full_name, subject')
        .eq('role', 'teacher')
        .eq('is_active', true)
      
      if (error) throw error
      setStaff(data || [])
    } catch (error) {
      console.error('Error loading staff:', error)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const submitData = {
        ...formData,
        teacher_id: formData.teacher_id || null,
        updated_at: new Date().toISOString(),
      }

      if (editingItem) {
        const { error } = await supabase
          .from('schedule')
          .update(submitData)
          .eq('id', editingItem.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('schedule')
          .insert({ ...submitData, created_at: new Date().toISOString() })
        
        if (error) throw error
      }
      
      setShowModal(false)
      setEditingItem(null)
      resetForm()
      loadSchedule()
    } catch (error) {
      console.error('Error saving schedule:', error)
      alert('Xatolik yuz berdi')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Rostdan ham o\'chirishni xohlaymisiz?')) return
    
    try {
      const { error } = await supabase.from('schedule').delete().eq('id', id)
      if (error) throw error
      loadSchedule()
    } catch (error) {
      console.error('Error deleting schedule:', error)
    }
  }

  function resetForm() {
    setFormData({
      grade: 9,
      tur: 'A',
      day: 'Dushanba',
      lesson_number: 1,
      subject: '',
      teacher_id: '',
      room: '',
      week_type: 'both',
      is_active: true,
    })
  }

  function openEdit(item) {
    setEditingItem(item)
    setFormData({
      grade: item.grade,
      tur: item.tur,
      day: item.day,
      lesson_number: item.lesson_number,
      subject: item.subject || '',
      teacher_id: item.teacher_id || '',
      room: item.room || '',
      week_type: item.week_type || 'both',
      is_active: item.is_active ?? true,
    })
    setShowModal(true)
  }

  const getAvailableDays = (grade) => grade >= 5 ? daysUpper : daysLower

  const filteredSchedule = schedule.filter(item => {
    const matchesGrade = filterGrade === 'all' || item.grade === parseInt(filterGrade)
    const matchesTur = filterTur === 'all' || item.tur === filterTur
    const matchesDay = filterDay === 'all' || item.day === filterDay
    return matchesGrade && matchesTur && matchesDay
  })

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="gradient-text">Dars jadvali</span>
          </h1>
          <p className="text-gray-500">Dars jadvalini boshqarish</p>
        </div>
        <button
          onClick={() => { resetForm(); setEditingItem(null); setShowModal(true) }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-medium hover:opacity-90"
        >
          <Plus className="w-5 h-5" />
          Qo'shish
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3"
      >
        <select
          value={filterGrade}
          onChange={(e) => setFilterGrade(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
        >
          <option value="all">Barcha sinflar</option>
          {grades.map(g => <option key={g} value={g}>{g}-sinf</option>)}
        </select>
        <select
          value={filterTur}
          onChange={(e) => setFilterTur(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
        >
          <option value="all">Barcha tur</option>
          {turOptions.map(t => <option key={t} value={t}>{t} tur</option>)}
        </select>
        <select
          value={filterDay}
          onChange={(e) => setFilterDay(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
        >
          <option value="all">Barcha kunlar</option>
          {[...daysUpper].map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredSchedule.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Jadval topilmadi</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[800px] glass rounded-2xl overflow-hidden">
            <thead className="bg-gray-100 dark:bg-dark-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Sinf</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Kun</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Dars</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Fan</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Ustoz</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Xona</th>
                <th className="px-4 py-3 text-right text-sm font-medium">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSchedule.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3">
                    <span className="font-medium">{item.grade}"{item.tur}"</span>
                  </td>
                  <td className="px-4 py-3 text-sm">{item.day}</td>
                  <td className="px-4 py-3 text-sm">{item.lesson_number}-dars</td>
                  <td className="px-4 py-3 text-sm">{item.subject}</td>
                  <td className="px-4 py-3 text-sm">{item.staff?.full_name || '-'}</td>
                  <td className="px-4 py-3 text-sm">{item.room || '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <Edit2 className="w-4 h-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto glass rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  {editingItem ? 'Darsni tahrirlash' : 'Yangi dars qo\'shish'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Sinf *</label>
                    <select
                      required
                      value={formData.grade}
                      onChange={(e) => {
                        const grade = parseInt(e.target.value)
                        setFormData({ 
                          ...formData, 
                          grade,
                          day: grade >= 5 ? 'Dushanba' : 'Dushanba'
                        })
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    >
                      {grades.map(g => <option key={g} value={g}>{g}-sinf</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Tur *</label>
                    <select
                      required
                      value={formData.tur}
                      onChange={(e) => setFormData({ ...formData, tur: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    >
                      {turOptions.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Kun *</label>
                    <select
                      required
                      value={formData.day}
                      onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    >
                      {getAvailableDays(formData.grade).map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Dars raqami *</label>
                    <select
                      required
                      value={formData.lesson_number}
                      onChange={(e) => setFormData({ ...formData, lesson_number: parseInt(e.target.value) })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    >
                      {lessonNumbers.map(n => <option key={n} value={n}>{n}-dars</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Xona</label>
                    <select
                      value={formData.room}
                      onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    >
                      <option value="">Tanlang</option>
                      {rooms.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Fan *</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                  >
                    <option value="">Tanlang</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Ustoz</label>
                  <select
                    value={formData.teacher_id}
                    onChange={(e) => setFormData({ ...formData, teacher_id: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                  >
                    <option value="">Tanlang</option>
                    {staff.map(s => <option key={s.id} value={s.id}>{s.full_name} ({s.subject})</option>)}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label htmlFor="is_active" className="text-sm">Faol</label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-medium hover:opacity-90"
                >
                  {editingItem ? 'Saqlash' : 'Qo\'shish'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { 
  Plus, Search, Edit2, Trash2, X, Award, Medal, Trophy
} from 'lucide-react'

const categories = ['olimpiada', 'sport', 'ilmiy', 'sertifikat']
const categoryLabels = {
  olimpiada: 'Olimpiada',
  sport: 'Sport',
  ilmiy: 'Ilmiy',
  sertifikat: 'Sertifikat',
}

const levels = ['mintaqa', 'viloyat', 'respublika', 'xalqaro']
const levelLabels = {
  mintaqa: 'Mintaqa',
  viloyat: 'Viloyat',
  respublika: 'Respublika',
  xalqaro: 'Xalqaro',
}

export default function AdminAchievementsPage() {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'olimpiada',
    level: 'viloyat',
    student_name: '',
    student_photo_url: '',
    teacher_name: '',
    award_date: '',
    image_url: '',
    is_published: true,
  })
  const supabase = createClient()

  useEffect(() => {
    loadAchievements()
  }, [])

  async function loadAchievements() {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('award_date', { ascending: false })
      
      if (error) throw error
      setAchievements(data || [])
    } catch (error) {
      console.error('Error loading achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const submitData = {
        ...formData,
        award_date: formData.award_date || null,
        updated_at: new Date().toISOString(),
      }

      if (editingItem) {
        const { error } = await supabase
          .from('achievements')
          .update(submitData)
          .eq('id', editingItem.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('achievements')
          .insert({ ...submitData, created_at: new Date().toISOString() })
        
        if (error) throw error
      }
      
      setShowModal(false)
      setEditingItem(null)
      resetForm()
      loadAchievements()
    } catch (error) {
      console.error('Error saving achievement:', error)
      alert('Xatolik yuz berdi')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Rostdan ham o\'chirishni xohlaymisiz?')) return
    
    try {
      const { error } = await supabase.from('achievements').delete().eq('id', id)
      if (error) throw error
      loadAchievements()
    } catch (error) {
      console.error('Error deleting achievement:', error)
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      description: '',
      category: 'olimpiada',
      level: 'viloyat',
      student_name: '',
      student_photo_url: '',
      teacher_name: '',
      award_date: '',
      image_url: '',
      is_published: true,
    })
  }

  function openEdit(item) {
    setEditingItem(item)
    setFormData({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'olimpiada',
      level: item.level || 'viloyat',
      student_name: item.student_name || '',
      student_photo_url: item.student_photo_url || '',
      teacher_name: item.teacher_name || '',
      award_date: item.award_date || '',
      image_url: item.image_url || '',
      is_published: item.is_published ?? true,
    })
    setShowModal(true)
  }

  const filteredAchievements = achievements.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.student_name?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getLevelColor = (level) => {
    const colors = {
      mintaqa: 'bg-blue-500',
      viloyat: 'bg-green-500',
      respublika: 'bg-purple-500',
      xalqaro: 'bg-amber-500',
    }
    return colors[level] || 'bg-gray-500'
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="gradient-text">Yutuqlar</span>
          </h1>
          <p className="text-gray-500">O'quvchi yutuqlarini boshqarish</p>
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
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
        >
          <option value="all">Barcha kategoriya</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{categoryLabels[cat]}</option>
          ))}
        </select>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredAchievements.length === 0 ? (
        <div className="text-center py-12">
          <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Yutuqlar topilmadi</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredAchievements.map((item) => (
            <div
              key={item.id}
              className="glass rounded-2xl overflow-hidden hover-lift"
            >
              <div className="h-32 bg-gradient-to-br from-primary/20 to-accent-purple/20 relative">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-primary/30" />
                  </div>
                )}
                <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg ${getLevelColor(item.level)} text-white text-xs font-medium`}>
                  {levelLabels[item.level]}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                    {categoryLabels[item.category]}
                  </span>
                </div>
                <h3 className="font-bold line-clamp-1 mb-1">{item.title}</h3>
                {item.student_name && (
                  <p className="text-sm text-primary mb-1">{item.student_name}</p>
                )}
                {item.award_date && (
                  <p className="text-xs text-gray-500">{item.award_date}</p>
                )}
                <div className="flex gap-1 mt-3">
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
              </div>
            </div>
          ))}
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
                  {editingItem ? 'Yutuqni tahrirlash' : 'Yangi yutuq qo\'shish'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Sarlavha *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    placeholder="Yutuq sarlavhasi"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Kategoriya *</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{categoryLabels[cat]}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Daraja *</label>
                    <select
                      required
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    >
                      {levels.map(lvl => (
                        <option key={lvl} value={lvl}>{levelLabels[lvl]}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">O'quvchi ismi</label>
                  <input
                    type="text"
                    value={formData.student_name}
                    onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    placeholder="O'quvchi ismi"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Ustoz</label>
                    <input
                      type="text"
                      value={formData.teacher_name}
                      onChange={(e) => setFormData({ ...formData, teacher_name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                      placeholder="Ustoz ismi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Sana</label>
                    <input
                      type="date"
                      value={formData.award_date}
                      onChange={(e) => setFormData({ ...formData, award_date: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Tavsif</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none resize-none"
                    placeholder="Yutuq tavsifi..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Rasm URL</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label htmlFor="is_published" className="text-sm">Chop etish</label>
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
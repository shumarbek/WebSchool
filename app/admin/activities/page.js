'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { 
  Plus, Search, Edit2, Trash2, X, Calendar, MapPin, Users, ExternalLink
} from 'lucide-react'

const categories = ['olimpiada', 'sport', 'madaniyat', 'hashar', 'bayram']
const categoryLabels = {
  olimpiada: 'Olimpiada',
  sport: 'Sport',
  madaniyat: 'Madaniyat',
  hashar: 'Hashar',
  bayram: 'Bayram',
}

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [teachers, setTeachers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'madaniyat',
    date: '',
    image_url: '',
    image_urls: '',
    video_urls: '',
    teacher_ids: [],
    location: '',
    location_url: '',
    participants_count: '',
    is_published: true,
  })
  const supabase = createClient()

  useEffect(() => {
    loadActivities()
    loadTeachers()
  }, [])

  async function loadTeachers() {
    const { data } = await supabase
      .from('staff')
      .select('id, full_name')
      .eq('role', 'pedagog')
      .eq('is_active', true)
      .order('full_name', { ascending: true })

    setTeachers(data || [])
  }

  async function loadActivities() {
    try {
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .order('date', { ascending: false })
      
      if (error) throw error
      setActivities(data || [])
    } catch (error) {
      console.error('Error loading activities:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const today = new Date().toISOString().slice(0, 10)
    if (formData.date && formData.date > today) {
      alert('Faoliyat sanasi kelajakda bo\'lishi mumkin emas')
      return
    }
    const imageUrls = parseUrls(formData.image_urls || formData.image_url)
    const videoUrls = parseUrls(formData.video_urls)
    const teacherNames = teachers.filter((teacher) => formData.teacher_ids.includes(teacher.id)).map((teacher) => teacher.full_name)
    try {
      const submitData = {
        ...formData,
        image_urls: imageUrls,
        video_urls: videoUrls,
        teacher_ids: formData.teacher_ids,
        teacher_names: teacherNames,
        image_url: imageUrls[0] || '',
        participants_count: formData.participants_count ? parseInt(formData.participants_count) : null,
        date: formData.date || null,
        updated_at: new Date().toISOString(),
      }

      await saveActivity(submitData)
      
      setShowModal(false)
      setEditingItem(null)
      resetForm()
      loadActivities()
    } catch (error) {
      console.error('Error saving activity:', error)
      alert('Xatolik yuz berdi')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Rostdan ham o\'chirishni xohlaymisiz?')) return
    
    try {
      const { error } = await supabase.from('activities').delete().eq('id', id)
      if (error) throw error
      loadActivities()
    } catch (error) {
      console.error('Error deleting activity:', error)
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      description: '',
      category: 'madaniyat',
      date: '',
      image_url: '',
      image_urls: '',
      video_urls: '',
      teacher_ids: [],
      location: '',
      location_url: '',
      participants_count: '',
      is_published: true,
    })
  }

  function openEdit(item) {
    setEditingItem(item)
    setFormData({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'madaniyat',
      date: item.date || '',
      image_url: item.image_url || '',
      image_urls: Array.isArray(item.image_urls) ? item.image_urls.join('\n') : item.image_url || '',
      video_urls: Array.isArray(item.video_urls) ? item.video_urls.join('\n') : '',
      teacher_ids: Array.isArray(item.teacher_ids) ? item.teacher_ids : [],
      location: item.location || '',
      location_url: item.location_url || mapSearchUrl(item.location || ''),
      participants_count: item.participants_count?.toString() || '',
      is_published: item.is_published ?? true,
    })
    setShowModal(true)
  }

  const filteredActivities = activities.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  function toggleTeacher(id) {
    setFormData((current) => ({
      ...current,
      teacher_ids: current.teacher_ids.includes(id)
        ? current.teacher_ids.filter((teacherId) => teacherId !== id)
        : [...current.teacher_ids, id],
    }))
  }

  async function saveActivity(submitData) {
    const payload = editingItem ? submitData : { ...submitData, created_at: new Date().toISOString() }
    const result = editingItem
      ? await supabase.from('activities').update(payload).eq('id', editingItem.id)
      : await supabase.from('activities').insert(payload)

    if (!isSchemaCacheColumnError(result.error)) {
      if (result.error) throw result.error
      return
    }

    const fallbackPayload = { ...payload }
    delete fallbackPayload.teacher_ids
    delete fallbackPayload.teacher_names
    delete fallbackPayload.location_url

    const fallbackResult = editingItem
      ? await supabase.from('activities').update(fallbackPayload).eq('id', editingItem.id)
      : await supabase.from('activities').insert(fallbackPayload)

    if (fallbackResult.error) throw fallbackResult.error
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
            <span className="gradient-text">Faoliyat</span>
          </h1>
          <p className="text-gray-500">Tadbirlarni boshqarish</p>
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
      ) : filteredActivities.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Tadbirlar topilmadi</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredActivities.map((item) => (
            <div
              key={item.id}
              className="glass rounded-2xl overflow-hidden hover-lift"
            >
              <div className="h-36 bg-gradient-to-br from-primary/20 to-accent-purple/20 relative">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Calendar className="w-10 h-10 text-primary/30" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary mb-2 inline-block">
                  {categoryLabels[item.category]}
                </span>
                <h3 className="font-bold line-clamp-1 mb-2">{item.title}</h3>
                <div className="space-y-1 text-sm text-gray-500">
                  {item.date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{item.date}</span>
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  )}
                  {item.participants_count && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{item.participants_count} kishi</span>
                    </div>
                  )}
                </div>
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
                  {editingItem ? 'Tadbirni tahrirlash' : 'Yangi tadbir qo\'shish'}
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
                    placeholder="Tadbir sarlavhasi"
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
                    <label className="block text-sm font-medium mb-1.5">Sana</label>
                    <input
                      type="date"
                      max={new Date().toISOString().slice(0, 10)}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
                    placeholder="Tadbir tavsifi..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Manzil</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => {
                        const location = e.target.value
                        setFormData({ ...formData, location, location_url: formData.location_url || mapSearchUrl(location) })
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                      placeholder="Manzil"
                    />
                    {formData.location && (
                      <div className="mt-2 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                        <iframe title="Manzil xaritasi" src={mapEmbedUrl(formData.location)} className="h-44 w-full" loading="lazy" />
                        <div className="flex items-center gap-2 bg-white p-2 dark:bg-dark-50">
                          <input
                            value={formData.location_url}
                            onChange={(e) => setFormData({ ...formData, location_url: e.target.value })}
                            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-100"
                            placeholder="Xarita havolasi"
                          />
                          <a href={formData.location_url || mapSearchUrl(formData.location)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-primary/10 px-3 py-2 text-xs font-medium text-primary">
                            <ExternalLink className="h-3.5 w-3.5" />
                            Ochish
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Ishtirokchilar soni</label>
                    <input
                      type="number"
                      value={formData.participants_count}
                      onChange={(e) => setFormData({ ...formData, participants_count: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Rasm URLlari</label>
                  <textarea
                    rows={3}
                    value={formData.image_urls}
                    onChange={(e) => setFormData({ ...formData, image_urls: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    placeholder="Har bir URL yangi qatorda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Video URLlari</label>
                  <textarea
                    rows={3}
                    value={formData.video_urls}
                    onChange={(e) => setFormData({ ...formData, video_urls: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    placeholder="Har bir URL yangi qatorda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Biriktirilgan o'qituvchilar</label>
                  <div className="max-h-40 overflow-y-auto rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 p-3 space-y-2">
                    {teachers.length === 0 ? (
                      <p className="text-sm text-gray-500">O'qituvchi topilmadi</p>
                    ) : teachers.map((teacher) => (
                      <label key={teacher.id} className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={formData.teacher_ids.includes(teacher.id)} onChange={() => toggleTeacher(teacher.id)} className="w-4 h-4" />
                        {teacher.full_name}
                      </label>
                    ))}
                  </div>
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

function parseUrls(value) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function isSchemaCacheColumnError(error) {
  return error?.code === 'PGRST204' || error?.message?.includes('schema cache')
}

function mapSearchUrl(location) {
  if (!location?.trim()) return ''
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.trim())}`
}

function mapEmbedUrl(location) {
  return `https://www.google.com/maps?q=${encodeURIComponent(location || '')}&output=embed`
}

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { 
  Plus, Search, Edit2, Trash2, X, FileText, Eye, Star
} from 'lucide-react'

const categories = ['elon', 'maqola', 'ozgarish', 'tadbir']
const categoryLabels = {
  elon: 'E\'lon',
  maqola: 'Maqola',
  ozgarish: 'O\'zgarish',
  tadbir: 'Tadbir',
}

export default function AdminNewsPage() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [teachers, setTeachers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'elon',
    image_url: '',
    author: '',
    event_start_at: '',
    responsible_person_id: '',
    responsible_person: '',
    is_published: true,
    is_featured: false,
  })
  const supabase = createClient()

  useEffect(() => {
    loadNews()
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

  async function loadNews() {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false })
      
      if (error) throw error
      setNews(data || [])
    } catch (error) {
      console.error('Error loading news:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (formData.category === 'maqola' && !formData.author.trim()) {
      alert('Maqola uchun muallif majburiy')
      return
    }
    if (formData.category === 'tadbir' && (!formData.event_start_at || !formData.responsible_person_id)) {
      alert('Tadbir uchun boshlanish vaqti va mas\'ul shaxs majburiy')
      return
    }
    try {
      const selectedTeacher = teachers.find((teacher) => teacher.id === formData.responsible_person_id)
      const submitData = {
        ...formData,
        event_start_at: formData.event_start_at || null,
        responsible_person_id: formData.category === 'tadbir' ? formData.responsible_person_id : null,
        responsible_person: formData.category === 'tadbir' ? selectedTeacher?.full_name || formData.responsible_person : null,
        author: formData.category === 'maqola' ? formData.author : formData.author,
        published_at: formData.is_published ? (editingItem?.published_at || new Date().toISOString()) : null,
        updated_at: new Date().toISOString(),
      }

      await saveNews(submitData)
      
      setShowModal(false)
      setEditingItem(null)
      resetForm()
      loadNews()
    } catch (error) {
      console.error('Error saving news:', error)
      alert('Xatolik yuz berdi')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Rostdan ham o\'chirishni xohlaymisiz?')) return
    
    try {
      const { error } = await supabase.from('news').delete().eq('id', id)
      if (error) throw error
      loadNews()
    } catch (error) {
      console.error('Error deleting news:', error)
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      content: '',
      category: 'elon',
      image_url: '',
      author: '',
      event_start_at: '',
      responsible_person_id: '',
      responsible_person: '',
      is_published: true,
      is_featured: false,
    })
  }

  function openEdit(item) {
    setEditingItem(item)
    setFormData({
      title: item.title || '',
      content: item.content || '',
      category: item.category || 'elon',
      image_url: item.image_url || '',
      author: item.author || '',
      event_start_at: item.event_start_at ? item.event_start_at.slice(0, 16) : '',
      responsible_person_id: item.responsible_person_id || '',
      responsible_person: item.responsible_person || '',
      is_published: item.is_published ?? true,
      is_featured: item.is_featured ?? false,
    })
    setShowModal(true)
  }

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  async function saveNews(submitData) {
    const payload = editingItem ? submitData : { ...submitData, created_at: new Date().toISOString() }
    const result = editingItem
      ? await supabase.from('news').update(payload).eq('id', editingItem.id)
      : await supabase.from('news').insert(payload)

    if (!isSchemaCacheColumnError(result.error)) {
      if (result.error) throw result.error
      return
    }

    const fallbackPayload = { ...payload }
    delete fallbackPayload.responsible_person_id

    const fallbackResult = editingItem
      ? await supabase.from('news').update(fallbackPayload).eq('id', editingItem.id)
      : await supabase.from('news').insert(fallbackPayload)

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
            <span className="gradient-text">Yangiliklar</span>
          </h1>
          <p className="text-gray-500">Yangiliklarni boshqarish</p>
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
      ) : filteredNews.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Yangiliklar topilmadi</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className="glass rounded-2xl overflow-hidden hover-lift"
            >
              <div className="h-40 bg-gradient-to-br from-primary/20 to-accent-purple/20 relative">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="w-12 h-12 text-primary/30" />
                  </div>
                )}
                {item.is_featured && (
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-amber-500 text-white text-xs font-medium flex items-center gap-1">
                    <Star className="w-3 h-3" /> Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                    {categoryLabels[item.category]}
                  </span>
                  {item.is_published ? (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-green-500/10 text-green-600">Faol</span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-gray-500/10 text-gray-500">Nofaol</span>
                  )}
                </div>
                <h3 className="font-bold line-clamp-2 mb-2">{item.title}</h3>
                {item.author && (
                  <p className="text-sm text-gray-500 mb-3">{item.author}</p>
                )}
                <p className="text-xs text-gray-400 mb-3">
                  {item.published_at ? new Date(item.published_at).toLocaleDateString('uz-UZ') : 'Chop etilmagan'}
                </p>
                <div className="flex gap-1">
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
                  {editingItem ? 'Yangilikni tahrirlash' : 'Yangi yangilik qo\'shish'}
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
                    placeholder="Sarlavha"
                  />
                </div>

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
                  <label className="block text-sm font-medium mb-1.5">Mazmun</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none resize-none"
                    placeholder="Yangilik matni..."
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

                {formData.category === 'maqola' && (
                <div>
                  <label className="block text-sm font-medium mb-1.5">Muallif</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    placeholder="Muallif ismi"
                  />
                </div>
                )}

                {formData.category === 'tadbir' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Boshlanish vaqti *</label>
                      <input type="datetime-local" required value={formData.event_start_at} onChange={(e) => setFormData({ ...formData, event_start_at: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Mas'ul shaxs *</label>
                      <select required value={formData.responsible_person_id} onChange={(e) => {
                        const teacher = teachers.find((item) => item.id === e.target.value)
                        setFormData({ ...formData, responsible_person_id: e.target.value, responsible_person: teacher?.full_name || '' })
                      }} className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none">
                        <option value="">Tanlang</option>
                        {teachers.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.full_name}</option>)}
                      </select>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_published}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm">Chop etish</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm">Featured</span>
                  </label>
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

function isSchemaCacheColumnError(error) {
  return error?.code === 'PGRST204' || error?.message?.includes('schema cache')
}

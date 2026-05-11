'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { 
  Plus, Search, Edit2, Trash2, X, BookOpen, Layers
} from 'lucide-react'

const categories = ['darslik', 'badiy', 'ichki']
const categoryLabels = {
  darslik: 'Darslik',
  badiy: 'Badiy adabiyot',
  ichki: 'Ichki tizim',
}

const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

export default function AdminLibraryPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [gradeFilter, setGradeFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'darslik',
    grade: '',
    publisher: '',
    year: '',
    quantity: 1,
    cover_url: '',
    description: '',
    is_published: true,
  })
  const supabase = createClient()

  useEffect(() => {
    loadBooks()
  }, [])

  async function loadBooks() {
    try {
      const { data, error } = await supabase
        .from('library_books')
        .select('*')
        .order('title', { ascending: true })
      
      if (error) throw error
      setBooks(data || [])
    } catch (error) {
      console.error('Error loading books:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const submitData = {
        ...formData,
        grade: formData.grade ? parseInt(formData.grade) : null,
        year: formData.year ? parseInt(formData.year) : null,
        quantity: formData.quantity ? parseInt(formData.quantity) : 1,
        updated_at: new Date().toISOString(),
      }

      if (editingItem) {
        const { error } = await supabase
          .from('library_books')
          .update(submitData)
          .eq('id', editingItem.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('library_books')
          .insert({ ...submitData, created_at: new Date().toISOString() })
        
        if (error) throw error
      }
      
      setShowModal(false)
      setEditingItem(null)
      resetForm()
      loadBooks()
    } catch (error) {
      console.error('Error saving book:', error)
      alert('Xatolik yuz berdi')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Rostdan ham o\'chirishni xohlaymisiz?')) return
    
    try {
      const { error } = await supabase.from('library_books').delete().eq('id', id)
      if (error) throw error
      loadBooks()
    } catch (error) {
      console.error('Error deleting book:', error)
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      author: '',
      category: 'darslik',
      grade: '',
      publisher: '',
      year: '',
      quantity: 1,
      cover_url: '',
      description: '',
      is_published: true,
    })
  }

  function openEdit(item) {
    setEditingItem(item)
    setFormData({
      title: item.title || '',
      author: item.author || '',
      category: item.category || 'darslik',
      grade: item.grade?.toString() || '',
      publisher: item.publisher || '',
      year: item.year?.toString() || '',
      quantity: item.quantity || 1,
      cover_url: item.cover_url || '',
      description: item.description || '',
      is_published: item.is_published ?? true,
    })
    setShowModal(true)
  }

  const filteredBooks = books.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter
    const matchesGrade = gradeFilter === 'all' || item.grade === parseInt(gradeFilter)
    return matchesSearch && matchesCategory && matchesGrade
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
            <span className="gradient-text">Kutubxona</span>
          </h1>
          <p className="text-gray-500">Kitoblarni boshqarish</p>
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
        <div className="relative flex-1 min-w-[200px]">
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
        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
        >
          <option value="all">Barcha sinflar</option>
          {grades.map(g => <option key={g} value={g}>{g}-sinf</option>)}
        </select>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Kitoblar topilmadi</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {filteredBooks.map((item) => (
            <div
              key={item.id}
              className="glass rounded-2xl overflow-hidden hover-lift"
            >
              <div className="h-40 bg-gradient-to-br from-primary/20 to-accent-purple/20 relative">
                {item.cover_url ? (
                  <img src={item.cover_url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-primary/30" />
                  </div>
                )}
                {item.grade && (
                  <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-primary text-white text-xs font-medium">
                    {item.grade}-sinf
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary mb-2 inline-block">
                  {categoryLabels[item.category]}
                </span>
                <h3 className="font-bold line-clamp-1 mb-1">{item.title}</h3>
                {item.author && (
                  <p className="text-sm text-gray-500 mb-1">{item.author}</p>
                )}
                {item.quantity && (
                  <p className="text-xs text-gray-400">Soni: {item.quantity}</p>
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
                  {editingItem ? 'Kitobni tahrirlash' : 'Yangi kitob qo\'shish'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Kitob nomi *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    placeholder="Kitob nomi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Muallif</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    placeholder="Muallif ismi"
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
                    <label className="block text-sm font-medium mb-1.5">Sinf</label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    >
                      <option value="">Tanlang</option>
                      {grades.map(g => <option key={g} value={g}>{g}-sinf</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Nashriyot</label>
                    <input
                      type="text"
                      value={formData.publisher}
                      onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                      placeholder="Nashriyot"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Yil</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                      placeholder="2024"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Soni</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Muqova rasmi URL</label>
                  <input
                    type="url"
                    value={formData.cover_url}
                    onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Tavsif</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none resize-none"
                    placeholder="Qisqacha tavsif..."
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
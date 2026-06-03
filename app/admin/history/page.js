'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { Calendar, Edit2, Plus, Search, Trash2, X } from 'lucide-react'

export default function AdminHistoryPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    title: '',
    description: '',
    is_director: false,
    director_name: '',
    image_url: '',
    display_order: 0,
  })
  const supabase = createClient()

  useEffect(() => {
    loadItems()
  }, [])

  async function loadItems() {
    setLoading(true)
    const { data } = await supabase
      .from('milestones')
      .select('*')
      .order('display_order', { ascending: true })
      .order('year', { ascending: true })
    setItems(data || [])
    setLoading(false)
  }

  function resetForm() {
    setFormData({
      year: new Date().getFullYear(),
      title: '',
      description: '',
      is_director: false,
      director_name: '',
      image_url: '',
      display_order: 0,
    })
  }

  function openCreate() {
    resetForm()
    setEditingItem(null)
    setShowModal(true)
  }

  function openEdit(item) {
    setEditingItem(item)
    setFormData({
      year: item.year || new Date().getFullYear(),
      title: item.title || '',
      description: item.description || '',
      is_director: item.is_director ?? false,
      director_name: item.director_name || '',
      image_url: item.image_url || '',
      display_order: item.display_order || 0,
    })
    setShowModal(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    const payload = {
      ...formData,
      year: Number(formData.year) || new Date().getFullYear(),
      display_order: Number(formData.display_order) || 0,
      updated_at: new Date().toISOString(),
    }

    if (editingItem) {
      await supabase.from('milestones').update(payload).eq('id', editingItem.id)
    } else {
      await supabase.from('milestones').insert({ ...payload, created_at: new Date().toISOString() })
    }

    setSaving(false)
    setShowModal(false)
    setEditingItem(null)
    resetForm()
    loadItems()
  }

  async function handleDelete(item) {
    if (!confirm(`"${item.title}" yozuvini o'chirishni xohlaysizmi?`)) return
    await supabase.from('milestones').delete().eq('id', item.id)
    loadItems()
  }

  const filtered = items.filter((item) => {
    const search = searchQuery.toLowerCase()
    return item.title?.toLowerCase().includes(search) || item.description?.toLowerCase().includes(search) || item.year?.toString().includes(search)
  })

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Tarix</h1>
          <p className="text-slate-500 mt-1">Maktab tarixi va direktorlar bosqichlarini boshqarish</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium">
          <Plus className="w-5 h-5" />
          Yozuv qo'shish
        </button>
      </motion.div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Yil, sarlavha yoki tavsif bo'yicha qidirish..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none" />
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-lg">Tarixiy yozuv topilmadi</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="h-36 bg-blue-500/10">
                {item.image_url ? <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" /> : <div className="h-full flex items-center justify-center"><Calendar className="w-10 h-10 text-blue-500/40" /></div>}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-sm font-semibold text-blue-600">{item.year}</span>
                    <h3 className="font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(item)} className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"><Edit2 className="w-4 h-4 text-slate-500" /></button>
                    <button onClick={() => handleDelete(item)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 className="w-4 h-4 text-red-500" /></button>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mt-2 line-clamp-3">{item.description}</p>
                {item.is_director && item.director_name && <p className="text-xs text-blue-600 mt-3">Direktor: {item.director_name}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false) }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl">
              <div className="sticky top-0 bg-white dark:bg-slate-900 px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <h2 className="text-xl font-bold">{editingItem ? 'Yozuvni tahrirlash' : 'Yangi tarixiy yozuv'}</h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="block text-sm font-semibold mb-1.5">Yil *</span>
                    <input type="number" required value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none" />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-semibold mb-1.5">Tartib</span>
                    <input type="number" value={formData.display_order} onChange={(e) => setFormData({ ...formData, display_order: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none" />
                  </label>
                </div>
                <label className="block">
                  <span className="block text-sm font-semibold mb-1.5">Sarlavha *</span>
                  <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none" />
                </label>
                <label className="block">
                  <span className="block text-sm font-semibold mb-1.5">Tavsif</span>
                  <textarea rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none resize-none" />
                </label>
                <label className="block">
                  <span className="block text-sm font-semibold mb-1.5">Rasm URL</span>
                  <input type="url" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none" />
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={formData.is_director} onChange={(e) => setFormData({ ...formData, is_director: e.target.checked })} className="w-4 h-4 rounded border-slate-300" />
                  <span className="text-sm">Bu direktor tarixi yozuvi</span>
                </label>
                {formData.is_director && (
                  <label className="block">
                    <span className="block text-sm font-semibold mb-1.5">Direktor ismi</span>
                    <input value={formData.director_name} onChange={(e) => setFormData({ ...formData, director_name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none" />
                  </label>
                )}
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700">Bekor qilish</button>
                  <button disabled={saving} type="submit" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium disabled:opacity-50">{saving ? 'Saqlanmoqda...' : 'Saqlash'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

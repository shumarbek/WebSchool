'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { 
  Plus, Search, Edit2, Trash2, X, Users, Phone, Mail, 
  Image as ImageIcon, BookOpen, Shield
} from 'lucide-react'

const roles = ['director', 'deputy', 'teacher', 'staff']
const subjects = ['Matematika', 'Fizika', 'Kimyo', 'Biologiya', 'Ingliz tili', 'Informatika', 'Tarix', 'Geografiya', 'Adabiyot', 'Musiqa', 'Chizmachilik', 'Jismoniy tarbiya']

export default function AdminStaffPage() {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({
    full_name: '',
    role: 'teacher',
    subject: '',
    phone: '',
    email: '',
    photo_url: '',
    bio: '',
    position: '',
    is_active: true,
    display_order: 0,
  })
  const supabase = createClient()

  useEffect(() => {
    loadStaff()
  }, [])

  async function loadStaff() {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('display_order', { ascending: true })
      
      if (error) throw error
      setStaff(data || [])
    } catch (error) {
      console.error('Error loading staff:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editingItem) {
        const { error } = await supabase
          .from('staff')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingItem.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('staff')
          .insert({ ...formData, created_at: new Date().toISOString() })
        
        if (error) throw error
      }
      
      setShowModal(false)
      setEditingItem(null)
      resetForm()
      loadStaff()
    } catch (error) {
      console.error('Error saving staff:', error)
      alert('Xatolik yuz berdi')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Rostdan ham o\'chirishni xohlaymisiz?')) return
    
    try {
      const { error } = await supabase.from('staff').delete().eq('id', id)
      if (error) throw error
      loadStaff()
    } catch (error) {
      console.error('Error deleting staff:', error)
    }
  }

  function resetForm() {
    setFormData({
      full_name: '',
      role: 'teacher',
      subject: '',
      phone: '',
      email: '',
      photo_url: '',
      bio: '',
      position: '',
      is_active: true,
      display_order: 0,
    })
  }

  function openEdit(item) {
    setEditingItem(item)
    setFormData({
      full_name: item.full_name || '',
      role: item.role || 'teacher',
      subject: item.subject || '',
      phone: item.phone || '',
      email: item.email || '',
      photo_url: item.photo_url || '',
      bio: item.bio || '',
      position: item.position || '',
      is_active: item.is_active ?? true,
      display_order: item.display_order || 0,
    })
    setShowModal(true)
  }

  const filteredStaff = staff.filter(item => {
    const matchesSearch = item.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || item.role === roleFilter
    return matchesSearch && matchesRole
  })

  const getRoleLabel = (role) => {
    const labels = {
      director: 'Direktor',
      deputy: 'Direktor o\'rinbosari',
      teacher: 'O\'qituvchi',
      staff: 'Hodim',
    }
    return labels[role] || role
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
            <span className="gradient-text">Hodimlar</span>
          </h1>
          <p className="text-gray-500">Maktab hodimlarini boshqarish</p>
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
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
        >
          <option value="all">Barcha rollar</option>
          {roles.map(role => (
            <option key={role} value={role}>{getRoleLabel(role)}</option>
          ))}
        </select>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredStaff.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Hodimlar topilmadi</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredStaff.map((item) => (
            <div
              key={item.id}
              className="glass rounded-2xl p-4 hover-lift"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center overflow-hidden">
                  {item.photo_url ? (
                    <img src={item.photo_url} alt={item.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <Users className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate">{item.full_name}</h3>
                  <p className="text-sm text-primary">{getRoleLabel(item.role)}</p>
                  {item.subject && (
                    <p className="text-xs text-gray-500">{item.subject}</p>
                  )}
                </div>
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
              {(item.phone || item.email) && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 space-y-1">
                  {item.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{item.phone}</span>
                    </div>
                  )}
                  {item.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="truncate">{item.email}</span>
                    </div>
                  )}
                </div>
              )}
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
                  {editingItem ? 'Hodimni tahrirlash' : 'Yangi hodim qo\'shish'}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">To'liq ism *</label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    placeholder="Ism Familiya"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Rol *</label>
                    <select
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    >
                      {roles.map(role => (
                        <option key={role} value={role}>{getRoleLabel(role)}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Fan</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    >
                      <option value="">Tanlang</option>
                      {subjects.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {(formData.role === 'director' || formData.role === 'deputy') && (
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Lavozim</label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                      placeholder="Lavozim nomi"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Telefon</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                      placeholder="+998 90 123 45 67"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Rasm URL</label>
                  <input
                    type="url"
                    value={formData.photo_url}
                    onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none resize-none"
                    placeholder="Qisqacha ma'lumot..."
                  />
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
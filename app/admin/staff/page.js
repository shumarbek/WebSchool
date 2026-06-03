'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { BriefcaseBusiness, Edit2, Plus, Search, Trash2, UserRound, Users, X } from 'lucide-react'

const roles = ['mamuriyat', 'pedagog', 'mutaxassis', 'xizmat']
const roleLabels = {
  mamuriyat: "Ma'muriyat",
  pedagog: 'Pedagog',
  mutaxassis: 'Mutaxassis',
  xizmat: "Xizmat ko'rsatish",
}

const positions = ['direktor', "direktor_o'rinbosari", 'nazoratchi', "bo'lim_boshlig'i", 'metodist']
const subjects = ['Biologiya', 'Fizika', 'Geografiya', 'Informatika', 'Ingliz tili', 'Jismoniy tarbiya', 'Kimyo', 'Matematika', 'Ona tili', 'Rus tili', 'Tarix'].sort((a, b) => a.localeCompare(b, 'uz'))
const specialistTypes = ['psixolog', 'kutubxonachi', 'shifokor/hamshira', 'laborant', 'defektolog', 'logoped']
const serviceTypes = ['qorovul', 'farrosh', "bog'bon", 'oshpaz', 'elektrik']
const qualificationLevels = ['Oliy toifa', 'Birinchi toifa', 'Ikkinchi toifa', 'Mutaxassis']

const emptyForm = {
  full_name: '',
  role: 'pedagog',
  position: '',
  subject: '',
  work_type: '',
  service_count: 1,
  experience_years: 0,
  qualification_level: '',
  phone: '',
  email: '',
  photo_url: '',
  bio: '',
  awards: '',
  is_featured: false,
  is_active: true,
}

function roleMeta(item) {
  if (item.role === 'pedagog') return item.subject ? `${titleCase(item.subject)} o'qituvchisi` : "O'qituvchi"
  if (item.role === 'xizmat') return `${titleCase(item.work_type || 'Xizmat')}: ${item.service_count || 0} nafar`
  return titleCase(item.position || item.work_type || roleLabels[item.role])
}

function titleCase(value) {
  return value
    ?.toString()
    .replaceAll('_', ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || ''
}

export default function AdminStaffPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const supabase = createClient()

  useEffect(() => {
    loadStaff()
  }, [])

  async function loadStaff() {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .order('full_name', { ascending: true })

    if (error) console.error('Error loading staff:', error)
    setItems([...(data || [])].sort((a, b) => {
      const aName = a.role === 'xizmat' ? a.work_type || '' : a.full_name || ''
      const bName = b.role === 'xizmat' ? b.work_type || '' : b.full_name || ''
      return aName.localeCompare(bName, 'uz')
    }))
    setLoading(false)
  }

  function resetForm(role = 'pedagog') {
    setFormData({ ...emptyForm, role })
  }

  function normalizePayload() {
    const isService = formData.role === 'xizmat'
    return {
      full_name: isService ? null : formData.full_name.trim(),
      role: formData.role,
      position: formData.role === 'mamuriyat' ? formData.position : null,
      subject: formData.role === 'pedagog' ? formData.subject : null,
      work_type: ['mutaxassis', 'xizmat'].includes(formData.role) ? formData.work_type : null,
      service_count: isService ? parseInt(formData.service_count) || 0 : 1,
      experience_years: isService ? 0 : parseInt(formData.experience_years) || 0,
      qualification_level: isService ? null : formData.qualification_level,
      phone: isService ? null : formData.phone,
      email: isService ? null : formData.email,
      photo_url: isService ? null : formData.photo_url,
      bio: isService ? null : formData.bio,
      awards: isService ? null : formData.awards,
      is_featured: isService ? false : formData.is_featured,
      is_active: formData.is_active,
      updated_at: new Date().toISOString(),
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const payload = normalizePayload()

    try {
      const result = editingItem
        ? await supabase.from('staff').update(payload).eq('id', editingItem.id)
        : await supabase.from('staff').insert({ ...payload, created_at: new Date().toISOString() })

      if (result.error) throw result.error
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
    if (!confirm("Rostdan ham o'chirishni xohlaymisiz?")) return
    const { error } = await supabase.from('staff').delete().eq('id', id)
    if (error) console.error('Error deleting staff:', error)
    loadStaff()
  }

  function openEdit(item) {
    setEditingItem(item)
    setFormData({
      full_name: item.full_name || '',
      role: item.role || 'pedagog',
      position: item.position || '',
      subject: item.subject || '',
      work_type: item.work_type || '',
      service_count: item.service_count || 1,
      experience_years: item.experience_years || 0,
      qualification_level: item.qualification_level || '',
      phone: item.phone || '',
      email: item.email || '',
      photo_url: item.photo_url || '',
      bio: item.bio || '',
      awards: item.awards || '',
      is_featured: item.is_featured ?? false,
      is_active: item.is_active ?? true,
    })
    setShowModal(true)
  }

  const filtered = useMemo(() => items.filter((item) => {
    const text = [item.full_name, item.position, item.subject, item.work_type].filter(Boolean).join(' ').toLowerCase()
    return text.includes(searchQuery.toLowerCase()) && (roleFilter === 'all' || item.role === roleFilter)
  }), [items, roleFilter, searchQuery])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl"><span className="gradient-text">Hodimlar</span></h1>
          <p className="text-gray-500">Rollar va platformada ko'rinadigan xodimlarni boshqarish</p>
        </div>
        <button onClick={() => { resetForm(); setEditingItem(null); setShowModal(true) }} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent-purple px-4 py-2.5 font-medium text-white">
          <Plus className="h-5 w-5" />
          Qo'shish
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-50" placeholder="Qidirish..." />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-50">
          <option value="all">Barcha rollar</option>
          {roles.map((role) => <option key={role} value={role}>{roleLabels[role]}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center"><Users className="mx-auto mb-4 h-12 w-12 text-gray-300" /><p className="text-gray-500">Hodimlar topilmadi</p></div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <motion.div key={item.id} layout className="glass rounded-2xl p-4">
              <div className="flex gap-4">
                <div className="h-20 w-16 overflow-hidden rounded-xl bg-primary/10">
                  {item.photo_url ? <img src={item.photo_url} alt={item.full_name || item.work_type} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center">{item.role === 'xizmat' ? <BriefcaseBusiness className="h-7 w-7 text-primary/40" /> : <UserRound className="h-7 w-7 text-primary/40" />}</div>}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{roleLabels[item.role]}</span>
                    {item.is_featured && <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs text-amber-600">Featured</span>}
                    {!item.is_active && <span className="rounded-full bg-gray-500/15 px-2 py-0.5 text-xs text-gray-500">Nofaol</span>}
                  </div>
                  <h3 className="truncate font-bold">{item.role === 'xizmat' ? titleCase(item.work_type) : item.full_name}</h3>
                  <p className="text-sm text-gray-500">{roleMeta(item)}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                <button onClick={() => openEdit(item)} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"><Edit2 className="h-4 w-4 text-gray-500" /></button>
                <button onClick={() => handleDelete(item.id)} className="rounded-lg p-2 hover:bg-red-50"><Trash2 className="h-4 w-4 text-red-500" /></button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}>
            <motion.div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-dark-50" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">{editingItem ? 'Hodimni tahrirlash' : "Yangi hodim qo'shish"}</h2>
                <button onClick={() => setShowModal(false)} className="rounded-lg p-2 hover:bg-gray-100"><X className="h-5 w-5" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">Rol</span>
                    <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value, position: '', subject: '', work_type: '' })} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none dark:border-gray-700 dark:bg-dark-100">
                      {roles.map((role) => <option key={role} value={role}>{roleLabels[role]}</option>)}
                    </select>
                  </label>

                  {formData.role === 'mamuriyat' && <Select label="Lavozim" value={formData.position} options={positions} onChange={(value) => setFormData({ ...formData, position: value })} />}
                  {formData.role === 'pedagog' && <Select label="Fan" value={formData.subject} options={subjects} onChange={(value) => setFormData({ ...formData, subject: value })} />}
                  {formData.role === 'mutaxassis' && <Select label="Faoliyat" value={formData.work_type} options={specialistTypes} onChange={(value) => setFormData({ ...formData, work_type: value })} />}
                  {formData.role === 'xizmat' && <Select label="Faoliyat" value={formData.work_type} options={serviceTypes} onChange={(value) => setFormData({ ...formData, work_type: value })} />}
                </div>

                {formData.role === 'xizmat' ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    <Input label="Soni" type="number" value={formData.service_count} onChange={(value) => setFormData({ ...formData, service_count: value })} />
                  </div>
                ) : (
                  <>
                    <Input label="F.I.Sh." required value={formData.full_name} onChange={(value) => setFormData({ ...formData, full_name: value })} />
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input label="Telefon" value={formData.phone} onChange={(value) => setFormData({ ...formData, phone: value })} />
                      <Input label="Email" type="email" value={formData.email} onChange={(value) => setFormData({ ...formData, email: value })} />
                    </div>
                    <Input label="Rasm URL" type="url" value={formData.photo_url} onChange={(value) => setFormData({ ...formData, photo_url: value })} />
                    <div className="grid gap-4 md:grid-cols-2">
                      <Input label="Tajriba (yil)" type="number" value={formData.experience_years} onChange={(value) => setFormData({ ...formData, experience_years: value })} />
                      <Select label="Malaka" value={formData.qualification_level} options={qualificationLevels} onChange={(value) => setFormData({ ...formData, qualification_level: value })} />
                    </div>
                    <Textarea label="Bio" value={formData.bio} onChange={(value) => setFormData({ ...formData, bio: value })} />
                    <Textarea label="Mukofotlar" value={formData.awards} onChange={(value) => setFormData({ ...formData, awards: value })} />
                    <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} className="h-4 w-4" /><span className="text-sm">Bosh sahifada ko'rsatish</span></label>
                  </>
                )}

                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} className="h-4 w-4" /><span className="text-sm">Faol</span></label>

                <button className="w-full rounded-xl bg-gradient-to-r from-primary to-accent-purple py-3 font-medium text-white">{editingItem ? 'Saqlash' : "Qo'shish"}</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Input({ label, value, onChange, type = 'text', required = false }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-100" />
    </label>
  )
}

function Select({ label, value, options, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <select required value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-100">
        <option value="">Tanlang</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  )
}

function Textarea({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className="w-full resize-none rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-100" />
    </label>
  )
}

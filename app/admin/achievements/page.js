'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { Award, Edit2, Plus, Search, Trash2, Trophy, X } from 'lucide-react'

const categories = ['olimpiada', 'sport', 'ilmiy', 'sertifikat']
const categoryLabels = { olimpiada: 'Olimpiada', sport: 'Sport', ilmiy: 'Ilmiy', sertifikat: 'Sertifikat' }
const stages = [
  ['dostona', "Do'stona"],
  ['tuman', 'Tuman'],
  ['viloyat', 'Viloyat'],
  ['respublika', 'Respublika'],
  ['osiya', 'Osiya'],
  ['jahon', 'Jahon'],
]
const certificates = ['milliy', 'cefr', 'ielts', 'toefl', 'topik', 'a-level', 'sat']
const subjects = ['Matematika', 'Tarix', 'Ona tili', 'Ingliz tili', 'Rus tili', 'Fizika', 'Kimyo', 'Biologiya', 'Geografiya', 'Informatika'].sort((a, b) => a.localeCompare(b, 'uz'))
const nationalLevels = ['A+', 'A', 'B+', 'B', 'C+', 'C']
const cefrLevels = ['C2', 'C1', 'B2', 'B1']
const ieltsLevels = ['9.0', '8.5', '8.0', '7.5', '7.0', '6.5', '6.0', '5.5', '5.0', '4.5', '4.0', '3.5', '3.0']
const topikTypes = ['TOPIK I', 'TOPIK II']
const aLevelGrades = ['A*', 'A', 'B', 'C', 'D', 'E']

const emptyParticipant = { name: '', place: '', result: '', score: '', subject: '', topik_type: '' }
const emptyForm = {
  title: '',
  description: '',
  category: 'olimpiada',
  stage: 'tuman',
  certificate_type: '',
  participants: [emptyParticipant],
  teacher_names: '',
  award_date: '',
  image_url: '',
  is_published: true,
}

export default function AdminAchievementsPage() {
  const [items, setItems] = useState([])
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const [{ data: achievements }, { data: staff }] = await Promise.all([
      supabase.from('achievements').select('*').order('award_date', { ascending: false }),
      supabase.from('staff').select('id, full_name').neq('role', 'xizmat').eq('is_active', true).order('full_name'),
    ])
    setItems(achievements || [])
    setTeachers(staff || [])
    setLoading(false)
  }

  function resetForm() {
    setFormData({ ...emptyForm, participants: [{ ...emptyParticipant }] })
  }

  function updateParticipant(index, key, value) {
    setFormData((current) => ({
      ...current,
      participants: current.participants.map((participant, idx) => idx === index ? { ...participant, [key]: value } : participant),
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const participantRows = formData.participants
      .map((participant) => ({
        name: participant.name.trim(),
        place: participant.place,
        result: participant.result.trim(),
        score: participant.score.trim(),
        subject: participant.subject.trim(),
        topik_type: participant.topik_type || '',
      }))
      .filter((participant) => participant.name)

    if (participantRows.length === 0) {
      alert('Kamida bitta o\'quvchi kiriting')
      return
    }

    const teacherNames = parseList(formData.teacher_names)
    const selectedTeacherIds = teachers.filter((teacher) => teacherNames.includes(teacher.full_name)).map((teacher) => teacher.id)
    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      stage: ['olimpiada', 'sport'].includes(formData.category) ? formData.stage : null,
      certificate_type: formData.category === 'sertifikat' ? formData.certificate_type : null,
      participants: participantRows,
      teacher_ids: selectedTeacherIds,
      teacher_names: teacherNames,
      award_date: formData.award_date || null,
      image_url: formData.image_url,
      is_published: formData.is_published,
      updated_at: new Date().toISOString(),
    }

    try {
      const result = editingItem
        ? await supabase.from('achievements').update(payload).eq('id', editingItem.id)
        : await supabase.from('achievements').insert({ ...payload, created_at: new Date().toISOString() })
      if (result.error) throw result.error
      setShowModal(false)
      setEditingItem(null)
      resetForm()
      loadData()
    } catch (error) {
      console.error('Error saving achievement:', error)
      alert('Xatolik yuz berdi')
    }
  }

  async function handleDelete(id) {
    if (!confirm("Rostdan ham o'chirishni xohlaymisiz?")) return
    const { error } = await supabase.from('achievements').delete().eq('id', id)
    if (error) console.error('Error deleting achievement:', error)
    loadData()
  }

  function openEdit(item) {
    setEditingItem(item)
    setFormData({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'olimpiada',
      stage: item.stage || 'tuman',
      certificate_type: item.certificate_type || '',
      participants: Array.isArray(item.participants) && item.participants.length ? item.participants : [{ ...emptyParticipant }],
      teacher_names: Array.isArray(item.teacher_names) ? item.teacher_names.join('\n') : '',
      award_date: item.award_date || '',
      image_url: item.image_url || '',
      is_published: item.is_published ?? true,
    })
    setShowModal(true)
  }

  const filtered = useMemo(() => items.filter((item) => {
    return item.title?.toLowerCase().includes(searchQuery.toLowerCase()) && (categoryFilter === 'all' || item.category === categoryFilter)
  }), [items, categoryFilter, searchQuery])
  const selectedTeacherNames = useMemo(() => parseList(formData.teacher_names), [formData.teacher_names])

  function toggleTeacher(name) {
    const current = new Set(selectedTeacherNames)
    if (current.has(name)) current.delete(name)
    else current.add(name)
    setFormData({ ...formData, teacher_names: Array.from(current).join('\n') })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl"><span className="gradient-text">Yutuqlar</span></h1>
          <p className="text-gray-500">Olimpiada, sport va sertifikat natijalarini boshqarish</p>
        </div>
        <button onClick={() => { resetForm(); setEditingItem(null); setShowModal(true) }} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent-purple px-4 py-2.5 font-medium text-white"><Plus className="h-5 w-5" />Qo'shish</button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-50" placeholder="Qidirish..." />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-50">
          <option value="all">Barcha kategoriya</option>
          {categories.map((category) => <option key={category} value={category}>{categoryLabels[category]}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center"><Trophy className="mx-auto mb-4 h-12 w-12 text-gray-300" /><p className="text-gray-500">Yutuqlar topilmadi</p></div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <div key={item.id} className="glass rounded-2xl overflow-hidden">
              <div className="h-36 bg-amber-500/10">{item.image_url ? <img src={item.image_url} alt={item.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><Award className="h-10 w-10 text-amber-500/40" /></div>}</div>
              <div className="p-4">
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs text-amber-600">{categoryLabels[item.category]}</span>
                <h3 className="mt-3 line-clamp-2 font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{Array.isArray(item.participants) ? `${item.participants.length} o'quvchi` : ''}</p>
                <div className="mt-3 flex gap-1">
                  <button onClick={() => openEdit(item)} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"><Edit2 className="h-4 w-4 text-gray-500" /></button>
                  <button onClick={() => handleDelete(item.id)} className="rounded-lg p-2 hover:bg-red-50"><Trash2 className="h-4 w-4 text-red-500" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}>
            <motion.div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-dark-50" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold">{editingItem ? 'Yutuqni tahrirlash' : "Yangi yutuq qo'shish"}</h2>
                <button onClick={() => setShowModal(false)} className="rounded-lg p-2 hover:bg-gray-100"><X className="h-5 w-5" /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <Input label="Sarlavha" required value={formData.title} onChange={(value) => setFormData({ ...formData, title: value })} />
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">Kategoriya</span>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value, certificate_type: e.target.value === 'sertifikat' ? formData.certificate_type || 'milliy' : '' })} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none dark:border-gray-700 dark:bg-dark-100">
                      {categories.map((category) => <option key={category} value={category}>{categoryLabels[category]}</option>)}
                    </select>
                  </label>
                </div>

                {['olimpiada', 'sport'].includes(formData.category) && (
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">Bosqich</span>
                    <select value={formData.stage} onChange={(e) => setFormData({ ...formData, stage: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none dark:border-gray-700 dark:bg-dark-100">
                      {stages.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </label>
                )}

                {formData.category === 'sertifikat' && (
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">Tur</span>
                    <select required value={formData.certificate_type} onChange={(e) => setFormData({ ...formData, certificate_type: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none dark:border-gray-700 dark:bg-dark-100">
                      <option value="">Tanlang</option>
                      {certificates.map((item) => <option key={item} value={item}>{item.toUpperCase()}</option>)}
                    </select>
                  </label>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">O'quvchilar</h3>
                    <button type="button" onClick={() => setFormData({ ...formData, participants: [...formData.participants, { ...emptyParticipant }] })} className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm text-primary">O'quvchi qo'shish</button>
                  </div>
                  {formData.participants.map((participant, index) => (
                    <div key={index} className="grid gap-3 rounded-2xl bg-gray-50 p-3 dark:bg-dark-100 md:grid-cols-5">
                      <input required value={participant.name} onChange={(e) => updateParticipant(index, 'name', e.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-dark-50" placeholder="F.I.Sh." />
                      {['olimpiada', 'sport'].includes(formData.category) && <select value={participant.place} onChange={(e) => updateParticipant(index, 'place', e.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-dark-50"><option value="">O'rin</option><option value="1">1-o'rin</option><option value="2">2-o'rin</option><option value="3">3-o'rin</option></select>}
                      {formData.category === 'sertifikat' && (
                        <>
                          {formData.certificate_type === 'milliy' && (
                            <>
                              <SelectInput value={participant.subject} onChange={(value) => updateParticipant(index, 'subject', value)} options={subjects} placeholder="Fan" />
                              <SelectInput value={participant.result} onChange={(value) => updateParticipant(index, 'result', value)} options={nationalLevels} placeholder="Daraja" />
                            </>
                          )}
                          {formData.certificate_type === 'cefr' && <SelectInput value={participant.result} onChange={(value) => updateParticipant(index, 'result', value)} options={cefrLevels} placeholder="Daraja" />}
                          {formData.certificate_type === 'ielts' && <SelectInput value={participant.result} onChange={(value) => updateParticipant(index, 'result', value)} options={ieltsLevels} placeholder="Daraja" />}
                          {formData.certificate_type === 'toefl' && <NumberInput value={participant.score} onChange={(value) => updateParticipant(index, 'score', value)} min={0} max={120} placeholder="0-120 ball" />}
                          {formData.certificate_type === 'topik' && (
                            <>
                              <SelectInput value={participant.topik_type} onChange={(value) => updateParticipant(index, 'topik_type', value)} options={topikTypes} placeholder="TOPIK turi" />
                              <NumberInput value={participant.score} onChange={(value) => updateParticipant(index, 'score', value)} min={80} max={300} placeholder="80-300 ball" />
                            </>
                          )}
                          {formData.certificate_type === 'a-level' && <SelectInput value={participant.result} onChange={(value) => updateParticipant(index, 'result', value)} options={aLevelGrades} placeholder="Daraja" />}
                          {formData.certificate_type === 'sat' && <NumberInput value={participant.score} onChange={(value) => updateParticipant(index, 'score', value)} min={1} max={1600} placeholder="1-1600 ball" />}
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium">Ustozlar</span>
                    <div className="max-h-44 space-y-2 overflow-y-auto rounded-xl border border-gray-200 bg-gray-100 p-3 dark:border-gray-700 dark:bg-dark-100">
                      {teachers.length === 0 ? (
                        <p className="text-sm text-gray-500">Hodimlar topilmadi</p>
                      ) : teachers.map((teacher) => (
                        <label key={teacher.id} className="flex items-center gap-2 text-sm">
                          <input type="checkbox" checked={selectedTeacherNames.includes(teacher.full_name)} onChange={() => toggleTeacher(teacher.full_name)} className="h-4 w-4" />
                          {teacher.full_name}
                        </label>
                      ))}
                    </div>
                  </label>
                  <div className="space-y-4">
                    <Input label="Sana" type="date" value={formData.award_date} onChange={(value) => setFormData({ ...formData, award_date: value })} />
                    <Input label="Rasm URL" type="url" value={formData.image_url} onChange={(value) => setFormData({ ...formData, image_url: value })} />
                  </div>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Tavsif</span>
                  <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full resize-none rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none dark:border-gray-700 dark:bg-dark-100" />
                </label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_published} onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })} className="h-4 w-4" /><span className="text-sm">Chop etish</span></label>
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
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none dark:border-gray-700 dark:bg-dark-100" />
    </label>
  )
}

function SelectInput({ value, onChange, options, placeholder }) {
  return (
    <select required value={value || ''} onChange={(e) => onChange(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-dark-50">
      <option value="">{placeholder}</option>
      {options.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
  )
}

function NumberInput({ value, onChange, min, max, placeholder }) {
  return (
    <input required type="number" min={min} max={max} value={value || ''} onChange={(e) => onChange(e.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 outline-none dark:border-gray-700 dark:bg-dark-50" placeholder={placeholder} />
  )
}

function parseList(value) {
  return value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean)
}

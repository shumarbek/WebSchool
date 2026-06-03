'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { Save, Users, GraduationCap, Award, TrendingUp, Building2 } from 'lucide-react'

export default function AdminStatsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    students_count: '',
    achievements_count: '',
    admission_percent: '',
    rooms_count: '',
  })
  const [staffCount, setStaffCount] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    try {
      const { data, error } = await supabase
        .from('stats_settings')
        .select('*')
        .single()
      
      if (error) throw error
      
      if (data) {
        setFormData({
          students_count: data.students_count?.toString() || '',
          achievements_count: data.achievements_count?.toString() || '',
          admission_percent: data.admission_percent?.toString() || '',
          rooms_count: data.rooms_count?.toString() || '',
        })
      }

      const { count } = await supabase
        .from('staff')
        .select('id', { count: 'exact', head: true })
        .eq('is_active', true)
        .neq('role', 'xizmat')

      setStaffCount(count || 0)
    } catch (error) {
      console.error('Error loading stats settings:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)

    try {
      const { data: existing } = await supabase
        .from('stats_settings')
        .select('id')
        .single()

      const updateData = {
        students_count: parseInt(formData.students_count) || 0,
        achievements_count: parseInt(formData.achievements_count) || 0,
        admission_percent: parseInt(formData.admission_percent) || 0,
        rooms_count: parseInt(formData.rooms_count) || 0,
        updated_at: new Date().toISOString(),
      }

      if (existing) {
        const { error } = await supabase
          .from('stats_settings')
          .update(updateData)
          .eq('id', existing.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('stats_settings')
          .insert(updateData)
        
        if (error) throw error
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving stats settings:', error)
      alert('Xatolik yuz berdi')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const statsFields = [
    { name: 'students_count', label: "Yillik o'quvchilar", icon: Users, placeholder: '5200' },
    { name: 'achievements_count', label: 'Yutuqlar soni', icon: Award, placeholder: '342' },
    { name: 'admission_percent', label: "Kirish foizi (%)", icon: TrendingUp, placeholder: '89' },
    { name: 'rooms_count', label: 'Xonalar soni', icon: Building2, placeholder: '28' },
  ]

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="gradient-text">Statistika sozlamalari</span>
        </h1>
        <p className="text-gray-500">Maktab statistikasi ma'lumotlarini sozlash</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Hodimlar soni</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input value={staffCount} readOnly className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 outline-none opacity-75" />
              </div>
            </div>
            {statsFields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                <div className="relative">
                  <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData[field.name]}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                    placeholder={field.placeholder}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-blue-500/10 text-sm text-blue-600">
            <p className="font-medium mb-1">Eslatma:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Yillik o'quvchilar</strong> - Bir yil davomida o'quvchilar soni</li>
              <li><strong>Kirish foizi</strong> - Bitiruvchilarning oliy ta'limga kirish foizi</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saqlanmoqda...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Saqlash
              </>
            )}
          </button>

          {success && (
            <div className="p-3 rounded-xl bg-green-500/10 text-green-600 text-center text-sm">
              Muvaffaqiyatli saqlandi!
            </div>
          )}
        </form>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-4"
      >
        {[{ name: 'staff_count', label: 'Hodimlar soni', icon: GraduationCap }, ...statsFields].map((field, index) => {
          const Icon = field.icon
          const colors = [
            'from-blue-500 to-cyan-500',
            'from-purple-500 to-pink-500',
            'from-amber-500 to-orange-500',
            'from-green-500 to-emerald-500',
            'from-indigo-500 to-purple-500',
          ]
          
          return (
            <div key={field.name} className="glass rounded-2xl p-6 text-center">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors[index]} flex items-center justify-center mx-auto mb-3`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-3xl font-bold gradient-text mb-1">
                {field.name === 'staff_count' ? staffCount : formData[field.name] || '0'}
              </p>
              <p className="text-sm text-gray-500">{field.label}</p>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

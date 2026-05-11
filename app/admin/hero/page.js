'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { Save, Image, Video, Palette } from 'lucide-react'

const backgroundTypes = [
  { value: 'gradient', label: 'Gradient', icon: Palette },
  { value: 'image', label: 'Rasm', icon: Image },
  { value: 'video', label: 'Video', icon: Video },
]

export default function AdminHeroPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    background_type: 'gradient',
    background_url: '',
    video_url: '',
    stats_years: '',
    stats_students: '',
    stats_staff: '',
    cta_text: '',
    cta_link: '',
    is_active: true,
  })
  const supabase = createClient()

  useEffect(() => {
    loadSettings()
  }, [])

  async function loadSettings() {
    try {
      const { data, error } = await supabase
        .from('hero_settings')
        .select('*')
        .single()
      
      if (error) throw error
      
      if (data) {
        setFormData({
          title: data.title || '',
          subtitle: data.subtitle || '',
          background_type: data.background_type || 'gradient',
          background_url: data.background_url || '',
          video_url: data.video_url || '',
          stats_years: data.stats_years || '',
          stats_students: data.stats_students || '',
          stats_staff: data.stats_staff || '',
          cta_text: data.cta_text || '',
          cta_link: data.cta_link || '',
          is_active: data.is_active ?? true,
        })
      }
    } catch (error) {
      console.error('Error loading hero settings:', error)
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
        .from('hero_settings')
        .select('id')
        .single()

      if (existing) {
        const { error } = await supabase
          .from('hero_settings')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', existing.id)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('hero_settings')
          .insert({ ...formData, created_at: new Date().toISOString() })
        
        if (error) throw error
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving hero settings:', error)
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

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="gradient-text">Hero sozlamalari</span>
        </h1>
        <p className="text-gray-500">Bosh sahifa hero bo'limini sozlash</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1.5">Sarlavha</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
              placeholder="DOSOV - Zamonaviy Ta'lim"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Subtitle</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
              placeholder="Kelajagingizni biz bilan quring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Background turi</label>
            <div className="grid grid-cols-3 gap-3">
              {backgroundTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, background_type: type.value })}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    formData.background_type === type.value
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                  }`}
                >
                  <type.icon className={`w-6 h-6 ${formData.background_type === type.value ? 'text-primary' : 'text-gray-400'}`} />
                  <span className={`text-sm font-medium ${formData.background_type === type.value ? 'text-primary' : 'text-gray-500'}`}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {formData.background_type === 'image' && (
            <div>
              <label className="block text-sm font-medium mb-1.5">Rasm URL</label>
              <input
                type="url"
                value={formData.background_url}
                onChange={(e) => setFormData({ ...formData, background_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                placeholder="https://example.com/image.jpg"
              />
              {formData.background_url && (
                <div className="mt-3 rounded-xl overflow-hidden h-40 bg-gray-200">
                  <img src={formData.background_url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          )}

          {formData.background_type === 'video' && (
            <div>
              <label className="block text-sm font-medium mb-1.5">Video URL (MP4)</label>
              <input
                type="url"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                placeholder="https://example.com/video.mp4"
              />
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="font-bold mb-4">Statistika</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Yillar</label>
                <input
                  type="text"
                  value={formData.stats_years}
                  onChange={(e) => setFormData({ ...formData, stats_years: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                  placeholder="15+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">O'quvchilar</label>
                <input
                  type="text"
                  value={formData.stats_students}
                  onChange={(e) => setFormData({ ...formData, stats_students: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                  placeholder="5000+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Hodimlar</label>
                <input
                  type="text"
                  value={formData.stats_staff}
                  onChange={(e) => setFormData({ ...formData, stats_staff: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                  placeholder="150+"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="font-bold mb-4">CTA (Call to Action)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Matn</label>
                <input
                  type="text"
                  value={formData.cta_text}
                  onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                  placeholder="Ro'yxatdan o'tish"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Havola</label>
                <input
                  type="text"
                  value={formData.cta_link}
                  onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary outline-none"
                  placeholder="#contact"
                />
              </div>
            </div>
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
    </div>
  )
}
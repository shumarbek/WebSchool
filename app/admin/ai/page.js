'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { KeyRound, Save, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase'

const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-2.5-flash']

export default function AdminAIPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [settingsId, setSettingsId] = useState(null)
  const [formData, setFormData] = useState({
    model: 'gemini-1.5-flash',
    platform_context: '',
    is_enabled: true,
  })
  const supabase = createClient()

  useEffect(() => {
    async function loadSettings() {
      const { data, error } = await supabase.from('ai_settings').select('*').limit(1).maybeSingle()
      if (!error && data) {
        setSettingsId(data.id)
        setFormData({
          model: data.model || 'gemini-1.5-flash',
          platform_context: data.platform_context || '',
          is_enabled: data.is_enabled ?? true,
        })
      }
      setLoading(false)
    }

    loadSettings()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)

    const payload = { ...formData, updated_at: new Date().toISOString() }
    const result = settingsId
      ? await supabase.from('ai_settings').update(payload).eq('id', settingsId)
      : await supabase.from('ai_settings').insert({ ...payload, created_at: new Date().toISOString() }).select('id').single()

    if (result.error) {
      console.error('Error saving AI settings:', result.error)
      alert("AI sozlamalarini saqlab bo'lmadi. Supabase'da ai_settings jadvali yaratilganini tekshiring.")
    } else {
      if (!settingsId && result.data?.id) setSettingsId(result.data.id)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 2500)
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>
  }

  return (
    <div className="max-w-4xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold md:text-3xl"><span className="gradient-text">Smart AI</span></h1>
        <p className="mt-1 text-gray-500">Gemini API va platforma kontekstini boshqarish</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="glass rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-primary"><KeyRound className="h-5 w-5" /></div>
            <div>
              <h2 className="text-xl font-bold">Gemini sozlamalari</h2>
              <p className="text-sm text-gray-500">API key `aistudio.google.com` orqali olinadi.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">API key</span>
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
                API key serverdagi <code>GEMINI_API_KEY</code> env orqali olinadi.
              </div>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Model</span>
              <select
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-50"
              >
                {models.map((model) => <option key={model} value={model}>{model}</option>)}
              </select>
            </label>
          </div>
          <label className="mt-4 flex items-center gap-2">
            <input type="checkbox" checked={formData.is_enabled} onChange={(e) => setFormData({ ...formData, is_enabled: e.target.checked })} className="h-4 w-4" />
            <span className="text-sm">Smart AI faol</span>
          </label>
        </section>

        <section className="glass rounded-2xl p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-accent-purple/10 p-3 text-accent-purple"><Sparkles className="h-5 w-5" /></div>
            <div>
              <h2 className="text-xl font-bold">Platforma haqida</h2>
              <p className="text-sm text-gray-500">AI javoblarida ishlatiladigan qo'shimcha ma'lumotlar.</p>
            </div>
          </div>
          <textarea
            rows={9}
            value={formData.platform_context}
            onChange={(e) => setFormData({ ...formData, platform_context: e.target.value })}
            className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 leading-7 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-50"
            placeholder="Masalan: maktab qabul vaqtlari, direktor qabul kuni, ichki qoidalar, to'garaklar haqida..."
          />
        </section>

        <button disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent-purple py-3 font-medium text-white disabled:opacity-50">
          <Save className="h-5 w-5" />
          {saving ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
        {success && <div className="rounded-xl bg-green-500/10 p-3 text-center text-sm text-green-600">AI sozlamalari saqlandi.</div>}
      </form>
    </div>
  )
}

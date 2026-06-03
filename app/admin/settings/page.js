'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { Camera, Image, Mail, MapPin, Phone, PlayCircle, Save, Send, Video, Palette } from 'lucide-react'

const backgroundTypes = [
  { value: 'gradient', label: 'Gradient', icon: Palette },
  { value: 'image', label: 'Rasm', icon: Image },
  { value: 'video', label: 'Video', icon: Video },
]

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [heroId, setHeroId] = useState(null)
  const [platformId, setPlatformId] = useState(null)
  const [hero, setHero] = useState({
    title: '',
    subtitle: '',
    background_type: 'gradient',
    background_url: '',
    video_url: '',
    cta_text: '',
    cta_link: '',
    is_active: true,
  })
  const [platform, setPlatform] = useState({
    phone: '',
    email: '',
    address: '',
    youtube_url: '',
    instagram_url: '',
    telegram_url: '',
  })
  const supabase = createClient()

  useEffect(() => {
    async function loadSettings() {
      const [{ data: heroData }, { data: platformData }] = await Promise.all([
        supabase.from('hero_settings').select('*').limit(1).maybeSingle(),
        supabase.from('platform_settings').select('*').limit(1).maybeSingle(),
      ])

      if (heroData) {
        setHeroId(heroData.id)
        setHero({
          title: heroData.title || '',
          subtitle: heroData.subtitle || '',
          background_type: heroData.background_type || 'gradient',
          background_url: heroData.background_url || '',
          video_url: heroData.video_url || '',
          cta_text: heroData.cta_text || '',
          cta_link: heroData.cta_link || '',
          is_active: heroData.is_active ?? true,
        })
      }

      if (platformData) {
        setPlatformId(platformData.id)
        setPlatform({
          phone: platformData.phone || '',
          email: platformData.email || '',
          address: platformData.address || '',
          youtube_url: platformData.youtube_url || '',
          instagram_url: platformData.instagram_url || '',
          telegram_url: platformData.telegram_url || '',
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

    const now = new Date().toISOString()
    const heroPayload = { ...hero, updated_at: now }
    const platformPayload = { ...platform, updated_at: now }

    try {
      const heroResult = heroId
        ? await supabase.from('hero_settings').update(heroPayload).eq('id', heroId)
        : await supabase.from('hero_settings').insert({ ...heroPayload, created_at: now }).select('id').single()

      if (heroResult.error) throw heroResult.error
      if (!heroId && heroResult.data?.id) setHeroId(heroResult.data.id)

      const platformResult = platformId
        ? await supabase.from('platform_settings').update(platformPayload).eq('id', platformId)
        : await supabase.from('platform_settings').insert({ ...platformPayload, created_at: now }).select('id').single()

      if (platformResult.error) throw platformResult.error
      if (!platformId && platformResult.data?.id) setPlatformId(platformResult.data.id)

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Xatolik yuz berdi')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>
  }

  return (
    <div className="max-w-4xl space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold md:text-3xl"><span className="gradient-text">Sozlamalar</span></h1>
        <p className="text-gray-500">Hero, aloqa va ijtimoiy tarmoqlarni boshqarish</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="glass rounded-2xl p-6">
          <h2 className="mb-5 text-xl font-bold">Hero</h2>
          <div className="space-y-4">
            <input value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-50" placeholder="Sarlavha" />
            <textarea value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} rows={3} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-50" placeholder="Subtitle" />
            <div className="grid grid-cols-3 gap-3">
              {backgroundTypes.map((type) => (
                <button key={type.value} type="button" onClick={() => setHero({ ...hero, background_type: type.value })} className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 ${hero.background_type === type.value ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 dark:border-gray-700'}`}>
                  <type.icon className="h-5 w-5" />
                  {type.label}
                </button>
              ))}
            </div>
            {hero.background_type === 'image' && <input type="url" value={hero.background_url} onChange={(e) => setHero({ ...hero, background_url: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-50" placeholder="Rasm URL" />}
            {hero.background_type === 'video' && <input type="url" value={hero.video_url} onChange={(e) => setHero({ ...hero, video_url: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-50" placeholder="Video URL" />}
            <div className="grid gap-4 md:grid-cols-2">
              <input value={hero.cta_text} onChange={(e) => setHero({ ...hero, cta_text: e.target.value })} className="rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-50" placeholder="CTA matni" />
              <input value={hero.cta_link} onChange={(e) => setHero({ ...hero, cta_link: e.target.value })} className="rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-50" placeholder="CTA havolasi" />
            </div>
          </div>
        </section>

        <section className="glass rounded-2xl p-6">
          <h2 className="mb-5 text-xl font-bold">Aloqa va social tarmoqlar</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ['phone', 'Telefon', Phone],
              ['email', 'Email', Mail],
              ['address', 'Manzil', MapPin],
              ['youtube_url', 'YouTube', PlayCircle],
              ['instagram_url', 'Instagram', Camera],
              ['telegram_url', 'Telegram', Send],
            ].map(([key, label, Icon]) => (
              <label key={key} className="block">
                <span className="mb-1.5 block text-sm font-medium">{label}</span>
                <div className="relative">
                  <Icon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input value={platform[key]} onChange={(e) => setPlatform({ ...platform, [key]: e.target.value })} className="w-full rounded-xl border border-gray-200 bg-gray-100 py-2.5 pl-10 pr-4 outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-50" />
                </div>
              </label>
            ))}
          </div>
        </section>

        <button type="submit" disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent-purple py-3 font-medium text-white disabled:opacity-50">
          <Save className="h-5 w-5" />
          {saving ? 'Saqlanmoqda...' : 'Saqlash'}
        </button>
        {success && <div className="rounded-xl bg-green-500/10 p-3 text-center text-sm text-green-600">Muvaffaqiyatli saqlandi!</div>}
      </form>
    </div>
  )
}

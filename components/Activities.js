'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, MapPin, Users, ArrowUpRight, X, PlayCircle } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import EmptyState from '@/components/EmptyState'
import MediaLightbox from '@/components/MediaLightbox'
import StaffProfileModal from '@/components/StaffProfileModal'

const categoryLabels = {
  olimpiada: 'Olimpiada',
  sport: 'Sport',
  madaniyat: 'Madaniyat',
  hashar: 'Hashar',
  bayram: 'Bayram',
}

export default function Activities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [media, setMedia] = useState(null)
  const [staff, setStaff] = useState([])
  const [selectedStaff, setSelectedStaff] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadActivities() {
      const [{ data }, { data: staffRows }] = await Promise.all([
        supabase
        .from('activities')
        .select('*')
        .eq('is_published', true)
        .order('date', { ascending: false })
        .limit(3),
        supabase.from('staff').select('*').eq('is_active', true),
      ])

      setItems(data || [])
      setStaff(staffRows || [])
      setLoading(false)
    }

    loadActivities()
  }, [])

  const staffByName = Object.fromEntries(staff.map((item) => [item.full_name, item]))
  const staffById = Object.fromEntries(staff.map((item) => [item.id, item]))

  return (
    <section id="activities" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Maktab <span className="gradient-text">faoliyati</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Admin panel orqali kiritilgan tadbir va faoliyatlar.
            </p>
          </div>
          <Link href="/activities" className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-medium">
            Barcha faoliyatlar
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {!loading && items.length === 0 ? (
          <EmptyState icon={Calendar} title="Hali faoliyat mavjud emas" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(loading ? Array.from({ length: 3 }) : items).map((item, index) => (
              <motion.article key={item?.id || index} onClick={() => item?.id && setSelected(item)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="glass rounded-3xl overflow-hidden hover-lift cursor-pointer">
                <div className="aspect-video bg-primary/10">
                  {item?.image_url ? (
                    <button type="button" onClick={(e) => { e.stopPropagation(); setMedia({ type: 'image', src: item.image_url, alt: item.title }) }} className="h-full w-full">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    </button>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-primary/40" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs">
                    {categoryLabels[item?.category] || item?.category || '...'}
                  </span>
                  <h3 className="text-xl font-bold mt-3 mb-3">{item?.title || 'Yuklanmoqda...'}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-4">{item?.description || ''}</p>
                  <div className="space-y-2 text-sm text-gray-500">
                    {item?.date && <p className="flex items-center gap-2"><Calendar className="w-4 h-4" />{item.date}</p>}
                    {item?.location && (
                      <a href={item.location_url || mapSearchUrl(item.location)} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-2 hover:text-primary">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </a>
                    )}
                    {item?.participants_count ? <p className="flex items-center gap-2"><Users className="w-4 h-4" />{item.participants_count} ishtirokchi</p> : null}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.article initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-dark-50">
              <div className="relative aspect-video bg-primary/10">
                {(selected.image_urls?.[0] || selected.image_url) ? (
                  <button type="button" onClick={() => setMedia({ type: 'image', src: selected.image_urls?.[0] || selected.image_url, alt: selected.title })} className="h-full w-full">
                    <img src={selected.image_urls?.[0] || selected.image_url} alt={selected.title} className="h-full w-full object-cover" />
                  </button>
                ) : (
                  <div className="flex h-full items-center justify-center"><Calendar className="h-16 w-16 text-primary/40" /></div>
                )}
                <button onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white"><X className="h-5 w-5" /></button>
              </div>
              <div className="p-6 md:p-8">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{categoryLabels[selected.category] || selected.category}</span>
                <h3 className="mt-4 text-2xl font-bold md:text-3xl">{selected.title}</h3>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                  {selected.date && <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{selected.date}</span>}
                  {selected.location && (
                    <a href={selected.location_url || mapSearchUrl(selected.location)} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary">
                      <MapPin className="h-4 w-4" />
                      {selected.location}
                    </a>
                  )}
                  {selected.participants_count ? <span className="flex items-center gap-2"><Users className="h-4 w-4" />{selected.participants_count} ishtirokchi</span> : null}
                </div>
                <p className="mt-6 whitespace-pre-line leading-7 text-gray-700 dark:text-gray-300">{selected.description || "Qo'shimcha ma'lumot kiritilmagan."}</p>
                {Array.isArray(selected.teacher_names) && selected.teacher_names.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2 text-sm">
                    <span className="text-gray-500">Biriktirilgan o'qituvchilar:</span>
                    {selected.teacher_names.map((name, index) => {
                      const teacher = staffById[selected.teacher_ids?.[index]] || staffByName[name]
                      return (
                        <button key={`${name}-${index}`} type="button" onClick={() => teacher && setSelectedStaff(teacher)} disabled={!teacher} className="text-primary disabled:text-gray-500">
                          {name}{index < selected.teacher_names.length - 1 ? ',' : ''}
                        </button>
                      )
                    })}
                  </div>
                )}
                {Array.isArray(selected.image_urls) && selected.image_urls.length > 1 && (
                  <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                    {selected.image_urls.slice(1).map((url) => (
                      <button key={url} type="button" onClick={() => setMedia({ type: 'image', src: url, alt: selected.title })} className="aspect-video overflow-hidden rounded-2xl bg-primary/10">
                        <img src={url} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
                {Array.isArray(selected.video_urls) && selected.video_urls.length > 0 && (
                  <div className="mt-6 space-y-3">
                    {selected.video_urls.map((url) => (
                      <button key={url} type="button" onClick={() => setMedia({ type: 'video', src: url, alt: selected.title })} className="flex w-full items-center gap-2 rounded-2xl bg-gray-50 p-3 text-left text-primary dark:bg-dark-100">
                        <PlayCircle className="h-5 w-5" />
                        Video
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
      <MediaLightbox media={media} onClose={() => setMedia(null)} />
      <StaffProfileModal staff={selectedStaff} onClose={() => setSelectedStaff(null)} />
    </section>
  )
}

function mapSearchUrl(location) {
  if (!location?.trim()) return ''
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.trim())}`
}

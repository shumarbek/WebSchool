'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, FileText, Search, ArrowUpRight, X, UserRound, Clock } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import EmptyState from '@/components/EmptyState'
import MediaLightbox from '@/components/MediaLightbox'

const categoryLabels = {
  elon: "E'lon",
  maqola: 'Maqola',
  ozgarish: "O'zgarish",
  tadbir: 'Tadbir',
}

export default function News() {
  const [items, setItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [media, setMedia] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadNews() {
      const { data } = await supabase
        .from('news')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3)

      setItems(data || [])
      setLoading(false)
    }

    loadNews()
  }, [])

  const filtered = useMemo(() => (
    items.filter((item) => item.title?.toLowerCase().includes(searchQuery.toLowerCase()))
  ), [items, searchQuery])

  return (
    <section id="news" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              So'nggi <span className="gradient-text">yangiliklar</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Admin panel orqali chop etilgan yangiliklar.
            </p>
          </div>
          <Link href="/news" className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-medium">
            Barcha yangiliklar
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Yangiliklarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {!loading && filtered.length === 0 ? (
          <EmptyState icon={FileText} title="Hali yangilik mavjud emas" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(loading ? Array.from({ length: 3 }) : filtered).map((item, index) => (
              <motion.article
                key={item?.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onClick={() => item?.id && setSelected(item)}
                className="group glass rounded-3xl overflow-hidden hover-lift cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <div className="relative aspect-video overflow-hidden bg-primary/10">
                  {item?.image_url ? (
                    <button type="button" onClick={(e) => { e.stopPropagation(); setMedia({ type: 'image', src: item.image_url, alt: item.title }) }} className="h-full w-full">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </button>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FileText className="w-12 h-12 text-primary/40" />
                    </div>
                  )}
                  {item?.category && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-medium">
                      {categoryLabels[item.category] || item.category}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    {item?.published_at ? new Date(item.published_at).toLocaleDateString('uz-UZ') : '...'}
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{item?.title || 'Yuklanmoqda...'}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                    {item?.content || ''}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.article
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-0 shadow-2xl dark:bg-dark-50"
            >
              <div className="relative aspect-video bg-primary/10">
                {selected.image_url ? (
                  <button type="button" onClick={() => setMedia({ type: 'image', src: selected.image_url, alt: selected.title })} className="h-full w-full">
                    <img src={selected.image_url} alt={selected.title} className="h-full w-full object-cover" />
                  </button>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <FileText className="h-16 w-16 text-primary/40" />
                  </div>
                )}
                <button onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {categoryLabels[selected.category] || selected.category}
                </span>
                <h3 className="mt-4 text-2xl font-bold md:text-3xl">{selected.title}</h3>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                  {selected.published_at && <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{new Date(selected.published_at).toLocaleDateString('uz-UZ')}</span>}
                  {selected.author && <span className="flex items-center gap-2"><UserRound className="h-4 w-4" />{selected.author}</span>}
                  {selected.event_start_at && <span className="flex items-center gap-2"><Clock className="h-4 w-4" />{new Date(selected.event_start_at).toLocaleString('uz-UZ')}</span>}
                  {selected.responsible_person && <span className="flex items-center gap-2"><UserRound className="h-4 w-4" />Mas'ul: {selected.responsible_person}</span>}
                </div>
                <p className="mt-6 whitespace-pre-line leading-7 text-gray-700 dark:text-gray-300">{selected.content || "Qo'shimcha matn kiritilmagan."}</p>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
      <MediaLightbox media={media} onClose={() => setMedia(null)} />
    </section>
  )
}

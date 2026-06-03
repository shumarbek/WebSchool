'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Building, Calendar } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import EmptyState from '@/components/EmptyState'
import MediaLightbox from '@/components/MediaLightbox'

const monthLabels = {
  1: 'Yanvar',
  2: 'Fevral',
  3: 'Mart',
  4: 'Aprel',
  5: 'May',
  6: 'Iyun',
  7: 'Iyul',
  8: 'Avgust',
  9: 'Sentabr',
  10: 'Oktabr',
  11: 'Noyabr',
  12: 'Dekabr',
}

function formatDate(item) {
  return item?.month ? `${item.year} / ${monthLabels[item.month] || item.month}` : item?.year
}

export default function History() {
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)
  const [media, setMedia] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadHistory() {
      const { data } = await supabase
        .from('milestones')
        .select('*')
        .order('year', { ascending: true })
        .order('month', { ascending: true })

      setTimeline(data || [])
      setLoading(false)
    }

    loadHistory()
  }, [])

  return (
    <section id="history" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Maktab <span className="gradient-text">tarixi</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Admin panel orqali kiritilgan muhim tarixiy bosqichlar.
          </p>
        </motion.div>

        {!loading && timeline.length === 0 ? (
          <EmptyState icon={Calendar} title="Hali tarixiy kontent mavjud emas" />
        ) : (
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent-purple to-accent-cyan hidden md:block" />
            <div className="space-y-10">
              {(loading ? Array.from({ length: 1 }) : timeline).map((item, index) => (
                <motion.div
                  key={item?.id || index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="flex-1 w-full">
                    <div className="glass rounded-3xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
                          <Building className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-3xl font-bold gradient-text">{item ? formatDate(item) : '...'}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item?.title || 'Yuklanmoqda...'}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{item?.description || ''}</p>
                      {item?.is_director && item?.director_name && (
                        <p className="mt-4 text-sm text-primary">Direktor: {item.director_name}</p>
                      )}
                    </div>
                  </div>
                  <div className="hidden md:flex w-16 items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-white font-bold">
                      {item?.year || '...'}
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    {(item?.image_urls?.[0] || item?.image_url) ? (
                      <div className={item.is_director ? 'mx-auto w-full max-w-[260px]' : 'w-full'}>
                        <button type="button" onClick={() => setMedia({ type: 'image', src: item.image_urls?.[0] || item.image_url, alt: item.title })} className="block w-full">
                          <img src={item.image_urls?.[0] || item.image_url} alt={item.title} className={`w-full rounded-3xl object-cover ${item.is_director ? 'aspect-[3/4]' : 'aspect-video'}`} />
                        </button>
                        {Array.isArray(item.image_urls) && item.image_urls.length > 1 && (
                          <div className={`mt-3 grid gap-2 ${item.is_director ? 'grid-cols-2' : 'grid-cols-3'}`}>
                            {item.image_urls.slice(1).map((url) => (
                              <button key={url} type="button" onClick={() => setMedia({ type: 'image', src: url, alt: item.title })} className="aspect-video overflow-hidden rounded-xl bg-primary/10">
                                <img src={url} alt="" className="h-full w-full object-cover" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-48 rounded-3xl bg-primary/10 flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-primary/40" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
      <MediaLightbox media={media} onClose={() => setMedia(null)} />
    </section>
  )
}

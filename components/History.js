'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Building, Calendar, X } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import EmptyState from '@/components/EmptyState'

export default function History() {
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadHistory() {
      const { data } = await supabase
        .from('milestones')
        .select('*')
        .order('display_order', { ascending: true })
        .order('year', { ascending: true })

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
                        <span className="text-3xl font-bold gradient-text">{item?.year || '...'}</span>
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
                    {item?.image_url ? (
                      <button type="button" onClick={() => setSelectedImage(item)} className="block w-full">
                        <img src={item.image_url} alt={item.title} className={`w-full object-cover rounded-3xl ${item.is_director ? 'aspect-[3/4]' : 'aspect-video'}`} />
                      </button>
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
      <AnimatePresence>
        {selectedImage && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedImage(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-3xl bg-white p-3 dark:bg-dark-50">
              <button onClick={() => setSelectedImage(null)} className="absolute right-5 top-5 rounded-full bg-black/50 p-2 text-white"><X className="h-5 w-5" /></button>
              <img src={selectedImage.image_url} alt={selectedImage.title} className="max-h-[82vh] w-full object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Award, Trophy, ArrowUpRight, X, Calendar, Users } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import EmptyState from '@/components/EmptyState'

const categoryLabels = {
  olimpiada: 'Olimpiada',
  sport: 'Sport',
  ilmiy: 'Ilmiy',
  sertifikat: 'Sertifikat',
}

const stageLabels = {
  dostona: "Do'stona",
  tuman: 'Tuman',
  viloyat: 'Viloyat',
  respublika: 'Respublika',
  osiya: 'Osiya',
  jahon: 'Jahon',
}

export default function Achievements() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadAchievements() {
      const { data } = await supabase
        .from('achievements')
        .select('*')
        .eq('is_published', true)
        .order('award_date', { ascending: false })
        .limit(3)

      setItems(data || [])
      setLoading(false)
    }

    loadAchievements()
  }, [])

  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-dark-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Maktab <span className="gradient-text">yutuqlari</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Admin panel orqali chop etilgan yutuqlar.
            </p>
          </div>
          <Link href="/achievements" className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium">
            Barcha yutuqlar
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {!loading && items.length === 0 ? (
          <EmptyState icon={Trophy} title="Hali yutuq mavjud emas" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(loading ? Array.from({ length: 3 }) : items).map((item, index) => (
              <motion.div key={item?.id || index} onClick={() => item?.id && setSelected(item)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="glass rounded-3xl overflow-hidden hover-lift cursor-pointer">
                <div className="relative h-40 overflow-hidden bg-amber-500/10">
                  {item?.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Award className="w-12 h-12 text-amber-500/50" />
                    </div>
                  )}
                  {item?.stage && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-medium">{stageLabels[item.stage] || item.stage}</span>
                  )}
                </div>
                <div className="p-6">
                  <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-600 text-xs">
                    {categoryLabels[item?.category] || item?.category || '...'}
                  </span>
                  <h3 className="text-lg font-bold mt-3 mb-2">{item?.title || 'Yuklanmoqda...'}</h3>
                  {Array.isArray(item?.participants) && item.participants[0]?.name && <p className="text-sm text-primary mb-1">{item.participants[0].name}</p>}
                  <p className="text-sm text-gray-500 line-clamp-3">{item?.description || ''}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.article initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-dark-50">
              <div className="relative h-56 bg-amber-500/10">
                {selected.image_url ? <img src={selected.image_url} alt={selected.title} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><Award className="h-16 w-16 text-amber-500/50" /></div>}
                <button onClick={() => setSelected(null)} className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white"><X className="h-5 w-5" /></button>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-medium text-amber-600">{categoryLabels[selected.category] || selected.category}</span>
                  {selected.stage && <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{stageLabels[selected.stage] || selected.stage}</span>}
                  {selected.certificate_type && <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{selected.certificate_type.toUpperCase()}</span>}
                </div>
                <h3 className="mt-4 text-2xl font-bold md:text-3xl">{selected.title}</h3>
                {selected.award_date && <p className="mt-3 flex items-center gap-2 text-sm text-gray-500"><Calendar className="h-4 w-4" />{selected.award_date}</p>}
                <p className="mt-5 whitespace-pre-line leading-7 text-gray-700 dark:text-gray-300">{selected.description || "Qo'shimcha ma'lumot kiritilmagan."}</p>
                {Array.isArray(selected.participants) && selected.participants.length > 0 && (
                  <div className="mt-6">
                    <h4 className="mb-3 flex items-center gap-2 font-semibold"><Users className="h-4 w-4" />Ishtirokchilar</h4>
                    <div className="space-y-2">
                      {selected.participants.map((participant, idx) => (
                        <div key={`${participant.name}-${idx}`} className="rounded-2xl bg-gray-50 p-3 text-sm dark:bg-dark-100">
                          <p className="font-medium">{participant.name || 'Ism kiritilmagan'}</p>
                          <p className="text-gray-500">{[participant.place && `${participant.place}-o'rin`, participant.subject, participant.topik_type, participant.result, participant.score && `${participant.score} ball`].filter(Boolean).join(' | ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {Array.isArray(selected.teacher_names) && selected.teacher_names.length > 0 && (
                  <p className="mt-5 text-sm text-gray-500">Mas'ul ustozlar: {selected.teacher_names.join(', ')}</p>
                )}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

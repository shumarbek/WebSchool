'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, BriefcaseBusiness, GraduationCap, Mail, Phone, UserRound, Users, X } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import EmptyState from '@/components/EmptyState'

const roleLabels = {
  mamuriyat: "Ma'muriyat",
  pedagog: 'Pedagog',
  mutaxassis: 'Mutaxassis',
  xizmat: "Xizmat ko'rsatish",
}

function getPosition(item) {
  if (item?.role === 'pedagog') return `${titleCase(item.subject || 'Fan')} o'qituvchisi`
  return titleCase(item?.position || item?.work_type || roleLabels[item?.role] || 'Hodim')
}

function titleCase(value) {
  return value
    ?.toString()
    .replaceAll('_', ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || ''
}

export default function Staff({ featuredOnly = false }) {
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadStaff() {
      let query = supabase
        .from('staff')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .order('full_name', { ascending: true })

      if (featuredOnly) {
        query = query.eq('is_featured', true).neq('role', 'xizmat').limit(6)
      }

      const { data } = await query

      setStaff(data || [])
      setLoading(false)
    }

    loadStaff()
  }, [featuredOnly])

  const counts = useMemo(() => ({
    teachers: staff.filter((item) => item.role === 'pedagog').length,
    staff: staff.filter((item) => item.role !== 'pedagog').length,
  }), [staff])

  return (
    <section id="staff" className="py-20 bg-gray-50 dark:bg-dark-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Professional <span className="gradient-text">hodimlar</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              {featuredOnly ? 'Admin tanlagan asosiy pedagog va maktab hodimlari.' : 'Maktab jamoasi rollar bo‘yicha guruhlangan.'}
            </p>
          </div>
          <Link href="/staff" className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-medium">
            Barcha hodimlar
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {!loading && staff.length === 0 ? (
          <EmptyState icon={Users} title={featuredOnly ? 'Hali tanlangan hodim mavjud emas' : 'Hali hodim mavjud emas'} />
        ) : (
          <>
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="glass rounded-2xl p-5 text-center">
                <GraduationCap className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold gradient-text">{loading ? '...' : counts.teachers}</p>
                <p className="text-sm text-gray-500">O'qituvchilar</p>
              </div>
              <div className="glass rounded-2xl p-5 text-center">
                <BriefcaseBusiness className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold gradient-text">{loading ? '...' : counts.staff}</p>
                <p className="text-sm text-gray-500">Maktab hodimlari</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
              {(loading ? Array.from({ length: 3 }) : staff.filter((item) => item.role !== 'xizmat')).map((item, index) => (
                <motion.button key={item?.id || index} type="button" onClick={() => item?.id && setSelected(item)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="glass overflow-hidden rounded-2xl text-left hover-lift">
                  <div className="aspect-[3/4] bg-primary/10">
                    {item?.photo_url ? <img src={item.photo_url} alt={item.full_name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><UserRound className="h-16 w-16 text-primary/35" /></div>}
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-primary">{getPosition(item)}</p>
                    <h3 className="mt-1 text-lg font-bold">{item?.full_name || 'Yuklanmoqda...'}</h3>
                    <div className="mt-3 space-y-1 text-sm text-gray-500">
                      <p>{item?.experience_years || 0} yil tajriba</p>
                      {item?.qualification_level && <p>{item.qualification_level}</p>}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            {!featuredOnly && staff.some((item) => item.role === 'xizmat') && (
              <div className="mt-10">
                <h3 className="mb-4 text-2xl font-bold">Xizmat ko'rsatish</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {staff.filter((item) => item.role === 'xizmat').map((item) => (
                    <div key={item.id} className="glass rounded-2xl p-5">
                      <p className="font-semibold">{titleCase(item.work_type)}</p>
                      <p className="mt-2 text-3xl font-bold gradient-text">{item.service_count || 0}</p>
                      <p className="text-sm text-gray-500">nafar</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.article initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-dark-50 md:grid-cols-[280px_1fr]">
              <div className="bg-primary/10 p-6">
                <button onClick={() => setSelected(null)} className="mb-4 ml-auto flex rounded-full bg-black/50 p-2 text-white md:hidden"><X className="h-5 w-5" /></button>
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-white/40">
                  {selected.photo_url ? <img src={selected.photo_url} alt={selected.full_name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><UserRound className="h-16 w-16 text-primary/35" /></div>}
                </div>
                <div className="mt-5 space-y-3 text-sm">
                  {selected.phone && <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" />{selected.phone}</p>}
                  {selected.email && <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" />{selected.email}</p>}
                </div>
              </div>
              <div className="relative p-6 md:p-8">
                <button onClick={() => setSelected(null)} className="absolute right-5 top-5 hidden rounded-full bg-gray-100 p-2 dark:bg-dark-100 md:block"><X className="h-5 w-5" /></button>
                <p className="text-sm font-medium text-primary">{roleLabels[selected.role]} | {getPosition(selected)}</p>
                <h3 className="mt-2 text-2xl font-bold md:text-3xl">{selected.full_name}</h3>
                <p className="mt-2 text-gray-500">{selected.experience_years || 0} yil tajriba {selected.qualification_level ? `| ${selected.qualification_level}` : ''}</p>
                <p className="mt-6 whitespace-pre-line leading-7 text-gray-700 dark:text-gray-300">{selected.bio || "Biografiya hali kiritilmagan."}</p>
                {selected.awards && (
                  <div className="mt-6 rounded-2xl bg-amber-500/10 p-4">
                    <h4 className="mb-2 font-semibold text-amber-600">Mukofotlar</h4>
                    <p className="whitespace-pre-line text-sm text-gray-700 dark:text-gray-300">{selected.awards}</p>
                  </div>
                )}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Phone, UserRound, X } from 'lucide-react'
import useBodyScrollLock from '@/hooks/useBodyScrollLock'

function titleCase(value) {
  return value
    ?.toString()
    .replaceAll('_', ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || ''
}

function getPosition(staff) {
  if (staff?.role === 'pedagog') return `${titleCase(staff.subject || 'Fan')} o'qituvchisi`
  return titleCase(staff?.position || staff?.work_type || 'Hodim')
}

export default function StaffProfileModal({ staff, onClose }) {
  useBodyScrollLock(!!staff)

  return (
    <AnimatePresence>
      {staff && (
        <motion.div className="fixed inset-0 z-[65] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.article initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-dark-50 md:grid-cols-[280px_1fr]">
            <div className="bg-primary/10 p-6 md:sticky md:top-0 md:self-start">
              <button onClick={onClose} className="mb-4 ml-auto flex rounded-full bg-black/50 p-2 text-white md:hidden"><X className="h-5 w-5" /></button>
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-white/40">
                {staff.photo_url ? <img src={staff.photo_url} alt={staff.full_name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center"><UserRound className="h-16 w-16 text-primary/35" /></div>}
              </div>
              <div className="mt-5 space-y-3 text-sm">
                {staff.phone && <a href={`tel:${staff.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4 text-primary" />{staff.phone}</a>}
                {staff.email && <a href={`mailto:${staff.email}`} className="flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4 text-primary" />{staff.email}</a>}
              </div>
            </div>
            <div className="relative p-6 md:p-8">
              <button onClick={onClose} className="absolute right-5 top-5 hidden rounded-full bg-gray-100 p-2 dark:bg-dark-100 md:block"><X className="h-5 w-5" /></button>
              <p className="text-sm font-medium text-primary">{getPosition(staff)}</p>
              <h3 className="mt-2 text-2xl font-bold md:text-3xl">{staff.full_name}</h3>
              <p className="mt-2 text-gray-500">{staff.experience_years || 0} yil tajriba {staff.qualification_level ? `| ${staff.qualification_level}` : ''}</p>
              <p className="mt-6 whitespace-pre-line leading-7 text-gray-700 dark:text-gray-300">{staff.bio || "Biografiya hali kiritilmagan."}</p>
              {staff.awards && (
                <div className="mt-6 rounded-2xl bg-amber-500/10 p-4">
                  <h4 className="mb-2 font-semibold text-amber-600">Mukofotlar</h4>
                  <p className="whitespace-pre-line text-sm text-gray-700 dark:text-gray-300">{staff.awards}</p>
                </div>
              )}
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

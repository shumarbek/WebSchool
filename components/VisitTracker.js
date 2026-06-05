'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function VisitTracker() {
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return

    const today = new Date().toISOString().slice(0, 10)
    const key = `webschool_visit_${today}_${pathname}`
    if (localStorage.getItem(key)) return
    localStorage.setItem(key, '1')

    supabase
      .from('site_visits')
      .insert({
        path: pathname,
        user_agent: navigator.userAgent,
        visited_at: new Date().toISOString(),
      })
      .then(({ error }) => {
        if (error) console.warn('Visit tracking skipped:', error.message)
      })
  }, [pathname, supabase])

  return null
}

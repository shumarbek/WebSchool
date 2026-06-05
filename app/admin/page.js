'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { 
  Users, Calendar, Award, BookOpen, Clock, FileText, 
  TrendingUp, History, BarChart3
} from 'lucide-react'

const statsCards = [
  { name: 'Hodimlar', key: 'staff', icon: Users, color: 'from-blue-500 to-cyan-500' },
  { name: 'Yangiliklar', key: 'news', icon: FileText, color: 'from-purple-500 to-pink-500' },
  { name: 'Yutuqlar', key: 'achievements', icon: Award, color: 'from-amber-500 to-orange-500' },
  { name: 'Faoliyat', key: 'activities', icon: Calendar, color: 'from-green-500 to-emerald-500' },
  { name: 'Kutubxona', key: 'library', icon: BookOpen, color: 'from-indigo-500 to-purple-500' },
  { name: 'Jadval', key: 'schedule', icon: Clock, color: 'from-rose-500 to-red-500' },
  { name: 'Tarix', key: 'history', icon: History, color: 'from-slate-500 to-gray-700' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState({})
  const [visits, setVisits] = useState({ total: 0, days: [] })
  const [recentNews, setRecentNews] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    try {
      const [staffRes, newsRes, achievementsRes, activitiesRes, libraryRes, scheduleRes, historyRes, visitsRes] = await Promise.all([
        supabase.from('staff').select('role, service_count'),
        supabase.from('news').select('*', { count: 'exact', head: true }),
        supabase.from('achievements').select('*', { count: 'exact', head: true }),
        supabase.from('activities').select('*', { count: 'exact', head: true }),
        supabase.from('library_books').select('*', { count: 'exact', head: true }),
        supabase.from('schedule').select('*', { count: 'exact', head: true }),
        supabase.from('milestones').select('*', { count: 'exact', head: true }),
        supabase.from('site_visits').select('visited_at').gte('visited_at', last30DaysDate()),
      ])

      const staffCount = (staffRes.data || []).reduce((total, item) => {
        if (item.role === 'xizmat') return total + (Number(item.service_count) || 0)
        return total + 1
      }, 0)

      setStats({
        staff: staffCount,
        news: newsRes.count || 0,
        achievements: achievementsRes.count || 0,
        activities: activitiesRes.count || 0,
        library: libraryRes.count || 0,
        schedule: scheduleRes.count || 0,
        history: historyRes.count || 0,
      })
      setVisits(buildVisitStats(visitsRes.error ? [] : visitsRes.data || []))

      const { data: newsData } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      setRecentNews(newsData || [])
    } catch (error) {
      console.error('Error loading stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          <span className="gradient-text">Boshqaruv paneli</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          DOSOV platformasini boshqarish
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {statsCards.map((card, index) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-2xl p-4 hover-lift"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold gradient-text">{loading ? '...' : stats[card.key] || 0}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{card.name}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold mb-4">So'nggi yangiliklar</h2>
          {loading ? (
            <p className="text-gray-500">Yuklanmoqda...</p>
          ) : recentNews.length > 0 ? (
            <div className="space-y-3">
              {recentNews.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Yangiliklar yo'q</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6"
        >
          <h2 className="text-lg font-bold mb-4">Tizim holati</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="font-medium">Supabase</span>
              </div>
              <span className="text-sm text-green-600">Faol</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Jami yozuvlar</span>
              </div>
              <span className="text-sm font-bold gradient-text">
                {Object.values(stats).reduce((a, b) => a + b, 0)}
              </span>
            </div>
            <div className="rounded-xl bg-purple-500/10 p-3">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">30 kunlik tashrif</span>
                </div>
                <span className="text-sm font-bold gradient-text">{visits.total}</span>
              </div>
              <div className="flex h-14 items-end gap-1">
                {visits.days.map((day) => (
                  <div key={day.date} className="flex flex-1 items-end">
                    <div className="w-full rounded-t bg-purple-500/70" style={{ height: `${Math.max(8, day.percent)}%` }} title={`${day.date}: ${day.count}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function last30DaysDate() {
  const date = new Date()
  date.setDate(date.getDate() - 29)
  date.setHours(0, 0, 0, 0)
  return date.toISOString()
}

function buildVisitStats(rows) {
  const dates = Array.from({ length: 30 }, (_, index) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - index))
    return date.toISOString().slice(0, 10)
  })
  const counts = Object.fromEntries(dates.map((date) => [date, 0]))

  rows.forEach((row) => {
    const date = row.visited_at?.slice(0, 10)
    if (date && counts[date] !== undefined) counts[date] += 1
  })

  const max = Math.max(1, ...Object.values(counts))
  const days = dates.map((date) => ({
    date,
    count: counts[date],
    percent: (counts[date] / max) * 100,
  }))

  return { total: rows.length, days }
}

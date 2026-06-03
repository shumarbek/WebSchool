'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase'
import { 
  Users, Calendar, Award, BookOpen, Clock, FileText, 
  TrendingUp, History
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
  const [recentNews, setRecentNews] = useState([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {
    try {
      const [staffRes, newsRes, achievementsRes, activitiesRes, libraryRes, scheduleRes, historyRes] = await Promise.all([
        supabase.from('staff').select('*', { count: 'exact', head: true }),
        supabase.from('news').select('*', { count: 'exact', head: true }),
        supabase.from('achievements').select('*', { count: 'exact', head: true }),
        supabase.from('activities').select('*', { count: 'exact', head: true }),
        supabase.from('library_books').select('*', { count: 'exact', head: true }),
        supabase.from('schedule').select('*', { count: 'exact', head: true }),
        supabase.from('milestones').select('*', { count: 'exact', head: true }),
      ])

      setStats({
        staff: staffRes.count || 0,
        news: newsRes.count || 0,
        achievements: achievementsRes.count || 0,
        activities: activitiesRes.count || 0,
        library: libraryRes.count || 0,
        schedule: scheduleRes.count || 0,
        history: historyRes.count || 0,
      })

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
          </div>
        </motion.div>
      </div>
    </div>
  )
}

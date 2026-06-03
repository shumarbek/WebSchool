'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Building2, GraduationCap, TrendingUp, Users } from 'lucide-react'
import { createClient } from '@/lib/supabase'

const fields = [
  { icon: Users, key: 'students_count', label: "Yillik o'quvchilar", suffix: '+' },
  { icon: GraduationCap, key: 'staff_count', label: 'Hodimlar', suffix: '' },
  { icon: Award, key: 'achievements_count', label: 'Yutuqlar', suffix: '+' },
  { icon: TrendingUp, key: 'admission_percent', label: 'Kirish foizi', suffix: '%' },
  { icon: Building2, key: 'rooms_count', label: 'Xonalar', suffix: '' },
]

export default function Stats() {
  const [stats, setStats] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadStats() {
      const { data } = await supabase
        .from('stats_settings')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      const { count: staffCount } = await supabase
        .from('staff')
        .select('id', { count: 'exact', head: true })
        .eq('is_active', true)
        .neq('role', 'xizmat')

      setStats({ ...(data || {}), staff_count: staffCount || 0 })
    }

    loadStats()
  }, [])

  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Maktab</span> statistikasi
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Bu raqamlar admin paneldagi statistika sozlamalaridan boshqariladi.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {fields.map((field, index) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent-purple/20 flex items-center justify-center mx-auto mb-4">
                <field.icon className="w-7 h-7 text-primary" />
              </div>
              <p className="text-3xl font-bold gradient-text mb-2">
                {stats ? `${stats[field.key] || 0}${field.suffix}` : '...'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{field.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

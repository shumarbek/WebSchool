'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Mail, Eye, EyeOff, GraduationCap, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [supabaseError, setSupabaseError] = useState(null)
  
  useEffect(() => {
    const storedAdmin = localStorage.getItem('dosov_admin')
    if (storedAdmin) {
      window.location.href = '/admin'
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSupabaseError(null)
    setLoading(true)

    if (!email || !password) {
      setError('Iltimos, barcha maydonlarni to\'ldiring')
      setLoading(false)
      return
    }

    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey) {
        setSupabaseError('Supabase konfiguratsiyasi topilmadi. Iltimos .env.local faylini tekshiring.')
        setLoading(false)
        return
      }
      
      const supabase = createClient(supabaseUrl, supabaseKey)
      
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('password_hash', password)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Login yoki parol xato')
        } else {
          setSupabaseError(`Supabase xatosi: ${error.message}`)
        }
        setLoading(false)
        return
      }

      if (data) {
        localStorage.setItem('dosov_admin', JSON.stringify(data))
        window.location.href = '/admin'
      } else {
        setError('Login yoki parol xato')
      }
    } catch (err) {
      console.error('Login error:', err)
      setSupabaseError(`Xatolik: ${err.message}`)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-100 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="glass rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">DOSOV Admin</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Tizimga kirish</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {supabaseError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {supabaseError}
              </div>
            )}
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="admin@dosov.uz"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Parol
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-gray-100 dark:bg-dark-50 border border-gray-200 dark:border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Kirish...' : 'Kirish'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-primary hover:underline">
              Bosh sahifaga qaytish
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

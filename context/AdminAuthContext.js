'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const AdminAuthContext = createContext()

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    checkAdmin()
  }, [])

  async function checkAdmin() {
    try {
      const storedAdmin = localStorage.getItem('dosov_admin')
      if (storedAdmin) {
        const adminData = JSON.parse(storedAdmin)
        setAdmin(adminData)
      }
    } catch (error) {
      console.error('Error checking admin:', error)
    } finally {
      setLoading(false)
    }
  }

  async function login(email, password) {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('password_hash', password)
        .single()

      if (error) throw error

      if (data) {
        localStorage.setItem('dosov_admin', JSON.stringify(data))
        setAdmin(data)
        router.push('/admin')
        return { success: true }
      } else {
        return { success: false, error: 'Login yoki parol xato' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Xatolik yuz berdi' }
    }
  }

  function logout() {
    localStorage.removeItem('dosov_admin')
    setAdmin(null)
    router.push('/admin/login')
  }

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider')
  }
  return context
}
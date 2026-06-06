'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AdminAuthContext = createContext()

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAdmin()
  }, [])

  async function checkAdmin() {
    try {
      const response = await fetch('/api/admin/me', { cache: 'no-store' })
      if (!response.ok) return
      const data = await response.json()
      setAdmin(data.admin || null)
    } catch (error) {
      console.error('Error checking admin:', error)
    } finally {
      setLoading(false)
    }
  }

  async function login(email, password) {
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) return { success: false, error: data.error || 'Login yoki parol xato' }

      setAdmin(data.admin)
      router.push('/admin')
      return { success: true }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Xatolik yuz berdi' }
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
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

'use client'

import { useEffect, useState } from 'react'
import { AdminAuthProvider, useAdminAuth } from '@/context/AdminAuthContext'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Activity,
  Award,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  History,
  Users,
  ChevronsLeft,
  ChevronsRight,
  Bot,
} from 'lucide-react'

const menuItems = [
  { name: 'Boshqaruv paneli', href: '/admin', icon: LayoutDashboard },
  { name: 'Hodimlar', href: '/admin/staff', icon: Users },
  { name: 'Dars jadvali', href: '/admin/schedule', icon: Clock },
  { name: 'Yangiliklar', href: '/admin/news', icon: FileText },
  { name: 'Yutuqlar', href: '/admin/achievements', icon: Award },
  { name: 'Faoliyat', href: '/admin/activities', icon: Calendar },
  { name: 'Kutubxona', href: '/admin/library', icon: BookOpen },
  { name: 'Tarix', href: '/admin/history', icon: History },
  { name: 'Sozlamalar', href: '/admin/settings', icon: Settings },
  { name: 'Smart AI', href: '/admin/ai', icon: Bot },
  { name: 'Statistika', href: '/admin/stats', icon: Activity },
]

function AdminLayoutContent({ children }) {
  const { admin, loading, logout } = useAdminAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (!isLoginPage && !loading && !admin) {
      router.push('/admin/login')
    }
  }, [admin, isLoginPage, loading, router])

  if (isLoginPage) {
    return children
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-100">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!admin) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-100">
      <aside className={`fixed top-0 left-0 h-full bg-white dark:bg-dark-50 border-r border-gray-200 dark:border-gray-700 z-40 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <span className="font-bold gradient-text">DOSOV</span>}
          </Link>
        </div>

        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/10 to-accent-purple/10 text-primary'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title={item.name}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium truncate">{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
            title="Chiqish"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm font-medium">Chiqish</span>}
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <button
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Menyuni yopish"
        />
      )}

      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <header className="sticky top-0 z-20 bg-white dark:bg-dark-50 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              title="Menyuni ochish"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSidebarOpen((value) => !value)}
              className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-600 transition-all hover:border-primary/40 hover:text-primary dark:border-gray-700 dark:bg-dark-100 dark:text-gray-300 lg:inline-flex"
              title={sidebarOpen ? "Menyuni yig'ish" : 'Menyuni ochish'}
              aria-label={sidebarOpen ? "Menyuni yig'ish" : 'Menyuni ochish'}
            >
              {sidebarOpen ? <ChevronsLeft className="h-4 w-4" /> : <ChevronsRight className="h-4 w-4" />}
              <span>{sidebarOpen ? "Menyuni yig'ish" : 'Menyuni ochish'}</span>
            </button>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">{admin.full_name || admin.email}</p>
              <p className="text-xs text-gray-500">{admin.role || 'Admin'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent-purple flex items-center justify-center text-white font-bold">
              {admin.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  )
}

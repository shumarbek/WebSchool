'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Mail, Phone, Calendar, BookOpen, Award, Star, GraduationCap, Users, Building2, Shield } from 'lucide-react'

const staffMembers = [
  {
    id: 1,
    name: 'Rustam Ahmedov',
    role: 'director',
    position: 'Direktor',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    experience: 20,
    email: 'director@dosov.uz',
    phone: '+998 90 000-00-01',
    achievements: ['Xalq ta\'limi a\'lochisi', 'Respublika ta\'lim mukofoti'],
    subject: 'Boshqaruv'
  },
  {
    id: 2,
    name: 'Aziz Qodirov',
    role: 'teacher',
    position: 'O\'qituvchi',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    experience: 15,
    email: 'aziz.qodirov@dosov.uz',
    phone: '+998 90 123-45-67',
    achievements: ['Xalqaro olimpiada murabbiyi', 'Yil eng yaxshi oqituvchi 2024'],
    subject: 'Matematika'
  },
  {
    id: 3,
    name: 'Malika Yusupova',
    role: 'teacher',
    position: 'O\'qituvchi',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    experience: 12,
    email: 'malika.yusupova@dosov.uz',
    phone: '+998 90 234-56-78',
    achievements: ['Fizika fan nomzodi', 'Respublika olimpiada g\'olibi'],
    subject: 'Fizika'
  },
  {
    id: 4,
    name: 'Bobur Aliyev',
    role: 'teacher',
    position: 'O\'qituvchi',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    experience: 8,
    email: 'bobur.aliyev@dosov.uz',
    phone: '+998 90 345-67-89',
    achievements: ['CELTA Sertifikati', 'Xalqaro til olimpiadasi murabbiyi'],
    subject: 'Ingliz tili'
  },
  {
    id: 5,
    name: 'Nilufar Ahmedova',
    role: 'teacher',
    position: 'O\'qituvchi',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    experience: 10,
    email: 'nilufar.ahmedova@dosov.uz',
    phone: '+998 90 456-78-90',
    achievements: ['Kimyo fan doktori', 'Ilmiy loyiha rahbari'],
    subject: 'Kimyo'
  },
  {
    id: 6,
    name: 'Jahongir Sobirov',
    role: 'teacher',
    position: 'O\'qituvchi',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    experience: 7,
    email: 'jahongir.sobirov@dosov.uz',
    phone: '+998 90 567-89-01',
    achievements: ['Robototexnika ustasi', 'ACM dasturlash musobaqasi g\'olibi'],
    subject: 'Informatika'
  },
  {
    id: 7,
    name: 'Gulnora Karimova',
    role: 'teacher',
    position: 'O\'qituvchi',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
    experience: 18,
    email: 'gulnora.karimova@dosov.uz',
    phone: '+998 90 678-90-12',
    achievements: ['Tarix fan nomzodi', 'Yil eng yaxshi oqituvchi 2023'],
    subject: 'Tarix'
  },
  {
    id: 8,
    name: 'Dilshod Rahimov',
    role: 'teacher',
    position: 'O\'qituvchi',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    experience: 14,
    email: 'dilshod.rahimov@dosov.uz',
    phone: '+998 90 789-01-23',
    achievements: ['Adabiyot fan nomzodi', 'Sharq adabiyoti mutaxassisi'],
    subject: 'Adabiyot'
  },
  {
    id: 9,
    name: 'Kamola Saidova',
    role: 'teacher',
    position: 'O\'qituvchi',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400',
    experience: 9,
    email: 'kamola.saidova@dosov.uz',
    phone: '+998 90 890-12-34',
    achievements: ['Biologiya fan nomzodi', 'Ekologik loyiha rahbari'],
    subject: 'Biologiya'
  },
  {
    id: 10,
    name: 'Samir Valiyev',
    role: 'teacher',
    position: 'O\'qituvchi',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    experience: 6,
    email: 'samir.valiyev@dosov.uz',
    phone: '+998 90 901-23-45',
    achievements: ['Geografiya oqituvchi', 'Turizm mutaxassisi'],
    subject: 'Geografiya'
  },
  {
    id: 11,
    name: 'Bekzod Qodirov',
    role: 'teacher',
    position: 'O\'qituvchi',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
    experience: 11,
    email: 'bekzod.qodirov@dosov.uz',
    phone: '+998 90 012-34-56',
    achievements: ['Sport ustasi', 'Respublika chempionati g\'olibi'],
    subject: 'Jismoniy tarbiya'
  },
  {
    id: 12,
    name: 'Laylo Islamova',
    role: 'staff',
    position: 'Direktor o\'rinbosari',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
    experience: 12,
    email: 'laylo.islamova@dosov.uz',
    phone: '+998 90 111-22-33',
    achievements: ['Ta\'lim boshqaruvi mutaxassisi', 'Pedagogik ta\'lim'],
    subject: 'Boshqaruv'
  },
  {
    id: 13,
    name: 'Bahodir Yusupov',
    role: 'staff',
    position: 'Ma\'muriy mudir',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    experience: 8,
    email: 'bahodir.yusupov@dosov.uz',
    phone: '+998 90 222-33-44',
    achievements: ['Ma\'muriy boshqaruv', 'Moliya hisob'],
    subject: 'Ma\'muriyat'
  },
  {
    id: 14,
    name: 'Sarvar Aliyev',
    role: 'staff',
    position: 'Nazoratchi',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    experience: 5,
    email: 'sarvar.aliyev@dosov.uz',
    phone: '+998 90 333-44-55',
    achievements: ['Xavfsizlik mutaxassisi'],
    subject: 'Xavfsizlik'
  },
  {
    id: 15,
    name: 'Gulshan Ahmedova',
    role: 'staff',
    position: 'Hamshira',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    experience: 7,
    email: 'gulshan.ahmedova@dosov.uz',
    phone: '+998 90 444-55-66',
    achievements: ['Tibbiyot mutaxassisi', 'Bolalar salomatligi'],
    subject: 'Salomatlik'
  }
]

const roles = [
  { value: 'all', label: 'Hammasi', icon: Users },
  { value: 'director', label: 'Direktor', icon: Building2 },
  { value: 'teacher', label: 'O\'qituvchilar', icon: GraduationCap },
  { value: 'staff', label: 'Hodimlar', icon: Shield },
]

const subjects = ['Hammasi', 'Matematika', 'Fizika', 'Ingliz tili', 'Kimyo', 'Informatika', 'Tarix', 'Adabiyot', 'Biologiya', 'Geografiya', 'Jismoniy tarbiya', 'Boshqaruv', 'Ma\'muriyat', 'Xavfsizlik', 'Salomatlik']

export default function StaffPage() {
  const [activeRole, setActiveRole] = useState('all')
  const [activeSubject, setActiveSubject] = useState('Hammasi')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStaff = staffMembers.filter(member => {
    const roleMatch = activeRole === 'all' || member.role === activeRole
    const subjectMatch = activeSubject === 'Hammasi' || member.subject === activeSubject
    const searchMatch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        member.subject.toLowerCase().includes(searchQuery.toLowerCase())
    return roleMatch && subjectMatch && searchMatch
  })

  const getRoleBadge = (role) => {
    switch (role) {
      case 'director': return { label: 'Direktor', color: 'bg-purple-500' }
      case 'teacher': return { label: 'O\'qituvchi', color: 'bg-primary' }
      case 'staff': return { label: 'Hodim', color: 'bg-amber-500' }
      default: return { label: role, color: 'bg-gray-500' }
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Hodimlar</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            DOSOV maktabining barcha hodimlari va o'qituvchilari
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Hodimlarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide"
        >
          {roles.map((role) => (
            <button
              key={role.value}
              onClick={() => setActiveRole(role.value)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeRole === role.value
                  ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                  : 'glass hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <role.icon className="w-4 h-4" />
              {role.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide"
        >
          {subjects.map((subj) => (
            <button
              key={subj}
              onClick={() => setActiveSubject(subj)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap text-sm transition-all ${
                activeSubject === subj
                  ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                  : 'glass hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {subj}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaff.map((member, index) => {
            const badge = getRoleBadge(member.role)
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="glass rounded-3xl overflow-hidden hover-lift"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className={`inline-block px-3 py-1 rounded-full ${badge.color} text-white text-xs font-medium mb-2`}>
                      {badge.label}
                    </span>
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <BookOpen className="w-4 h-4" />
                    {member.subject}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    {member.experience} yillik tajriba
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      <span>{member.phone}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.achievements.map((achievement, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/10 rounded-lg text-xs text-primary">
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {filteredStaff.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-gray-500 text-lg">Hech qanday hodim topilmadi</p>
          </motion.div>
        )}
      </div>
    </main>
  )
}
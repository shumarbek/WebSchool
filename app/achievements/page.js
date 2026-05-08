'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Trophy, Medal, Award, Search, Filter, Star, Users, Calendar, 
  MapPin, BookOpen, GraduationCap, Target, TrendingUp, Crown
} from 'lucide-react'

const stats = {
  total: 342,
  gold: 87,
  silver: 124,
  bronze: 131,
  international: 45,
  republic: 156,
  region: 141,
  students: 156,
  teachers: 12
}

const achievements = [
  {
    id: 1,
    title: 'Xalqaro Matematika Olimpiadasi',
    type: 'olympiad',
    level: 'Xalqaro',
    date: '5-7 may, 2026',
    location: 'Istanbul, Turkey',
    medals: { gold: 3, silver: 2, bronze: 1 },
    winners: ['Aziz Karimov', 'Malika Yusupova', 'Bobur Aliyev', 'Dilshod Rahimov', 'Kamola Saidova', 'Samir Valiyev'],
    subject: 'Matematika'
  },
  {
    id: 2,
    title: 'Xalqaro Fizika Olimpiadasi',
    type: 'olympiad',
    level: 'Xalqaro',
    date: '12-15 aprel, 2026',
    location: 'Moskva, Rossiya',
    medals: { gold: 2, silver: 3, bronze: 2 },
    winners: ['Jahongir Sobirov', 'Gulnora Karimova', 'Bahodir Yusupov', 'Sarvar Aliyev', 'Laylo Islamova', 'Rustam Ahmedov', 'Aziz Qodirov'],
    subject: 'Fizika'
  },
  {
    id: 3,
    title: 'Respublika Kimyo Olimpiadasi',
    type: 'olympiad',
    level: 'Respublika',
    date: '20-23 mart, 2026',
    location: 'Toshkent',
    medals: { gold: 4, silver: 2, bronze: 3 },
    winners: ['Nilufar Ahmedova', 'Bekzod Qodirov', 'Ulugbek Kholmatov', 'Gulnora Ismailova', 'Aziz Karimov', 'Malika Yusupova', 'Bobur Aliyev', 'Dilshod Rahimov', 'Kamola Saidova'],
    subject: 'Kimyo'
  },
  {
    id: 4,
    title: 'IELTS Sertifikati',
    type: 'certificate',
    level: 'Xalqaro',
    date: '1 may, 2026',
    location: 'Cambridge Assessment',
    medals: { gold: 0, silver: 0, bronze: 0 },
    winners: ['Aziz Karimov (7.5)', 'Malika Yusupova (7.0)', 'Bobur Aliyev (6.5)'],
    subject: 'Ingliz tili'
  },
  {
    id: 5,
    title: 'Milliy Sertifikat B2',
    type: 'certificate',
    level: 'Milliy',
    date: '15 aprel, 2026',
    location: 'O\'zbekiston',
    medals: { gold: 0, silver: 0, bronze: 0 },
    winners: ['Jahongir Sobirov', 'Gulnora Karimova', 'Dilshod Rahimov'],
    subject: 'Ingliz tili'
  },
  {
    id: 6,
    title: 'Voleybol chempionati',
    type: 'sport',
    level: 'Respublika',
    date: '10-12 aprel, 2026',
    location: 'Toshkent',
    medals: { gold: 1, silver: 0, bronze: 0 },
    winners: ['Maktab voleybol jamoasi'],
    subject: 'Sport'
  },
  {
    id: 7,
    title: 'Basketbol turniri',
    type: 'sport',
    level: 'Viloyat',
    date: '5-7 aprel, 2026',
    location: 'Toshkent viloyati',
    medals: { gold: 1, silver: 1, bronze: 0 },
    winners: ['Maktab basketbol jamoasi'],
    subject: 'Sport'
  },
  {
    id: 8,
    title: 'Robototexnika Championship',
    type: 'tech',
    level: 'Xalqaro',
    date: '20-22 mart, 2026',
    location: 'Seoul, Janubiy Koreya',
    medals: { gold: 2, silver: 1, bronze: 2 },
    winners: ['Jahongir Sobirov', 'Kamola Saidova', 'Samir Valiyev', 'Bekzod Qodirov', 'Sarvar Aliyev'],
    subject: 'Informatika'
  },
  {
    id: 9,
    title: 'Dasturlash Olympiadasi',
    type: 'olympiad',
    level: 'Respublika',
    date: '10-12 mart, 2026',
    location: 'Toshkent',
    medals: { gold: 3, silver: 2, bronze: 1 },
    winners: ['Jahongir Sobirov', 'Samir Valiyev', 'Bekzod Qodirov', 'Aziz Qodirov', 'Nilufar Ahmedova', 'Bahodir Yusupov'],
    subject: 'Informatika'
  },
  {
    id: 10,
    title: 'Ingliz tili Lingua Cup',
    type: 'olympiad',
    level: 'Respublika',
    date: '1-3 mart, 2026',
    location: 'Toshkent',
    medals: { gold: 2, silver: 3, bronze: 2 },
    winners: ['Bobur Aliyev', 'Laylo Islamova', 'Aziz Karimov', 'Malika Yusupova', 'Jahongir Sobirov', 'Gulnora Karimova', 'Dilshod Rahimov'],
    subject: 'Ingliz tili'
  },
  {
    id: 11,
    title: 'Tarix fani Olympiadasi',
    type: 'olympiad',
    level: 'Respublika',
    date: '15-17 fevral, 2026',
    location: 'Toshkent',
    medals: { gold: 1, silver: 2, bronze: 2 },
    winners: ['Gulnora Karimova', 'Rustam Ahmedov', 'Bahodir Yusupov', 'Laylo Islamova', 'Sarvar Aliyev'],
    subject: 'Tarix'
  },
  {
    id: 12,
    title: 'Geografiya Bowl',
    type: 'olympiad',
    level: 'Viloyat',
    date: '20-22 yanvar, 2026',
    location: 'Toshkent viloyati',
    medals: { gold: 2, silver: 1, bronze: 1 },
    winners: ['Samir Valiyev', 'Kamola Saidova', 'Bekzod Qodirov', 'Ulugbek Kholmatov'],
    subject: 'Geografiya'
  }
]

const achievementTypes = [
  { value: 'all', label: 'Hammasi', icon: Trophy },
  { value: 'olympiad', label: 'Olimpiadalar', icon: Medal },
  { value: 'certificate', label: 'Sertifikatlar', icon: Award },
  { value: 'sport', label: 'Sport', icon: Star },
  { value: 'tech', label: 'Texnika', icon: Target },
]

const achievementLevels = [
  { value: 'all', label: 'Barcha darajalar' },
  { value: 'Xalqaro', label: 'Xalqaro' },
  { value: 'Respublika', label: 'Respublika' },
  { value: 'Viloyat', label: 'Viloyat' },
]

export default function AchievementsPage() {
  const [activeType, setActiveType] = useState('all')
  const [activeLevel, setActiveLevel] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAchievements = achievements.filter(achievement => {
    const typeMatch = activeType === 'all' || achievement.type === activeType
    const levelMatch = activeLevel === 'all' || achievement.level === activeLevel
    const searchMatch = achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        achievement.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        achievement.winners.some(w => w.toLowerCase().includes(searchQuery.toLowerCase()))
    return typeMatch && levelMatch && searchMatch
  })

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Maktab <span className="gradient-text">Yutuqlari</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            DOSOV maktabining barcha muvaffaqiyatlari - o'quvchilar va o'qituvchilar yutuqlari
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="glass rounded-2xl p-5 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold gradient-text">{stats.total}</p>
            <p className="text-xs text-gray-500">Jami yutuqlar</p>
          </div>
          <div className="glass rounded-2xl p-5 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-3">
              <Medal className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-yellow-500">{stats.gold}</p>
            <p className="text-xs text-gray-500">Oltin</p>
          </div>
          <div className="glass rounded-2xl p-5 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center mx-auto mb-3">
              <Medal className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-400">{stats.silver}</p>
            <p className="text-xs text-gray-500">Kumush</p>
          </div>
          <div className="glass rounded-2xl p-5 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center mx-auto mb-3">
              <Medal className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-orange-600">{stats.bronze}</p>
            <p className="text-xs text-gray-500">Bronze</p>
          </div>
          <div className="glass rounded-2xl p-5 text-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-2xl font-bold gradient-text">{stats.students}</p>
            <p className="text-xs text-gray-500">G'oliblar</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-4 mb-8"
        >
          <div className="glass rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold">{stats.international}</p>
              <p className="text-xs text-gray-500">Xalqaro</p>
            </div>
          </div>
          <div className="glass rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold">{stats.republic}</p>
              <p className="text-xs text-gray-500">Respublika</p>
            </div>
          </div>
          <div className="glass rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold">{stats.region}</p>
              <p className="text-xs text-gray-500">Viloyat</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Yutuqni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide"
        >
          {achievementTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setActiveType(type.value)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeType === type.value
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  : 'glass hover:bg-amber-500/10'
              }`}
            >
              <type.icon className="w-4 h-4" />
              {type.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide"
        >
          {achievementLevels.map((level) => (
            <button
              key={level.value}
              onClick={() => setActiveLevel(level.value)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap text-sm transition-all ${
                activeLevel === level.value
                  ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                  : 'glass hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {level.label}
            </button>
          ))}
        </motion.div>

        <div className="space-y-4">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-3xl p-6 hover-lift"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    achievement.level === 'Xalqaro' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                    achievement.level === 'Respublika' ? 'bg-gradient-to-br from-primary to-blue-500' :
                    'bg-gradient-to-br from-green-500 to-emerald-500'
                  }`}>
                    {achievement.type === 'olympiad' && <Trophy className="w-8 h-8 text-white" />}
                    {achievement.type === 'certificate' && <Award className="w-8 h-8 text-white" />}
                    {achievement.type === 'sport' && <Star className="w-8 h-8 text-white" />}
                    {achievement.type === 'tech' && <Target className="w-8 h-8 text-white" />}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      achievement.level === 'Xalqaro' ? 'bg-purple-500' :
                      achievement.level === 'Respublika' ? 'bg-primary' : 'bg-green-500'
                    } text-white`}>
                      {achievement.level}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs bg-gray-200 dark:bg-gray-700">
                      {achievement.type === 'olympiad' ? 'Olimpiada' :
                       achievement.type === 'certificate' ? 'Sertifikat' :
                       achievement.type === 'sport' ? 'Sport' : 'Texnika'}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {achievement.subject}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {achievement.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {achievement.location}
                    </span>
                  </div>

                  {achievement.type !== 'certificate' && (
                    <div className="flex gap-3 mb-4">
                      {achievement.medals.gold > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 rounded-lg">
                          <Medal className="w-4 h-4 text-yellow-500" />
                          <span className="font-bold text-yellow-500">{achievement.medals.gold}</span>
                        </div>
                      )}
                      {achievement.medals.silver > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-gray-400/20 rounded-lg">
                          <Medal className="w-4 h-4 text-gray-400" />
                          <span className="font-bold text-gray-400">{achievement.medals.silver}</span>
                        </div>
                      )}
                      {achievement.medals.bronze > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 rounded-lg">
                          <Medal className="w-4 h-4 text-orange-500" />
                          <span className="font-bold text-orange-500">{achievement.medals.bronze}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-500 mb-2">G'oliblar:</p>
                    <div className="flex flex-wrap gap-2">
                      {achievement.winners.map((winner, i) => (
                        <span key={i} className="px-3 py-1 bg-primary/10 rounded-full text-sm">
                          {winner}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Hech qanday yutuq topilmadi</p>
          </motion.div>
        )}
      </div>
    </main>
  )
}

function Globe(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> }
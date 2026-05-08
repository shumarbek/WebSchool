'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Award, Users, Building2, GraduationCap, BookOpen, Trophy, ChevronDown, ChevronUp, Star, MapPin } from 'lucide-react'

const schoolInfo = {
  founded: 2010,
  name: 'DOSOV',
  fullName: 'Davlat O\'rta Ta\'lim Maktabi',
  location: 'Toshkent shahri, Yunusobod tumani',
  firstDirector: 'Abdulloh Soliev',
  firstStudents: 150,
  firstTeachers: 12
}

const directors = [
  {
    id: 1,
    name: 'Abdulloh Soliev',
    period: '2010-2015',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    achievements: ['Maktab asoschisi', 'Birinchi direktor', 'Respublika ta\'lim mukofoti sohibi'],
    description: 'Maktabni asos qilgan va birinchi 5 yilda mustahkam poydevor qo\'ygan.'
  },
  {
    id: 2,
    name: 'Nilufar Raximberdiyeva',
    period: '2015-2019',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    achievements: ['Xalqaro aloqalar o\'rnatdi', 'Ingliz tili markazini ochdi', 'O\'quvchilar sonini oshirdi'],
    description: 'Maktabni xalqaro maydonga olib chiqdi va ingliz tili bo\'yicha maxsus dastur joriy etdi.'
  },
  {
    id: 3,
    name: 'Bahodir Qayumov',
    period: '2019-2023',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    achievements: ['Raqamlashtirish dasturi', 'Yangi bino qurdi', 'Sport kompleksini ochdi'],
    description: 'Maktabni zamonaviy texnologiyalar bilan jihozladi va qurilish ishlarini olib bordi.'
  },
  {
    id: 4,
    name: 'Rustam Ahmedov',
    period: '2023-h.z.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    achievements: ['Smart Education tizimi', 'AI o\'quv platformasi', 'Xalqaro olimpiada g\'oliblari'],
    description: 'Hozirgi direktor - innovatsiyalar va zamonaviy ta\'lim texnologiyalarini rivojlantirmoqda.'
  }
]

const timeline = [
  {
    year: 2010,
    title: 'Maktab asosiy',
    description: 'DOSOV maktabi rasman ochildi. 150 ta o\'quvchi va 12 ta o\'qituvchi bilan faoliyat boshladi.',
    icon: Building2,
    achievements: ['Birinchi o\'quvchilar qabul qilindi', 'Boshlang\'ich sinflar ish boshladi']
  },
  {
    year: 2011,
    title: 'Birinchi yutuqlar',
    description: 'Maktab o\'quvchilari birinchi marta respublika olimpiadalarida ishtirok etdi.',
    icon: Trophy,
    achievements: ['2 ta oltin medal', '5 ta bronze medal']
  },
  {
    year: 2012,
    title: 'Ingliz tili markazi',
    description: 'Ingliz tili o\'qitish markazi ochildi va Cambridge dasturi joriy etildi.',
    icon: BookOpen,
    achievements: ['Cambridge Sertifikati', 'Xalqaro imtihon markazi']
  },
  {
    year: 2013,
    title: 'Sport rivoji',
    description: 'Voleybol va basketbol bo\'yicha sport sektsiyalari ochildi.',
    icon: Award,
    achievements: ['Viloyat chempioni', 'Respublika musobaqasi g\'olibi']
  },
  {
    year: 2014,
    title: 'Xalqaro aloqalar',
    description: 'Turkiya va Rossiya maktablari bilan hamkorlik o\'rnatildi.',
    icon: Globe,
    achievements: ['Xalqaro almashuv dasturi', 'Qardosh maktablar tarmog\'i']
  },
  {
    year: 2015,
    title: 'Direktor almashuvi',
    description: 'Yangi direktor Nilufar Raximberdiyeva lavozimga tayinlandi.',
    icon: Users,
    achievements: ['Pedagogik innovatsiyalar', 'Xalqaro loyihalar']
  },
  {
    year: 2016,
    title: 'Xalqaro olimpiada',
    description: 'Maktab birinchi marta xalqaro olimpiadada ishtirok etdi.',
    icon: Trophy,
    achievements: ['Matematika olimpiadasi g\'olibi', 'Fizika bronze']
  },
  {
    year: 2017,
    title: 'Kutubxona modernizatsiyasi',
    description: 'Zamonaviy elektron kutubxona tizimi joriy etildi.',
    icon: BookOpen,
    achievements: ['10,000+ kitob', 'Elektron resurslar']
  },
  {
    year: 2018,
    title: 'Informatika rivoji',
    description: 'Robototexnika va dasturlash klubi ochildi.',
    icon: Award,
    achievements: ['Robototexnika chempionati', 'Dasturlash olimpiadasi']
  },
  {
    year: 2019,
    title: 'Yangi bino',
    description: 'Ikkinchi o\'quv binosi qurildi va foydalanishga topshirildi.',
    icon: Building2,
    achievements: ['50 yangi xona', '3 ta laboratoriya']
  },
  {
    year: 2020,
    title: 'Pandemiya va onlayn ta\'lim',
    description: 'COVID-19 pandemiyasi tufayli onlayn ta\'lim tizimiga o\'tildi.',
    icon: Globe,
    achievements: ['Onlayn platforma', 'Zoon o\'qitish tizimi']
  },
  {
    year: 2021,
    title: 'Raqamli transformatsiya',
    description: 'To\'liq raqamlashtirish va smart ta\'lim tizimi joriy etildi.',
    icon: Star,
    achievements: ['Smart class', 'AI diagnostika']
  },
  {
    year: 2022,
    title: 'Sport kompleks',
    description: 'Yangi sport kompleksi ochildi.',
    icon: Award,
    achievements: ['Basementbol maydoni', 'Voleybol zali']
  },
  {
    year: 2023,
    title: 'Xalqaro muvaffaqiyatlar',
    description: 'Maktab o\'quvchilari xalqaro olimpiadalarda 10+ medal qo\'lga kiritdi.',
    icon: Trophy,
    achievements: ['3 oltin, 4 kumush, 3 bronze']
  },
  {
    year: 2024,
    title: 'Smart Education 2.0',
    description: 'Yangi avlod ta\'lim platformasi ishga tushirildi.',
    icon: Star,
    achievements: ['AI yordamchi', 'Shaxsiy o\'quv reja']
  },
  {
    year: 2025,
    title: 'Xalqaro akkreditatsiya',
    description: 'Maktab xalqaro ta\'lim akkreditatsiyasini oldi.',
    icon: Award,
    achievements: ['International Baccalaureate', 'Cambridge Partner School']
  },
  {
    year: 2026,
    title: 'Zamonaviy ekotizim',
    description: 'DOSOV to\'liq smart ta\'lim ekotizimiga aylandi.',
    icon: Building2,
    achievements: ['5000+ o\'quvchi', '150+ hodim', '300+ yutuq']
  }
]

function Globe(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> }

const milestones = [
  { year: '2010', title: 'Asos solindi', count: 1 },
  { year: '2015', title: 'Xalqaro aloqa', count: 2 },
  { year: '2019', title: 'Yangi bino', count: 3 },
  { year: '2021', title: 'Raqamlashtirish', count: 4 },
  { year: '2025', title: 'Akkreditatsiya', count: 5 },
]

export default function HistoryPage() {
  const [expandedYear, setExpandedYear] = useState(null)

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Maktab <span className="gradient-text">Tarixi</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            DOSOV maktabining {schoolInfo.founded}-yildan bugungacha bo'lgan muvaffaqiyatli yo'li
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-8 mb-12"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold gradient-text">{schoolInfo.founded}</p>
              <p className="text-sm text-gray-500">Asos yili</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold gradient-text">5000+</p>
              <p className="text-sm text-gray-500">O'quvchilar</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold gradient-text">2</p>
              <p className="text-sm text-gray-500">Binolar</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <p className="text-3xl font-bold gradient-text">300+</p>
              <p className="text-sm text-gray-500">Yutuqlar</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-primary" />
            Maktab Direktorlari
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {directors.map((director, index) => (
              <motion.div
                key={director.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-3xl overflow-hidden hover-lift"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={director.image}
                    alt={director.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-medium">
                      {director.period}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1">{director.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{director.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {director.achievements.map((ach, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/10 rounded-lg text-xs text-primary">
                        {ach}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Calendar className="w-7 h-7 text-primary" />
            Tarix Timeline
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent-purple to-accent-cyan hidden md:block" />

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex flex-col md:flex-row items-center gap-4 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div 
                      className="glass rounded-2xl p-5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                      onClick={() => setExpandedYear(expandedYear === item.year ? null : item.year)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${index % 2 === 0 ? 'from-primary to-accent-purple' : 'from-accent-purple to-accent-cyan'} flex items-center justify-center`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">{item.year}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                      
                      {expandedYear === item.year && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
                        >
                          {item.achievements.map((ach, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <span className="w-2 h-2 rounded-full bg-primary" />
                              <span>{ach}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                        {expandedYear === item.year ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        Batafsil
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex w-16 items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-white font-bold text-sm"
                    >
                      {item.year.toString().slice(-2)}
                    </motion.div>
                  </div>

                  <div className="flex-1 md:hidden">
                    <div className="glass rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-2xl font-bold gradient-text">{item.year}</span>
                      </div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-3xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Star className="w-7 h-7 text-primary" />
            Muhim Voqealar
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {milestones.map((m, index) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-dark-50"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{m.count}</span>
                </div>
                <p className="text-lg font-bold mb-1">{m.year}</p>
                <p className="text-sm text-gray-500">{m.title}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass rounded-3xl p-8"
        >
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center flex-shrink-0">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Manzil va Bog'lanish</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{schoolInfo.location}</p>
              <p className="text-sm text-gray-500">Tel: +998 90 000-00-00 | Email: info@dosov.uz</p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
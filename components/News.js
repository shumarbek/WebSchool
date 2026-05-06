'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, Eye, Heart, ArrowRight, Filter } from 'lucide-react'

const categories = ['Hammasi', 'Yangilik', "E'lon", 'Tadbirlar', 'Sport', 'Ilmiy']

const news = [
  {
    id: 1,
    title: "Maktabimiz o'quvchilari xalqaro olimpiadada g'olib bo'ldi",
    category: 'Ilmiy',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    date: '5 may, 2026',
    views: 1250,
    likes: 89,
    excerpt: 'Matematika va fizika bo\'yicha xalqaro olimpiadada maktabimiz o\'quvchilari 3 ta oltin medal qo\'lga kiritdi...'
  },
  {
    id: 2,
    title: 'Yangi sport zali ochildi',
    category: 'Sport',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    date: '3 may, 2026',
    views: 2340,
    likes: 156,
    excerpt: 'Zamonaviy jihozlangan yangi sport zali o\'quvchilar uchun ochiq. Endi maktabimizda professional sport...'
  },
  {
    id: 3,
    title: "Qishki oraliq dawiri boshlandi",
    category: "E'lon",
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094aec?w=800',
    date: '1 may, 2026',
    views: 3450,
    likes: 234,
    excerpt: 'Qishki oraliq ta\'tili boshlandi. Barcha o\'quvchilarga dam olish va ma\'naviyatni mustahkamlashni tavsiya qilamiz...'
  },
  {
    id: 4,
    title: 'Robototexnika bo\'yicha musobaqa g\'oliblari',
    category: 'Tadbirlar',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    date: '28 aprel, 2026',
    views: 1890,
    likes: 123,
    excerpt: 'Respublika robototexnika musobaqasida maktabimiz jamoasi birinchi o\'rinni egalladi...'
  },
  {
    id: 5,
    title: "Maktabda 'Open Day' tadbiri",
    category: 'Tadbirlar',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    date: '25 aprel, 2026',
    views: 2100,
    likes: 178,
    excerpt: 'Har yili bo\'lib o\'tadigan Open Day tadbirida maktabimizning imkoniyatlari...'
  },
  {
    id: 6,
    title: 'Ingliz tili bo\'yicha sertifikatlash',
    category: 'Yangilik',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
    date: '22 aprel, 2026',
    views: 980,
    likes: 67,
    excerpt: 'O\'quvchilarimiz ingliz tili bo\'yicha Cambridge sertifikati uchun imtihon topshirdi...'
  }
]

export default function News() {
  const [activeCategory, setActiveCategory] = useState('Hammasi')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNews = news.filter(item => {
    const categoryMatch = activeCategory === 'Hammasi' || item.category === activeCategory
    const searchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  return (
    <section id="news" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            So'nggi <span className="gradient-text">Yangiliklar</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Maktabimizdagi eng so'nggi voqealar, tadbirlar va muvaffaqiyatlar
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-4 mb-12"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Yangiliklarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                    : 'glass hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group glass rounded-3xl overflow-hidden hover-lift"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {item.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {item.likes}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {item.excerpt}
                </p>

                <button className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  Batafsil
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
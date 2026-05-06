'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, BookOpen, Download, Eye, Bookmark, Star, Grid, List, Clock, Users } from 'lucide-react'

const categories = ['Hammasi', 'Darsliklar', 'Adabiyot', 'Ilmiy', 'Badiiy', 'Referat']

const books = [
  {
    id: 1,
    title: 'Algebra va analiz asoslari',
    author: 'A. Qodirov',
    category: 'Darsliklar',
    pages: 450,
    views: 3250,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400',
    year: 2024
  },
  {
    id: 2,
    title: 'Fizika: Nazariy asoslar',
    author: 'M. Yusupova',
    category: 'Darsliklar',
    pages: 380,
    views: 2890,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    year: 2024
  },
  {
    id: 3,
    title: 'Ingliz tili: Complete Course',
    author: 'B. Aliyev',
    category: 'Darsliklar',
    pages: 520,
    views: 4120,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400',
    year: 2023
  },
  {
    id: 4,
    title: 'Kimyo: Organik va anorganik',
    author: 'N. Ahmedova',
    category: 'Darsliklar',
    pages: 400,
    views: 1980,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
    year: 2024
  },
  {
    id: 5,
    title: 'Informatika asoslari',
    author: 'J. Sobirov',
    category: 'Darsliklar',
    pages: 350,
    views: 3560,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
    year: 2024
  },
  {
    id: 6,
    title: 'O\'zbekiston tarixi',
    author: 'G. Karimova',
    category: 'Darsliklar',
    pages: 480,
    views: 2250,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400',
    year: 2023
  }
]

export default function Library() {
  const [activeCategory, setActiveCategory] = useState('Hammasi')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  const filteredBooks = books.filter(book => {
    const categoryMatch = activeCategory === 'Hammasi' || book.category === activeCategory
    const searchMatch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  return (
    <section id="library" className="py-20 bg-gray-50 dark:bg-dark-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Onlayn <span className="gradient-text">Kutubxona</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Zamonaviy e-kitoblar va resurslar kutubxonasi
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
              placeholder="Kitob yoki muallifni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary text-white' : 'glass hover:bg-gray-100'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary text-white' : 'glass hover:bg-gray-100'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  : 'glass hover:bg-amber-500/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass rounded-3xl overflow-hidden hover-lift group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
                      <Bookmark className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-600 text-xs">
                      {book.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {book.rating}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-1 line-clamp-1">{book.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{book.author}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {book.pages} bet
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {book.views}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white text-sm font-medium"
                    >
                      O'qish
                    </motion.button>
                    <button className="p-2 rounded-xl glass hover:bg-primary/10">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBooks.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-2xl p-4 flex gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-24 h-32 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-600 text-xs">
                          {book.category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {book.rating}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-1">{book.title}</h3>
                      <p className="text-sm text-gray-500">{book.author}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-xl glass hover:bg-primary/10">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-xl glass hover:bg-primary/10">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-xl glass hover:bg-primary/10">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {book.pages} bet
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {book.views} ko'rish
                    </span>
                    <span>{book.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
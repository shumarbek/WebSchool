'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, BookOpen, Download, Eye, FolderOpen, FileText, 
  Users, Calendar, ChevronRight, BookMarked, GraduationCap,
  Scale, Shield, ClipboardList
} from 'lucide-react'

const librarySections = [
  { value: 'textbooks', label: 'Darsliklar', icon: GraduationCap },
  { value: 'fiction', label: 'Badiy adabiyot', icon: BookMarked },
  { value: 'internal', label: 'Ichki tizim', icon: Scale },
]

const textbooks = [
  { id: 1, title: 'Algebra', author: 'A. Qodirov', grade: '9-sinf', year: 2024, pages: 320, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400' },
  { id: 2, title: 'Algebra', author: 'A. Qodirov', grade: '10-sinf', year: 2024, pages: 380, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400' },
  { id: 3, title: 'Algebra', author: 'A. Qodirov', grade: '11-sinf', year: 2023, pages: 420, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400' },
  { id: 4, title: 'Geometriya', author: 'B. Karimov', grade: '9-sinf', year: 2024, pages: 280, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400' },
  { id: 5, title: 'Geometriya', author: 'B. Karimov', grade: '10-sinf', year: 2024, pages: 310, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400' },
  { id: 6, title: 'Fizika', author: 'M. Yusupova', grade: '9-sinf', year: 2024, pages: 240, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400' },
  { id: 7, title: 'Fizika', author: 'M. Yusupova', grade: '10-sinf', year: 2024, pages: 290, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400' },
  { id: 8, title: 'Fizika', author: 'M. Yusupova', grade: '11-sinf', year: 2023, pages: 340, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400' },
  { id: 9, title: 'Kimyo', author: 'N. Ahmedova', grade: '9-sinf', year: 2024, pages: 200, image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400' },
  { id: 10, title: 'Kimyo', author: 'N. Ahmedova', grade: '10-sinf', year: 2024, pages: 250, image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400' },
  { id: 11, title: 'Biologiya', author: 'K. Saidova', grade: '9-sinf', year: 2024, pages: 220, image: 'https://images.unsplash.com/photo-1530026405186-ed1f139733f8?w=400' },
  { id: 12, title: 'Ingliz tili', author: 'B. Aliyev', grade: '9-sinf', year: 2024, pages: 180, image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400' },
]

const fiction = [
  { id: 1, title: 'O\'zbek adabiyoti antologiyasi', author: 'Turli mualliflar', year: 2023, pages: 650, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400' },
  { id: 2, title: 'Alisher Navoiy asarlari', author: 'Alisher Navoiy', year: 2022, pages: 480, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400' },
  { id: 3, title: 'Abdulla Qodiriy - O\'tkan kunlar', author: 'Abdulla Qodiriy', year: 2023, pages: 320, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400' },
  { id: 4, title: 'Pirimqul Qodirov - Ular', author: 'Pirimqul Qodirov', year: 2024, pages: 280, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400' },
  { id: 5, title: 'Said Ahmad - Farg\'ona tong so\'lig\'inda', author: 'Said Ahmad', year: 2023, pages: 240, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400' },
  { id: 6, title: 'Shakespeare - Hamlet', author: 'William Shakespeare', year: 2022, pages: 180, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400' },
  { id: 7, title: 'Tolstoy - Urush va tinchlik', author: 'Lev Tolstoy', year: 2021, pages: 890, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400' },
  { id: 8, title: 'Dostoevskiy - Jinoyat va jazo', author: 'F. Dostoevskiy', year: 2023, pages: 520, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400' },
  { id: 9, title: 'Goethe - Faust', author: 'J.W. Goethe', year: 2022, pages: 210, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400' },
  { id: 10, title: 'Xamse', author: 'Alisher Navoiy', year: 2024, pages: 380, image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400' },
]

const internalDocs = [
  { id: 1, title: 'Maktab nizomi', type: 'Nizom', date: '2024-yil', pages: 45, image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400' },
  { id: 2, title: 'O\'quvchilar qoidalari', type: 'Qoidalar', date: '2024-yil', pages: 32, image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400' },
  { id: 3, title: 'Imtihon qoidalari', type: 'Qoidalar', date: '2024-yil', pages: 28, image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400' },
  { id: 4, title: 'Notebook qoidalari', type: 'Qoidalar', date: '2024-yil', pages: 15, image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400' },
  { id: 5, title: 'Xavfsizlik qoidalari', type: 'Qoidalar', date: '2024-yil', pages: 22, image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400' },
  { id: 6, title: 'Maktab kodeksi', type: 'Kodeks', date: '2024-yil', pages: 56, image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400' },
  { id: 7, title: 'Ota-onalar uchun qo\'llanma', type: 'Qo\'llanma', date: '2024-yil', pages: 38, image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400' },
  { id: 8, title: 'To\'garaklar nizomi', type: 'Nizom', date: '2024-yil', pages: 24, image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400' },
]

const grades = ['Hammasi', '9-sinf', '10-sinf', '11-sinf']

export default function LibraryPage() {
  const [activeSection, setActiveSection] = useState('textbooks')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('Hammasi')

  const getFilteredItems = () => {
    let items = []
    
    switch (activeSection) {
      case 'textbooks':
        items = textbooks
        if (selectedGrade !== 'Hammasi') {
          items = items.filter(item => item.grade === selectedGrade)
        }
        break
      case 'fiction':
        items = fiction
        break
      case 'internal':
        items = internalDocs
        break
    }

    if (searchQuery) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    return items
  }

  const filteredItems = getFilteredItems()

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Kutubxona</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            DOSOV maktabining elektron kutubxonasi - darsliklar, adabiyotlar va ichki hujjatlar
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide"
        >
          {librarySections.map((section) => (
            <button
              key={section.value}
              onClick={() => {
                setActiveSection(section.value)
                setSearchQuery('')
                setSelectedGrade('Hammasi')
              }}
              className={`flex items-center gap-2 px-6 py-4 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeSection === section.value
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                  : 'glass hover:bg-amber-500/10'
              }`}
            >
              <section.icon className="w-5 h-5" />
              {section.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={activeSection === 'textbooks' ? 'Darslik qidirish...' : 
                         activeSection === 'fiction' ? 'Kitob yoki muallif qidirish...' : 
                         'Hujjat qidirish...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {activeSection === 'textbooks' && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {grades.map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                    selectedGrade === grade
                      ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                      : 'glass hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {activeSection === 'textbooks' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Jami darsliklar: {filteredItems.length}</span>
              {selectedGrade !== 'Hammasi' && (
                <>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-primary">{selectedGrade}</span>
                </>
              )}
            </div>
          </motion.div>
        )}

        {activeSection === 'fiction' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <BookMarked className="w-4 h-4" />
              <span>Jami kitoblar: {filteredItems.length}</span>
            </div>
          </motion.div>
        )}

        {activeSection === 'internal' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Scale className="w-4 h-4" />
              <span>Jami hujjatlar: {filteredItems.length}</span>
            </div>
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass rounded-3xl overflow-hidden hover-lift group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-amber-500/90 text-white text-xs font-medium">
                    PDF
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-lg line-clamp-2">{item.title}</h3>
                </div>
              </div>

              <div className="p-4">
                {activeSection === 'textbooks' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{item.grade}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{item.year}-yil</span>
                    </div>
                  </div>
                )}

                {activeSection === 'fiction' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 line-clamp-1">{item.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{item.year}-yil</span>
                    </div>
                  </div>
                )}

                {activeSection === 'internal' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FolderOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{item.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">{item.date}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {item.pages} bet
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Yuklash
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Hech qanday materiallar topilmadi</p>
          </motion.div>
        )}
      </div>
    </main>
  )
}
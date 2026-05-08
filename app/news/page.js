'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, Search, Filter, Eye, Heart, Share2, Clock, MapPin,
  MessageCircle, ChevronLeft, ChevronRight, X, ArrowLeft, 
  Bell, Megaphone, FileText, RefreshCw, AlertCircle, Image
} from 'lucide-react'

const newsCategories = [
  { value: 'all', label: 'Hammasi', icon: FileText },
  { value: 'elon', label: 'E\'lonlar', icon: Megaphone },
  { value: 'article', label: 'Maqolalar', icon: FileText },
  { value: 'change', label: 'O\'zgarishlar', icon: RefreshCw },
  { value: 'event', label: 'Tadbirlar', icon: Bell },
]

const news = [
  {
    id: 1,
    title: 'Yangi o\'quv yili boshlanishi haqida',
    type: 'elon',
    category: 'E\'lon',
    date: '8 may, 2026',
    readTime: '3 daqiqa',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094aec?w=800',
    views: 3450,
    excerpt: 'Hurmatli o\'quvchilar va ota-onalar! 2026-2027 o\'quv yili 1-sentabrdan boshlanadi. Barcha zaruriy hujjatlar va qoidalar haqida batafsil ma\'lumot...',
    content: 'Hurmatli o\'quvchilar va ota-onalar! 2026-2027 o\'quv yili 1-sentabrdan boshlanadi. Barcha zaruriy hujjatlar va qoidalar haqida batafsil ma\'lumot berilmoqda. Yangi o\'quv yilida yangi dastur va metodikalar joriy etiladi.',
    author: 'Admin',
    tags: ['o\'quv yili', 'boshlanish', 'jadval']
  },
  {
    id: 2,
    title: 'Maktabimiz o\'quvchilari robototexnika musobaqasida g\'olib bo\'ldi',
    type: 'article',
    category: 'Maqola',
    date: '6 may, 2026',
    readTime: '5 daqiqa',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    views: 2150,
    excerpt: 'DOSOV maktabi o\'quvchilari Toshkent shahrida bo\'lib o\'tgan robototexnika musobaqasida birinchi o\'rinni qo\'lga kiritdi. Musobaqada 30 dan ortiq maktab ishtirok etdi...',
    content: 'DOSOV maktabi o\'quvchilari Toshkent shahrida bo\'lib o\'tgan robototexnika musobaqasida birinchi o\'rinni qo\'lga kiritdi. Musobaqada 30 dan ortiq maktab ishtirok etdi va ular orasida bizning o\'quvchilar eng yuqori natijani ko\'rsatdilar.',
    author: 'Jahongir Sobirov',
    tags: ['robototexnika', 'g\'olib', 'musobaqa']
  },
  {
    id: 3,
    title: 'Dars jadvali o\'zgarishi',
    type: 'change',
    category: 'O\'zgarishlar',
    date: '5 may, 2026',
    readTime: '2 daqiqa',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094aec?w=800',
    views: 1890,
    excerpt: 'E\'tiboringiz uchun! 9-may kuni 10-A va 10-B sinflar uchun dars jadvalida o\'zgarishlar bo\'ladi. Matematika o\'rniga Fizika darsi o\'tkaziladi...',
    content: 'E\'tiboringiz uchun! 9-may kuni 10-A va 10-B sinflar uchun dars jadvalida o\'zgarishlar bo\'ladi. Matematika o\'rniga Fizika darsi o\'tkaziladi. Barcha o\'quvchilar va ota-onalar diqqatiga!',
    author: 'Admin',
    tags: ['jadval', 'o\'zgarish', '10-sinf']
  },
  {
    id: 4,
    title: 'Yangi sport zali ochildi',
    type: 'article',
    category: 'Maqola',
    date: '3 may, 2026',
    readTime: '4 daqiqa',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    views: 2340,
    excerpt: 'DOSOV maktabida zamonaviy sport zali ochildi. Yangi zali 200 kishiga mo\'ljallangan bo\'lib, voleybol, basketbol va futsal bo\'yicha mashg\'ulotlar o\'tkaziladi...',
    content: 'DOSOV maktabida zamonaviy sport zali ochildi. Yangi zali 200 kishiga mo\'ljallangan bo\'lib, voleybol, basketbol va futsal bo\'yicha mashg\'ulotlar o\'tkaziladi. Sport zali yangi jihozlar bilan to\'liq jihozlangan.',
    author: 'Bekzod Qodirov',
    tags: ['sport', 'yangi', 'zali']
  },
  {
    id: 5,
    title: 'Yozgi oraliq ta\'tili jadvali',
    type: 'elon',
    category: 'E\'lon',
    date: '1 may, 2026',
    readTime: '3 daqiqa',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    views: 4560,
    excerpt: 'Maktabimizda yozgi oraliq ta\'tili 15-iyundan 31-iyulgacha davom etadi. Barcha o\'quvchilar uchun dam olish vaqtini to\'g\'ri foydalanishni tavsiya qilamiz...',
    content: 'Maktabimizda yozgi oraliq ta\'tili 15-iyundan 31-iyulgacha davom etadi. Barcha o\'quvchilar uchun dam olish vaqtini to\'g\'ri foydalanishni tavsiya qilamiz. Ta\'til davrida maktab qurilishi va ta\'mirlash ishlari olib boriladi.',
    author: 'Admin',
    tags: ['ta\'til', 'yoz', 'jadval']
  },
  {
    id: 6,
    title: 'Fan olimpiadalari yakunlandi',
    type: 'event',
    category: 'Tadbirlar',
    date: '28 aprel, 2026',
    readTime: '6 daqiqa',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    views: 1670,
    excerpt: 'Maktabimizda o\'tkazilgan fan olimpiadalari muvaffaqiyatli yakunlandi. Jami 45 nafar o\'quvchi ishtirok etdi va ular orasida 12 ta g\'olib aniqlandi...',
    content: 'Maktabimizda o\'tkazilgan fan olimpiadalari muvaffaqiyatli yakunlandi. Jami 45 nafar o\'quvchi ishtirok etdi va ular orasida 12 ta g\'olib aniqlandi. G\'oliblarga diplom va sovg\'alar topshirildi.',
    author: 'Aziz Qodirov',
    tags: ['olimpiada', 'fan', 'g\'olib']
  },
  {
    id: 7,
    title: 'Ingliz tili to\'garagi natijalari',
    type: 'article',
    category: 'Maqola',
    date: '25 aprel, 2026',
    readTime: '4 daqiqa',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
    views: 1280,
    excerpt: 'Ingliz tili to\'garagi a\'zolari bu oy Cambridge imtihonini topshirdi. Natijalar juda yaxshi - 8 nafar o\'quvchi B2 darajasini oldi...',
    content: 'Ingliz tili to\'garagi a\'zolari bu oy Cambridge imtihonini topshirdi. Natijalar juda yaxshi - 8 nafar o\'quvchi B2 darajasini oldi. Bu maktabimiz uchun katta muvaffaqiyat!',
    author: 'Bobur Aliyev',
    tags: ['ingliz tili', 'sertifikat', 'to\'garak']
  },
  {
    id: 8,
    title: 'Direktor qabul vaqtlari o\'zgartirildi',
    type: 'change',
    category: 'O\'zgarishlar',
    date: '22 aprel, 2026',
    readTime: '2 daqiqa',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
    views: 2100,
    excerpt: 'E\'tiboringizga! Direktor qabul vaqtlari quyidagicha o\'zgartirildi: Dushanba-Juma: 09:00-12:00, Shanba: 10:00-13:00. oldingi jadval bekor qilindi...',
    content: 'E\'tiboringizga! Direktor qabul vaqtlari quyidagicha o\'zgartirildi: Dushanba-Juma: 09:00-12:00, Shanba: 10:00-13:00. oldingi jadval bekor qilindi. Iltimos, kelish oldindan ro\'yxatdan o\'ting.',
    author: 'Admin',
    tags: ['direktor', 'qabul', 'o\'zgarish']
  },
  {
    id: 9,
    title: 'Open Day tadbiri',
    type: 'event',
    category: 'Tadbirlar',
    date: '20 aprel, 2026',
    readTime: '5 daqiqa',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
    views: 1890,
    excerpt: 'Har yili bo\'lib o\'tadigan Open Day tadbiri 15-may kuni bo\'lib o\'tadi. Tadbirda maktab imkoniyatlari, o\'quv dasturi va muvaffaqiyatlar namoyish qilinadi...',
    content: 'Har yili bo\'lib o\'tadigan Open Day tadbiri 15-may kuni bo\'lib o\'tadi. Tadbirda maktab imkoniyatlari, o\'quv dasturi va muvaffaqiyatlar namoyish qilinadi. Barcha qiziqqanlar taklif qilinadi.',
    author: 'Laylo Islamova',
    tags: ['open day', 'tadbir', 'tanishuv']
  },
  {
    id: 10,
    title: 'Kutubxona yangi kitoblar',
    type: 'article',
    category: 'Maqola',
    date: '18 aprel, 2026',
    readTime: '3 daqiqa',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    views: 980,
    excerpt: 'Maktab kutubxonasiga yangi kitoblar qo\'shildi. Jami 150 ta yangi kitob, shu jumladan o\'zbek adabiyoti, jahon klassikasi va ilmiy adabiyotlar...',
    content: 'Maktab kutubxonasiga yangi kitoblar qo\'shildi. Jami 150 ta yangi kitob, shu jumladan o\'zbek adabiyoti, jahon klassikasi va ilmiy adabiyotlar. Barcha o\'quvchilar kutubxonadan foydalanishlari mumkin.',
    author: 'Kamola Saidova',
    tags: ['kutubxona', 'kitob', 'yangilik']
  }
]

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNews, setSelectedNews] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredNews = news.filter(item => {
    const categoryMatch = activeCategory === 'all' || item.type === activeCategory
    const searchMatch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return categoryMatch && searchMatch
  })

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const getCategoryIcon = (type) => {
    const found = newsCategories.find(c => c.value === type)
    return found ? found.icon : FileText
  }

  return (
    <main className="min-h-screen pt-24 pb-12 bg-gray-50 dark:bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Yangiliklar</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            DOSOV maktabining so\'nggi yangiliklari, e\'lonlari va tadbirlari
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
              placeholder="Yangiliklarni qidirish..."
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
          {newsCategories.map((category) => (
            <button
              key={category.value}
              onClick={() => {
                setActiveCategory(category.value)
                setCurrentPage(1)
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeCategory === category.value
                  ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                  : 'glass hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedNews.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedNews(item)}
              className="glass rounded-3xl overflow-hidden cursor-pointer hover-lift"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.type === 'elon' ? 'bg-red-500' :
                    item.type === 'article' ? 'bg-blue-500' :
                    item.type === 'change' ? 'bg-orange-500' :
                    'bg-green-500'
                  } text-white`}>
                    {item.category}
                  </span>
                </div>
                {item.type === 'elon' && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                      <Megaphone className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {item.readTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {item.views}
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-primary/10 rounded text-xs text-primary">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center gap-2"
          >
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl glass hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl font-medium transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                    : 'glass hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl glass hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}

        {filteredNews.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Hech qanday yangilik topilmadi</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedNews(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-4 left-4 right-4 bottom-4 md:top-8 md:left-8 md:right-8 lg:top-16 lg:left-16 lg:right-16 bg-white dark:bg-dark-100 rounded-3xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="h-full overflow-y-auto">
                <div className="relative h-64 md:h-80">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedNews.type === 'elon' ? 'bg-red-500' :
                      selectedNews.type === 'article' ? 'bg-blue-500' :
                      selectedNews.type === 'change' ? 'bg-orange-500' :
                      'bg-green-500'
                    } text-white mb-2 inline-block`}>
                      {selectedNews.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedNews.title}</h2>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {selectedNews.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedNews.readTime}
                    </span>
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {selectedNews.views} ko'rish
                    </span>
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {selectedNews.author}
                    </span>
                  </div>

                  <div className="prose dark:prose-invert max-w-none mb-6">
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                      {selectedNews.content}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedNews.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 rounded-full text-sm text-primary">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                        <span>Sevimli</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>Sharh</span>
                      </button>
                    </div>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                      <Share2 className="w-5 h-5" />
                      Ulashish
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function User(props) { return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }
'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, ExternalLink, Grid, List, Search, X } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import EmptyState from '@/components/EmptyState'
import MediaLightbox from '@/components/MediaLightbox'

const categoryLabels = {
  darslik: 'Darslik',
  badiy: 'Badiiy adabiyot',
  ichki: 'Ichki tizim',
}

export default function Library() {
  const [books, setBooks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [media, setMedia] = useState(null)
  const supabase = createClient()

  useEffect(() => {
    async function loadBooks() {
      const { data } = await supabase
        .from('library_books')
        .select('*')
        .eq('is_published', true)
        .order('title', { ascending: true })
        .limit(6)

      setBooks(data || [])
      setLoading(false)
    }

    loadBooks()
  }, [])

  const filteredBooks = useMemo(() => books.filter((book) => {
    const search = searchQuery.toLowerCase()
    return book.title?.toLowerCase().includes(search) || book.author?.toLowerCase().includes(search)
  }), [books, searchQuery])

  return (
    <section id="library" className="py-20 bg-gray-50 dark:bg-dark-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Onlayn <span className="gradient-text">kutubxona</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Admin panel orqali chop etilgan kitoblar.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Kitob yoki muallifni qidirish..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setViewMode('grid')} className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary text-white' : 'glass hover:bg-gray-100'}`} title="Grid"><Grid className="w-5 h-5" /></button>
            <button onClick={() => setViewMode('list')} className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary text-white' : 'glass hover:bg-gray-100'}`} title="List"><List className="w-5 h-5" /></button>
          </div>
        </div>

        {!loading && filteredBooks.length === 0 ? (
          <EmptyState icon={BookOpen} title="Hali kitob mavjud emas" />
        ) : viewMode === 'grid' ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {(loading ? Array.from({ length: 3 }) : filteredBooks).map((book, index) => (
              <motion.div key={book?.id || index} onClick={() => book?.id && setSelected(book)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="glass rounded-3xl overflow-hidden hover-lift cursor-pointer">
                <div className="aspect-[3/4] bg-amber-500/10">
                  {book?.cover_url ? (
                    <button type="button" onClick={(e) => { e.stopPropagation(); setMedia({ type: 'image', src: book.cover_url, alt: book.title }) }} className="h-full w-full">
                      <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                    </button>
                  ) : <div className="h-full flex items-center justify-center"><BookOpen className="w-12 h-12 text-amber-500/50" /></div>}
                </div>
                <div className="p-4">
                  <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-600 text-xs">{categoryLabels[book?.category] || book?.category || '...'}</span>
                  <h3 className="text-base font-bold mt-3 mb-1 line-clamp-2">{book?.title || 'Yuklanmoqda...'}</h3>
                  <p className="text-sm text-gray-500 mb-3">{book?.author || ''}</p>
                  {book?.grade && <p className="text-sm text-gray-500">{book.grade}-sinf</p>}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {(loading ? Array.from({ length: 3 }) : filteredBooks).map((book, index) => (
              <motion.div key={book?.id || index} onClick={() => book?.id && setSelected(book)} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-4 flex gap-4 cursor-pointer">
                <div className="aspect-[3/4] w-20 rounded-xl bg-amber-500/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {book?.cover_url ? <button type="button" onClick={(e) => { e.stopPropagation(); setMedia({ type: 'image', src: book.cover_url, alt: book.title }) }} className="h-full w-full"><img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" /></button> : <BookOpen className="w-8 h-8 text-amber-500/50" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{book?.title || 'Yuklanmoqda...'}</h3>
                  <p className="text-sm text-gray-500">{book?.author || ''}</p>
                  <p className="text-sm text-gray-500 mt-2">{categoryLabels[book?.category] || book?.category || ''}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.article initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-dark-50 md:grid-cols-[260px_1fr]">
              <div className="bg-amber-500/10 p-6">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-white/50">
                  {selected.cover_url ? <button type="button" onClick={() => setMedia({ type: 'image', src: selected.cover_url, alt: selected.title })} className="h-full w-full"><img src={selected.cover_url} alt={selected.title} className="h-full w-full object-cover" /></button> : <div className="flex h-full items-center justify-center"><BookOpen className="h-14 w-14 text-amber-500/50" /></div>}
                </div>
              </div>
              <div className="relative p-6 md:p-8">
                <button onClick={() => setSelected(null)} className="absolute right-5 top-5 rounded-full bg-gray-100 p-2 dark:bg-dark-100"><X className="h-5 w-5" /></button>
                <span className="rounded-full bg-amber-500/15 px-3 py-1 text-sm font-medium text-amber-600">{categoryLabels[selected.category] || selected.category}</span>
                <h3 className="mt-4 pr-10 text-2xl font-bold">{selected.title}</h3>
                {selected.author && <p className="mt-2 text-gray-500">{selected.author}</p>}
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500">
                  {selected.grade && <span>{selected.grade}-sinf</span>}
                  {selected.publisher && <span>{selected.publisher}</span>}
                  {selected.year && <span>{selected.year}</span>}
                </div>
                <p className="mt-6 whitespace-pre-line leading-7 text-gray-700 dark:text-gray-300">{selected.description || "Tavsif hali kiritilmagan."}</p>
                {selected.view_url && (
                  <a href={selected.view_url} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent-purple px-5 py-3 font-medium text-white">
                    Kitobni ochish
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
      <MediaLightbox media={media} onClose={() => setMedia(null)} />
    </section>
  )
}

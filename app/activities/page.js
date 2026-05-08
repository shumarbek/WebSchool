'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, Search, Filter, Play, Pause, ChevronLeft, ChevronRight, 
  Award, Users, Heart, MessageCircle, Share2, X, Image, Video as VideoIcon,
  Star, MapPin, Clock, Trophy, Music, BookOpen, Volleyball, 
  HandHeart, GraduationCap, Globe, Camera
} from 'lucide-react'

const activityTypes = [
  { value: 'all', label: 'Hammasi', icon: Calendar },
  { value: 'olympiad', label: 'Olimpiadalar', icon: Trophy },
  { value: 'sport', label: 'Sport', icon: Volleyball },
  { value: 'culture', label: 'Madaniyat', icon: Music },
  { value: 'volunteer', label: 'Hashar', icon: HandHeart },
  { value: 'academic', label: 'Akademik', icon: BookOpen },
  { value: 'celebration', label: 'Bayramlar', icon: Star },
  { value: 'international', label: 'Xalqaro', icon: Globe },
]

const activities = [
  {
    id: 1,
    title: 'Xalqaro Matematika Olimpiadasi',
    type: 'olympiad',
    date: '5-7 may, 2026',
    location: 'Istanbul, Turkey',
    description: 'Maktabimiz o\'quvchilari xalqaro matematika olimpiadasida 3 oltin, 2 kumush, 1 bronze medal qo\'lga kiritdi. Jami 45 ta mamlakatdan 500+ ishtirokchi.',
    images: [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
    ],
    video: 'https://www.youtube.com/embed/example',
    participants: 6,
    achievements: ['3 Oltin', '2 Kumush', '1 Bronze'],
    likes: 245,
    comments: 32
  },
  {
    id: 2,
    title: 'Navro\'z bayrami',
    type: 'celebration',
    date: '21 mart, 2026',
    location: 'DOSOV maktabi',
    description: 'An\'anaviy Navro\'z bayrami - o\'quvchilar va o\'qituvchilar birgalikda tantanali kechki o\'tkazdi. Milliy taomlar, sozanda va raqslar.',
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    ],
    video: null,
    participants: 450,
    achievements: [],
    likes: 389,
    comments: 45
  },
  {
    id: 3,
    title: 'Yoshlar hashari',
    type: 'volunteer',
    date: '15 aprel, 2026',
    location: 'Yunusobod tumani',
    description: 'Maktab o\'quvchilari tomonidan Toshkent shahridagi qariyalar uyiga yordam vaqt o\'tkazildi. Sovg\'alar va madaniy dasturlar.',
    images: [
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
      'https://images.unsplash.com/photo-1531206715517-5c0ba140b9b8?w=800',
    ],
    video: 'https://www.youtube.com/embed/example2',
    participants: 120,
    achievements: ['50+ sovg\'a', '30+ qariya'],
    likes: 178,
    comments: 23
  },
  {
    id: 4,
    title: 'Voleybol chempionati',
    type: 'sport',
    date: '10-12 aprel, 2026',
    location: 'DOSOV sport kompleksi',
    description: 'Maktablararo voleybol chempionatida DOSOV jamoasi birinchi o\'rinni egalladi. 8 ta maktabdan 16 ta jamoa ishtirok etdi.',
    images: [
      'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800',
      'https://images.unsplash.com/photo-1592659762303-90081d34b277?w=800',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
    ],
    video: null,
    participants: 96,
    achievements: ['Birinchi o\'rin'],
    likes: 156,
    comments: 18
  },
  {
    id: 5,
    title: 'Ingliz tili kechasi',
    type: 'culture',
    date: '28 fevral, 2026',
    location: 'DOSOV auditorium',
    description: 'Ingliz tiliclubsi tomonidan tashkil etilgan ingliz tili kechasi. Pyesalar, qo\'shiq va raqs.',
    images: [
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    ],
    video: 'https://www.youtube.com/embed/example3',
    participants: 200,
    achievements: [],
    likes: 234,
    comments: 41
  },
  {
    id: 6,
    title: 'Fan olimpiadalari',
    type: 'academic',
    date: '20-25 yanvar, 2026',
    location: 'Respublika',
    description: 'Matematika, fizika, kimyo va informatika bo\'yicha respublika olimpiadalarida ishtirok.',
    images: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094aec?w=800',
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
    ],
    video: null,
    participants: 24,
    achievements: ['5 Oltin', '7 Kumush', '8 Bronze'],
    likes: 312,
    comments: 56
  },
  {
    id: 7,
    title: 'Xalqaro almashuv dasturi',
    type: 'international',
    date: '5-15 dekabr, 2025',
    location: 'Germaniya',
    description: 'Germaniya maktablari bilan almashuv dasturi. 10 o\'quvchi 10 kundan Germaniyada o\'qidi.',
    images: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    ],
    video: 'https://www.youtube.com/embed/example4',
    participants: 10,
    achievements: [],
    likes: 198,
    comments: 29
  },
  {
    id: 8,
    title: 'To\'garaklar festivali',
    type: 'celebration',
    date: '20 may, 2025',
    location: 'DOSOV maktabi',
    description: 'Barcha to\'garaklar (robototexnika, musiqa, sport, adabiyot) namoyishi va tanlovlari.',
    images: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
      'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=800',
    ],
    video: null,
    participants: 300,
    achievements: ['15 ta g\'olib'],
    likes: 267,
    comments: 38
  }
]

export default function ActivitiesPage() {
  const [activeType, setActiveType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredActivities = activities.filter(activity => {
    const typeMatch = activeType === 'all' || activity.type === activeType
    const searchMatch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    return typeMatch && searchMatch
  })

  const getTypeIcon = (type) => {
    const found = activityTypes.find(t => t.value === type)
    return found ? found.icon : Calendar
  }

  const getTypeLabel = (type) => {
    const found = activityTypes.find(t => t.value === type)
    return found ? found.label : type
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
            Maktab <span className="gradient-text">Faoliyati</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            DOSOV maktabining turli tadbirlar, bayramlar va muvaffaqiyatlar tarixi
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
              placeholder="Faoliyatni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-4 rounded-2xl glass hover:bg-gray-100 dark:hover:bg-gray-800">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide"
        >
          {activityTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => setActiveType(type.value)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeType === type.value
                  ? 'bg-gradient-to-r from-primary to-accent-purple text-white'
                  : 'glass hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <type.icon className="w-4 h-4" />
              {type.label}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedActivity(activity)}
              className="glass rounded-3xl overflow-hidden cursor-pointer hover-lift"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={activity.images[0]}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'olympiad' ? 'bg-purple-500' :
                    activity.type === 'sport' ? 'bg-green-500' :
                    activity.type === 'culture' ? 'bg-pink-500' :
                    activity.type === 'volunteer' ? 'bg-amber-500' :
                    activity.type === 'celebration' ? 'bg-red-500' :
                    'bg-blue-500'
                  } text-white`}>
                    {getTypeLabel(activity.type)}
                  </span>
                </div>
                {activity.video && (
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">{activity.title}</h3>
                  <div className="flex items-center gap-3 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {activity.date}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {activity.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {activity.participants}
                    </span>
                    <span className="flex items-center gap-1">
                      <Image className="w-4 h-4" />
                      {activity.images.length}
                    </span>
                    {activity.video && (
                      <span className="flex items-center gap-1">
                        <VideoIcon className="w-4 h-4" />
                        Video
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>{activity.likes}</span>
                  </div>
                </div>

                {activity.achievements.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2">
                      {activity.achievements.map((ach, i) => (
                        <span key={i} className="px-3 py-1 bg-amber-500/20 rounded-full text-xs text-amber-600">
                          {ach}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Hech qanday faoliyat topilmadi</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedActivity(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-4 left-4 right-4 bottom-4 md:top-8 md:left-8 md:right-8 lg:top-16 lg:left-16 lg:right-16 bg-white dark:bg-dark-100 rounded-3xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="h-full overflow-y-auto">
                <div className="relative h-64 md:h-96">
                  <img
                    src={selectedActivity.images[currentImageIndex]}
                    alt={selectedActivity.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {selectedActivity.images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + selectedActivity.images.length) % selectedActivity.images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % selectedActivity.images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex gap-2 mb-2">
                      {selectedActivity.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImageIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            i === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedActivity.type === 'olympiad' ? 'bg-purple-500' :
                      selectedActivity.type === 'sport' ? 'bg-green-500' :
                      selectedActivity.type === 'culture' ? 'bg-pink-500' :
                      selectedActivity.type === 'volunteer' ? 'bg-amber-500' :
                      selectedActivity.type === 'celebration' ? 'bg-red-500' :
                      'bg-blue-500'
                    } text-white`}>
                      {getTypeLabel(selectedActivity.type)}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{selectedActivity.title}</h2>
                  
                  <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {selectedActivity.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {selectedActivity.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {selectedActivity.participants} ishtirokchi
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">{selectedActivity.description}</p>

                  {selectedActivity.achievements.length > 0 && (
                    <div className="mb-6 p-4 rounded-2xl bg-amber-500/10">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        Yutuqlar
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedActivity.achievements.map((ach, i) => (
                          <span key={i} className="px-3 py-1 bg-amber-500/20 rounded-full text-sm text-amber-600">
                            {ach}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedActivity.video && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <VideoIcon className="w-5 h-5 text-primary" />
                        Video
                      </h4>
                      <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-dark-50">
                        <iframe
                          src={selectedActivity.video}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                        <span>{selectedActivity.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span>{selectedActivity.comments} sharh</span>
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
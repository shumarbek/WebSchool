'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Search, Navigation, Phone, Clock, User } from 'lucide-react'

const rooms = [
  { id: 1, name: '201', type: 'class', floor: 2, subject: 'Matematika', teacher: 'Aziz Qodirov', capacity: 30 },
  { id: 2, name: '305', type: 'class', floor: 3, subject: 'Fizika', teacher: 'Malika Yusupova', capacity: 28 },
  { id: 3, name: '102', type: 'class', floor: 1, subject: 'Ingliz tili', teacher: 'Bobur Aliyev', capacity: 32 },
  { id: 4, name: '401', type: 'class', floor: 4, subject: 'Tarix', teacher: 'Gulnora Karimova', capacity: 25 },
  { id: 5, name: '501', type: 'lab', floor: 5, subject: 'Informatika', teacher: 'Jahongir Sobirov', capacity: 20 },
  { id: 6, name: '302', type: 'lab', floor: 3, subject: 'Kimyo', teacher: 'Nilufar Ahmedova', capacity: 24 },
  { id: 7, name: 'Direktor', type: 'office', floor: 1, subject: 'Boshqaruv', teacher: 'Rustam Ahmedov', capacity: 0 },
  { id: 8, name: 'Kutubxona', type: 'service', floor: 2, subject: 'Kitoblar', teacher: 'Kamola Saidova', capacity: 50 },
  { id: 9, name: 'Sport zali', type: 'service', floor: 1, subject: 'Jismoniy tarbiya', teacher: 'Bekzod Qodirov', capacity: 100 },
  { id: 10, name: 'Dinning', type: 'service', floor: 1, subject: 'Ovqatlanish', teacher: '', capacity: 200 },
  { id: 11, name: 'Qutqaruv chiqish', type: 'emergency', floor: 0, subject: 'Xavfsizlik', teacher: '', capacity: 0 },
  { id: 12, name: 'Salomatlik', type: 'emergency', floor: 1, subject: 'Tibbiy yordam', teacher: 'Dr. Gulshan', capacity: 0 },
]

const floors = [
  { level: 5, label: '5-qavat' },
  { level: 4, label: '4-qavat' },
  { level: 3, label: '3-qavat' },
  { level: 2, label: '2-qavat' },
  { level: 1, label: '1-qavat' },
]

export default function Map() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [activeFloor, setActiveFloor] = useState(1)
  const [route, setRoute] = useState(null)

  const filteredRooms = rooms.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (room.teacher && room.teacher.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getRoomColor = (type) => {
    switch (type) {
      case 'class': return 'bg-primary/20 border-primary'
      case 'lab': return 'bg-accent-purple/20 border-accent-purple'
      case 'office': return 'bg-amber-500/20 border-amber-500'
      case 'service': return 'bg-accent-emerald/20 border-accent-emerald'
      case 'emergency': return 'bg-red-500/20 border-red-500'
      default: return 'bg-gray-200 border-gray-400'
    }
  }

  const getRoomIcon = (type) => {
    switch (type) {
      case 'class': return '📚'
      case 'lab': return '🔬'
      case 'office': return '🏢'
      case 'service': return '🏪'
      case 'emergency': return '🚨'
      default: return '🚪'
    }
  }

  return (
    <section id="map" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Interaktiv <span className="gradient-text">Xarita</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Maktab xonalarini qidiring va yo'l-ni aniqlang
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass rounded-3xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Bino xaritasi</h3>
              <div className="flex gap-2">
                {floors.slice(0, 3).map((floor) => (
                  <button
                    key={floor.level}
                    onClick={() => setActiveFloor(floor.level)}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${
                      activeFloor === floor.level
                        ? 'bg-primary text-white'
                        : 'glass hover:bg-gray-100'
                    }`}
                  >
                    {floor.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative aspect-video bg-gray-100 dark:bg-dark-50 rounded-2xl overflow-hidden">
              <div className="absolute inset-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                <div className="grid grid-cols-4 gap-2 p-4 h-full">
                  {rooms.filter(r => r.floor === activeFloor).map((room) => (
                    <motion.button
                      key={room.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedRoom(room)}
                      className={`rounded-xl border-2 p-3 flex flex-col items-center justify-center gap-1 transition-all ${
                        selectedRoom?.id === room.id
                          ? 'ring-2 ring-primary ring-offset-2'
                          : ''
                      } ${getRoomColor(room.type)}`}
                    >
                      <span className="text-2xl">{getRoomIcon(room.type)}</span>
                      <span className="text-sm font-bold">{room.name}</span>
                      {room.subject && (
                        <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                          {room.subject}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {selectedRoom && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-lg">{selectedRoom.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedRoom.subject}
                      </p>
                      {selectedRoom.teacher && (
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <User className="w-3 h-3" />
                          {selectedRoom.teacher}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRoute(selectedRoom)}
                        className="p-2 rounded-lg bg-primary text-white"
                      >
                        <Navigation className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              {[
                { type: 'class', label: 'Dars xonalari' },
                { type: 'lab', label: 'Laboratoriyalar' },
                { type: 'office', label: 'Ofislar' },
                { type: 'service', label: 'Xizmatlar' },
                { type: 'emergency', label: 'Xavfsizlik' },
              ].map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getRoomColor(item.type).split(' ')[0]}`} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Xona qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="glass rounded-2xl p-4 max-h-96 overflow-y-auto">
              <h3 className="font-semibold mb-3">Xonalar ro'yxati</h3>
              <div className="space-y-2">
                {filteredRooms.map((room) => (
                  <button
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`w-full p-3 rounded-xl text-left transition-all ${
                      selectedRoom?.id === room.id
                        ? 'bg-primary/10 border-primary'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    } border border-transparent`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{getRoomIcon(room.type)}</span>
                      <div>
                        <p className="font-medium">{room.name}</p>
                        <p className="text-xs text-gray-500">{room.subject}</p>
                      </div>
                      {room.capacity > 0 && (
                        <span className="ml-auto text-xs text-gray-400">
                          {room.capacity} o'rin
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { Calendar, Award, Users, Building, GraduationCap, Star } from 'lucide-react'

const timeline = [
  {
    year: 2010,
    title: 'Maktab asosiy',
    description: 'Smart School nomi bilan yangi maktab tashkil etildi. Dastlabki 200 o\'quvchi va 15 nafar hodim.',
    icon: Building,
    achievements: ['Birinchi o\'quvchilar qabul qilindi', 'Zamonaviy o\'quv dasturi joriy etildi'],
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800'
  },
  {
    year: 2013,
    title: 'Birinchi muvaffaqiyatlar',
    description: 'Maktab o\'quvchilari birinchi marta respublika olimpiadalarida ishtirok etdi va medallar qo\'lga kiritdi.',
    icon: Award,
    achievements: ['3 ta respublika olimpiada g\'olibi', 'Birinchi sport chempionati'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
  },
  {
    year: 2016,
    title: 'Xalqaro darajaga chiqish',
    description: 'Maktab xalqaro ta\'lim dasturlariga qo\'shildi va ilk xalqaro musobaqalarda qatnashdi.',
    icon: GraduationCap,
    achievements: ['Cambridge akademiyasi', 'Xalqaro olimpiada ishtiroki'],
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800'
  },
  {
    year: 2019,
    title: 'Yangi bino',
    description: 'Zamonaviy ta\'lim texnologiyalari bilan jihoblangan yangi bino ochildi.',
    icon: Building,
    achievements: ['3D laboratoriya', 'Robototexnika markazi'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'
  },
  {
    year: 2022,
    title: 'Smart Education',
    description: 'To\'liq raqamlashtirish va yangi onlayn ta\'lim platformasi ishga tushirildi.',
    icon: Star,
    achievements: ['Onlayn kutubxona', 'Virtual laboratoriyalar'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094aec?w=800'
  },
  {
    year: 2025,
    title: 'Regional lider',
    description: 'Mintaqadagi eng yaxshi maktab sifatida tanildi va ko\'plab xalqaro yutuqlarga erishdi.',
    icon: Users,
    achievements: ['5000+ o\'quvchi', '300+ yutuq', 'Xalqaro akkreditatsiya'],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800'
  }
]

export default function History() {
  return (
    <section id="history" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Maktab <span className="gradient-text">Tarixi</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            15 yillik muvaffaqiyatli faoliyat tarixi
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent-purple to-accent-cyan hidden md:block" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="flex-1">
                  <div className={`glass rounded-3xl p-6 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-3xl font-bold gradient-text">{item.year}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>

                    <div className={`flex flex-col gap-2 ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                      {item.achievements.map((ach, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex w-16 items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-purple flex items-center justify-center text-white font-bold"
                  >
                    {item.year.toString().slice(-2)}
                  </motion.div>
                </div>

                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-3xl overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
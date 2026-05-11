'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="blob w-96 h-96 bg-primary/30 rounded-full top-20 left-10" />
        <div className="blob w-80 h-80 bg-accent-purple/20 rounded-full bottom-20 right-10" style={{ animationDelay: '-5s' }} />
        <div className="blob w-64 h-64 bg-accent-cyan/20 rounded-full top-1/2 left-1/2" style={{ animationDelay: '-10s' }} />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-primary)_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Zamonaviy Ta'lim Ecoxitizemi</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-gray-900 dark:text-white">DOSOV</span>
              <br />
              <span className="gradient-text">Maktabi</span>
              <br />
              <span className="text-gray-900 dark:text-white">Zamonaviy Ta'lim</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg"
            >
              Biz nafaqat bilim beramiz, balki kelajakning yetakchi mutaxassislarini 
              tayyorlaymiz. Innovatsion yondashuv va professional jamoa bilan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="#news">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                >
                  Yangiliklar
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-gray-200 dark:border-gray-700 font-semibold hover:bg-white/20 dark:hover:bg-white/10 transition-all"
              >
                <Play className="w-5 h-5" />
                Video tanishuv
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-8 mt-12"
            >
              <div className="text-center">
                <p className="text-3xl font-bold gradient-text">15+</p>
                <p className="text-sm text-gray-500">Yillik tajriba</p>
              </div>
              <div className="w-px h-12 bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <p className="text-3xl font-bold gradient-text">5000+</p>
                <p className="text-sm text-gray-500">Yillik o'quvchi</p>
              </div>
              <div className="w-px h-12 bg-gray-200 dark:bg-gray-700" />
              <div className="text-center">
                <p className="text-3xl font-bold gradient-text">150+</p>
                <p className="text-sm text-gray-500">Hodimlar</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent-purple/20 blur-3xl" />
              
              <div className="relative glass rounded-3xl p-8 hover-lift">
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-6 flex flex-col justify-between"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                      <span className="text-2xl">📚</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">45</p>
                      <p className="text-sm text-gray-500">Fanlar</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-purple/5 p-6 flex flex-col justify-between"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-purple/20 flex items-center justify-center">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">120+</p>
                      <p className="text-sm text-gray-500">Yutuqlar</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-cyan/5 p-6 flex flex-col justify-between"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center">
                      <span className="text-2xl">👨‍🏫</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">98%</p>
                      <p className="text-sm text-gray-500">Mutaxassislar</p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-2xl bg-gradient-to-br from-accent-emerald/20 to-accent-emerald/5 p-6 flex flex-col justify-between"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-emerald/20 flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">100%</p>
                      <p className="text-sm text-gray-500">Natijalar</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-8 -left-8 glass rounded-2xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent-purple flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <p className="font-semibold">Smart School</p>
                  <p className="text-xs text-gray-500">#1 Maktab</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  )
}
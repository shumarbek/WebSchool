'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, Loader2, MessageSquare, Send, Sparkles, User, X } from 'lucide-react'
import useBodyScrollLock from '@/hooks/useBodyScrollLock'

const suggestions = [
  "Bugun dars jadvali qanday?",
  "Matematika o'qituvchilari kim?",
  "So'nggi yangiliklar bormi?",
  "Kutubxonada qanday kitoblar bor?",
  "Maktab manzili qayerda?",
  "Yaqin tadbirlar haqida ayt",
]

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Salom! Men Smart AI yordamchisiman. Platformadagi jadval, hodimlar, yangiliklar, yutuqlar, kutubxona va faoliyatlar bo'yicha savollaringizga javob beraman.",
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEnd = useRef(null)
  useBodyScrollLock(isOpen)

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  async function askAI(text) {
    const question = text.trim()
    if (!question || isTyping) return

    setMessages((current) => [...current, { role: 'user', content: question }])
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/smart-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await response.json()
      setMessages((current) => [...current, { role: 'assistant', content: data.answer || "Javob topilmadi." }])
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: "Hozircha AI bilan bog'lanishda muammo bor. Keyinroq qayta urinib ko'ring." }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent-purple text-white shadow-xl shadow-primary/30"
        aria-label="Smart AI"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-end bg-black/35 p-3 backdrop-blur-sm sm:p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.section
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
              className="flex h-[min(720px,calc(100vh-24px))] w-full max-w-[440px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-dark-50"
            >
              <header className="flex items-center justify-between bg-gradient-to-r from-primary to-accent-purple p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">Smart AI</h3>
                    <p className="text-xs text-white/80">Platforma ma'lumotlari asosida</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="rounded-xl p-2 hover:bg-white/20" aria-label="Yopish">
                  <X className="h-5 w-5" />
                </button>
              </header>

              <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4 dark:bg-dark-100">
                {messages.map((message, index) => (
                  <div key={`${message.role}-${index}`} className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.role === 'assistant' && <Avatar icon={Bot} />}
                    <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'rounded-br-md bg-primary text-white' : 'rounded-bl-md bg-white text-gray-800 shadow-sm dark:bg-dark-50 dark:text-gray-100'}`}>
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                    {message.role === 'user' && <Avatar icon={User} muted />}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2">
                    <Avatar icon={Bot} />
                    <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm shadow-sm dark:bg-dark-50">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      Javob tayyorlanmoqda...
                    </div>
                  </div>
                )}
                <div ref={messagesEnd} />
              </div>

              <div className="border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-dark-50">
                <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                  {suggestions.map((suggestion) => (
                    <button key={suggestion} onClick={() => askAI(suggestion)} className="whitespace-nowrap rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20">
                      {suggestion}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && askAI(input)}
                    placeholder="Savol yozing..."
                    className="min-w-0 flex-1 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary dark:border-gray-700 dark:bg-dark-100"
                  />
                  <button disabled={!input.trim() || isTyping} onClick={() => askAI(input)} className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-accent-purple text-white disabled:opacity-50">
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function Avatar({ icon: Icon, muted = false }) {
  return (
    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${muted ? 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-200' : 'bg-gradient-to-r from-primary to-accent-purple text-white'}`}>
      <Icon className="h-4 w-4" />
    </div>
  )
}

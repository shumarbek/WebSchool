'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, Sparkles, Bot, User, X, Minimize2, Maximize2, Volume2, VolumeX } from 'lucide-react'

const suggestions = [
  "Bugun 9-A da nechta dars bor?",
  "Fizika kitobini top",
  "Direktor qabul vaqti",
  "Kutubxona qayerda?",
  "Matematika o'qituvchisi kim?",
  "Sport zali ochish vaqti",
  "Bugungi jadval",
  "Maktab manzili"
]

const responses = {
  '9-a': {
    answer: "9-A sinfida bugun 5 ta dars:\n\n1. Matematika - 08:00-08:45 (201-xona, Aziz Qodirov)\n2. Fizika - 08:55-09:40 (305-xona, Malika Yusupova)\n3. Ingliz tili - 10:00-10:45 (102-xona, Bobur Aliyev)\n4. Tarix - 11:05-11:50 (401-xona, Gulnora Karimova)\n5. Kimyo - 12:10-12:55 (302-xona, Nilufar Ahmedova)",
    links: [{ text: "To'liq jadvalni ko'rish", href: "#schedule" }]
  },
  'fizika': {
    answer: "Fizika kitoblari:\n\n1. 'Fizika: Nazariy asoslar' - M. Yusupova (380 bet)\n2. 'Fizika amaliyot' - S. Rahimov (220 bet)\n3. 'Fizika masalalar to\'plami' (450 bet)\n\nBarcha kitoblarni kutubxona bo'limidan olishingiz mumkin.",
    links: [{ text: "Kutubxonaga o'tish", href: "#library" }]
  },
  'direktor': {
    answer: "Direktor - Rustam Ahmedov\n\nQabul vaqtlari:\n• Dushanba-Juma: 09:00-12:00\n• Shanba: 10:00-13:00\n• Tushlik: 13:00-14:00\n\nBog'lanish: +998 90 000-00-01",
    links: []
  },
  'kutubxona': {
    answer: "Kutubxona 2-qavatda joylashgan.\n\nIsh vaqti:\n• Dushanba-Juma: 08:00-18:00\n• Shanba: 09:00-15:00\n• Yakshanba: Yopiq\n\nXizmatlar: Onlayn kitob o'qish, qog'oz kitoblar, ishchi zonalar.",
    links: [{ text: "Kutubxona bo'limi", href: "#library" }]
  },
  'default': {
    answer: "Kechirasiz, savolni aniqroq yozing yoki quyidagi variantlardan birini taning. Men quyidagi savollarga javob bera olaman:\n\n• Sinf jadvallari haqida\n• O'qituvchilar haqida\n• Maktab xonalari joylashuvi\n• Kutubxona va kitoblar\n• Qo'shimcha tadbirlar",
    links: []
  }
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Salom! Men Smart School AI yordamchisiman. Sizga qanday yordam berishim mumkin?" 
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEnd = useRef(null)

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getResponse = (query) => {
    const lowerQuery = query.toLowerCase()
    
    if (lowerQuery.includes('9-a') || lowerQuery.includes('9a')) {
      return responses['9-a']
    }
    if (lowerQuery.includes('fizika')) {
      return responses['fizika']
    }
    if (lowerQuery.includes('direktor') || lowerQuery.includes('rahbar')) {
      return responses['direktor']
    }
    if (lowerQuery.includes('kutubxona') || lowerQuery.includes('kitob')) {
      return responses['kutubxona']
    }
    
    return responses.default
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getResponse(input)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.answer,
        links: response.links
      }])
      setIsTyping(false)
    }, 1000)
  }

  const handleSuggestion = (suggestion) => {
    setInput(suggestion)
    handleSend()
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent-purple text-white shadow-lg shadow-primary/30 flex items-center justify-center z-50"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 w-96 bg-white dark:bg-dark-100 rounded-3xl shadow-2xl z-50 overflow-hidden border border-gray-200 dark:border-gray-700 ${
              isMinimized ? 'h-auto' : 'h-[600px]'
            }`}
          >
            <div className="bg-gradient-to-r from-primary to-accent-purple p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Smart AI</h3>
                  <p className="text-xs text-white/80">Online yordamchi</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4 text-white" /> : <Minimize2 className="w-4 h-4 text-white" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="p-4 h-[400px] overflow-y-auto space-y-4">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent-purple flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-primary text-white rounded-br-md'
                          : 'bg-gray-100 dark:bg-dark-50 rounded-bl-md'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{msg.content}</p>
                        {msg.links && msg.links.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                            {msg.links.map((link, i) => (
                              <a
                                key={i}
                                href={link.href}
                                className="block text-xs text-primary hover:underline"
                              >
                                → {link.text}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                      {msg.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent-purple flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-100 dark:bg-dark-50 p-3 rounded-2xl rounded-bl-md">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEnd} />
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {suggestions.slice(0, 4).map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestion(suggestion)}
                        className="px-3 py-1.5 rounded-full text-xs bg-gray-100 dark:bg-dark-50 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Savol yozing..."
                      className="flex-1 px-4 py-3 rounded-2xl glass border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary to-accent-purple text-white flex items-center justify-center"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
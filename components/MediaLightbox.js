'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import useBodyScrollLock from '@/hooks/useBodyScrollLock'

function getVideoSource(url) {
  if (!url) return null

  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace('www.', '')
    const isDirect = /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(parsed.pathname)

    if (isDirect) return { type: 'direct', src: url }

    if (host === 'youtu.be' || host.includes('youtube.com')) {
      const id = host === 'youtu.be'
        ? parsed.pathname.split('/').filter(Boolean)[0]
        : parsed.searchParams.get('v') || parsed.pathname.split('/').filter(Boolean).pop()

      if (id) return { type: 'embed', src: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` }
    }

    if (host.includes('vimeo.com')) {
      const id = parsed.pathname.split('/').filter(Boolean).pop()
      if (id) return { type: 'embed', src: `https://player.vimeo.com/video/${id}?autoplay=1` }
    }

    return { type: 'embed', src: url }
  } catch {
    return null
  }
}

export default function MediaLightbox({ media, onClose }) {
  useBodyScrollLock(!!media)
  const video = media?.type === 'video' ? getVideoSource(media.src) : null

  return (
    <AnimatePresence>
      {media && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button onClick={onClose} className="absolute right-5 top-5 rounded-full bg-white/15 p-2 text-white hover:bg-white/25">
            <X className="h-6 w-6" />
          </button>
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-6xl"
          >
            {media.type === 'image' && (
              <img src={media.src} alt={media.alt || ''} className="mx-auto max-h-[86vh] w-auto max-w-full rounded-2xl object-contain" />
            )}
            {media.type === 'video' && video?.type === 'direct' && (
              <video src={video.src} controls autoPlay className="mx-auto aspect-video max-h-[86vh] w-full rounded-2xl bg-black object-contain" />
            )}
            {media.type === 'video' && video?.type === 'embed' && (
              <iframe
                src={video.src}
                title={media.alt || 'Video'}
                className="aspect-video w-full rounded-2xl border-0 bg-black"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

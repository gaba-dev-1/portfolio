"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface ProjectCarouselProps {
  images: string[]
  title: string
  autoplaySpeed?: number
}

export default function ProjectCarousel({ 
  images, 
  title,
  autoplaySpeed = 5000 
}: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    
    if (!isPaused && images.length > 1) {
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, autoplaySpeed)
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentIndex, isPaused, images.length, autoplaySpeed])

  const goToPrevious = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const goToIndex = (index: number) => setCurrentIndex(index)
  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <div 
      className="relative overflow-hidden rounded-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-[16/9] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image 
              src={images[currentIndex]}
              alt={`${title} - image ${currentIndex + 1}`}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
          <h3 className="text-3xl font-display font-bold text-white">
            {title}
          </h3>
        </div>
        
        {images.length > 1 && (
          <>
            <button 
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors z-10"
              aria-label="Previous image"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button 
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors z-10"
              aria-label="Next image"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}
        
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-white w-4" 
                    : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

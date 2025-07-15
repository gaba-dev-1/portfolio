"use client"

import { motion } from "framer-motion"
import { Suspense, useEffect, useState } from "react"
import { person } from "@/lib/portfolio"
import Button from "@/components/ui/button"
import { ArrowRightIcon } from "@/components/ui/icons"
import dynamic from "next/dynamic"

const SceneController = dynamic(() => import("@/components/three/scene-controller"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="loader"></div>
    </div>
  )
})

export function Hero() {
  const [scrollSpeed, setScrollSpeed] = useState(1)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      const speed = 1 + (scrollY / 1000) * 2
      setScrollSpeed(Math.min(Math.max(speed, 1), 2.5))
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <section className="min-h-screen pt-32 pb-20 relative flex items-center overflow-hidden" id="home">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03),transparent_50%)]" />
      
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -left-[10%] w-[60%] h-[60%] rounded-full bg-purple/3 blur-3xl animate-float" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-light/2 blur-3xl animate-float animation-delay-2000" />
        <div className="absolute top-1/2 left-1/3 w-[30%] h-[30%] rounded-full bg-purple-dark/2 blur-3xl animate-float animation-delay-4000" />
      </div>
      
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-32">
          <div className="lg:w-3/5 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 mb-6 text-sm rounded-full bg-purple/10 text-purple">
                {person.role} • {person.location}
              </span>
            </motion.div>
            
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Hi, I'm{" "}
              <span className="gradient-text">Gaba</span>
              <span className="block">{person.bio}</span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {person.tagline}
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button 
                href="#projects" 
                variant="primary"
                icon={<ArrowRightIcon className="h-4 w-4" />}
                iconPosition="right"
              >
                View Projects
              </Button>
              <Button 
                href="#about" 
                variant="outline"
              >
                Get In Touch
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="lg:w-2/5 mt-12 relative h-[400px] px-12 sm:h-[450px] lg:h-[550px] w-full"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="absolute inset-0 z-0">
              {isMounted && (
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="loader"></div>
                  </div>
                }>
                  <SceneController speed={scrollSpeed} />
                </Suspense>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

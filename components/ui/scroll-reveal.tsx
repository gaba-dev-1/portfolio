"use client"

import { useEffect } from "react"
import { motion, useAnimation, Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface ScrollRevealProps {
  children: React.ReactNode
  threshold?: number
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  once?: boolean
  className?: string
  distance?: number
}

export default function ScrollReveal({
  children,
  threshold = 0.1,
  delay = 0,
  duration = 0.5,
  direction = "up",
  once = true,
  className = "",
  distance = 50
}: ScrollRevealProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold, triggerOnce: once })
  
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }
  }
  
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

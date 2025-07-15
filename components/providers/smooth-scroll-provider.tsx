"use client"

import { createContext, useContext, useEffect, useState } from "react"
import Lenis from "@studio-freight/lenis"

type SmoothScrollContextType = {
  lenis: Lenis | null
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
})

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    setLenis(lenisInstance)

    return () => {
      lenisInstance.destroy()
    }
  }, [])

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export const useSmoothScroll = () => useContext(SmoothScrollContext)

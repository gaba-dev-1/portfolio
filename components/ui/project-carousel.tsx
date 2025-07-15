"use client"

import { useState } from "react"
import React from "react"

interface OptimalLightboxProps {
  images: string[];
  title: string;
}

export default function OptimalLightbox({ images, title }: OptimalLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  function openFullscreen() {
    const overlay = document.createElement('div')
    const imgContainer = document.createElement('div')
    const img = document.createElement('img')
    const closeBtn = document.createElement('button')
    let imgCounter: HTMLDivElement | null = null
    let prevBtn: HTMLButtonElement | null = null
    let nextBtn: HTMLButtonElement | null = null
    
    let imgIndex = currentIndex
    
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.95);
      z-index: 9999999;
      display: flex;
      justify-content: center;
      align-items: center;
    `
    
    imgContainer.style.cssText = `
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
    `
    
    img.style.cssText = `
      max-width: 100%;
      max-height: 85vh;
      object-fit: contain;
    `
    
    closeBtn.innerHTML = '×'
    closeBtn.style.cssText = `
      position: absolute;
      top: -40px;
      right: 0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    `
    
    function createNavButton(direction: 'prev' | 'next'): HTMLButtonElement {
      const btn = document.createElement('button')
      btn.innerHTML = direction === 'prev' ? '←' : '→'
      
      const isMobile = window.innerWidth < 768;
      
      btn.style.cssText = `
        position: absolute;
        ${direction === 'prev' 
          ? isMobile ? 'left: 10px' : 'left: -60px' 
          : isMobile ? 'right: 10px' : 'right: -60px'};
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        border: none;
        color: rgba(255, 255, 255, 0.8);
        font-size: 18px;
        line-height: 1;
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
      `
      return btn
    }
    
    function cleanup() {
      document.body.removeChild(overlay)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', keyHandler)
    }
    
    function updateImage() {
      img.src = images[imgIndex]
      if (imgCounter) imgCounter.textContent = `${imgIndex + 1} / ${images.length}`
    }
    
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cleanup()
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        imgIndex = (imgIndex - 1 + images.length) % images.length
        updateImage()
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        imgIndex = (imgIndex + 1) % images.length
        updateImage()
      }
    }
    
    closeBtn.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation()
      cleanup()
    })
    
    overlay.addEventListener('click', cleanup)
    imgContainer.addEventListener('click', (e: MouseEvent) => e.stopPropagation())
    
    img.src = images[imgIndex]
    img.alt = title
    
    img.onerror = () => {
      img.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg width="400" height="300" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="400" height="300" fill="%23cccccc"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="26px" fill="%23333333"%3EImage failed to load%3C/text%3E%3C/svg%3E'
    }
    
    if (images.length > 1) {
      prevBtn = createNavButton('prev')
      nextBtn = createNavButton('next')
      
      prevBtn.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation()
        imgIndex = (imgIndex - 1 + images.length) % images.length
        updateImage()
      })
      
      nextBtn.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation()
        imgIndex = (imgIndex + 1) % images.length
        updateImage()
      })
      
      imgCounter = document.createElement('div') as HTMLDivElement
      imgCounter.textContent = `${imgIndex + 1} / ${images.length}`
      imgCounter.style.cssText = `
        position: absolute;
        bottom: -40px;
        left: 0;
        right: 0;
        text-align: center;
        color: white;
        font-size: 16px;
      `
      
      imgContainer.appendChild(prevBtn)
      imgContainer.appendChild(nextBtn)
      imgContainer.appendChild(imgCounter)
    }
    
    imgContainer.appendChild(img)
    imgContainer.appendChild(closeBtn)
    overlay.appendChild(imgContainer)
    document.body.appendChild(overlay)
    document.body.style.overflow = 'hidden'
    
    window.addEventListener('keydown', keyHandler)
  }
  
  function prevImage(e: React.MouseEvent) {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  
  function nextImage(e: React.MouseEvent) {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ position: 'relative', aspectRatio: '16/9' }}>
        <img
          src={images[currentIndex]}
          alt={title}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            cursor: 'pointer' 
          }}
          onClick={openFullscreen}
        />
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        }}>
          <h3 style={{ 
            fontSize: '1.875rem', 
            fontWeight: 'bold',
            color: 'white',
            margin: 0
          }}>
            {title}
          </h3>
        </div>
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ←
            </button>
            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              →
            </button>
          </>
        )}
      </div>
    </div>
  )
}

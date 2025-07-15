"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { person } from "@/lib/portfolio"
import ThemeToggle from "@/components/ui/theme-toggle"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      
      const sections = ["home", "projects", "services", "about"]
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section === "home" ? "home" : section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { name: "Home", href: "#home", section: "home" },
    { name: "Projects", href: "#projects", section: "projects" },
    { name: "Services", href: "#services", section: "services" },
    { name: "About", href: "#about", section: "about" },
  ]

  const navItemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    })
  }

  const handleMobileNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }

  const navbarBgStyle = isScrolled
  ? "bg-background/90 backdrop-blur-md border-b border-purple/15" 
  : "bg-background/60 backdrop-blur-sm border-b border-purple/5"

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${navbarBgStyle}`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="#home" 
              className="text-2xl font-display font-bold gradient-text hover:opacity-90 transition-all"
            >
              {person.alias}
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-1">
            <motion.ul 
              className="flex"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {navItems.map((item, i) => (
                <motion.li 
                  key={item.name} 
                  custom={i}
                  variants={navItemVariants}
                >
                  <Link 
                    href={item.href} 
                    className={`px-4 py-2 rounded-md text-sm font-medium relative transition-all group`}
                  >
                    <span className={`relative z-10 transition-colors ${
                      activeSection === item.section
                        ? "text-purple" 
                        : "text-foreground/70 group-hover:text-foreground"
                    }`}>
                      {item.name}
                    </span>
                    
                    {activeSection === item.section && (
                      <motion.span 
                        className="absolute inset-0 bg-purple/5 rounded-md -z-0"
                        layoutId="navBackground"
                        transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
                      />
                    )}
                    
                    <span className="absolute bottom-0 left-0 right-0 flex justify-center">
                      {activeSection === item.section && (
                        <motion.span 
                          className="w-1 h-1 rounded-full bg-purple"
                          layoutId="navIndicator"
                          transition={{ type: "spring", duration: 0.2, bounce: 0.1 }}
                        />
                      )}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="ml-2"
            >
              <ThemeToggle />
            </motion.div>
          </div>

          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              className="ml-4 p-1 rounded-md text-foreground hover:bg-muted transition-colors relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                initial={false}
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex justify-center items-center"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 2 }
                  }}
                  className="absolute w-5 h-0.5 bg-current transform"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="absolute w-5 h-0.5 bg-current"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -2 }
                  }}
                  className="absolute w-5 h-0.5 bg-current transform"
                />
              </motion.div>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden mt-4 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="py-3 px-2 rounded-lg bg-background/95 backdrop-blur-md border border-purple/10 shadow-lg">
                <ul className="flex flex-col space-y-1">
                  {navItems.map((item, i) => (
                    <motion.li 
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <a
                        href={item.href} 
                        className={`block px-4 py-3 rounded-md transition-colors relative group ${
                          activeSection === item.section
                            ? "bg-purple/10 text-purple font-medium" 
                            : "text-foreground/70 hover:text-foreground hover:bg-muted"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleMobileNavClick(item.href);
                        }}
                      >
                        <div className="flex items-center">
                          <span className="mr-3">
                            {item.section === "home" && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                              </svg>
                            )}
                            {item.section === "about" && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                              </svg>
                            )}
                            {item.section === "projects" && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3v18h18"></path>
                                <path d="m18.37 8.64 1.32-1.32a3 3 0 1 0-4.24-4.24L14.13 4.4"></path>
                                <path d="m10.95 7.5.8.8"></path>
                                <path d="m7.45 11 .8.8"></path>
                                <path d="m3.95 14.5.8.8"></path>
                              </svg>
                            )}
                            {item.section === "services" && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                              </svg>
                            )}
                          </span>
                          {item.name}
                        </div>
                        
                        {activeSection === item.section && (
                          <motion.span 
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-purple"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </motion.span>
                        )}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

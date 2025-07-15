"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "@/lib/portfolio"
import ScrollReveal from "@/components/ui/scroll-reveal"
import Button from "@/components/ui/button"
import { GithubIcon, ExternalLinkIcon } from "@/components/ui/icons"
import ProjectCarousel from "@/components/ui/project-carousel"

type ProjectColorType = 'primary' | 'purple-light' | 'purple-dark' | 'purple-lighter' | 'purple-darker'

export function Projects() {
  const [activeProject, setActiveProject] = useState(projects[0].id)
  
  const getProjectStyles = (color: string, isActive: boolean) => {
    const baseColors: Record<ProjectColorType, { bg: string; glow: string; accent: string }> = {
      'primary': { 
        bg: isActive ? 'bg-purple/8 text-purple border-purple/20' : 'hover:bg-purple/3 hover:border-purple/10',
        glow: 'hover:shadow-[0_0_10px_rgba(139,92,246,0.08)]',
        accent: 'bg-purple/10 text-purple'
      },
      'purple-light': { 
        bg: isActive ? 'bg-purple-light/8 text-purple-light border-purple-light/20' : 'hover:bg-purple-light/3 hover:border-purple-light/10',
        glow: 'hover:shadow-[0_0_10px_rgba(167,139,250,0.08)]',
        accent: 'bg-purple-light/10 text-purple-light'
      },
      'purple-dark': { 
        bg: isActive ? 'bg-purple-dark/8 text-purple-dark border-purple-dark/20' : 'hover:bg-purple-dark/3 hover:border-purple-dark/10',
        glow: 'hover:shadow-[0_0_10px_rgba(124,58,237,0.08)]',
        accent: 'bg-purple-dark/10 text-purple-dark'
      },
      'purple-lighter': { 
        bg: isActive ? 'bg-purple-lighter/8 text-purple-lighter border-purple-lighter/20' : 'hover:bg-purple-lighter/3 hover:border-purple-lighter/10',
        glow: 'hover:shadow-[0_0_10px_rgba(196,181,253,0.08)]',
        accent: 'bg-purple-lighter/10 text-purple-lighter'
      },
      'purple-darker': { 
        bg: isActive ? 'bg-purple-darker/8 text-purple-darker border-purple-darker/20' : 'hover:bg-purple-darker/3 hover:border-purple-darker/10',
        glow: 'hover:shadow-[0_0_10px_rgba(109,40,217,0.08)]',
        accent: 'bg-purple-darker/10 text-purple-darker'
      }
    }
    
    return baseColors[color as ProjectColorType] || baseColors['primary']
  }
  
  return (
    <section id="projects" className="py-20 relative">
      <div className="absolute top-40 right-0 w-48 h-48 bg-purple/10 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-20 left-0 w-32 h-32 bg-purple-light/8 rounded-full blur-3xl opacity-20 -z-10"></div>
      
      <div className="container-custom">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight text-center">
            Projects
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Some stuff I've been working on
          </p>
        </ScrollReveal>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <ScrollReveal className="lg:w-1/3" delay={0.1}>
            <div className="glass rounded-xl p-1 border border-purple/8">
              {projects.map((project) => {
                const styles = getProjectStyles(project.color, activeProject === project.id)
                return (
                  <button
                    key={project.id}
                    className={`w-full text-left px-6 py-4 rounded-lg transition-all border border-transparent ${styles.bg} ${styles.glow}`}
                    onClick={() => setActiveProject(project.id)}
                  >
                    <span className="block text-sm opacity-70 mb-1">
                      {project.tagline}
                    </span>
                    <span className="text-lg font-medium">
                      {project.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </ScrollReveal>
          
          <ScrollReveal className="lg:w-2/3" delay={0.2}>
            <AnimatePresence mode="wait">
              {projects.map((project) => (
                project.id === activeProject && (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="glass rounded-xl overflow-hidden border border-purple/8 subtle-glow"
                  >
                    <ProjectCarousel 
                      images={project.images} 
                      title={project.title}
                    />
                    
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => {
                          const styles = getProjectStyles(project.color, true)
                          return (
                            <span
                              key={tag}
                              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles.accent}`}
                            >
                              {tag}
                            </span>
                          )
                        })}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-4">
                        {project.tagline}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6">
                        {project.longDescription.split("\n\n")[0]}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="font-medium mb-2">Features</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple mr-2"></span>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          href={project.link} 
                          variant="primary"
                          icon={<ExternalLinkIcon className="h-4 w-4" />}
                          iconPosition="right"
                          isExternal
                        >
                          View Project
                        </Button>
                        
                        {project.github && (
                          <Button 
                            href={project.github} 
                            variant="outline"
                            icon={<GithubIcon className="h-4 w-4" />}
                            iconPosition="left"
                            isExternal
                          >
                            Source Code
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

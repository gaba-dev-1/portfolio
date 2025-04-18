"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { person, contact } from "@/lib/portfolio"
import ScrollReveal from "@/components/ui/scroll-reveal"
import Button from "@/components/ui/button"
import { 
  GithubIcon, 
  TwitterIcon, 
  LinkedinIcon, 
  DiscordIcon 
} from "@/components/ui/icons"

export function AboutContact() {
  const [activeTab, setActiveTab] = useState("skills")
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Tab animation variants
  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })
    }, 1000)
  }
  
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-accent/5 to-transparent -z-10"></div>
      <div className="absolute top-1/4 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="container-custom">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-center mb-3">
            About Me
          </h2>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-6"></div>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Learn about my expertise and get in touch
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Skills & Experience Section with tabs */}
          <ScrollReveal className="lg:col-span-5" delay={0.2}>
            <div className="glass rounded-xl overflow-hidden border border-accent/10">
              {/* Tabs Navigation */}
              <div className="flex border-b border-accent/5 bg-muted/30">
                <button
                  onClick={() => setActiveTab("skills")}
                  className={`flex-1 py-4 text-center transition-colors relative ${
                    activeTab === "skills" ? "text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-sm font-medium">Skills</span>
                  {activeTab === "skills" && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("experience")}
                  className={`flex-1 py-4 text-center transition-colors relative ${
                    activeTab === "experience" ? "text-accent" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-sm font-medium">Experience</span>
                  {activeTab === "experience" && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </button>
              </div>
              
              {/* Tabs Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === "skills" && (
                    <motion.div
                      key="skills"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={tabVariants}
                    >
                      <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {person.skills.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            className="glass rounded-lg p-4 border border-accent/5 hover:border-accent/20 transition-colors hover:shadow-lg"
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0,
                              transition: { delay: index * 0.1, duration: 0.5 }
                            }}
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="font-medium">{skill.name}</h4>
                              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                                {skill.level}
                              </span>
                            </div>
                            
                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-accent"
                                initial={{ width: 0 }}
                                animate={{ 
                                  width: skill.level === 'Advanced' 
                                    ? '90%' 
                                    : skill.level === 'Specialized' 
                                      ? '95%' 
                                      : skill.level === 'Skilled'
                                        ? '85%'
                                        : skill.level === 'Accomplished'
                                          ? '88%'
                                          : '70%',
                                  transition: { 
                                    delay: index * 0.1 + 0.3,
                                    duration: 0.8,
                                    ease: "easeOut"
                                  }
                                }}
                            />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {activeTab === "experience" && (
                    <motion.div
                      key="experience"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={tabVariants}
                    >
                      <h3 className="text-xl font-semibold mb-6">Work Experience</h3>
                      
                      <div className="relative border-l-2 border-accent/30 pl-6 pb-6 ml-4">
                        {/* Job Timeline */}
                        {person.experience.map((job, index) => (
                          <motion.div 
                            key={index}
                            className="mb-8 relative"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ 
                              opacity: 1, 
                              x: 0,
                              transition: { delay: index * 0.2, duration: 0.5 }
                            }}
                          >
                            <div className="absolute -left-[40px] top-0 w-6 h-6 rounded-full border-2 border-accent bg-background flex items-center justify-center">
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                            </div>
                            
                            <div className="glass rounded-lg p-4 shadow-md border border-accent/5">
                              <h4 className="text-lg font-medium">{job.title}</h4>
                              <div className="flex items-center text-sm text-muted-foreground mt-1 mb-3">
                                <span>{job.company}</span>
                                <span className="mx-2">•</span>
                                <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">
                                  {job.duration}
                                </span>
                              </div>
                              <p className="text-sm">{job.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>
          
          {/* Contact Section */}
          <ScrollReveal className="lg:col-span-7" delay={0.3}>
            <div className="glass rounded-xl overflow-hidden border border-accent/10 purple-glow h-full">
              <div className="p-6 border-b border-accent/5">
                <h3 className="text-xl font-semibold">Contact</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Have a project in mind? Feel free to reach out!
                </p>
              </div>
              
              <div className="p-6">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="mb-6 w-20 h-20 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <h4 className="text-2xl font-display font-bold mb-3">Message Sent!</h4>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-muted/50 border border-accent/10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-muted/50 border border-accent/10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        placeholder="Your email address"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-2 bg-muted/50 border border-accent/10 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        placeholder="Your message"
                      />
                    </div>
                    
                    <div>
                      <Button
                        type="submit"
                        isLoading={isSubmitting}
                        className="w-full"
                      >
                        Send Message
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

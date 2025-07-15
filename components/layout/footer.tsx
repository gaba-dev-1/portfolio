"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { person, contact } from "@/lib/portfolio"
import { 
  GithubIcon, 
  TwitterIcon, 
  LinkedinIcon, 
  MailIcon, 
  DiscordIcon 
} from "@/components/ui/icons"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    {
      name: "GitHub",
      href: `https://${contact.github}`,
      icon: <GithubIcon className="h-5 w-5" />,
      username: contact.github
    },
    {
      name: "Discord",
      href: contact.discord,
      icon: <DiscordIcon className="h-5 w-5" />,
      username: "Discord Server"
    },
    {
      name: "Twitter",
      href: `https://twitter.com/${contact.twitter.substring(1)}`,
      icon: <TwitterIcon className="h-5 w-5" />,
      username: contact.twitter
    },
    {
      name: "LinkedIn",
      href: `https://${contact.linkedin}`,
      icon: <LinkedinIcon className="h-5 w-5" />,
      username: "LinkedIn"
    },
    {
      name: "Email",
      href: `mailto:${contact.email}`,
      icon: <MailIcon className="h-5 w-5" />,
      username: contact.email
    }
  ]

  return (
    <footer className="py-16 bg-muted">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <Link 
              href="#" 
              className="text-2xl font-display font-bold gradient-text hover:opacity-80 transition-opacity"
            >
              {person.alias}
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              {person.bio}
            </p>
            
            <motion.a 
              href="https://github.com/gaba-dev/gabadev"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center px-3.5 py-1.5 rounded-md text-sm font-medium
                         bg-purple text-white hover:bg-purple-dark
                         transition-all duration-100"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              <GithubIcon className="h-4 w-4 mr-2" />
              <span>Portfolio Source</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="ml-1.5"
              >
                <path d="M7 17l9.2-9.2M17 17V7H7"/>
              </svg>
            </motion.a>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 3 }} transition={{ type: "spring", stiffness: 400 }}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center group"
                  >
                    <span className="text-muted-foreground group-hover:text-purple transition-colors mr-2">
                      {link.icon}
                    </span>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                      {link.username}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-muted-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} {person.name}. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm mt-2 md:mt-0">
              Built with Three.js and Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

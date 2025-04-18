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
      name: "Twitter",
      href: `https://twitter.com/${contact.twitter.substring(1)}`,
      icon: <TwitterIcon className="h-5 w-5" />,
      username: contact.twitter
    },
    {
      name: "Discord",
      href: contact.discordServer,
      icon: <DiscordIcon className="h-5 w-5" />,
      username: contact.discord
    },
    {
      name: "GitHub",
      href: `https://${contact.github}`,
      icon: <GithubIcon className="h-5 w-5" />,
      username: contact.github
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
              className="text-2xl font-display font-bold text-accent hover:opacity-80 transition-opacity"
            >
              {person.alias}
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Software engineer focused on creating tailored digital 
              experiences for gamers and developers.
            </p>
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
                    <span className="text-muted-foreground group-hover:text-accent transition-colors mr-2">
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
              Built with Next.js, Three.js and Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

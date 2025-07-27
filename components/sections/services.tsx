"use client"

import { useState } from "react"
import { services } from "@/lib/portfolio"
import ScrollReveal from "@/components/ui/scroll-reveal"
import Button from "@/components/ui/button"

export function Services() {
  const [activeService, setActiveService] = useState(0)

  const getServiceStyles = (color: string) => {
    const colorMap: Record<string, string> = {
      'primary': 'bg-purple/10 text-purple border-purple/20',
      'purple-light': 'bg-purple-light/10 text-purple-light border-purple-light/20',
      'purple-dark': 'bg-purple-dark/10 text-purple-dark border-purple-dark/20',
    }
    return colorMap[color] || colorMap['primary']
  }

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container-custom">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight text-center">
            Services
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Simple custom pricing for web development
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Service selector */}
          <ScrollReveal className="lg:col-span-4" delay={0.1}>
            <div className="space-y-3">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`w-full text-left p-4 rounded-lg transition-all ${
                    activeService === index
                      ? 'bg-purple text-white shadow-lg' 
                      : 'glass hover:bg-muted border border-purple/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{service.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      activeService === index ? 'bg-white/20' : 'bg-muted'
                    }`}>
                      {service.price}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    activeService === index ? 'text-purple-100' : 'text-muted-foreground'
                  }`}>
                    {service.description}
                  </p>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Service details */}
          <ScrollReveal className="lg:col-span-8" delay={0.2}>
            <div className="glass rounded-xl p-8 border border-purple/8">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{services[activeService].title}</h3>
                <p className="text-muted-foreground mb-4">{services[activeService].description}</p>
                
                <div className="flex gap-4 mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getServiceStyles(services[activeService].color)}`}>
                    {services[activeService].price}
                  </span>
                  <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                    {services[activeService].duration}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3 text-purple">What you get</h4>
                  <ul className="space-y-2">
                    {services[activeService].features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-purple rounded-full mr-3 flex-shrink-0"></span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <Button 
                    href="#about" 
                    variant="primary"
                    className="w-full"
                  >
                    Start Project
                  </Button>
                  <Button 
                    href={`mailto:contact@gabadev.com?subject=${services[activeService].title} - Quick Question`}
                    variant="outline"
                    className="w-full"
                    isExternal
                  >
                    Ask Questions
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Simple pricing note */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Prices depend on complexity and features. Get a free quote by messaging me with your project details.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

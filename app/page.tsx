import { Hero } from '@/components/sections/hero'
import { Projects } from '@/components/sections/projects'
import { Services } from '@/components/sections/services'
import { AboutContact } from '@/components/sections/about'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <Services />
        <AboutContact />
      </main>
      <Footer />
    </>
  )
}

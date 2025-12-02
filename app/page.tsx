"use client"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ParticleBackground } from "@/components/particle-background"
import { I18nProvider } from "@/lib/i18n"

const HIGHLIGHT_TIMEOUT = 15 * 60 * 1000

export default function Home() {
  const [highlightedTech, setHighlightedTech] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleTechSelect = (skill: string) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // If clicking the same tech, clear highlight
    if (highlightedTech?.toLowerCase() === skill.toLowerCase()) {
      setHighlightedTech(null)
      return
    }

    // Always set new tech (this replaces any previously selected tech)
    setHighlightedTech(skill)

    // Set 15 minute timeout
    timeoutRef.current = setTimeout(() => {
      setHighlightedTech(null)
    }, HIGHLIGHT_TIMEOUT)
  }

  const handleClearHighlight = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setHighlightedTech(null)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <I18nProvider>
      <div className="relative min-h-screen overflow-x-hidden">
        <ParticleBackground />
        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <About />
            <Experience
              highlightedTech={highlightedTech}
              onClearHighlight={handleClearHighlight}
              onTechSelect={handleTechSelect}
            />
            <Projects onTechClick={handleTechSelect} highlightedTech={highlightedTech} />
            <Skills onSkillClick={handleTechSelect} highlightedTech={highlightedTech} />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </I18nProvider>
  )
}

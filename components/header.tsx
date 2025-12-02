"use client"

import { useState, useEffect } from "react"
import { Menu, X, Globe } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useI18n } from "@/lib/i18n"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useI18n()

  const navItems = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.experience, href: "#experience" },
    { name: language === "es" ? "Proyectos" : "Projects", href: "#projects" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.contact, href: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es")
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 shadow-lg shadow-black/10 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <motion.a
          href="#"
          className="cursor-pointer font-mono text-xl font-bold tracking-tight text-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          bosxch<span className="animate-blink">_</span>
        </motion.a>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-6 lg:flex">
          {navItems.map((item, i) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <a
                href={item.href}
                className="group relative cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="font-mono text-xs text-primary">0{i + 1}. </span>
                {item.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all group-hover:w-full" />
              </a>
            </motion.li>
          ))}
          <motion.li initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <button
              onClick={toggleLanguage}
              className="flex cursor-pointer items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-all hover:border-primary hover:text-primary"
              aria-label="Toggle language"
            >
              <Globe size={14} />
              <span className="font-mono text-xs uppercase">{language}</span>
            </button>
          </motion.li>
          <motion.li initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <a
              href={language === "es" ? "/Amparo_Cardoso_Bosch_CV_Full_Stack_2025.pdf" : "/Amparo_Cardoso_Bosch_CV_Full_Stack_EN_2025.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded-md bg-primary/10 px-4 py-2 text-sm text-primary transition-all hover:bg-primary/20"
            >
              CV
            </a>
          </motion.li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="cursor-pointer text-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-background/95 backdrop-blur-lg lg:hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-6">
              {navItems.map((item, i) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="font-mono text-xs text-primary">0{i + 1}. </span>
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={toggleLanguage}
                  className="flex cursor-pointer items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Globe size={14} />
                  <span className="font-mono text-xs uppercase">{language === "es" ? "EN" : "ES"}</span>
                </button>
              </li>
              <li>
                <a
                  href={language === "es" ? "/Amparo_Cardoso_Bosch_CV_Full_Stack_2025.pdf" : "/Amparo_Cardoso_Bosch_CV_Full_Stack_EN_2025.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block cursor-pointer rounded-md bg-primary/10 px-4 py-2 text-sm text-primary transition-all hover:bg-primary/20"
                >
                  CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { SphereBackground } from "./sphere-background"
import { useI18n } from "@/lib/i18n"

export function Hero() {
  const { t } = useI18n()

  const renderDescription = () => {
    const parts = t.hero.description
      .replace("{years}", `<span class="text-primary">${t.hero.yearsExp}</span>`)
      .replace("{performance}", `<span class="text-primary">${t.hero.performance}</span>`)
      .replace("{ux}", `<span class="text-primary">UX</span>`)
      .replace("{cleanCode}", `<span class="text-primary">${t.hero.cleanCode}</span>`)
    return <span dangerouslySetInnerHTML={{ __html: parts }} />
  }

  return (
    <section className="relative flex min-h-screen select-none flex-col justify-center px-6 pt-20">
      <SphereBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4 font-mono text-primary"
        >
          {t.hero.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-2 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Amparo Cardoso Bosch
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6 text-3xl font-bold text-muted-foreground sm:text-4xl md:text-5xl lg:text-6xl"
        >
          {t.hero.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          {renderDescription()}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-start gap-6"
        >
          <a
            href="mailto:amparocardosobosch@gmail.com"
            className="glow cursor-pointer rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            {t.hero.cta}
          </a>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/bosxch"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              aria-label="GitHub"
            >
              <Github size={22} />
            </a>
            <a
              href="https://linkedin.com/in/amparo-cardoso-bosch"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="mailto:amparocardosobosch@gmail.com"
              className="cursor-pointer rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              aria-label="Email"
            >
              <Mail size={22} />
            </a>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        className="absolute bottom-[10%] left-1/2 z-10 -translate-x-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-primary"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  )
}

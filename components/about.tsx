"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useI18n } from "@/lib/i18n"
import Image from "next/image"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { t } = useI18n()

  const renderWithHighlights = (text: string, highlights: Record<string, string>) => {
    let result = text
    Object.entries(highlights).forEach(([key, value]) => {
      result = result.replace(`{${key}}`, `<span class="text-primary">${value}</span>`)
    })
    return <span dangerouslySetInnerHTML={{ __html: result }} />
  }

  return (
    <section id="about" className="snap-section-tall select-none px-6 py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-12 flex items-center gap-4 text-2xl font-bold text-foreground md:text-3xl">
            <span className="font-mono text-lg text-primary md:text-xl">01.</span>
            {t.about.title}
            <span className="h-px flex-1 bg-border" />
          </h2>

          <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">{renderWithHighlights(t.about.p1, { stack: "PERN/MERN" })}</p>
              <p className="leading-relaxed">{renderWithHighlights(t.about.p2, { figma: "Figma", v0: "v0" })}</p>
              <p className="leading-relaxed">{renderWithHighlights(t.about.p3, { company: "Aoki Agentes IA" })}</p>
              <p className="leading-relaxed">
                {renderWithHighlights(t.about.p4, {
                  spanish: t.about.spanishLevel,
                  english: t.about.englishLevel,
                })}
              </p>
            </div>

            <div className="relative">
              <div className="group relative mx-auto aspect-square w-full max-w-[280px]">
                <div className="absolute inset-0 rounded-lg border-2 border-primary transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
                <div className="relative overflow-hidden rounded-lg">
                  <Image
                    src="/images/whatsapp-20image-202025-04-07-20at-2022.jpeg"
                    alt="Amparo Cardoso Bosch"
                    width={280}
                    height={280}
                    className="h-full w-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

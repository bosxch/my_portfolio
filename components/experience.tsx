"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Search, X, ChevronRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const experiences = [
  {
    id: "aoki",
    company: "AOKI Tecnología y Negocios",
    role: "Desarrolladora Full Stack",
    roleEn: "Full Stack Developer",
    period: "Agosto 2023 - Actualidad",
    periodEn: "August 2023 - Present",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "MySQL",
      "TypeScript",
      "Figma",
      "Google Analytics",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Git",
      "GitHub",
      "v0",
      "UX/UI",
      "APIs de terceros",
      "Prompts IA",
      "Scrum",
      "SEO",
    ],
    description: [
      "Desarrollo y mantenimiento de aplicaciones web end-to-end, integrando APIs y asegurando el correcto funcionamiento del sistema con mejoras continuas guiadas por datos.",
      "Construcción y mantenimiento de web/apps (React/Next.js, Node.js, MySQL) con foco en performance, estabilidad y escalabilidad.",
      "Coordinación con diseño (Figma, v0) para llevar wireframes a componentes productivos y pantallas completas.",
      "Mejoras UX/UI basadas en métricas (dashboards, Google Analytics): planteo de pantallas y micro-iteraciones de usabilidad.",
      "Desarrollo y mejora de prompts para asistentes y automatizaciones, afinando respuestas según uso real.",
    ],
    descriptionEn: [
      "Development and maintenance of end-to-end web applications, integrating APIs and ensuring proper system functionality with data-driven continuous improvements.",
      "Building and maintaining web/apps (React/Next.js, Node.js, MySQL) focusing on performance, stability and scalability.",
      "Coordination with design (Figma, v0) to transform wireframes into productive components and complete screens.",
      "UX/UI improvements based on metrics (dashboards, Google Analytics): screen design and usability micro-iterations.",
      "Development and improvement of prompts for assistants and automations, refining responses based on real usage.",
    ],
  },
  {
    id: "prototypes",
    company: "Prototypes Devs",
    role: "Desarrolladora Full Stack - Pasantía",
    roleEn: "Full Stack Developer - Internship",
    period: "Junio 2023 - Agosto 2023",
    periodEn: "June 2023 - August 2023",
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Tailwind CSS",
      "Figma",
      "HTML",
      "CSS",
      "Git",
      "GitHub",
      "Scrum",
    ],
    description: [
      "Participé en el desarrollo de aplicaciones web siguiendo diseños en Figma.",
      "Combiné trabajo frontend con React, Next.js y Tailwind con la creación de módulos back-end y endpoints en Node.js, Express.js, MongoDB y Mongoose.",
      "Prioricé rendimiento, seguridad y escalabilidad, dentro de un equipo remoto ágil.",
    ],
    descriptionEn: [
      "Participated in web application development following Figma designs.",
      "Combined frontend work with React, Next.js and Tailwind with backend module and endpoint creation in Node.js, Express.js, MongoDB and Mongoose.",
      "Prioritized performance, security and scalability within an agile remote team.",
    ],
  },
  {
    id: "microingenieria",
    company: "Microingeniería Aplicada SAS",
    role: "Desarrolladora Full Stack",
    roleEn: "Full Stack Developer",
    period: "Diciembre 2022 - Junio 2023",
    periodEn: "December 2022 - June 2023",
    technologies: [
      "React",
      "Redux",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Sequelize",
      "Material UI",
      "JavaScript",
      "HTML",
      "CSS",
      "Git",
      "GitHub",
      "Scrum",
    ],
    description: [
      "Desarrollo de aplicaciones web completas utilizando tecnologías front-end y back-end.",
      "Trabajo colaborativo con el equipo de desarrollo para diseñar soluciones efectivas y de alta calidad.",
      "Desarrollo de una Aplicación Web para Sorteos en stack PERN: ingreso de cupones via QR, sistema de administración de usuarios y tickets.",
      "Desarrollo del backend con Postgres, Sequelize, Express y Node. Frontend y Dashboard con ReactJS, Redux, Material UI.",
    ],
    descriptionEn: [
      "Development of complete web applications using front-end and back-end technologies.",
      "Collaborative work with the development team to design effective and high-quality solutions.",
      "Development of a Raffle Web Application in PERN stack: coupon entry via QR, user and ticket management system.",
      "Backend development with Postgres, Sequelize, Express and Node. Frontend and Dashboard with ReactJS, Redux, Material UI.",
    ],
  },
  {
    id: "freelance",
    company: "Freelance",
    role: "Desarrolladora Full Stack",
    roleEn: "Full Stack Developer",
    period: "Diciembre 2022 - Enero 2023",
    periodEn: "December 2022 - January 2023",
    technologies: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JavaScript", "HTML", "CSS", "Git", "GitHub"],
    description: [
      "Participé en el desarrollo en equipo de un sistema de gestión de tickets.",
      "Realicé el diseño y desarrollo de la base de datos y de las plantillas con Node.js, Express.js, MongoDB y Mongoose.",
      "Prioricé rendimiento, seguridad y escalabilidad dentro de un entorno remoto y ágil.",
    ],
    descriptionEn: [
      "Participated in team development of a ticket management system.",
      "Designed and developed the database and templates with Node.js, Express.js, MongoDB and Mongoose.",
      "Prioritized performance, security and scalability within a remote and agile environment.",
    ],
  },
]

export { experiences }

const featuredTechnologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "Git",
  "Figma",
]

function getAllTechnologies() {
  const techCount: Record<string, number> = {}
  experiences.forEach((exp) => {
    exp.technologies.forEach((tech) => {
      techCount[tech] = (techCount[tech] || 0) + 1
    })
  })
  return Object.entries(techCount)
    .sort((a, b) => b[1] - a[1])
    .map(([tech]) => tech)
}

interface ExperienceProps {
  highlightedTech?: string | null
  onClearHighlight?: () => void
  onTechSelect?: (tech: string) => void
}

export function Experience({ highlightedTech, onClearHighlight, onTechSelect }: ExperienceProps) {
  const ref = useRef(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState(0)
  const [showTechSearch, setShowTechSearch] = useState(false)
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [hasHiddenMatchRight, setHasHiddenMatchRight] = useState(false)
  const { language, t } = useI18n()

  const allTechnologies = getAllTechnologies()

  useEffect(() => {
    if (highlightedTech) {
      const firstMatchIndex = experiences.findIndex((exp) =>
        exp.technologies.some((tech) => tech.toLowerCase() === highlightedTech.toLowerCase()),
      )
      if (firstMatchIndex !== -1) {
        setActiveTab(firstMatchIndex)
      }
    }
  }, [highlightedTech])

  const handleTechClick = (tech: string) => {
    if (highlightedTech?.toLowerCase() === tech.toLowerCase() && onClearHighlight) {
      onClearHighlight()
    } else if (onTechSelect) {
      onTechSelect(tech)
      const firstMatchIndex = experiences.findIndex((exp) =>
        exp.technologies.some((t) => t.toLowerCase() === tech.toLowerCase()),
      )
      if (firstMatchIndex !== -1) {
        setActiveTab(firstMatchIndex)
      }
    }
    setShowTechSearch(false)
  }

  const isFeatured = (tech: string) => {
    return featuredTechnologies.some((ft) => ft.toLowerCase() === tech.toLowerCase())
  }

  const currentExp = experiences[activeTab]
  const role = language === "es" ? currentExp.role : currentExp.roleEn
  const period = language === "es" ? currentExp.period : currentExp.periodEn
  const description = language === "es" ? currentExp.description : currentExp.descriptionEn

  useEffect(() => {
    const container = tabsContainerRef.current
    if (!container) return

    const checkScroll = () => {
      const canScroll = container.scrollWidth > container.clientWidth
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10
      setCanScrollRight(canScroll && !isAtEnd)

      // Check if there are hidden experiences to the right with the highlighted tech
      if (highlightedTech && canScroll && !isAtEnd) {
        const buttons = container.querySelectorAll("button")
        let foundHiddenMatch = false

        buttons.forEach((button, index) => {
          const buttonRight = button.offsetLeft + button.offsetWidth
          const containerVisibleRight = container.scrollLeft + container.clientWidth

          // If button is not fully visible (to the right)
          if (buttonRight > containerVisibleRight) {
            const exp = experiences[index]
            if (exp && exp.technologies.some((tech) => tech.toLowerCase() === highlightedTech.toLowerCase())) {
              foundHiddenMatch = true
            }
          }
        })

        setHasHiddenMatchRight(foundHiddenMatch)
      } else {
        setHasHiddenMatchRight(false)
      }
    }

    checkScroll()
    container.addEventListener("scroll", checkScroll)
    window.addEventListener("resize", checkScroll)

    return () => {
      container.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [highlightedTech])

  return (
    <section id="experience" className="snap-section-tall select-none px-6 py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-4 text-2xl font-bold text-foreground md:text-3xl">
              <span className="font-mono text-lg text-primary md:text-xl">02.</span>
              {t.experience.title}
              <span className="hidden h-px flex-1 bg-border sm:block" />
            </h2>
            <button
              onClick={() => setShowTechSearch(!showTechSearch)}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary hover:text-primary"
            >
              {showTechSearch ? <X size={16} /> : <Search size={16} />}
              {language === "es" ? "Buscar por tecnología" : "Search by technology"}
            </button>
          </div>

          <AnimatePresence>
            {showTechSearch && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 overflow-hidden"
              >
                <div className="rounded-lg border border-border bg-card/50 p-4">
                  <div className="flex flex-wrap gap-2">
                    {allTechnologies.map((tech) => {
                      const isActive = highlightedTech?.toLowerCase() === tech.toLowerCase()
                      const featured = isFeatured(tech)
                      return (
                        <div
                          key={tech}
                          onClick={() => handleTechClick(tech)}
                          onMouseEnter={() => setHoveredTech(tech)}
                          onMouseLeave={() => setHoveredTech(null)}
                          className={`relative cursor-pointer rounded-full px-3 py-1 text-sm transition-all ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary"
                          } ${featured && !isActive ? "border-sweep" : ""}`}
                        >
                          {tech}
                          {hoveredTech === tech && (
                            <div className="absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-3 py-1.5 text-xs text-foreground shadow-lg">
                              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-border bg-card" />
                              {language === "es" ? "Ver en experiencias" : "View in experiences"}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col gap-6 md:flex-row md:gap-10">
            {/* Tabs */}
            <div className="relative">
              <div
                ref={tabsContainerRef}
                className="flex overflow-x-auto border-b border-border md:flex-col md:border-b-0 md:border-l"
              >
                {experiences.map((exp, i) => {
                  const hasHighlightedTech = highlightedTech
                    ? exp.technologies.some((tech) => tech.toLowerCase() === highlightedTech.toLowerCase())
                    : false

                  return (
                    <button
                      key={exp.company}
                      onClick={() => setActiveTab(i)}
                      className={`relative cursor-pointer whitespace-nowrap px-4 py-3 text-left text-sm font-medium transition-all md:border-l-2 md:border-b-0 ${
                        activeTab === i
                          ? "border-b-2 border-primary bg-muted/50 text-primary md:border-l-2"
                          : "border-b-2 border-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground md:border-l-2"
                      }`}
                    >
                      <span className="pr-6">{exp.company}</span>
                      {hasHighlightedTech && (
                        <span className="absolute right-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary" />
                      )}
                    </button>
                  )
                })}
              </div>
              <AnimatePresence>
                {canScrollRight && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute right-0 top-0 flex h-full items-center bg-gradient-to-l from-background via-background/80 to-transparent pl-8 pr-1 md:hidden"
                  >
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.2, ease: "easeInOut" }}
                      className="relative flex items-center gap-1 rounded-full bg-primary/20 px-2 py-1"
                    >
                      <ChevronRight size={16} className="text-primary" />
                      {hasHiddenMatchRight && (
                        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="min-h-[300px] flex-1"
            >
              <h3 className="mb-1 text-lg font-semibold text-foreground md:text-xl">
                {role} <span className="text-primary">@ {currentExp.company}</span>
              </h3>
              <p className="mb-4 font-mono text-sm text-muted-foreground">{period}</p>

              <div className="mb-6 flex flex-wrap gap-2">
                {currentExp.technologies.map((tech) => {
                  const isHighlighted = highlightedTech?.toLowerCase() === tech.toLowerCase()
                  const featured = isFeatured(tech)
                  return (
                    <span
                      key={tech}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        isHighlighted
                          ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : featured
                            ? "border-sweep bg-muted text-muted-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {tech}
                    </span>
                  )
                })}
              </div>

              <ul className="space-y-3">
                {description.map((item, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground">
                    <span className="mt-1.5 text-primary">▹</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Github, Folder } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const projects = [
  {
    id: "media-naranja",
    title: "Media Naranja App Concurso",
    description:
      "Desarrollo de una aplicación Full Stack para Almacenes La Media Naranja en Colombia, que permite el registro de los usuarios que reciben cupones por compras, cuenta con un dashboard de administración para la gestión de usuarios, tickets y posteriormente para la selección de ganadores.",
    descriptionEn:
      "Full Stack application development for Almacenes La Media Naranja in Colombia, allowing registration of users who receive coupons for purchases, with an admin dashboard for user management, tickets, and winner selection.",
    technologies: [
      "React",
      "Redux",
      "Material UI",
      "JavaScript",
      "PostgreSQL",
      "Sequelize",
      "Express",
      "Node.js",
      "HTML",
      "CSS",
      "Git",
      "GitHub",
    ],
    github: "https://github.com/Hermes91/MediaNaranja-Front",
    image: "/raffle-app-dashboard-orange-theme.jpg",
  },
  {
    id: "vivero-henry",
    title: "Vivero Henry",
    description:
      "E-commerce de un vivero en STACK PERN. Desarrollado bajo la metodología SCRUM, implementando tecnologías como Toastify, Landbot, PayPal Sandbox, Fortawesome, LocalStorage, Auth0, FormSpark, Cookie-parser, CORS, dotenv, jsonwebtoken, Cloudinary.",
    descriptionEn:
      "Plant nursery e-commerce in PERN STACK. Developed under SCRUM methodology, implementing technologies like Toastify, Landbot, PayPal Sandbox, Fortawesome, LocalStorage, Auth0, FormSpark, Cookie-parser, CORS, dotenv, jsonwebtoken, Cloudinary.",
    technologies: [
      "React",
      "Redux",
      "Bootstrap",
      "Material UI",
      "Express",
      "PostgreSQL",
      "Sequelize",
      "Node.js",
      "HTML",
      "CSS",
      "Git",
      "GitHub",
    ],
    github: "https://github.com/bosxch/PF-Henry",
    image: "/plant-nursery-ecommerce-green-theme.jpg",
  },
  {
    id: "best-friend-finder",
    title: "Best Friend Finder",
    description:
      "Proyecto Individual de la temática Dogs, realizado en el bootcamp Henry. Este proyecto consiste en una single page application donde el usuario puede: Buscar razas, aplicar filtros y ordenamientos combinados, y crear su propia raza.",
    descriptionEn:
      "Individual project about Dogs, done at Henry bootcamp. This project is a single page application where users can: Search breeds, apply combined filters and sorting, and create their own breed.",
    technologies: ["React", "Redux", "CSS", "HTML", "Node.js", "Express", "Sequelize", "PostgreSQL", "Git", "GitHub"],
    github: "https://github.com/bosxch/PI-HenryDogs",
    image: "/dog-breeds-finder-app-blue-theme.jpg",
  },
]

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

interface ProjectsProps {
  onTechClick: (tech: string) => void
  highlightedTech?: string | null
}

export function Projects({ onTechClick, highlightedTech }: ProjectsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredTech, setHoveredTech] = useState<{ projectId: string; tech: string } | null>(null)
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())
  const { language } = useI18n()

  const isFeatured = (tech: string) => {
    return featuredTechnologies.some((ft) => ft.toLowerCase() === tech.toLowerCase())
  }

  const toggleProjectExpand = (projectId: string) => {
    setExpandedProjects((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }

  return (
    <section id="projects" className="snap-section select-none px-6 py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-12 flex items-center gap-4 text-2xl font-bold text-foreground md:text-3xl">
            <span className="font-mono text-lg text-primary md:text-xl">03.</span>
            {language === "es" ? "Proyectos" : "Projects"}
            <span className="h-px flex-1 bg-border" />
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => {
              const hasHighlightedTech = highlightedTech
                ? project.technologies.some((tech) => tech.toLowerCase() === highlightedTech.toLowerCase())
                : false
              const isExpanded = expandedProjects.has(project.id)
              const visibleTechs = isExpanded ? project.technologies : project.technologies.slice(0, 6)
              const hiddenCount = project.technologies.length - 6

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`card-hover group flex flex-col rounded-lg border bg-card/50 p-6 ${
                    hasHighlightedTech ? "border-primary" : "border-border"
                  }`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Folder className="text-primary" size={40} />
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-muted-foreground transition-colors hover:text-primary"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>

                  <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {language === "es" ? project.description : project.descriptionEn}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {visibleTechs.map((tech) => {
                      const featured = isFeatured(tech)
                      const isHighlighted = highlightedTech?.toLowerCase() === tech.toLowerCase()

                      return (
                        <div
                          key={tech}
                          onClick={() => {
                            onTechClick(tech)
                          }}
                          onMouseEnter={() => setHoveredTech({ projectId: project.id, tech })}
                          onMouseLeave={() => setHoveredTech(null)}
                          className={`relative cursor-pointer rounded-full px-2 py-0.5 text-xs transition-all ${
                            isHighlighted
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary"
                          } ${featured && !isHighlighted ? "border-sweep" : ""}`}
                        >
                          {tech}
                          {hoveredTech?.projectId === project.id && hoveredTech?.tech === tech && (
                            <div className="absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-3 py-1.5 text-xs text-foreground shadow-lg">
                              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-border bg-card" />
                              {language === "es" ? "Ver en experiencias" : "View in experiences"}
                            </div>
                          )}
                        </div>
                      )
                    })}
                    {hiddenCount > 0 && !isExpanded && (
                      <button
                        onClick={() => toggleProjectExpand(project.id)}
                        className="cursor-pointer rounded-full bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-primary/20 hover:text-primary"
                      >
                        +{hiddenCount}
                      </button>
                    )}
                    {isExpanded && hiddenCount > 0 && (
                      <button
                        onClick={() => toggleProjectExpand(project.id)}
                        className="cursor-pointer rounded-full bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-primary/20 hover:text-primary"
                      >
                        {language === "es" ? "Ver menos" : "Show less"}
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

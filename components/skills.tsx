"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Download } from "lucide-react"
import { experiences } from "./experience"
import { useI18n } from "@/lib/i18n"

const skillCategories = [
  {
    title: "Frontend",
    titleEn: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Redux", "Material UI"],
  },
  {
    title: "Backend",
    titleEn: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "MongoDB", "PostgreSQL", "MySQL", "Sequelize", "Mongoose"],
  },
  {
    title: "Herramientas",
    titleEn: "Tools",
    skills: ["Git", "GitHub", "Figma", "v0", "Google Analytics", "Scrum"],
  },
  {
    title: "Otros",
    titleEn: "Others",
    skills: ["SEO", "UX/UI", "APIs de terceros", "Prompts IA"],
  },
]

const featuredSkills = [
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

const education = [
  {
    title: "Tecnicatura Universitaria en Programación",
    titleEn: "University Degree in Programming",
    institution: "Universidad Tecnológica Nacional",
    period: "Marzo 2025 - Marzo 2027",
    periodEn: "March 2025 - March 2027",
    description: "Formación técnica superior en programación informática con enfoque en desarrollo de software.",
    descriptionEn: "Higher technical training in computer programming focused on software development.",
    tools: ["Programación", "Algoritmos", "Estructuras de datos"],
  },
  {
    title: "Desarrollador Web Full Stack",
    titleEn: "Full Stack Web Developer",
    institution: "Henry Bootcamp",
    period: "Agosto 2022 - Febrero 2023",
    periodEn: "August 2022 - February 2023",
    description: "+800 horas de formación intensiva en desarrollo web full stack con tecnologías modernas.",
    descriptionEn: "+800 hours of intensive training in full stack web development with modern technologies.",
    certificateUrl:
      "https://certificates.soyhenry.com/new-cert?id=e9ae6f73d48f37bb49315dd56d62cd1c98bea98c14a6b50e6f200d20f4b50a2a",
    tools: ["JavaScript", "React", "Redux", "Node.js", "Express.js", "PostgreSQL", "Sequelize"],
  },
  {
    title: "Programación desde cero",
    titleEn: "Programming from Scratch",
    institution: "Egg Cooperation",
    period: "2022",
    periodEn: "2022",
    description: "Fundamentos de programación y primeros pasos en el mundo tech.",
    descriptionEn: "Programming fundamentals and first steps in the tech world.",
    certificateUrl: "https://eggeducacion.com/es-AR/certificates/656259e3ae4f7a000defdbbe",
    tools: ["Lógica de programación", "Fundamentos"],
  },
]

const certifications = [
  {
    title: "JavaScript Algorithms and Data Structures",
    titleEn: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    url: "https://www.freecodecamp.org/certification/bosxch/javascript-algorithms-and-data-structures",
    tools: ["JavaScript", "Algoritmos", "Estructuras de datos"],
  },
  {
    title: "Front End Development Libraries",
    titleEn: "Front End Development Libraries",
    issuer: "freeCodeCamp",
    url: "https://www.freecodecamp.org/certification/bosxch/front-end-development-libraries",
    tools: ["React", "Redux", "Bootstrap", "jQuery", "Sass"],
  },
  {
    title: "Fundamentos profesionales del desarrollo de software",
    titleEn: "Professional Software Development Fundamentals",
    issuer: "Microsoft & LinkedIn",
    url: "https://www.linkedin.com/learning/certificates/3b5e7e5df3f46f90de6c89e15d66f2b9be2e79a3ef54e88c49b0cf1a8c0b6c39",
    tools: ["Desarrollo de software", "Metodologías"],
  },
  {
    title: "EF SET English Certificate (C1 Advanced)",
    titleEn: "EF SET English Certificate (C1 Advanced)",
    issuer: "EF Education First",
    score: "63/100",
    url: "https://www.efset.org/cert/DYDj9i",
    tools: ["Inglés C1", "Comunicación"],
  },
]

interface SkillsProps {
  onSkillClick: (skill: string) => void
  highlightedTech?: string | null
}

export function Skills({ onSkillClick, highlightedTech }: SkillsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const { language, t } = useI18n()

  const handleSkillClick = (skill: string) => {
    const hasExperience = experiences.some((exp) =>
      exp.technologies.some((tech) => tech.toLowerCase() === skill.toLowerCase()),
    )

    if (hasExperience) {
      onSkillClick(skill)
      const experienceSection = document.getElementById("experience")
      if (experienceSection) {
        experienceSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const skillHasExperience = (skill: string) => {
    return experiences.some((exp) => exp.technologies.some((tech) => tech.toLowerCase() === skill.toLowerCase()))
  }

  const isFeatured = (skill: string) => {
    return featuredSkills.some((fs) => fs.toLowerCase() === skill.toLowerCase())
  }

  return (
    <section id="skills" className="snap-section select-none px-6 py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-12 flex items-center gap-4 text-2xl font-bold text-foreground md:text-3xl">
            <span className="font-mono text-lg text-primary md:text-xl">04.</span>
            {t.skills.title}
            <span className="h-px flex-1 bg-border" />
          </h2>

          <div className="grid gap-8 sm:grid-cols-2">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="card-hover rounded-lg border border-border bg-card/50 p-6"
              >
                <h3 className="mb-4 font-mono text-lg font-semibold text-primary">
                  {language === "es" ? category.title : category.titleEn}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const hasExp = skillHasExperience(skill)
                    const featured = isFeatured(skill)
                    const isHighlighted = highlightedTech?.toLowerCase() === skill.toLowerCase()

                    return (
                      <li
                        key={skill}
                        onClick={() => hasExp && handleSkillClick(skill)}
                        onMouseEnter={() => hasExp && setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`relative rounded-full px-3 py-1 text-sm transition-colors ${
                          isHighlighted
                            ? "bg-primary text-primary-foreground"
                            : hasExp
                              ? "cursor-pointer bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary"
                              : "bg-muted/50 text-muted-foreground/70"
                        } ${featured && !isHighlighted ? "border-sweep" : ""}`}
                      >
                        {skill}
                        {hoveredSkill === skill && hasExp && (
                          <div className="absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-3 py-1.5 text-xs text-foreground shadow-lg">
                            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-border bg-card" />
                            {language === "es" ? "Ver en experiencias" : "View in experiences"}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12"
          >
            <h3 className="mb-6 font-mono text-lg font-semibold text-primary">{t.skills.education}</h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="card-hover rounded-lg border border-border bg-card/50 p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{language === "es" ? edu.title : edu.titleEn}</h4>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution} • {language === "es" ? edu.period : edu.periodEn}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {language === "es" ? edu.description : edu.descriptionEn}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {edu.tools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    {edu.certificateUrl && (
                      <a
                        href={edu.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 cursor-pointer rounded-md border border-border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        aria-label={t.skills.viewCertificate}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12"
          >
            <h3 className="mb-6 font-mono text-lg font-semibold text-primary">{t.skills.certifications}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  className="card-hover rounded-lg border border-border bg-card/50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground">
                        {language === "es" ? cert.title : cert.titleEn}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {cert.issuer}
                        {cert.score && <span className="ml-2 text-primary">• {cert.score}</span>}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {cert.tools.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 cursor-pointer rounded-md border border-border p-1.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        aria-label={t.skills.viewCertificate}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-12 flex justify-center"
          >
            <a
              href="/cv-amparo-cardoso-bosch.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border-sweep inline-flex cursor-pointer items-center gap-2 rounded-full bg-muted px-6 py-3 font-medium text-foreground transition-colors hover:bg-primary/20 hover:text-primary"
            >
              <Download size={18} />
              {language === "es" ? "Descargar CV" : "Download CV"}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

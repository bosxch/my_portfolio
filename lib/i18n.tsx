"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "es" | "en"

interface Translations {
  nav: {
    about: string
    experience: string
    skills: string
    contact: string
  }
  hero: {
    greeting: string
    headline: string
    description: string
    yearsExp: string
    performance: string
    cleanCode: string
    cta: string
  }
  about: {
    title: string
    p1: string
    p2: string
    p3: string
    p4: string
    spanishLevel: string
    englishLevel: string
  }
  experience: {
    title: string
    present: string
  }
  skills: {
    title: string
    education: string
    certifications: string
    viewCertificate: string
    viewExperience: string
  }
  contact: {
    title: string
    subtitle: string
    description: string
    email: string
    sendEmail: string
    whatsappMessage: string
  }
  footer: {
    designedBy: string
    rights: string
  }
}

const translations: Record<Language, Translations> = {
  es: {
    nav: {
      about: "Sobre mí",
      experience: "Experiencia",
      skills: "Habilidades",
      contact: "Contacto",
    },
    hero: {
      greeting: "Hola, mi nombre es",
      headline: "Construyo experiencias web.",
      description:
        "Full Stack Developer con {years} construyendo aplicaciones web escalables en PERN/MERN. Especializada en crear soluciones que combinan {performance}, {ux} y {cleanCode}.",
      yearsExp: "+3 años de experiencia",
      performance: "performance",
      cleanCode: "código limpio",
      cta: "Contactame",
    },
    about: {
      title: "Sobre mí",
      p1: "Soy desarrolladora Full Stack con más de 3 años de experiencia construyendo aplicaciones web escalables. Me especializo en el stack {stack}, integrando APIs, diseñando y manteniendo backends robustos y frontends performantes.",
      p2: "Trabajo codo a codo con equipos de diseño usando {figma} y {v0}, iterando sobre métricas con dashboards y Google Analytics para priorizar impacto. Tengo experiencia en SEO y analítica de eventos.",
      p3: "Actualmente trabajo en {company}, donde desarrollo y mantengo aplicaciones web end-to-end, coordinando con equipos externos para integraciones entre sistemas.",
      p4: "Hablo {spanish} e {english}, lo que me permite colaborar en equipos internacionales.",
      spanishLevel: "español nativo",
      englishLevel: "inglés avanzado",
    },
    experience: {
      title: "Experiencia",
      present: "Actualidad",
    },
    skills: {
      title: "Habilidades",
      education: "Educación",
      certifications: "Licencias y Certificaciones",
      viewCertificate: "Ver certificado",
      viewExperience: "Ver experiencia con esta tecnología",
    },
    contact: {
      title: "¿Qué sigue?",
      subtitle: "Hablemos",
      description:
        "Actualmente estoy abierta a nuevas oportunidades. Si tenés un proyecto en mente, una propuesta laboral, o simplemente querés saludar, mi bandeja de entrada siempre está abierta.",
      email: "Enviar email",
      sendEmail: "Enviar email",
      whatsappMessage: "Hola Amparo! Vi tu portfolio y me gustaría contactarte.",
    },
    footer: {
      designedBy: "Diseñado y desarrollado con",
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      skills: "Skills",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, my name is",
      headline: "I build web experiences.",
      description:
        "Full Stack Developer with {years} building scalable web applications in PERN/MERN. Specialized in creating solutions that combine {performance}, {ux} and {cleanCode}.",
      yearsExp: "+3 years of experience",
      performance: "performance",
      cleanCode: "clean code",
      cta: "Contact me",
    },
    about: {
      title: "About me",
      p1: "I'm a Full Stack Developer with over 3 years of experience building scalable web applications. I specialize in the {stack} stack, integrating APIs, designing and maintaining robust backends and performant frontends.",
      p2: "I work closely with design teams using {figma} and {v0}, iterating on metrics with dashboards and Google Analytics to prioritize impact. I have experience in SEO and event analytics.",
      p3: "I currently work at {company}, where I develop and maintain end-to-end web applications, coordinating with external teams for system integrations.",
      p4: "I speak {spanish} and {english}, which allows me to collaborate in international teams.",
      spanishLevel: "native Spanish",
      englishLevel: "advanced English",
    },
    experience: {
      title: "Experience",
      present: "Present",
    },
    skills: {
      title: "Skills",
      education: "Education",
      certifications: "Licenses & Certifications",
      viewCertificate: "View certificate",
      viewExperience: "View experience with this technology",
    },
    contact: {
      title: "What's next?",
      subtitle: "Let's talk",
      description:
        "I'm currently open to new opportunities. If you have a project in mind, a job proposal, or just want to say hi, my inbox is always open.",
      email: "Send email",
      sendEmail: "Send email",
      whatsappMessage: "Hi Amparo! I saw your portfolio and I'd like to get in touch.",
    },
    footer: {
      designedBy: "Designed and developed with",
      rights: "All rights reserved.",
    },
  },
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith("es")) {
      setLanguage("es")
    } else {
      setLanguage("en")
    }
  }, [])

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: translations[language] }}>{children}</I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

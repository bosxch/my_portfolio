"use client"

import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { useI18n } from "@/lib/i18n"

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="select-none border-t border-border px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <motion.a
              href="https://github.com/bosxch"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="cursor-pointer text-muted-foreground transition-colors hover:text-primary"
              aria-label="GitHub"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/amparo-cardoso-bosch"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="cursor-pointer text-muted-foreground transition-colors hover:text-primary"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              href="mailto:amparocardosobosch@gmail.com"
              whileHover={{ y: -3 }}
              className="cursor-pointer text-muted-foreground transition-colors hover:text-primary"
              aria-label="Email"
            >
              <Mail size={20} />
            </motion.a>
          </div>

          {/* Credits */}
          <div className="text-center">
            <p className="flex items-center justify-center gap-1 font-mono text-xs text-muted-foreground">
              {t.footer.designedBy} <Heart size={12} className="text-primary" /> por Amparo Cardoso Bosch
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

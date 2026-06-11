"use client";

import React from "react";
import { motion } from "framer-motion";

interface ContactProps {
  email: string;
  phone: string;
  socials: Record<string, string>;
}

export default function Contact({ email, phone, socials }: ContactProps) {
  const displayEmail = email || "aravasu.r@gmail.com";
  const displayPhone = phone || "+919876543210";

  // Parent stagger variants
  const footerRowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const footerItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <section
      id="contact"
      className="container px-4 md:px-8 py-12 md:py-16 w-full overflow-hidden bg-transparent select-none mx-auto"
      data-role="section"
      data-section="contact"
    >
      <div className="flex flex-col w-full px-2 sm:px-0">
        {/* Section tag header */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="a-tag font-mono text-[9px] tracking-[0.3em] text-[#f73a0b] uppercase mb-4"
        >
          (Contact)
        </motion.h2>

        {/* Narrative bio */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="a-desc-lg font-body text-sm md:text-md text-white/50 max-w-[500px] leading-relaxed mb-10"
        >
          Let&apos;s work together. If you have an idea, a project, or simply want to talk about visuals, pace, and editing, feel free to reach out. You can email me directly or drop a hi through other channels.
        </motion.p>

        {/* Mobile-only social links header (With padding to prevent edge touching) */}
        <div className="flex sm:hidden items-center justify-between pb-6 gap-3 border-b border-white/5 mb-6 px-1.5">
          {socials.Instagram && (
            <a
              href={socials.Instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[9px] tracking-[0.2em] a-text-link uppercase"
              data-mouse="link"
            >
              INSTAGRAM
            </a>
          )}
          {socials.LinkedIn && (
            <a
              href={socials.LinkedIn}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[9px] tracking-[0.2em] a-text-link uppercase"
              data-mouse="link"
            >
              LINKEDIN
            </a>
          )}
        </div>

        {/* Giant full-width responsive HTML text email link (Optimized responsive text to avoid SVG compression) */}
        <motion.a
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
          href={`mailto:${displayEmail}?subject=Video%20Editing%20Query`}
          target="_blank"
          rel="noreferrer noopener"
          className="block w-full pb-6 border-b border-white/10 hover:border-[#f73a0b] transition-colors duration-300 font-display text-[6.2vw] sm:text-5xl md:text-6xl lg:text-7xl text-[#e1e6e1] hover:text-[#f73a0b] uppercase tracking-wide break-all leading-[1.1]"
          data-mouse="link"
        >
          {displayEmail}
        </motion.a>

        {/* Secondary Contact Channels row with stagger entrance reveals */}
        <motion.div 
          variants={footerRowVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 pt-8 w-full px-1.5 sm:px-0"
        >
          {/* Desktop-only Instagram link */}
          {socials.Instagram ? (
            <motion.a
              variants={footerItemVariants}
              href={socials.Instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[9px] tracking-[0.25em] a-text-link uppercase hidden sm:block"
              data-mouse="link"
            >
              INSTAGRAM
            </motion.a>
          ) : (
            <div className="hidden sm:block" />
          )}

          {/* Primary WhatsApp / Phone connection link */}
          <motion.div 
            variants={footerItemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-start sm:justify-center"
          >
            {displayPhone && (
              <a
                href={`https://wa.me/${String(displayPhone).replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-[9px] tracking-[0.2em] a-text-link uppercase"
                data-mouse="link"
              >
                WHATSAPP ({displayPhone})
              </a>
            )}
          </motion.div>

          {/* Desktop-only LinkedIn link */}
          {socials.LinkedIn ? (
            <motion.a
              variants={footerItemVariants}
              href={socials.LinkedIn}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-[9px] tracking-[0.25em] a-text-link uppercase hidden sm:block"
              data-mouse="link"
            >
              LINKEDIN
            </motion.a>
          ) : (
            <div className="hidden sm:block" />
          )}
        </motion.div>
      </div>
    </section>
  );
}

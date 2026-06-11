"use client";

import React from "react";
import { motion } from "framer-motion";

interface ServiceItem {
  title: string;
  description: string;
}

export default function Services({ services }: { services: ServiceItem[] }) {
  // If no services provided, fallback to a clean premium list
  const displayServices = services.length > 0 ? services : [
    { title: "YouTube Editing", description: "High-retention, engaging edits with premium pacing, color, and sound design." },
    { title: "Reels & Shorts", description: "Fast-paced, hook-driven vertical edits designed to trigger algorithm virality." },
    { title: "Commercial Editing", description: "High-production-value brand ads and cinematic product showcases." },
    { title: "Color Grading", description: "Hollywood-grade cinematic color processing and exposure calibration." },
  ];

  // Animation variants for stagger-revealing list items on scroll
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <section
      id="services"
      className="container-fluid px-0 py-12 md:py-16 w-full overflow-hidden bg-transparent select-none"
    >
      <div className="w-full flex flex-col justify-center">
        {/* Section title */}
        <div className="container px-4 md:px-8 mb-10 text-center md:text-left">
          <h2 className="a-tag font-mono text-[9px] tracking-[0.3em] text-[#f73a0b] uppercase mb-4">
            (Services)
          </h2>
          <h3 className="a-section-title-lg font-display text-4xl md:text-6xl lg:text-7xl text-[#e1e6e1] font-bold uppercase leading-none tracking-normal">
            What I Do
          </h3>
        </div>

        {/* ── DESKTOP SERVICES LIST (Hidden on mobile) ── */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="hidden md:flex w-full flex-col border-t border-[#e1e6e130] mt-6"
        >
          {displayServices.map((service, idx) => (
            <div
              key={idx}
              className="a-services-row-wrap relative w-full overflow-hidden group transition-all duration-300 cursor-pointer"
              data-mouse="link"
            >
              {/* Internal layout matching Denny's grid style */}
              <div className="a-services-row grid py-6 md:py-10 border-b border-[#e1e6e130] group-last:border-b-0 container px-4 md:px-8 align-items-center">
                <span className="a-desc-lg font-mono text-[11px] tracking-widest text-[#e1e6e160] group-hover:text-black transition-colors duration-300">
                  #{String(idx + 1).padStart(2, "0")}
                </span>
                <span className="a-title-lg font-body text-lg md:text-2xl text-[#e1e6e1] group-hover:text-black group-hover:font-medium transition-colors duration-300 ml-6 md:ml-12">
                  {service.title}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── MOBILE SERVICES LIST (Hidden on desktop - custom layouts with text) ── */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex md:hidden w-full flex-col border-t border-[#e1e6e120] px-4"
        >
          {displayServices.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="border-b border-[#e1e6e115] py-6 flex flex-col gap-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[#f73a0b] font-bold">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-base text-[#e1e6e1] font-semibold tracking-wide uppercase">
                    {service.title}
                  </span>
                </div>
                {/* Visual accent dot indicating a color grade point */}
                <span className="w-1.5 h-1.5 rounded-full bg-[#f73a0b]/80 shadow-[0_0_8px_#f73a0b]" />
              </div>
              
              {/* Detailed descriptive paragraph shown by default on mobile for depth */}
              <p className="font-body text-xs text-white/50 leading-relaxed pl-7 pr-3">
                {service.description || "Premium post-production service delivering polished visual assets for brands and creators."}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Embedded inline CSS for customized grid alignment within layout */}
      <style jsx global>{`
        .a-services-row {
          grid-template-columns: 8rem 1fr;
        }
        @media (max-width: 768px) {
          .a-services-row {
            grid-template-columns: 4rem 1fr;
          }
        }
      `}</style>
    </section>
  );
}

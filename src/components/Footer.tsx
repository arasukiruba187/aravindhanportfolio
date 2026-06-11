"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer({ name }: { name: string }) {
  const displayName = name || "ARAVINDHAN R";

  return (
    <footer
      className="container-fluid px-4 md:px-8 py-8 md:py-12 relative w-full bg-transparent border-t border-white/5 select-none overflow-hidden"
    >
      {/* ── Footer Contents ── */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Footer Meta Row (Coordinates, Roles, Admin, Copyrights) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 pt-2 text-white/40">
          <span className="font-mono text-[8px] md:text-[9px] tracking-[0.25em] uppercase">
            (India, Available Worldwide)
          </span>
          <span className="font-body text-[9px] md:text-[10px] tracking-normal font-light">
            Cinematic Video Editor &amp; Colorist
          </span>
          <a
            href="/admin"
            className="font-mono text-[8px] md:text-[9px] tracking-[0.25em] uppercase text-white/20 hover:text-[#f73a0b] transition-colors"
            data-mouse="link"
          >
            [ADMIN CONTROL]
          </a>
          <span className="font-mono text-[8px] md:text-[9px] tracking-[0.25em] uppercase">
            (2026 © All rights reserved)
          </span>
        </div>
      </div>
    </footer>
  );
}

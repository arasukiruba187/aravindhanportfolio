"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { parseMediaUrl } from "@/lib/parseMediaUrl";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  youtubeUrl?: string;
  thumbnailUrl: string;
  description: string;
  isFeatured: boolean;
}

export default function FeaturedWork({ items, onPlay }: { items: PortfolioItem[]; onPlay: (i: PortfolioItem) => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleMouseEnter = (id: string) => {
    setHoveredId(id);
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = (id: string) => {
    setHoveredId(null);
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section
      id="works"
      className="container-fluid px-4 md:px-8 py-12 md:py-16 w-full bg-transparent select-none"
      data-role="section"
      data-section="works"
    >
      {/* ── Section Tag and Title ── */}
      <h2
        className="a-tag font-mono text-[9px] tracking-[0.3em] text-[#f73a0b] uppercase mb-4"
        style={{ color: "var(--primary)" }}
      >
        (Works)
      </h2>

      {/* ── DESKTOP VIEW GRID (Hidden on mobile) ── */}
      <div className="hidden md:block">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-16 gap-4">
          <h3 className="a-section-title-lg font-display text-4xl md:text-6xl lg:text-7xl text-[#e1e6e1] font-bold uppercase leading-none tracking-normal">
            Selected Projects
          </h3>
          <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase hidden sm:inline">
            [{items.length} Files]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto w-full">
          {items.map((item, idx) => {
            const durationFallback = "00:00:20"; // clean baseline cinematic code

            return (
              <motion.div
                key={item.id}
                className="w-full flex flex-col group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: (idx % 2) * 0.15, ease: [0.215, 0.61, 0.355, 1] as const }}
              >
                {/* Card Header details */}
                <div className="w-full flex items-end justify-between pb-3.5 border-b border-white/5">
                  <span className="font-mono text-[9px] tracking-widest text-[#e1e6e1a0]">
                    {String(idx + 1).padStart(3, "0")}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-white/30 uppercase">
                    {durationFallback}
                  </span>
                </div>

                {/* Visual Frame Block */}
                <div
                  className="a-product-card w-full relative overflow-hidden aspect-video bg-[#181818] cursor-pointer mt-4"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={() => handleMouseLeave(item.id)}
                  onClick={() => onPlay(item)}
                  data-mouse="video"
                >
                  {/* Corner SVG Brackets */}
                  <svg className="a-work-hover-indicator absolute z-20 pointer-events-none" width="22" height="22" viewBox="0 0 25 25" fill="none" style={{ top: 8, left: 8 }}><path d="M0.5 24.5V0.5H24.5" stroke="#e1e6e1" strokeWidth="1.2" /></svg>
                  <svg className="a-work-hover-indicator absolute z-20 pointer-events-none" width="22" height="22" viewBox="0 0 25 25" fill="none" style={{ top: 8, right: 8 }}><path d="M0 0.5H24V24.5" stroke="#e1e6e1" strokeWidth="1.2" /></svg>
                  <svg className="a-work-hover-indicator absolute z-20 pointer-events-none" width="22" height="22" viewBox="0 0 25 25" fill="none" style={{ bottom: 8, right: 8 }}><path d="M0 24H24V0" stroke="#e1e6e1" strokeWidth="1.2" /></svg>
                  <svg className="a-work-hover-indicator absolute z-20 pointer-events-none" width="22" height="22" viewBox="0 0 25 25" fill="none" style={{ bottom: 8, left: 8 }}><path d="M0.5 0V24H24.5" stroke="#e1e6e1" strokeWidth="1.2" /></svg>

                  {/* Thumbnail and Video */}
                  {(() => {
                    const getThumbnailUrl = (pItem: PortfolioItem) => {
                      if (pItem.thumbnailUrl && pItem.thumbnailUrl.trim() !== "") {
                        const driveMatch = pItem.thumbnailUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
                        if (driveMatch) {
                          return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w800`;
                        }
                        return pItem.thumbnailUrl;
                      }
                      const parsed = parseMediaUrl(pItem.youtubeUrl || pItem.videoUrl);
                      if (parsed.platform === "youtube" && parsed.thumbnailUrl) return parsed.thumbnailUrl;
                      if (parsed.platform === "drive" && parsed.thumbnailUrl) return parsed.thumbnailUrl;
                      return "";
                    };

                    const thumbnailUrlToShow = getThumbnailUrl(item);
                    const parsed = parseMediaUrl(item.youtubeUrl || item.videoUrl);
                    const isDirectVideo = parsed.platform === "direct";
                    const isHovered = hoveredId === item.id;

                    return (
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        {thumbnailUrlToShow && (
                          <img
                            src={thumbnailUrlToShow}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-700 ease-out group-hover:scale-105"
                            style={{ opacity: isDirectVideo && isHovered ? 0 : 1 }}
                          />
                        )}

                        {isDirectVideo && item.videoUrl && (
                          <video
                            ref={(el) => { videoRefs.current[item.id] = el; }}
                            src={item.videoUrl}
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-cover z-10 transition-all duration-700 ease-out group-hover:scale-105"
                            style={{ opacity: (isHovered || !thumbnailUrlToShow) ? 1 : 0 }}
                          />
                        )}

                        {!isDirectVideo && (
                          <div
                            className="absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300"
                            style={{ opacity: isHovered ? 1 : 0, background: "rgba(0,0,0,0.35)" }}
                          >
                            <div className="w-14 h-14 rounded-full border border-white/60 flex items-center justify-center backdrop-blur-sm bg-black/30">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                  <div className="absolute inset-0 bg-black/5 z-[5] pointer-events-none" />
                </div>

                {/* Card Footer Details */}
                <div className="w-full flex items-center justify-between pt-3">
                  <span className="font-display text-lg sm:text-base md:text-sm uppercase tracking-wider text-[#e1e6e1] group-hover:text-[#f73a0b] transition-colors duration-300">
                    {item.title}
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9px] md:text-[8px] tracking-[0.2em] text-white/30 uppercase">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE VIEW GRID (Hidden on desktop - custom film shape & scroll animation) ── */}
      <div className="block md:hidden">
        <div className="flex flex-col border-b border-white/10 pb-5 mb-10 text-center items-center">
          <h3 className="font-display text-4xl text-[#e1e6e1] font-bold uppercase leading-none tracking-wider">
            Selected Works
          </h3>
        </div>

        <div className="flex flex-col gap-12 max-w-[320px] mx-auto w-full">
          {items.map((item, idx) => {
            const isReel = item.category?.toLowerCase() === "reels";
            const aspectClass = isReel ? "aspect-[9/16] max-w-[240px] mx-auto" : "aspect-video w-full";

            return (
              <motion.div
                key={item.id}
                className="w-full flex flex-col"
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] as const }}
              >
                {/* Mobile Card Header */}
                <div className="w-full flex justify-between items-end pb-2 border-b border-white/5 mb-3.5 font-mono text-[9px] tracking-wider text-white/40">
                  <span className="text-[#f73a0b] font-bold">REEL_{String(idx + 1).padStart(3, "0")}</span>
                  <span className="uppercase text-[8px] text-white/50">{item.category}</span>
                </div>

                {/* Mobile visual container */}
                <div
                  onClick={() => onPlay(item)}
                  className={`relative overflow-hidden bg-[#101010] border border-white/10 rounded-sm cursor-pointer shadow-2xl ${aspectClass}`}
                >
                  {(() => {
                    const getThumbnailUrl = (pItem: PortfolioItem) => {
                      if (pItem.thumbnailUrl && pItem.thumbnailUrl.trim() !== "") {
                        const driveMatch = pItem.thumbnailUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
                        if (driveMatch) {
                          return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w800`;
                        }
                        return pItem.thumbnailUrl;
                      }
                      const parsed = parseMediaUrl(pItem.youtubeUrl || pItem.videoUrl);
                      if (parsed.platform === "youtube" && parsed.thumbnailUrl) return parsed.thumbnailUrl;
                      if (parsed.platform === "drive" && parsed.thumbnailUrl) return parsed.thumbnailUrl;
                      return "";
                    };

                    const thumbnailUrlToShow = getThumbnailUrl(item);

                    return (
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        {thumbnailUrlToShow && (
                          <img
                            src={thumbnailUrlToShow}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover z-0"
                          />
                        )}
                        {/* Always show play overlay icon on mobile for intuitive click feedback */}
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
                          <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm bg-black/25">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Mobile Card Footer */}
                <div className="w-full flex items-center justify-between pt-3">
                  <span className="font-display text-lg uppercase tracking-wider text-[#e1e6e1] leading-tight">
                    {item.title}
                  </span>
                  <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">[TAP]</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

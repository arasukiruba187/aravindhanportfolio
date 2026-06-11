"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─── Data ───────────────────────────────────────────────────────────────────
const STATS = [
  {
    value: 150,
    suffix: "M+",
    label: "Views Generated",
    description: "Across YouTube, Instagram Reels and Viral Content",
    accentColor: "#f73a0b",
  },
  {
    value: 50,
    suffix: "+",
    label: "Projects Completed",
    description: "Commercials, Brand Campaigns and Content Creation",
    accentColor: "#f59e0b",
  },
  {
    value: 20,
    suffix: "+",
    label: "Happy Clients",
    description: "Businesses, Creators and Startups",
    accentColor: "#f97316",
  },
  {
    value: 5,
    suffix: "+",
    label: "Years Experience",
    description: "Professional Video Editing & Storytelling",
    accentColor: "#ef4444",
  },
];

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedCounter({
  value,
  suffix,
  triggered,
}: {
  value: number;
  suffix: string;
  triggered: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!triggered || hasRun.current) return;
    hasRun.current = true;

    const duration = 2400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [triggered, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({
  stat,
  idx,
  triggered,
}: {
  stat: (typeof STATS)[0];
  idx: number;
  triggered: boolean;
}) {
  // Subtle 3-D parallax on mouse move (desktop only)
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const rotateX = useTransform(springY, [-50, 50], [4, -4]);
  const rotateY = useTransform(springX, [-50, 50], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={triggered ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        delay: idx * 0.15,
        ease: [0.25, 1, 0.5, 1],
      }}
      // Gentle float animation
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="relative group"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          y: {
            duration: 3.5 + idx * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: idx * 0.5,
          },
        }}
        whileHover={{ scale: 1.045, y: -8 }}
        className="relative flex flex-col items-center text-center px-4 py-6 md:px-6 md:py-8 rounded-2xl
          bg-white/[0.04] backdrop-blur-md border border-white/[0.09]
          shadow-[0_4px_32px_rgba(0,0,0,0.35)]
          transition-shadow duration-300
          group-hover:border-white/20
          group-hover:shadow-[0_8px_48px_rgba(247,58,11,0.18)]
          cursor-default"
        style={{
          willChange: "transform",
        }}
      >
        {/* Glowing accent dot top-right */}
        <span
          className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
          style={{
            background: stat.accentColor,
            boxShadow: `0 0 8px ${stat.accentColor}`,
          }}
        />

        {/* Counter number */}
        <div
          className="font-display font-black text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-none mb-2"
          style={{
            color: "#e1e6e1",
            textShadow: `0 0 24px ${stat.accentColor}55`,
          }}
        >
          <AnimatedCounter
            value={stat.value}
            suffix={stat.suffix}
            triggered={triggered}
          />
        </div>

        {/* Label */}
        <p className="font-body font-semibold text-[13px] md:text-sm tracking-wide text-white/70 uppercase mb-2">
          {stat.label}
        </p>

        {/* Description */}
        <p className="font-body text-[10px] md:text-[11px] text-white/35 leading-relaxed max-w-[150px] md:max-w-[160px]">
          {stat.description}
        </p>

        {/* Inner glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${stat.accentColor}18, transparent 70%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Background Particles ────────────────────────────────────────────────────
function StatsParticles() {
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 4,
      color: ["#f73a0b", "#f59e0b", "#f97316", "#ef4444", "#fbbf24"][
        Math.floor(Math.random() * 5)
      ],
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            opacity: 0,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.35, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Section ────────────────────────────────────────────────────────────
export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggered = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-14 md:py-20 overflow-hidden"
    >
      {/* Particles layer */}
      <StatsParticles />

      {/* Subtle radial glow behind cards */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(247,58,11,0.06), transparent 70%)",
        }}
      />

      <div className="container px-4 md:px-8 mx-auto relative z-10">
        {/* ── 2×2 Mobile Grid / 4-column Desktop Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 lg:gap-6">
          {STATS.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} idx={idx} triggered={triggered} />
          ))}
        </div>
      </div>

      {/* Glowing orange line at the bottom */}
      <div className="relative mt-12 md:mt-16 mx-auto max-w-5xl px-4 md:px-8">
        <div className="relative h-px w-full bg-white/5 overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #f73a0b, #f59e0b, transparent)",
              width: "40%",
            }}
            animate={{ x: ["-100%", "350%"] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1.5,
            }}
          />
        </div>
      </div>
    </section>
  );
}

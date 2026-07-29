"use client";

import BulbIcon from "@/app/components/BulbIcon";

// Perspective room geometry (viewBox 800×600)
// Back wall corners: TL(260,150) TR(540,150) BR(540,450) BL(260,450)
// Vanishing point: (400, 300) — center of back wall.
//
// Box 1 (left): depth offset (+12, -16) toward VP
// Box 2 (right): depth offset (-13, -15) toward VP

export default function RoomScene({
  visible,
  dark,
  onToggleTheme,
  onExit,
}: {
  visible: boolean;
  dark: boolean;
  onToggleTheme: () => void;
  onExit: () => void;
}) {
  const anim = (delay: number) => ({
    pathLength: 100 as const,
    strokeDasharray: "100 100",
    strokeDashoffset: visible ? 0 : 100,
    style: {
      transition: `stroke-dashoffset 700ms cubic-bezier(0.65,0,0.35,1) ${delay}ms`,
    },
  });

  return (
    <div className="relative flex-1 bg-background overflow-hidden transition-colors duration-500">
      <button
        type="button"
        onClick={onExit}
        aria-label="Back to home"
        className="absolute left-5 top-5 z-20 flex h-9 items-center gap-1.5 rounded-full px-3 font-sans text-sm font-light tracking-wide text-foreground/60 transition-colors hover:bg-foreground/10 hover:text-foreground focus:outline-none"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 850ms ease",
        }}
      >
        <span aria-hidden="true">←</span> Home
      </button>

      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={dark}
        className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-foreground/10 focus:outline-none"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 850ms ease",
        }}
      >
        <BulbIcon
          className="h-5 w-5"
          stroke={dark ? "var(--color-clay)" : "var(--foreground)"}
          strokeWidth="1.5"
          style={{
            filter: dark ? "drop-shadow(0 0 6px rgba(201,162,90,0.65))" : "none",
            transition: "filter 400ms ease, stroke 400ms ease",
          }}
        />
      </button>

      {/* Hanging ceiling bulb — drops into frame when dark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translate(-50%, ${dark ? "0%" : "-130%"})`,
          transition: "opacity 850ms ease, transform 700ms cubic-bezier(0.34,1.2,0.64,1)",
        }}
      >
        <div className="mx-auto" style={{ width: 1, height: 70, background: "var(--foreground)", opacity: 0.4 }} />
        <BulbIcon
          width={36}
          height={36}
          stroke="var(--foreground)"
          strokeWidth="1.3"
          style={{
            display: "block",
            margin: "0 auto",
            filter: dark ? "drop-shadow(0 0 12px rgba(201,162,90,0.6))" : "none",
            transition: "filter 400ms ease 400ms",
            transform: "scaleY(-1)",
          }}
        />
      </div>

      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        fill="none"
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 850ms ease",
        }}
      >
        {/* Back wall */}
        <rect
          x="260" y="150" width="280" height="300"
          strokeWidth="1.3"
          pathLength={100}
          strokeDasharray="100 100"
          strokeDashoffset={visible ? 0 : 100}
          style={{ transition: "stroke-dashoffset 1000ms cubic-bezier(0.65,0,0.35,1)" }}
        />

        {/* Perspective edges — drawn outward from back-wall corners */}
        <line x1="260" y1="150" x2="0"   y2="0"   strokeWidth="1" {...anim(350)} />
        <line x1="540" y1="150" x2="800" y2="0"   strokeWidth="1" {...anim(400)} />
        <line x1="540" y1="450" x2="800" y2="600" strokeWidth="1" {...anim(450)} />
        <line x1="260" y1="450" x2="0"   y2="600" strokeWidth="1" {...anim(500)} />

        {/* ── Box 1 (left side, near back-left) ── */}
        {/* Front face */}
        <path d="M 275 472 L 320 472 L 320 430 L 275 430 Z" strokeWidth="1" {...anim(850)} />
        {/* Top face — offset (+12, −16) toward VP */}
        <path d="M 275 430 L 320 430 L 332 414 L 287 414 Z" strokeWidth="1" {...anim(920)} />
        {/* Right side face */}
        <path d="M 320 430 L 320 472 L 332 456 L 332 414 Z" strokeWidth="1" {...anim(920)} />

        {/* ── Box 2 (right side) ── */}
        {/* Front face */}
        <path d="M 450 474 L 512 474 L 512 420 L 450 420 Z" strokeWidth="1" {...anim(950)} />
        {/* Top face — offset (−13, −15) toward VP */}
        <path d="M 450 420 L 512 420 L 499 405 L 437 405 Z" strokeWidth="1" {...anim(1020)} />
        {/* Left side face */}
        <path d="M 450 420 L 450 474 L 437 459 L 437 405 Z" strokeWidth="1" {...anim(1020)} />
      </svg>

      {/* Light cone — glows over the back wall when dark; drawn after the svg so it renders on top of the shapes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: "32.5%",
          top: "17.5%",
          width: "35%",
          height: "58%",
          background:
            "radial-gradient(ellipse at top, rgba(201,162,90,0.30), rgba(201,162,90,0.08) 55%, rgba(201,162,90,0) 80%)",
          opacity: visible && dark ? 1 : 0,
          transition: `opacity 500ms ease ${dark ? "550ms" : "0ms"}`,
        }}
      />

      {/* Message — centered on the back wall */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 900ms ease 1600ms",
        }}
      >
        <p className="font-sans text-xs font-light tracking-[0.18em] text-foreground/35 text-center leading-loose uppercase">
          I&apos;m still moving in.<br />
          It&apos;ll be more decorated later.
        </p>
      </div>
    </div>
  );
}

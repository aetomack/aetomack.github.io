"use client";

// Perspective room geometry (viewBox 800×600)
// Back wall corners: TL(260,150) TR(540,150) BR(540,450) BL(260,450)
// Vanishing point: (400, 300) — center of back wall.
//
// Box 1 (left): depth offset (+12, -16) toward VP
// Box 2 (right): depth offset (-13, -15) toward VP

export default function RoomScene({ visible }: { visible: boolean }) {
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

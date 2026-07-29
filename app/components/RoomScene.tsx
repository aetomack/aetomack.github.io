"use client";

// Perspective room geometry (viewBox 800×600)
// Back wall corners: TL(260,150) TR(540,150) BR(540,450) BL(260,450)
// Perspective lines radiate from each back-wall corner to the matching screen corner.

export default function RoomScene({ visible }: { visible: boolean }) {
  const lineAnim = (delay: number) => ({
    pathLength: 100 as const,
    strokeDasharray: "100 100",
    strokeDashoffset: visible ? 0 : 100,
    style: {
      transition: `stroke-dashoffset 750ms cubic-bezier(0.65,0,0.35,1) ${delay}ms`,
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
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 850ms ease",
        }}
      >
        {/* Back wall */}
        <rect
          x="260"
          y="150"
          width="280"
          height="300"
          strokeWidth="1.3"
          pathLength={100}
          strokeDasharray="100 100"
          strokeDashoffset={visible ? 0 : 100}
          style={{ transition: "stroke-dashoffset 1000ms cubic-bezier(0.65,0,0.35,1)" }}
        />

        {/* Perspective lines — draw from back-wall corner outward to screen corner */}
        {/* Top-left: ceiling/left-wall edge */}
        <line x1="260" y1="150" x2="0" y2="0" strokeWidth="1" {...lineAnim(350)} />
        {/* Top-right: ceiling/right-wall edge */}
        <line x1="540" y1="150" x2="800" y2="0" strokeWidth="1" {...lineAnim(400)} />
        {/* Bottom-right: floor/right-wall edge */}
        <line x1="540" y1="450" x2="800" y2="600" strokeWidth="1" {...lineAnim(450)} />
        {/* Bottom-left: floor/left-wall edge */}
        <line x1="260" y1="450" x2="0" y2="600" strokeWidth="1" {...lineAnim(500)} />
      </svg>
    </div>
  );
}

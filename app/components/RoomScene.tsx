"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BulbIcon from "@/app/components/BulbIcon";
import InfoPanel from "@/app/components/InfoPanel";
import { ROOM_ITEMS, type RoomItemId } from "@/app/components/roomContent";
import { draw } from "@/app/components/roomGeometry";
import {
  Camera,
  ClothingRack,
  Corkboard,
  Easel,
  Guitar,
  Laptop,
  MovingBox,
  Playbill,
  Whiteboard,
  type HotspotProps,
} from "@/app/components/RoomObjects";

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
  const anim = (delay: number) => draw(visible, delay);

  const [hovered, setHovered] = useState<RoomItemId | null>(null);
  const [selected, setSelected] = useState<RoomItemId | null>(null);
  const triggerRef = useRef<HTMLElement | SVGElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Narrower than the room's 4:3 the stage overflows sideways — start every visit (and resize) centred on the back wall.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const center = () => {
      el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    };
    center();
    const observer = new ResizeObserver(center);
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const select = useCallback((id: RoomItemId) => {
    triggerRef.current = document.activeElement as HTMLElement | SVGElement | null;
    setSelected(id);
  }, []);

  const closePanel = useCallback(() => {
    setSelected(null);
    triggerRef.current?.focus();
  }, []);

  const exit = () => {
    setSelected(null);
    setHovered(null);
    onExit();
  };

  const hotspot: HotspotProps = { visible, onSelect: select, onHover: setHovered };
  const status = hovered ? (
    `Look at ${ROOM_ITEMS[hovered].label}`
  ) : (
    <>
      <span className="[@media(max-aspect-ratio:4/3)]:hidden">Look around. I&apos;m still unpacking.</span>
      <span className="hidden [@media(max-aspect-ratio:4/3)]:inline">← Swipe to look around →</span>
    </>
  );

  return (
    <div className="relative flex-1 bg-background overflow-hidden transition-colors duration-500">
      <button
        type="button"
        onClick={exit}
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

      {/* Pannable stage — never squeezed below the room's native 4:3, so portrait screens swipe sideways instead */}
      <div
        ref={scrollerRef}
        className="no-scrollbar absolute inset-0 overflow-x-auto overflow-y-hidden overscroll-x-contain"
        style={{ containerType: "size" }}
        onWheel={(e) => {
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) e.currentTarget.scrollLeft += e.deltaY;
        }}
      >
        <div className="relative h-full" style={{ width: "max(100cqw, 100cqh * 4 / 3)", containerType: "size" }}>
          {/* Hanging ceiling bulb — drops into frame when dark */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 z-10"
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

            <Whiteboard {...hotspot} />
            <Corkboard {...hotspot} />
            <Playbill {...hotspot} />

            {/* ── Box 1 (left side, near back-left) ── */}
            <MovingBox {...hotspot}>
              {/* Front face */}
              <path d="M 275 472 L 320 472 L 320 430 L 275 430 Z" strokeWidth="1" {...anim(850)} />
              {/* Top face — offset (+12, −16) toward VP */}
              <path d="M 275 430 L 320 430 L 332 414 L 287 414 Z" strokeWidth="1" {...anim(920)} />
              {/* Right side face */}
              <path d="M 320 430 L 320 472 L 332 456 L 332 414 Z" strokeWidth="1" {...anim(920)} />
            </MovingBox>

            {/* ── Box 2 (right side) ── */}
            {/* Front face */}
            <path d="M 450 474 L 512 474 L 512 420 L 450 420 Z" strokeWidth="1" {...anim(950)} />
            {/* Top face — offset (−13, −15) toward VP */}
            <path d="M 450 420 L 512 420 L 499 405 L 437 405 Z" strokeWidth="1" {...anim(1020)} />
            {/* Left side face */}
            <path d="M 450 420 L 450 474 L 437 459 L 437 405 Z" strokeWidth="1" {...anim(1020)} />

            <Laptop {...hotspot} />
          </svg>

          {/* Free-standing props, back to front so nearer ones overlap farther ones */}
          <Guitar {...hotspot} />
          <Easel {...hotspot} />
          <Camera {...hotspot} />
          <ClothingRack {...hotspot} />

          {/* Lamplight — radiates from the bulb (70px cord + half its 36px height = 88px down) across ceiling, walls
              and floor, fading out well inside the stage so it has no hard edges; drawn after the svg so it tints the lines */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: [
                "radial-gradient(ellipse 58cqw 80cqh at 50% 88px, rgba(201,162,90,0.32), rgba(201,162,90,0.16) 18%, rgba(201,162,90,0.06) 45%, rgba(201,162,90,0) 80%)",
                // Pool of light on the floor beneath the bulb
                "radial-gradient(ellipse 26cqw 9cqh at 50% 84%, rgba(201,162,90,0.10), rgba(201,162,90,0) 100%)",
              ].join(", "),
              opacity: visible && dark ? 1 : 0,
              transition: `opacity 500ms ease ${dark ? "550ms" : "0ms"}`,
            }}
          />
        </div>
      </div>

      {/* Status line — point-and-click style "Look at …" */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center px-6"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 600ms ease ${visible ? "1800ms" : "0ms"}`,
        }}
      >
        <p
          className="rounded-full bg-background/80 px-3 py-1 font-sans text-xs font-light tracking-[0.18em] text-foreground/45 text-center uppercase"
          style={{ opacity: selected ? 0 : 1, transition: "opacity 300ms ease" }}
        >
          {status}
        </p>
      </div>

      <InfoPanel open={visible ? selected : null} onClose={closePanel} />
    </div>
  );
}

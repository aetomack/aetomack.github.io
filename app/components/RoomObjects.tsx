"use client";

import type { CSSProperties, KeyboardEvent, ReactNode } from "react";
import { PORTRAIT_SRC, ROOM_ITEMS, type RoomItemId } from "@/app/components/roomContent";
import { arc, draw, floorPoint, quad, seg, wallPatch } from "@/app/components/roomGeometry";

export type HotspotProps = {
  visible: boolean;
  onSelect: (id: RoomItemId) => void;
  onHover: (id: RoomItemId | null) => void;
};

const BG = "var(--background)";

function hotspotHandlers(id: RoomItemId, { visible, onSelect, onHover }: HotspotProps) {
  const item = ROOM_ITEMS[id];
  return {
    className: "hotspot",
    tabIndex: visible ? 0 : -1,
    "aria-label": `Look at ${item.label}: ${item.kicker}`,
    onClick: () => onSelect(id),
    onMouseEnter: () => onHover(id),
    onMouseLeave: () => onHover(null),
    onFocus: () => onHover(id),
    onBlur: () => onHover(null),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Wall-mounted objects — drawn inside the room's stretched 800×600 svg, so they
// stay locked to the walls' perspective at any aspect ratio.
// ─────────────────────────────────────────────────────────────────────────────

function SvgHotspot({ id, hit, children, ...props }: HotspotProps & { id: RoomItemId; hit: string; children: ReactNode }) {
  const { onClick, ...handlers } = hotspotHandlers(id, props);
  return (
    <g
      role="button"
      {...handlers}
      onClick={onClick}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <path d={hit} fill="transparent" stroke="none" />
      {children}
    </g>
  );
}

/** Back wall — sketch of the customer → problem → build → ship loop. */
export function Whiteboard(props: HotspotProps) {
  const d = (delay: number) => draw(props.visible, delay);
  return (
    <SvgHotspot id="whiteboard" hit="M 300 172 L 500 172 L 500 278 L 300 278 Z" {...props}>
      <rect x="300" y="172" width="200" height="100" rx="2" strokeWidth="1.2" {...d(1100)} />
      <rect x="312" y="272" width="176" height="5" strokeWidth="0.9" {...d(1200)} />
      <rect x="452" y="268.5" width="14" height="3.5" rx="1" strokeWidth="0.8" {...d(1500)} />

      {/* Stick figure — the customer */}
      <circle cx="325" cy="204" r="6" strokeWidth="0.9" {...d(1300)} />
      <path d="M 325 210 L 325 231 M 316 218 L 334 218 M 325 231 L 318 244 M 325 231 L 332 244" strokeWidth="0.9" {...d(1350)} />

      {/* → problem */}
      <path d="M 337 213 L 348 213 M 344 210 L 348 213 L 344 216" strokeWidth="0.9" {...d(1400)} />
      <rect x="352" y="198" width="40" height="30" rx="2" strokeWidth="0.9" {...d(1420)} />
      <path d="M 366 207 C 366 201, 378 201, 378 207 C 378 212, 372 211, 372 216 M 372 221 L 372 222" strokeWidth="0.9" {...d(1480)} />

      {/* → build */}
      <path d="M 396 213 L 406 213 M 402 210 L 406 213 L 402 216" strokeWidth="0.9" {...d(1500)} />
      <rect x="410" y="198" width="40" height="30" rx="2" strokeWidth="0.9" {...d(1520)} />
      <path d="M 422 207 L 417 213 L 422 219 M 438 207 L 443 213 L 438 219 M 433 205 L 427 221" strokeWidth="0.9" {...d(1580)} />

      {/* → ship */}
      <path d="M 454 213 L 464 213 M 460 210 L 464 213 L 460 216" strokeWidth="0.9" {...d(1600)} />
      <path d="M 470 212 L 477 221 L 491 199" strokeWidth="1.1" {...d(1640)} />

      {/* iterate loop back to the customer */}
      <path d="M 430 232 C 430 258, 340 262, 327 249 M 333 251 L 327 249 L 329 243" strokeWidth="0.9" {...d(1700)} />
      <path d="M 360 258 q 4 -3 8 0 t 8 0 t 8 0 t 8 0" strokeWidth="0.7" {...d(1780)} />
    </SvgHotspot>
  );
}

/** Left wall — pinned notes, a polaroid, and a thread connecting them. */
export function Corkboard(props: HotspotProps) {
  const d = (delay: number) => draw(props.visible, delay);
  const m = wallPatch(-1, 0.2, 0.6, 0.5, 0.86);
  const pins: [number, number][] = [
    [0.24, 0.84],
    [0.55, 0.86],
    [0.81, 0.82],
    [0.3, 0.42],
    [0.69, 0.36],
  ];
  return (
    <SvgHotspot id="corkboard" hit={quad(m, 0, 0, 1, 1)} {...props}>
      <path d={quad(m, 0, 0, 1, 1)} strokeWidth="1.2" {...d(1150)} />
      <path d={quad(m, 0.04, 0.06, 0.96, 0.94)} strokeWidth="0.6" opacity={0.5} {...d(1200)} />

      <path d={quad(m, 0.12, 0.52, 0.36, 0.84)} strokeWidth="0.9" {...d(1300)} />
      <path d={`${seg(m, 0.16, 0.74, 0.32, 0.74)} ${seg(m, 0.16, 0.66, 0.28, 0.66)} ${seg(m, 0.16, 0.58, 0.3, 0.58)}`} strokeWidth="0.7" {...d(1380)} />

      <path d={quad(m, 0.44, 0.46, 0.66, 0.86)} strokeWidth="0.9" {...d(1340)} />
      <path d={quad(m, 0.47, 0.56, 0.63, 0.82)} strokeWidth="0.7" {...d(1420)} />
      <path d={arc(m, 0.55, 0.7, 0.04, 0.05)} strokeWidth="0.7" {...d(1460)} />

      <path d={quad(m, 0.72, 0.55, 0.9, 0.82)} strokeWidth="0.9" {...d(1380)} />
      <path d={`${seg(m, 0.75, 0.72, 0.87, 0.72)} ${seg(m, 0.75, 0.64, 0.84, 0.64)}`} strokeWidth="0.7" {...d(1460)} />

      <path d={quad(m, 0.18, 0.14, 0.42, 0.42)} strokeWidth="0.9" {...d(1420)} />
      <path d={`${seg(m, 0.22, 0.32, 0.38, 0.32)} ${seg(m, 0.22, 0.24, 0.34, 0.24)}`} strokeWidth="0.7" {...d(1500)} />

      <path d={quad(m, 0.52, 0.12, 0.86, 0.36)} strokeWidth="0.9" {...d(1460)} />
      <path d={`${seg(m, 0.56, 0.27, 0.82, 0.27)} ${seg(m, 0.56, 0.2, 0.76, 0.2)}`} strokeWidth="0.7" {...d(1540)} />

      {/* Thread between pins — a timeline */}
      <path
        d={`${seg(m, ...pins[0], ...pins[1])} ${seg(m, ...pins[1], ...pins[2])} ${seg(m, ...pins[3], ...pins[4])}`}
        stroke="var(--accent)"
        strokeWidth="0.7"
        opacity={0.7}
        {...d(1650)}
      />
      {pins.map(([a, b], i) => (
        <path key={i} d={arc(m, a, b, 0.018, 0.02, 0, Math.PI * 2, 10)} fill="var(--accent)" stroke="none" opacity={props.visible ? 0.85 : 0} style={{ transition: `opacity 400ms ease ${1600 + i * 60}ms` }} />
      ))}
    </SvgHotspot>
  );
}

/** Right wall — framed playbill with comedy / tragedy masks. */
export function Playbill(props: HotspotProps) {
  const d = (delay: number) => draw(props.visible, delay);
  const m = wallPatch(1, 0.25, 0.62, 0.38, 0.8);
  return (
    <SvgHotspot id="playbill" hit={quad(m, 0, 0, 1, 1)} {...props}>
      <path d={quad(m, 0, 0, 1, 1)} strokeWidth="1.2" {...d(1150)} />
      <path d={quad(m, 0.07, 0.05, 0.93, 0.95)} strokeWidth="0.7" {...d(1220)} />

      {/* Comedy */}
      <path d={arc(m, 0.4, 0.64, 0.2, 0.17)} fill={BG} strokeWidth="0.9" {...d(1320)} />
      <path d={`${arc(m, 0.32, 0.67, 0.045, 0.025, 0, Math.PI, 8)} ${arc(m, 0.48, 0.67, 0.045, 0.025, 0, Math.PI, 8)}`} strokeWidth="0.8" {...d(1420)} />
      <path d={arc(m, 0.4, 0.6, 0.1, 0.06, Math.PI, Math.PI * 2, 12)} strokeWidth="0.8" {...d(1460)} />

      {/* Tragedy */}
      <path d={arc(m, 0.62, 0.54, 0.2, 0.17)} fill={BG} strokeWidth="0.9" {...d(1360)} />
      <path d={`${arc(m, 0.54, 0.57, 0.045, 0.025, Math.PI, Math.PI * 2, 8)} ${arc(m, 0.7, 0.57, 0.045, 0.025, Math.PI, Math.PI * 2, 8)}`} strokeWidth="0.8" {...d(1460)} />
      <path d={arc(m, 0.62, 0.44, 0.09, 0.05, 0, Math.PI, 12)} strokeWidth="0.8" {...d(1500)} />

      <path d={`${seg(m, 0.2, 0.25, 0.8, 0.25)} ${seg(m, 0.3, 0.18, 0.7, 0.18)} ${seg(m, 0.38, 0.12, 0.62, 0.12)}`} strokeWidth="0.8" {...d(1560)} />
    </SvgHotspot>
  );
}

/** Laptop sitting on top of the right-hand moving box. */
export function Laptop(props: HotspotProps) {
  const d = (delay: number) => draw(props.visible, delay);
  return (
    <SvgHotspot id="laptop" hit="M 455 418 L 493 418 L 487 411 L 485 384 L 447 384 L 449 411 Z" {...props}>
      <path d="M 449 411 L 487 411 L 485 384 L 447 384 Z" fill={BG} strokeWidth="1" {...d(1250)} />
      <path d="M 452 408 L 484 408 L 482.5 387.5 L 450 387.5 Z" strokeWidth="0.6" {...d(1330)} />
      <path d="M 455 418 L 493 418 L 487 411 L 449 411 Z" fill={BG} strokeWidth="1" {...d(1300)} />
      <path d="M 455 392.5 L 463 392.5 M 458 396.5 L 474 396.5 M 458 400.5 L 469 400.5 M 455 404.5 L 461 404.5" stroke="var(--accent)" strokeWidth="0.8" {...d(1500)} />
    </SvgHotspot>
  );
}

/** The left moving box (drawn by RoomScene) gets tape + a label and becomes the contact hotspot. */
export function MovingBox({ children, ...props }: HotspotProps & { children: ReactNode }) {
  const d = (delay: number) => draw(props.visible, delay);
  return (
    <SvgHotspot id="box" hit="M 275 472 L 320 472 L 332 456 L 332 414 L 287 414 L 275 430 Z" {...props}>
      {children}
      <path d="M 297.5 440 L 297.5 430 L 309.5 414" strokeWidth="0.7" {...d(1100)} />
      <rect x="282" y="447" width="18" height="11" strokeWidth="0.7" {...d(1150)} />
      <path d="M 285 452.5 q 3 -2 6 0 t 6 0" strokeWidth="0.6" {...d(1250)} />
    </SvgHotspot>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Free-standing props — each in its own undistorted svg, placed at a floor point
// and scaled by depth so nearer things read bigger.
// ─────────────────────────────────────────────────────────────────────────────

function FloorProp({
  id,
  xn,
  s,
  height,
  viewBox,
  tilt = 0,
  children,
  ...props
}: HotspotProps & {
  id: RoomItemId;
  /** Floor position — see floorPoint(). */
  xn: number;
  s: number;
  /** Object height as a fraction of the room's height. */
  height: number;
  viewBox: [number, number];
  tilt?: number;
  children: ReactNode;
}) {
  const [x, y] = floorPoint(xn, s);
  const [vbW, vbH] = viewBox;
  const hVb = (height * 300) / s;
  const wVb = (hVb * vbW) / vbH;
  const style: CSSProperties = {
    left: `${x / 8}%`,
    top: `${y / 6}%`,
    width: `min(${wVb / 8}cqw, ${wVb / 6}cqh)`,
    aspectRatio: `${vbW} / ${vbH}`,
    transform: `translate(-50%, -100%) rotate(${tilt}deg)`,
    transformOrigin: "50% 100%",
    opacity: props.visible ? 1 : 0,
    transition: "opacity 850ms ease, color 250ms ease",
  };
  return (
    <button type="button" {...hotspotHandlers(id, props)} className="hotspot absolute block focus:outline-none before:absolute before:-inset-3 before:content-['']" style={style}>
      <svg
        viewBox={`0 0 ${vbW} ${vbH}`}
        className="h-full w-full overflow-visible"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        // Match the room's ~1 viewBox-unit line weight regardless of the prop's own scale.
        strokeWidth={(1.1 * vbH) / hVb}
        aria-hidden="true"
      >
        {children}
      </svg>
    </button>
  );
}

export function Guitar(props: HotspotProps) {
  const d = (delay: number) => draw(props.visible, delay);
  return (
    <FloorProp id="guitar" xn={0.86} s={0.9} height={0.36} viewBox={[60, 180]} tilt={7} {...props}>
      <path d="M 30 78 C 14 78, 10 92, 14 104 C 16 110, 12 114, 8 124 C 1 142, 8 176, 30 176 C 52 176, 59 142, 52 124 C 48 114, 44 110, 46 104 C 50 92, 46 78, 30 78 Z" fill={BG} {...d(1300)} />
      <circle cx="30" cy="116" r="8" {...d(1450)} />
      <path d="M 21 150 L 39 150 L 39 154 L 21 154 Z" {...d(1500)} />
      <path d="M 26.5 20 L 26.5 84 L 33.5 84 L 33.5 20" fill={BG} {...d(1380)} />
      <path d="M 25 4 L 35 4 L 34 20 L 26 20 Z" fill={BG} {...d(1420)} />
      <path d="M 23 9 L 25 9 M 23 15 L 25 15 M 35 9 L 37 9 M 35 15 L 37 15" {...d(1520)} />
      <path d="M 26.5 30 L 33.5 30 M 26.5 40 L 33.5 40 M 26.5 50 L 33.5 50 M 26.5 60 L 33.5 60 M 26.5 70 L 33.5 70" strokeOpacity={0.5} {...d(1560)} />
      <path d="M 29 20 L 29 150 M 31 20 L 31 150" strokeOpacity={0.45} {...d(1600)} />
    </FloorProp>
  );
}

export function Easel(props: HotspotProps) {
  const d = (delay: number) => draw(props.visible, delay);
  return (
    <FloorProp id="easel" xn={-0.05} s={0.6} height={0.5} viewBox={[120, 220]} {...props}>
      <path d="M 60 24 L 60 206" strokeOpacity={0.5} {...d(1250)} />
      <path d="M 28 216 L 57 8 M 92 216 L 63 8 M 55 6 L 65 6" {...d(1300)} />
      <rect x="22" y="30" width="76" height="98" fill={BG} {...d(1400)} />
      <rect x="16" y="128" width="88" height="6" fill={BG} {...d(1450)} />

      {/* The painting — the portrait sits faded and grey, then paints itself in on hover (see .easel-portrait) */}
      <g style={{ opacity: props.visible ? 1 : 0, transition: `opacity 700ms ease ${props.visible ? 1550 : 0}ms` }}>
        <image href={PORTRAIT_SRC} x="25" y="33" width="70" height="92" preserveAspectRatio="xMidYMin slice" className="easel-portrait" />
      </g>
      <rect x="25" y="33" width="70" height="92" strokeOpacity={0.35} {...d(1550)} />

      {/* Brush on the ledge */}
      <path d="M 66 131.5 L 92 130 M 92 130 l 6 -0.4" {...d(1700)} />
    </FloorProp>
  );
}

/** Video camera on a tripod, pointed at the clothing rack as if mid-shoot. */
export function Camera(props: HotspotProps) {
  const d = (delay: number) => draw(props.visible, delay);
  return (
    <FloorProp id="camera" xn={0.85} s={0.53} height={0.36} viewBox={[100, 200]} {...props}>
      {/* Tripod */}
      <path d="M 56 66 L 18 196 M 60 66 L 96 196" {...d(1250)} />
      <path d="M 58 66 L 62 196" strokeOpacity={0.45} {...d(1300)} />
      <path d="M 58 66 L 58 120 M 37 132 L 79 132" strokeOpacity={0.6} {...d(1350)} />
      <path d="M 46 58 L 70 58 L 70 66 L 46 66 Z" fill={BG} {...d(1300)} />
      <path d="M 70 62 L 92 70" {...d(1380)} />

      {/* Body, facing left toward the rack */}
      <rect x="34" y="22" width="50" height="36" rx="3" fill={BG} {...d(1400)} />
      <path d="M 34 30 L 14 26 L 14 54 L 34 50" fill={BG} {...d(1450)} />
      <path d="M 14 26 L 8 22 L 8 58 L 14 54" fill={BG} {...d(1480)} />
      <rect x="66" y="28" width="12" height="9" rx="1" strokeOpacity={0.6} {...d(1520)} />
      <path d="M 44 22 L 44 14 L 74 14 L 74 22 M 54 14 L 54 10 L 64 10 L 64 14" {...d(1520)} />

      {/* REC light */}
      <circle cx="78" cy="46" r="2.6" fill="var(--accent)" stroke="none" className="rec-light" />
    </FloorProp>
  );
}

export function ClothingRack(props: HotspotProps) {
  const d = (delay: number) => draw(props.visible, delay);
  const hanger = (x: number) => `M ${x} 30 L ${x} 25 C ${x} 19, ${x + 6} 19, ${x + 6} 23 M ${x - 15} 38 L ${x} 30 L ${x + 15} 38`;
  return (
    <FloorProp id="rack" xn={-0.72} s={0.52} height={0.46} viewBox={[120, 200]} {...props}>
      <path d="M 6 26 L 114 26 M 14 26 L 14 190 M 106 26 L 106 190 M 2 192 L 26 192 M 94 192 L 118 192" {...d(1250)} />
      <path d={`${hanger(36)} ${hanger(62)} ${hanger(88)}`} {...d(1350)} />

      {/* Coat */}
      <path d="M 21 38 L 51 38 L 55 152 L 17 152 Z" fill={BG} {...d(1400)} />
      <path d="M 30 38 L 36 72 L 42 38 M 36 72 L 36 152" {...d(1480)} />
      <circle cx="40" cy="92" r="1.2" {...d(1560)} />
      <circle cx="40" cy="110" r="1.2" {...d(1580)} />

      {/* Shirt */}
      <path d="M 48 38 L 76 38 L 86 52 L 80 57 L 76 50 L 76 106 L 48 106 L 48 50 L 44 57 L 38 52 Z" fill={BG} {...d(1450)} />
      <path d="M 56 38 L 62 46 L 68 38" {...d(1540)} />

      {/* Dress */}
      <path d="M 80 38 L 96 38 L 98 70 L 110 140 L 66 140 L 78 70 Z" fill={BG} {...d(1500)} />
      <path d="M 78 70 L 98 70" stroke="var(--accent)" {...d(1620)} />
    </FloorProp>
  );
}

// One-point perspective helpers for the room (viewBox 800×600).
//
// Back wall: (260,150)–(540,150)–(540,450)–(260,450), vanishing point (400,300).
// Depth is expressed as `s` = Z / Z_backWall, so s = 1 on the back wall and shrinks
// toward the viewer. The side walls leave the frame at s = 0.35, the floor at s = 0.5.

export type Point = [number, number];

const VP_X = 400;
const VP_Y = 300;
const HALF_W = 140;
const HALF_H = 150;

/** Point on the floor. `xn` runs -1 (left wall) → 1 (right wall). */
export function floorPoint(xn: number, s: number): Point {
  return [VP_X + (xn * HALF_W) / s, VP_Y + HALF_H / s];
}

/** Point on a side wall. `u` runs 0 (back corner) → 1 (frame edge), `v` 0 (floor) → 1 (ceiling). */
export function wallPoint(side: -1 | 1, u: number, v: number): Point {
  const s = 1 - 0.65 * u;
  return [VP_X + (side * HALF_W) / s, VP_Y - ((v - 0.5) * 2 * HALF_H) / s];
}

/**
 * Maps a local (a, b) unit square onto a patch of a side wall, so wall art can be drawn
 * flat and projected. `a` runs left → right on screen, `b` bottom → top.
 */
export function wallPatch(side: -1 | 1, u0: number, u1: number, v0: number, v1: number) {
  return (a: number, b: number): Point => {
    const u = side === -1 ? u1 - (u1 - u0) * a : u0 + (u1 - u0) * a;
    return wallPoint(side, u, v0 + (v1 - v0) * b);
  };
}

const fmt = (n: number) => Math.round(n * 10) / 10;

export function pathOf(points: Point[], close = false) {
  const d = points.map(([x, y], i) => `${i ? "L" : "M"} ${fmt(x)} ${fmt(y)}`).join(" ");
  return close ? `${d} Z` : d;
}

/** Rectangle in local patch coordinates, projected. */
export function quad(map: (a: number, b: number) => Point, a0: number, b0: number, a1: number, b1: number) {
  return pathOf([map(a0, b0), map(a1, b0), map(a1, b1), map(a0, b1)], true);
}

/** Line in local patch coordinates, projected. */
export function seg(map: (a: number, b: number) => Point, a0: number, b0: number, a1: number, b1: number) {
  return pathOf([map(a0, b0), map(a1, b1)]);
}

/** Elliptical arc in local patch coordinates (angles in radians, b up), projected. */
export function arc(
  map: (a: number, b: number) => Point,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  t0 = 0,
  t1 = Math.PI * 2,
  steps = 28,
) {
  const pts: Point[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = t0 + ((t1 - t0) * i) / steps;
    pts.push(map(cx + rx * Math.cos(t), cy + ry * Math.sin(t)));
  }
  return pathOf(pts, t1 - t0 >= Math.PI * 2);
}

/** Stroke "draw-in" props shared by every line in the room. */
export function draw(visible: boolean, delay: number, duration = 700) {
  return {
    pathLength: 100 as const,
    strokeDasharray: "100 100",
    strokeDashoffset: visible ? 0 : 100,
    style: { transition: `stroke-dashoffset ${duration}ms cubic-bezier(0.65,0,0.35,1) ${delay}ms` },
  };
}

"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "tracing" | "greeting" | "knocking";

const TRACE_MS = 1200;
const REDUCED_SCALE = 0.15;
const GREETING_INTERVAL_MS = 1900;
const GREETING_FADE_MS = 220;
const KNOCK_BEAT_MS = 900;
const KNOCK_REPLY_MS = 1300;

const GREETINGS = [
  "Hello!",
  "¡Hola!",
  "Bonjour!",
  "Ciao!",
  "Hallo!",
  "こんにちは!",
  "안녕하세요!",
  "Привет!",
  "你好!",
  "Olá!",
  "Namaste!",
];

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export default function DoorPortal() {
  const reducedMotionRef = useRef(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [greetingFade, setGreetingFade] = useState(true);
  const [knockBeat, setKnockBeat] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    if (phase !== "greeting") return;
    let fadeTimeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setGreetingFade(false);
      fadeTimeout = setTimeout(() => {
        setGreetingIndex((i) => (i + 1) % GREETINGS.length);
        setGreetingFade(true);
      }, GREETING_FADE_MS);
    }, GREETING_INTERVAL_MS);
    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, [phase]);

  async function handleEnter() {
    if (phase !== "idle") return;
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scale = reducedMotionRef.current ? REDUCED_SCALE : 1;

    setGreetingIndex(0);
    setGreetingFade(true);
    setPhase("tracing");
    await sleep(TRACE_MS * scale);
    setPhase("greeting");
  }

  function handleNevermind() {
    if (phase !== "greeting") return;
    setPhase("idle");
  }

  async function handleKnock() {
    if (phase !== "greeting") return;
    const scale = reducedMotionRef.current ? REDUCED_SCALE : 1;

    setPhase("knocking");
    setKnockBeat(1);
    await sleep(KNOCK_BEAT_MS * scale);
    setKnockBeat(2);
    await sleep(KNOCK_REPLY_MS * scale);

    setKnockBeat(0);
    setPhase("idle");
  }

  const outlineVisible = phase !== "idle";
  const bubbleVisible = phase === "greeting" || phase === "knocking";
  const optionsVisible = phase === "greeting";

  const bubbleText =
    phase === "knocking"
      ? knockBeat === 1
        ? "*knock knock*"
        : "Nobody home... yet!"
      : GREETINGS[greetingIndex];

  return (
    <div className="relative flex-1 bg-cream overflow-hidden flex items-center justify-center px-6">
      <div className="relative flex flex-col items-center gap-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0"
          style={{
            opacity: bubbleVisible ? 1 : 0,
            transform: `translate(-50%, calc(-100% - 14px)) scale(${bubbleVisible ? 1 : 0.7})`,
            transition: "opacity 320ms ease, transform 320ms cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <div className="relative rounded-2xl border border-espresso bg-cream px-5 py-3">
            <span
              className="block whitespace-nowrap font-sans text-sm tracking-wide text-espresso"
              style={{ opacity: greetingFade ? 1 : 0, transition: `opacity ${GREETING_FADE_MS}ms ease` }}
            >
              {bubbleText}
            </span>
            <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[9px] border-x-transparent border-t-[9px] border-t-espresso" />
            <span
              className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[7px] border-x-transparent border-t-[7px] border-t-cream"
              style={{ marginTop: "-2px" }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleEnter}
          disabled={phase !== "idle"}
          aria-label="Enter"
          className="group relative flex flex-col items-center gap-6 focus:outline-none"
        >
          <span
            className="relative block"
            style={{ height: "min(52vh, 420px)", aspectRatio: "160 / 300" }}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 160 300"
              className="absolute inset-0 h-full w-full"
              style={{
                animation:
                  phase === "knocking" && knockBeat === 1 ? "door-knock 300ms ease-in-out 2" : "none",
              }}
            >
              <rect
                x="10"
                y="10"
                width="140"
                height="280"
                rx="4"
                fill="none"
                stroke="var(--color-espresso)"
                strokeWidth="1.5"
                pathLength={100}
                strokeDasharray={100}
                strokeDashoffset={outlineVisible ? 0 : 100}
                style={{ transition: "stroke-dashoffset 1050ms cubic-bezier(0.65,0,0.35,1)" }}
              />
              <rect
                x="24"
                y="24"
                width="112"
                height="252"
                rx="2"
                fill="none"
                stroke="var(--color-espresso)"
                strokeWidth="1"
                pathLength={100}
                strokeDasharray={100}
                strokeDashoffset={outlineVisible ? 0 : 100}
                style={{ transition: "stroke-dashoffset 1050ms cubic-bezier(0.65,0,0.35,1) 130ms" }}
              />
              <circle
                cx="112"
                cy="150"
                r="9"
                fill="none"
                stroke="var(--color-maroon)"
                strokeWidth="1.5"
                pathLength={100}
                strokeDasharray={100}
                strokeDashoffset={outlineVisible ? 0 : 100}
                style={{ transition: "stroke-dashoffset 850ms cubic-bezier(0.65,0,0.35,1) 300ms" }}
              />
            </svg>
          </span>

          <span
            className="font-sans text-sm font-light tracking-[0.3em] text-espresso/40 uppercase transition-all duration-500 group-hover:text-espresso/80"
            style={{ opacity: phase === "idle" ? 1 : 0, transitionDuration: "400ms" }}
          >
            Enter
          </span>
        </button>

        <div className="absolute left-1/2 top-full mt-8 -translate-x-1/2 sm:left-full sm:top-1/2 sm:mt-0 sm:ml-10 sm:translate-x-0 sm:-translate-y-1/2">
          <div
            className="flex flex-col items-center gap-3 sm:items-start"
            style={{
              opacity: optionsVisible ? 1 : 0,
              transform: optionsVisible ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 420ms ease 150ms, transform 420ms ease 150ms",
              pointerEvents: optionsVisible ? "auto" : "none",
            }}
          >
            <button
              type="button"
              onClick={handleKnock}
              disabled={!optionsVisible}
              className="font-sans text-sm font-light tracking-[0.2em] text-espresso/70 uppercase transition-colors duration-300 hover:text-espresso"
            >
              Knock
            </button>
            <button
              type="button"
              onClick={handleNevermind}
              disabled={!optionsVisible}
              className="font-sans text-sm font-light tracking-[0.2em] text-espresso/40 uppercase transition-colors duration-300 hover:text-espresso/70"
            >
              Nevermind
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

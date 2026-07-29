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

const NOTES = [
  { glyph: "♪", left: 0, top: 0, size: 14, duration: 3.2, delay: 0 },
  { glyph: "♫", left: 6, top: 10, size: 17, duration: 3.6, delay: 1 },
  { glyph: "♬", left: -4, top: 20, size: 13, duration: 3, delay: 2 },
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
  const [dark, setDark] = useState(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

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

  function toggleTheme() {
    setDark((d) => !d);
  }

  async function handleEnter() {
    if (phase !== "idle") return;
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
  const accentStroke = dark ? "var(--color-taupe)" : "var(--color-maroon)";

  const bubbleText =
    phase === "knocking"
      ? knockBeat === 1
        ? "*knock knock*"
        : "Nobody home... yet!"
      : GREETINGS[greetingIndex];

  return (
    <div className="relative flex-1 bg-background overflow-hidden flex items-center justify-center px-6 transition-colors duration-500">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        aria-pressed={dark}
        className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-foreground/10 focus:outline-none"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke={dark ? "var(--color-clay)" : "var(--foreground)"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: dark ? "drop-shadow(0 0 6px rgba(201,162,90,0.65))" : "none",
            transition: "filter 400ms ease, stroke 400ms ease",
          }}
        >
          <path d="M9 18h6" />
          <path d="M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.45 1 1.2 1 2.1h5c0-.9.4-1.65 1-2.1A6 6 0 0 0 12 3Z" />
        </svg>
      </button>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0"
        style={{
          transform: `translate(-50%, ${dark ? "0%" : "-130%"})`,
          transition: "transform 700ms cubic-bezier(0.34,1.2,0.64,1)",
        }}
      >
        <div className="mx-auto" style={{ width: 1, height: 120, background: "var(--foreground)", opacity: 0.4 }} />
        <svg
          viewBox="0 0 24 24"
          width="44"
          height="44"
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            display: "block",
            margin: "0 auto",
            filter: dark ? "drop-shadow(0 0 12px rgba(201,162,90,0.6))" : "none",
            transition: "filter 400ms ease 400ms",
          }}
        >
          <path d="M9 18h6" />
          <path d="M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.45 1 1.2 1 2.1h5c0-.9.4-1.65 1-2.1A6 6 0 0 0 12 3Z" />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[130px]"
        style={{
          transform: "translateX(-50%)",
          width: "min(90vw, 640px)",
          height: "min(58vh, 460px)",
          clipPath: optionsVisible
            ? "polygon(47% 0%, 53% 0%, 92% 100%, 20% 100%)"
            : "polygon(47% 0%, 53% 0%, 74% 100%, 26% 100%)",
          background:
            "linear-gradient(to bottom, rgba(201,162,90,0.30), rgba(201,162,90,0.08) 55%, rgba(201,162,90,0) 85%)",
          opacity: dark ? 1 : 0,
          transition: `opacity 500ms ease ${dark ? "550ms" : "0ms"}, clip-path 500ms ease`,
        }}
      />

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
          <div className="relative rounded-2xl border border-foreground bg-background px-5 py-3">
            <span
              className="block whitespace-nowrap font-sans text-sm tracking-wide text-foreground"
              style={{ opacity: greetingFade ? 1 : 0, transition: `opacity ${GREETING_FADE_MS}ms ease` }}
            >
              {bubbleText}
            </span>
            <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[9px] border-x-transparent border-t-[9px] border-t-foreground" />
            <span
              className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[7px] border-x-transparent border-t-[7px] border-t-background"
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
                stroke="var(--foreground)"
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
                stroke="var(--foreground)"
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
                stroke={accentStroke}
                strokeWidth="1.5"
                pathLength={100}
                strokeDasharray={100}
                strokeDashoffset={outlineVisible ? 0 : 100}
                style={{ transition: "stroke-dashoffset 850ms cubic-bezier(0.65,0,0.35,1) 300ms" }}
              />
            </svg>

            <div
              className="pointer-events-none absolute"
              style={{ right: "4%", top: "46%", opacity: bubbleVisible ? 1 : 0, transition: "opacity 300ms ease" }}
            >
              {NOTES.map((note, i) => (
                <span
                  key={i}
                  className="absolute select-none font-sans text-foreground/50"
                  style={{
                    left: note.left,
                    top: note.top,
                    fontSize: note.size,
                    animation: bubbleVisible
                      ? `note-float ${note.duration}s ease-out ${note.delay}s infinite`
                      : "none",
                  }}
                >
                  {note.glyph}
                </span>
              ))}
            </div>
          </span>

          <span
            className="font-sans text-sm font-light tracking-[0.3em] text-foreground/40 uppercase transition-all duration-500 group-hover:text-foreground/80"
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
              className="font-sans text-sm font-light tracking-[0.2em] text-foreground/70 uppercase transition-colors duration-300 hover:text-foreground"
            >
              Knock
            </button>
            <button
              type="button"
              onClick={handleNevermind}
              disabled={!optionsVisible}
              className="font-sans text-sm font-light tracking-[0.2em] text-foreground/40 uppercase transition-colors duration-300 hover:text-foreground/70"
            >
              Nevermind
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

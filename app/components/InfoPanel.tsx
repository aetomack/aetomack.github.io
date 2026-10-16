"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ROOM_ITEMS, type RoomItemId } from "@/app/components/roomContent";

export default function InfoPanel({ open, onClose }: { open: RoomItemId | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = open ? ROOM_ITEMS[open] : null;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {item && (
          <motion.div
            key="backdrop"
            className="absolute inset-0 z-30 bg-background/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
        )}
        {item && (
          <motion.aside
            key={open}
            role="dialog"
            aria-modal="true"
            aria-labelledby="room-panel-title"
            className="absolute inset-x-4 bottom-4 z-40 max-h-[72%] overflow-y-auto rounded-2xl border border-foreground/80 bg-background px-6 pb-7 pt-5 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-20 sm:max-h-none sm:w-[380px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.34, 1.2, 0.64, 1] }}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="pt-2 font-sans text-[11px] font-light uppercase tracking-[0.3em] text-accent">
                {item.kicker}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-2 flex h-8 w-8 items-center justify-center rounded-full font-sans text-lg font-light text-foreground/50 transition-colors hover:bg-foreground/10 hover:text-foreground focus:outline-none focus-visible:bg-foreground/10"
              >
                ×
              </button>
            </div>

            <h2 id="room-panel-title" className="mt-3 font-sans text-2xl font-light leading-snug text-foreground">
              {item.title}
            </h2>

            {item.image && (
              <figure className="mt-5">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are unoptimized */}
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  className="max-h-64 w-full rounded-lg border border-foreground/80 object-cover object-top"
                />
                {item.image.caption && (
                  <figcaption className="mt-2 font-sans text-[11px] font-light uppercase tracking-[0.18em] text-foreground/45">
                    {item.image.caption}
                  </figcaption>
                )}
              </figure>
            )}

            <div className="mt-4 space-y-3 font-sans text-sm font-light leading-relaxed text-foreground/75">
              {item.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {item.entries && (
              <ul className="mt-6 space-y-4 border-t border-foreground/15 pt-5">
                {item.entries.map((entry, i) => (
                  <li key={i}>
                    <p className="font-sans text-sm text-foreground">{entry.heading}</p>
                    {entry.meta && (
                      <p className="mt-0.5 font-sans text-[11px] font-light uppercase tracking-[0.18em] text-foreground/45">
                        {entry.meta}
                      </p>
                    )}
                    <p className="mt-1 font-sans text-sm font-light leading-relaxed text-foreground/70">{entry.text}</p>
                  </li>
                ))}
              </ul>
            )}

            {item.links && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-foreground/15 pt-5">
                {item.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="font-sans text-xs font-light uppercase tracking-[0.2em] text-foreground/70 underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

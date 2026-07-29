"use client";

import { useEffect, useState } from "react";
import DoorPortal from "@/app/components/DoorPortal";
import RoomScene from "@/app/components/RoomScene";

export default function Home() {
  const [entered, setEntered] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  const toggleTheme = () => setDark((d) => !d);

  return (
    <div className="relative flex-1 min-h-full">
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          opacity: entered ? 0 : 1,
          pointerEvents: entered ? "none" : "auto",
          transition: "opacity 600ms ease",
        }}
      >
        <DoorPortal
          onEnter={() => setEntered(true)}
          active={!entered}
          dark={dark}
          onToggleTheme={toggleTheme}
        />
      </div>
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          opacity: entered ? 1 : 0,
          pointerEvents: entered ? "auto" : "none",
          transition: "opacity 600ms ease 400ms",
        }}
      >
        <RoomScene
          visible={entered}
          dark={dark}
          onToggleTheme={toggleTheme}
          onExit={() => setEntered(false)}
        />
      </div>
    </div>
  );
}

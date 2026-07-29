"use client";

import { useState } from "react";
import DoorPortal from "@/app/components/DoorPortal";
import RoomScene from "@/app/components/RoomScene";

export default function Home() {
  const [entered, setEntered] = useState(false);

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
        <DoorPortal onEnter={() => setEntered(true)} />
      </div>
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          opacity: entered ? 1 : 0,
          pointerEvents: entered ? "auto" : "none",
          transition: "opacity 600ms ease 400ms",
        }}
      >
        <RoomScene visible={entered} />
      </div>
    </div>
  );
}

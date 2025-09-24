// app/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Alexander Tomack",
  description: "CS & Econ Vanderbilt Alum",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="./app/assets/css/main.css" />
        <noscript>
          <link rel="stylesheet" href="./app/assets/css/noscript.css" />
        </noscript>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

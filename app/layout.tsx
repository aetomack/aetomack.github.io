// app/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Alexander Tomack",
  description: "CS & Econ Vanderbilt Alum",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/main.css" />
        <noscript>
          <link rel="stylesheet" href="/assets/css/noscript.css" />
        </noscript>
      </head>
      <body>
        {children}
        <Script src="/assets/js/jquery.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/browser.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/breakpoints.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/util.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

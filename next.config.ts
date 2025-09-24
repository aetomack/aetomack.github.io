import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: "/aetomack.github.io",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

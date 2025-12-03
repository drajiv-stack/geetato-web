import type { NextConfig } from "next";
// path import kept only if you need it for other safe configs
// import path from "node:path";

// const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" }
    ]
  },
  // Remove outputFileTracingRoot for Vercel builds — it can cause path duplication issues.
  // outputFileTracingRoot: path.resolve(__dirname, '../../'),

  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },

  // turbopack custom loader removed — Orchids visual-edit loader breaks Vercel tracing.
  // If you need turbopack settings later, re-add a minimal object here.
  // turbopack: {}
};

export default nextConfig;
// Orchids restart: 1762580480813

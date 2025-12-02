"use client"

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[var(--teal)] focus:text-white focus:rounded-lg focus:font-bold focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-[var(--teal)]/50"
    >
      Skip to main content
    </a>
  )
}

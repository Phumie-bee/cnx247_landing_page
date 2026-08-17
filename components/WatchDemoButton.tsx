"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Play, X } from "lucide-react";
import { DEMO_VIDEO_ID } from "@/lib/video";

/**
 * A "watch the demo" trigger plus its lightbox.
 *
 * The <iframe> is only mounted while the modal is open, so YouTube isn't
 * contacted at all until someone actually clicks — the page costs nothing in
 * third-party requests otherwise. The embed uses youtube-nocookie.com so no
 * tracking cookies are set even then.
 */
export default function WatchDemoButton({
  variant = "card",
  className = "",
  label = "Watch the 1-minute demo",
  sublabel = "See CNX247 in action before you pick a slot.",
}: {
  /** "card" suits light surfaces; "pill" matches the Hero's outlined CTAs. */
  variant?: "card" | "pill";
  className?: string;
  label?: string;
  /** Ignored by the "pill" variant, which is a single line of text. */
  sublabel?: string;
}) {
  const [open, setOpen] = useState(false);

  // Close on Escape, and stop the page behind the overlay from scrolling.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      {variant === "pill" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className={`group inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/40 py-1.5 pl-4 pr-1.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/10 sm:gap-3 sm:pl-5 sm:text-base ${className}`}
        >
          {label}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-heading transition-all duration-300 group-hover:bg-accent group-hover:text-white">
            <Play
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110"
              fill="currentColor"
              aria-hidden="true"
            />
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          className={`group relative flex w-full items-center gap-3.5 rounded-xl border border-primary/30 bg-linear-to-r from-primary/10 via-accent/10 to-primary/10 px-4 py-3.5 text-left shadow-sm shadow-primary/5 motion-safe:transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md hover:shadow-primary/15 ${className}`}
        >
          {/* Light sweeping across the card — the thing that catches the eye
              in peripheral vision without flashing. Clipped by its own wrapper
              rather than the button, so the play button's glow ring (which
              spreads past the border) isn't cut off too. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl"
          >
            <span className="absolute inset-y-0 -left-1/2 w-1/2 bg-linear-to-r from-transparent via-white/70 to-transparent motion-safe:animate-shimmer motion-reduce:hidden" />
          </span>
          {/* The ring pulse is on a sibling rather than the circle itself so
              the hover scale and the animation don't fight over transform. */}
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-primary motion-safe:animate-ring-pulse motion-reduce:hidden"
            />
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white motion-safe:transition-transform duration-200 group-hover:scale-110">
              <Play size={15} fill="currentColor" aria-hidden="true" />
            </span>
          </span>
          <span className="relative min-w-0 flex-1">
            <span className="block text-[13.5px] font-bold text-heading">
              {label}
            </span>
            <span className="block text-[12px] leading-snug text-body">
              {sublabel}
            </span>
          </span>
          <span className="relative shrink-0 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            1 min
          </span>
        </button>
      )}

      {/* Portalled to <body>: an ancestor with a transform (the Hero's
          animate-fade-in-up, for one) becomes the containing block for
          position:fixed, which would otherwise trap the overlay inside it. */}
      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="CNX247 demo video"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-heading/80 p-4 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close video"
                autoFocus
                className="absolute -top-11 right-0 rounded-lg p-2 text-white/70 motion-safe:transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={22} aria-hidden="true" />
              </button>
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${DEMO_VIDEO_ID}?autoplay=1&rel=0`}
                  title="CNX247 product demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}

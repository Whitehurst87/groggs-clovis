/**
 * GalleryLightbox.tsx
 * --------------------------------------------------------------------------
 * React island — category-filtered image grid + yet-another-react-lightbox.
 *
 * Props:
 *   images — array of { src, alt, category } passed from the Astro page,
 *            which resolves and optimises the image URLs at build time.
 */

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

const CATEGORIES = ["All", "Interior", "Food", "Events", "Crew"] as const;
type Category = (typeof CATEGORIES)[number];

interface Props {
  images: GalleryImage[];
}

export default function GalleryLightbox({ images }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const slides = filtered.map((img) => ({ src: img.src, alt: img.alt }));

  function openAt(index: number) {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }

  return (
    <div>
      {/* ── Category tabs ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {CATEGORIES.map((cat) => {
          const count =
            cat === "All"
              ? images.length
              : images.filter((i) => i.category === cat).length;
          if (count === 0) return null;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                "inline-flex items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pub-green focus-visible:ring-offset-2 focus-visible:ring-offset-wood-darker",
                isActive
                  ? "bg-pub-green text-white"
                  : "border border-wood-mid bg-wood-dark text-text-secondary hover:border-pub-green/50 hover:text-text-primary",
              ].join(" ")}
            >
              {cat}
              <span
                className={[
                  "rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none",
                  isActive ? "bg-white/20 text-white" : "bg-wood-mid text-text-muted",
                ].join(" ")}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Image grid ────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="text-center text-text-muted py-16">No photos in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((img, i) => (
            <button
              key={img.src + i}
              onClick={() => openAt(i)}
              className="group relative overflow-hidden rounded-sm aspect-square bg-wood-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pub-green focus-visible:ring-offset-2 focus-visible:ring-offset-wood-darker"
              aria-label={`Open photo: ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
              />
              {/* Hover overlay with expand icon */}
              <div className="absolute inset-0 flex items-center justify-center bg-wood-darker/0 group-hover:bg-wood-darker/40 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                  aria-hidden="true"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        styles={{
          container: { backgroundColor: "rgba(26, 15, 10, 0.96)" },
        }}
      />
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, itemVariants } from "@/components/ui/Reveal";

type GalleryItem = {
  title: string;
  category: string;
  before: string;
  after: string;
  span?: boolean;
};

const items: GalleryItem[] = [
  {
    title: "Full Lawn Transformation",
    category: "Lawn Care",
    before:
      "https://images.unsplash.com/photo-1597844808175-89673d8e8b2c?auto=format&fit=crop&w=1100&q=80",
    after:
      "https://images.unsplash.com/photo-1560749003-f4b1e17e2dff?auto=format&fit=crop&w=1100&q=80",
    span: true,
  },
  {
    title: "Fresh Mulch & Bed Edging",
    category: "Mulching",
    before:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Overgrown Lot Cleared",
    category: "Land Clearing",
    before:
      "https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?auto=format&fit=crop&w=900&q=80",
    after:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Seasonal Property Cleanup",
    category: "Cleanups",
    before:
      "https://images.unsplash.com/photo-1508692522281-9dc8b2178c0e?auto=format&fit=crop&w=1100&q=80",
    after:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1100&q=80",
    span: true,
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-cream py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Our Work"
          title="Before &amp; After Transformations"
          subtitle="Real results on real properties. Hover (or tap) each project to see the transformation."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <motion.figure
              key={item.title}
              variants={itemVariants}
              className={`group relative h-72 overflow-hidden rounded-2xl shadow-card ring-1 ring-forest-900/5 sm:h-80 ${
                item.span ? "lg:col-span-2" : ""
              }`}
            >
              {/* After (revealed) */}
              <Image
                src={item.after}
                alt={`${item.title} — after`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Before (default, fades out on hover) */}
              <Image
                src={item.before}
                alt={`${item.title} — before`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0 group-focus-within:opacity-0"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />

              {/* Before / After badge */}
              <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-forest-800 transition-opacity duration-300 group-hover:opacity-0">
                Before
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-forest-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                After
              </span>

              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-earth-200">
                  {item.category}
                </span>
                <p className="mt-1 font-display text-xl font-semibold text-white">
                  {item.title}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

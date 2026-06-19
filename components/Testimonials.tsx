"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, itemVariants } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="star"
          className={`h-4 w-4 ${i < count ? "fill-earth-400 text-earth-400" : "text-forest-200"}`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="bg-cream py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          subtitle="We've earned a 5-star reputation by showing up, communicating clearly, and delivering work that speaks for itself."
        />

        <StaggerGroup className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <motion.figure
              key={t.name + t.location}
              variants={itemVariants}
              className="relative flex h-full flex-col rounded-2xl bg-white p-7 shadow-card ring-1 ring-forest-900/5"
            >
              <Icon
                name="quote"
                className="absolute right-6 top-6 h-9 w-9 text-forest-100"
              />
              <Stars count={t.rating} />
              <blockquote className="mt-4 flex-1 text-bark/80 text-pretty">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-forest-50 pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-700 font-display text-base font-semibold text-white">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block font-semibold text-forest-900">
                    {t.name}
                  </span>
                  <span className="block text-sm text-bark/60">
                    {t.location} • {t.service}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

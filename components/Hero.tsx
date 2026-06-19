"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { useQuote } from "@/components/providers/QuoteProvider";
import { Icon } from "@/components/ui/Icon";

const badges = [
  "Fully Insured",
  "Reliable Service",
  "Free Estimates",
  "Residential & Commercial",
];

export function Hero() {
  const { openQuote } = useQuote();

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* Background photography */}
      <Image
        src="https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=2400&q=80"
        alt="Beautifully manicured residential lawn and landscaping"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-forest-950/20" />

      <div className="container relative flex min-h-[100svh] flex-col justify-center pb-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
            <Icon name="star" className="h-4 w-4 text-earth-200" />
            5-Star Rated • {site.address.region}
          </span>

          <h1 className="heading-display mt-6 text-4xl text-white text-balance sm:text-5xl lg:text-6xl">
            Professional Landscaping &amp; Property Maintenance Done Right
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white/85 text-pretty">
            From weekly lawn care to large-scale land clearing, we help
            homeowners and businesses keep their properties looking their best
            year-round.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openQuote("hero")}
              className="btn-primary !px-8 !py-4 text-base"
            >
              Get Free Quote
              <Icon name="arrowRight" className="h-5 w-5" />
            </button>
            <a href={site.phoneHref} className="btn-secondary !px-8 !py-4 text-base">
              <Icon name="phone" className="h-5 w-5" />
              Call Now
            </a>
          </div>

          {/* Trust badges */}
          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
            {badges.map((badge, i) => (
              <motion.li
                key={badge}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="flex items-center gap-2 text-sm font-medium text-white"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest-500/90 text-white">
                  <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                {badge}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/40 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-white/80"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { useQuote } from "@/components/providers/QuoteProvider";

export function FinalCTA() {
  const { openQuote } = useQuote();

  return (
    <section className="relative overflow-hidden py-28 sm:py-32">
      <Image
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2200&q=80"
        alt="Premium landscaped property at golden hour"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-forest-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 to-forest-900/40" />

      <div className="container relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl"
        >
          <span className="eyebrow !text-earth-200">
            <span className="h-px w-6 bg-current" />
            Free • No Obligation
            <span className="h-px w-6 bg-current" />
          </span>
          <h2 className="heading-display mt-5 text-4xl !text-white text-balance sm:text-5xl lg:text-6xl">
            Ready To Transform Your Property?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 text-pretty">
            Get your free estimate today and see why property owners trust us to
            keep their landscapes looking their absolute best.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openQuote("final-cta")}
              className="btn-primary !bg-white !text-forest-900 hover:!bg-cream !px-8 !py-4 text-base"
            >
              Get Free Quote
              <Icon name="arrowRight" className="h-5 w-5" />
            </button>
            <a href={site.phoneHref} className="btn-secondary !px-8 !py-4 text-base">
              <Icon name="phone" className="h-5 w-5" />
              Call {site.phoneDisplay}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

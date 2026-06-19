"use client";

import { motion } from "framer-motion";
import { process } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, itemVariants } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { useQuote } from "@/components/providers/QuoteProvider";

export function Process() {
  const { openQuote } = useQuote();

  return (
    <section className="bg-white py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="How It Works"
          title="Getting Started Is Simple"
          subtitle="From your first call to a property you're proud of, our process is fast, transparent, and hassle-free."
        />

        <StaggerGroup className="relative mt-16 grid gap-8 md:grid-cols-4">
          {/* Connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-forest-200 to-transparent md:block" />

          {process.map((item) => (
            <motion.div
              key={item.step}
              variants={itemVariants}
              className="relative text-center md:text-left"
            >
              <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-700 font-display text-xl font-bold text-white shadow-cta md:mx-0">
                {item.step}
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-forest-900">
                {item.title}
              </h3>
              <p className="mt-2 text-bark/70">{item.body}</p>
            </motion.div>
          ))}
        </StaggerGroup>

        <div className="mt-14 flex justify-center">
          <button
            onClick={() => openQuote("process")}
            className="btn-primary !px-8 !py-4 text-base"
          >
            Start With a Free Quote
            <Icon name="arrowRight" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

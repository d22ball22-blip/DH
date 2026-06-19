"use client";

import { motion } from "framer-motion";
import { serviceAreas, site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, itemVariants, Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { useQuote } from "@/components/providers/QuoteProvider";

export function ServiceAreas() {
  const { openQuote } = useQuote();

  return (
    <section className="relative overflow-hidden bg-forest-950 py-24 text-white sm:py-28">
      {/* Decorative map grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -right-20 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-white/10 lg:block" />
      <div className="absolute -right-10 top-1/2 hidden h-[260px] w-[260px] -translate-y-1/2 rounded-full border border-white/10 lg:block" />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Service Areas"
              title="We Proudly Serve Your Neighborhood"
              subtitle="Locally owned and operated, we provide professional landscaping and property maintenance across the Greater Tri-County Area and surrounding communities."
              align="left"
              light
            />

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-white/70 text-pretty">
                Whether you need weekly lawn care in {serviceAreas[0]}, mulch
                installation in {serviceAreas[1]}, or commercial grounds
                maintenance in {serviceAreas[2]}, our crews know these
                communities — and the local climate — inside and out. Don&apos;t
                see your town listed? There&apos;s a good chance we cover it.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <button
                onClick={() => openQuote("service-areas")}
                className="btn-primary mt-8 !bg-white !text-forest-900 hover:!bg-cream"
              >
                Check Your Area
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
            </Reveal>
          </div>

          <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {serviceAreas.map((area) => (
              <motion.div
                key={area}
                variants={itemVariants}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm font-medium backdrop-blur transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <Icon name="map" className="h-4 w-4 shrink-0 text-earth-200" />
                {area}
              </motion.div>
            ))}
          </StaggerGroup>
        </div>

        <Reveal className="mt-12 border-t border-white/10 pt-8 text-center">
          <p className="text-white/60">
            Proudly serving homeowners &amp; businesses since {site.foundedYear} •{" "}
            <a
              href={site.phoneHref}
              className="font-semibold text-white underline"
            >
              {site.phoneDisplay}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

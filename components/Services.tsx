"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, itemVariants } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { useQuote } from "@/components/providers/QuoteProvider";

export function Services() {
  const { openQuote } = useQuote();

  return (
    <section id="services" className="bg-cream py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="What We Do"
          title="Premium Services for Every Property"
          subtitle="A full range of professional landscaping and property maintenance services, delivered with commercial-grade equipment and meticulous attention to detail."
        />

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.article
              key={service.slug}
              variants={itemVariants}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-forest-900/5 transition-shadow duration-300 hover:shadow-card-lg"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.title} — ${service.blurb}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/10 to-transparent" />
                <h3 className="absolute bottom-4 left-5 font-display text-2xl font-semibold text-white">
                  {service.title}
                </h3>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="text-bark/70">{service.description}</p>
                <ul className="mt-5 space-y-2.5">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-bark/80"
                    >
                      <Icon
                        name="check"
                        className="h-4 w-4 shrink-0 text-forest-500"
                        strokeWidth={2.5}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openQuote(`service-${service.slug}`)}
                  className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-forest-700 transition-colors hover:text-forest-900"
                >
                  Request This Service
                  <Icon
                    name="arrowRight"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </motion.article>
          ))}
        </StaggerGroup>

        <Banner />
      </div>
    </section>
  );
}

function Banner() {
  const { openQuote } = useQuote();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl bg-forest-900 px-7 py-7 text-center sm:flex-row sm:text-left"
    >
      <p className="font-display text-xl font-medium text-white sm:text-2xl">
        Don&apos;t see exactly what you need?{" "}
        <span className="text-earth-200">We do it all.</span>
      </p>
      <button
        onClick={() => openQuote("services-banner")}
        className="btn-primary shrink-0 !bg-white !text-forest-900 hover:!bg-cream"
      >
        Get a Custom Quote
        <Icon name="arrowRight" className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

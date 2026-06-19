"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { commercialClients } from "@/lib/site";
import { Reveal, StaggerGroup, itemVariants } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { useQuote } from "@/components/providers/QuoteProvider";

export function Commercial() {
  const { openQuote } = useQuote();

  return (
    <section id="commercial" className="bg-white py-24 sm:py-28">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Visual */}
          <Reveal direction="right" className="order-2 lg:order-1">
            <div className="relative">
              <div className="relative h-[460px] overflow-hidden rounded-3xl shadow-card-lg">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Commercial property with professionally maintained landscaping"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-4 w-52 rounded-2xl bg-forest-900 p-5 text-white shadow-card-lg sm:-right-6"
              >
                <p className="font-display text-3xl font-semibold">100+</p>
                <p className="mt-1 text-sm text-forest-200">
                  Commercial properties under contract
                </p>
              </motion.div>
            </div>
          </Reveal>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="eyebrow">
              <span className="h-px w-6 bg-current" />
              Commercial Services
            </span>
            <h2 className="heading-display mt-4 text-3xl sm:text-4xl">
              Reliable Grounds Care for Your Business
            </h2>
            <p className="mt-4 text-lg text-bark/70 text-pretty">
              One dependable partner for all your commercial property needs —
              with the equipment, crews, and accountability to keep every site
              looking professional year-round.
            </p>

            <StaggerGroup className="mt-8 space-y-3">
              {commercialClients.map((c) => (
                <motion.div
                  key={c.title}
                  variants={itemVariants}
                  className="flex gap-4 rounded-xl border border-forest-100 p-4 transition-colors hover:border-forest-200 hover:bg-forest-50/50"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-700">
                    <Icon name="building" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-forest-900">{c.title}</h3>
                    <p className="text-sm text-bark/65">{c.body}</p>
                  </div>
                </motion.div>
              ))}
            </StaggerGroup>

            <button
              onClick={() => openQuote("commercial")}
              className="btn-primary mt-8 !px-8 !py-4 text-base"
            >
              Request a Commercial Contract
              <Icon name="arrowRight" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

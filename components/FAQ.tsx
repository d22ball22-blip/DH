"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs, site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { useQuote } from "@/components/providers/QuoteProvider";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { openQuote } = useQuote();

  return (
    <section id="faq" className="bg-white py-24 sm:py-28">
      <div className="container max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our services, pricing, and scheduling. Still have questions? We're a phone call away."
        />

        <Reveal className="mt-12 divide-y divide-forest-100 border-y border-forest-100">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-lg font-medium text-forest-900">
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 bg-forest-700 text-white"
                        : "bg-forest-50 text-forest-700"
                    }`}
                  >
                    <Icon name="plus" className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-bark/70 text-pretty">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-cream p-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-bark/75">
            <span className="font-semibold text-forest-900">
              Still have questions?
            </span>{" "}
            Our friendly team is happy to help.
          </p>
          <div className="flex shrink-0 gap-3">
            <a href={site.phoneHref} className="btn-outline">
              <Icon name="phone" className="h-4 w-4" />
              Call Us
            </a>
            <button onClick={() => openQuote("faq")} className="btn-primary">
              Get a Quote
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

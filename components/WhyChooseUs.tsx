"use client";

import { motion } from "framer-motion";
import { whyUs, stats } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, itemVariants, Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CountUp } from "@/components/ui/CountUp";

export function WhyChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="The Trusted Choice for Property Owners"
          subtitle="We've built our reputation on reliability, craftsmanship, and treating every property like it's our own."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group rounded-2xl border border-forest-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-forest-200 hover:shadow-card"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-forest-50 text-forest-700 transition-colors duration-300 group-hover:bg-forest-700 group-hover:text-white">
                <Icon name={item.icon as IconName} className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-forest-900">
                {item.title}
              </h3>
              <p className="mt-2 text-bark/70">{item.body}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>

      {/* Stats band */}
      <div className="container mt-16">
        <Reveal className="overflow-hidden rounded-3xl bg-forest-900 bg-grain [background-size:18px_18px]">
          <div className="grid grid-cols-2 divide-x divide-y divide-white/10 lg:grid-cols-4 lg:divide-y-0">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 py-10 text-center">
                <p className="font-display text-4xl font-semibold text-white sm:text-5xl">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-forest-200">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

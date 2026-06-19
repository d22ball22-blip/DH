"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

const values = [
  { icon: "tools", label: "Hard Work" },
  { icon: "clock", label: "Reliability" },
  { icon: "shield", label: "Professionalism" },
  { icon: "home", label: "Community" },
] as const;

export function About() {
  const years = new Date().getFullYear() - site.foundedYear;

  return (
    <section id="about" className="bg-cream py-24 sm:py-28">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Images */}
          <Reveal direction="right">
            <div className="relative grid grid-cols-2 gap-4">
              <div className="relative mt-10 h-64 overflow-hidden rounded-2xl shadow-card sm:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1626863905121-3b0c0ed7b94c?auto=format&fit=crop&w=800&q=80"
                  alt="Landscaping crew at work on a residential property"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative h-64 overflow-hidden rounded-2xl shadow-card sm:h-80">
                <Image
                  src="https://images.unsplash.com/photo-1599629954294-14df9ec8bc4a?auto=format&fit=crop&w=800&q=80"
                  alt="Freshly mowed and manicured green lawn"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* Story */}
          <div>
            <span className="eyebrow">
              <span className="h-px w-6 bg-current" />
              Our Story
            </span>
            <h2 className="heading-display mt-4 text-3xl sm:text-4xl">
              A Family-Owned Company Built on Doing It Right
            </h2>
            <div className="mt-5 space-y-4 text-bark/75 text-pretty">
              <p>
                {site.name} started with a truck, a trailer, and a simple
                promise: show up on time, do honest work, and treat every
                property like it&apos;s our own. More than {years} years later,
                that promise still drives everything we do.
              </p>
              <p>
                We&apos;re a locally owned, family-run business — not a faceless
                national chain. When you call us, you talk to people who live in
                the same communities we serve. That&apos;s why our clients trust
                us with everything from their weekly mow to their largest
                land-clearing projects.
              </p>
              <p>
                From the first handshake to the final cleanup, our team brings
                professional-grade equipment, genuine pride in our craft, and a
                commitment to your complete satisfaction. We&apos;re proud to
                give back to the neighborhoods that have supported us, and
                we&apos;d be honored to earn your business too.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {values.map((v) => (
                <div
                  key={v.label}
                  className="flex flex-col items-center gap-2 rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-forest-900/5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-50 text-forest-700">
                    <Icon name={v.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold text-forest-900">
                    {v.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

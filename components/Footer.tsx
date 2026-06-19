"use client";

import { nav, services, serviceAreas, site } from "@/lib/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { useQuote } from "@/components/providers/QuoteProvider";

const socials: { name: string; href: string; icon: IconName }[] = [
  { name: "Facebook", href: site.social.facebook, icon: "users" },
  { name: "Instagram", href: site.social.instagram, icon: "star" },
  { name: "Google", href: site.social.google, icon: "map" },
  { name: "YouTube", href: site.social.youtube, icon: "bolt" },
];

export function Footer() {
  const { openQuote } = useQuote();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-white">
      {/* Contact strip */}
      <div className="border-b border-white/10">
        <div className="container grid gap-6 py-12 sm:grid-cols-3">
          {[
            { icon: "phone", label: "Call Us", value: site.phoneDisplay, href: site.phoneHref },
            { icon: "mail", label: "Email Us", value: site.email, href: site.emailHref },
            { icon: "clock", label: "Hours", value: site.hours, href: undefined },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-earth-200">
                <Icon name={c.icon as IconName} className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-forest-200">
                  {c.label}
                </p>
                {c.href ? (
                  <a
                    href={c.href}
                    className="font-display text-lg font-medium hover:text-earth-200"
                  >
                    {c.value}
                  </a>
                ) : (
                  <p className="font-display text-lg font-medium">{c.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-700">
              <Icon name="leaf" className="h-6 w-6" />
            </span>
            <span className="font-display text-lg font-semibold">{site.name}</span>
          </div>
          <p className="mt-4 text-sm text-white/60 text-pretty">
            Professional landscaping and property maintenance for homeowners and
            businesses across the {site.address.region}. Fully insured. Free
            estimates.
          </p>
          <div className="mt-5 flex gap-2.5">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                aria-label={s.name}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/80 transition-colors hover:bg-forest-600 hover:text-white"
              >
                <Icon name={s.icon} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-earth-200">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-white/65 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => openQuote("footer")}
                className="text-white/65 transition-colors hover:text-white"
              >
                Get a Free Quote
              </button>
            </li>
          </ul>
        </nav>

        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-earth-200">
            Services
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href="#services"
                  className="text-white/65 transition-colors hover:text-white"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Service areas */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-earth-200">
            Service Areas
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {serviceAreas.map((area) => (
              <li key={area} className="text-white/65">
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-white/50 sm:flex-row sm:text-left">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>
            Fully Insured • Free Estimates • Residential &amp; Commercial
          </p>
        </div>
      </div>
    </footer>
  );
}

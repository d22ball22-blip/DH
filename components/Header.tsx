"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/site";
import { useQuote } from "@/components/providers/QuoteProvider";
import { Icon } from "@/components/ui/Icon";

export function Header() {
  const { openQuote } = useQuote();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 shadow-[0_4px_24px_-12px_rgba(18,50,31,0.25)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <a
          href="#top"
          className="flex items-center gap-2.5"
          aria-label={`${site.name} home`}
        >
          <span
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
              scrolled ? "bg-forest-700 text-white" : "bg-white/15 text-white backdrop-blur"
            }`}
          >
            <Icon name="leaf" className="h-6 w-6" />
          </span>
          <span className="leading-tight">
            <span
              className={`block font-display text-lg font-semibold transition-colors ${
                scrolled ? "text-forest-900" : "text-white"
              }`}
            >
              {site.name}
            </span>
            <span
              className={`block text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                scrolled ? "text-forest-600" : "text-white/70"
              }`}
            >
              {site.tagline}
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`link-underline text-sm font-medium transition-colors ${
                scrolled
                  ? "text-bark/80 hover:text-forest-700"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className={`hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:inline-flex ${
              scrolled
                ? "text-forest-800 hover:bg-forest-50"
                : "text-white hover:bg-white/10"
            }`}
          >
            <Icon name="phone" className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
          <button
            onClick={() => openQuote("header")}
            className="hidden btn-primary !px-5 !py-2.5 sm:inline-flex"
          >
            Free Quote
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className={`rounded-lg p-2 lg:hidden ${
              scrolled ? "text-forest-900" : "text-white"
            }`}
          >
            <Icon name={menuOpen ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-forest-100 bg-white lg:hidden"
          >
            <nav className="container flex flex-col py-4">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-forest-50 py-3 text-base font-medium text-bark/80"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    openQuote("mobile-menu");
                  }}
                  className="btn-primary w-full"
                >
                  Get Free Quote
                </button>
                <a href={site.phoneHref} className="btn-outline w-full">
                  <Icon name="phone" className="h-4 w-4" />
                  Call {site.phoneDisplay}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

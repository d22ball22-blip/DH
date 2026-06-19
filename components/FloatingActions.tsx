"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { useQuote } from "@/components/providers/QuoteProvider";

export function FloatingActions() {
  const { openQuote } = useQuote();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop: floating quote button (bottom-right) */}
      <AnimatePresence>
        {visible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            onClick={() => openQuote("floating-button")}
            className="group fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 rounded-full bg-forest-600 py-3.5 pl-5 pr-6 font-semibold text-white shadow-cta animate-pulse-ring hover:bg-forest-700 md:inline-flex"
          >
            <Icon name="leaf" className="h-5 w-5" />
            Free Quote
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile: sticky click-to-call + quote bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-forest-900/10 bg-white/95 backdrop-blur md:hidden">
        <a
          href={site.phoneHref}
          className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-forest-800"
        >
          <Icon name="phone" className="h-5 w-5" />
          Call Now
        </a>
        <button
          onClick={() => openQuote("mobile-sticky")}
          className="flex flex-1 items-center justify-center gap-2 bg-forest-600 py-3.5 text-sm font-semibold text-white"
        >
          <Icon name="leaf" className="h-5 w-5" />
          Free Quote
        </button>
      </div>
    </>
  );
}

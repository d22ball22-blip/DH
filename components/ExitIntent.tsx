"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { useQuote } from "@/components/providers/QuoteProvider";

const STORAGE_KEY = "hl_exit_intent_seen";

export function ExitIntent() {
  const { openQuote, isOpen: quoteOpen } = useQuote();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let armed = false;
    // Arm after a short delay so it doesn't fire immediately on load.
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, 6000);

    const trigger = () => {
      if (!armed || sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setShow(true);
    };

    // Desktop: mouse leaves toward the top (closing tab / address bar).
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    // Mobile fallback: fast scroll back to top after engaging.
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (lastY - y > 90 && y < 240) trigger();
      lastY = y;
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Never overlap the main quote modal.
  const open = show && !quoteOpen;

  const close = () => setShow(false);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Dismiss offer"
            className="absolute inset-0 bg-forest-950/70 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-title"
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white text-center shadow-card-lg"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-2 text-bark/40 transition hover:bg-forest-50 hover:text-bark"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>

            <div className="bg-forest-900 px-8 pb-8 pt-10 text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-earth-400/20 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-earth-200">
                <Icon name="leaf" className="h-4 w-4" />
                Wait — Before You Go!
              </span>
              <h2
                id="exit-title"
                className="mt-4 font-display text-3xl font-semibold"
              >
                Get $50 Off Your First Service
              </h2>
              <p className="mt-2 text-white/75">
                New customers save on their first lawn care, mulch, or cleanup
                service when you request a free estimate today.
              </p>
            </div>

            <div className="px-8 py-7">
              <button
                onClick={() => {
                  close();
                  openQuote("exit-intent");
                }}
                className="btn-primary w-full !py-4 text-base"
              >
                Claim My $50 Off
                <Icon name="arrowRight" className="h-5 w-5" />
              </button>
              <a
                href={site.phoneHref}
                className="mt-3 inline-flex items-center justify-center gap-2 text-sm font-semibold text-forest-700"
              >
                <Icon name="phone" className="h-4 w-4" />
                Or call {site.phoneDisplay}
              </a>
              <button
                onClick={close}
                className="mt-4 block w-full text-xs text-bark/40 hover:text-bark/60"
              >
                No thanks, I&apos;ll pass on the savings
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

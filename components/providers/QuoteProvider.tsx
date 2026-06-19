"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { QuoteModal } from "@/components/QuoteModal";

type QuoteContextValue = {
  isOpen: boolean;
  source: string;
  openQuote: (source?: string) => void;
  closeQuote: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within <QuoteProvider>");
  return ctx;
}

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("website");

  const openQuote = useCallback((src = "website") => {
    setSource(src);
    setIsOpen(true);
  }, []);

  const closeQuote = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, source, openQuote, closeQuote }),
    [isOpen, source, openQuote, closeQuote],
  );

  return (
    <QuoteContext.Provider value={value}>
      {children}
      <QuoteModal />
    </QuoteContext.Provider>
  );
}

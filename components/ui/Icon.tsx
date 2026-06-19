import type { SVGProps } from "react";

/** Lightweight inline icon set (stroke-based) — keeps bundle small, no icon lib. */
const paths: Record<string, React.ReactNode> = {
  phone: (
    <path d="M3 5.5C3 4.12 4.12 3 5.5 3h1.7c.6 0 1.13.4 1.29.98l.86 3.16a1.34 1.34 0 0 1-.37 1.3l-1.2 1.2a14 14 0 0 0 5.38 5.38l1.2-1.2a1.34 1.34 0 0 1 1.3-.37l3.16.86c.58.16.98.69.98 1.29v1.7c0 1.38-1.12 2.5-2.5 2.5h-.5C9.6 21 3 14.4 3 6V5.5Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  star: (
    <path d="M12 3.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L12 16.77l-5.2 2.73.99-5.78-4.21-4.1 5.82-.85L12 3.5Z" />
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  shield: (
    <path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3Z" />
  ),
  tools: (
    <path d="M14.7 6.3a4 4 0 0 0 5 5l-9.9 9.9a2.1 2.1 0 0 1-3-3l9.9-9.9ZM6.5 4 9 6.5M4 6.5 6.5 9" />
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0M16 5.3a3 3 0 0 1 0 5.4M17 14c2.4.5 4 2.5 4 6" />
    </>
  ),
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z" />,
  tag: (
    <>
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
      <circle cx="7.5" cy="7.5" r="1.3" />
    </>
  ),
  leaf: (
    <path d="M5 21c0-9 6-15 16-15 0 10-6 16-15 16M5 21c2-5 5-8 9-10" />
  ),
  truck: (
    <>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </>
  ),
  snow: (
    <path d="M12 2v20M4.5 6l15 12M19.5 6l-15 12M2 12h20M7 4l5 3 5-3M7 20l5-3 5 3" />
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8 8l12 9M8 16 20 7" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M15 9h3a2 2 0 0 1 2 2v10" />
      <path d="M8 7h3M8 11h3M8 15h3" />
    </>
  ),
  home: <path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  map: (
    <>
      <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  quote: (
    <path d="M9 7H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2v2a2 2 0 0 1-2 2H5m14-10h-4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2v2a2 2 0 0 1-2 2h0" />
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6 18 18M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
};

export type IconName = keyof typeof paths;

export function Icon({
  name,
  ...props
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

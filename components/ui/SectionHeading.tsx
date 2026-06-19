import { Reveal } from "@/components/ui/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      <span
        className={`eyebrow ${light ? "!text-earth-200" : ""}`}
      >
        <span className="h-px w-6 bg-current" />
        {eyebrow}
      </span>
      <h2
        className={`heading-display mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] ${
          light ? "!text-white" : ""
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg text-pretty ${
            light ? "text-white/75" : "text-bark/70"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

// Shared approval stamp (design/heuristics.md #1): the product's signature
// element. Every APROBADO / REVISAR stamp renders through this one component so
// instances never drift. "approved" is the validated state (approved green);
// "revisar" means it needs correction (stamp red). Rotated a couple of degrees
// off-axis like a real hand stamp, in the Special Elite (font-stamp) face.

type StampProps = {
  variant: "approved" | "revisar";
  /** Visual scale: "lg" for the demo climax, "sm" for inline legends. */
  size?: "lg" | "sm";
  /** Play the landing animation on mount (motion-safe). */
  animate?: boolean;
};

const LABEL: Record<StampProps["variant"], string> = {
  approved: "APROBADO",
  revisar: "REVISAR",
};

export function Stamp({ variant, size = "lg", animate = false }: StampProps) {
  const approved = variant === "approved";
  const className = [
    "inline-block border-2 font-stamp uppercase tracking-widest",
    approved
      ? "-rotate-2 border-approved text-approved"
      : "rotate-2 border-stamp text-stamp",
    size === "lg" ? "px-5 py-1 text-display-sm" : "px-4 py-1 text-data",
    animate ? "motion-safe:animate-stamp-land" : "",
  ].join(" ");

  return <span className={className}>{LABEL[variant]}</span>;
}

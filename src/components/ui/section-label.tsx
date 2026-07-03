// Shared mono caption label (design/heuristics.md #1): every dossier-style
// label (section side labels, case step labels, case titles) renders through
// this component instead of repeating the utility classes per section.

type SectionLabelProps = {
  as?: "p" | "h2";
  /** "title" is the larger ink-colored form, e.g. the "CASO #0001" heading. */
  variant?: "label" | "title";
  children: React.ReactNode;
  /** Optional second line, rendered as a block below the first. */
  secondary?: React.ReactNode;
};

const VARIANT_CLASSES: Record<NonNullable<SectionLabelProps["variant"]>, string> = {
  label: "text-caption text-graphite",
  title: "text-data font-medium",
};

export function SectionLabel({
  as: Tag = "p",
  variant = "label",
  children,
  secondary,
}: SectionLabelProps) {
  return (
    <Tag
      className={`font-mono uppercase tracking-widest ${VARIANT_CLASSES[variant]}`}
    >
      {children}
      {secondary ? <span className="mt-1 block">{secondary}</span> : null}
    </Tag>
  );
}

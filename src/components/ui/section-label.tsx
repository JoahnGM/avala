// Shared mono caption label (design/heuristics.md #1): every dossier-style
// label (section side labels, case step labels) renders through this
// component instead of repeating the utility classes per section.

type SectionLabelProps = {
  as?: "p" | "h2";
  children: React.ReactNode;
  /** Optional second line, rendered as a block below the first. */
  secondary?: React.ReactNode;
};

export function SectionLabel({
  as: Tag = "p",
  children,
  secondary,
}: SectionLabelProps) {
  return (
    <Tag className="font-mono text-caption uppercase tracking-widest text-graphite">
      {children}
      {secondary ? <span className="mt-1 block">{secondary}</span> : null}
    </Tag>
  );
}

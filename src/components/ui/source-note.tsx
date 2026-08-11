// Provenance line for a user-facing figure (design/heuristics.md #2): every
// number on the page states either the norm it comes from — an `N-xxx` in
// `agents/legal-brain.md` §1 — or that it is illustrative, and it says so
// directly beneath the figure rather than in a section-level caption.
//
// Shared because the same element appears under the hero stats and under the
// risk-section fronts; per design/heuristics.md #1 it renders through one
// component instead of repeated utility classes per section.

type SourceNoteProps = {
  /** The citation or marker, user-facing Spanish. E.g. "Ley 1607/2012 · art. 179". */
  children: React.ReactNode;
};

export function SourceNote({ children }: SourceNoteProps) {
  return (
    <p className="mt-1 font-mono text-caption text-graphite">{children}</p>
  );
}

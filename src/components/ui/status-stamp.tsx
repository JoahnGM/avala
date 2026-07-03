// Shared result stamp — the signature element from design/tokens.md: lands
// 2° off-axis in Special Elite via the stamp-land animation. `approved`
// green is reserved for the "aprobado" variant; everything else that needs
// attention uses stamp red. Remount (change `key`) to replay the landing.

type StatusStampProps = {
  state: "aprobado" | "revisar";
};

const STAMP_LABEL: Record<StatusStampProps["state"], string> = {
  aprobado: "APROBADO",
  revisar: "REVISAR",
};

export function StatusStamp({ state }: StatusStampProps) {
  const approved = state === "aprobado";
  return (
    // Rotation lives on the wrapper so the landing animation's transform
    // doesn't overwrite the off-axis stamp angle.
    <span className={`inline-block ${approved ? "-rotate-2" : "rotate-2"}`}>
      <span
        className={`block border-2 px-5 py-1 font-stamp text-display-sm uppercase tracking-widest motion-safe:animate-stamp-land ${
          approved ? "border-approved text-approved" : "border-stamp text-stamp"
        }`}
      >
        {STAMP_LABEL[state]}
      </span>
    </span>
  );
}

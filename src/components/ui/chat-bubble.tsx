// Shared chat message bubble (design/heuristics.md #1): every message in a
// simulated conversation renders through this component. Sent (AVALA) vs
// received (proveedor) is a real state distinction; anything else must look
// the same across sections. Renders an <li> — always place inside <ol>/<ul>.

type ChatBubbleProps = {
  sender: "avala" | "proveedor";
  /** Visible sender name (user-facing, Spanish). */
  label: string;
  /** "action" renders the content in italics (e.g. sending an attachment). */
  variant?: "text" | "action";
  children: React.ReactNode;
};

export function ChatBubble({
  sender,
  label,
  variant = "text",
  children,
}: ChatBubbleProps) {
  const fromAvala = sender === "avala";
  return (
    <li className={fromAvala ? "" : "flex flex-col items-end"}>
      <p className="font-mono text-caption uppercase tracking-widest text-graphite">
        {label}
      </p>
      <p
        className={`mt-1 max-w-xs px-4 py-3 text-data ${
          fromAvala
            ? "rounded-md rounded-tl-none bg-ink text-paper"
            : "rounded-md rounded-tr-none border border-hairline text-right"
        } ${variant === "action" ? "italic" : ""}`}
      >
        {children}
      </p>
    </li>
  );
}

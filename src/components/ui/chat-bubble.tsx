// Shared chat message bubble (design/heuristics.md #1): every message in a
// simulated conversation renders through this component. Sent (AVALA) vs
// received (proveedor) is a real state distinction; anything else must look
// the same across sections. Renders an <li> — always place inside <ol>/<ul>.
//
// Styled as an iOS messaging bubble but skinned to AVALA tokens: AVALA speaks
// in a filled `ink` bubble on the left, the supplier replies in an outlined
// bubble on the right. The sender name is not shown per-bubble (the chat header
// names the contact) but is exposed to screen readers via an sr-only label.

function AttachmentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" aria-hidden="true">
      <path
        className="fill-stamp"
        d="M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
      />
      <path className="fill-paper" d="M14 2l4 4h-4z" />
      <text
        x="11"
        y="16.5"
        textAnchor="middle"
        className="fill-paper font-mono"
        fontSize="5.5"
        fontWeight="700"
      >
        PDF
      </text>
    </svg>
  );
}

type ChatBubbleProps = {
  sender: "avala" | "proveedor";
  /** Accessible sender name (user-facing, Spanish). Announced to screen
   * readers; the chat header already names the contact visually. */
  label: string;
  /** Timestamp shown under the bubble (user-facing). */
  time?: string;
  /** Delivery status under a received bubble, e.g. "Leído". */
  status?: string;
  /** "attachment" renders the content as a document chip (a PDF being sent). */
  variant?: "text" | "attachment";
  children: React.ReactNode;
};

export function ChatBubble({
  sender,
  label,
  time,
  status,
  variant = "text",
  children,
}: ChatBubbleProps) {
  const fromAvala = sender === "avala";
  return (
    <li className={`flex flex-col ${fromAvala ? "items-start" : "items-end"}`}>
      <span className="sr-only">{label}:</span>
      <div
        className={`max-w-bubble px-3.5 py-2.5 text-data ${
          fromAvala
            ? "rounded-bubble rounded-bl-sm bg-ink text-paper"
            : "rounded-bubble rounded-br-sm border border-hairline bg-paper text-ink"
        }`}
      >
        {variant === "attachment" ? (
          <span className="flex items-center gap-3">
            <AttachmentIcon />
            <span className="font-mono leading-tight">{children}</span>
          </span>
        ) : (
          children
        )}
      </div>
      {(time || status) && (
        <span className="mt-1 px-1 font-mono text-micro text-graphite">
          {time}
          {time && status ? " · " : ""}
          {status}
        </span>
      )}
    </li>
  );
}

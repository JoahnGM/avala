// iOS device shell for high-fidelity screen mockups (design/heuristics.md #1):
// any "phone screen" in the landing renders its chrome through this component.
// Deliberately NOT an iMessage clone — the bezel is `ink`, the screen is
// `paper`, and the content inside uses the AVALA palette, so the mockup reads
// as our product on a phone rather than a generic Apple screenshot.

function StatusIcons() {
  return (
    <span className="flex items-center gap-1.5 text-ink" aria-hidden="true">
      {/* Cellular signal */}
      <svg viewBox="0 0 20 12" className="h-3 w-4 fill-current">
        <rect x="0" y="8" width="3" height="4" rx="0.5" />
        <rect x="5" y="5" width="3" height="7" rx="0.5" />
        <rect x="10" y="2.5" width="3" height="9.5" rx="0.5" />
        <rect x="15" y="0" width="3" height="12" rx="0.5" />
      </svg>
      {/* Wi-Fi */}
      <svg viewBox="0 0 16 12" className="h-3 w-4 fill-current">
        <path d="M8 2C5.2 2 2.7 3 0.8 4.8L2.2 6.2C3.8 4.8 5.8 4 8 4s4.2 0.8 5.8 2.2l1.4-1.4C13.3 3 10.8 2 8 2z" />
        <path d="M8 6c-1.5 0-2.9 0.6-4 1.6l1.5 1.5C6.2 8.4 7.1 8 8 8s1.8 0.4 2.5 1.1L12 7.6C10.9 6.6 9.5 6 8 6z" />
        <circle cx="8" cy="10.5" r="1.3" />
      </svg>
      {/* Battery */}
      <svg viewBox="0 0 26 12" className="h-3 w-6">
        <rect
          x="0.5"
          y="0.5"
          width="21"
          height="11"
          rx="2.5"
          fill="none"
          stroke="currentColor"
        />
        <rect
          x="2"
          y="2"
          width="16"
          height="8"
          rx="1"
          className="fill-current"
        />
        <rect
          x="23"
          y="4"
          width="2"
          height="4"
          rx="1"
          className="fill-current"
        />
      </svg>
    </span>
  );
}

type PhoneFrameProps = {
  /** Time shown in the status bar (user-facing, Spanish locale). */
  time?: string;
  children: React.ReactNode;
};

export function PhoneFrame({ time = "9:41", children }: PhoneFrameProps) {
  return (
    <div className="mx-auto w-full max-w-phone rounded-phone bg-ink p-2.5">
      <div className="relative overflow-hidden rounded-phone-screen bg-paper">
        {/* Dynamic island */}
        <div
          className="absolute left-1/2 top-2.5 h-5 w-20 -translate-x-1/2 rounded-full bg-ink"
          aria-hidden="true"
        />

        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pb-1 pt-2.5 font-mono text-micro font-medium text-ink">
          <span>{time}</span>
          <StatusIcons />
        </div>

        {children}

        {/* Home indicator */}
        <div className="flex justify-center pb-2 pt-1.5">
          <span
            className="h-1 w-28 rounded-full bg-ink/30"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

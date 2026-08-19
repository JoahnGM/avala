// Shared flow diagram (design/heuristics.md #1): the §03 panel explains each
// step as boxes and arrows instead of a label/value list. A list tells you what
// exists; a diagram tells you what moves where, which is the actual argument —
// documents come in, two sources get queried, one conversation goes out, an
// expediente comes back, and three things hand off to your side.
//
// Rules it follows: strokes and fills come from Tailwind tokens
// (`stroke-current`, `fill-graphite`, `stroke-stamp`) — no hex in the markup,
// CLAUDE.md rule 2 applies inside SVG too — `stamp` marks only the node where a human acts, dashed
// means "leaves AVALA's hands", and every arrow is labelled — an unlabelled
// arrow says "related somehow". One viewBox for all five so the panel never
// jumps height when the open item changes.

export type FlowVariant =
  | "entrada"
  | "fuentes"
  | "correccion"
  | "salida"
  | "handoff";

type BoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  /** The node where the client acts — the only place the accent appears. */
  accent?: boolean;
};

function Box({ x, y, w, h, label, sub, accent }: BoxProps) {
  const cx = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="none"
        className={accent ? "stroke-stamp" : "stroke-current"}
        strokeWidth={accent ? 1.6 : 1.1}
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 2 : y + h / 2 + 4}
        textAnchor="middle"
        className={`font-mono ${accent ? "fill-stamp" : "fill-current"}`}
        fontSize="11"
      >
        {label}
      </text>
      {sub ? (
        <text
          x={cx}
          y={y + h / 2 + 14}
          textAnchor="middle"
          className="fill-graphite font-mono"
          fontSize="10"
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

type ArrowProps = {
  /** Path data. Straight lines and elbows only — no curves to hand-author. */
  d: string;
  label?: string;
  labelX?: number;
  labelY?: number;
  dashed?: boolean;
  markerId: string;
};

function Arrow({ d, label, labelX, labelY, dashed, markerId }: ArrowProps) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        className="stroke-current"
        strokeWidth="1.1"
        strokeDasharray={dashed ? "4 4" : undefined}
        markerEnd={`url(#${markerId})`}
      />
      {label && labelX != null && labelY != null ? (
        <text
          x={labelX}
          y={labelY}
          textAnchor="middle"
          className="fill-graphite font-mono"
          fontSize="10"
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

const CAPTION: Record<FlowVariant, string> = {
  entrada: "La cuenta de cobro entra y AVALA la toma.",
  fuentes: "AVALA consulta las dos fuentes que existen de verdad.",
  correccion: "AVALA le pide al proveedor lo que falta, por WhatsApp.",
  salida: "El expediente vuelve a ti, y tú apruebas el pago.",
  handoff: "Lo que sale de las manos de AVALA, y hacia dónde.",
};

export function FlowDiagram({ variant }: { variant: FlowVariant }) {
  const markerId = `fd-${variant}`;
  return (
    <svg
      viewBox="0 0 320 150"
      role="img"
      aria-label={CAPTION[variant]}
      className="block h-auto w-full text-ink"
    >
      <defs>
        <marker
          id={markerId}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" className="fill-current" />
        </marker>
      </defs>

      {variant === "entrada" ? (
        <>
          <Box x={6} y={46} w={132} h={50} label="cuenta_0002.pdf" sub="$2.100.000" />
          <Arrow markerId={markerId} d="M142,71 H190" label="llega" labelX={166} labelY={62} />
          <Box x={196} y={46} w={118} h={50} label="AVALA" sub="la toma" />
        </>
      ) : null}

      {variant === "fuentes" ? (
        <>
          <Box x={6} y={54} w={96} h={42} label="AVALA" />
          <Arrow markerId={markerId} d="M106,66 H144 V32 H184" label="planilla" labelX={144} labelY={24} />
          <Box x={190} y={14} w={124} h={38} label="Operador PILA" />
          <Arrow markerId={markerId} d="M106,84 H144 V118 H184" label="RUT" labelX={138} labelY={136} />
          <Box x={190} y={100} w={124} h={38} label="DIAN" />
        </>
      ) : null}

      {variant === "correccion" ? (
        <>
          <Box x={6} y={48} w={96} h={46} label="AVALA" />
          <Arrow markerId={markerId} d="M106,62 H208" label="pide lo que falta" labelX={157} labelY={53} />
          <Arrow markerId={markerId} d="M208,84 H106" label="envía el soporte" labelX={157} labelY={101} />
          <Box x={212} y={48} w={102} h={46} label="Proveedor" />
          <text
            x={157}
            y={128}
            textAnchor="middle"
            className="fill-graphite font-mono"
            fontSize="10"
          >
            WhatsApp
          </text>
        </>
      ) : null}

      {variant === "salida" ? (
        <>
          <Box x={6} y={16} w={92} h={42} label="AVALA" />
          <Arrow markerId={markerId} d="M102,37 H136" />
          <Box x={142} y={10} w={172} h={54} label="reporte_0002.pdf" sub="+ registro auditable" />
          <Arrow markerId={markerId} d="M228,64 V92" label="te llega" labelX={264} labelY={82} />
          <Box x={142} y={96} w={172} h={42} label="Tú apruebas el pago" accent />
        </>
      ) : null}

      {variant === "handoff" ? (
        <>
          <Box x={6} y={54} w={96} h={46} label="AVALA" sub="expediente" />
          <Arrow markerId={markerId} dashed d="M106,66 H144 V32 H184" label="IBC" labelX={140} labelY={24} />
          <Box x={190} y={14} w={124} h={38} label="Tu contador" accent />
          <Arrow markerId={markerId} dashed d="M106,88 H144 V118 H184" label="ARL · doc. soporte" labelX={128} labelY={136} />
          <Box x={190} y={100} w={124} h={38} label="Tu empresa" accent />
        </>
      ) : null}
    </svg>
  );
}

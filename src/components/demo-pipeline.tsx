"use client";

import { useEffect, useRef, useState } from "react";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { WhatsAppCta } from "@/components/ui/whatsapp-cta";
import { track } from "@/lib/analytics";
import { SectionLabel } from "@/components/ui/section-label";
import { Stamp } from "@/components/ui/stamp";

// §02 "Cómo funciona" — the live console. Rewritten 2026-08-18 at Joahn's
// direction, from the AVALA ENGINE reference: the product must RUN on screen
// instead of asking the visitor to click through four steps. One `surface` card
// assembles itself top-down — checks resolve, the WhatsApp correction opens
// inside the same card, the report lands at the bottom — because that is the
// actual mechanism: nobody at the client's side drives it either.
//
// What the rewrite fixed on the way (design/normative-review.md):
// R2-01 — the suppliers were `S.A.S.`, personas jurídicas, outside the entire
//   scope of agents/legal-brain.md §0. They are personas naturales now, with
//   masked NITs, and the case states the contributor type out loud (Q-CLS-05).
// R2-02 — the old correction case failed `V-RUT-03` (RUT desactualizado) and
//   closed with a line that answers `V-RUT-01` (activo). The canonical case is
//   now the missing planilla, whose ask and close are the same rule.
//
// Every line the agent says is `agents/verbatim.es.md`; the ID is in a comment
// next to it until the two files are wired together for real.

type CheckId = "rut" | "resp" | "pila";
type CheckStatus = "pendiente" | "ok" | "falta";
type CaseId = "resuelve" | "sinRespuesta";

type Check = {
  id: CheckId;
  /** Two-letter marker, dossier style. */
  code: string;
  label: string;
  /** The rule in agents/legal-brain.md §4 this check runs. */
  rule: string;
};

type Turn = {
  sender: "avala" | "proveedor";
  variant?: "text" | "attachment";
  text: string;
  time: string;
};

/** One beat of the console. `after` is the pause before it lands, in ms. */
type Step =
  | { kind: "check"; id: CheckId; status: CheckStatus; after: number }
  | { kind: "turn"; turn: Turn; after: number }
  | { kind: "outcome"; after: number };

type Case = {
  label: string;
  cuenta: string;
  file: string;
  supplier: string;
  /** Middle digits masked: these are illustrative people, not real cédulas. */
  nit: string;
  amount: string;
  tipo: string;
  contact: string;
  steps: Step[];
  outcome: {
    variant: "approved" | "revisar";
    artifact?: { name: string; meta: string; confirms: string[] };
    body: string;
    next: string;
  };
};

const CHECKS: Check[] = [
  { id: "rut", code: "RU", label: "RUT activo en la DIAN", rule: "V-RUT-01" },
  {
    id: "resp",
    code: "RE",
    label: "Responsabilidades vs. servicio facturado",
    rule: "V-RUT-02",
  },
  {
    id: "pila",
    code: "PI",
    label: "Planilla · último período cerrado",
    rule: "V-PILA-01",
  },
];

const CASES: Record<CaseId, Case> = {
  resuelve: {
    label: "El proveedor responde",
    cuenta: "CUENTA #0002",
    file: "cuenta_0002.pdf",
    supplier: "Julián Pardo Meneses",
    nit: "NIT 1.0XX.XXX.XXX-2",
    amount: "$2.100.000",
    tipo: "Prestación de servicios personales · base 40% del contrato",
    contact: "Julián Pardo",
    steps: [
      { kind: "check", id: "rut", status: "ok", after: 620 },
      { kind: "check", id: "resp", status: "ok", after: 620 },
      { kind: "check", id: "pila", status: "falta", after: 760 },
      {
        kind: "turn",
        after: 820,
        // S-COR-01 + S-COR-02
        turn: {
          sender: "avala",
          text: "Hola Julián, soy AVALA. Estoy revisando tu cuenta de cobro #0002 y me falta tu planilla de aportes del último período. ¿Me la puedes enviar por aquí?",
          time: "09:13",
        },
      },
      {
        kind: "turn",
        after: 1200,
        turn: {
          sender: "proveedor",
          variant: "attachment",
          text: "planilla_2026-07.pdf",
          time: "09:41",
        },
      },
      { kind: "check", id: "pila", status: "ok", after: 700 },
      {
        kind: "turn",
        after: 620,
        // S-COR-11
        turn: {
          sender: "avala",
          text: "Listo, Julián. Con eso tu cuenta #0002 queda completa y pasa a aprobación del cliente. Gracias por la rapidez.",
          time: "09:42",
        },
      },
      { kind: "outcome", after: 620 },
    ],
    outcome: {
      variant: "approved",
      artifact: {
        name: "reporte_cuenta_0002.pdf",
        meta: "PDF · 3 anexos · 09:42",
        confirms: [
          "Planilla del último período cerrado, pagada",
          "RUT activo en la DIAN",
          "Responsabilidades verificadas",
        ],
      },
      body: "Tu equipo no escribió un solo mensaje.",
      next: "La cuenta queda lista y el reporte queda de soporte. La aprobación la das tú.",
    },
  },
  sinRespuesta: {
    label: "El proveedor no responde",
    cuenta: "CUENTA #0117",
    file: "cuenta_0117.pdf",
    supplier: "Marcela Ríos Gaitán",
    nit: "NIT 52.6XX.XXX-7",
    amount: "$3.240.000",
    tipo: "Prestación de servicios personales · base 40% del contrato",
    contact: "Marcela Ríos",
    steps: [
      { kind: "check", id: "rut", status: "ok", after: 620 },
      { kind: "check", id: "resp", status: "ok", after: 620 },
      { kind: "check", id: "pila", status: "falta", after: 760 },
      {
        kind: "turn",
        after: 820,
        // S-COR-01 + S-COR-06
        turn: {
          sender: "avala",
          text: "Hola Marcela, soy AVALA. Me aparece el último período sin pagar. En cuanto lo pagues y me envíes el soporte, sigo con la cuenta #0117.",
          time: "09:13",
        },
      },
      {
        kind: "turn",
        after: 1400,
        // S-COR-10
        turn: {
          sender: "avala",
          text: "Marcela, quedo pendiente de tu planilla para poder cerrar la cuenta #0117.",
          time: "16:20",
        },
      },
      { kind: "outcome", after: 900 },
    ],
    outcome: {
      variant: "revisar",
      body: "El proveedor no respondió, así que la cuenta no queda lista: pagarla sin el aporte al día es justo lo que la UGPP fiscaliza.",
      next: "AVALA te la pasa con el detalle de lo que falta y quién lo debe corregir. La decisión de insistir, devolverla o pagarla es tuya.",
    },
  },
};

const STATUS_LABEL: Record<CheckStatus, string> = {
  pendiente: "En cola",
  ok: "OK",
  falta: "Falta",
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

type DemoPipelineProps = {
  /**
   * Multiplier on every pause. Tests pass `0` to resolve the whole sequence
   * synchronously instead of waiting out the real cadence.
   */
  speed?: number;
};

export function DemoPipeline({ speed = 1 }: DemoPipelineProps) {
  const [caseId, setCaseId] = useState<CaseId>("resuelve");
  const [phase, setPhase] = useState(0);
  // P3-3 — the sequence used to start on mount, so anyone arriving mid-page met
  // a half-finished console with no way to know it. It now waits for the card
  // to be on screen. Where IntersectionObserver is unavailable it starts at
  // once rather than never.
  const [armed, setArmed] = useState(
    typeof IntersectionObserver === "undefined",
  );
  const consoleRef = useRef<HTMLDivElement | null>(null);
  const active = CASES[caseId];
  const steps = active.steps;
  const running = phase < steps.length;

  useEffect(() => {
    if (armed || !consoleRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setArmed(true);
      },
      { threshold: 0.35 },
    );
    observer.observe(consoleRef.current);
    return () => observer.disconnect();
  }, [armed]);

  // The console runs itself. Reduced motion gets the finished state instead of
  // a sequence — the information is the same, the movement is what is optional.
  useEffect(() => {
    if (!running || !armed) return;
    if (prefersReducedMotion()) {
      setPhase(steps.length);
      return;
    }
    const timer = window.setTimeout(
      () => setPhase((p) => p + 1),
      steps[phase].after * speed,
    );
    return () => window.clearTimeout(timer);
  }, [phase, running, armed, steps, speed]);

  // Whether visitors reach the console and let it finish is the signal that
  // tells us if the live-mechanism proof lands. The console advances itself, so
  // a run — not a step — is the unit worth measuring.
  useEffect(() => {
    if (armed && phase === 0) track("demo_start", { case_id: caseId });
  }, [armed, phase, caseId]);

  useEffect(() => {
    if (armed && phase === steps.length) {
      track("demo_completed", { case_id: caseId });
    }
  }, [armed, phase, steps.length, caseId]);

  function replay(next: CaseId) {
    setCaseId(next);
    setPhase(0);
    track(next === caseId ? "demo_replay" : "demo_case_select", {
      case_id: next,
    });
  }

  const applied = steps.slice(0, phase);
  const status: Record<CheckId, CheckStatus> = {
    rut: "pendiente",
    resp: "pendiente",
    pila: "pendiente",
  };
  for (const step of applied) {
    if (step.kind === "check") status[step.id] = step.status;
  }
  const turns = applied.flatMap((step) =>
    step.kind === "turn" ? [step.turn] : [],
  );
  const settled = applied.some((step) => step.kind === "outcome");
  const other: CaseId = caseId === "resuelve" ? "sinRespuesta" : "resuelve";

  return (
    <section id="demo" className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">02 · Cómo funciona</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <h2 className="mt-8 max-w-3xl font-display text-display-md uppercase md:text-display-lg">
          De la cuenta de cobro al pago. Sin revisar un solo PDF.
        </h2>

        <p className="mt-8 max-w-2xl text-body-lg text-graphite">
          Esto es AVALA trabajando: revisa los documentos, le escribe al
          proveedor lo que falte y cierra la cuenta. No tienes que hacer nada
          para verlo — igual que en la vida real.
        </p>

        {/* The console. `surface` is the product's own artifact sitting on the
            page's paper ground (design/tokens.md). */}
        <div ref={consoleRef} className="mt-10 border border-ink bg-surface">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
            <p className="font-mono text-caption uppercase tracking-widest text-graphite">
              {active.cuenta} · {active.file}
            </p>
            <p
              className={`font-mono text-caption uppercase tracking-widest ${
                running ? "text-stamp" : "text-graphite"
              }`}
            >
              {running
                ? `● En vivo · paso ${Math.min(phase + 1, steps.length)} de ${steps.length}`
                : "Verificación cerrada"}
            </p>
          </div>

          {/* P3-3 — how far along the sequence is, so a late arrival can tell
              a half-drawn console from a finished one. */}
          <div className="h-px w-full bg-hairline" aria-hidden="true">
            <div
              className="h-px origin-left bg-stamp transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${phase / steps.length})` }}
            />
          </div>

          <div className="px-5 py-5" aria-live="polite">
            {/* Expediente head */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <p className="font-display text-display-sm uppercase">
                {active.supplier}
              </p>
              <p className="font-mono text-data text-graphite">
                {active.nit} · {active.amount}
              </p>
            </div>
            {/* Q-CLS-05: the type is asked, never inferred from a trade name
                (agents/legal-brain.md §3) — and it decides the whole base. */}
            <p className="mt-1 font-mono text-caption text-graphite">
              {active.tipo}
            </p>

            {/* Checks */}
            <ul className="mt-6 border-t border-hairline">
              {CHECKS.map((check) => {
                const state = status[check.id];
                return (
                  <li
                    key={check.id}
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-hairline py-3"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center border border-hairline font-mono text-caption text-graphite"
                    >
                      {check.code}
                    </span>
                    <span className="flex-1 text-body text-ink">
                      {check.label}
                    </span>
                    <span className="font-mono text-caption uppercase tracking-widest text-evidence">
                      {check.rule}
                    </span>
                    <span
                      className={`w-24 text-right font-mono text-data uppercase ${
                        state === "ok"
                          ? "text-approved"
                          : state === "falta"
                            ? "text-stamp"
                            : "text-graphite"
                      }`}
                    >
                      {state === "ok" ? "✓ " : state === "falta" ? "✗ " : ""}
                      {STATUS_LABEL[state]}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* The correction, inside the same card */}
            {turns.length > 0 ? (
              <div className="mt-6">
                <p className="font-mono text-caption uppercase tracking-widest text-graphite">
                  {active.contact} · WhatsApp · proveedor
                </p>
                <ol
                  aria-label="Conversación entre AVALA y el proveedor"
                  className="mt-3 max-w-md space-y-3"
                >
                  {turns.map((turn) => (
                    <ChatBubble
                      key={turn.text}
                      sender={turn.sender}
                      label={turn.sender === "avala" ? "Avala" : "Proveedor"}
                      variant={turn.variant}
                      time={turn.time}
                    >
                      {turn.text}
                    </ChatBubble>
                  ))}
                </ol>
              </div>
            ) : null}

            {/* What you actually receive */}
            {settled ? (
              <div className="mt-6 border-t border-hairline pt-5">
                {active.outcome.artifact ? (
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-data text-ink">
                        {active.outcome.artifact.name}
                      </p>
                      <p className="mt-1 font-mono text-caption text-graphite">
                        {active.outcome.artifact.meta}
                      </p>
                    </div>
                    <Stamp variant={active.outcome.variant} size="lg" animate />
                  </div>
                ) : (
                  <Stamp variant={active.outcome.variant} size="lg" animate />
                )}

                {active.outcome.artifact ? (
                  <ul className="mt-5 space-y-2 font-mono text-data text-graphite">
                    {active.outcome.artifact.confirms.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="text-approved" aria-hidden="true">
                          &#10003;
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <p className="mt-5 text-body-lg text-ink">
                  {active.outcome.body}
                </p>
                <p className="mt-2 text-body text-graphite">
                  {active.outcome.next}
                </p>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-hairline px-5 py-4">
            <button
              type="button"
              onClick={() => replay(caseId)}
              className="border border-hairline px-4 py-2 font-mono text-caption uppercase tracking-widest text-graphite hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Ver de nuevo
            </button>
            {/* Both endings stay reachable — the UX review requires every fork
                to have a defined end state — but the visitor is no longer asked
                to choose one before the demo has shown them anything. */}
            <button
              type="button"
              onClick={() => replay(other)}
              className="border border-hairline px-4 py-2 font-mono text-caption uppercase tracking-widest text-graphite hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {CASES[other].label} →
            </button>
          </div>
        </div>

        {/* claims-audit.md finding 17 — the walkthrough uses a fabricated
            supplier and lands a real-looking stamp, so it has to say so. P2-6
            moved it here from the section eyebrow: announcing the simulation
            before the payoff disarmed the strongest piece on the page. */}
        <p className="mt-3 font-mono text-caption text-graphite">
          Ejemplo con datos anonimizados.
        </p>

        {/* The ask, at the point the console has just proved the mechanism.
            Until 2026-08-21 this moment had nothing to press: the page's only
            two CTAs were the sticky bar and §01, both scrolling to a form at
            the bottom. GA4 over 22 visitors: 5 ran the console, 0 reached the
            intake. */}
        <div className="mt-10 border-t border-hairline pt-8">
          <p className="max-w-2xl text-body-lg text-ink">
            Esto mismo, con una cuenta de cobro tuya y tus proveedores.
          </p>
          <div className="mt-5">
            <WhatsAppCta location="demo" label="Agenda una demo · 20 min" />
          </div>
        </div>

        {/* P1-2 — the single biggest adoption objection: AVALA writes to your
            supplier in the first person, and the page never said from what
            number, whether the supplier knows it is an agent, or what happens
            when they answer something off-script. */}
        <div className="mt-12 grid gap-8 border-t border-hairline pt-8 md:grid-cols-3">
          <div>
            <p className="font-mono text-caption uppercase tracking-widest text-graphite">
              Quién escribe
            </p>
            <p className="mt-3 text-body text-ink">
              AVALA se presenta como el asistente de tu empresa en el primer
              mensaje. Nunca dice ser una persona ni escribe a nombre de alguien
              de tu equipo.
            </p>
          </div>
          <div>
            <p className="font-mono text-caption uppercase tracking-widest text-graphite">
              Desde qué número
            </p>
            <p className="mt-3 text-body text-ink">
              Siempre el mismo número de AVALA,{" "}
              <span className="font-mono text-evidence">+57 301 244 1488</span>.
              Tu proveedor lo guarda una vez y reconoce el remitente en cada
              cuenta.
            </p>
          </div>
          <div>
            <p className="font-mono text-caption uppercase tracking-widest text-graphite">
              Si responde otra cosa
            </p>
            <p className="mt-3 text-body text-ink">
              Si el proveedor pregunta algo que no son documentos —cuándo le
              pagan, un reclamo, una duda legal— la conversación pasa a una
              persona de tu equipo. El agente no improvisa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

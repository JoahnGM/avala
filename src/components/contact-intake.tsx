"use client";

import { useState } from "react";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { track } from "@/lib/analytics";

// Conversational, AI-style contact intake — the page's primary conversion.
// AVALA asks a few questions, then the visitor leaves their WhatsApp. No
// backend: on submit it hands the answers off to AVALA prefilled, so the lead
// actually lands in AVALA's inbox. Reuses the shared ChatBubble.
//
// AVALA's WhatsApp: country code + number, digits only. The email fallback
// below stays as a guard — this used to hold a placeholder, and every completed
// intake opened wa.me/57XXXXXXXXXX and lost the lead after four answered
// questions. If the number is ever blanked or mistyped, the hand-off degrades
// to email instead of to nothing. design/normative-review.md R2-15.
const AVALA_WHATSAPP = "573012441488";
const AVALA_EMAIL = "hola@avala.co";

/** Whether AVALA_WHATSAPP is a usable number rather than a placeholder. */
const whatsappReady = /^\d{10,15}$/.test(AVALA_WHATSAPP);

type Question = {
  key: string;
  prompt: string;
  placeholder: string;
  type: "text" | "tel";
  /**
   * P1-3 — the visitor could not predict what pressing the arrow would do. The
   * intake is now two visible stages: context, then contact. `stage` is what
   * the indicator shows, and it is also where the data-processing notice
   * appears: at the point data is actually requested, not before.
   */
  stage: 1 | 2;
};

const QUESTIONS: Question[] = [
  {
    key: "reto",
    prompt:
      "Hola, soy AVALA. Para preparar tu demo, cuéntame: ¿qué quieres resolver con tus proveedores?",
    placeholder: "Ej. validar las cuentas de cobro a mano es lentísimo",
    type: "text",
    stage: 1,
  },
  {
    key: "volumen",
    prompt: "Entiendo. ¿Cuántas cuentas de cobro procesas al mes, más o menos?",
    placeholder: "Ej. unas 200",
    type: "text",
    stage: 1,
  },
  {
    key: "quien",
    // P2-5/R2-10 — DIAN is where the RUT is consulted, not a third document.
    prompt: "¿Y quién revisa hoy la planilla y el RUT?",
    placeholder: "Ej. una persona del equipo de finanzas",
    type: "text",
    stage: 1,
  },
  {
    key: "wa",
    prompt: "Perfecto. Déjame tu WhatsApp y te escribo para agendar la demo.",
    placeholder: "Ej. 300 123 4567",
    type: "tel",
    stage: 2,
  },
];

type Turn = { from: "avala" | "visitante"; text: string };

function buildMessage(answers: string[]) {
  return [
    "Hola AVALA, quiero una demo.",
    `Qué quiero resolver: ${answers[0] ?? ""}`,
    `Cuentas de cobro al mes: ${answers[1] ?? ""}`,
    `Hoy los revisa: ${answers[2] ?? ""}`,
    `Mi WhatsApp: ${answers[3] ?? ""}`,
  ].join("\n");
}

/** WhatsApp when the number is configured, email otherwise — never a dead link. */
function buildHandoffUrl(answers: string[]) {
  const message = buildMessage(answers);
  if (whatsappReady) {
    return `https://wa.me/${AVALA_WHATSAPP}?text=${encodeURIComponent(message)}`;
  }
  const subject = encodeURIComponent("Quiero una demo de AVALA");
  return `mailto:${AVALA_EMAIL}?subject=${subject}&body=${encodeURIComponent(message)}`;
}

export function ContactIntake() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [turns, setTurns] = useState<Turn[]>([
    { from: "avala", text: QUESTIONS[0].prompt },
  ]);
  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const answer = value.trim();
    if (!answer) return;

    const collected = [...answers, answer];
    const isLast = step === QUESTIONS.length - 1;

    // Funnel shape only — the question key, never the answer. Which question
    // loses people is the whole point; what they typed is none of GA4's
    // business (see src/lib/analytics.ts).
    if (step === 0) track("intake_start");
    track("intake_step", {
      step_index: step,
      question_key: QUESTIONS[step].key,
    });

    if (isLast) {
      setAnswers(collected);
      setTurns((prev) => [
        ...prev,
        { from: "visitante", text: answer },
        {
          from: "avala",
          text: whatsappReady
            ? "¡Listo! Te escribo por WhatsApp para coordinar tu demo."
            : "¡Listo! Te abrí un correo con tus respuestas: envíalo y te escribimos para coordinar tu demo.",
        },
      ]);
      setDone(true);
      setValue("");
      track("intake_complete");
      // Hand the lead to AVALA with everything prefilled. The channel is
      // measured because the email fallback is a materially worse hand-off:
      // if it ever starts carrying volume, that is a problem to see, not
      // discover later.
      if (typeof window !== "undefined") {
        track("intake_handoff", {
          channel: whatsappReady ? "whatsapp" : "email",
        });
        window.open(buildHandoffUrl(collected), "_blank", "noopener");
      }
      return;
    }

    const nextStep = step + 1;
    setAnswers(collected);
    setTurns((prev) => [
      ...prev,
      { from: "visitante", text: answer },
      { from: "avala", text: QUESTIONS[nextStep].prompt },
    ]);
    setStep(nextStep);
    setValue("");
  }

  const current = QUESTIONS[step];
  const stage = done ? 2 : current.stage;

  return (
    <div className="max-w-xl">
      {/* P1-3 — two stages, named, so the visitor knows a contact field is
          coming and can predict what submitting does. */}
      <div className="mb-3 flex items-center gap-3 font-mono text-caption uppercase tracking-widest">
        <span className={stage === 1 ? "text-ink" : "text-graphite"}>
          Paso 1 de 2 · contexto
        </span>
        <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        <span className={stage === 2 ? "text-ink" : "text-graphite"}>
          Paso 2 de 2 · contacto
        </span>
      </div>

      <div className="border border-hairline bg-surface">
        <ol
          aria-label="Conversación para agendar tu demo"
          className="space-y-3 px-4 py-5"
        >
          {turns.map((turn, i) => (
            <ChatBubble
              key={i}
              sender={turn.from}
              label={turn.from === "avala" ? "Avala" : "Tú"}
            >
              {turn.text}
            </ChatBubble>
          ))}
        </ol>

        {done ? (
          <p className="border-t border-hairline px-4 py-4 font-mono text-caption text-graphite">
            {whatsappReady
              ? "¿No se abrió WhatsApp?"
              : "¿No se abrió tu correo?"}{" "}
            Escríbenos a{" "}
            <a
              href="mailto:hola@avala.co"
              className="underline underline-offset-4 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              hola@avala.co
            </a>
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-hairline px-3 py-3"
          >
            <label htmlFor="intake-input" className="sr-only">
              Tu respuesta
            </label>
            <input
              id="intake-input"
              type={current.type}
              inputMode={current.type === "tel" ? "tel" : "text"}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={current.placeholder}
              autoComplete="off"
              className="flex-1 rounded-full border border-hairline bg-paper px-4 py-2 text-data text-ink placeholder:text-graphite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            />
            {/* P3-7 — the icon-only circle carried an sr-only label, so it was
                announced, but nothing on screen said what it did. */}
            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-full bg-stamp px-4 py-2 font-mono text-caption uppercase tracking-widest text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {stage === 2 ? "Enviar" : "Siguiente"}
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 fill-current"
                aria-hidden="true"
              >
                <path d="M12 4l7 7h-4v9h-6v-9H5l7-7z" />
              </svg>
            </button>
          </form>
        )}
      </div>

      {/* claims-audit.md finding 16 — Ley 1581 de 2012 (agents/legal-brain.md
          N-019) requires authorization and a stated purpose before processing
          personal data. P1-3 moved it to stage 2: it used to sit under a form
          that had not asked for a single contact detail yet, mentioning
          WhatsApp and email out of nowhere. */}
      <p
        className={`mt-3 text-caption text-evidence ${stage === 2 ? "" : "hidden"}`}
      >
        Al enviar autorizas a AVALA a contactarte por WhatsApp o correo para
        agendar la demo. Usamos tus datos solo para eso y los eliminamos cuando
        nos lo pidas en{" "}
        <a
          href="mailto:hola@avala.co"
          className="underline underline-offset-4 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          hola@avala.co
        </a>{" "}
        (Ley 1581 de 2012).
      </p>
    </div>
  );
}

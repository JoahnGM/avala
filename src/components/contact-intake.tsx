"use client";

import { useState } from "react";
import { ChatBubble } from "@/components/ui/chat-bubble";

// Conversational, AI-style contact intake — the page's primary conversion.
// AVALA asks a few questions, then the visitor leaves their WhatsApp. No
// backend: on submit it opens WhatsApp to AVALA with the answers prefilled, so
// the lead actually lands in AVALA's inbox. Reuses the shared ChatBubble.
//
// TODO(Joahn): replace AVALA_WHATSAPP with AVALA's real WhatsApp number
// (country code + number, digits only) for the hand-off to actually deliver.
const AVALA_WHATSAPP = "57XXXXXXXXXX";

type Question = { key: string; prompt: string; placeholder: string; type: "text" | "tel" };

const QUESTIONS: Question[] = [
  {
    key: "reto",
    prompt:
      "Hola, soy AVALA. Para preparar tu demo, cuéntame: ¿qué quieres resolver con tus proveedores?",
    placeholder: "Ej. validar las cuentas de cobro a mano es lentísimo",
    type: "text",
  },
  {
    key: "volumen",
    prompt: "Entiendo. ¿Cuántas cuentas de cobro procesas al mes, más o menos?",
    placeholder: "Ej. unas 200",
    type: "text",
  },
  {
    key: "quien",
    prompt: "¿Y quién revisa hoy los documentos (PILA, RUT, DIAN)?",
    placeholder: "Ej. una persona del equipo de finanzas",
    type: "text",
  },
  {
    key: "wa",
    prompt: "Perfecto. Déjame tu WhatsApp y te escribo para agendar la demo.",
    placeholder: "Ej. 300 123 4567",
    type: "tel",
  },
];

type Turn = { from: "avala" | "visitante"; text: string };

function buildWhatsappUrl(answers: string[]) {
  const message = [
    "Hola AVALA, quiero una demo.",
    `Qué quiero resolver: ${answers[0] ?? ""}`,
    `Cuentas de cobro al mes: ${answers[1] ?? ""}`,
    `Hoy los revisa: ${answers[2] ?? ""}`,
    `Mi WhatsApp: ${answers[3] ?? ""}`,
  ].join("\n");
  return `https://wa.me/${AVALA_WHATSAPP}?text=${encodeURIComponent(message)}`;
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

    if (isLast) {
      setAnswers(collected);
      setTurns((prev) => [
        ...prev,
        { from: "visitante", text: answer },
        {
          from: "avala",
          text: "¡Listo! Te escribo por WhatsApp para coordinar tu demo.",
        },
      ]);
      setDone(true);
      setValue("");
      // Hand the lead to AVALA's WhatsApp with everything prefilled.
      if (typeof window !== "undefined") {
        window.open(buildWhatsappUrl(collected), "_blank", "noopener");
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

  return (
    <div className="max-w-xl border border-hairline bg-paper">
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
          ¿No se abrió WhatsApp? Escríbenos a{" "}
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
          <button
            type="submit"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stamp text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <span className="sr-only">Enviar</span>
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M12 4l7 7h-4v9h-6v-9H5l7-7z" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}

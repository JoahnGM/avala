import { ChatBubble } from "@/components/ui/chat-bubble";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { SectionLabel } from "@/components/ui/section-label";

// §04 "La corrección" — shows AVALA's core differentiator: it talks to the
// supplier and fixes the paperwork on the finance team's behalf. Four mini
// steps (detect → draft → receive → report) precede a simulated iOS chat
// rendered on the shared PhoneFrame + ChatBubble primitives. Chat copy is warm,
// human, WhatsApp-real Spanish; the UI is generic messaging skinned to AVALA
// tokens (no WhatsApp green / Meta trademark).

type Step = {
  /** Mono eyebrow label (user-facing, Spanish). */
  label: string;
  /** One-line description of what AVALA does in this step. */
  detail: string;
};

const STEPS: Step[] = [
  { label: "Detecta", detail: "RUT desactualizado en la cuenta #0002" },
  { label: "Redacta", detail: "un mensaje puntual, en el tono de tu empresa" },
  { label: "Recibe", detail: "el PDF adjunto y lo verifica con la DIAN" },
  { label: "Reporta", detail: "cuenta lista para pagar en tu bandeja" },
];

export function CorrectionSection() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="flex items-center gap-4">
          <SectionLabel as="p">§ 04 · La corrección</SectionLabel>
          <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
        </div>

        <h2 className="mt-8 max-w-3xl font-display text-display-md uppercase md:text-display-lg">
          AVALA le escribe al proveedor. Tú solo lees el resumen.
        </h2>

        <p className="mt-8 max-w-2xl text-body-lg text-graphite">
          Cuando un documento falta o vence, AVALA abre la conversación, pide lo
          puntual, valida contra la fuente oficial y te avisa cuando la cuenta
          está lista.
        </p>

        <ul className="mt-16 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.label} className="border-t border-hairline pt-6">
              <p className="font-mono text-caption uppercase tracking-widest text-graphite">
                {step.label}
              </p>
              <p className="mt-3 text-body">{step.detail}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 md:mt-16">
          <PhoneFrame time="10:18">
            {/* Chat header */}
            <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-data text-paper"
                aria-hidden="true"
              >
                A
              </span>
              <span className="leading-tight">
                <span className="block text-data font-medium text-ink">
                  AVALA
                </span>
                <span className="block font-mono text-micro text-graphite">
                  agente de validación
                </span>
              </span>
            </div>

            {/* Message thread */}
            <ol
              aria-label="Conversación simulada entre AVALA y el proveedor"
              className="space-y-3 px-4 py-5"
            >
              <ChatBubble sender="avala" label="Avala" time="10:14">
                Hola Julián, soy AVALA, del área de pagos de Distribuidora
                Andes. Vi que tu RUT está desactualizado (última actualización
                2023). Necesito el vigente para procesar la cuenta #0002.
              </ChatBubble>
              <ChatBubble sender="proveedor" label="Proveedor" time="10:16">
                Uy cierto, ya lo actualicé la semana pasada. Te lo mando ya.
              </ChatBubble>
              <ChatBubble
                sender="proveedor"
                label="Proveedor"
                variant="attachment"
                time="10:17"
              >
                rut_actualizado.pdf
              </ChatBubble>
              <ChatBubble sender="avala" label="Avala" time="10:17">
                Recibido. RUT vigente, actividad 7410 confirmada con la DIAN. Tu
                cuenta pasa a pago hoy mismo.
              </ChatBubble>
              <ChatBubble sender="proveedor" label="Proveedor" time="10:18">
                Mil gracias <span className="inline-block grayscale">🙏</span>
              </ChatBubble>
            </ol>

            {/* Input bar (decorative) */}
            <div
              className="flex items-center gap-2 border-t border-hairline px-3 py-2.5"
              aria-hidden="true"
            >
              <span className="flex-1 rounded-full border border-hairline px-4 py-2 font-mono text-micro text-graphite">
                Mensaje…
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stamp text-paper">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M12 4l7 7h-4v9h-6v-9H5l7-7z" />
                </svg>
              </span>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}

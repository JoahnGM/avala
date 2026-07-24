import { ChatBubble } from "@/components/ui/chat-bubble";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { SectionLabel } from "@/components/ui/section-label";

// Simulated chat between AVALA and a supplier resolving an expired RUT, shown
// on an iOS phone mockup (PhoneFrame). Deliberately generic messaging UI built
// on AVALA tokens — do NOT style it with WhatsApp's green or logo (Meta
// trademark), it only evokes messaging.
export function ConversationDemo() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-[10rem_1fr] md:gap-16 md:py-24">
        <SectionLabel secondary="Conversación simulada">
          Caso #0044
        </SectionLabel>

        <div>
          <h2 className="font-display text-display-sm uppercase md:text-display-md">
            ¿Y si el RUT ya venció?
          </h2>
          <p className="mt-4 max-w-xl text-body text-graphite">
            Nadie de tu equipo escribe un solo mensaje. AVALA ya está hablando
            con el proveedor.
          </p>

          <div className="mt-10">
            <PhoneFrame time="9:41">
              {/* Chat header */}
              <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
                <span
                  className="text-graphite"
                  aria-hidden="true"
                >
                  &lsaquo;
                </span>
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
                    en línea
                  </span>
                </span>
              </div>

              {/* Message thread */}
              <ol
                aria-label="Conversación simulada entre AVALA y el proveedor"
                className="space-y-3 px-4 py-5"
              >
                <ChatBubble sender="avala" label="Avala" time="9:32">
                  Tu RUT venció el 15 de mayo. Envíame el actualizado para
                  liberar el pago de tu cuenta de cobro #0044.
                </ChatBubble>
                <ChatBubble
                  sender="proveedor"
                  label="Proveedor"
                  variant="attachment"
                  time="9:40"
                  status="Entregado"
                >
                  rut_actualizado.pdf
                </ChatBubble>
                <ChatBubble sender="avala" label="Avala" time="9:41">
                  Listo. Tu cuenta de cobro #0044 quedó aprobada.
                </ChatBubble>
              </ol>

              {/* Input bar (decorative) */}
              <div
                className="flex items-center gap-2 border-t border-hairline px-3 py-2.5"
                aria-hidden="true"
              >
                <span className="flex-1 rounded-full border border-hairline px-4 py-2 font-mono text-micro text-graphite">
                  Mensaje
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stamp text-paper">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M12 4l7 7h-4v9h-6v-9H5l7-7z" />
                  </svg>
                </span>
              </div>
            </PhoneFrame>
          </div>

          <p className="mt-10 max-w-xl text-body font-medium">
            Cero mensajes de tu equipo. Cero WhatsApp perdidos. Un proveedor
            con el documento corregido.
          </p>
        </div>
      </div>
    </section>
  );
}

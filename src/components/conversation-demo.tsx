import { ChatBubble } from "@/components/ui/chat-bubble";
import { SectionLabel } from "@/components/ui/section-label";

// Simulated chat between AVALA and a supplier resolving an expired RUT.
// Deliberately generic messaging UI built on AVALA tokens — do NOT style it
// with WhatsApp's green or logo (Meta trademark), it only evokes messaging.
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

          <ol
            aria-label="Conversación simulada entre AVALA y el proveedor"
            className="mt-10 max-w-md space-y-5"
          >
            <ChatBubble sender="avala" label="Avala">
              Tu RUT venció el 15 de mayo. Envíame el actualizado para liberar
              el pago de tu cuenta de cobro #0044.
            </ChatBubble>
            <ChatBubble sender="proveedor" label="Proveedor" variant="action">
              [envía PDF actualizado]
            </ChatBubble>
            <ChatBubble sender="avala" label="Avala">
              Listo. Tu cuenta de cobro #0044 quedó aprobada.
            </ChatBubble>
          </ol>

          <p className="mt-10 max-w-xl text-body font-medium">
            Cero mensajes de tu equipo. Cero WhatsApp perdidos. Un proveedor
            con el documento corregido.
          </p>
        </div>
      </div>
    </section>
  );
}

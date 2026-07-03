// Simulated chat between AVALA and a supplier resolving an expired RUT.
// Deliberately generic messaging UI built on AVALA tokens — do NOT style it
// with WhatsApp's green or logo (Meta trademark), it only evokes messaging.

const MESSAGES = [
  {
    sender: "avala",
    text: "Tu RUT venció el 15 de mayo. Envíame el actualizado para liberar el pago de tu cuenta de cobro #0044.",
  },
  {
    sender: "proveedor",
    text: "[envía PDF actualizado]",
    isAction: true,
  },
  {
    sender: "avala",
    text: "Listo. Tu cuenta de cobro #0044 quedó aprobada.",
  },
] as const;

export function ConversationDemo() {
  return (
    <section className="border-t border-hairline">
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-[10rem_1fr] md:gap-16 md:py-24">
        <p className="font-mono text-caption uppercase tracking-widest text-graphite">
          Caso #0044
          <span className="mt-1 block">Conversación simulada</span>
        </p>

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
            {MESSAGES.map((message, index) => {
              const fromAvala = message.sender === "avala";
              return (
                <li
                  key={index}
                  className={fromAvala ? "" : "flex flex-col items-end"}
                >
                  <p className="font-mono text-caption uppercase tracking-widest text-graphite">
                    {fromAvala ? "Avala" : "Proveedor"}
                  </p>
                  <p
                    className={`mt-1 max-w-[85%] px-4 py-3 text-data ${
                      fromAvala
                        ? "rounded-md rounded-tl-none bg-ink text-paper"
                        : "rounded-md rounded-tr-none border border-hairline text-right"
                    } ${"isAction" in message ? "font-mono italic text-graphite" : ""}`}
                  >
                    {message.text}
                  </p>
                </li>
              );
            })}
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

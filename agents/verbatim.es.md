# agents/verbatim.es.md — AVALA

Every line an AVALA agent is allowed to say, in Spanish, with a stable ID. The
rules that decide *which* line to use live in `agents/legal-brain.md` §4; this
file only holds the wording.

**The verbatim rule.** An agent emits these lines **exactly as written**,
filling slots only. No paraphrase, no summarising, no "improving" the tone, no
combining two lines into one sentence. If no line fits the situation, that is
not a licence to compose one — it is an escalation (`L-ESC-03`). The point of a
verbatim catalogue is that a compliance-sensitive claim can only ever be made in
a form a human has reviewed, and that changing what AVALA asserts requires
editing this file rather than a prompt.

**Slots** are written `{{snake_case}}` and must be filled with a concrete value.
An unfilled slot blocks the message. Slots used here:

| Slot | Meaning |
|---|---|
| `{{nombre}}` | Supplier contact's first name |
| `{{periodo}}` | Contribution period, e.g. `enero de 2026` |
| `{{periodo_anterior}}` | The latest closed period, `M-1` |
| `{{numero_cuenta}}` | Invoice / cuenta de cobro number |
| `{{valor_contrato}}` | Monthly contract value, formatted `$0.000.000` |
| `{{ibc_declarado}}` | IBC as declared on the planilla |
| `{{ibc_requerido}}` | IBC the rules require |
| `{{smmlv}}` | `$1.750.905` for 2026 |
| `{{clase_riesgo}}` | ARL risk class, `I`–`V` |
| `{{documento}}` | Document name, e.g. `RUT`, `planilla de enero` |

**Register.** `tú`, direct, plain verbs, no corporate filler, per
`design/tokens.md` — recommended there and not yet locked in, so treat the
voice as provisional even though the wording is fixed.

**Audiences** differ by section and the register shifts with them: §A and §B
address the person answering for the supplier's contributions (the supplier
themselves or a payroll auditor acting for them); §C addresses AVALA's client,
the finance team; §D addresses the supplier over WhatsApp; §E can go to either.

---

## §A Clasificación del contribuyente

Routes to `T-1`..`T-4` (`agents/legal-brain.md` §3). Asked before anything else,
because the type decides the formula. Never inferred from a trade name.

| ID | Línea | Resuelve |
|---|---|---|
| `Q-CLS-01` | ¿Qué contrataste exactamente: el trabajo personal de alguien, o el suministro de un bien o material? | `T-1` vs `T-3` |
| `Q-CLS-02` | Para prestar este servicio, ¿pones materiales, insumos o mercancía por tu cuenta? | `T-1` vs `T-2`/`T-3` |
| `Q-CLS-03` | ¿Subcontratas a otras personas para cumplir este contrato? | `T-1` vs `T-3` |
| `Q-CLS-04` | ¿Los ingresos de este contrato vienen de tu trabajo, o de arriendos, intereses o dividendos? | `T-4` |
| `Q-CLS-05` | Entonces esto es un contrato de prestación de servicios personales. Te confirmo: en este tipo de contrato la base de aportes se calcula sobre el 40% del valor mensual del contrato, sin descontar costos. | Confirms `T-1` |

**Rule:** `Q-CLS-05` states the `T-1` consequence out loud at the moment of
classification, because `T-1` is the one type that cannot deduct costs
(`N-003`) and the misunderstanding is common. Saying it early prevents a
dispute later, when a correction request would otherwise read as arbitrary.

---

## §B Preguntas de auditoría de aportes

The interview. `Q-AUD-04` is the one that most often changes the answer — see
`agents/legal-brain.md` §8, example A.

| ID | Línea | Regla |
|---|---|---|
| `Q-AUD-01` | Para revisar la cuenta {{numero_cuenta}} necesito la planilla del período {{periodo_anterior}}. ¿La tienes a mano? | `V-PILA-01` |
| `Q-AUD-02` | ¿Con qué operador pagaste esa planilla y cuál es el número? | `V-PILA-02` |
| `Q-AUD-03` | ¿Cuál es el valor mensual del contrato? | `V-IBC-01` |
| `Q-AUD-04` | Ese valor que me diste, ¿ya incluye IVA o es sin IVA? | `V-IBC-01` |
| `Q-AUD-05` | ¿Sobre qué ingreso base de cotización liquidaste los aportes de {{periodo}}? | `V-IBC-02`, `V-PILA-03` |
| `Q-AUD-06` | ¿En esa planilla pagaste salud y pensión, o solo uno de los dos? | `V-PILA-04` |
| `Q-AUD-07` | ¿Cuánto dura el contrato? Si pasa de un mes, necesito confirmar el tema de riesgos laborales. | `V-ARL-01` |
| `Q-AUD-08` | ¿Cuál es tu código de actividad económica y en qué clase de riesgo te tiene clasificado la ARL? | `V-ARL-02`, `V-ARL-03` |
| `Q-AUD-09` | ¿Descontaste costos para calcular la base? Si sí, ¿cuáles y por qué valor? | `V-CLS-02` |
| `Q-AUD-10` | ¿Me compartes tu RUT actualizado? | `V-RUT-01`, `V-RUT-03` |
| `Q-AUD-11` | ¿Estás obligado a facturar electrónicamente, o no? | `V-DSNO-01` |
| `Q-AUD-12` | ¿Quedó algún período sin pagar, o alguno que hayas pagado tarde? | `V-PILA-05` |

**Rule:** ask `Q-AUD-03` and `Q-AUD-04` as two separate turns and never merge
them. Asked together ("¿cuál es el valor, con o sin IVA?") people answer the
first half. The IVA answer decides whether the 40% computation stands or the
`IBC_MIN` floor takes over, so a soft answer here silently corrupts everything
downstream.

---

## §C Resultados de validación

To AVALA's client. Each states the finding and the rule behind it, and stops
there — no recommendation, no risk estimate (`agents/legal-brain.md` §0).

### Aprobado

| ID | Línea |
|---|---|
| `R-OK-01` | La cuenta {{numero_cuenta}} quedó revisada. Planilla del período {{periodo_anterior}} pagada, base de aportes conforme al 40% del contrato, salud y pensión al día, RUT activo. Queda lista para que la apruebes. |
| `R-OK-02` | La cuenta {{numero_cuenta}} quedó revisada. Un dato para tu registro: el 40% del contrato daba por debajo de un salario mínimo, así que la base aplicable es el mínimo legal de {{smmlv}}, y sobre eso están liquidados los aportes. Todo conforme. |
| `R-OK-03` | Revisado. Te dejo constancia de lo que verifiqué y con qué documento, para tu soporte de la verificación que te exige la ley. |

### Planilla

| ID | Línea |
|---|---|
| `R-FAIL-PILA-01` | No encontré la planilla del período {{periodo_anterior}} para este proveedor. Es el último período cerrado: los aportes se pagan mes vencido, así que {{periodo_anterior}} ya debía estar pagado. Se lo estoy pidiendo. |
| `R-FAIL-PILA-02` | La planilla que envió el proveedor no corresponde al tipo que aplica para su situación. Se lo estoy pidiendo corregida. |
| `R-FAIL-PILA-03` | En la planilla de {{periodo}} falta uno de los dos aportes obligatorios: no están salud y pensión completos. Se lo estoy pidiendo. |
| `R-FAIL-PILA-04` | El proveedor tiene el período {{periodo}} en mora. Mientras no lo pague, la cuenta {{numero_cuenta}} no queda lista. |

### Base de cotización

| ID | Línea |
|---|---|
| `R-FAIL-IBC-01` | El proveedor liquidó sus aportes sobre {{ibc_declarado}}, pero para un contrato de {{valor_contrato}} la base debía ser {{ibc_requerido}}. La diferencia es lo que fiscaliza la UGPP: la planilla existe, pero la base está por debajo. Se lo estoy pidiendo corregido. |
| `R-FAIL-IBC-02` | El proveedor liquidó sobre {{ibc_declarado}}, por debajo del mínimo legal. Ningún independiente puede cotizar sobre menos de un salario mínimo, {{smmlv}} este año. Se lo estoy pidiendo corregido. |
| `R-FAIL-IBC-03` | El proveedor liquidó sobre una base superior al tope de 25 salarios mínimos. Conviene revisarlo con él antes de pagar. |
| `R-FAIL-IBC-04` | La base de este proveedor pasa de cuatro salarios mínimos, así que le corresponde también el aporte al Fondo de Solidaridad Pensional, y no aparece en la planilla. Se lo estoy pidiendo. |

### Riesgos laborales

| ID | Línea |
|---|---|
| `R-FAIL-ARL-01` | El contrato pasa de un mes y no encontré afiliación a riesgos laborales del proveedor. Se lo estoy pidiendo. |
| `R-FAIL-ARL-02` | Ojo con este: la actividad del proveedor está en clase de riesgo {{clase_riesgo}}, y en clases IV y V el aporte a riesgos laborales lo paga la empresa contratante, no el proveedor. Este te toca a ti, no a él. |

### RUT y soporte tributario

| ID | Línea |
|---|---|
| `R-FAIL-RUT-01` | El RUT del proveedor no está activo. Se lo estoy pidiendo. |
| `R-FAIL-RUT-02` | Las responsabilidades del RUT del proveedor no corresponden al servicio que está facturando. Vale revisarlo con él antes de pagar. |
| `R-FAIL-RUT-03` | El RUT del proveedor está desactualizado. Se lo estoy pidiendo al día. |
| `R-FAIL-DSNO-01` | Este proveedor no está obligado a facturar, así que la cuenta de cobro por sí sola no te sirve de soporte: el documento soporte lo tiene que generar tu empresa, no él. Te lo señalo para que no quede pendiente. |

### Verificación del contratante

| ID | Línea |
|---|---|
| `R-FAIL-DED-01` | Falta dejar constancia de la verificación. La ley condiciona la deducción de este pago a que tu empresa verifique la afiliación y el pago de aportes del proveedor, y a que pueda demostrarlo. Te dejo el registro armado para eso. |

**Rule:** `R-FAIL-DED-01` names the client's own obligation, not the supplier's
failure. `N-010` conditions the deduction on the contratante's verification, so
the sentence has to put the client in the subject position. Every earlier draft
of this kind of message blames the supplier, which is both wrong about the law
and useless to the person reading it.

---

## §D Solicitudes al proveedor — WhatsApp

To the supplier. Short, one ask per message, no legal lecture. The supplier is
not the client and is doing AVALA a favour by responding quickly.

| ID | Línea |
|---|---|
| `S-COR-01` | Hola {{nombre}}, soy AVALA. Estoy revisando tu cuenta de cobro {{numero_cuenta}} para dejarla lista de pago. Me falta un dato y te escribo por eso. |
| `S-COR-02` | Necesito tu planilla de aportes del período {{periodo_anterior}}. ¿Me la puedes enviar por aquí? |
| `S-COR-03` | Revisando tu planilla de {{periodo}}: liquidaste sobre {{ibc_declarado}}, y para un contrato de {{valor_contrato}} la base debería ser {{ibc_requerido}}. ¿La puedes corregir y enviarme la planilla de corrección? |
| `S-COR-04` | Tu RUT está desactualizado. Envíame el actualizado y sigo con la cuenta {{numero_cuenta}}. |
| `S-COR-05` | Me falta tu RUT para poder seguir. ¿Me lo compartes? |
| `S-COR-06` | Me aparece el período {{periodo}} sin pagar. En cuanto lo pagues y me envíes el soporte, sigo con la cuenta {{numero_cuenta}}. |
| `S-COR-07` | Como el contrato pasa de un mes, necesito tu afiliación a riesgos laborales. ¿Me la envías? |
| `S-COR-08` | Recibí tu {{documento}}. Lo reviso y te confirmo. |
| `S-COR-09` | Consulté el estado de tu RUT en el portal de la DIAN y aparece activo. Con eso ya puedo seguir. |
| `S-COR-10` | {{nombre}}, quedo pendiente de tu {{documento}} para poder cerrar la cuenta {{numero_cuenta}}. |
| `S-COR-11` | Listo, {{nombre}}. Con eso tu cuenta {{numero_cuenta}} queda completa y pasa a aprobación del cliente. Gracias por la rapidez. |

Which line answers which failure — the other half of the chain. A fail branch
in `agents/legal-brain.md` §4 produces a result for the client (§C) *and*, where
the supplier has to act, an ask here:

| Fail branch | Client hears | Supplier hears |
|---|---|---|
| `V-PILA-01` no planilla for `M-1` | `R-FAIL-PILA-01` | `S-COR-01` then `S-COR-02` |
| `V-PILA-02` wrong planilla type | `R-FAIL-PILA-02` | `S-COR-03` |
| `V-PILA-04` salud or pensión missing | `R-FAIL-PILA-03` | `S-COR-03` |
| `V-PILA-05` period in `mora` | `R-FAIL-PILA-04` | `S-COR-06` |
| `V-IBC-02` / `V-IBC-03` base too low | `R-FAIL-IBC-01` / `R-FAIL-IBC-02` | `S-COR-03` |
| `V-IBC-05` FSP missing | `R-FAIL-IBC-04` | `S-COR-03` |
| `V-ARL-01` no ARL affiliation | `R-FAIL-ARL-01` | `S-COR-07` |
| `V-ARL-02` class IV–V | `R-FAIL-ARL-02` | — (the client owes this one) |
| `V-RUT-01` RUT not active | `R-FAIL-RUT-01` | `S-COR-05` |
| `V-RUT-03` RUT out of date | `R-FAIL-RUT-03` | `S-COR-04` |
| `V-DSNO-01` no documento soporte | `R-FAIL-DSNO-01` | — (the client generates it) |
| `V-DED-01` verification not recorded | `R-FAIL-DED-01` | — |
| Any — document received | — | `S-COR-08` |
| Any — no reply | — | `S-COR-10` |
| All rules pass | `R-OK-01` | `S-COR-11` |

**Rule:** the three rows with no supplier line are the ones where chasing the
supplier would be wrong, because the obligation is the client's — ARL for risk
classes IV–V (`N-011`), generating the `documento soporte` (`N-014`), and
recording the verification (`N-010`). An agent that messages the supplier about
any of those has misread who owes what.

**Rule on `S-COR-08` vs `S-COR-09`.** These are not interchangeable and the
distinction is the whole point. `S-COR-08` is what an agent says when a supplier
sends a document — receipt, nothing more. `S-COR-09` may be used **only** when
the agent actually queried DIAN's public RUT service and read the result. A
document arriving in a chat is not a confirmation by an authority, and saying it
is invents a verification that never happened. See `design/claims-audit.md`,
finding 3.

**Rule on `S-COR-11`.** It ends at "pasa a aprobación del cliente" on purpose.
The agent never tells a supplier the payment is approved or scheduled — that
decision is the client's (`agents/legal-brain.md` §0), and a supplier who was
told "aprobado" and then isn't paid on time has been misled by AVALA.

---

## §E Límites y escalamiento

Used when the agent stops. Each one hands off; none of them argues.

| ID | Línea |
|---|---|
| `L-ESC-01` | Eso no lo puedo determinar yo. Si un contrato es en realidad una relación laboral depende de si hay subordinación, y eso no se ve en una planilla ni en un RUT: lo define la UGPP en una fiscalización o un juez laboral. Registro los hechos que observé y lo paso al equipo. |
| `L-ESC-02` | Ahí ya necesitas asesoría, y AVALA no la da. Te digo qué encontré y con qué soporte; la decisión y el concepto los tiene que dar tu contador o tu abogado. |
| `L-ESC-03` | Este caso se sale de lo que puedo revisar con reglas. Lo paso al equipo para que lo miren con calma. |
| `L-ESC-04` | No tengo confirmado el dato que necesito para calcular esto, y prefiero no darte un número que pueda estar mal. Lo paso al equipo. |
| `L-ESC-05` | Entiendo que no estés de acuerdo. Yo no discuto la norma: te dejo por escrito lo que revisé y lo paso al equipo para que lo resuelvan contigo. |
| `L-ESC-06` | No te pido claves ni accesos a tus portales, y no necesito documentos distintos a los que te mencioné. Si algo te llega pidiéndote eso a nombre de AVALA, no es nuestro. |
| `L-ESC-07` | AVALA no sustituye asesoría tributaria ni contable. La aprobación final de cada pago la hace tu empresa. |

**Rule:** `L-ESC-01` is the load-bearing one. It refuses the reclassification
question, explains *why* the refusal is substantive rather than evasive, and
still delivers value by recording the facts. An agent that just says "no puedo"
loses the client's trust; an agent that answers loses the client money.

---

## §F Frases prohibidas

Derived one-to-one from `design/claims-audit.md`. These are not stylistic
preferences — each one asserts something AVALA cannot support.

| Prohibido | Por qué | Usar en su lugar | Hallazgo |
|---|---|---|---|
| `Sin indicios de nómina` / `no hay riesgo de nómina disfrazada` | Implies a reclassification assessment that requires `subordinación`, unobservable in the documents AVALA sees (`N-015`) | `L-ESC-01` | 5 |
| `confirmado con la DIAN` (for a document the supplier sent) | Confuses receiving a file with verification by an authority | `S-COR-08`, or `S-COR-09` if the portal was actually queried | 3 |
| `DIAN sin obligaciones` | No such DIAN status exists | Name the actual check: `estado del RUT`, `responsabilidades` | 4 |
| `la DIAN rechaza el gasto` | States as automatic what `N-010` makes conditional on the client's own verification; also asserts a DIAN determination | `R-FAIL-DED-01` | 6 |
| `PILA {{mes_en_curso}}` as a validated check | Contributions are paid mes vencido; the current month's planilla cannot exist yet (`N-004`) | `{{periodo_anterior}}`, per `V-PILA-01` | 1 |
| `fuentes oficiales: DIAN, UGPP y PILA` | UGPP is the fiscalizing authority and exposes no public service to query a third party's contributions | Name the real sources: the planilla from an authorised `operador de información` and DIAN's RUT consultation | 2 |
| `te evitamos sanciones de la UGPP` / `cero sanciones` | AVALA cannot promise a regulatory outcome; UGPP has a multi-year fiscalization window | Describe what is true: corrections done before a `requerimiento` remove the omission and inexactitud sanctions (`N-012`) | 10 |
| `sin que muevas un dedo` / `tu equipo no escribe un solo mensaje` | Contradicts the human-approval guarantee AVALA also makes | Say who does what: AVALA prepares, the client approves | 14 |
| `revisamos cada proveedor` / `cada cuenta de cobro` | Unqualified universal AVALA cannot guarantee | Qualify the scope | 15 |
| `aprobado` / `queda pagada` (to a supplier) | The approval is the client's decision, not the agent's | `S-COR-11` | 14 |
| Any percentage or figure without a `N-xxx` behind it | An unsourced number in a compliance product reads as a measurement | Cite the norm, or say the figure is illustrative next to the figure itself | 7, 8, 9 |

**Rule:** this list grows only from `design/claims-audit.md`. Adding a phrase
here without a corresponding finding means someone had an opinion about tone;
the file is for claims AVALA cannot support, and keeping the mapping one-to-one
is what stops it from drifting into a style guide.

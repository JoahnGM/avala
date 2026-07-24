export const meta = {
  name: 'ux-review',
  description:
    'Agentic UX review: score a flow 1-5 on 5 principles, then iterate fix -> re-score until every principle is >=4 or a human decision is required.',
  phases: [
    { title: 'Review' },
    { title: 'Fix' },
    { title: 'Verify' },
  ],
};

// =============================================================================
// AVALA — Agentic UX review (materialized architecture)
//
// This script IS the architecture from the design doc:
//   - CONTROL PLANE (this JS): decides when to stop, owns the round counter,
//     enforces the >=4 gate, caps rounds, and routes escalations. No LLM here.
//   - REASONING PLANE (the agent() calls): three roles with separated
//     permissions, glued to the control plane by a JSON Schema contract.
//         Reviewer  -> read-only  (Explore)         : scores + evidence + fixes
//         Fixer     -> write       (general-purpose) : applies the fixes
//         Verifier  -> read-only  (Explore)          : independent adversarial recheck
//   - CONTRACT: SCORE_SCHEMA / FIX_SCHEMA / VERDICT_SCHEMA make the model output
//     branchable by code (report.principles.every(p => p.score >= GATE)).
//
// Source of truth for the rubric: design/ux-review.md
// Prereq to run: the preview must be up (http://localhost:3000) for browser checks.
// Invoke: Workflow({ name: 'ux-review', args: { flow, maxRounds, apply } })
// =============================================================================

const RUBRIC = 'design/ux-review.md';
const GATE = 4;
const MAX_ROUNDS = (args && args.maxRounds) || 3;
// apply=false => review-only (report + escalate, never edit files).
const APPLY = args ? args.apply !== false : true;
const FLOW =
  (args && args.flow) || 'the AVALA landing page at http://localhost:3000';

const PRINCIPLES = [
  { id: 'P1', name: 'Problem-First Anchor' },
  { id: 'P2', name: 'Simplicity Metric (1-2-3)' },
  { id: 'P3', name: 'Elegance (density vs clutter)' },
  { id: 'P4', name: 'AVALA / Dataico Design Principles' },
  { id: 'P5', name: 'Logic Specification (state machine)' },
];

// ---- Contract: control plane <-> reasoning plane -----------------------------

const SCORE_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['principles', 'escalations'],
  properties: {
    principles: {
      type: 'array',
      minItems: 5,
      maxItems: 5,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'name', 'score', 'evidence', 'fixes'],
        properties: {
          id: { type: 'string', enum: ['P1', 'P2', 'P3', 'P4', 'P5'] },
          name: { type: 'string' },
          score: { type: 'integer', minimum: 1, maximum: 5 },
          evidence: {
            type: 'string',
            description: 'Specific elements/behaviors observed. No vibes.',
          },
          fixes: {
            type: 'array',
            description: 'Concrete, ordered, codebase-actionable fixes to reach >=4.',
            items: { type: 'string' },
          },
        },
      },
    },
    escalations: {
      type: 'array',
      description:
        'Fixes that need a human decision and must NOT be auto-applied: hero/value-prop copy, palette/type/base tokens, product scope, new dependency.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['principle', 'blocked', 'decisionNeeded'],
        properties: {
          principle: { type: 'string' },
          blocked: { type: 'string' },
          decisionNeeded: { type: 'string' },
        },
      },
    },
  },
};

const FIX_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['changes'],
  properties: {
    changes: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['file', 'principle', 'summary'],
        properties: {
          file: { type: 'string' },
          principle: { type: 'string' },
          summary: { type: 'string' },
        },
      },
    },
    skipped: {
      type: 'array',
      description: 'Fixes deliberately not applied (e.g. governance escalation).',
      items: { type: 'string' },
    },
  },
};

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['verdicts'],
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['principle', 'newScore', 'confirmed', 'regressions'],
        properties: {
          principle: { type: 'string' },
          newScore: { type: 'integer', minimum: 1, maximum: 5 },
          confirmed: {
            type: 'boolean',
            description: 'True only if the fix genuinely reached >=4 with no regression.',
          },
          regressions: {
            type: 'array',
            description: 'Other principles this change may have hurt.',
            items: { type: 'string' },
          },
        },
      },
    },
  },
};

// ---- Role prompts ------------------------------------------------------------

function reviewerPrompt(prev) {
  const focus = prev
    ? `This is a re-review. Previous scores: ${prev.principles
        .map((p) => `${p.id}=${p.score}`)
        .join(', ')}. Re-score ALL five (a fix can regress another principle), but pay special attention to the ones that were below ${GATE}.`
    : 'This is the first review.';
  return [
    `You are the UX REVIEWER (read-only). Review this flow: ${FLOW}.`,
    `Follow the rubric exactly: read ${RUBRIC} first and use its anchored 1-5 definitions.`,
    'Inspect the RUNNING preview with the browser tools (navigate/read_page/screenshot; run the squint test by zooming out or blurring) AND the relevant source under src/.',
    'Rules: cite specific evidence for every score (no vibes); never inflate a score; for the Simplicity principle actually run the squint test and report the single element that survives.',
    'For any fix that would require changing hero/value-proposition copy, the palette/typography/base tokens, product scope, or adding a dependency: DO NOT list it as a normal fix — put it under escalations (it needs human sign-off per CLAUDE.md).',
    focus,
    'Return the structured report (all five principles with score, evidence, ordered fixes, plus escalations).',
  ].join('\n');
}

function fixerPrompt(failing) {
  return [
    'You are the UX FIXER (write access). Apply the fixes below to raise the failing principles to >=4.',
    `Flow: ${FLOW}.`,
    'Failing principles and their prescribed fixes:',
    JSON.stringify(failing, null, 1),
    'Honor CLAUDE.md governance strictly:',
    '- Never hardcode color/spacing/radii/type — extend tailwind.config.ts tokens first.',
    '- Ship/adjust a unit test for every component you touch.',
    '- Keep user-facing copy in Spanish; code/comments in English.',
    '- DO NOT touch protected hero/value-prop copy or base tokens — skip those and report them under "skipped".',
    'Make the minimal set of edits that addresses the fixes. Return the list of changes.',
  ].join('\n');
}

function verifierPrompt(failing, fixResult) {
  return [
    'You are the UX VERIFIER (read-only, independent, adversarial).',
    `Flow: ${FLOW}. The Fixer just reported these changes:`,
    JSON.stringify(fixResult, null, 1),
    `For each previously-failing principle (${failing
      .map((p) => p.id)
      .join(', ')}), re-inspect the running preview and source and decide, skeptically, whether it truly reached >=${GATE}.`,
    'Actively look for two failure modes: (a) the fix looks applied but does not actually move the score; (b) the fix helped one principle but regressed another.',
    'Default to confirmed=false when uncertain. Return a verdict per principle.',
  ].join('\n');
}

// ---- Control plane: the state machine ---------------------------------------

function passes(report) {
  return report.principles.every((p) => p.score >= GATE);
}

const roundsLog = [];
let round = 0;
let report = null;
let outcome = 'unknown';

while (round < MAX_ROUNDS) {
  round += 1;

  // --- REVIEW (read-only) ---
  phase('Review');
  report = await agent(reviewerPrompt(report), {
    label: `review r${round}`,
    phase: 'Review',
    agentType: 'Explore',
    schema: SCORE_SCHEMA,
  });
  roundsLog.push({
    round,
    scores: report.principles.reduce((a, p) => ({ ...a, [p.id]: p.score }), {}),
  });
  log(
    `Round ${round} — ${report.principles
      .map((p) => `${p.id}:${p.score}`)
      .join(' · ')}`,
  );

  // --- GATE ---
  if (passes(report)) {
    outcome = 'pass';
    log(`GATE PASSED in round ${round}`);
    break;
  }

  // --- ESCALATION is a first-class terminal state ---
  if (report.escalations.length > 0) {
    outcome = 'escalated';
    log(`Escalation: ${report.escalations.length} human decision(s) needed — halting.`);
    break;
  }

  // review-only mode never edits
  if (!APPLY) {
    outcome = 'review-only';
    log('Review-only mode: gate not met, no fixes applied.');
    break;
  }

  // no point fixing on the last allowed round
  if (round >= MAX_ROUNDS) break;

  const failing = report.principles.filter((p) => p.score < GATE);

  // --- FIX (write) ---
  phase('Fix');
  const fixResult = await agent(fixerPrompt(failing), {
    label: `fix r${round}`,
    phase: 'Fix',
    agentType: 'general-purpose',
    schema: FIX_SCHEMA,
  });
  log(`Round ${round} — applied ${fixResult.changes.length} change(s)`);

  // --- VERIFY (read-only, independent) ---
  phase('Verify');
  const verdict = await agent(verifierPrompt(failing, fixResult), {
    label: `verify r${round}`,
    phase: 'Verify',
    agentType: 'Explore',
    schema: VERDICT_SCHEMA,
  });
  const stillBroken = verdict.verdicts.filter((v) => !v.confirmed);
  if (stillBroken.length) {
    log(
      `Verifier not convinced on: ${stillBroken
        .map((v) => v.principle)
        .join(', ')} — next round re-scores authoritatively.`,
    );
  }
  // The next loop's Review is the authoritative re-score; the Verifier is the
  // adversarial gate that keeps a sycophantic Fixer from being trusted blindly.
}

if (outcome === 'unknown') outcome = 'max-rounds';

return {
  flow: FLOW,
  outcome, // 'pass' | 'escalated' | 'review-only' | 'max-rounds'
  passed: report ? passes(report) : false,
  rounds: round,
  scoreLog: roundsLog,
  escalations: report ? report.escalations : [],
  finalReport: report,
};

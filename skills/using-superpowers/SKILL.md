---
name: using-superpowers
description: Use when checking whether a named Superpowers procedure applies; user/project direct-work overrides take precedence, including after compaction
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, ignore this skill.
</SUBAGENT-STOP>

## Applicability before procedure

User/project direct-work overrides take precedence at the trigger, including after compaction. A bounded declarative edit to an existing label, URL, list or configuration value remains direct work: inspect the owner, edit narrowly, run the smallest applicable check and finish. Do not stack brainstorming, planning, TDD, worktree, reviewer or task/outcome scaffolding merely because an edit exists.

Load a named skill when its actual trigger is met or it was explicitly requested. A vague possible match is not enough. Bounded inspection or a clarifying question may establish the trigger without first loading a workflow. An approved plan already authorises its scoped implementation, ordinary tests and repairs; skills do not add another approval gate.

## Skill selection

- Ambiguous product/design requirements or a new architecture decision → `superpowers:brainstorming`, within user/project authority. Do not re-brainstorm an already approved design.
- A genuine bug, unexplained failure or failing test needing diagnosis → `superpowers:systematic-debugging`; retain evidence-led root-cause checks.
- Authorised logic implementation → the applicable tested implementation procedure; use risk-appropriate independent review for substantial changes, not automatic maximum-cost review or a swarm.
- Explicit tiny declarative edit with no new logic/risk → direct work, even after compaction. If inspection exposes logic, security, privacy or unresolved scope, apply the relevant procedure and authority boundary.

Use only the smallest sufficient workflow/context. Do not create a new task, plan, outcome file, delegation wave or approval gate unless requested or required by the actual risk and project instructions. Check the current skill when it applies; remembering its name is not reading its procedure.

## Platform Adaptation

If your harness appears here, read its reference file for special instructions:

- Claude Code: `references/claude-code-tools.md`
- Codex: `references/codex-tools.md`
- Pi: `references/pi-tools.md`
- Antigravity: `references/antigravity-tools.md`
- Hermes Agent: `references/hermes-tools.md`
- Muse: `references/muse-tools.md`

## L0 Goals

Some projects declare an **L0 goal**: a locked, human-owned document that sits
above every spec and plan. Project instructions (CLAUDE.md, AGENTS.md) or your
human partner name it, usually with a verify command.

- Specs and plans serve the L0 goal. They cite it; they never restate,
  narrow, reinterpret or replace it.
- Nothing in these skills changes it: not a ruling, not a design approval,
  not a spec. Only your human partner changes it, as a new locked version.
- An action that would change its question or requirements, its evaluator,
  baseline, data partition or margins after scoring, or its declared
  non-claims, or that would present a surrogate result as progress on it,
  is a **stop**: report to your human partner instead of deciding.
- If it has a verify command, run it before relying on the goal and before
  each review. A failed verification is a stop.
- A red result is evidence against the goal's claim. Record it as that; it
  is never a reason to redefine what passing means.
- **Owned routes.** Routes your human partner specified are theirs. They
  live verbatim, with their source, in a routes file beside the L0 goal
  (e.g. `state/l0/<programme>-routes.md`), verified like the goal. You may
  add routes beside them. You may never drop, narrow, replace, re-scope or
  silently reorder one, and a plan that departs from an owned route is a
  stop (`L0 STOP:`), not a ruling. Quote the owned route in any plan that
  serves it.
- Label every intervention at the **start of its own line**, in your message
  to your human partner, so it can be collected into a digest:
  `L0 STOP: <what would have changed the goal, and what you did instead>`,
  `L0 Critical: <reviewer finding>` (always pass reviewer L0 Criticals on),
  and `Ruling: <decision> — <why> — <cost if wrong>` for each ruling you
  report. Never use these labels for anything else.

## Clinical Evidence Precedence

For Cog programmes using clinical or EHR data, `state/l0/clinical-evidence-policy.md`
outranks stricter blueprint or plan continuation/data-reuse rules. Grade evidence
with estimate and interval, not pass/fail; a missed gate changes the claim, never
by itself ends a line. Only Chris closes a route, line or programme. Held-out data
may be reused with every decision-informing look logged. Disclosed post-hoc
precision/measurement fixes are allowed; moving a claim margin after scoring is not.
Keep claim gates separate from continuation guides; an unlabelled gate is a guide.
This does not permit changing L0 questions, owned routes or human-owned margins.

## User Instructions

User instructions (CLAUDE.md, AGENTS.md, GEMINI.md, etc, direct requests) take precedence over skills, including standing bounded-direct-work rules; no per-task override phrase is required. Skill metadata grants neither broader scope nor new approval gates. Preserve privacy, clinical evidence, exact process-control authority and continuing execution boundaries.

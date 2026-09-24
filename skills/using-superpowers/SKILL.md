---
name: using-superpowers
description: Use when starting any conversation - establishes how to find and use skills, requiring skill invocation before ANY response including clarifying questions
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, ignore this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## The Rule

**Invoke relevant or requested skills BEFORE any response or action** — including clarifying questions, exploring the codebase, or checking files. If it turns out wrong for the situation, you don't have to use it.

**Before entering plan mode:** if you haven't already brainstormed, invoke the brainstorming skill first.

Then announce "Using [skill] to [purpose]" and follow the skill exactly. If it has a checklist, create a todo per item.

## Skill Priority

When multiple skills apply, process skills come first — they set the approach, then implementation skills (frontend-design, etc.) carry it out. Brainstorming and systematic-debugging are Superpowers' most common process skills, but the rule holds for any of them.

- "Let's build X" → superpowers:brainstorming first, then implementation skills.
- "Fix this bug" → superpowers:systematic-debugging first, then domain skills.

## Red Flags

These thoughts mean STOP—you're rationalizing:

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "I can check git/files quickly" | Files lack conversation context. Check for skills. |
| "Let me gather information first" | Skills tell you HOW to gather information. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "I remember this skill" | Skills evolve. Read current version. |
| "This doesn't count as a task" | Action = task. Check for skills. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |
| "This feels productive" | Undisciplined action wastes time. Skills prevent this. |
| "I know what that means" | Knowing the concept ≠ using the skill. Invoke it. |

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

## User Instructions

User instructions (CLAUDE.md, AGENTS.md, GEMINI.md, etc, direct requests) take precedence over skills, which in turn override default behavior. Only skip skill workflows or instructions when your human partner has explicitly told you to.

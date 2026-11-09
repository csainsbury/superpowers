// Offline source contracts and actual bootstrap output, not LLM compliance.
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import test from 'node:test';

const root = resolve(import.meta.dirname, '../..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const sdd = 'skills/subagent-driven-development/';

// Adapted from Cog tests/test_instruction_policy.mjs: keep the established
// positive/negative cases, without depending on the maintainer's global HOME.
test('tiny declarative work stays direct; design and debug retain their triggers', () => {
  const using = read('skills/using-superpowers/SKILL.md');
  assert.match(using, /bounded declarative edit/i);
  assert.match(using, /direct work/i);
  assert.match(using, /ambiguous.*design/i);
  assert.match(using, /systematic-debugging/);
  assert.match(using, /approved plan already authorises/i);
  assert.doesNotMatch(using, /1%|BEFORE any response|If a skill exists, use it/);
  const brainstorming = read('skills/brainstorming/SKILL.md');
  assert.match(brainstorming, /already approved design/i);
  assert.match(brainstorming, /bounded declarative edit/i);
  assert.match(brainstorming, /genuinely unresolved.*design/i);
  const planning = read('skills/writing-plans/SKILL.md');
  assert.match(planning, /continuing\s+authority/i);
  assert.match(planning, /no new approval gate/i);
});

test('execution authority is scoped; safety and L0 stops cannot become rulings', () => {
  for (const path of ['skills/executing-plans/SKILL.md', `${sdd}SKILL.md`]) {
    const text = read(path);
    for (const clause of [/scope/i, /budget/i, /confidentiality/i, /process-control/i,
      /Five things stop you/, /L0: <path> verified <hash>/, /L0 verify command/, /never on what it is/]) {
      assert.match(text, clause, path);
    }
    assert.doesNotMatch(text, /a cap you would have asked to exceed — decide/);
    assert.match(text, /active plan's review budget and topology/i);
  }
  const using = read('skills/using-superpowers/SKILL.md');
  assert.match(using, /Owned routes/);
  assert.match(using, /never drop, narrow, replace, re-scope/);
  assert.match(using, /L0 STOP: <what would have changed the goal/);
  assert.match(using, /clinical-evidence-policy\.md/);
  assert.match(using, /Only Chris closes/);
  assert.match(using, /estimate and interval/);
  assert.match(using, /decision-informing look/);
  assert.match(using, /moving a claim margin after scoring is not/);
  const reviewer = read(`${sdd}task-reviewer-prompt.md`);
  assert.match(reviewer, /\[L0_GOAL_FILE\]/);
  assert.match(reviewer, /L0 Critical/);
  assert.match(reviewer, /\*\*Owned route:\*\*/);
  assert.match(reviewer, /clinical-evidence-policy\.md/);
  assert.match(read('skills/writing-plans/SKILL.md'), /\*\*Owned route:\*\*/);
  assert.match(read('skills/brainstorming/SKILL.md'), /Design approval never\namends the L0 goal/);
  assert.match(read(`${sdd}SKILL.md`), /references\/preflight\.md/);
});

test('risk-based authorised model selection survives the extracted SDD references', () => {
  for (const path of ['skills/executing-plans/SKILL.md', `${sdd}SKILL.md`]) {
    const text = read(path);
    assert.match(text, /independent.*sufficient reviewer/i);
    assert.match(text, /subscription/i);
    assert.match(text, /demonstrated capability gap/i);
  }
  for (const path of ['skills/executing-plans/SKILL.md', 'skills/writing-plans/SKILL.md',
    `${sdd}SKILL.md`, `${sdd}references/fix-loop.md`, `${sdd}references/final-review.md`,
    `${sdd}references/handling-reports.md`]) {
    assert.doesNotMatch(read(path), /on the most capable|→ most capable model|use the most capable available|at least one tier above|re-dispatch with a more capable model|dispatch a fresh implementer on a more capable model/i, path);
  }
  assert.match(read(`${sdd}references/fix-loop.md`), /Five rounds maximum/);
  assert.match(read(`${sdd}references/fix-loop.md`), /demonstrated capability gap/);
  assert.match(read(`${sdd}references/final-review.md`), /user\/project authority and safety boundaries/i);
});

test('Pi startup, later prompts and compaction inject direct-work and scoped authority', async () => {
  const handlers = new Map();
  const extension = await import(pathToFileURL(resolve(root, '.pi/extensions/superpowers.ts')).href);
  extension.default({ on: (event, handler) => handlers.set(event, handler) });
  assert.equal(handlers.has('resources_discover'), false, 'respect Pi package skill filters');
  for (const event of ['session_start', 'session_compact']) {
    await handlers.get(event)({}, {});
    const summary = { role: 'compactionSummary', summary: 'Change a label only' };
    const user = { role: 'user', content: 'Rename the label; no new logic.' };
    for (let prompt = 0; prompt < 2; prompt++) {
      const result = await handlers.get('context')({ messages: [summary, user] }, {});
      assert.equal(result.messages[0], summary);
      assert.equal(result.messages[2], user);
      const text = result.messages[1].content[0].text;
      assert.match(text, /user\/project direct-work overrides/i);
      assert.match(text, /bounded declarative edit/i);
      assert.match(text, /tool availability is not a trigger/);
      assert.match(text, /Owned routes/);
      assert.match(text, /clinical-evidence-policy\.md/);
      assert.doesNotMatch(text, /1%|BEFORE any response/);
      assert.equal(await handlers.get('context')({ messages: result.messages }, {}), undefined);
      // v7.0.2 correctly keeps request-local injection alive after agent_end.
      await handlers.get('agent_end')?.({}, {});
    }
  }
});

test('Claude SessionStart injects the same Cog authority and applicability body', () => {
  const home = mkdtempSync(resolve(tmpdir(), 'superpowers-cog-hook-'));
  try {
    const output = execFileSync('bash', [resolve(root, 'hooks/session-start')], {
      env: { PATH: process.env.PATH, HOME: home, CLAUDE_PLUGIN_ROOT: root }, encoding: 'utf8',
    });
    const text = JSON.parse(output).hookSpecificOutput.additionalContext;
    assert.match(text, /bounded declarative edit/i);
    assert.match(text, /approved plan already authorises/i);
    assert.match(text, /Owned routes/);
    assert.match(text, /clinical-evidence-policy\.md/);
    assert.doesNotMatch(text, /1%|BEFORE any response/);
  } finally {
    rmSync(home, { recursive: true, force: true });
  }
});

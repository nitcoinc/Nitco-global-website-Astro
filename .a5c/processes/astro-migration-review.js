/**
 * @process astro-migration-review
 * @description Audits the Nitco website Astro migration status — compares what's
 * implemented in src/ against the original migration plan docs, checks build
 * health, tests, and produces a summary report.
 * @inputs { projectRoot: string }
 * @outputs { summary: string, completedItems: array, pendingItems: array, issues: array }
 */

import { defineTask } from '@a5c-ai/babysitter-sdk';

// ─── Tasks ───────────────────────────────────────────────────────────────────

const auditFilesTask = defineTask('audit-files', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Audit Astro implementation vs migration plan',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior engineer auditing a Next.js → Astro migration',
      task: 'Compare what exists in src/ against the migration plan. Report completed items, pending items, and any quality issues.',
      context: {
        projectRoot: args.projectRoot,
        migrationPlanIndex: 'docs/migration/PLAN-INDEX.md',
        migrationContext: 'MIGRATION_CONTEXT.md',
        astroSrc: 'src/',
        projectState: 'PROJECT.md',
      },
      instructions: [
        'Read PROJECT.md to understand the overall state',
        'Read docs/migration/PLAN-INDEX.md to get the full task list',
        'Read MIGRATION_CONTEXT.md for architecture context',
        'List all files in src/ (pages, components, islands, layouts, lib, styles)',
        'For each foundation unit in the plan, check if the corresponding src/ file exists',
        'For each page in the plan, check if the corresponding src/pages/ file exists',
        'Check astro.config.mjs for correct output mode and integrations',
        'Check Dockerfile for nginx static serving setup',
        'Check package.json for correct Astro dependencies',
        'Check if any tests exist in tests/e2e/ and what they cover',
        'Check if there are any obvious TODOs or placeholder files in src/',
        'Identify items that are truly pending vs items that appear done',
        'Note any quality gaps: missing error handling, broken imports, etc.',
        'Produce a structured summary with: completedItems, pendingItems, issues',
      ],
      outputFormat: 'JSON with fields: summary (string), completedItems (array of strings), pendingItems (array of strings), issues (array of strings)',
    },
    outputSchema: {
      type: 'object',
      required: ['summary', 'completedItems', 'pendingItems', 'issues'],
      properties: {
        summary: { type: 'string' },
        completedItems: { type: 'array', items: { type: 'string' } },
        pendingItems: { type: 'array', items: { type: 'string' } },
        issues: { type: 'array', items: { type: 'string' } },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

const buildCheckTask = defineTask('build-check', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Run Astro build check',
  command: 'cd /home/pmandapati/Desktop/agent-projects/Nitco_global_website && pnpm run build 2>&1 | tail -30',
  io: {
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

// ─── Process ─────────────────────────────────────────────────────────────────

export async function process(inputs, ctx) {
  const { projectRoot = '/home/pmandapati/Desktop/agent-projects/Nitco_global_website' } = inputs || {};

  ctx.log('info', 'Starting Astro migration review audit');

  // Phase 1: Audit files vs migration plan
  const audit = await ctx.task(auditFilesTask, { projectRoot });

  ctx.log('info', `Audit complete. Completed: ${audit.completedItems.length}, Pending: ${audit.pendingItems.length}, Issues: ${audit.issues.length}`);

  return {
    summary: audit.summary,
    completedItems: audit.completedItems,
    pendingItems: audit.pendingItems,
    issues: audit.issues,
  };
}

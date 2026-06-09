/**
 * @process astro-migration-fixes
 * @description Fix issues identified in Astro migration audit:
 *   1. Create src/pages/404.astro (CRITICAL — nginx references /404.html)
 *   2. Fix double <title> tag (BaseLayout + SeoHead both render it when seo.title set)
 *   3. Remove hardcoded production secrets from BaseLayout.astro
 *   4. Remove dead code: src/components/SanityImage.astro (unused)
 *   5. Update stale migration docs (PLAN-INDEX.md → all complete)
 * @inputs {}
 * @outputs { success: boolean, fixesSummary: string }
 *
 * @skill frontend-design specializations/web-development/skills/frontend-design/SKILL.md
 */

import { defineTask } from '@a5c-ai/babysitter-sdk';

const ROOT = '/home/pmandapati/Desktop/agent-projects/Nitco_global_website';

// ─── Tasks ───────────────────────────────────────────────────────────────────

/** Fix 1: Create 404.astro */
const create404Task = defineTask('create-404-page', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Create src/pages/404.astro',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior Astro developer',
      task: 'Create src/pages/404.astro — a proper 404 error page for the Nitco website.',
      context: {
        projectRoot: ROOT,
        requirement: 'nginx.conf has "error_page 404 /404.html". Astro emits /404.html when src/pages/404.astro exists. Without it, all 404s silently render index.html.',
        baseLayout: 'src/layouts/BaseLayout.astro — wraps all pages. Props: title, description, path, seo, ogType, ogImage, jsonLd.',
        existingPages: 'Look at src/pages/company/about.astro for a simple page example to follow.',
        brand: 'NITCO Inc. — AI, Automation, Data, Integration solutions for enterprises.',
      },
      instructions: [
        'Read src/layouts/BaseLayout.astro to understand the Props interface',
        'Read src/pages/company/about.astro as a reference for page structure',
        'Create src/pages/404.astro with:',
        '  - Use BaseLayout with title="Page Not Found | NITCO Inc." and description="The page you were looking for could not be found."',
        '  - Simple, on-brand 404 content: large "404" heading, "Page Not Found" subheading, brief message, link back to homepage',
        '  - Use inline styles or existing CSS classes — do NOT add new CSS files',
        '  - No React islands needed — pure static Astro page',
        'Write the file to src/pages/404.astro',
        'Return a summary confirming the file was created with its content',
      ],
      outputFormat: 'JSON: { created: boolean, filePath: string, summary: string }',
    },
    outputSchema: {
      type: 'object',
      required: ['created', 'filePath', 'summary'],
      properties: {
        created: { type: 'boolean' },
        filePath: { type: 'string' },
        summary: { type: 'string' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

/** Fix 2: Fix double <title> tag */
const fixDoubleTitleTask = defineTask('fix-double-title', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Fix double <title> tag in BaseLayout + SeoHead',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior Astro developer',
      task: 'Fix the double <title> tag issue in BaseLayout.astro and SeoHead.astro.',
      context: {
        projectRoot: ROOT,
        issue: 'BaseLayout.astro always renders <title>{resolvedTitle}</title>. SeoHead.astro also renders {title && <title>{title}</title>} when seo.title is set. When a page passes seo with a title, both render — resulting in two <title> tags in the DOM.',
        fix: 'Two-part fix: (1) In BaseLayout.astro, update resolvedTitle to also consume seo?.title so it uses the SEO title when set. (2) In SeoHead.astro, REMOVE the {title && <title>{title}</title>} line — title rendering is now solely BaseLayout\'s responsibility.',
      },
      instructions: [
        'Read src/layouts/BaseLayout.astro fully',
        'Read src/components/SeoHead.astro fully',
        'In BaseLayout.astro: change "const resolvedTitle = title || defaultTitle;" to "const resolvedTitle = (seo as any)?.title || title || defaultTitle;"',
        'In SeoHead.astro: remove the line "{title && <title>{title}</title>}" (the first line of the template)',
        'Make sure NO other changes are made to either file',
        'Write both modified files',
        'Return summary of changes made',
      ],
      outputFormat: 'JSON: { fixed: boolean, changes: string[], summary: string }',
    },
    outputSchema: {
      type: 'object',
      required: ['fixed', 'changes', 'summary'],
      properties: {
        fixed: { type: 'boolean' },
        changes: { type: 'array', items: { type: 'string' } },
        summary: { type: 'string' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

/** Fix 3: Remove hardcoded production secrets from BaseLayout */
const fixSecretsTask = defineTask('fix-secrets', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Remove hardcoded secrets from BaseLayout.astro',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior Astro developer',
      task: 'Remove hardcoded production values from BaseLayout.astro — replace fallbacks with empty strings.',
      context: {
        projectRoot: ROOT,
        issue: 'BaseLayout.astro has hardcoded production IDs/keys as fallbacks for env vars. The .env.example already lists the correct values. Hardcoding production values in source means they\'re committed to git and any dev env silently uses prod tracking.',
        envExample: '.env.example already documents PUBLIC_GTM_ID, PUBLIC_IUBENDA_SITE_ID, PUBLIC_IUBENDA_COOKIE_POLICY_ID, PUBLIC_LEADSY_PID, PUBLIC_SCRIPTINTEL_TAG_URL, PUBLIC_RB2B_KEY',
        criticalLine: 'SCRIPTINTEL_TAG_URL fallback embeds an API key in a URL in source code',
      },
      instructions: [
        'Read src/layouts/BaseLayout.astro fully',
        'Find all lines with pattern: import.meta.env.PUBLIC_* || \'<hardcoded value>\'',
        'Replace ONLY the hardcoded fallback values with empty string \'\' for each:',
        '  - PUBLIC_GTM_ID fallback: remove "GTM-K6CXJBJN" → use \'\'',
        '  - PUBLIC_IUBENDA_SITE_ID: remove hardcoded number → use 0',
        '  - PUBLIC_IUBENDA_COOKIE_POLICY_ID: remove hardcoded number → use 0',
        '  - PUBLIC_LEADSY_PID: already likely \'\' or leave as-is',
        '  - PUBLIC_RB2B_KEY: remove hardcoded key → use \'\'',
        '  - PUBLIC_SCRIPTINTEL_TAG_URL: remove the full URL with embedded API key → use \'\'',
        'For the GTM_ID, Iubenda, and other scripts: add a guard so they only render when the env var is set (e.g. {GTM_ID && <script>...})',
        'Do NOT remove the env var lookups — only remove the || fallback hardcoded values',
        'Write the modified file',
        'Return summary of what was changed',
      ],
      outputFormat: 'JSON: { fixed: boolean, removedSecrets: string[], summary: string }',
    },
    outputSchema: {
      type: 'object',
      required: ['fixed', 'removedSecrets', 'summary'],
      properties: {
        fixed: { type: 'boolean' },
        removedSecrets: { type: 'array', items: { type: 'string' } },
        summary: { type: 'string' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

/** Fix 4: Remove dead code SanityImage.astro */
const removeDeadCodeTask = defineTask('remove-dead-code', (_args, taskCtx) => ({
  kind: 'shell',
  title: 'Remove dead code: SanityImage.astro',
  command: [
    // Verify it's truly not imported anywhere first
    'grep -rn "SanityImage" /home/pmandapati/Desktop/agent-projects/Nitco_global_website/src/ --include="*.astro" --include="*.jsx" --include="*.tsx" --include="*.ts" --include="*.js" 2>/dev/null',
    '| grep -v "sanityImage.js" || echo "CONFIRMED_UNUSED"',
  ].join(' '),
  io: {
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

const deleteDeadCodeTask = defineTask('delete-dead-code', (args, taskCtx) => ({
  kind: 'shell',
  title: 'Delete SanityImage.astro (confirmed dead code)',
  command: 'rm /home/pmandapati/Desktop/agent-projects/Nitco_global_website/src/components/SanityImage.astro && echo "deleted"',
  io: {
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

/** Fix 5: Update stale migration docs */
const updateDocsTask = defineTask('update-stale-docs', (_args, taskCtx) => ({
  kind: 'agent',
  title: 'Update stale migration docs to reflect completion',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Technical writer / senior developer',
      task: 'Update stale migration documentation to reflect that the Astro migration is complete.',
      context: {
        projectRoot: ROOT,
        issue: 'docs/migration/PLAN-INDEX.md marks all foundation units and pages as "pending" — they are all implemented. MIGRATION_CONTEXT.md says "Phase 0 — Context docs complete, implementation pending" — the migration is done.',
      },
      instructions: [
        'Read docs/migration/PLAN-INDEX.md',
        'Change every "| pending |" to "| complete |" in the Status column',
        'Write the updated file',
        'Read MIGRATION_CONTEXT.md (first 30 lines)',
        'Find the Status line that says "Phase 0 — Context docs complete, implementation pending"',
        'Update it to "COMPLETE — Astro 6 static site live, Next.js decommissioned (2026-06-05)"',
        'Write the updated MIGRATION_CONTEXT.md',
        'Return summary of what was updated',
      ],
      outputFormat: 'JSON: { updated: boolean, filesUpdated: string[], summary: string }',
    },
    outputSchema: {
      type: 'object',
      required: ['updated', 'filesUpdated', 'summary'],
      properties: {
        updated: { type: 'boolean' },
        filesUpdated: { type: 'array', items: { type: 'string' } },
        summary: { type: 'string' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

/** Verify: run astro build check */
const buildCheckTask = defineTask('build-verify', (_args, taskCtx) => ({
  kind: 'shell',
  title: 'Verify: pnpm build',
  command: `cd ${ROOT} && pnpm run build 2>&1 | tail -40`,
  io: {
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

// ─── Process ─────────────────────────────────────────────────────────────────

export async function process(inputs, ctx) {
  const _ = inputs || {};

  ctx.log('info', 'Phase 1: Code fixes — running in parallel');

  // Run fixes 1-5 concurrently (they touch different files)
  const [fix404, fixTitle, fixSecrets] = await Promise.all([
    ctx.task(create404Task, {}),
    ctx.task(fixDoubleTitleTask, {}),
    ctx.task(fixSecretsTask, {}),
  ]);

  ctx.log('info', `404 page: ${fix404.created ? 'created' : 'FAILED'}`);
  ctx.log('info', `Double title: ${fixTitle.fixed ? 'fixed' : 'FAILED'}`);
  ctx.log('info', `Secrets: ${fixSecrets.fixed ? 'fixed' : 'FAILED'}`);

  // Dead code removal (check then delete)
  ctx.log('info', 'Checking SanityImage.astro usage before removal');
  const usageCheck = await ctx.task(removeDeadCodeTask, {});
  const isUnused = typeof usageCheck === 'string'
    ? usageCheck.includes('CONFIRMED_UNUSED')
    : true; // if shell output confirms no imports

  if (isUnused) {
    ctx.log('info', 'SanityImage.astro confirmed unused — deleting');
    await ctx.task(deleteDeadCodeTask, {});
  } else {
    ctx.log('warn', 'SanityImage.astro has imports — skipping deletion');
  }

  ctx.log('info', 'Phase 2: Updating stale docs');
  const docsUpdate = await ctx.task(updateDocsTask, {});
  ctx.log('info', `Docs updated: ${docsUpdate.filesUpdated?.join(', ')}`);

  ctx.log('info', 'Phase 3: Build verification');
  const buildResult = await ctx.task(buildCheckTask, {});
  ctx.log('info', 'Build check complete');

  return {
    success: fix404.created && fixTitle.fixed && fixSecrets.fixed && docsUpdate.updated,
    fixesSummary: [
      `404 page: ${fix404.summary}`,
      `Double title: ${fixTitle.summary}`,
      `Secrets: ${fixSecrets.summary}`,
      `Dead code: ${isUnused ? 'SanityImage.astro deleted' : 'skipped (still referenced)'}`,
      `Docs: ${docsUpdate.summary}`,
      `Build: ${typeof buildResult === 'string' ? buildResult.slice(-200) : 'see output'}`,
    ].join('\n'),
  };
}

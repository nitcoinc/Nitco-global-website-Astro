/**
 * @process cf-pages-prep
 * @description Prepare Nitco website for Cloudflare Pages deployment:
 *   1. Audit and fix .gitignore — add missing Astro/tooling entries
 *   2. Validate Sanity setup — fix missing projectId fallback, verify env vars documented
 *   3. Create CF Pages config — public/_headers (port from nginx.conf), public/_redirects
 *   4. Add .nvmrc for Node 22
 *   5. Document CF Pages deploy settings + Sanity webhook setup in README
 *   6. Verify build passes
 *
 * Deploy model: Git integration (CF auto-builds on push). Docker kept for staging.
 * Sanity: static site, islands fetch client-side via PUBLIC_SANITY_PROJECT_ID + useCdn.
 * @inputs {}
 * @outputs { success: boolean, summary: string }
 */

import { defineTask } from '@a5c-ai/babysitter-sdk';

const ROOT = '/home/pmandapati/Desktop/agent-projects/Nitco_global_website';

// ─── Tasks ────────────────────────────────────────────────────────────────────

const fixGitignoreTask = defineTask('fix-gitignore', (_, taskCtx) => ({
  kind: 'agent',
  title: 'Audit and fix .gitignore',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior DevOps engineer',
      task: 'Audit and fix .gitignore for the Nitco Astro website.',
      context: {
        projectRoot: ROOT,
        currentGitignore: '.gitignore (already has: node_modules/, dist/, .env, .env.*, coverage/, test-results/, *.log, .DS_Store, .vscode/, .idea/)',
        untracked: [
          '.astro/ — Astro build cache, must be ignored',
          '.lighthouseci/ — Lighthouse CI report output, ignore',
          'baseline/ — local screenshot baselines, ignore',
          'build.log — local build log, ignore',
          'artifacts/ — local CI artifacts, ignore',
          '.a5c/runs/ — babysitter run artifacts (large, ephemeral), ignore runs/ only; keep processes/',
          'astro/ — old parallel Next.js→Astro dev directory (kept for reference but should not be tracked)',
          'sanity/.next/ — Sanity Studio Next.js build output if present',
          'dist/ — already ignored',
        ],
        shouldTrack: [
          'src/ — main Astro source, MUST be tracked',
          'public/ — static assets, MUST be tracked',
          'astro.config.mjs — config, MUST be tracked',
          'nginx.conf — Docker staging config, MUST be tracked',
          'Dockerfile — Docker build, MUST be tracked',
          'content/ — SEO JSON and blog MDX, MUST be tracked',
          'docs/ — migration docs, MUST be tracked',
          'tests/ — e2e tests, MUST be tracked',
          '.a5c/processes/ — reusable babysitter processes, SHOULD be tracked',
          'DESIGN.md, MIGRATION_CONTEXT.md — project docs, track them',
          'sanity/ — Sanity Studio schema source, MUST be tracked',
          'sanity.config.js, sanity.cli.js — Studio config, MUST be tracked',
        ],
      },
      instructions: [
        'Read the current .gitignore',
        'Add these missing entries in appropriate sections:',
        '  Under "# Build outputs": .astro/',
        '  Under a new "# Cloudflare / CI" section: .lighthouseci/, baseline/, artifacts/, build.log',
        '  Under "# Claude / AI tools": .a5c/runs/ (NOT .a5c/ — we want to track .a5c/processes/)',
        '  Under a new "# Legacy / archive" section: astro/ (old parallel dev dir)',
        '  Under "# Build outputs": sanity/.next/',
        'Do NOT add src/, public/, content/, docs/, tests/, nginx.conf, Dockerfile, sanity/, astro.config.mjs — these must be tracked',
        'Write the updated .gitignore',
        'Return summary of additions made',
      ],
      outputFormat: 'JSON: { updated: boolean, added: string[], summary: string }',
    },
    outputSchema: {
      type: 'object',
      required: ['updated', 'added', 'summary'],
      properties: {
        updated: { type: 'boolean' },
        added: { type: 'array', items: { type: 'string' } },
        summary: { type: 'string' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

const validateSanityTask = defineTask('validate-sanity', (_, taskCtx) => ({
  kind: 'agent',
  title: 'Validate and fix Sanity setup',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior full-stack engineer',
      task: 'Validate and fix Sanity setup for Cloudflare Pages deployment.',
      context: {
        projectRoot: ROOT,
        sanityProjectId: 't8ctf4dg',
        sanityDataset: 'production',
        issue1: 'src/lib/sanity.js reads PUBLIC_SANITY_PROJECT_ID with no fallback — if env var not set, projectId is undefined and all queries fail silently at runtime.',
        issue2: 'sanity.config.js uses NEXT_PUBLIC_SANITY_PROJECT_ID (old Next.js env var name) — Studio uses its own process.env, so this is OK for Sanity Studio but should be documented.',
        issue3: '.env.example has PUBLIC_SANITY_PROJECT_ID= (empty) — should have the actual project ID as example value.',
        deployModel: 'Static site. React islands fetch Sanity data CLIENT-SIDE via the sanityClient (useCdn:true). No server-side GROQ at build time in pages.',
      },
      instructions: [
        'Read src/lib/sanity.js',
        'Add a fallback projectId so builds do not silently fail: change `projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID` to `projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "t8ctf4dg"`',
        'Write the updated src/lib/sanity.js',
        'Read .env.example',
        'Update PUBLIC_SANITY_PROJECT_ID= to PUBLIC_SANITY_PROJECT_ID=t8ctf4dg as example value',
        'Update PUBLIC_SANITY_DATASET=production to confirm correct',
        'Add a comment above SANITY_TOKEN explaining it is NOT needed for public CDN reads (useCdn:true), only for private/draft content',
        'Write the updated .env.example',
        'Read sanity.config.js',
        'The NEXT_PUBLIC_SANITY_PROJECT_ID reference is for Sanity Studio (separate app, uses process.env). Leave it but add a comment that Astro uses PUBLIC_SANITY_PROJECT_ID',
        'Write sanity.config.js only if you add a comment — otherwise skip',
        'Return summary of all changes',
      ],
      outputFormat: 'JSON: { validated: boolean, filesChanged: string[], issues: string[], summary: string }',
    },
    outputSchema: {
      type: 'object',
      required: ['validated', 'filesChanged', 'issues', 'summary'],
      properties: {
        validated: { type: 'boolean' },
        filesChanged: { type: 'array', items: { type: 'string' } },
        issues: { type: 'array', items: { type: 'string' } },
        summary: { type: 'string' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

const createCFConfigTask = defineTask('create-cf-config', (_, taskCtx) => ({
  kind: 'agent',
  title: 'Create Cloudflare Pages config files',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior DevOps / Cloudflare engineer',
      task: 'Create Cloudflare Pages configuration files for the Nitco Astro static site.',
      context: {
        projectRoot: ROOT,
        deployModel: 'Git integration. CF Pages auto-builds on push. Build command: pnpm run build. Output dir: dist. Node: 22.',
        nginxHeaders: `
HSTS: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
CSP: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.iubenda.com https://www.googletagmanager.com https://www.google-analytics.com https://r2.leadsy.ai https://api-gateway.scriptintel.io https://cdn.jsdelivr.net https://ddwl4m2hdecbv.cloudfront.net https://js.hs-scripts.com https://js.hsforms.net https://www.google.com https://www.gstatic.com https://snap.licdn.com https://www.linkedin.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://cdn.sanity.io https://www.googletagmanager.com https://www.google-analytics.com https://*.hsforms.net https://www.google.com https://ddwl4m2hdecbv.cloudfront.net; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://cdn.sanity.io https://*.apicdn.sanity.io https://www.google-analytics.com https://api-gateway.scriptintel.io https://ddwl4m2hdecbv.cloudfront.net https://r2.leadsy.ai https://forms.hsforms.com https://*.hubspot.com https://stats.g.doubleclick.net; frame-src 'self' https://player.vimeo.com https://www.googletagmanager.com https://www.google.com https://forms.hsforms.com https://www.youtube.com; media-src 'self' blob: https://player.vimeo.com; object-src 'none'; base-uri 'self'; form-action 'self' https://*.hubspot.com; frame-ancestors 'self'; upgrade-insecure-requests;
Static asset cache: public, max-age=31536000, immutable for .js .css .png .jpg etc.`,
        note: 'CF Pages serves from dist/. _headers and _redirects must go in public/ so Astro copies them to dist/ at build time.',
      },
      instructions: [
        'Create public/_headers with CF Pages _headers format:',
        '  Rule 1: /* — all routes get the security headers (HSTS, X-Content-Type, X-Frame, Referrer, Permissions, CSP)',
        '  Rule 2: /assets/* — Cache-Control: public, max-age=31536000, immutable',
        '  Rule 3: /_astro/* — Cache-Control: public, max-age=31536000, immutable (Astro puts hashed assets here)',
        '  CF Pages _headers format: one URL pattern line, then indented "  Header-Name: value" lines, blank line between blocks',
        '  IMPORTANT: Cloudflare automatically handles HTTPS upgrade — do NOT include Strict-Transport-Security in CF Pages _headers (CF adds it automatically for zones with HSTS enabled). Include the rest.',
        'Create public/_redirects — empty (no redirects needed) but add a comment explaining format',
        'Create .nvmrc with content: 22',
        'Write all three files',
        'Return summary of files created',
      ],
      outputFormat: 'JSON: { created: boolean, files: string[], summary: string }',
    },
    outputSchema: {
      type: 'object',
      required: ['created', 'files', 'summary'],
      properties: {
        created: { type: 'boolean' },
        files: { type: 'array', items: { type: 'string' } },
        summary: { type: 'string' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

const updateReadmeTask = defineTask('update-readme', (_, taskCtx) => ({
  kind: 'agent',
  title: 'Document CF Pages deploy settings + Sanity webhook in README',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Technical writer',
      task: 'Add a Cloudflare Pages deployment section and Sanity webhook instructions to README.md.',
      context: {
        projectRoot: ROOT,
        buildCmd: 'pnpm run build',
        outputDir: 'dist',
        nodeVersion: '22',
        envVars: [
          'PUBLIC_SANITY_PROJECT_ID=t8ctf4dg',
          'PUBLIC_SANITY_DATASET=production',
          'PUBLIC_GTM_ID=GTM-K6CXJBJN',
          'PUBLIC_IUBENDA_SITE_ID=2053600',
          'PUBLIC_IUBENDA_COOKIE_POLICY_ID=12542728',
          'PUBLIC_LEADSY_PID=<your-value>',
          'PUBLIC_RB2B_KEY=<your-value>',
          'PUBLIC_SCRIPTINTEL_TAG_URL=<your-value>',
          'PUBLIC_KORE_API_KEY=<your-value>',
        ],
        sanityWebhookNote: 'CF Pages dashboard > Settings > Builds & Deployments > Add deploy hook. Copy the webhook URL. In Sanity Studio > API > Webhooks, add a webhook pointing to that URL, filtered to publishDocument events.',
      },
      instructions: [
        'Read README.md',
        'Add (or replace if already exists) a "## Deployment — Cloudflare Pages" section covering:',
        '  - CF Pages dashboard settings: Framework preset=None, Build command, Output directory, Node.js version',
        '  - Table of required environment variables to set in CF Pages dashboard',
        '  - Note that Docker/nginx setup is for staging (see Dockerfile)',
        'Add a "### Auto-rebuild on Sanity content publish" subsection:',
        '  - Step 1: In CF Pages dashboard → Settings → Builds & Deployments → Add deploy hook → copy the URL',
        '  - Step 2: In Sanity Studio → API → Webhooks → Add webhook → URL = (deploy hook URL), trigger on publishDocument',
        '  - Note: SANITY_TOKEN is NOT required (useCdn:true, public content)',
        'Keep all existing README content intact — just append the new sections',
        'Write the updated README.md',
        'Return summary',
      ],
      outputFormat: 'JSON: { updated: boolean, sectionsAdded: string[], summary: string }',
    },
    outputSchema: {
      type: 'object',
      required: ['updated', 'sectionsAdded', 'summary'],
      properties: {
        updated: { type: 'boolean' },
        sectionsAdded: { type: 'array', items: { type: 'string' } },
        summary: { type: 'string' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

const buildVerifyTask = defineTask('build-verify', (_, taskCtx) => ({
  kind: 'shell',
  title: 'Final build verification',
  command: `cd ${ROOT} && pnpm run build 2>&1 | tail -15`,
  io: {
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

// ─── Process ──────────────────────────────────────────────────────────────────

export async function process(inputs, ctx) {
  const _ = inputs || {};

  ctx.log('info', 'Phase 1: gitignore audit + Sanity validation (parallel)');
  const [gitignoreResult, sanityResult] = await Promise.all([
    ctx.task(fixGitignoreTask, {}),
    ctx.task(validateSanityTask, {}),
  ]);

  ctx.log('info', `gitignore: ${gitignoreResult.updated ? 'updated' : 'FAILED'} — added: ${gitignoreResult.added?.join(', ')}`);
  ctx.log('info', `Sanity: ${sanityResult.validated ? 'validated' : 'issues found'} — changed: ${sanityResult.filesChanged?.join(', ')}`);

  ctx.log('info', 'Phase 2: CF Pages config + README (parallel)');
  const [cfResult, readmeResult] = await Promise.all([
    ctx.task(createCFConfigTask, {}),
    ctx.task(updateReadmeTask, {}),
  ]);

  ctx.log('info', `CF config: ${cfResult.created ? 'created' : 'FAILED'} — files: ${cfResult.files?.join(', ')}`);
  ctx.log('info', `README: ${readmeResult.updated ? 'updated' : 'FAILED'}`);

  ctx.log('info', 'Phase 3: Build verification');
  const buildResult = await ctx.task(buildVerifyTask, {});
  ctx.log('info', 'Build complete');

  return {
    success: gitignoreResult.updated && sanityResult.validated && cfResult.created && readmeResult.updated,
    summary: [
      `gitignore: ${gitignoreResult.summary}`,
      `Sanity: ${sanityResult.summary}`,
      `CF config: ${cfResult.summary}`,
      `README: ${readmeResult.summary}`,
      `Build: ${typeof buildResult === 'string' ? buildResult.slice(-300) : JSON.stringify(buildResult).slice(-300)}`,
    ].join('\n\n'),
  };
}

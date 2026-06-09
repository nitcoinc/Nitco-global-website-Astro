/**
 * @process specializations/code-migration-modernization/nextjs-to-astro-migration
 * @description Incremental, gated migration of the Nitco Next.js 14 (Pages Router) marketing
 *   site to Astro, using the hybrid-islands model. Parallel `astro/` subdir, strict 1:1 parity
 *   (Playwright e2e + screenshot diff + Lighthouse oracle), Sanity Studio untouched, JS/JSX kept.
 *   Produces a root MIGRATION_CONTEXT.md that references one context doc per page/section.
 * @inputs { projectName: string, pages: array, foundation: array, parityThresholds: object }
 * @outputs { success: boolean, baseline: object, plan: object, migratedPages: array, cutover: object, backlog: object, artifacts: array }
 *
 * @references
 *  - Reference process: specializations/code-migration-modernization/ui-framework-migration.js
 *  - Reference process: specializations/code-migration-modernization/migration-planning-roadmap.js
 *  - Reference process: specializations/code-migration-modernization/legacy-codebase-assessment.js
 *  - Astro: https://docs.astro.build  | Islands: https://docs.astro.build/en/concepts/islands/
 *  - @astrojs/react, @astrojs/sitemap, astro:assets, @sanity/client
 *
 * @skill frontend-design specializations/web-development/skills/frontend-design/SKILL.md
 * @skill code-review specializations/web-development/skills/code-review/SKILL.md
 * @agent framework-upgrade-specialist specializations/code-migration-modernization/agents/framework-upgrade-specialist/AGENT.md
 * @agent legacy-system-archaeologist specializations/code-migration-modernization/agents/legacy-system-archaeologist/AGENT.md
 * @agent regression-detector specializations/code-migration-modernization/agents/regression-detector/AGENT.md
 * @agent post-migration-validator specializations/code-migration-modernization/agents/post-migration-validator/AGENT.md
 * @agent nextjs-developer specializations/web-development/agents/nextjs-developer/AGENT.md
 * @agent seo-auditor specializations/web-development/agents/seo-auditor/AGENT.md
 * @agent e2e-testing specializations/web-development/agents/e2e-testing/AGENT.md
 * @agent lighthouse specializations/web-development/agents/lighthouse/AGENT.md
 */

import { defineTask } from '@a5c-ai/babysitter-sdk';

// ===========================================================================
// PROCESS
// ===========================================================================
export async function process(rawInputs, ctx) {
  const inputs = rawInputs || {};
  const {
    projectName = 'Nitco Next.js -> Astro Migration',
    astroDir = 'astro',
    docsDir = 'docs/migration',
    // Shared foundation ported FIRST (used by every page).
    foundation = [
      'sanity-client-lib', 'image-helper', 'base-layout',
      'navbar-island', 'footer', 'seo-head', 'gotop-island', 'global-styles-and-scripts',
    ],
    // Routes ordered simplest-static -> dynamic-detail -> generic-builder -> home (most blocks last).
    pages = [
      { route: '/contact', src: 'pages/contact.js', complexity: 'med', islands: ['ContactForm', 'reCAPTCHA'] },
      { route: '/resources', src: 'pages/resources.js', complexity: 'low', islands: ['masonry'] },
      { route: '/ai-agent-command-center', src: 'pages/ai-agent-command-center.js', complexity: 'med', islands: ['AICommandCenter'] },
      { route: '/company/about', src: 'pages/company/about.js', complexity: 'low', islands: ['countup'] },
      { route: '/company/careers', src: 'pages/company/careers.js', complexity: 'med', islands: ['careers-form'] },
      { route: '/blog/[slug]', src: 'pages/blog/[slug].js', complexity: 'med', islands: ['portabletext'] },
      { route: '/case-studies/[slug]', src: 'pages/case-studies/[slug].js', complexity: 'med', islands: [] },
      { route: '/webinar/[slug]', src: 'pages/webinar/[slug].js', complexity: 'med', islands: ['video'] },
      { route: '/whitepapers/[slug]', src: 'pages/whitepapers/[slug].js', complexity: 'med', islands: ['hubspot-form'] },
      { route: '/partners/[slug]', src: 'pages/partners/[slug].js', complexity: 'med', islands: [] },
      { route: '/insights/[page]', src: 'pages/insights/[page].js', complexity: 'med', islands: ['tabs'] },
      { route: '/solutions/[page]', src: 'pages/solutions/[page].js', complexity: 'high', islands: ['tabs', 'accordion', 'countup'] },
      { route: '/[page]', src: 'pages/[page].js', complexity: 'high', islands: ['Blocks-renderer'] },
      { route: '/', src: 'pages/index.js', complexity: 'high', islands: ['Blocks-renderer', 'countup', 'video', 'chatbot'] },
    ],
    parityThresholds = { screenshotMaxDiffRatio: 0.02, lighthouseMinDelta: 0, e2eMustPass: true },
    maxRefineAttempts = 3,
  } = inputs;

  const startTime = ctx.now();
  const artifacts = [];
  const migratedPages = [];
  ctx.log && ctx.log('info', `Starting ${projectName}`);

  // helper: gated refine loop around a build/verify task
  async function gatedRefineLoop(makeTaskCall, breakpointPayloadFn) {
    let lastFeedback = null;
    let result = null;
    for (let attempt = 0; attempt < maxRefineAttempts; attempt++) {
      result = await makeTaskCall(lastFeedback, attempt);
      const bp = await ctx.breakpoint({
        ...breakpointPayloadFn(result, attempt),
        expert: 'owner',
        tags: ['approval-gate'],
        options: ['Approve', 'Request changes'],
        previousFeedback: lastFeedback || undefined,
        attempt: attempt > 0 ? attempt + 1 : undefined,
      });
      if (bp.approved) return { result, approved: true };
      lastFeedback = bp.response || bp.feedback || 'Changes requested';
    }
    return { result, approved: false, lastFeedback };
  }

  // =========================================================================
  // PHASE 0 - DEEP INVENTORY + ROOT CONTEXT DOC + PARITY BASELINE
  // =========================================================================
  ctx.log && ctx.log('info', 'Phase 0: inventory + baseline');

  const inventory = await ctx.task(deepInventoryTask, { projectName, pages, foundation, docsDir });
  artifacts.push(...(inventory.artifacts || []));

  // Write the root context file + one detailed context doc per page/section.
  const contextDocs = await ctx.task(contextDocsTask, { projectName, inventory, pages, foundation, docsDir });
  artifacts.push(...(contextDocs.artifacts || []));

  // Capture the parity oracle from the CURRENT Next.js build (the source of truth).
  const baseline = await ctx.task(captureBaselineTask, { projectName });
  artifacts.push(...(baseline.artifacts || []));

  let baselineGate = await ctx.breakpoint({
    question: `Phase 0 done. Inventory: ${inventory.componentCount} components, ${pages.length} routes. Root context doc + ${pages.length + foundation.length} section docs written under ${docsDir}/. Baseline captured (e2e ${baseline.e2ePassed}/${baseline.e2eTotal}, screenshots ${baseline.screenshotCount}, LH ${baseline.lighthouseSummary}). Approve foundation analysis before scaffolding?`,
    title: 'Phase 0 — Inventory & Baseline',
    context: { runId: ctx.runId, inventory, baseline, contextDocs },
    expert: 'owner', tags: ['approval-gate'], options: ['Approve', 'Request changes'],
  });
  if (!baselineGate.approved) {
    return { success: false, reason: 'Rejected at Phase 0', feedback: baselineGate.response, artifacts };
  }

  // =========================================================================
  // PHASE 1 - MIGRATION PLAN DOCUMENT (refined + gated)
  // =========================================================================
  ctx.log && ctx.log('info', 'Phase 1: migration plan');
  const planGate = await gatedRefineLoop(
    (feedback, attempt) => ctx.task(migrationPlanTask, { projectName, inventory, pages, foundation, astroDir, docsDir, parityThresholds, feedback, attempt: attempt + 1 }),
    (plan) => ({
      question: `Detailed migration plan ready. Effort: ${plan.estimatedEffort}. Styling: ${plan.stylingStrategy}. Scripts: ${plan.scriptsStrategy}. Headers->nginx: ${plan.headersStrategy}. Improvement backlog: ${plan.backlogCount} items (NOT applied in parity phase). Approve plan?`,
      title: 'Phase 1 — Migration Plan',
      context: { runId: ctx.runId },
    })
  );
  if (!planGate.approved) return { success: false, reason: 'Rejected at Phase 1 plan', artifacts };
  const plan = planGate.result;
  artifacts.push(...(plan.artifacts || []));

  // =========================================================================
  // PHASE 2 - ASTRO SCAFFOLD (astro/ subdir; Next untouched)
  // =========================================================================
  ctx.log && ctx.log('info', 'Phase 2: scaffold astro/');
  const scaffold = await ctx.task(scaffoldAstroTask, { projectName, astroDir, plan });
  artifacts.push(...(scaffold.artifacts || []));
  const scaffoldBuild = await ctx.task(shellBuildTask, { astroDir, label: 'scaffold-smoke-build' });

  let scaffoldGate = await ctx.breakpoint({
    question: `Astro scaffold in ${astroDir}/ done (@astrojs/react, sitemap, astro:assets, @sanity/client, base layout, global CSS+scripts, nginx CSP doc). Smoke build: ${scaffoldBuild.ok ? 'PASS' : 'FAIL'}. Approve scaffold?`,
    title: 'Phase 2 — Astro Scaffold',
    context: { runId: ctx.runId, scaffold, scaffoldBuild },
    expert: 'owner', tags: ['approval-gate'], options: ['Approve', 'Request changes'],
  });
  if (!scaffoldGate.approved) return { success: false, reason: 'Rejected at Phase 2 scaffold', artifacts };

  // =========================================================================
  // PHASE 3 - SHARED FOUNDATION PORT (Layout/Navbar/Footer/SEO/Sanity)
  // =========================================================================
  ctx.log && ctx.log('info', 'Phase 3: foundation port');
  const foundationResults = [];
  for (const unit of foundation) {
    const fg = await gatedRefineLoop(
      (feedback, attempt) => ctx.task(portFoundationUnitTask, { projectName, astroDir, unit, plan, docsDir, feedback, attempt: attempt + 1 }),
      (r) => ({
        question: `Foundation unit "${unit}" ported. Build ${r.buildOk ? 'PASS' : 'FAIL'}. Notes: ${r.notes || 'n/a'}. Approve?`,
        title: `Phase 3 — Foundation: ${unit}`,
        context: { runId: ctx.runId },
      })
    );
    if (!fg.approved) return { success: false, reason: `Rejected porting foundation: ${unit}`, artifacts };
    foundationResults.push({ unit, ...fg.result });
    artifacts.push(...(fg.result.artifacts || []));
  }

  // =========================================================================
  // PHASE 4 - INCREMENTAL PAGE-BY-PAGE MIGRATION (gated per page)
  // =========================================================================
  ctx.log && ctx.log('info', 'Phase 4: per-page migration loop');
  for (const page of pages) {
    const pg = await gatedRefineLoop(
      async (feedback, attempt) => {
        // 1) convert route + islands + per-page context doc update
        const convert = await ctx.task(convertPageTask, { projectName, astroDir, page, plan, docsDir, baseline, feedback, attempt: attempt + 1 });
        // 2) build the astro app
        const build = await ctx.task(shellBuildTask, { astroDir, label: `build-${page.route}` });
        // 3) parity verification: e2e + screenshot diff + lighthouse for this route
        const verify = await ctx.task(verifyParityTask, { astroDir, page, baseline, parityThresholds, build });
        // 4) adversarial regression review of the diffs
        const review = await ctx.task(regressionReviewTask, { page, verify, baseline, parityThresholds });
        return { convert, build, verify, review };
      },
      (r) => ({
        question: `Route "${r.convert && r.review ? r.review.route || (r.convert.route) : ''}" migrated. Build ${r.build.ok ? 'PASS' : 'FAIL'}. e2e ${r.verify.e2ePassed}/${r.verify.e2eTotal}. ScreenshotDiff ${r.verify.maxDiffRatio} (max ${parityThresholds.screenshotMaxDiffRatio}). LH delta ${r.verify.lighthouseDelta}. Regression verdict: ${r.review.verdict}. Approve this page?`,
        title: `Phase 4 — Page: ${page.route}`,
        context: { runId: ctx.runId, page },
      })
    );
    if (!pg.approved) return { success: false, reason: `Rejected migrating page ${page.route}`, migratedPages, artifacts };
    migratedPages.push({ route: page.route, verify: pg.result.verify, review: pg.result.review });
    artifacts.push(...((pg.result.convert && pg.result.convert.artifacts) || []));
  }

  // =========================================================================
  // PHASE 5 - FULL-SITE INTEGRATION (full regression on Astro)
  // =========================================================================
  ctx.log && ctx.log('info', 'Phase 5: full-site integration');
  const integration = await ctx.task(fullIntegrationTask, { astroDir, baseline, parityThresholds, pages, foundation });
  artifacts.push(...(integration.artifacts || []));

  let integrationGate = await ctx.breakpoint({
    question: `Full Astro build done. Full e2e ${integration.e2ePassed}/${integration.e2eTotal}. Sitemap parity ${integration.sitemapParity ? 'OK' : 'MISMATCH'}. Redirects ${integration.redirectsParity ? 'OK' : 'MISMATCH'}. CSP/headers in nginx ${integration.headersOk ? 'OK' : 'TODO'}. LH summary ${integration.lighthouseSummary}. Broken links ${integration.brokenLinks}. Approve integration before cutover?`,
    title: 'Phase 5 — Full-Site Integration',
    context: { runId: ctx.runId, integration },
    expert: 'owner', tags: ['approval-gate'], options: ['Approve', 'Request changes'],
  });
  if (!integrationGate.approved) return { success: false, reason: 'Rejected at Phase 5 integration', migratedPages, artifacts };

  // =========================================================================
  // PHASE 6 - CUTOVER (destructive: swap astro/ -> root, remove Next)
  // =========================================================================
  ctx.log && ctx.log('info', 'Phase 6: cutover');
  let cutoverApproval = await ctx.breakpoint({
    question: `CUTOVER GATE (destructive). This swaps ${astroDir}/ to repo root, removes Next.js (pages/, next.config.js, next deps), and updates Docker to serve static /dist via nginx. A revert branch/tag will be created first. Proceed with cutover?`,
    title: 'Phase 6 — Cutover (DESTRUCTIVE)',
    context: { runId: ctx.runId },
    expert: 'owner', tags: ['approval-gate', 'destructive-git'], options: ['Approve cutover', 'Reject'],
  });
  if (!cutoverApproval.approved) return { success: false, reason: 'Cutover rejected; Astro app remains in subdir', migratedPages, artifacts };

  const cutover = await ctx.task(cutoverTask, { astroDir, projectName });
  artifacts.push(...(cutover.artifacts || []));
  const finalRegression = await ctx.task(fullIntegrationTask, { astroDir: '.', baseline, parityThresholds, pages, foundation, label: 'post-cutover' });
  artifacts.push(...(finalRegression.artifacts || []));

  let finalGate = await ctx.breakpoint({
    question: `Cutover complete. Post-cutover full e2e ${finalRegression.e2ePassed}/${finalRegression.e2eTotal}. LH ${finalRegression.lighthouseSummary}. Docker/nginx build ${cutover.dockerOk ? 'PASS' : 'FAIL'}. Revert tag: ${cutover.revertRef}. Approve final migration result?`,
    title: 'Phase 6 — Final Approval',
    context: { runId: ctx.runId, cutover, finalRegression },
    expert: 'owner', tags: ['approval-gate'], options: ['Approve', 'Request changes'],
  });
  if (!finalGate.approved) return { success: false, reason: 'Rejected at final approval', migratedPages, artifacts };

  // =========================================================================
  // PHASE 7 - IMPROVEMENT BACKLOG (separate, opt-in per item)
  // =========================================================================
  ctx.log && ctx.log('info', 'Phase 7: improvement backlog (opt-in)');
  const backlogPlan = await ctx.task(backlogProposalTask, { projectName, inventory, plan });
  let backlogGate = await ctx.breakpoint({
    question: `Parity migration is COMPLETE and approved. Improvement backlog (${backlogPlan.items.length} items): ${backlogPlan.summary}. Apply now, defer, or skip? (Each selected item is verified against the same parity oracle.)`,
    title: 'Phase 7 — Improvement Backlog (opt-in)',
    context: { runId: ctx.runId, backlogPlan },
    expert: 'owner', tags: ['approval-gate'], options: ['Apply selected', 'Defer all', 'Skip'],
  });
  let backlogResult = { applied: [], deferred: backlogPlan.items };
  if (backlogGate.approved && /apply/i.test(backlogGate.response || '')) {
    backlogResult = await ctx.task(applyBacklogTask, { projectName, backlogPlan, selection: backlogGate.response, baseline, parityThresholds });
    artifacts.push(...(backlogResult.artifacts || []));
  }

  const endTime = ctx.now();
  return {
    success: true,
    projectName,
    baseline,
    plan,
    foundation: foundationResults,
    migratedPages,
    integration,
    cutover,
    backlog: backlogResult,
    artifacts,
    duration: endTime - startTime,
    metadata: { processId: 'specializations/code-migration-modernization/nextjs-to-astro-migration', timestamp: startTime, astroDir, docsDir },
  };
}

// ===========================================================================
// TASK DEFINITIONS  (agent = reasoning/coding; shell = build/test/git)
// ===========================================================================

export const deepInventoryTask = defineTask('deep-inventory', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Phase 0: Deep codebase inventory',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Legacy system archaeologist / Next.js + Astro migration architect',
      task: 'Read EVERY part of the Next.js codebase and produce a complete, exhaustive inventory that downstream phases depend on. Do not guess — open the files.',
      context: args,
      instructions: [
        'Enumerate every file under pages/, components/, lib/, sanity/, styles/, content/, scripts/, public/.',
        'For each route in pages/: record data-fetching (getStaticProps/getStaticPaths/getServerSideProps), Sanity GROQ queries used, props shape, and the components it renders.',
        'For each component: classify as STATIC (-> .astro) vs INTERACTIVE (-> React island) and record the interactivity (state, effects, event handlers, browser APIs, styled-components usage, AOS, react-tabs, accordion, countup, masonry, video).',
        'Inventory the Sanity block-renderer (components/Blocks.js) and every block schema in sanity/schemas/blocks/.',
        'Inventory ALL third-party scripts and where they load (Iubenda, GTM/GA, Kore.ai chatbot, RB2B/leadsy, HubSpot, reCAPTCHA, LinkedIn) and the CSP allowances in next.config.js.',
        'Inventory styling: styled-components usages, SCSS files, bootstrap.min.css, boxicons, flaticon, switzer, global vs scoped.',
        'Record dead/unused code candidates (e.g. next-auth in deps with no usage) WITHOUT removing them.',
        'Map next.config.js: image config, headers/CSP, redirects, output mode, sitemap config.',
        'Produce a dependency graph and a risk register (highest-risk migration items first).',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: {
      type: 'object',
      required: ['componentCount', 'routes', 'components', 'scripts', 'styling', 'risks', 'artifacts'],
      properties: {
        componentCount: { type: 'number' },
        routes: { type: 'array', items: { type: 'object' } },
        components: { type: 'array', items: { type: 'object' } },
        scripts: { type: 'array', items: { type: 'object' } },
        styling: { type: 'object' },
        deadCodeCandidates: { type: 'array', items: { type: 'string' } },
        risks: { type: 'array', items: { type: 'object' } },
        artifacts: { type: 'array' },
      },
    },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['inventory', 'analysis'],
}));

export const contextDocsTask = defineTask('context-docs', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Phase 0: Write root MIGRATION_CONTEXT.md + per-section docs',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Migration documentation lead',
      task: 'Create the root context file and one detailed context document per page and per foundation section, so the migration can be updated section-by-section.',
      context: args,
      instructions: [
        'Write MIGRATION_CONTEXT.md at repo root: project overview, target architecture (Astro hybrid islands, static SSG + Docker/nginx), conventions, and a LINKED INDEX to every per-section doc under docs/migration/.',
        'For each route, write docs/migration/<slug>.md containing: current Next implementation summary, Sanity queries, components used + island/static classification, styling notes, third-party scripts on the page, the Astro target design, parity checklist, and status field (pending/in-progress/done).',
        'For each foundation unit, write docs/migration/_foundation-<unit>.md with the same structure.',
        'Cross-link every section doc back to the root and to its dependencies. Keep each doc self-contained so a future session can pick up one section without reading the whole repo.',
        'Actually create the files on disk; return the list of paths written.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: { type: 'object', required: ['rootDoc', 'sectionDocs', 'artifacts'], properties: { rootDoc: { type: 'string' }, sectionDocs: { type: 'array', items: { type: 'string' } }, artifacts: { type: 'array' } } },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['docs', 'context'],
}));

export const captureBaselineTask = defineTask('capture-baseline', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Phase 0: Capture parity baseline from current Next build',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'QA / migration testing strategist',
      task: 'Capture the parity oracle from the CURRENT Next.js build: this is the source of truth every migrated page is compared against.',
      context: args,
      instructions: [
        'Run `pnpm build` on the existing Next app and record success + build output.',
        'Run `pnpm test:e2e` (Playwright, 22 tests) and record pass/fail counts.',
        'Capture full-page screenshots for every route at desktop + mobile viewports into a baseline/ artifact dir (add a Playwright screenshot spec if one does not already exist).',
        'Run `pnpm lhci` (or lighthouse) and record per-route scores (perf/a11y/best-practices/seo).',
        'Snapshot the generated sitemap and the next.config.js redirects + CSP header string for later parity checks.',
        'Return counts + paths; do NOT modify app code. Use shell tools you actually execute.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: { type: 'object', required: ['e2ePassed', 'e2eTotal', 'screenshotCount', 'lighthouseSummary', 'artifacts'], properties: { e2ePassed: { type: 'number' }, e2eTotal: { type: 'number' }, screenshotCount: { type: 'number' }, lighthouseSummary: { type: 'string' }, sitemapSnapshot: { type: 'string' }, artifacts: { type: 'array' } } },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['baseline', 'testing'],
}));

export const migrationPlanTask = defineTask('migration-plan', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Phase 1: Detailed migration plan document',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Astro migration architect',
      task: 'Produce the detailed, build-ready migration plan document (docs/migration/PLAN.md) covering every decision the implementation phases need.',
      context: args,
      instructions: [
        'Map each Next route to its Astro route file (src/pages/**), getStaticPaths source, and layout.',
        'Define the styling strategy: scoped CSS in .astro for static markup; styled-components confined to React islands only; how legacy global CSS (bootstrap/boxicons/flaticon/switzer/style.scss/responsive.scss) is imported once in the base layout.',
        'Define the islands strategy: which components become React islands, with client directives (client:load/idle/visible) per interactivity need (chatbot=idle, countup/tabs=visible, forms=load).',
        'Define the Sanity strategy: @sanity/client fetched in Astro frontmatter at build time, reusing existing GROQ; image handling via @sanity/image-url + astro:assets where applicable.',
        'Define the third-party scripts strategy in the base layout, preserving current load/defer behavior and CSP.',
        'Define SEO parity: <head> meta/OG/JSON-LD, @astrojs/sitemap config to match next-sitemap output, and the redirects parity plan.',
        'Define headersStrategy: move next.config CSP + security headers into an nginx.conf served in Docker (static output).',
        'List the improvement backlog (e.g. remove unused next-auth, dedupe Bootstrap, a11y, perf) as DEFERRED items — NOT applied during parity phase.',
        'Honor any reviewer feedback in args.feedback. Write PLAN.md to disk and return a summary.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: { type: 'object', required: ['routeMap', 'stylingStrategy', 'scriptsStrategy', 'headersStrategy', 'estimatedEffort', 'backlogCount', 'artifacts'], properties: { routeMap: { type: 'array', items: { type: 'object' } }, stylingStrategy: { type: 'string' }, scriptsStrategy: { type: 'string' }, headersStrategy: { type: 'string' }, seoStrategy: { type: 'string' }, estimatedEffort: { type: 'string' }, backlogCount: { type: 'number' }, artifacts: { type: 'array' } } },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['planning'],
}));

export const scaffoldAstroTask = defineTask('scaffold-astro', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Phase 2: Scaffold Astro app in subdir',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Astro engineer',
      task: 'Scaffold a new Astro app in the astro/ subdirectory without touching the Next app at repo root.',
      context: args,
      instructions: [
        'Init Astro in astro/ with output: "static". Add integrations: @astrojs/react, @astrojs/sitemap. Configure astro:assets.',
        'Install @sanity/client + @sanity/image-url in astro/ (pnpm). Recreate the Sanity client from lib/sanity.js as build-time fetch.',
        'Create the base Layout.astro importing global CSS (bootstrap/boxicons/flaticon/switzer/style+responsive scss compiled) once.',
        'Wire all third-party scripts into the base layout per the plan, preserving defer/lazy behavior.',
        'Add astro.config sitemap to match next-sitemap; add a redirects map mirroring next.config.js redirects.',
        'Author nginx.conf carrying the security headers + CSP from next.config.js (do not wire Docker yet — that is cutover).',
        'Keep everything JS/JSX (no TypeScript conversion). Return the file list.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: { type: 'object', required: ['files', 'artifacts'], properties: { files: { type: 'array', items: { type: 'string' } }, artifacts: { type: 'array' } } },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['scaffold'],
}));

export const portFoundationUnitTask = defineTask('port-foundation-unit', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Phase 3: Port a shared foundation unit',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Astro/React engineer',
      task: 'Port one shared foundation unit (used by all pages) to the Astro app, matching current behavior exactly.',
      context: args,
      instructions: [
        'Implement the unit named in args.unit inside astro/ per the plan (static -> .astro, interactive -> React island).',
        'Reuse existing markup/classes so the legacy CSS continues to apply; keep styled-components only if the unit is an island.',
        'Run `pnpm --dir astro build` and report build status.',
        'Honor args.feedback on retries. Update the matching docs/migration/_foundation-<unit>.md status. Return notes + buildOk + artifacts.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: { type: 'object', required: ['buildOk', 'artifacts'], properties: { buildOk: { type: 'boolean' }, notes: { type: 'string' }, artifacts: { type: 'array' } } },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['foundation', 'port'],
}));

export const convertPageTask = defineTask('convert-page', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Phase 4: Convert one route to Astro',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Astro migration engineer',
      task: 'Convert a single Next.js route to an Astro route with hybrid islands, achieving 1:1 parity.',
      context: args,
      instructions: [
        'Create the Astro route file under astro/src/pages matching args.page.route, including getStaticPaths for dynamic routes using the SAME Sanity GROQ as the Next page.',
        'Convert static markup to .astro; keep listed interactive pieces as React islands with the right client directive.',
        'Preserve SEO head (meta/OG/JSON-LD), data props, and visual structure exactly.',
        'Update the per-page context doc docs/migration/<slug>.md status to in-progress/done with what was converted.',
        'Honor args.feedback on retries. Do NOT remove any Next code (cutover handles that). Return artifacts + the route string.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: { type: 'object', required: ['route', 'artifacts'], properties: { route: { type: 'string' }, islandsCreated: { type: 'array', items: { type: 'string' } }, artifacts: { type: 'array' } } },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['page', 'convert'],
}));

export const shellBuildTask = defineTask('astro-build', (args, taskCtx) => ({
  kind: 'shell',
  title: `Build: ${args.label || 'astro build'}`,
  shell: {
    command: 'pnpm',
    args: ['--dir', args.astroDir || 'astro', 'build'],
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json`, stdoutPath: `tasks/${taskCtx.effectId}/stdout.txt`, stderrPath: `tasks/${taskCtx.effectId}/stderr.txt` },
  labels: ['build', 'shell'],
}));

export const verifyParityTask = defineTask('verify-parity', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Phase 4: Verify per-page parity (e2e + screenshot diff + LH)',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'QA automation engineer',
      task: 'Prove parity for one migrated route against the captured baseline.',
      context: args,
      instructions: [
        'Serve the built Astro app and run the Playwright e2e tests relevant to this route; record pass/fail.',
        'Capture the same screenshots (desktop+mobile) and pixel-diff against the baseline; record maxDiffRatio.',
        'Run Lighthouse for this route and compute the delta vs baseline (must be >= lighthouseMinDelta).',
        'Return e2ePassed/e2eTotal, maxDiffRatio, lighthouseDelta, and artifact paths (diff images). Execute the tools for real.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: { type: 'object', required: ['e2ePassed', 'e2eTotal', 'maxDiffRatio', 'lighthouseDelta', 'artifacts'], properties: { e2ePassed: { type: 'number' }, e2eTotal: { type: 'number' }, maxDiffRatio: { type: 'number' }, lighthouseDelta: { type: 'number' }, artifacts: { type: 'array' } } },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['verify', 'parity'],
}));

export const regressionReviewTask = defineTask('regression-review', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Phase 4: Adversarial regression review',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Regression detector (adversarial)',
      task: 'Try to find any behavioral or visual regression the automated thresholds might have missed for this route.',
      context: args,
      instructions: [
        'Inspect the screenshot diffs, e2e results, and Lighthouse deltas critically.',
        'Check SEO head parity, JSON-LD, links, forms, and any interactive island behavior.',
        'Default to verdict "fail" if uncertain. Return verdict (pass/fail), route, and a list of concrete issues.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: { type: 'object', required: ['verdict', 'route', 'issues'], properties: { verdict: { type: 'string' }, route: { type: 'string' }, issues: { type: 'array', items: { type: 'string' } } } },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['verify', 'regression'],
}));

export const fullIntegrationTask = defineTask('full-integration', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Phase 5/6: Full-site regression',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Post-migration validator',
      task: 'Run the full regression suite across the whole Astro site and verify cross-cutting parity.',
      context: args,
      instructions: [
        'Full `pnpm --dir <astroDir> build`, full Playwright e2e (all 22), full Lighthouse.',
        'Verify sitemap parity vs the Next baseline snapshot, redirects parity, and that nginx CSP/security headers match next.config.js.',
        'Crawl internal links for 404s/broken links. Return counts + flags + artifacts. Execute for real.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: { type: 'object', required: ['e2ePassed', 'e2eTotal', 'sitemapParity', 'redirectsParity', 'headersOk', 'brokenLinks', 'lighthouseSummary', 'artifacts'], properties: { e2ePassed: { type: 'number' }, e2eTotal: { type: 'number' }, sitemapParity: { type: 'boolean' }, redirectsParity: { type: 'boolean' }, headersOk: { type: 'boolean' }, brokenLinks: { type: 'number' }, lighthouseSummary: { type: 'string' }, artifacts: { type: 'array' } } },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['integration', 'validation'],
}));

export const cutoverTask = defineTask('cutover', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Phase 6: Cutover swap + Next removal',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Cutover coordinator',
      task: 'Swap the Astro app to repo root and decommission Next.js safely with a revert path.',
      context: args,
      instructions: [
        'Create a git tag/branch (e.g. pre-astro-cutover) as the revert ref BEFORE any destructive change.',
        'Move astro/ contents to repo root; remove Next.js (pages/, next.config.js, next-sitemap.config.js) and Next-only deps from package.json.',
        'Rewrite Dockerfile to build the static Astro output and serve /dist via nginx using the authored nginx.conf (CSP/security headers).',
        'Update README and PROJECT.md. Run a Docker/nginx build smoke check. Return revertRef + dockerOk + artifacts.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: { type: 'object', required: ['revertRef', 'dockerOk', 'artifacts'], properties: { revertRef: { type: 'string' }, dockerOk: { type: 'boolean' }, artifacts: { type: 'array' } } },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['cutover'],
}));

export const backlogProposalTask = defineTask('backlog-proposal', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Phase 7: Improvement backlog proposal',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Tech-debt auditor',
      task: 'Compile the deferred improvement backlog discovered during migration into an actionable, prioritized list.',
      context: args,
      instructions: [
        'Include: remove unused next-auth, dedupe/trim Bootstrap + legacy CSS, accessibility fixes, perf (image/script), TypeScript adoption.',
        'For each item: risk, effort, expected benefit, and whether it can be parity-verified. Return items[] + summary. Do NOT apply anything.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: { type: 'object', required: ['items', 'summary'], properties: { items: { type: 'array', items: { type: 'object' } }, summary: { type: 'string' } } },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['backlog'],
}));

export const applyBacklogTask = defineTask('apply-backlog', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Phase 7: Apply selected backlog items',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Improvement implementer',
      task: 'Apply ONLY the user-selected backlog items, each verified against the parity oracle.',
      context: args,
      instructions: [
        'Implement only items matching args.selection. After each, run the relevant parity checks (e2e + screenshot + LH).',
        'Roll back any item that breaks parity. Return applied[] + deferred[] + artifacts.',
      ],
      outputFormat: 'JSON',
    },
    outputSchema: { type: 'object', required: ['applied', 'artifacts'], properties: { applied: { type: 'array' }, deferred: { type: 'array' }, artifacts: { type: 'array' } } },
  },
  io: { inputJsonPath: `tasks/${taskCtx.effectId}/input.json`, outputJsonPath: `tasks/${taskCtx.effectId}/result.json` },
  labels: ['backlog', 'apply'],
}));

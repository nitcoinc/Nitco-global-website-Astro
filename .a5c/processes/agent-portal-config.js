/**
 * @process agent-portal-config
 * @description AI Agent Command Center — YAML-driven config + path-based URL routing
 * Two deliverables:
 *   1. src/content/agents.yaml — single source of truth for agent cards
 *   2. URL rewrite from ?agent=dqa&view=app → /ai-agent-command-center/dqa via history.pushState
 * @inputs { projectRoot: string }
 * @outputs { success: boolean, filesChanged: string[] }
 */

import { defineTask } from '@a5c-ai/babysitter-sdk';

export async function process(inputs, ctx) {
  const { projectRoot } = inputs;

  ctx.log('info', 'Starting: AI Agent Portal config refactor');

  // ─── PHASE 1: Create agents.yaml ─────────────────────────────────────────

  ctx.log('info', 'Phase 1: Create src/content/agents.yaml');

  const yamlResult = await ctx.task(createAgentsYamlTask, { projectRoot });

  // ─── PHASE 2: Update Astro page ──────────────────────────────────────────

  ctx.log('info', 'Phase 2: Update Astro page to read YAML + pass agents as props');

  const astroResult = await ctx.task(updateAstroPageTask, {
    projectRoot,
    yamlPath: yamlResult.yamlPath,
  });

  // ─── PHASE 3: Update React island ────────────────────────────────────────

  ctx.log('info', 'Phase 3: Update AICommandCenter.jsx — accept props, path-based URL');

  const islandResult = await ctx.task(updateIslandTask, { projectRoot });

  // ─── PHASE 4: Build verification ─────────────────────────────────────────

  ctx.log('info', 'Phase 4: Run pnpm build to verify no errors');

  const buildResult = await ctx.task(verifyBuildTask, { projectRoot });

  // ─── BREAKPOINT: User review ─────────────────────────────────────────────

  const approval = await ctx.breakpoint({
    question: [
      'Changes complete. Summary:',
      `  • Created: ${yamlResult.yamlPath}`,
      `  • Updated: ${astroResult.fileChanged}`,
      `  • Updated: ${islandResult.fileChanged}`,
      `  • Build: ${buildResult.status}`,
      '',
      'Approve and finish?',
    ].join('\n'),
    options: ['Approve', 'Request changes'],
    expert: 'owner',
    tags: ['review'],
  });

  if (!approval.approved) {
    ctx.log('warn', `User requested changes: ${approval.response}`);
    return { success: false, feedback: approval.response };
  }

  return {
    success: true,
    filesChanged: [yamlResult.yamlPath, astroResult.fileChanged, islandResult.fileChanged],
  };
}

// ── Task: Create agents.yaml ──────────────────────────────────────────────────

const createAgentsYamlTask = defineTask('create-agents-yaml', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Create src/content/agents.yaml',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior frontend engineer',
      task: 'Create src/content/agents.yaml in the Astro project',
      context: {
        projectRoot: args.projectRoot,
        currentAgentsSource: 'src/islands/AICommandCenter.jsx lines 39-70',
        existingAgents: [
          {
            icon: 'shieldCheck',
            category: 'Decision-Ready Data',
            title: 'Data Quality Monitoring',
            slug: 'dqa',
            description: 'An agent for governed data quality scoring, trends, and root-cause insights.',
            trackingKey: 'dqa',
            appUrl: 'https://dqa-agent.nitcoinc.com/',
            videoUrl: 'https://player.vimeo.com/video/1157300947?autoplay=1&muted=1',
          },
          {
            icon: 'messageSquare',
            category: 'Decision-Ready Data',
            title: 'Ask Your Data',
            slug: 'ask-your-data',
            description: 'Natural language data exploration — SQL generation, visualizations, query logic.',
            trackingKey: 'ayd',
            appUrl: 'https://ayd-agent.nitcoinc.com/',
            videoUrl: 'https://player.vimeo.com/video/1172175850?autoplay=1&muted=1',
          },
          {
            icon: 'fileText',
            category: 'Working Capital & Spend Integrity',
            title: 'Intelligent Document Mapping Agent',
            slug: 'document-mapping',
            description: 'Extracts, maps, and standardizes data from documents to streamline workflows.',
            trackingKey: 'dma',
            appUrl: 'https://dma-ops.nitcoinc.ai/',
            videoUrl: 'https://player.vimeo.com/video/1180817877?h=5ce79c97a0&autoplay=1&muted=1',
          },
        ],
      },
      instructions: [
        'Create the directory src/content/ inside projectRoot if it does not exist',
        'Write src/content/agents.yaml with ALL three agents above',
        'Use clean YAML list format — each agent is a list item with fields: icon, category, title, slug, description, trackingKey, appUrl, videoUrl',
        'Add a comment block at the top of the file explaining the fields and how to add a new agent',
        'DO NOT modify any other file',
        'Return the exact file path written',
      ],
      outputFormat: 'JSON with fields: yamlPath (string), content (first 10 lines preview)',
    },
    outputSchema: {
      type: 'object',
      required: ['yamlPath'],
      properties: {
        yamlPath: { type: 'string' },
        content: { type: 'string' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

// ── Task: Update Astro page ───────────────────────────────────────────────────

const updateAstroPageTask = defineTask('update-astro-page', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Update ai-agent-command-center.astro to read YAML',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior Astro/frontend engineer',
      task: 'Update src/pages/ai-agent-command-center.astro to read agents from YAML and pass as props',
      context: {
        projectRoot: args.projectRoot,
        currentAstroPage: 'src/pages/ai-agent-command-center.astro',
        currentContent: `---\nimport BaseLayout from '../layouts/BaseLayout.astro';\nimport AICommandCenter from '../islands/AICommandCenter.jsx';\nimport { getSeoForPath } from '../lib/fetchSeoData.js';\nconst seo = getSeoForPath('/ai-agent-command-center');\n---\n<BaseLayout seo={seo} path="/ai-agent-command-center">\n  <AICommandCenter client:load />\n</BaseLayout>`,
        yamlPath: args.yamlPath,
      },
      instructions: [
        'Read src/content/agents.yaml using Astro\'s fs utilities or js-yaml',
        'Check if js-yaml is available in package.json; if not, use a simple YAML parse approach or import the YAML directly using Astro\'s built-in YAML support (Astro supports import of .yaml files natively)',
        'Pass the parsed agents array as a prop to AICommandCenter: <AICommandCenter agents={agents} client:load />',
        'Keep all other existing imports and logic unchanged',
        'Write the updated file',
        'Return the exact file path changed',
      ],
      outputFormat: 'JSON with fields: fileChanged (string), approach (string describing how YAML was read)',
    },
    outputSchema: {
      type: 'object',
      required: ['fileChanged'],
      properties: {
        fileChanged: { type: 'string' },
        approach: { type: 'string' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

// ── Task: Update React island ─────────────────────────────────────────────────

const updateIslandTask = defineTask('update-island', (args, taskCtx) => ({
  kind: 'agent',
  title: 'Update AICommandCenter.jsx — props + path URL',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Senior React/frontend engineer',
      task: 'Refactor AICommandCenter.jsx: accept agents as prop, use path-based URL instead of query params',
      context: {
        projectRoot: args.projectRoot,
        file: 'src/islands/AICommandCenter.jsx',
        change1: {
          what: 'Accept agents prop instead of hardcoded ALL_AGENTS array',
          how: 'Change function signature to: export default function AICommandCenter({ agents = [] }), remove the ALL_AGENTS const entirely, use agents prop in the JSX render',
        },
        change2: {
          what: 'Replace query-param URL tracking with path-based URL',
          currentBehavior: 'updateModalTrackingUrl pushes ?agent=dqa&view=app to URL',
          newBehavior: 'pushState to /ai-agent-command-center/{agentSlug} on open, back to /ai-agent-command-center on close',
          analyticsEvents: 'Keep GTM virtual_pageview and agent_modal_open/close events but update page_path to use /ai-agent-command-center/{slug}',
        },
        currentTrackingCode: `
  const updateModalTrackingUrl = (agentKey, viewType) => {
    const url = new URL(window.location.href);
    url.searchParams.set("agent", agentKey);
    url.searchParams.set("view", viewType);
    window.history.pushState({ agent: agentKey, view: viewType }, "", url.toString());
    pushTrackingEvent("virtual_pageview", { page_path: url.pathname + url.search, ... });
    pushTrackingEvent("agent_modal_open", { agent: agentKey, view: viewType, url: url.toString() });
  };`,
        newTrackingCode: `
  const updateModalTrackingUrl = (agentSlug) => {
    const newPath = "/ai-agent-command-center/" + agentSlug;
    window.history.pushState({ agentSlug }, "", newPath);
    pushTrackingEvent("virtual_pageview", { page_path: newPath, page_location: window.location.origin + newPath });
    pushTrackingEvent("agent_modal_open", { agent: agentSlug, url: window.location.origin + newPath });
  };
  const clearModalTrackingUrl = () => {
    const basePath = "/ai-agent-command-center";
    window.history.replaceState({}, "", basePath);
    pushTrackingEvent("virtual_pageview", { page_path: basePath, page_location: window.location.origin + basePath });
    pushTrackingEvent("agent_modal_close", { url: window.location.origin + basePath });
  };`,
      },
      instructions: [
        'Read src/islands/AICommandCenter.jsx fully before making any changes',
        'Make ONLY the two changes described above — do not refactor anything else',
        'For change 1: remove ALL_AGENTS const (lines 39-70), change function signature to accept { agents = [] } prop, update the JSX to use agents instead of ALL_AGENTS',
        'For change 2: update updateModalTrackingUrl to take agentSlug only (not agentKey + viewType), use new path-based pushState logic as shown above',
        'Update all callers of openAgentModal/updateModalTrackingUrl accordingly — the slug to use is agent.slug from the agents array',
        'DO NOT change any other logic, styles, or structure',
        'Write the updated file',
        'Return the exact file path changed',
      ],
      outputFormat: 'JSON with fields: fileChanged (string), changesSummary (string)',
    },
    outputSchema: {
      type: 'object',
      required: ['fileChanged'],
      properties: {
        fileChanged: { type: 'string' },
        changesSummary: { type: 'string' },
      },
    },
  },
  io: {
    inputJsonPath: `tasks/${taskCtx.effectId}/input.json`,
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

// ── Task: Verify build ────────────────────────────────────────────────────────

const verifyBuildTask = defineTask('verify-build', (args, taskCtx) => ({
  kind: 'shell',
  title: 'pnpm build',
  command: `cd ${args.projectRoot} && pnpm build 2>&1 | tail -30`,
  io: {
    outputJsonPath: `tasks/${taskCtx.effectId}/output.json`,
  },
}));

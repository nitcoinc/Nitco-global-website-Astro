/**
 * @process create-deploy-doc
 * @description Create DEPLOYMENT.md with full Cloudflare Pages + Sanity instructions.
 * @inputs {}
 * @outputs { created: boolean, filePath: string }
 */

import { defineTask } from '@a5c-ai/babysitter-sdk';

const ROOT = '/home/pmandapati/Desktop/agent-projects/Nitco_global_website';

const createDocTask = defineTask('create-deploy-doc', (_, taskCtx) => ({
  kind: 'agent',
  title: 'Write DEPLOYMENT.md',
  agent: {
    name: 'general-purpose',
    prompt: {
      role: 'Technical writer',
      task: 'Create a comprehensive DEPLOYMENT.md file at the project root with all Cloudflare Pages and Sanity deployment instructions.',
      context: {
        projectRoot: ROOT,
        stack: 'Astro 6 static site (output: static), pnpm, Node 22, nginx Docker for staging, Cloudflare Pages for production.',
        sanityProjectId: 't8ctf4dg',
        sanityDataset: 'production',
        cfBuildCmd: 'pnpm run build',
        cfOutputDir: 'dist',
        nodeVersion: '22',
        configFilesCreated: [
          'public/_headers — CF Pages security headers (X-Content-Type, X-Frame, Referrer, Permissions, full CSP, 1yr cache for assets)',
          'public/_redirects — placeholder, no redirects currently',
          '.nvmrc — Node 22',
        ],
        envVars: [
          { name: 'PUBLIC_SANITY_PROJECT_ID', example: 't8ctf4dg', required: true, note: 'Sanity project ID' },
          { name: 'PUBLIC_SANITY_DATASET', example: 'production', required: true, note: 'Sanity dataset name' },
          { name: 'PUBLIC_GTM_ID', example: 'GTM-K6CXJBJN', required: true, note: 'Google Tag Manager container ID' },
          { name: 'PUBLIC_IUBENDA_SITE_ID', example: '2053600', required: true, note: 'Iubenda consent site ID' },
          { name: 'PUBLIC_IUBENDA_COOKIE_POLICY_ID', example: '12542728', required: true, note: 'Iubenda cookie policy ID' },
          { name: 'PUBLIC_LEADSY_PID', example: '', required: false, note: 'Leadsy tracking pixel ID' },
          { name: 'PUBLIC_RB2B_KEY', example: '', required: false, note: 'RB2B pixel key' },
          { name: 'PUBLIC_SCRIPTINTEL_TAG_URL', example: '', required: false, note: 'ScriptIntel tag script URL (contains API key)' },
          { name: 'PUBLIC_KORE_API_KEY', example: '', required: false, note: 'Kore.ai chatbot API key' },
        ],
        sanityTokenNote: 'SANITY_TOKEN is NOT required — the site uses useCdn: true for public content reads. Only add SANITY_TOKEN if you need to query draft/private content.',
        webhookSteps: [
          '1. In CF Pages dashboard → Settings → Builds & Deployments → Add deploy hook → name it "Sanity publish" → copy the generated URL.',
          '2. Go to manage.sanity.io → your project → API → Webhooks → Add webhook.',
          '3. Set: Name = "CF Pages rebuild", URL = (paste deploy hook URL), Dataset = production, Trigger on = Document published.',
          '4. Test: publish a document in Sanity Studio — CF Pages should trigger a build within ~30 seconds.',
        ],
        stagingNote: 'Docker/nginx is used for staging. See Dockerfile (nginx:alpine, serves dist/) and nginx.conf (same security headers as _headers, plus gzip). Run: docker build -t nitco-web . && docker run -p 8080:80 nitco-web',
        gitIntegrationNote: 'CF Pages is connected via git integration. Every push to main triggers an automatic build and deploy. No manual wrangler commands needed.',
        localDevNote: 'pnpm dev — starts Astro dev server on :4321. pnpm build — builds to dist/. pnpm preview — serves dist/ locally.',
        troubleshootingNotes: [
          'Build fails with "projectId is undefined": ensure PUBLIC_SANITY_PROJECT_ID is set in CF Pages env vars.',
          'Sanity images not loading: check cdn.sanity.io is in CSP img-src (it is by default in _headers).',
          'Content not updating after publish: verify the Sanity webhook is configured and pointing to the correct CF Pages deploy hook URL.',
          'SANITY_TOKEN should be left empty unless querying draft content — it is NOT needed for public CDN reads.',
          '404 pages: Astro emits dist/404.html which nginx and CF Pages both serve automatically.',
        ],
      },
      instructions: [
        'Create a DEPLOYMENT.md file at the project root with the following structure:',
        '',
        '# Deployment Guide',
        '',
        'Brief intro: Astro 6 static site. Production = Cloudflare Pages (git integration). Staging = Docker/nginx.',
        '',
        '## Quick-start checklist',
        'Numbered checklist of steps to go from zero to live on CF Pages.',
        '',
        '## Cloudflare Pages',
        '',
        '### Dashboard build settings',
        'Table with all settings (framework preset, build command, output dir, node version, root dir).',
        '',
        '### Environment variables',
        'Table with all env vars: name, example value, required/optional, description.',
        'Include a callout note that SANITY_TOKEN is NOT required.',
        '',
        '### Config files (auto-deployed)',
        'Explain that public/_headers, public/_redirects, .nvmrc are committed to the repo and automatically picked up.',
        'Brief description of what _headers contains.',
        '',
        '### Git integration',
        'One paragraph on how CF Pages auto-builds on push to main.',
        '',
        '## Sanity CMS',
        '',
        '### Project details',
        'Project ID, dataset, Studio host (nitco-global.sanity.studio).',
        '',
        '### Auto-rebuild on content publish (webhook)',
        'Step-by-step webhook setup.',
        '',
        '### Notes on authentication',
        'Explain useCdn: true, why SANITY_TOKEN is not needed for public content, when it would be needed.',
        '',
        '## Staging (Docker)',
        'How to build and run Docker image locally. Note about nginx.conf having same security headers as CF Pages _headers.',
        '',
        '## Local development',
        'pnpm dev, pnpm build, pnpm preview commands.',
        '',
        '## Troubleshooting',
        'Bullet list of common issues and fixes.',
        '',
        'Write the file to /home/pmandapati/Desktop/agent-projects/Nitco_global_website/DEPLOYMENT.md',
        'Make it clean, professional, and complete. Use tables, code blocks, and callouts where appropriate.',
        'Return summary.',
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

export async function process(inputs, ctx) {
  const _ = inputs || {};
  ctx.log('info', 'Creating DEPLOYMENT.md');
  const result = await ctx.task(createDocTask, {});
  ctx.log('info', `Created: ${result.filePath}`);
  return { created: result.created, filePath: result.filePath };
}

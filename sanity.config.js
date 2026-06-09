import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas/index.js'

export default defineConfig({
  name: 'nitco-global',
  title: 'Nitco Global',
  // Studio uses process.env (NEXT_PUBLIC_SANITY_PROJECT_ID); Astro website uses PUBLIC_SANITY_PROJECT_ID (no NEXT_ prefix)
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 't8ctf4dg',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})

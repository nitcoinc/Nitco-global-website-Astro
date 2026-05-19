import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { markdownToPortableText } from '@portabletext/markdown'
import { createClient } from '@sanity/client'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

function stableKey(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0
  }
  return Math.abs(hash).toString(36).padStart(6, '0')
}

function derivePostType(pageType) {
  if (pageType === 'case-studies') return 'caseStudy'
  if (pageType === 'webinar') return 'webinar'
  return 'blog'
}

function mdxToPortableText(mdxBody) {
  if (!mdxBody || mdxBody.trim() === '') return []
  try {
    return markdownToPortableText(mdxBody)
  } catch {
    return []
  }
}

async function migratePosts() {
  const dir = path.join(ROOT, 'content/allPosts')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  const docs = []
  const errors = []
  for (const filename of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data: fm, content } = matter(raw)
      docs.push({
        _type: 'post',
        _id: `post-${fm.slug}`,
        slug: { _type: 'slug', current: fm.slug },
        postType: derivePostType(fm.pageType),
        title: fm.title || '',
        image: fm.image || '',
        publishedAt: fm.date || null,
        body: mdxToPortableText(content),
      })
    } catch (err) {
      errors.push({ filename, error: err.message })
    }
  }
  if (errors.length > 0) {
    console.warn(`  Skipped ${errors.length} files with errors:`)
    errors.forEach(({ filename, error }) => console.warn(`    - ${filename}: ${error}`))
  }
  console.log(`Migrating ${docs.length} posts...`)
  for (let i = 0; i < docs.length; i += 100) {
    const batch = docs.slice(i, i + 100)
    const tx = client.transaction()
    batch.forEach((doc) => tx.createOrReplace(doc))
    await tx.commit()
    console.log(`  committed batch ${Math.floor(i / 100) + 1}`)
  }
  console.log(`Done: ${docs.length} posts`)
}

async function migrateWhitepapers() {
  const dir = path.join(ROOT, 'content/whitepaperspost')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  const docs = []
  const errors = []
  for (const filename of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data: fm, content } = matter(raw)
      const rawSlug = fm.slug || ''
      const safeSlug = decodeURIComponent(rawSlug).toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
      docs.push({
        _type: 'whitepaper',
        _id: `whitepaper-${safeSlug}`,
        slug: { _type: 'slug', current: safeSlug },
        title: fm.title || '',
        image: fm.image || '',
        pdfFileUrl: fm.pdfFileUrl || null,
        body: mdxToPortableText(content),
      })
    } catch (err) {
      errors.push({ filename, error: err.message })
    }
  }
  if (errors.length > 0) {
    console.warn(`  Skipped ${errors.length} files with errors:`)
    errors.forEach(({ filename, error }) => console.warn(`    - ${filename}: ${error}`))
  }
  console.log(`Migrating ${docs.length} whitepapers...`)
  for (let i = 0; i < docs.length; i += 100) {
    const batch = docs.slice(i, i + 100)
    const tx = client.transaction()
    batch.forEach((doc) => tx.createOrReplace(doc))
    await tx.commit()
    console.log(`  committed batch ${Math.floor(i / 100) + 1}`)
  }
  console.log(`Done: ${docs.length} whitepapers`)
}

async function migratePages() {
  const dir = path.join(ROOT, 'content/pages')
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'))
  const BLOCK_TYPE_MAP = {
    blogBlock: 'blogBlock',
    CaseStudiesBlock: 'caseStudiesBlock',
    whitePapersBlock: 'whitePapersBlock',
    webinarBlock: 'webinarBlock',
    buttonBlock: 'buttonBlock',
    RightVideoBlock: 'rightVideoBlock',
    LeftVideoBlock: 'leftVideoBlock',
    policydefinitionsBlock: 'policyBlock',
    CookieTypesBlock: 'cookieBlock',
    Pagebannerblock: 'pageBannerBlock',
  }

  const docs = []
  const errors = []
  for (const filename of files) {
    try {
      const raw = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data: fm } = matter(raw)
      const rawBlocks = fm.blocks || []
      const blocks = rawBlocks.map((b, blockIndex) => {
        const tinaType = b._template
        const sanityType = BLOCK_TYPE_MAP[tinaType] || tinaType
        const block = { _type: sanityType, _key: stableKey(b._template + (fm.slug || '') + blockIndex) }

        if (sanityType === 'buttonBlock' && b.buttonList) {
          block.buttonList = (b.buttonList || []).map((btn, btnIndex) => ({
            _key: stableKey((btn.name || '') + (btn.url || '') + btnIndex),
            name: btn.name,
            url: btn.url,
          }))
        }
        if (sanityType === 'rightVideoBlock') {
          block.tagline_R_V = b.tagline_R_V || ''
          block.text_R_V = b.text_R_V || ''
          block.video_R_V = b.video_R_V || ''
          block.url_R_V = b.url_R_V || ''
        }
        if (sanityType === 'leftVideoBlock') {
          block.tagline_L_V = b.tagline_L_V || ''
          block.text_L_V = b.text_L_V || ''
          block.video_L_V = b.video_L_V || ''
        }
        if (sanityType === 'policyBlock' || sanityType === 'cookieBlock') {
          block.mainheading = b.mainheading || ''
          block.lastupdated = b.lastupdated || null
          block.body = mdxToPortableText(b.body || '')
        }
        return block
      })
      docs.push({
        _type: 'page',
        _id: `page-${fm.slug}`,
        slug: { _type: 'slug', current: fm.slug },
        pageType: fm.pageType || '',
        blocks,
      })
    } catch (err) {
      errors.push({ filename, error: err.message })
    }
  }
  if (errors.length > 0) {
    console.warn(`  Skipped ${errors.length} files with errors:`)
    errors.forEach(({ filename, error }) => console.warn(`    - ${filename}: ${error}`))
  }
  console.log(`Migrating ${docs.length} pages...`)
  for (let i = 0; i < docs.length; i += 100) {
    const batch = docs.slice(i, i + 100)
    const tx = client.transaction()
    batch.forEach((doc) => tx.createOrReplace(doc))
    await tx.commit()
    console.log(`  committed batch ${Math.floor(i / 100) + 1}`)
  }
  console.log(`Done: ${docs.length} pages`)
}

async function migrateNavbar() {
  const file = path.join(ROOT, 'content/singleDocumentCollections/NavBar.mdx')
  const raw = fs.readFileSync(file, 'utf8')
  const { data: fm } = matter(raw)
  await client.createOrReplace({
    _type: 'navbar',
    _id: 'navbar-singleton',
    navbarImage: fm.navbarImage || '',
  })
  console.log('Done: navbar')
}

async function main() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
    process.exit(1)
  }
  if (!process.env.SANITY_TOKEN) {
    console.error('Missing SANITY_TOKEN')
    process.exit(1)
  }
  await migratePosts()
  await migrateWhitepapers()
  await migratePages()
  await migrateNavbar()
  console.log('\nMigration complete.')
}

main().catch((err) => { console.error(err); process.exit(1) })

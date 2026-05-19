import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { createClient } from '@sanity/client'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 't8ctf4dg',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const errors = []

function normalizeFilename(filePath) {
  const base = path.basename(filePath)
  return base
    .replace(/^\d+\s+/, '')       // strip leading "137 "
    .replace(/\s+/g, '-')         // spaces to hyphens
    .toLowerCase()
}

function resolveLocalPath(imagePath) {
  // imagePath is like /uploads/posts-Details/Blogs/137 filename.webp
  const relative = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  return path.join(ROOT, 'public', relative)
}

async function uploadImage(localPath, filename) {
  const stream = fs.createReadStream(localPath)
  const ext = path.extname(localPath).slice(1)
  const asset = await client.assets.upload('image', stream, {
    filename,
    contentType: `image/${ext === 'jpg' ? 'jpeg' : ext}`,
  })
  return asset
}

function buildImageRef(assetId) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
  }
}

// Cache: imagePath -> { assetId, cdnUrl }
const uploadCache = new Map()

async function getOrUploadImage(imagePath) {
  if (uploadCache.has(imagePath)) return uploadCache.get(imagePath)

  const localPath = resolveLocalPath(imagePath)
  if (!fs.existsSync(localPath)) {
    return null
  }

  const filename = normalizeFilename(imagePath)
  try {
    const asset = await uploadImage(localPath, filename)
    const result = { assetId: asset._id, cdnUrl: asset.url }
    uploadCache.set(imagePath, result)
    return result
  } catch (err) {
    return null
  }
}

// ── MDX migration ────────────────────────────────────────────────────────────

async function migrateMdxDir(dirPath, label) {
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
  console.log(`\n[${label}] ${files.length} files`)

  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const raw = fs.readFileSync(filePath, 'utf8')
    const parsed = matter(raw)

    const imagePath = parsed.data.image
    if (!imagePath || !imagePath.startsWith('/uploads/')) continue
    if (!imagePath.includes('posts-Details')) continue

    console.log(`  Uploading: ${imagePath}`)
    const result = await getOrUploadImage(imagePath)

    if (!result) {
      errors.push({ file: filePath, imagePath, error: 'File not found or upload failed' })
      console.log(`  ERROR: ${imagePath}`)
      continue
    }

    // Update frontmatter
    parsed.data.image = result.cdnUrl
    const newContent = matter.stringify(parsed.content, parsed.data)
    fs.writeFileSync(filePath, newContent, 'utf8')
    console.log(`  Updated MDX: ${result.cdnUrl}`)
  }
}

// ── Sanity migration ─────────────────────────────────────────────────────────

async function migrateSanityDocs() {
  console.log('\n[Sanity] Fetching documents...')
  const docs = await client.fetch(
    `*[_type in ["post","whitepaper"] && defined(image) && image._type != "image"]{_id, _type, title, image}`
  )
  console.log(`[Sanity] ${docs.length} documents to migrate`)

  for (const doc of docs) {
    const imagePath = doc.image
    if (typeof imagePath !== 'string') continue
    if (!imagePath.startsWith('/uploads/')) {
      errors.push({ sanityId: doc._id, title: doc.title, imagePath, error: 'Unexpected image format (not /uploads/ path)' })
      continue
    }

    console.log(`  [${doc._type}] ${doc.title?.slice(0, 50)}`)
    const result = await getOrUploadImage(imagePath)

    if (!result) {
      errors.push({ sanityId: doc._id, title: doc.title, imagePath, error: 'File not found or upload failed' })
      console.log(`  ERROR: ${imagePath}`)
      continue
    }

    try {
      await client.patch(doc._id).set({ image: buildImageRef(result.assetId) }).commit()
      console.log(`  Patched Sanity doc: ${result.assetId}`)
    } catch (err) {
      errors.push({ sanityId: doc._id, title: doc.title, imagePath, error: `Patch failed: ${err.message}` })
    }
  }
}

// ── Error report ─────────────────────────────────────────────────────────────

function writeErrorReport() {
  const outPath = path.join(ROOT, 'migration-errors.md')
  if (errors.length === 0) {
    fs.writeFileSync(outPath, '# Migration Errors\n\nNo errors. All images migrated successfully.\n')
    console.log('\nAll done. No errors.')
    return
  }

  const rows = errors.map(e => {
    const id = e.sanityId || e.file || ''
    const title = e.title || path.basename(e.file || '')
    return `| ${id} | ${title} | ${e.imagePath || ''} | ${e.error} |`
  })

  const md = [
    '# Migration Errors',
    '',
    'Review each row and fix manually in Sanity Studio or by re-running the script after fixing the local file.',
    '',
    '| ID / File | Title | Image Path | Error |',
    '|-----------|-------|------------|-------|',
    ...rows,
    '',
  ].join('\n')

  fs.writeFileSync(outPath, md, 'utf8')
  console.log(`\n${errors.length} errors written to migration-errors.md`)
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error('SANITY_TOKEN env var required')
    process.exit(1)
  }

  await migrateMdxDir(path.join(ROOT, 'content', 'allPosts'), 'allPosts')
  await migrateMdxDir(path.join(ROOT, 'content', 'whitepaperspost'), 'whitepaperspost')
  await migrateSanityDocs()
  writeErrorReport()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

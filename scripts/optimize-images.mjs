import sharp from 'sharp'
import { readdirSync, statSync, renameSync, unlinkSync } from 'fs'
import { join, extname } from 'path'

const TARGETS = [
  { dir: 'public/images/HomePage', maxWidth: 1600, quality: 78 },
  { dir: 'public/images/leadership', maxWidth: 800, quality: 80 },
]

const MIN_BYTES = 150 * 1024 // only touch files > 150KB

async function processFile(filePath, opts) {
  const ext = extname(filePath).toLowerCase()
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return
  const stat = statSync(filePath)
  if (stat.size < MIN_BYTES) return

  const tmp = filePath + '.tmp'
  const pipeline = sharp(filePath).resize({ width: opts.maxWidth, withoutEnlargement: true })

  try {
    if (ext === '.png') {
      await pipeline.png({ quality: opts.quality, compressionLevel: 9, palette: true }).toFile(tmp)
    } else {
      await pipeline.jpeg({ quality: opts.quality, mozjpeg: true }).toFile(tmp)
    }

    const newSize = statSync(tmp).size
    if (newSize < stat.size) {
      renameSync(tmp, filePath)
      console.log(`${filePath}: ${(stat.size/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB`)
    } else {
      // new file is bigger — keep original, remove tmp
      unlinkSync(tmp)
      console.log(`${filePath}: skipped (no gain)`)
    }
  } catch (err) {
    // PNG palette may fail on complex images — retry without palette
    if (ext === '.png' && err.message.includes('palette')) {
      console.log(`${filePath}: palette mode failed, retrying without palette...`)
      const pipelineRetry = sharp(filePath).resize({ width: opts.maxWidth, withoutEnlargement: true })
      await pipelineRetry.png({ quality: opts.quality, compressionLevel: 9 }).toFile(tmp)
      const newSize = statSync(tmp).size
      if (newSize < stat.size) {
        renameSync(tmp, filePath)
        console.log(`${filePath}: ${(stat.size/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB`)
      } else {
        unlinkSync(tmp)
        console.log(`${filePath}: skipped (no gain)`)
      }
    } else {
      console.error(`Error processing ${filePath}:`, err.message)
      if (statSync(tmp, { throwIfNoEntry: false })) {
        unlinkSync(tmp)
      }
    }
  }
}

for (const t of TARGETS) {
  console.log(`Processing ${t.dir}...`)
  for (const entry of readdirSync(t.dir)) {
    await processFile(join(t.dir, entry), t)
  }
}

console.log('Done!')

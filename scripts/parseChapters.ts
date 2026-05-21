import * as fs from 'fs'
import * as path from 'path'
import { JSDOM } from 'jsdom'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

interface Chapter {
  id: string
  title: string
  content: string
}

function parseChaptersFromHTML(htmlPath: string): Chapter[] {
  const html = fs.readFileSync(htmlPath, 'utf-8')
  const dom = new JSDOM(html)
  const document = dom.window.document

  const chapters: Chapter[] = []

  // Find all h1 and h2 elements that represent chapters
  const headings = Array.from(document.querySelectorAll('h1, h2'))

  // Track current chapter number
  let currentChapterNumber = 0

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i]
    const title = heading.textContent?.trim() || ''

    // Skip if empty or too short
    if (!title || title.length < 3) continue

    // Update chapter number if this is a main chapter (contains number at start)
    const chapterMatch = title.match(/^(\d+)/)
    if (chapterMatch) {
      currentChapterNumber = parseInt(chapterMatch[1], 10)
    }

    // Create chapter ID from title
    let id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    // If this is a "summary" section and we have a chapter number, prefix with chapter number
    if (id === 'summary' && currentChapterNumber > 0) {
      id = `${currentChapterNumber}-summary`
    }

    // Get content between this heading and the next
    const contentElements: Element[] = []
    let currentElement = heading.nextElementSibling

    while (currentElement && i < headings.length - 1 && currentElement !== headings[i + 1]) {
      contentElements.push(currentElement)
      currentElement = currentElement.nextElementSibling
    }

    // If this is the last heading, get all remaining content
    if (i === headings.length - 1) {
      while (currentElement) {
        contentElements.push(currentElement)
        currentElement = currentElement.nextElementSibling
      }
    }

    let content = contentElements.map(el => el.outerHTML).join('\n')

    // Fix image paths: change "images/" to "/images/"
    content = content.replace(/src="images\//g, 'src="/images/')

    chapters.push({
      id,
      title,
      content
    })
  }

  return chapters
}

// Parse the HTML file
const htmlPath = path.join(__dirname, '../data/AcingtheSystemDesignInterviewbyZhiyongTan.html')
const outputPath = path.join(__dirname, '../src/data/chapters.json')
const htmlOutputDir = path.join(__dirname, '../public/chapters')

try {
  const chapters = parseChaptersFromHTML(htmlPath)

  // Create chapters directory
  fs.mkdirSync(htmlOutputDir, { recursive: true })

  // Save each chapter's HTML to a separate file
  chapters.forEach((chapter) => {
    const chapterHtmlPath = path.join(htmlOutputDir, `${chapter.id}.html`)
    fs.writeFileSync(chapterHtmlPath, chapter.content, 'utf-8')
  })

  // Create a metadata-only JSON file (without content)
  const chaptersMetadata = chapters.map(({ id, title }) => ({
    id,
    title,
    htmlPath: `/chapters/${id}.html`
  }))

  // Save to JSON file
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, JSON.stringify(chaptersMetadata, null, 2))

  console.log(`✅ Parsed ${chapters.length} chapters`)
  console.log(`✅ Saved ${chapters.length} individual HTML files to ${htmlOutputDir}`)
  console.log('Sample chapters:')
  chapters.slice(0, 5).forEach((ch, idx) => {
    console.log(`  ${idx + 1}. ${ch.title} (ID: ${ch.id})`)
  })
} catch (error) {
  console.error('❌ Error parsing HTML:', error)
  process.exit(1)
}

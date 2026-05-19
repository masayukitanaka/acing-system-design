import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


// Load existing chapters metadata
const chaptersPath = path.join(__dirname, '../src/data/chapters.json')

interface ChapterMetadata {
  id: string
  title: string
  htmlPath: string
  title_ja?: string
}

const chapters: ChapterMetadata[] = JSON.parse(fs.readFileSync(chaptersPath, 'utf-8'))

function translateTitle(title: string): string {
  const titleMap: Record<string, string> = {
    'front matter': '序文',
    'foreword': 'まえがき',
    'preface': '前書き',
    'acknowledgments': '謝辞',
    'about this book': 'この本について',
    'about the author': '著者について',
    'about the cover illustration': '表紙のイラストについて',
    'Part 1.': 'パート1',
    'Part 2.': 'パート2',
    'summary': 'まとめ',
    'Summary': 'まとめ',
    'references': '参考文献',
    'References': '参考文献',
  }

  // Technical terms dictionary
  const technicalTerms: Record<string, string> = {
    'tradeoffs': 'トレードオフ',
    'system design': 'システムデザイン',
    'scalability': 'スケーラビリティ',
    'database': 'データベース',
    'caching': 'キャッシング',
    'load balancing': 'ロードバランシング',
    'microservices': 'マイクロサービス',
    'non-functional requirements': '非機能要件',
    'distributed transactions': '分散トランザクション',
    'rate limiting': 'レート制限',
    'notification': '通知',
    'autocomplete': 'オートコンプリート',
    'typeahead': 'タイプアヘッド',
    'news feed': 'ニュースフィード',
  }

  // Common phrases
  const phraseMap: Record<string, string> = {
    'A walkthrough of': 'ウォークスルー:',
    'A typical': '典型的な',
    'A discussion about': 'ディスカッション:',
    'Design': '設計',
    'design': '設計',
    'concepts': 'コンセプト',
    'interview flow': '面接の流れ',
  }

  // Check for exact match first
  if (titleMap[title]) {
    return titleMap[title]
  }

  // Handle chapter titles with numbers (e.g., "1 A walkthrough of system design concepts")
  const chapterMatch = title.match(/^(\d+)\s+(.+)/)
  if (chapterMatch) {
    const [, num, rest] = chapterMatch
    let translatedRest = rest

    // Try to translate common parts
    for (const [eng, ja] of Object.entries(phraseMap)) {
      translatedRest = translatedRest.replace(new RegExp(eng, 'gi'), ja)
    }
    for (const [eng, ja] of Object.entries(technicalTerms)) {
      translatedRest = translatedRest.replace(new RegExp(eng, 'gi'), ja)
    }

    return `第${num}章 ${translatedRest}`
  }

  // Handle subsection titles (e.g., "1.1 A discussion about tradeoffs")
  const subsectionMatch = title.match(/^(\d+)\.(\d+)\s+(.+)/)
  if (subsectionMatch) {
    const [, num1, num2, rest] = subsectionMatch
    let translatedRest = rest

    // Try to translate the title
    for (const [eng, ja] of Object.entries(phraseMap)) {
      translatedRest = translatedRest.replace(new RegExp(eng, 'gi'), ja)
    }
    for (const [eng, ja] of Object.entries(technicalTerms)) {
      translatedRest = translatedRest.replace(new RegExp(eng, 'gi'), ja)
    }

    return `${num1}.${num2} ${translatedRest}`
  }

  return title
}

// Add Japanese title translations to chapters metadata
const updatedChapters = chapters.map((chapter) => {
  return {
    ...chapter,
    title_ja: translateTitle(chapter.title),
  }
})

// Save updated chapters metadata
fs.writeFileSync(chaptersPath, JSON.stringify(updatedChapters, null, 2))

console.log('✅ Added Japanese title translations to chapters metadata')
console.log(`📊 Updated ${updatedChapters.length} chapters`)
console.log('\n💡 To translate chapter content:')
console.log('   1. Individual HTML files are in public/chapters/')
console.log('   2. Create Japanese versions with "-ja.html" suffix')
console.log('   3. Example: front-matter.html -> front-matter-ja.html')
console.log('   4. The app will automatically load Japanese content when available')

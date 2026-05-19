# Translation Guide

This guide explains how to translate chapters from English to Japanese.

## Overview

The book content has been split into 258 individual HTML files, one per chapter. This allows for:
- **Incremental translation**: Translate chapters one at a time
- **Easy management**: Each file can be translated independently
- **Automatic loading**: The app automatically displays Japanese content when available

## File Structure

```
public/chapters/
├── front-matter.html          # English version
├── front-matter-ja.html       # Japanese version (to be created)
├── foreword.html              # English version
├── foreword-ja.html           # Japanese version (to be created)
└── ... (256 more chapters)
```

## Translation Workflow

### 1. Pick a Chapter to Translate

All English chapters are in `public/chapters/`. List them with:

```bash
ls public/chapters/*.html | grep -v "\-ja\.html"
```

### 2. Translate the Chapter

You have several options:

#### Option A: Manual Translation
1. Open the English HTML file
2. Copy the content
3. Translate the text (keeping HTML tags intact)
4. Save as `[chapter-id]-ja.html`

#### Option B: Using AI Translation API
Create a script to automate translation using services like:
- Google Cloud Translation API
- DeepL API
- OpenAI API

Example translation script structure:

```typescript
// scripts/translateSingleChapter.ts
import * as fs from 'fs'
import * as path from 'path'

async function translateChapter(chapterId: string) {
  const englishPath = `public/chapters/${chapterId}.html`
  const japanesePath = `public/chapters/${chapterId}-ja.html`

  const englishContent = fs.readFileSync(englishPath, 'utf-8')

  // TODO: Call translation API here
  // const translatedContent = await translateHTML(englishContent)

  // fs.writeFileSync(japanesePath, translatedContent, 'utf-8')
}
```

### 3. Verify the Translation

After creating the Japanese file:

1. Start the dev server: `npm run dev`
2. Open the browser and navigate to the chapter
3. Click the language toggle (🇯🇵 日本語 / 🇺🇸 English)
4. Verify the translation displays correctly

## Translation Tips

### Preserve HTML Structure

Keep all HTML tags exactly as they are:

```html
<!-- ✅ Good -->
<p class="c4"><span class="c2">これはテスト文です。</span></p>

<!-- ❌ Bad - removed span tags -->
<p class="c4">これはテスト文です。</p>
```

### Keep Image Paths

Don't translate image paths:

```html
<!-- ✅ Good -->
<img src="/images/image140.png" />

<!-- ❌ Bad -->
<img src="/画像/image140.png" />
```

### Technical Terms

Some technical terms may be kept in English or use katakana:
- API → API
- Database → データベース
- Cache → キャッシュ
- Load Balancer → ロードバランサー

## Progress Tracking

To see which chapters have been translated:

```bash
# Count English chapters
ls public/chapters/*.html | grep -v "\-ja\.html" | wc -l

# Count Japanese chapters
ls public/chapters/*-ja.html | wc -l
```

Create a checklist of chapters to translate:

```bash
# Generate a list of chapters to translate
for file in public/chapters/*.html; do
  if [[ ! "$file" =~ -ja\.html$ ]]; then
    basename "$file" .html
  fi
done > chapters-to-translate.txt
```

## Batch Translation Script Example

Here's an example script to translate multiple chapters:

```typescript
// scripts/batchTranslate.ts
import * as fs from 'fs'
import * as path from 'path'

const chaptersToTranslate = [
  'front-matter',
  'foreword',
  'preface',
  // Add more chapter IDs
]

async function translateAll() {
  for (const chapterId of chaptersToTranslate) {
    console.log(`Translating ${chapterId}...`)
    // Call translation API
    // Save result
    console.log(`✅ Completed ${chapterId}`)
  }
}

translateAll()
```

## Testing

After translating chapters, test the functionality:

1. Navigate to a translated chapter
2. Switch language back and forth
3. Verify images display correctly
4. Check that navigation buttons work
5. Ensure sidebar displays Japanese titles

## Notes

- Chapter titles are already translated (stored in `src/data/chapters.json`)
- Only the chapter content (HTML files) needs translation
- The app automatically falls back to English if Japanese version doesn't exist
- Language preference is saved in localStorage

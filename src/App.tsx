import { useState, useEffect } from 'react'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import './App.css'
import chaptersData from './data/chapters.json'
import { useLanguage } from './contexts/LanguageContext'

interface ChapterMetadata {
  id: string
  title: string
  htmlPath: string
  title_ja?: string
}

interface Chapter extends ChapterMetadata {
  content: string
  content_ja?: string
}

function ChapterView() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const [loading, setLoading] = useState<boolean>(true)
  const { t, language } = useLanguage()

  useEffect(() => {
    const loadChapter = async () => {
      setLoading(true)
      const index = chaptersData.findIndex(ch => ch.id === chapterId)

      if (index === -1) {
        setChapter(null)
        setLoading(false)
        return
      }

      const chapterMeta = chaptersData[index] as ChapterMetadata
      setCurrentIndex(index)

      try {
        // Load HTML content from individual file
        const response = await fetch(chapterMeta.htmlPath)
        const content = await response.text()

        // Try to load Japanese version if available
        let content_ja = content // Default to English content
        if (language === 'ja') {
          try {
            const jaPath = chapterMeta.htmlPath.replace('.html', '-ja.html')
            const jaResponse = await fetch(jaPath)
            if (jaResponse.ok) {
              content_ja = await jaResponse.text()
            }
          } catch (e) {
            // Japanese version not available, use English
          }
        }

        setChapter({
          ...chapterMeta,
          content,
          content_ja
        })
      } catch (error) {
        console.error('Error loading chapter:', error)
        setChapter(null)
      } finally {
        setLoading(false)
      }
    }

    loadChapter()
  }, [chapterId, language])

  useEffect(() => {
    // Scroll to top when changing chapters
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [chapterId])

  if (loading) {
    return (
      <div className="content">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  if (!chapter) {
    return <div className="content"><h1>{t('error.chapterNotFound')}</h1></div>
  }

  const previousChapter = currentIndex > 0 ? chaptersData[currentIndex - 1] : null
  const nextChapter = currentIndex < chaptersData.length - 1 ? chaptersData[currentIndex + 1] : null

  const displayTitle = language === 'ja' && chapter.title_ja ? chapter.title_ja : chapter.title
  const displayContent = language === 'ja' && chapter.content_ja ? chapter.content_ja : chapter.content

  return (
    <main className="content">
      <article>
        <h1>{displayTitle}</h1>
        <div dangerouslySetInnerHTML={{ __html: displayContent }} />
      </article>

      {/* Navigation buttons */}
      <nav className="chapter-navigation">
        {previousChapter ? (
          <Link to={`/chapter/${previousChapter.id}`} className="nav-button prev-button">
            <span className="nav-arrow">←</span>
            <span className="nav-text">
              <span className="nav-label">{t('nav.previous')}</span>
              <span className="nav-title">
                {language === 'ja' && previousChapter.title_ja ? previousChapter.title_ja : previousChapter.title}
              </span>
            </span>
          </Link>
        ) : (
          <div className="nav-button-placeholder"></div>
        )}

        {nextChapter ? (
          <Link to={`/chapter/${nextChapter.id}`} className="nav-button next-button">
            <span className="nav-text">
              <span className="nav-label">{t('nav.next')}</span>
              <span className="nav-title">
                {language === 'ja' && nextChapter.title_ja ? nextChapter.title_ja : nextChapter.title}
              </span>
            </span>
            <span className="nav-arrow">→</span>
          </Link>
        ) : (
          <div className="nav-button-placeholder"></div>
        )}
      </nav>
    </main>
  )
}

function Home() {
  const { t } = useLanguage()

  return (
    <main className="content">
      <article>
        <h1>{t('home.title')}</h1>
        <p>{t('home.subtitle')}</p>
        <p>{t('home.description')}</p>
      </article>
    </main>
  )
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { t, language, setLanguage } = useLanguage()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ja' : 'en')
  }

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        className={`hamburger ${sidebarOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Language Toggle Button */}
      <button
        className="language-toggle"
        onClick={toggleLanguage}
        aria-label="Toggle language"
      >
        {language === 'en' ? '🇯🇵 日本語' : '🇺🇸 English'}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2>{t('nav.tableOfContents')}</h2>
        <ul>
          {chaptersData.map((chapter) => (
            <li key={chapter.id}>
              <Link to={`/chapter/${chapter.id}`} onClick={closeSidebar}>
                {language === 'ja' && chapter.title_ja ? chapter.title_ja : chapter.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="overlay" onClick={closeSidebar}></div>
      )}

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chapter/:chapterId" element={<ChapterView />} />
      </Routes>
    </>
  )
}

export default App

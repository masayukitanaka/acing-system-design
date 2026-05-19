import { useState, useEffect } from 'react'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import './App.css'
import chaptersData from './data/chapters.json'

interface Chapter {
  id: string
  title: string
  content: string
}

function ChapterView() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(-1)

  useEffect(() => {
    const index = chaptersData.findIndex(ch => ch.id === chapterId)
    if (index !== -1) {
      setChapter(chaptersData[index] as Chapter)
      setCurrentIndex(index)
    }
  }, [chapterId])

  if (!chapter) {
    return <div className="content"><h1>Chapter not found</h1></div>
  }

  const previousChapter = currentIndex > 0 ? chaptersData[currentIndex - 1] : null
  const nextChapter = currentIndex < chaptersData.length - 1 ? chaptersData[currentIndex + 1] : null

  return (
    <main className="content">
      <article>
        <h1>{chapter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
      </article>

      {/* Navigation buttons */}
      <nav className="chapter-navigation">
        {previousChapter ? (
          <Link to={`/chapter/${previousChapter.id}`} className="nav-button prev-button">
            <span className="nav-arrow">←</span>
            <span className="nav-text">
              <span className="nav-label">Previous</span>
              <span className="nav-title">{previousChapter.title}</span>
            </span>
          </Link>
        ) : (
          <div className="nav-button-placeholder"></div>
        )}

        {nextChapter ? (
          <Link to={`/chapter/${nextChapter.id}`} className="nav-button next-button">
            <span className="nav-text">
              <span className="nav-label">Next</span>
              <span className="nav-title">{nextChapter.title}</span>
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
  return (
    <main className="content">
      <article>
        <h1>Acing the System Design Interview</h1>
        <p>
          Welcome to this comprehensive guide on system design interviews.
          Use the hamburger menu to navigate through different chapters.
        </p>
        <p>
          This book covers essential topics in system design, from basic concepts
          to advanced patterns used in real-world applications.
        </p>
      </article>
    </main>
  )
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
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

      {/* Sidebar Navigation */}
      <nav className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <h2>Table of Contents</h2>
        <ul>
          {chaptersData.map((chapter) => (
            <li key={chapter.id}>
              <Link to={`/chapter/${chapter.id}`} onClick={closeSidebar}>
                {chapter.title}
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

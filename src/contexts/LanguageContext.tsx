import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Language = 'en' | 'ja'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    'nav.tableOfContents': 'Table of Contents',
    'nav.previous': 'Previous',
    'nav.next': 'Next',
    'home.title': 'Acing the System Design Interview',
    'home.subtitle': 'Welcome to this comprehensive guide on system design interviews. Use the hamburger menu to navigate through different chapters.',
    'home.description': 'This book covers essential topics in system design, from basic concepts to advanced patterns used in real-world applications.',
    'error.chapterNotFound': 'Chapter not found',
    'menu.toggleLanguage': 'Switch to Japanese',
  },
  ja: {
    'nav.tableOfContents': '目次',
    'nav.previous': '前へ',
    'nav.next': '次へ',
    'home.title': 'システムデザイン面接を極める',
    'home.subtitle': 'システムデザイン面接に関する包括的なガイドへようこそ。ハンバーガーメニューを使用して、さまざまなチャプターを閲覧してください。',
    'home.description': 'この本は、基本的な概念から実世界のアプリケーションで使用される高度なパターンまで、システムデザインの重要なトピックをカバーしています。',
    'error.chapterNotFound': 'チャプターが見つかりません',
    'menu.toggleLanguage': 'English',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved === 'ja' ? 'ja' : 'en') as Language
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

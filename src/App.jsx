import { useCallback, useEffect, useRef, useState } from 'react'
import { CheckCircle2, ChevronRight, CircleHelp, CreditCard, GraduationCap, Layers3, LayoutDashboard, Library, LockKeyhole, Menu, NotebookPen, Search, Sparkles, Timer, X } from 'lucide-react'
import { QUESTIONS } from './data/questions'
import { ADDITIONAL_QUESTIONS } from './data/additionalQuestions'
import { SubscriptionProvider, useSubscription } from './context/SubscriptionContext'
import Dashboard from './components/Dashboard'
import PracticeSetup from './components/PracticeSetup'
import QuestionBank from './components/QuestionBank'
import FlashcardsPage from './components/FlashcardsPage'
import ReferencePage from './components/ReferencePage'
import ExamRoom from './components/ExamRoom'
import PricingPage from './components/PricingPage'
import PaywallModal from './components/PaywallModal'
import './App.css'

const QUESTION_BANK = [...QUESTIONS, ...ADDITIONAL_QUESTIONS]
const RESULTS_KEY = 'sie-prep-results-v1'
const LANGUAGE_KEY = 'sie-prep-language-v1'
const MOCK_QUOTAS = { 1: 14, 2: 37, 3: 26, 4: 8 }

const readResults = () => {
  try { return JSON.parse(window.localStorage.getItem(RESULTS_KEY) || '[]') } catch { return [] }
}

const readLanguage = () => {
  try { return window.localStorage.getItem(LANGUAGE_KEY) || 'tr' } catch { return 'tr' }
}

function shuffle(items) {
  const result = [...items]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1))
    ;[result[index], result[other]] = [result[other], result[index]]
  }
  return result
}

const NAV_ITEMS = [
  { id: 'home', en: 'Overview', tr: 'Genel bakış', icon: LayoutDashboard, group: 'LEARN' },
  { id: 'practice', en: 'Practice', tr: 'Soru pratiği', icon: CircleHelp, group: 'LEARN' },
  { id: 'mock', en: 'Mock exam', tr: 'Deneme sınavı', icon: Timer, group: 'LEARN', premium: true },
  { id: 'questions', en: 'Question bank', tr: 'Soru bankası', icon: Library, group: 'STUDY TOOLS' },
  { id: 'flashcards', en: 'Flashcards', tr: 'Flashcardlar', icon: Layers3, group: 'STUDY TOOLS' },
  { id: 'reference', en: 'Quick reference', tr: 'Hızlı başvuru', icon: NotebookPen, group: 'STUDY TOOLS' },
]

function AppContent() {
  const {
    hasPremium,
    membership,
    plan,
    activatePlan,
    clearMembership,
    isNative,
    storePackages,
    billingStatus,
    billingError,
    storeProvider,
    purchasePlan,
    restorePurchases,
    refreshBilling,
    openManageSubscriptions,
  } = useSubscription()
  const [language, setLanguage] = useState(readLanguage)
  const [activeView, setActiveView] = useState('home')
  const [activeSession, setActiveSession] = useState(null)
  const [results, setResults] = useState(readResults)
  const [paywallOpen, setPaywallOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [selectedBankSection, setSelectedBankSection] = useState(null)
  const [bankSearch, setBankSearch] = useState('')
  const [headerSearch, setHeaderSearch] = useState('')
  const [practiceDefaults, setPracticeDefaults] = useState(null)
  const [toast, setToast] = useState('')
  const pendingAction = useRef(null)
  const searchInput = useRef(null)
  const tr = language === 'tr'

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_KEY, language)
  }, [language])

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchInput.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timeout = window.setTimeout(() => setToast(''), 3200)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const openPaywall = useCallback((action = null) => {
    pendingAction.current = action
    setPaywallOpen(true)
  }, [])

  const closePaywall = useCallback(() => {
    setPaywallOpen(false)
    pendingAction.current = null
  }, [])

  const continueAfterActivation = useCallback(() => {
    const action = pendingAction.current
    pendingAction.current = null
    action?.()
  }, [])

  const startExam = useCallback((questions, mode) => {
    setActiveSession({ questions, mode })
    setActiveView('exam')
    setMobileNavOpen(false)
  }, [])

  const buildMockExam = useCallback(() => {
    const chosen = []
    for (const [sectionId, target] of Object.entries(MOCK_QUOTAS)) {
      const sectionQuestions = shuffle(QUESTION_BANK.filter((item) => item.section === Number(sectionId)))
      chosen.push(...sectionQuestions.slice(0, target))
    }
    if (chosen.length < 85) {
      const ids = new Set(chosen.map((item) => item.id))
      chosen.push(...shuffle(QUESTION_BANK.filter((item) => !ids.has(item.id))).slice(0, 85 - chosen.length))
    }
    return shuffle(chosen.slice(0, 85))
  }, [])

  const startFullMock = useCallback(() => {
    const launch = () => startExam(buildMockExam(), 'mock')
    if (!hasPremium) openPaywall(launch)
    else launch()
  }, [buildMockExam, hasPremium, openPaywall, startExam])

  const startPracticeSet = useCallback(({ section = null, difficulty = null, count = 5 } = {}) => {
    const available = QUESTION_BANK.filter((item) => (!section || item.section === Number(section)) && (!difficulty || item.difficulty.toLowerCase() === difficulty))
    if (!available.length) {
      setToast(tr ? 'Bu filtrelere uygun soru bulunamadı.' : 'No questions match those filters.')
      return
    }
    if (!hasPremium && count > 5) {
      openPaywall()
      return
    }
    startExam(shuffle(available).slice(0, Math.min(count, available.length)), 'practice')
  }, [hasPremium, openPaywall, startExam, tr])

  const beginPractice = useCallback(() => {
    setPracticeDefaults(null)
    setActiveView('practice')
  }, [])

  const handleQuestionBankPractice = useCallback((section = null, difficulty = null) => {
    setPracticeDefaults({ section: section || 'all', difficulty: difficulty || 'all', count: hasPremium ? 10 : 5 })
    setActiveView('practice')
  }, [hasPremium])

  const recordResult = useCallback((result) => {
    const summary = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      mode: result.mode,
      score: result.score,
      correct: result.correct,
      total: result.total,
      unanswered: result.unanswered,
      sectionScores: result.sectionScores,
      completedAt: result.completedAt,
    }
    setResults((current) => {
      const updated = [summary, ...current].slice(0, 30)
      window.localStorage.setItem(RESULTS_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const exitExam = useCallback(() => {
    setActiveSession(null)
    setActiveView('home')
  }, [])

  const handlePlanSelect = useCallback(async (planId) => {
    if (!isNative) {
      activatePlan(planId)
      setToast(tr ? 'Demo planı etkinleştirildi. Gerçek ödeme alınmadı.' : 'Demo plan activated. No payment was processed.')
      return { success: true }
    }
    const result = await purchasePlan(planId)
    if (result.success) setToast(tr ? 'Satın alma tamamlandı; aboneliğin etkin.' : 'Purchase complete. Your plan is active.')
    else if (!result.cancelled) setToast(tr ? 'Satın alma tamamlanamadı. Mağaza bağlantını kontrol et.' : (result.error || 'The store could not complete your purchase.'))
    return result
  }, [activatePlan, isNative, purchasePlan, tr])

  const navigate = (view) => {
    setMobileNavOpen(false)
    if (view === 'mock') {
      startFullMock()
      return
    }
    if (view === 'practice') {
      beginPractice()
      return
    }
    setSelectedBankSection(null)
    setActiveView(view)
  }

  const onSectionQuestions = (sectionId) => {
    setSelectedBankSection(sectionId || null)
    setBankSearch('')
    setHeaderSearch('')
    setActiveView('questions')
  }

  const runSearch = (event) => {
    event.preventDefault()
    if (!headerSearch.trim()) return
    setSelectedBankSection(null)
    setBankSearch(headerSearch.trim())
    setActiveView('questions')
  }

  const navTitle = NAV_ITEMS.find((item) => item.id === activeView)
  const pageHeading = activeView === 'home' ? (tr ? 'Çalışma alanı' : 'Study workspace')
    : activeView === 'practice' ? (tr ? 'Odaklı pratik' : 'Focused practice')
      : activeView === 'questions' ? (tr ? 'Soru bankası' : 'Question bank')
        : activeView === 'flashcards' ? (tr ? 'Flashcardlar' : 'Flashcards')
          : activeView === 'reference' ? (tr ? 'Hızlı başvuru' : 'Quick reference')
            : activeView === 'pricing' ? (tr ? 'Plan ve üyelik' : 'Plans & membership')
              : navTitle ? (tr ? navTitle.tr : navTitle.en) : (tr ? 'Çalışma alanı' : 'Study workspace')

  if (activeView === 'exam' && activeSession) {
    return <ExamRoom questions={activeSession.questions} mode={activeSession.mode} language={language} onExit={exitExam} onFinish={recordResult} />
  }

  const renderPage = () => {
    if (activeView === 'practice') return <PracticeSetup key={`${practiceDefaults?.section || 'all'}-${practiceDefaults?.difficulty || 'all'}`} language={language} questions={QUESTION_BANK} hasPremium={hasPremium} isNative={isNative} onUpgrade={() => openPaywall()} onStart={startPracticeSet} initialSettings={practiceDefaults} />
    if (activeView === 'questions') return <QuestionBank key={`${selectedBankSection ?? 'all'}-${bankSearch}`} language={language} questions={QUESTION_BANK} hasPremium={hasPremium} initialSection={selectedBankSection} initialSearch={bankSearch} onUpgrade={() => openPaywall()} onStartPractice={handleQuestionBankPractice} />
    if (activeView === 'flashcards') return <FlashcardsPage language={language} hasPremium={hasPremium} onUpgrade={() => openPaywall()} />
    if (activeView === 'reference') return <ReferencePage language={language} hasPremium={hasPremium} onUpgrade={() => openPaywall()} />
    if (activeView === 'pricing') return <PricingPage language={language} plan={plan} membership={membership} isNative={isNative} storePackages={storePackages} billingStatus={billingStatus} billingError={billingError} storeProvider={storeProvider} onSelectPlan={handlePlanSelect} onRestore={restorePurchases} onManage={openManageSubscriptions} onRefresh={refreshBilling} onClearPlan={() => { clearMembership(); setToast(tr ? 'Demo planı sıfırlandı.' : 'Demo plan was reset.') }} />
    return <Dashboard language={language} questions={QUESTION_BANK} results={results} hasPremium={hasPremium} plan={plan} isNative={isNative} storeProvider={storeProvider} onMock={startFullMock} onPractice={beginPractice} onUpgrade={() => openPaywall()} onQuestions={onSectionQuestions} onFlashcards={() => setActiveView('flashcards')} onReference={() => setActiveView('reference')} />
  }

  return (
    <div className={`app-shell ${mobileNavOpen ? 'mobile-nav-open' : ''}`}>
      {mobileNavOpen && <button className="mobile-nav-scrim" type="button" onClick={() => setMobileNavOpen(false)} aria-label={tr ? 'Menüyü kapat' : 'Close menu'} />}
      <aside className="app-sidebar">
        <div className="sidebar-brand-row"><button className="brand-lockup" type="button" onClick={() => { setActiveView('home'); setMobileNavOpen(false) }}><span className="brand-logo"><span>S</span><i /></span><span className="brand-wordmark"><strong>SIE<span>PREP</span></strong><small>EXAM STUDIO</small></span></button><button className="sidebar-close" type="button" aria-label={tr ? 'Menüyü kapat' : 'Close navigation'} onClick={() => setMobileNavOpen(false)}><X size={18} /></button></div>

        <div className="sidebar-study-status"><span className="status-avatar"><GraduationCap size={16} /></span><span><strong>{tr ? 'SIE Sınav Hazırlığı' : 'SIE Exam Prep'}</strong><small>{tr ? 'Kişisel çalışma alanı' : 'Personal study workspace'}</small></span><span className="status-online-dot" /></div>

        <nav className="sidebar-nav" aria-label={tr ? 'Ana gezinme' : 'Main navigation'}>
          <p className="nav-section-label">{tr ? 'ÇALIŞMA ALANI' : 'LEARN'}</p>
          {NAV_ITEMS.slice(0, 3).map((item) => <NavigationButton key={item.id} item={item} active={activeView === item.id || (item.id === 'mock' && activeView === 'exam')} language={language} onClick={() => navigate(item.id)} />)}
          <p className="nav-section-label nav-section-spaced">{tr ? 'ÇALIŞMA ARAÇLARI' : 'STUDY TOOLS'}</p>
          {NAV_ITEMS.slice(3).map((item) => <NavigationButton key={item.id} item={item} active={activeView === item.id} language={language} onClick={() => navigate(item.id)} />)}
        </nav>

        <div className="sidebar-plan-card">
          <div className="sidebar-plan-icon"><Sparkles size={15} /></div>
          {hasPremium ? <><span className="sidebar-plan-label">{tr ? 'PLUS ERİŞİMİ' : 'PLUS ACCESS'}</span><strong>{plan ? (tr ? plan.nameTr : plan.name) : 'SIE Plus'}</strong><small>{tr ? 'Bu cihazda etkin' : 'Active on this device'}</small></> : <><span className="sidebar-plan-label">SIE PLUS</span><strong>{tr ? 'Tam denemelere hazır mısın?' : 'Ready for the full exam?'}</strong><small>{tr ? 'Tam araç takımını aç' : 'Unlock your complete toolkit'}</small></>}
          <button type="button" onClick={() => navigate('pricing')}>{hasPremium ? (tr ? 'Planı yönet' : 'Manage plan') : (tr ? 'Planları keşfet' : 'Explore plans')}<ChevronRight size={14} /></button>
        </div>

        <div className="sidebar-bottom"><div className="sidebar-local-note"><span><LockKeyhole size={13} /></span><p>{tr ? 'Hesap girişi yok' : 'No account login'}<small>{isNative ? (tr ? 'İlerleme bu cihazda saklanır' : 'Progress saved on this device') : (tr ? 'İlerleme bu tarayıcıda saklanır' : 'Progress saved in this browser')}</small></p></div><span className="sidebar-version">SIE PREP · STUDY STUDIO</span></div>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <div className="topbar-heading"><button className="mobile-menu-button" type="button" onClick={() => setMobileNavOpen(true)} aria-label={tr ? 'Menüyü aç' : 'Open navigation'}><Menu size={19} /></button><div><p className="topbar-eyebrow">{tr ? 'SIE SINAV HAZIRLIĞI' : 'SIE EXAM PREP'}</p><h2>{pageHeading}</h2></div></div>
          <div className="topbar-actions">
            <form className="global-search" onSubmit={runSearch}><Search size={16} /><input ref={searchInput} value={headerSearch} onChange={(event) => setHeaderSearch(event.target.value)} placeholder={tr ? 'Soru bankasında ara' : 'Search the question bank'} aria-label={tr ? 'Soru bankasında ara' : 'Search the question bank'} /><kbd>⌘ K</kbd></form>
            <button className="language-toggle" type="button" onClick={() => setLanguage((current) => current === 'tr' ? 'en' : 'tr')} title={tr ? 'Switch to English' : 'Türkçe’ye geç'}><span className={tr ? 'language-selected' : ''}>TR</span><i /> <span className={!tr ? 'language-selected' : ''}>EN</span></button>
            <div className="guest-profile" title={tr ? 'Oturum açmadan kullanılıyor' : 'Using app without login'}><span className="guest-avatar">G</span><span className="guest-profile-copy"><strong>{tr ? 'Misafir' : 'Guest'}</strong><small>{tr ? 'Yerel profil' : 'Local profile'}</small></span></div>
          </div>
        </header>
        <main className="page-container" key={activeView}>{renderPage()}</main>
        <footer className="app-footer"><span>© 2026 SIE Prep Study Studio</span><span>{tr ? 'Özgün çalışma içeriği · FINRA ile bağlantılı değildir' : 'Original study content · not affiliated with FINRA'}</span><div className="app-footer-links"><a href="/terms.html">{tr ? 'Koşullar' : 'Terms'}</a><a href="/privacy.html">{tr ? 'Gizlilik' : 'Privacy'}</a><a href="/support.html">{tr ? 'Destek' : 'Support'}</a><a href="https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam" target="_blank" rel="noreferrer">{tr ? 'FINRA sınav bilgisi' : 'FINRA exam info'}<ChevronRight size={12} /></a></div></footer>
      </div>

      <MobileTabBar activeView={activeView} language={language} onNavigate={navigate} />
      {paywallOpen && <PaywallModal language={language} onClose={closePaywall} onActivated={continueAfterActivation} />}
      {toast && <div className="toast-message"><CheckCircle2 size={17} />{toast}</div>}
    </div>
  )
}

function NavigationButton({ item, active, language, onClick }) {
  const Icon = item.icon
  const tr = language === 'tr'
  return <button type="button" className={`nav-item ${active ? 'active' : ''}`} onClick={onClick}><Icon size={17} strokeWidth={active ? 2.2 : 1.8} /><span>{tr ? item.tr : item.en}</span>{item.premium && <span className="nav-pro-label"><LockKeyhole size={10} />PRO</span>}{active && <i className="nav-active-indicator" />}</button>
}

function MobileTabBar({ activeView, language, onNavigate }) {
  const tr = language === 'tr'
  const items = [
    { id: 'home', label: tr ? 'Ana sayfa' : 'Home', icon: LayoutDashboard },
    { id: 'practice', label: tr ? 'Pratik' : 'Practice', icon: CircleHelp },
    { id: 'mock', label: tr ? 'Deneme' : 'Mock', icon: Timer },
    { id: 'questions', label: tr ? 'Sorular' : 'Questions', icon: Library },
    { id: 'pricing', label: tr ? 'Planlar' : 'Plans', icon: CreditCard },
  ]
  return (
    <nav className="mobile-tab-bar" aria-label={tr ? 'Alt gezinme' : 'Bottom navigation'}>
      {items.map(({ id, label, icon: Icon }) => {
        const active = activeView === id || (id === 'mock' && activeView === 'exam')
        return <button key={id} type="button" className={`mobile-tab ${active ? 'active' : ''} ${id === 'pricing' ? 'mobile-tab-pricing' : ''}`} onClick={() => onNavigate(id)} aria-current={active ? 'page' : undefined}><Icon size={19} strokeWidth={active ? 2.3 : 1.8} /><span>{label}</span>{id === 'pricing' && <i className="mobile-tab-sparkle"><Sparkles size={9} /></i>}</button>
      })}
    </nav>
  )
}

export default function App() {
  return <SubscriptionProvider><AppContent /></SubscriptionProvider>
}

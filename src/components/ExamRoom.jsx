import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, CircleHelp, Clock3, Flag, Grid2X2, Lightbulb, LockKeyhole, PencilLine, RotateCcw, Slash, Target, Calculator as CalculatorIcon, X } from 'lucide-react'
import { SECTIONS } from '../data/questions'
import Modal from './Modal'
import CalculatorPad from './CalculatorPad'

const formatTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
const answerLetter = (answer) => answer === null || answer === undefined ? '—' : String.fromCharCode(65 + answer)

function makeResult(questions, answers, mode) {
  const questionResults = questions.map((question) => ({
    questionId: question.id,
    section: question.section,
    sectionName: question.sectionName,
    topic: question.topic,
    difficulty: question.difficulty,
    question: question.question,
    questionTr: question.questionTr,
    options: question.options,
    optionsTr: question.optionsTr,
    selectedAnswer: answers[question.id] ?? null,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    explanationTr: question.explanationTr,
    ruleReference: question.ruleReference,
    keyTakeaway: question.keyTakeaway,
  }))
  const correct = questionResults.filter((item) => item.selectedAnswer === item.correctAnswer).length
  const sectionScores = [1, 2, 3, 4].map((section) => {
    const sectionQuestions = questionResults.filter((item) => item.section === section)
    const sectionCorrect = sectionQuestions.filter((item) => item.selectedAnswer === item.correctAnswer).length
    return { section, sectionName: SECTIONS[section].name, sectionNameTr: SECTIONS[section].nameTr, correct: sectionCorrect, total: sectionQuestions.length, score: sectionQuestions.length ? Math.round((sectionCorrect / sectionQuestions.length) * 100) : 0 }
  }).filter((item) => item.total > 0)
  return { mode, total: questions.length, correct, unanswered: questionResults.filter((item) => item.selectedAnswer === null).length, score: questions.length ? Math.round((correct / questions.length) * 100) : 0, sectionScores, questionResults, completedAt: Date.now() }
}

function statusFor(question, answers, flagged) {
  if (flagged) return 'flagged'
  if (answers[question.id] !== undefined) return 'answered'
  return 'unanswered'
}

export default function ExamRoom({ questions = [], mode = 'practice', language = 'en', onExit, onFinish }) {
  const tr = language === 'tr'
  const isMock = mode === 'mock'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [flagged, setFlagged] = useState([])
  const [struck, setStruck] = useState({})
  const [revealed, setRevealed] = useState({})
  const [remaining, setRemaining] = useState(isMock ? 105 * 60 : null)
  const [dialog, setDialog] = useState(null)
  const [scratchpad, setScratchpad] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState(null)
  const [reviewFilter, setReviewFilter] = useState('incorrect')
  const submittedRef = useRef(false)

  const currentQuestion = questions[currentIndex]
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined
  const currentFlagged = currentQuestion ? flagged.includes(currentQuestion.id) : false
  const answeredCount = Object.keys(answers).length
  const flaggedCount = flagged.length
  const progressPercent = questions.length ? (answeredCount / questions.length) * 100 : 0

  const finish = useCallback(() => {
    if (submittedRef.current || !questions.length) return
    submittedRef.current = true
    const finalResult = makeResult(questions, answers, mode)
    setResult(finalResult)
    setSubmitted(true)
    setDialog(null)
    onFinish?.(finalResult)
  }, [answers, mode, onFinish, questions])

  useEffect(() => {
    if (!isMock || submitted) return undefined
    const timer = window.setInterval(() => setRemaining((current) => current <= 1 ? 0 : current - 1), 1000)
    return () => window.clearInterval(timer)
  }, [isMock, submitted])

  useEffect(() => {
    if (isMock && remaining === 0 && !submitted) finish()
  }, [isMock, remaining, submitted, finish])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (submitted || dialog || event.altKey || event.ctrlKey || event.metaKey) return
      const targetName = event.target?.tagName?.toLowerCase()
      if (targetName === 'input' || targetName === 'textarea' || targetName === 'select') return
      if (event.key === 'ArrowRight') setCurrentIndex((index) => Math.min(questions.length - 1, index + 1))
      if (event.key === 'ArrowLeft') setCurrentIndex((index) => Math.max(0, index - 1))
      if (['1', '2', '3', '4'].includes(event.key) && currentQuestion) setAnswers((previous) => ({ ...previous, [currentQuestion.id]: Number(event.key) - 1 }))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentQuestion, dialog, questions.length, submitted])

  const toggleFlag = () => {
    if (!currentQuestion) return
    setFlagged((items) => items.includes(currentQuestion.id) ? items.filter((id) => id !== currentQuestion.id) : [...items, currentQuestion.id])
  }

  const toggleStrike = (questionId, optionIndex) => {
    setStruck((previous) => {
      const current = new Set(previous[questionId] || [])
      if (current.has(optionIndex)) current.delete(optionIndex)
      else current.add(optionIndex)
      return { ...previous, [questionId]: [...current] }
    })
  }

  const openReview = (filter = 'all') => {
    setReviewFilter(filter)
    setDialog('review')
  }

  const navigateTo = (index) => {
    setCurrentIndex(index)
    setDialog(null)
  }

  const localizedQuestion = (question) => tr ? question.questionTr || question.question : question.question
  const localizedOptions = (question) => tr ? question.optionsTr || question.options : question.options

  if (submitted && result) {
    return <ExamResults result={result} language={language} onExit={onExit} />
  }

  if (!currentQuestion) {
    return <div className="exam-room-empty"><p>{tr ? 'Bu oturum için soru bulunamadı.' : 'No questions are available for this session.'}</p><button className="button button-outline" type="button" onClick={onExit}>{tr ? 'Panele dön' : 'Back to dashboard'}</button></div>
  }

  const progressDescription = isMock
    ? (tr ? '85 soru · 105 dakika · Tam deneme' : '85 questions · 105 minutes · Full simulation')
    : (tr ? `${questions.length} soruluk odaklı çalışma` : `${questions.length}-question focused practice`)

  return (
    <div className="exam-room">
      <header className="exam-topbar">
        <button type="button" className="exam-brand" onClick={() => setDialog('exit')} aria-label={tr ? 'Denemeden çık' : 'Exit exam'}><span className="brand-mark-small">S</span><span><strong>SIE<span>PREP</span></strong><small>{tr ? 'ÇALIŞMA MODU' : 'STUDY MODE'}</small></span></button>
        <div className="exam-session-meta"><span className={`session-mode-dot ${isMock ? 'dot-mock' : 'dot-practice'}`} /><div><strong>{isMock ? (tr ? 'Tam sınav simülasyonu' : 'Full exam simulation') : (tr ? 'Soru pratiği' : 'Question practice')}</strong><small>{progressDescription}</small></div></div>
        <div className="exam-top-actions">
          {isMock && <div className={`exam-timer ${remaining <= 300 ? 'timer-warning' : ''}`} aria-live="polite"><Clock3 size={17} /><span><small>{tr ? 'KALAN SÜRE' : 'TIME LEFT'}</small><strong>{formatTime(remaining)}</strong></span></div>}
          {!isMock && <div className="exam-untimed"><Clock3 size={16} />{tr ? 'Süresiz' : 'Untimed'}</div>}
          <button type="button" className="exam-tool-button" onClick={() => setDialog('calculator')}><CalculatorIcon size={17} /><span>{tr ? 'Hesap makinesi' : 'Calculator'}</span></button>
          <button type="button" className="exam-tool-button" onClick={() => setDialog('scratchpad')}><PencilLine size={17} /><span>{tr ? 'Not defteri' : 'Scratchpad'}</span></button>
          <button type="button" className="exam-submit-top" onClick={() => setDialog('finish')}>{tr ? 'Sınavı bitir' : 'Finish exam'}<ArrowRight size={15} /></button>
        </div>
      </header>

      <div className="exam-progress-bar"><span style={{ width: `${progressPercent}%` }} /></div>

      <div className="exam-body">
        <main className="exam-question-column">
          <div className="exam-breadcrumb-row"><button type="button" className="back-to-study" onClick={() => setDialog('exit')}><ArrowLeft size={14} />{tr ? 'Çalışma alanına dön' : 'Back to study'}</button><span className="exam-question-counter">{tr ? 'SORU' : 'QUESTION'} <strong>{String(currentIndex + 1).padStart(2, '0')}</strong><span>/ {questions.length}</span></span></div>
          <div className="exam-content-card">
            <div className="exam-question-meta"><div className="exam-tag-group"><span className="exam-section-tag">{tr ? `BÖLÜM ${currentQuestion.section}` : `SECTION ${currentQuestion.section}`}</span><span className={`difficulty-pill difficulty-${currentQuestion.difficulty.toLowerCase()}`}>{tr ? ({ Easy: 'Kolay', Medium: 'Orta', Hard: 'Zor' }[currentQuestion.difficulty]) : currentQuestion.difficulty}</span></div><button type="button" className={`flag-question ${currentFlagged ? 'flagged' : ''}`} onClick={toggleFlag}><Flag size={15} fill={currentFlagged ? 'currentColor' : 'none'} />{currentFlagged ? (tr ? 'İşaretlendi' : 'Flagged') : (tr ? 'İncelemek için işaretle' : 'Flag for review')}</button></div>
            <p className="exam-topic-label">{currentQuestion.topic}</p>
            <h1 className="exam-question-title">{localizedQuestion(currentQuestion)}</h1>
            <p className="exam-instruction"><CircleHelp size={15} />{tr ? 'En uygun yanıtı seç. İstersen seçenekleri elemek için üzerini çizebilirsin.' : 'Choose the best answer. Strike through options to eliminate them.'}</p>

            <div className="exam-options-list">
              {localizedOptions(currentQuestion).map((option, optionIndex) => {
                const chosen = selectedAnswer === optionIndex
                const isStruck = (struck[currentQuestion.id] || []).includes(optionIndex)
                const isRevealed = revealed[currentQuestion.id] && mode === 'practice'
                const isCorrect = optionIndex === currentQuestion.correctAnswer
                return <div className={`exam-option-row ${chosen ? 'exam-option-selected' : ''} ${isStruck ? 'exam-option-struck' : ''} ${isRevealed && isCorrect ? 'exam-option-correct' : ''} ${isRevealed && chosen && !isCorrect ? 'exam-option-incorrect' : ''}`} key={`${currentQuestion.id}-${optionIndex}`}>
                  <button type="button" className="exam-option-main" onClick={() => setAnswers((previous) => ({ ...previous, [currentQuestion.id]: optionIndex }))} onContextMenu={(event) => { event.preventDefault(); toggleStrike(currentQuestion.id, optionIndex) }} aria-pressed={chosen}>
                    <span className="exam-option-letter">{String.fromCharCode(65 + optionIndex)}</span><span className="exam-option-text">{option}</span>{chosen && <span className="exam-selected-check"><Check size={15} /></span>}{isRevealed && isCorrect && <span className="exam-selected-check correct-check"><Check size={15} /></span>}
                  </button>
                  <button type="button" className={`strike-option ${isStruck ? 'strike-active' : ''}`} onClick={() => toggleStrike(currentQuestion.id, optionIndex)} title={tr ? 'Seçeneğin üzerini çiz' : 'Strike through option'} aria-label={tr ? 'Seçeneği ele' : 'Eliminate option'}><Slash size={15} /></button>
                </div>
              })}
            </div>

            {mode === 'practice' && revealed[currentQuestion.id] && <div className={`exam-explanation ${selectedAnswer === currentQuestion.correctAnswer ? 'exam-explanation-correct' : 'exam-explanation-incorrect'}`}><div className="exam-explanation-title"><span>{selectedAnswer === currentQuestion.correctAnswer ? <CheckCircle2 size={17} /> : <Lightbulb size={17} />}</span><strong>{selectedAnswer === currentQuestion.correctAnswer ? (tr ? 'Doğru yanıt' : 'Correct') : (tr ? `Doğru yanıt: ${answerLetter(currentQuestion.correctAnswer)}` : `Correct answer: ${answerLetter(currentQuestion.correctAnswer)}`)}</strong></div><p>{tr ? currentQuestion.explanationTr || currentQuestion.explanation : currentQuestion.explanation}</p><div className="exam-key-takeaway"><strong>{tr ? 'AKILDA TUT' : 'KEY TAKEAWAY'}</strong><span>{tr ? currentQuestion.keyTakeaway : currentQuestion.keyTakeaway}</span></div><small>{tr ? 'Kaynak / kural' : 'Rule reference'}: {currentQuestion.ruleReference}</small></div>}

            {mode === 'practice' && selectedAnswer !== undefined && !revealed[currentQuestion.id] && <button className="check-answer-button" type="button" onClick={() => setRevealed((previous) => ({ ...previous, [currentQuestion.id]: true }))}><CheckCircle2 size={16} />{tr ? 'Yanıtı kontrol et' : 'Check answer'}</button>}

            <div className="exam-card-footer"><span>{tr ? 'Kısayol' : 'Shortcut'} <kbd>1</kbd>–<kbd>4</kbd> {tr ? 'yanıt seç' : 'to select'}</span><span>{tr ? 'Üzerini çizmek için' : 'Right-click or tap'} <Slash size={12} /> {tr ? 'simgesine dokun' : 'to eliminate'}</span></div>
          </div>

          <div className="exam-navigation-row"><button className="button button-outline" type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}><ChevronLeft size={17} />{tr ? 'Önceki soru' : 'Previous question'}</button><div className="navigation-center"><span>{answeredCount} / {questions.length} {tr ? 'yanıtlandı' : 'answered'}</span><button type="button" onClick={() => openReview('all')}><Grid2X2 size={14} />{tr ? 'Soru listesi' : 'Question list'}</button></div><button className="button button-primary" type="button" disabled={currentIndex === questions.length - 1} onClick={() => setCurrentIndex((index) => Math.min(questions.length - 1, index + 1))}>{tr ? 'Sonraki soru' : 'Next question'}<ChevronRight size={17} /></button></div>
        </main>

        <aside className="exam-sidebar">
          <div className="exam-sidebar-head"><div><p className="eyebrow">{tr ? 'SINAV PANELİ' : 'EXAM PANEL'}</p><h3>{tr ? 'İlerleme' : 'Progress'}</h3></div><button type="button" className="sidebar-grid-button" onClick={() => openReview('all')} aria-label={tr ? 'Soru listesi' : 'Question list'}><Grid2X2 size={16} /></button></div>
          <div className="exam-progress-stats"><div><span className="status-mini status-answered" /><strong>{answeredCount}</strong><small>{tr ? 'yanıtlandı' : 'Answered'}</small></div><div><span className="status-mini status-flagged" /><strong>{flaggedCount}</strong><small>{tr ? 'işaretli' : 'Flagged'}</small></div><div><span className="status-mini status-unanswered" /><strong>{questions.length - answeredCount}</strong><small>{tr ? 'boş' : 'Unanswered'}</small></div></div>
          <div className="exam-question-grid" aria-label={tr ? 'Soru numaraları' : 'Question numbers'}>{questions.map((question, index) => { const status = statusFor(question, answers, flagged.includes(question.id)); return <button key={question.id} className={`question-grid-item ${status} ${index === currentIndex ? 'current' : ''}`} type="button" onClick={() => setCurrentIndex(index)} aria-label={`${tr ? 'Soru' : 'Question'} ${index + 1}${flagged.includes(question.id) ? (tr ? ', işaretli' : ', flagged') : ''}`}>{index + 1}{flagged.includes(question.id) && <span className="question-grid-flag">•</span>}</button> })}</div>
          <button className="sidebar-review-button" type="button" onClick={() => openReview('all')}><Grid2X2 size={15} />{tr ? 'Yanıtları gözden geçir' : 'Review your answers'}<ArrowRight size={14} /></button>
          <div className="exam-sidebar-hint"><span><Lightbulb size={15} /></span><p><strong>{tr ? 'Sınav ipucu' : 'Exam tip'}</strong>{tr ? 'Zorlandığın soruları işaretle; bitirmeden önce soru listesinde kolayca geri dön.' : 'Flag tough questions and revisit them from the question list before you submit.'}</p></div>
          <div className="exam-outline-box"><span className="outline-lock"><LockKeyhole size={14} /></span><strong>{tr ? 'Resmî sınav biçimi' : 'Official-style format'}</strong><p>{tr ? 'Resmî biçim: 85 soru / 105 dakika (75 puanlanan + 10 puanlanmayan). Bu deneme 85 sorunun tümünü puanlar; sonuç tahmindir.' : 'Official format: 85 questions / 105 minutes (75 scored + 10 unscored). This simulator scores all 85, so results are estimates.'}</p><a href="https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam" target="_blank" rel="noreferrer">{tr ? 'FINRA sınav bilgisi' : 'FINRA exam details'}<ArrowRight size={12} /></a></div>
        </aside>
      </div>

      {dialog === 'calculator' && <Modal title={tr ? 'Hesap makinesi' : 'Calculator'} onClose={() => setDialog(null)}><div className="exam-calculator-modal"><CalculatorPad language={language} /><p className="modal-footnote">{tr ? 'Hesaplama belleği bu oturum süresince geçerlidir.' : 'Calculator state is available for this session.'}</p></div></Modal>}
      {dialog === 'scratchpad' && <Modal title={tr ? 'Not defteri' : 'Scratchpad'} onClose={() => setDialog(null)}><div className="scratchpad-modal"><p>{tr ? 'Hesaplamalarını ve kısa notlarını yaz. Notlar yalnızca bu oturum süresince saklanır.' : 'Work through calculations and jot down notes. Notes stay only for this exam session.'}</p><textarea value={scratchpad} onChange={(event) => setScratchpad(event.target.value)} placeholder={tr ? 'Notlarını buraya yaz...' : 'Write your scratch notes here...'} autoFocus /><div className="scratchpad-footer"><span>{scratchpad.length} {tr ? 'karakter' : 'characters'}</span><button className="button button-primary" type="button" onClick={() => setDialog(null)}>{tr ? 'Notlara dön' : 'Back to exam'}</button></div></div></Modal>}
      {dialog === 'review' && <Modal title={tr ? 'Soru gözden geçirme' : 'Question review'} onClose={() => setDialog(null)} wide><div className="review-modal-content"><div className="review-modal-stats"><span><i className="status-mini status-answered" />{answeredCount} {tr ? 'yanıtlandı' : 'answered'}</span><span><i className="status-mini status-flagged" />{flaggedCount} {tr ? 'işaretli' : 'flagged'}</span><span><i className="status-mini status-unanswered" />{questions.length - answeredCount} {tr ? 'boş' : 'unanswered'}</span></div><div className="review-filter-row"><div className="filter-chips"><button className={reviewFilter === 'all' ? 'filter-chip active' : 'filter-chip'} type="button" onClick={() => setReviewFilter('all')}>{tr ? 'Tümü' : 'All'}</button><button className={reviewFilter === 'flagged' ? 'filter-chip active' : 'filter-chip'} type="button" onClick={() => setReviewFilter('flagged')}>{tr ? 'İşaretliler' : 'Flagged'}</button><button className={reviewFilter === 'unanswered' ? 'filter-chip active' : 'filter-chip'} type="button" onClick={() => setReviewFilter('unanswered')}>{tr ? 'Boşlar' : 'Unanswered'}</button></div><span>{tr ? 'Soruyu açmak için numaraya tıkla' : 'Select a number to jump to that question'}</span></div><div className="review-grid">{questions.map((question, index) => { const isFlagged = flagged.includes(question.id); const isAnswered = answers[question.id] !== undefined; const include = reviewFilter === 'all' || (reviewFilter === 'flagged' && isFlagged) || (reviewFilter === 'unanswered' && !isAnswered); if (!include) return null; return <button key={question.id} className={`review-grid-cell ${isAnswered ? 'answered' : 'unanswered'} ${isFlagged ? 'flagged' : ''} ${index === currentIndex ? 'current' : ''}`} type="button" onClick={() => navigateTo(index)}><strong>{index + 1}</strong><small>{answerLetter(answers[question.id])}</small>{isFlagged && <Flag size={11} fill="currentColor" />}</button> })}</div><div className="review-modal-footer"><span>{tr ? 'İşaretli sorular yanıtsız da olabilir.' : 'A flagged question can still be unanswered.'}</span><button className="button button-primary" type="button" onClick={() => setDialog(null)}>{tr ? 'Sınava dön' : 'Return to exam'}</button></div></div></Modal>}
      {dialog === 'finish' && <Modal title={tr ? 'Sınavı bitirmek istiyor musun?' : 'Ready to finish?'} onClose={() => setDialog(null)}><div className="finish-confirm-modal"><span className="finish-confirm-icon"><CircleHelp size={21} /></span><p>{tr ? 'Göndermeden önce durumunu gözden geçir.' : 'Take a moment to review your progress before submitting.'}</p><div className="finish-confirm-stats"><span><strong>{answeredCount}</strong><small>{tr ? 'yanıtlandı' : 'answered'}</small></span><span><strong>{questions.length - answeredCount}</strong><small>{tr ? 'boş' : 'unanswered'}</small></span><span><strong>{flaggedCount}</strong><small>{tr ? 'işaretli' : 'flagged'}</small></span></div>{questions.length > answeredCount && <button type="button" className="finish-review-link" onClick={() => openReview('unanswered')}>{tr ? 'Boş sorulara git' : 'Review unanswered questions'}<ArrowRight size={14} /></button>}<div className="confirm-actions"><button type="button" className="button button-outline" onClick={() => setDialog(null)}>{tr ? 'Devam et' : 'Keep working'}</button><button type="button" className="button button-primary" onClick={finish}>{tr ? 'Sınavı gönder' : 'Submit exam'}<ArrowRight size={15} /></button></div></div></Modal>}
      {dialog === 'exit' && <Modal title={tr ? 'Çalışmadan çık?' : 'Leave this session?'} onClose={() => setDialog(null)}><div className="finish-confirm-modal"><span className="finish-confirm-icon exit-confirm-icon"><CircleHelp size={21} /></span><p>{tr ? 'Bu oturum henüz tamamlanmadı. Şimdi çıkarsan cevapların sonuç olarak kaydedilmez.' : 'This session is not finished. If you leave now, your answers will not be saved as a result.'}</p><div className="confirm-actions"><button type="button" className="button button-outline" onClick={() => setDialog(null)}>{tr ? 'Sınavda kal' : 'Stay in session'}</button><button type="button" className="button button-danger" onClick={onExit}>{tr ? 'Çık' : 'Leave session'}<ArrowRight size={15} /></button></div></div></Modal>}
    </div>
  )
}

function ExamResults({ result, language, onExit }) {
  const tr = language === 'tr'
  const [filter, setFilter] = useState('incorrect')
  const [expanded, setExpanded] = useState(null)
  const isMock = result.mode === 'mock'
  const qualifies = result.score >= 70
  const visibleAnswers = useMemo(() => result.questionResults.filter((item) => {
    if (filter === 'all') return true
    if (filter === 'incorrect') return item.selectedAnswer !== item.correctAnswer
    if (filter === 'unanswered') return item.selectedAnswer === null
    return item.selectedAnswer === item.correctAnswer
  }), [result.questionResults, filter])


  return (
    <div className="exam-results-page page-enter">
      <header className="results-topbar"><div className="exam-brand"><span className="brand-mark-small">S</span><span><strong>SIE<span>PREP</span></strong><small>{tr ? 'OTURUM SONUCU' : 'SESSION RESULTS'}</small></span></div><button className="button button-outline" type="button" onClick={onExit}><ArrowLeft size={15} />{tr ? 'Panele dön' : 'Back to dashboard'}</button></header>
      <main className="results-content">
        <div className="results-overline"><span className="results-check-icon"><CheckCircle2 size={16} /></span>{isMock ? (tr ? 'TAM DENEME TAMAMLANDI' : 'FULL MOCK COMPLETE') : (tr ? 'ÇALIŞMA OTURUMU TAMAMLANDI' : 'PRACTICE SESSION COMPLETE')}</div>
        <section className="results-hero-panel"><div className="result-score-ring" style={{ '--score': `${result.score * 3.6}deg` }}><div><strong>{result.score}<small>%</small></strong><span>{tr ? 'tahmini puan' : 'practice score'}</span></div></div><div className="result-hero-copy"><span className={`result-benchmark ${qualifies ? 'benchmark-ready' : 'benchmark-needs-work'}`}><span />{qualifies ? (tr ? '70% karşılaştırma eşiğinin üstünde' : 'Above the 70% reference benchmark') : (tr ? '70% karşılaştırma eşiğinin altında' : 'Below the 70% reference benchmark')}</span><h1>{qualifies ? (tr ? 'İyi ilerleme. Aynen devam.' : 'Solid progress. Keep going.') : (tr ? 'Her tekrar seni ileri taşır.' : 'Every review moves you forward.')}</h1><p>{tr ? `${result.total} sorudan ${result.correct} tanesini doğru yanıtladın.` : `You answered ${result.correct} of ${result.total} questions correctly.`} {tr ? 'Bu bir çalışma tahminidir; FINRA geçme garantisi veya resmî puan değildir.' : 'This is a practice estimate—not an official FINRA score or a guarantee of passing.'}</p><div className="result-summary-stats"><div><strong>{result.correct}</strong><span>{tr ? 'doğru' : 'Correct'}</span></div><i /><div><strong>{result.total - result.correct - result.unanswered}</strong><span>{tr ? 'yanlış' : 'Incorrect'}</span></div><i /><div><strong>{result.unanswered}</strong><span>{tr ? 'boş' : 'Unanswered'}</span></div><i /><div><strong>{result.total}</strong><span>{tr ? 'toplam' : 'Total'}</span></div></div></div></section>

        <div className="results-breakdown-grid">
          <section className="panel results-sections-panel"><div className="panel-header"><div><p className="eyebrow">{tr ? 'BÖLÜM ANALİZİ' : 'SECTION BREAKDOWN'}</p><h3>{tr ? 'Güçlü ve gelişecek alanlar' : 'Strengths & opportunities'}</h3></div><span className="results-icon-badge"><Target size={17} /></span></div><div className="results-section-list">{result.sectionScores.map((item) => <div className="results-section-row" key={item.section}><div className="results-section-label"><span className={`result-section-number result-section-${item.section}`}>0{item.section}</span><span><strong>{tr ? item.sectionNameTr : item.sectionName}</strong><small>{item.correct}/{item.total} {tr ? 'doğru' : 'correct'}</small></span><b>{item.score}%</b></div><div className="progress-track"><i className={`result-progress-${item.section}`} style={{ width: `${item.score}%` }} /></div></div>)}</div><p className="section-result-note">{tr ? 'Resmî sınav puanlamasında deneme soruları ve bölüm ağırlıkları farklı olabilir. Sonuç, yalnızca bu setteki soruları özetler.' : 'Official scoring and section weighting may differ; this summary reflects only the questions in this practice set.'}</p></section>

          <section className="panel next-steps-panel"><div className="panel-header"><div><p className="eyebrow">{tr ? 'SONRAKİ ADIM' : 'NEXT STEP'}</p><h3>{tr ? 'Yanlışları çalış' : 'Review and improve'}</h3></div><span className="next-step-icon"><Lightbulb size={18} /></span></div><p>{tr ? 'Yanlış ve boş soruları açıp açıklamasını oku. Ardından zayıf olduğun bölümü odaklı pratikle tekrar et.' : 'Open missed questions, read the explanations, and revisit the topics that need another pass.'}</p><div className="next-step-actions"><button className="button button-primary" type="button" onClick={() => { setFilter('incorrect'); document.getElementById('result-review')?.scrollIntoView({ behavior: 'smooth' }) }}><RotateCcw size={15} />{tr ? 'Yanlışları gözden geçir' : 'Review missed questions'}<ArrowRight size={14} /></button><span><Clock3 size={14} />{tr ? 'Her cevabın kaynak notu var' : 'Rule references included'}</span></div><div className="result-time-chip"><Clock3 size={15} /><span>{isMock ? (tr ? 'Süreli deneme' : 'Timed simulation') : (tr ? 'Süresiz pratik' : 'Untimed practice')}</span><strong>{isMock ? '105 min' : `${result.total} ${tr ? 'soru' : 'questions'}`}</strong></div></section>
        </div>

        <section className="panel result-review-panel" id="result-review"><div className="result-review-header"><div><p className="eyebrow">{tr ? 'YANIT İNCELEMESİ' : 'ANSWER REVIEW'}</p><h3>{tr ? 'Soruların ve açıklamalar' : 'Questions & explanations'}</h3></div><div className="filter-chips"><button type="button" className={filter === 'incorrect' ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter('incorrect')}>{tr ? 'Yanlış / boş' : 'Missed'}<span>{result.total - result.correct}</span></button><button type="button" className={filter === 'correct' ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter('correct')}>{tr ? 'Doğru' : 'Correct'}<span>{result.correct}</span></button><button type="button" className={filter === 'all' ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter('all')}>{tr ? 'Tümü' : 'All'}<span>{result.total}</span></button></div></div>
          <div className="result-review-list">{visibleAnswers.map((item) => { const open = expanded === item.questionId; const wrong = item.selectedAnswer !== item.correctAnswer; const questionText = tr ? item.questionTr || item.question : item.question; const options = tr ? item.optionsTr || item.options : item.options; return <article className={`result-review-item ${wrong ? 'review-item-wrong' : 'review-item-correct'}`} key={item.questionId}><button className="result-review-question" type="button" onClick={() => setExpanded(open ? null : item.questionId)}><span className={`result-review-icon ${wrong ? 'review-icon-wrong' : 'review-icon-correct'}`}>{wrong ? <X size={14} /> : <Check size={14} />}</span><span><small>{tr ? `SORU ${result.questionResults.findIndex((q) => q.questionId === item.questionId) + 1} · BÖLÜM ${item.section}` : `QUESTION ${result.questionResults.findIndex((q) => q.questionId === item.questionId) + 1} · SECTION ${item.section}`}</small><strong>{questionText}</strong></span><span className="review-answer-summary"><small>{tr ? 'Senin yanıtın' : 'Your answer'}</small><strong>{answerLetter(item.selectedAnswer)}<i> / </i>{answerLetter(item.correctAnswer)}</strong></span>{open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}</button>{open && <div className="result-review-details"><div className="result-review-options">{options.map((option, index) => <div key={`${item.questionId}-${index}`} className={`result-option ${index === item.correctAnswer ? 'result-option-correct' : ''} ${index === item.selectedAnswer && index !== item.correctAnswer ? 'result-option-wrong' : ''}`}><span>{String.fromCharCode(65 + index)}</span><p>{option}</p>{index === item.correctAnswer && <Check size={15} />}{index === item.selectedAnswer && index !== item.correctAnswer && <X size={15} />}</div>)}</div><div className="result-explanation"><p>{tr ? item.explanationTr || item.explanation : item.explanation}</p><div><strong>{tr ? 'Kural / kaynak' : 'Rule reference'}:</strong> {item.ruleReference}</div><span><Lightbulb size={14} />{tr ? item.keyTakeaway : item.keyTakeaway}</span></div></div>}</article> })}{!visibleAnswers.length && <div className="empty-state"><CheckCircle2 size={23} /><h3>{tr ? 'Gözden geçirilecek soru yok' : 'Nothing to review here'}</h3><p>{tr ? 'Bu filtrede sonuç bulunamadı.' : 'There are no questions in this filter.'}</p></div>}</div>
        </section>
        <div className="results-footer-note"><span><LockKeyhole size={13} />{tr ? 'Bu deneme skoru çalışma tahminidir; resmi FINRA puan kartı değildir.' : 'Practice estimate only; this is not an official FINRA score report.'}</span><button className="text-button" type="button" onClick={onExit}>{tr ? 'Panele dön' : 'Return to dashboard'}<ArrowRight size={14} /></button></div>
      </main>
    </div>
  )
}

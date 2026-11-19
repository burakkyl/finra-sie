import { useMemo, useState } from 'react'
import { ArrowRight, BookOpenCheck, Check, ChevronDown, ChevronUp, CircleHelp, LockKeyhole, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { SECTIONS } from '../data/questions'

export default function QuestionBank({ language = 'en', questions, hasPremium = false, initialSection = null, initialSearch = '', onUpgrade, onStartPractice }) {
  const tr = language === 'tr'
  const [search, setSearch] = useState(initialSearch)
  const [section, setSection] = useState(initialSection ? String(initialSection) : 'all')
  const [difficulty, setDifficulty] = useState('all')
  const [answers, setAnswers] = useState({})
  const [expanded, setExpanded] = useState({})


  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return questions.filter((item) => {
      const matchesSection = section === 'all' || String(item.section) === section
      const matchesDifficulty = difficulty === 'all' || item.difficulty.toLowerCase() === difficulty
      const haystack = [item.topic, item.question, item.questionTr, item.sectionName, ...item.options, ...item.optionsTr].join(' ').toLowerCase()
      return matchesSection && matchesDifficulty && (!query || haystack.includes(query))
    })
  }, [questions, search, section, difficulty])

  const visibleQuestions = hasPremium ? filtered : filtered.slice(0, 8)
  const correctLabel = tr ? 'Doğru cevap' : 'Correct answer'

  const selectAnswer = (questionId, answerIndex) => {
    setAnswers((current) => ({ ...current, [questionId]: answerIndex }))
  }

  const toggleExpanded = (questionId) => setExpanded((current) => ({ ...current, [questionId]: !current[questionId] }))

  return (
    <div className="question-bank-page page-enter">
      <div className="page-title-block">
        <div><p className="eyebrow">{tr ? 'SIE SORU BANKASI' : 'SIE QUESTION BANK'}</p><h1>{tr ? 'Bilgini test et.' : 'Test what you know.'}</h1><p>{tr ? 'Dört sınav bölümünü ve üç zorluk seviyesini kapsayan özgün, sınav tarzı çalışma soruları.' : 'Original exam-style practice across all four content sections and three difficulty levels.'}</p></div>
        <button className="button button-primary" type="button" onClick={() => onStartPractice?.(section === 'all' ? null : Number(section), difficulty === 'all' ? null : difficulty)}><BookOpenCheck size={16} />{tr ? 'Bu sorulardan çalış' : 'Practice these questions'}<ArrowRight size={15} /></button>
      </div>

      <div className="bank-disclaimer"><CircleHelp size={16} /><span>{tr ? 'Bu bankadaki sorular sınav planına dayalı özgün çalışma sorularıdır; güvenli veya telifli canlı FINRA sınav soruları değildir.' : 'These are original practice questions based on the exam outline—not copied secure or copyrighted live FINRA exam items.'}</span></div>

      <div className="bank-toolbar">
        <label className="bank-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={tr ? 'Konu, terim veya soru ara...' : 'Search topics, terms, or questions...'} /><kbd>⌘ K</kbd></label>
        <div className="filter-control"><SlidersHorizontal size={15} /><select value={section} onChange={(event) => setSection(event.target.value)} aria-label={tr ? 'Bölüme göre filtrele' : 'Filter by section'}><option value="all">{tr ? 'Tüm bölümler' : 'All sections'}</option>{Object.values(SECTIONS).map((item) => <option key={item.id} value={item.id}>{tr ? `Bölüm ${item.id}` : `Section ${item.id}`}</option>)}</select><ChevronDown size={14} /></div>
        <div className="filter-control"><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)} aria-label={tr ? 'Zorluk seviyesine göre filtrele' : 'Filter by difficulty'}><option value="all">{tr ? 'Tüm seviyeler' : 'All levels'}</option><option value="easy">{tr ? 'Kolay' : 'Easy'}</option><option value="medium">{tr ? 'Orta' : 'Medium'}</option><option value="hard">{tr ? 'Zor' : 'Hard'}</option></select><ChevronDown size={14} /></div>
        <span className="bank-count"><strong>{filtered.length}</strong> {tr ? 'soru' : 'questions'}</span>
      </div>

      {section === 'all' && <div className="bank-section-shortcuts">{Object.values(SECTIONS).map((item) => <button key={item.id} className={`section-shortcut shortcut-${item.id}`} type="button" onClick={() => setSection(String(item.id))}><span className="shortcut-index">0{item.id}</span><span><strong>{tr ? `Bölüm ${item.id}` : `Section ${item.id}`}</strong><small>{tr ? item.nameTr : item.name}</small></span><span className="shortcut-percent">{item.weight}</span></button>)}</div>}

      <div className="bank-results-heading"><div><span className="bank-results-dot" />{tr ? 'ÇALIŞMA SORULARI' : 'PRACTICE QUESTIONS'}<span className="bank-results-number">{visibleQuestions.length} / {filtered.length}</span></div><span>{tr ? 'Seçeneklerden birine tıklayarak yanıtla' : 'Select an option to answer'}</span></div>

      <div className="question-list">
        {visibleQuestions.map((item, index) => {
          const chosen = answers[item.id]
          const hasAnswered = chosen !== undefined
          const isOpen = expanded[item.id] !== false
          const prompt = tr ? item.questionTr || item.question : item.question
          const options = tr ? item.optionsTr || item.options : item.options
          const explanation = tr ? item.explanationTr || item.explanation : item.explanation
          return (
            <article className={`bank-question-card ${hasAnswered ? (chosen === item.correctAnswer ? 'bank-answered-correct' : 'bank-answered-wrong') : ''}`} key={item.id}>
              <div className="bank-question-top" role="button" tabIndex="0" onClick={() => toggleExpanded(item.id)} onKeyDown={(event) => event.key === 'Enter' && toggleExpanded(item.id)}>
                <span className="bank-question-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="bank-question-heading"><span className="bank-topic">{item.topic}</span><strong>{prompt}</strong><span className="bank-question-meta"><span>{tr ? `Bölüm ${item.section}` : `Section ${item.section}`}</span><i />{item.ruleReference}</span></span>
                <span className={`difficulty-pill difficulty-${item.difficulty.toLowerCase()}`}>{tr ? ({ Easy: 'Kolay', Medium: 'Orta', Hard: 'Zor' }[item.difficulty]) : item.difficulty}</span>
                {isOpen ? <ChevronUp size={17} className="bank-collapse-icon" /> : <ChevronDown size={17} className="bank-collapse-icon" />}
              </div>
              {isOpen && <div className="bank-question-body">
                <div className="bank-options">
                  {options.map((option, optionIndex) => {
                    const isCorrect = optionIndex === item.correctAnswer
                    const isSelected = chosen === optionIndex
                    const className = `bank-option ${hasAnswered && isCorrect ? 'option-correct' : ''} ${isSelected && !isCorrect ? 'option-wrong' : ''}`
                    return <button key={`${item.id}-${optionIndex}`} className={className} type="button" onClick={() => selectAnswer(item.id, optionIndex)}><span className="bank-option-letter">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>{hasAnswered && isCorrect && <Check size={16} />}{isSelected && !isCorrect && <X size={15} />}</button>
                  })}
                </div>
                {hasAnswered && <div className={`bank-explanation ${chosen === item.correctAnswer ? 'explanation-right' : 'explanation-wrong'}`}><div className="explanation-heading"><Check size={15} />{chosen === item.correctAnswer ? (tr ? 'Doğru bildin' : 'That’s right') : (tr ? 'Tekrar gözden geçir' : 'Review this one')}<span>{correctLabel}: {String.fromCharCode(65 + item.correctAnswer)}</span></div><p>{explanation}</p><small><strong>{tr ? 'Kural / kaynak:' : 'Rule reference:'}</strong> {item.ruleReference}</small></div>}
              </div>}
            </article>
          )
        })}
      </div>

      {!visibleQuestions.length && <div className="empty-state"><Search size={24} /><h3>{tr ? 'Eşleşen soru bulunamadı' : 'No matching questions'}</h3><p>{tr ? 'Arama veya filtrelerini değiştirmeyi dene.' : 'Try changing your search or filters.'}</p><button className="button button-outline" type="button" onClick={() => { setSearch(''); setSection('all'); setDifficulty('all') }}>{tr ? 'Filtreleri temizle' : 'Clear filters'}</button></div>}

      {!hasPremium && filtered.length > visibleQuestions.length && <div className="bank-locked-card"><span className="bank-lock-icon"><LockKeyhole size={18} /></span><div><strong>{tr ? `${filtered.length - visibleQuestions.length} soru daha kilitli` : `${filtered.length - visibleQuestions.length} more questions locked`}</strong><p>{tr ? 'Tüm soru bankasını açmak ve her seviyede çalışmak için plan seç.' : 'Unlock the complete question bank and practice every difficulty level.'}</p></div><button className="button button-primary" type="button" onClick={onUpgrade}>{tr ? 'Tüm soruların kilidini aç' : 'Unlock all questions'}<Sparkles size={14} /></button></div>}

      <div className="bank-footer-note"><span><Check size={13} />{tr ? 'Her soruda açıklama ve kaynak referansı bulunur.' : 'Explanations and rule references are included for every question.'}</span><span>{tr ? `${Object.values(SECTIONS).length} bölüm · Kolay / Orta / Zor` : '4 sections · Easy / Medium / Hard'}</span></div>
    </div>
  )
}

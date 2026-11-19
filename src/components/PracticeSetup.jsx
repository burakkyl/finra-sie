import { useMemo, useState } from 'react'
import { ArrowRight, BookOpenCheck, Check, Clock3, LockKeyhole, SlidersHorizontal, Sparkles } from 'lucide-react'
import { SECTIONS } from '../data/questions'

export default function PracticeSetup({ language = 'en', questions, hasPremium = false, onUpgrade, onStart, initialSettings = null }) {
  const tr = language === 'tr'
  const [section, setSection] = useState(initialSettings?.section ? String(initialSettings.section) : 'all')
  const [difficulty, setDifficulty] = useState(initialSettings?.difficulty || 'all')
  const [count, setCount] = useState(initialSettings?.count || (hasPremium ? 10 : 5))


  const available = useMemo(() => questions.filter((item) => (section === 'all' || item.section === Number(section)) && (difficulty === 'all' || item.difficulty.toLowerCase() === difficulty)), [questions, section, difficulty])
  const effectiveCount = Math.min(count, available.length)

  const start = () => {
    if (!hasPremium && count > 5) {
      onUpgrade?.()
      return
    }
    if (!available.length) return
    onStart?.({ section: section === 'all' ? null : Number(section), difficulty: difficulty === 'all' ? null : difficulty, count: effectiveCount })
  }

  return (
    <div className="practice-setup-page page-enter">
      <div className="page-title-block"><div><p className="eyebrow">{tr ? 'ODAKLI ÇALIŞMA' : 'FOCUSED PRACTICE'}</p><h1>{tr ? 'Bir çalışma seti oluştur.' : 'Build a practice set.'}</h1><p>{tr ? 'Bölümünü, zorluk seviyeni ve soru sayını seç. Çalışma ilerlemen bu tarayıcıda kalır.' : 'Choose a section, difficulty, and question count. Your study progress stays in this browser.'}</p></div><span className="no-account-chip"><Check size={14} />{tr ? 'Hesap gerekmez' : 'No account needed'}</span></div>

      <div className="practice-layout">
        <section className="panel practice-config-panel">
          <div className="practice-step-heading"><span>01</span><div><strong>{tr ? 'Çalışma kapsamını seç' : 'Choose your focus'}</strong><small>{tr ? 'Hedefini belirle' : 'Set your study target'}</small></div></div>
          <div className="config-field"><label>{tr ? 'Sınav bölümü' : 'Exam section'}</label><div className="config-option-grid section-option-grid"><button className={section === 'all' ? 'config-choice selected' : 'config-choice'} type="button" onClick={() => setSection('all')}><span>{tr ? 'Tüm bölümler' : 'All sections'}</span><small>{questions.length} {tr ? 'soru' : 'questions'}</small></button>{Object.values(SECTIONS).map((item) => <button className={section === String(item.id) ? 'config-choice selected' : 'config-choice'} type="button" key={item.id} onClick={() => setSection(String(item.id))}><span>{tr ? `Bölüm ${item.id}` : `Section ${item.id}`} <i>{item.weight}</i></span><small>{tr ? item.nameTr : item.name}</small></button>)}</div></div>

          <div className="config-field"><label>{tr ? 'Zorluk seviyesi' : 'Difficulty'}</label><div className="difficulty-choices"><button className={difficulty === 'all' ? 'difficulty-choice selected' : 'difficulty-choice'} type="button" onClick={() => setDifficulty('all')}><span className="level-dot level-all" />{tr ? 'Karışık' : 'Mixed'}</button><button className={difficulty === 'easy' ? 'difficulty-choice selected' : 'difficulty-choice'} type="button" onClick={() => setDifficulty('easy')}><span className="level-dot level-easy" />{tr ? 'Kolay' : 'Easy'}</button><button className={difficulty === 'medium' ? 'difficulty-choice selected' : 'difficulty-choice'} type="button" onClick={() => setDifficulty('medium')}><span className="level-dot level-medium" />{tr ? 'Orta' : 'Medium'}</button><button className={difficulty === 'hard' ? 'difficulty-choice selected' : 'difficulty-choice'} type="button" onClick={() => setDifficulty('hard')}><span className="level-dot level-hard" />{tr ? 'Zor' : 'Hard'}</button></div></div>

          <div className="config-field question-count-field"><div className="count-label-row"><label>{tr ? 'Soru sayısı' : 'Question count'}</label><span><strong>{effectiveCount}</strong> {tr ? 'soru hazır' : 'questions available'}</span></div><div className="count-choices">{[5, 10, 20].map((amount) => { const locked = !hasPremium && amount > 5; return <button key={amount} className={`${count === amount ? 'selected' : ''} ${locked ? 'count-locked' : ''}`} type="button" onClick={() => { if (locked) onUpgrade?.(); else setCount(amount) }}><strong>{amount}</strong><span>{tr ? 'soru' : 'questions'}</span>{locked && <LockKeyhole size={13} />}</button> })}</div>{!hasPremium && <div className="free-limit-note"><Sparkles size={14} />{tr ? 'Ücretsiz örnek: 5 soru. Planla 10 veya 20 soruluk setleri aç.' : 'Free sample: 5 questions. Unlock 10- or 20-question sets with a plan.'}<button type="button" onClick={onUpgrade}>{tr ? 'Planlar' : 'See plans'}<ArrowRight size={13} /></button></div>}</div>

          <div className="practice-config-footer"><span>{tr ? `${available.length} eşleşen soru` : `${available.length} matching questions`}</span><button className="button button-primary" type="button" onClick={start} disabled={!available.length}>{tr ? 'Çalışmayı başlat' : 'Start practice'}<ArrowRight size={16} /></button></div>
        </section>

        <aside className="practice-side-column">
          <div className="practice-summary-card"><span className="summary-orb"><BookOpenCheck size={22} /></span><p className="eyebrow">{tr ? 'ÇALIŞMA SETİN' : 'YOUR PRACTICE SET'}</p><h3>{effectiveCount} {tr ? 'soru' : 'questions'}</h3><p>{section === 'all' ? (tr ? 'Dört bölümden dengeli bir soru seti' : 'A balanced set across all four sections') : (tr ? SECTIONS[section].nameTr : SECTIONS[section].name)}</p><div className="summary-detail"><span><SlidersHorizontal size={14} />{difficulty === 'all' ? (tr ? 'Karışık zorluk' : 'Mixed difficulty') : (tr ? ({ easy: 'Kolay', medium: 'Orta', hard: 'Zor' }[difficulty]) : difficulty[0].toUpperCase() + difficulty.slice(1))}</span><span><Clock3 size={14} />{tr ? `~${Math.max(4, Math.round(effectiveCount * 1.4))} dakika` : `~${Math.max(4, Math.round(effectiveCount * 1.4))} min`}</span></div></div>
          <div className="practice-tip-card"><span className="tip-sparkle"><Sparkles size={15} /></span><strong>{tr ? 'Sınav ipucu' : 'Study tip'}</strong><p>{tr ? 'Her yanıtın açıklamasını oku. Yanlış cevaplar, hangi kuralı tekrar etmen gerektiğini gösterir.' : 'Read every explanation. Incorrect answers help identify the rule or concept to revisit.'}</p></div>
        </aside>
      </div>
    </div>
  )
}

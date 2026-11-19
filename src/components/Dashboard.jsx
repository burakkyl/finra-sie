import { useState } from 'react'
import { ArrowRight, BookOpenCheck, CalendarDays, CheckCircle2, ChevronRight, Clock3, Flame, LockKeyhole, Play, Sparkles, Target, Trophy } from 'lucide-react'
import { SECTIONS } from '../data/questions'

const SECTION_ACCENTS = ['#e7a241', '#4c86c6', '#4b9b82', '#8c79c5']
const formatDate = (timestamp, language) => new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US', { month: 'short', day: 'numeric' }).format(new Date(timestamp))

function calculateStreak(results, today) {
  const activeDays = new Set(results.map((result) => new Date(result.completedAt).toDateString()))
  const cursor = new Date(today)
  if (!activeDays.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1)
  let streak = 0
  while (activeDays.has(cursor.toDateString())) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export default function Dashboard({ language = 'en', questions, results = [], hasPremium = false, plan, isNative = false, storeProvider = 'App Store', onMock, onPractice, onUpgrade, onQuestions, onFlashcards, onReference }) {
  const tr = language === 'tr'
  const [today] = useState(() => new Date())
  const todayLabel = new Intl.DateTimeFormat(tr ? 'tr-TR' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(today)
  const studyStreak = calculateStreak(results, today)
  const latest = results[0]
  const average = results.length
    ? Math.round(results.reduce((sum, item) => sum + item.score, 0) / results.length)
    : null
  const sectionStats = [1, 2, 3, 4].map((sectionId) => {
    const sectionResults = results.flatMap((result) => result.sectionScores?.filter((section) => section.section === sectionId) || [])
    const attempted = sectionResults.reduce((sum, section) => sum + section.total, 0)
    const correct = sectionResults.reduce((sum, section) => sum + section.correct, 0)
    return { sectionId, attempted, score: attempted ? Math.round((correct / attempted) * 100) : 0 }
  })
  const recentPoints = results.slice(0, 7).reverse().map((result, index) => `${index * 42 + 4},${66 - Math.min(result.score, 100) * 0.52}`)
  const chartPoints = recentPoints.length > 1 ? recentPoints.join(' ') : '4,54 46,54 88,54 130,54 172,54 214,54 256,54'

  return (
    <div className="dashboard-page page-enter">
      <section className="dashboard-hero">
        <div className="dashboard-hero-content">
          <div className="hero-kicker"><span className="live-dot" />{tr ? 'SIE SINAV HAZIRLIK MASASI' : 'SIE EXAM PREP WORKSPACE'}</div>
          <h1>{tr ? 'Bir sonraki adımın: sınavı geçmek.' : 'Your next step: pass the exam.'}</h1>
          <p>{tr ? 'Kısa tekrarlar, gerçekçi sorular ve tam süreli denemelerle ilerlemeni takip et.' : 'Build momentum with focused practice, realistic questions, and full-length simulations.'}</p>
          <div className="hero-actions">
            <button className="button button-light" onClick={onMock} type="button"><Play size={16} fill="currentColor" />{tr ? 'Tam denemeyi başlat' : 'Start full mock exam'}<LockKeyhole size={14} className="button-lock" /></button>
            <button className="button button-ghost-light" onClick={onPractice} type="button">{tr ? '5 soruluk ücretsiz tekrar' : 'Try a 5-question sample'}<ArrowRight size={15} /></button>
          </div>
          <div className="hero-footnote"><ShieldCheckMini />{isNative ? (tr ? 'Hesap yok. İlerlemen bu cihazda saklanır.' : 'No account. Your progress stays on this device.') : (tr ? 'Hesap yok. İlerlemen bu tarayıcıda saklanır.' : 'No account. Your progress stays in this browser.')}</div>
        </div>
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="hero-exam-card">
          <div className="exam-card-topline"><span>{tr ? 'DENEME ÖZETİ' : 'EXAM SNAPSHOT'}</span><span className="exam-card-dot"><span /></span></div>
          <div className="exam-card-score">{latest ? `${latest.score}%` : '—'}</div>
          <div className="exam-card-caption">{latest ? (tr ? 'son deneme skoru' : 'last practice score') : (tr ? 'başlamak için hazır' : 'ready when you are')}</div>
          <div className="exam-card-divider" />
          <div className="exam-card-bottom">
            <div><span className="mini-label">{tr ? 'SORU BANKASI' : 'QUESTION BANK'}</span><strong>{questions.length}</strong></div>
            <div><span className="mini-label">{tr ? 'DENEME SÜRESİ' : 'MOCK TIME'}</span><strong>105 <small>min</small></strong></div>
          </div>
          <div className="exam-card-watermark">SIE</div>
        </div>
      </section>

      <div className="dashboard-heading-row">
        <div><p className="eyebrow">{tr ? 'GENEL BAKIŞ' : 'OVERVIEW'}</p><h2>{tr ? 'Çalışma panelin' : 'Your study dashboard'}</h2></div>
        <span className="date-chip"><CalendarDays size={15} />{todayLabel}</span>
      </div>

      <section className="metric-grid">
        <article className="metric-card">
          <div className="metric-icon metric-icon-blue"><BookOpenCheck size={19} /></div>
          <div className="metric-label">{tr ? 'Soru bankası' : 'Question bank'}</div>
          <div className="metric-value">{questions.length}<span>{tr ? ' soru' : ' questions'}</span></div>
          <div className="metric-foot"><span className="metric-dot dot-blue" />{tr ? '4 sınav bölümü' : 'Across 4 exam sections'}</div>
        </article>
        <article className="metric-card">
          <div className="metric-icon metric-icon-green"><Target size={19} /></div>
          <div className="metric-label">{tr ? 'Deneme ortalaması' : 'Mock average'}</div>
          <div className="metric-value">{average === null ? '—' : `${average}%`}</div>
          <div className="metric-foot"><span className="metric-dot dot-green" />{results.length ? `${results.length} ${tr ? 'tamamlanan çalışma' : 'completed sessions'}` : (tr ? 'İlk denemeni başlat' : 'Complete a session to begin')}</div>
        </article>
        <article className="metric-card">
          <div className="metric-icon metric-icon-amber"><Flame size={19} /></div>
          <div className="metric-label">{tr ? 'Çalışma serisi' : 'Study streak'}</div>
          <div className="metric-value">{studyStreak}<span>{tr ? ' gün' : ' day'}</span></div>
          <div className="metric-foot"><span className="metric-dot dot-amber" />{studyStreak ? (tr ? 'Serini sürdür' : 'Keep your streak going') : (tr ? 'Bugün bir oturum tamamla' : 'Finish a session today')}</div>
        </article>
        <article className="metric-card">
          <div className="metric-icon metric-icon-purple"><Trophy size={19} /></div>
          <div className="metric-label">{tr ? 'Son deneme' : 'Last session'}</div>
          <div className="metric-value metric-value-small">{latest ? formatDate(latest.completedAt, language) : (tr ? 'Henüz yok' : 'Not yet')}</div>
          <div className="metric-foot"><span className="metric-dot dot-purple" />{latest ? (latest.mode === 'mock' ? (tr ? 'Tam deneme' : 'Full mock') : (tr ? 'Soru pratiği' : 'Question practice')) : (tr ? 'İlk oturumunu planla' : 'Plan your first session')}</div>
        </article>
      </section>

      <div className="dashboard-content-grid">
        <section className="panel section-mastery-panel">
          <div className="panel-header">
            <div><p className="eyebrow">{tr ? 'SINAV İÇERİĞİ' : 'EXAM CONTENT'}</p><h3>{tr ? 'Bölümler ve ilerleme' : 'Sections & mastery'}</h3></div>
            <button className="text-button" type="button" onClick={onQuestions}>{tr ? 'Soru bankası' : 'Question bank'}<ChevronRight size={15} /></button>
          </div>
          <div className="section-mastery-list">
            {Object.values(SECTIONS).map((section, index) => {
              const stat = sectionStats.find((item) => item.sectionId === section.id)
              const count = questions.filter((item) => item.section === section.id).length
              return (
                <button className="mastery-row" key={section.id} type="button" onClick={() => onQuestions?.(section.id)}>
                  <span className="mastery-number" style={{ color: SECTION_ACCENTS[index], backgroundColor: `${SECTION_ACCENTS[index]}15` }}>{String(section.id).padStart(2, '0')}</span>
                  <span className="mastery-copy"><strong>{tr ? section.nameTr : section.name}</strong><small>{section.weight} {tr ? 'ağırlık' : 'of exam'} · {count} {tr ? 'soru' : 'questions'}</small><span className="progress-track"><i style={{ width: `${stat?.score || 0}%`, backgroundColor: SECTION_ACCENTS[index] }} /></span></span>
                  <span className="mastery-score">{stat?.attempted ? `${stat.score}%` : '—'}</span>
                  <ChevronRight size={16} className="mastery-chevron" />
                </button>
              )
            })}
          </div>
          <div className="panel-footnote"><span className="info-dot">i</span>{tr ? 'Ağırlıklar FINRA SIE içerik planını temel alır. Pratik skorları tahminidir.' : 'Section weights follow the FINRA SIE content outline. Practice scores are estimates.'}</div>
        </section>

        <section className="panel progress-panel">
          <div className="panel-header">
            <div><p className="eyebrow">{tr ? 'PERFORMANSIN' : 'YOUR PERFORMANCE'}</p><h3>{tr ? 'Son oturumlar' : 'Recent sessions'}</h3></div>
            <span className="mini-period">{tr ? 'SON 7' : 'LAST 7'}</span>
          </div>
          <div className="chart-area">
            <div className="chart-y-labels"><span>100</span><span>70</span><span>40</span><span>0</span></div>
            <svg viewBox="0 0 260 76" preserveAspectRatio="none" role="img" aria-label={tr ? 'Son deneme skorları grafiği' : 'Recent practice scores chart'}>
              <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#4f73eb" stopOpacity=".18" /><stop offset="100%" stopColor="#4f73eb" stopOpacity="0" /></linearGradient></defs>
              <path d={`M ${chartPoints.replaceAll(' ', ' L ')} L 256 76 L 4 76 Z`} fill="url(#chartFill)" />
              <polyline points={chartPoints} fill="none" stroke="#5877ee" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              {recentPoints.map((point, index) => { const [cx, cy] = point.split(','); return <circle key={`${point}-${index}`} cx={cx} cy={cy} r="3" fill="#fff" stroke="#5877ee" strokeWidth="2" /> })}
            </svg>
            {results.length < 2 && <div className="chart-empty-label">{tr ? 'Skor geçmişin burada görünecek' : 'Your score history will appear here'}</div>}
          </div>
          <div className="chart-axis"><span>{tr ? 'ÖNCE' : 'EARLIER'}</span><span>{tr ? 'SON' : 'LATEST'}</span></div>
          <div className="performance-foot"><span className="chart-legend"><i />{tr ? 'Deneme puanı' : 'Practice score'}</span><span>{results.length} {tr ? 'oturum' : 'sessions'}</span></div>
          {latest ? <div className="last-result-line"><span className="result-check"><CheckCircle2 size={16} /></span><span><strong>{tr ? 'Son sonuç' : 'Last result'}</strong><small>{latest.correct}/{latest.total} {tr ? 'doğru cevap' : 'correct answers'}</small></span><b>{latest.score}%</b></div> : <div className="empty-result-tip"><Sparkles size={15} />{tr ? 'İlk denemeni bitir; performans özetin burada görünsün.' : 'Finish your first practice to see a performance summary here.'}</div>}
        </section>
      </div>

      <section className="dashboard-lower-grid">
        <article className="panel continue-panel">
          <div className="panel-header"><div><p className="eyebrow">{tr ? 'ÖNERİLEN' : 'RECOMMENDED'}</p><h3>{tr ? 'Çalışmaya devam et' : 'Continue your prep'}</h3></div><span className="recommend-tag"><Sparkles size={12} />{tr ? 'BUGÜN' : 'TODAY'}</span></div>
          <div className="continue-card">
            <span className="continue-icon"><BookOpenCheck size={20} /></span>
            <div className="continue-copy"><strong>{tr ? 'Kısa ve odaklı pratik' : 'A focused question set'}</strong><span>{tr ? 'Zayıf olduğun bölümlere yönelik 5 soruyla başla.' : 'Start with 5 questions, then build up by section.'}</span><small><Clock3 size={13} />{tr ? 'Yaklaşık 8 dakika' : 'About 8 minutes'}<i />{tr ? 'Ücretsiz örnek' : 'Free sample'}</small></div>
            <button className="round-arrow" type="button" onClick={onPractice} aria-label={tr ? 'Pratiğe başla' : 'Start practice'}><ArrowRight size={17} /></button>
          </div>
          <div className="quick-links">
            <button type="button" onClick={onFlashcards}><span className="quick-link-icon quick-link-lilac"><Sparkles size={15} /></span><span><strong>{tr ? 'Flashcardlar' : 'Flashcards'}</strong><small>{tr ? 'Temel kavramları pekiştir' : 'Review high-yield concepts'}</small></span><ChevronRight size={15} /></button>
            <button type="button" onClick={onReference}><span className="quick-link-icon quick-link-mint"><BookOpenCheck size={15} /></span><span><strong>{tr ? 'Hızlı başvuru' : 'Quick reference'}</strong><small>{tr ? 'Formüller ve kurallar' : 'Formulas and key rules'}</small></span><ChevronRight size={15} /></button>
          </div>
        </article>

        <article className={`panel membership-panel ${hasPremium ? 'membership-active' : ''}`}>
          <div className="membership-topline"><span className="membership-badge"><Sparkles size={13} />{hasPremium ? (tr ? 'ERİŞİM AÇIK' : 'ACCESS ACTIVE') : (tr ? 'SIE PLUS' : 'SIE PLUS')}</span><span className="membership-no-login">{tr ? 'Giriş gerekmez' : 'No login required'}</span></div>
          <div className="membership-copy"><h3>{hasPremium ? (tr ? 'Tam çalışma alanın hazır.' : 'Your full study suite is ready.') : (tr ? 'Daha fazlasını, giriş yapmadan çalış.' : 'Go further, without an account.')}</h3><p>{hasPremium ? (plan ? (tr ? `${plan.nameTr} planın bu cihazda etkin.` : `${plan.name} plan active on this device.`) : '') : (tr ? 'Tam denemeler, tüm sorular ve kapsamlı çalışma araçlarının kilidini aç.' : 'Unlock full mock exams, every question, and the complete study toolkit.')}</p></div>
          <button className={`button ${hasPremium ? 'button-outline-light' : 'button-light'} membership-button`} onClick={hasPremium ? onUpgrade : onUpgrade} type="button">{hasPremium ? (tr ? 'Planı yönet' : 'Manage plan') : (tr ? 'Planları gör' : 'View plans')}<ArrowRight size={15} /></button>
          {!hasPremium && <div className="membership-price-hint">{isNative ? (tr ? `Fiyatlar ${storeProvider} tarafından gösterilir.` : `Prices shown by ${storeProvider}.`) : (tr ? 'Haftalık $7 · Aylık $19 · Ömür boyu $100 · web demo' : '$7 weekly · $19 monthly · $100 lifetime · web demo')}</div>}
        </article>
      </section>

      <div className="dashboard-bottom-note"><span><LockKeyhole size={13} />{tr ? 'Oturum açmadan çalışıyorsun' : 'You’re studying without an account'}</span><span>{isNative ? (tr ? 'İlerleme bu cihazda yerel olarak saklanır.' : 'Progress is stored locally on this device.') : (tr ? 'İlerleme yerel tarayıcı depolamasında tutulur.' : 'Progress is stored in local browser storage.')}</span></div>
    </div>
  )
}

function ShieldCheckMini() {
  return <span className="shield-mini"><CheckCircle2 size={13} /></span>
}

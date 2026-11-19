import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, LockKeyhole, RotateCcw, Shuffle, Sparkles, X } from 'lucide-react'
import { FLASHCARDS } from '../data/flashcards'

const KNOWN_KEY = 'sie-prep-known-flashcards-v1'
const CATEGORIES = ['All', 'Markets', 'Products', 'Trading', 'Regulation']

function readKnown() {
  try { return JSON.parse(window.localStorage.getItem(KNOWN_KEY) || '[]') } catch { return [] }
}

function stableRank(value, seed) {
  let hash = seed + 2166136261
  for (const character of value) hash = Math.imul(hash ^ character.charCodeAt(0), 16777619)
  return hash >>> 0
}

export default function FlashcardsPage({ language = 'en', hasPremium = false, onUpgrade }) {
  const tr = language === 'tr'
  const [known, setKnown] = useState(readKnown)
  const [category, setCategory] = useState('All')
  const [activeIndex, setActiveIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [shuffled, setShuffled] = useState(false)
  const [shuffleSeed, setShuffleSeed] = useState(0)

  useEffect(() => { window.localStorage.setItem(KNOWN_KEY, JSON.stringify(known)) }, [known])

  const deck = useMemo(() => {
    let cards = FLASHCARDS.filter((item) => category === 'All' || item.category === category)
    if (shuffled) cards = [...cards].sort((a, b) => stableRank(a.id, shuffleSeed) - stableRank(b.id, shuffleSeed))
    return hasPremium ? cards : cards.slice(0, 5)
  }, [category, hasPremium, shuffleSeed, shuffled])
  const card = deck[activeIndex]
  const knownCount = deck.filter((item) => known.includes(item.id)).length

  const changeCard = (delta) => {
    if (!deck.length) return
    setActiveIndex((current) => (current + delta + deck.length) % deck.length)
    setFlipped(false)
  }

  const toggleKnown = () => {
    if (!card) return
    setKnown((current) => current.includes(card.id) ? current.filter((id) => id !== card.id) : [...current, card.id])
    changeCard(1)
  }

  const selectCategory = (nextCategory) => {
    setCategory(nextCategory)
    setActiveIndex(0)
    setFlipped(false)
  }

  const toggleShuffle = () => {
    if (!shuffled) setShuffleSeed((seed) => seed + 1)
    setShuffled((value) => !value)
    setActiveIndex(0)
    setFlipped(false)
  }

  return (
    <div className="flashcards-page page-enter">
      <div className="page-title-block"><div><p className="eyebrow">{tr ? 'AKTİF HATIRLAMA' : 'ACTIVE RECALL'}</p><h1>{tr ? 'Bilgiyi hatırla, kalıcı hale getir.' : 'Recall it. Make it stick.'}</h1><p>{tr ? 'Sınavda sık karşılaşılan kavramları kısa tekrar kartlarıyla pekiştir.' : 'Review high-yield SIE concepts with quick, focused study cards.'}</p></div><div className="flashcards-total"><Sparkles size={16} /><strong>{FLASHCARDS.length}</strong><span>{tr ? 'kart' : 'cards'}</span></div></div>

      <div className="flashcard-toolbar"><div className="filter-chips">{CATEGORIES.map((item) => <button type="button" key={item} className={category === item ? 'filter-chip active' : 'filter-chip'} onClick={() => selectCategory(item)}>{tr ? (item === 'All' ? 'Tümü' : item === 'Markets' ? 'Piyasalar' : item === 'Products' ? 'Ürünler' : item === 'Trading' ? 'İşlemler' : 'Düzenleme') : item}</button>)}</div><button type="button" className={`tool-button ${shuffled ? 'tool-active' : ''}`} onClick={toggleShuffle}><Shuffle size={15} />{tr ? (shuffled ? 'Karıştırıldı' : 'Karıştır') : (shuffled ? 'Shuffled' : 'Shuffle')}</button></div>

      <div className="flashcard-workspace">
        <div className="flashcard-main-column">
          <div className="flashcard-progress-row"><span>{tr ? 'KART İLERLEMESİ' : 'DECK PROGRESS'}</span><span><strong>{deck.length ? activeIndex + 1 : 0}</strong> / {deck.length}</span></div>
          <div className="flashcard-progress-track"><i style={{ width: `${deck.length ? ((activeIndex + 1) / deck.length) * 100 : 0}%` }} /></div>
          {card ? (
            <button type="button" className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((value) => !value)} aria-label={tr ? 'Kartı çevir' : 'Flip flashcard'}>
              <span className="flashcard-topline"><span>{card.category.toUpperCase()}</span><span>{flipped ? (tr ? 'CEVAP' : 'ANSWER') : (tr ? 'KAVRAM' : 'CONCEPT')}</span></span>
              <span className="flashcard-center-content">
                <span className="flashcard-icon"><Sparkles size={19} /></span>
                <strong>{flipped ? (tr ? card.backTr : card.back) : (tr ? card.frontTr : card.front)}</strong>
                <small>{flipped ? (tr ? 'Cevabı gizlemek için karta tıkla' : 'Tap the card to hide the answer') : (tr ? 'Yanıtını düşün, sonra kartı çevir' : 'Think of the answer, then flip the card')}</small>
              </span>
              <span className="flashcard-flip-hint"><RotateCcw size={14} />{tr ? 'ÇEVİR' : 'FLIP CARD'}</span>
              {known.includes(card.id) && <span className="flashcard-known-stamp"><CheckCircle2 size={14} />{tr ? 'ÖĞRENİLDİ' : 'MASTERED'}</span>}
            </button>
          ) : <div className="empty-state"><Sparkles size={23} /><h3>{tr ? 'Bu kategoride kart yok' : 'No cards in this deck'}</h3></div>}

          <div className="flashcard-controls"><button type="button" className="button button-outline" onClick={() => changeCard(-1)}><ArrowLeft size={16} />{tr ? 'Önceki' : 'Previous'}</button><button type="button" className={`button ${card && known.includes(card.id) ? 'button-outline' : 'button-soft-danger'}`} onClick={() => { if (!card) return; setKnown((items) => items.filter((id) => id !== card.id)); setFlipped(false) }} disabled={!card || !known.includes(card.id)}><X size={15} />{tr ? 'Tekrar et' : 'Study again'}</button><button type="button" className="button button-soft-success" onClick={toggleKnown} disabled={!card}><Check size={15} />{tr ? 'Biliyorum' : 'Got it'}</button><button type="button" className="button button-outline" onClick={() => changeCard(1)}>{tr ? 'Sonraki' : 'Next'}<ArrowRight size={16} /></button></div>

          {!hasPremium && FLASHCARDS.length > deck.length && <div className="flashcards-locked"><span><LockKeyhole size={16} /></span><div><strong>{tr ? `${FLASHCARDS.length - deck.length} kart daha kilitli` : `${FLASHCARDS.length - deck.length} more cards are locked`}</strong><small>{tr ? 'Tüm konu setlerini açmak için bir plan seç.' : 'Unlock every topic deck with a plan.'}</small></div><button className="button button-primary" type="button" onClick={onUpgrade}>{tr ? 'Planları gör' : 'View plans'}<ArrowRight size={14} /></button></div>}
        </div>

        <aside className="flashcard-side-column">
          <div className="panel recall-panel"><p className="eyebrow">{tr ? 'BU OTURUM' : 'THIS SESSION'}</p><h3>{tr ? 'Tekrar durumun' : 'Your recall'}</h3><div className="recall-ring" style={{ '--recall-progress': `${deck.length ? (knownCount / deck.length) * 100 : 0}%` }}><div><strong>{deck.length ? Math.round((knownCount / deck.length) * 100) : 0}%</strong><span>{tr ? 'öğrenildi' : 'mastered'}</span></div></div><div className="recall-legend"><span><i className="recall-dot recall-dot-known" />{tr ? 'Biliyorum' : 'Mastered'}<strong>{knownCount}</strong></span><span><i className="recall-dot recall-dot-review" />{tr ? 'Tekrar et' : 'To review'}<strong>{Math.max(0, deck.length - knownCount)}</strong></span></div><p className="recall-tip">{tr ? 'Karta bakmadan yanıtı hatırlamaya çalış. Çalışmalar, aktif hatırlamanın bilgiyi kalıcılaştırdığını gösteriyor.' : 'Try to recall the answer before flipping. Active recall helps move concepts into long-term memory.'}</p></div>
          <div className="flashcard-session-card"><div className="session-check-icon"><CheckCircle2 size={17} /></div><strong>{tr ? 'İpucu' : 'Quick tip'}</strong><p>{tr ? 'Bir kartı “Biliyorum” olarak işaretlediğinde sonraki karta geçersin. İstediğin an önceki kartlara dönebilirsin.' : 'Mark a card “Got it” to move on. You can revisit any card using the navigation controls.'}</p></div>
        </aside>
      </div>
    </div>
  )
}

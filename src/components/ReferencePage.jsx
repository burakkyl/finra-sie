import { useMemo, useState } from 'react'
import { Calculator, ChevronDown, ChevronUp, LockKeyhole, Search, Sigma, Sparkles } from 'lucide-react'
import { CHEAT_SHEET, CHEAT_SHEET_CATEGORIES } from '../data/cheatsheet'
import CalculatorPad from './CalculatorPad'

export default function ReferencePage({ language = 'en', hasPremium = false, onUpgrade }) {
  const tr = language === 'tr'
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState('cs-01')
  const filtered = useMemo(() => CHEAT_SHEET.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category
    const query = search.trim().toLowerCase()
    const text = [item.title, item.titleTr, item.formula, item.formulaTr, item.detail, item.detailTr].join(' ').toLowerCase()
    return matchesCategory && (!query || text.includes(query))
  }), [category, search])
  const visible = hasPremium ? filtered : filtered.slice(0, 8)

  return (
    <div className="reference-page page-enter">
      <div className="page-title-block"><div><p className="eyebrow">{tr ? 'HIZLI BAŞVURU' : 'QUICK REFERENCE'}</p><h1>{tr ? 'Önemli formüller ve kurallar.' : 'High-yield formulas & rules.'}</h1><p>{tr ? 'Sınav öncesinde başvurabileceğin kısa, düzenli bir çalışma rehberi.' : 'A concise, organized study guide to revisit key SIE concepts before exam day.'}</p></div><span className="reference-badge"><Sigma size={17} />{CHEAT_SHEET.length} {tr ? 'özet' : 'quick notes'}</span></div>

      <div className="reference-layout">
        <section className="reference-main panel">
          <div className="reference-toolbar"><div className="filter-chips reference-chips">{CHEAT_SHEET_CATEGORIES.map((item) => <button type="button" key={item} className={category === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory(item)}>{tr ? (item === 'All' ? 'Tümü' : item === 'Options' ? 'Opsiyonlar' : item === 'Bonds & Rates' ? 'Tahvil ve faiz' : item === 'Funds & Products' ? 'Fon ve ürünler' : item === 'Margin & Trading' ? 'Teminat ve işlem' : 'Kurallar') : item}</button>)}</div><label className="reference-search"><Search size={15} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={tr ? 'Formül ara...' : 'Search a formula...'} /></label></div>

          <div className="formula-list">
            {visible.map((item, index) => {
              const isOpen = expanded === item.id
              return <article className={`formula-item ${isOpen ? 'formula-expanded' : ''}`} key={item.id}><button className="formula-item-head" type="button" onClick={() => setExpanded(isOpen ? null : item.id)}><span className="formula-index">{String(index + 1).padStart(2, '0')}</span><span className="formula-item-title"><small>{item.category}</small><strong>{tr ? item.titleTr : item.title}</strong></span><code>{tr ? item.formulaTr : item.formula}</code>{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</button>{isOpen && <div className="formula-item-detail"><p>{tr ? item.detailTr : item.detail}</p><span><Sparkles size={13} />{tr ? 'SINAV NOTU' : 'EXAM NOTE'}</span></div>}</article>
            })}
            {!visible.length && <div className="empty-state"><Search size={22} /><h3>{tr ? 'Eşleşme bulunamadı' : 'No matching reference notes'}</h3></div>}
          </div>

          {!hasPremium && filtered.length > visible.length && <div className="reference-locked"><LockKeyhole size={17} /><div><strong>{tr ? `${filtered.length - visible.length} not daha kilitli` : `${filtered.length - visible.length} more notes locked`}</strong><span>{tr ? 'Tam referans rehberini aç.' : 'Unlock the complete quick-reference sheet.'}</span></div><button className="button button-primary" type="button" onClick={onUpgrade}>{tr ? 'Erişim al' : 'Get access'}</button></div>}
          <div className="reference-disclaimer">{tr ? 'Çalışma özeti. Resmî kural metni veya hukuki/vergi danışmanlığı değildir; güncel kurallar ve ürün belgeleri farklılık gösterebilir.' : 'Study summary only—not official rule text or legal/tax advice. Current rules and product documents may differ.'}</div>
        </section>

        <aside className="reference-aside">
          <div className="calculator-heading"><span className="calculator-heading-icon"><Calculator size={18} /></span><div><p className="eyebrow">{tr ? 'SINAV ARAÇLARI' : 'EXAM TOOLS'}</p><h3>{tr ? 'Hesap makinesi' : 'Calculator'}</h3></div></div>
          <div className="reference-calculator"><CalculatorPad language={language} /></div>
          <div className="calculator-tip"><span><Sigma size={16} /></span><p><strong>{tr ? 'Hızlı formül' : 'Quick formula'}</strong>{tr ? 'Vergi eşdeğer getirisini hesaplamak için önce vergi oranını 1’den çıkar.' : 'For tax-equivalent yield, subtract the tax rate from 1 before dividing the tax-free yield.'}</p></div>
        </aside>
      </div>
    </div>
  )
}

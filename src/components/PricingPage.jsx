import { CheckCircle2, CreditCard, LockKeyhole, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react'
import PlanCards from './PlanCards'

export default function PricingPage({ language = 'en', plan, membership, onSelectPlan, onClearPlan }) {
  const tr = language === 'tr'
  const expiry = membership?.expiresAt ? new Intl.DateTimeFormat(tr ? 'tr-TR' : 'en-US', { dateStyle: 'medium' }).format(new Date(membership.expiresAt)) : null

  return (
    <div className="pricing-page page-enter">
      <div className="pricing-hero"><div><span className="pricing-hero-chip"><Sparkles size={13} />SIE PLUS</span><h1>{tr ? 'Sınav hedefin için tam erişim.' : 'Full access for your exam goals.'}</h1><p>{tr ? 'Hesap açmadan çalış. Seçtiğin plan bu tarayıcıda saklanır.' : 'Study without creating an account. Your selected plan stays in this browser.'}</p></div><div className="pricing-hero-mark">SIE<span>+</span></div></div>

      {membership && <div className="active-membership-banner"><span className="active-plan-check"><CheckCircle2 size={18} /></span><div><strong>{tr ? `${plan?.nameTr || ''} planın etkin` : `${plan?.name || 'Your'} plan is active`}</strong><span>{tr ? (expiry ? `Yerel üyelik ${expiry} tarihine kadar etkin.` : 'Yerel ömür boyu üyelik etkin.') : (expiry ? `Local membership active until ${expiry}.` : 'Local lifetime membership is active.')}</span></div><button type="button" onClick={onClearPlan}><RotateCcw size={14} />{tr ? 'Planı sıfırla' : 'Reset plan'}</button></div>}

      <div className="pricing-plans-header"><div><p className="eyebrow">{tr ? 'PLANINI SEÇ' : 'CHOOSE YOUR PLAN'}</p><h2>{tr ? 'Basit, şeffaf fiyatlandırma.' : 'Simple, transparent pricing.'}</h2></div><span><LockKeyhole size={15} />{tr ? 'Giriş yok · İptal kontrolü sende' : 'No login · You stay in control'}</span></div>
      <PlanCards language={language} activePlanId={membership?.planId} onSelect={onSelectPlan} />

      <div className="pricing-details-grid"><article><span className="pricing-detail-icon"><BookIcon /></span><div><strong>{tr ? 'Bir kez çalış, her yerde' : 'One workspace, all your tools'}</strong><p>{tr ? 'Soru bankası, tam denemeler, flashcardlar ve formül rehberi.' : 'Question bank, mock exams, flashcards, and formula reference.'}</p></div></article><article><span className="pricing-detail-icon detail-shield"><ShieldCheck size={17} /></span><div><strong>{tr ? 'Giriş gerektirmez' : 'No account required'}</strong><p>{tr ? 'İlerleme ve üyelik durumu yalnızca bu cihazda tutulur.' : 'Progress and membership status are stored on this device only.'}</p></div></article><article><span className="pricing-detail-icon detail-credit"><CreditCard size={17} /></span><div><strong>{tr ? 'Ödeme entegrasyonu bekleniyor' : 'Payment integration not connected'}</strong><p>{tr ? 'Bu ürün önizlemesinde plan seçimi deneme amaçlıdır; gerçek ödeme alınmaz.' : 'Plan selection is for preview only; no real payment is processed.'}</p></div></article></div>
      <p className="pricing-footnote">{tr ? 'Abonelikler cihaz ve tarayıcı bazında saklanır; önbellek temizlendiğinde veya başka cihaza geçildiğinde aktarılmaz. Üretim yayını için ödeme sağlayıcısı ve sunucu tarafı doğrulama gerekir.' : 'Membership is browser- and device-specific and will not transfer if browser storage is cleared or you switch devices. A production launch requires a payment provider and server-side verification.'}</p>
    </div>
  )
}

function BookIcon() {
  return <span className="book-icon-glyph">S</span>
}

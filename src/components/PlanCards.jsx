import { Check, LoaderCircle, Sparkles } from 'lucide-react'
import { PLANS } from '../data/plans'

export default function PlanCards({
  language = 'en',
  onSelect,
  activePlanId = null,
  isNative = false,
  storePackages = {},
  billingStatus = 'web-preview',
  storeProvider = 'App Store',
  busyPlanId = null,
}) {
  const tr = language === 'tr'
  const benefits = tr
    ? ['Tam soru bankası ve tüm seviyeler', '85 soruluk, 105 dakikalık deneme sınavı', 'Flashcardlar, cevap açıklamaları ve çalışma notları', 'Hesap açma yok — ilerleme bu cihazda saklanır']
    : ['Full question bank across all difficulty levels', '85-question, 105-minute mock exam', 'Flashcards, answer explanations, and study notes', 'No account — progress stays on this device']

  const unavailableLabel = billingStatus === 'loading'
    ? (tr ? 'Mağaza yükleniyor…' : 'Loading store…')
    : billingStatus === 'not-configured'
      ? (tr ? 'Mağaza kurulumu gerekli' : 'Store setup required')
      : billingStatus === 'error'
        ? (tr ? 'Şu an kullanılamıyor' : 'Temporarily unavailable')
        : (tr ? 'Mağaza ürünü bulunamadı' : 'Store product unavailable')

  return (
    <div className="plan-grid">
      {PLANS.map((plan) => {
        const active = activePlanId === plan.id
        const storePackage = storePackages[plan.id]
        const price = isNative
          ? (storePackage?.product?.priceString || (tr ? 'Mağaza fiyatı' : 'Store price'))
          : `$${plan.price}`
        const cadence = isNative
          ? (plan.id === 'lifetime' ? (tr ? 'tek seferlik' : 'one time') : (tr ? (plan.id === 'weekly' ? '/ hafta' : '/ ay') : plan.cadence))
          : (tr ? plan.cadenceTr : plan.cadence)
        const descriptor = isNative
          ? (plan.id === 'lifetime'
            ? (tr ? 'Tek seferlik satın alım · yinelenen ücret yok' : 'One-time purchase · no recurring billing')
            : (tr ? `${plan.id === 'weekly' ? 'Haftalık' : 'Aylık'} yenilenir · mağazadan iptal edilebilir` : `Renews ${plan.id === 'weekly' ? 'weekly' : 'monthly'} · cancel in your store settings`))
          : (tr ? plan.descriptorTr : plan.descriptor)
        const nativeReady = billingStatus === 'ready' && Boolean(storePackage)
        const buttonLabel = active
          ? (tr ? 'Mevcut planınız' : 'Current plan')
          : isNative
            ? busyPlanId === plan.id
              ? (tr ? 'İşleniyor…' : 'Processing…')
              : nativeReady
                ? (tr ? `${storeProvider} ile devam et` : `Continue with ${storeProvider}`)
                : unavailableLabel
            : (tr ? 'Mobil uygulamada kullanılabilir' : 'Available in mobile app')

        return (
          <article key={plan.id} className={`plan-card ${plan.popular ? 'plan-popular' : ''} ${active ? 'plan-current' : ''}`}>
            {plan.popular && <span className="plan-ribbon">{tr ? 'EN ÇOK TERCİH EDİLEN' : 'MOST POPULAR'}</span>}
            {active && <span className="plan-active-label"><Check size={13} /> {tr ? 'AKTİF PLAN' : 'ACTIVE PLAN'}</span>}
            <div className="plan-name-row">
              <span className="plan-icon"><Sparkles size={17} /></span>
              <h3>{tr ? plan.nameTr : plan.name}</h3>
            </div>
            <div className="plan-price"><strong>{price}</strong><span>{cadence}</span></div>
            <p className="plan-descriptor">{descriptor}</p>
            <ul className="plan-benefits">
              {benefits.map((benefit) => <li key={benefit}><Check size={15} />{benefit}</li>)}
            </ul>
            <button
              className={`button ${plan.popular ? 'button-primary' : 'button-outline'} plan-button ${!isNative ? 'plan-button-web' : ''}`}
              type="button"
              disabled={active || !isNative || (isNative && (!nativeReady || Boolean(busyPlanId)))}
              onClick={() => onSelect?.(plan.id)}
            >
              {busyPlanId === plan.id && <LoaderCircle size={14} className="spinner-icon" />}
              {buttonLabel}
            </button>
            {isNative && !storePackage && <p className="plan-product-note">{billingStatus === 'loading' ? (tr ? 'Güvenli mağaza fiyatları alınıyor.' : 'Fetching secure store pricing.') : (tr ? 'Ürün App Store / Google Play’de hazırlanıyor.' : 'Product setup is pending in the App Store / Google Play.')}</p>}
          </article>
        )
      })}
    </div>
  )
}

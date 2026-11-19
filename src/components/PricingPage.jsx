import { useState } from 'react'
import { CheckCircle2, CreditCard, LockKeyhole, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react'
import PlanCards from './PlanCards'

export default function PricingPage({
  language = 'en',
  plan,
  membership,
  isNative = false,
  storePackages = {},
  billingStatus = 'web-preview',
  billingError = null,
  storeProvider = 'App Store',
  onSelectPlan,
  onRestore,
  onManage,
  onRefresh,
}) {
  const tr = language === 'tr'
  const [busyPlanId, setBusyPlanId] = useState(null)
  const [restoring, setRestoring] = useState(false)
  const [notice, setNotice] = useState('')
  const expiry = membership?.expiresAt
    ? new Intl.DateTimeFormat(tr ? 'tr-TR' : 'en-US', { dateStyle: 'medium' }).format(new Date(membership.expiresAt))
    : null

  const selectPlan = async (planId) => {
    setNotice('')
    if (!isNative) {
      setNotice(tr
        ? 'Web üzerinden satın alma henüz kullanılamıyor. Planlar mobil uygulamada App Store veya Google Play ile satın alınabilir.'
        : 'Web checkout is not available yet. Purchase plans in the mobile app through the App Store or Google Play.')
      return
    }
    setBusyPlanId(planId)
    const result = await onSelectPlan?.(planId)
    setBusyPlanId(null)
    if (result?.success) setNotice(tr ? 'Satın alma tamamlandı; planın etkin.' : 'Purchase complete. Your plan is active.')
    else if (!result?.cancelled) setNotice(tr ? 'Satın alma tamamlanamadı. Mağaza ayarlarını veya bağlantını kontrol et.' : (result?.error || 'The purchase could not be completed. Check your store settings or connection.'))
  }

  const restore = async () => {
    setRestoring(true)
    setNotice('')
    const result = await onRestore?.()
    setRestoring(false)
    setNotice(result?.success
      ? (tr ? 'Satın alma erişimin geri yüklendi.' : 'Your purchase access has been restored.')
      : (tr ? 'Önceki satın alım bulunamadı. Satın aldığın mağaza hesabını kontrol et.' : 'No previous purchase was found. Check the store account used for purchase.'))
  }

  return (
    <div className="pricing-page page-enter">
      <div className="pricing-hero">
        <div>
          <span className="pricing-hero-chip"><Sparkles size={13} />SIE PLUS</span>
          <h1>{tr ? 'Sınav hedefin için tam erişim.' : 'Full access for your exam goals.'}</h1>
          <p>{isNative
            ? (tr ? 'Hesap açmadan çalış. Mobil uygulamada mağaza üzerinden güvenli ödeme yap.' : 'Study without creating an account. Pay securely through your app store in the mobile app.')
            : (tr ? 'Plan seçeneklerini karşılaştır. Web önizlemesinde ödeme alınmaz; satın alma mobil uygulamada yapılır.' : 'Compare plan options. The web preview does not accept payments; purchases are made in the mobile app.')}</p>
        </div>
        <div className="pricing-hero-mark">SIE<span>+</span></div>
      </div>

      {membership && <div className="active-membership-banner">
        <span className="active-plan-check"><CheckCircle2 size={18} /></span>
        <div>
          <strong>{tr ? `${plan?.nameTr || ''} planın etkin` : `${plan?.name || 'Your'} plan is active`}</strong>
          <span>{tr ? (expiry ? `Mağaza üyeliğin ${expiry} tarihine kadar etkin.` : 'Ömür boyu mağaza üyeliğin etkin.') : (expiry ? `Store membership active until ${expiry}.` : 'Lifetime store membership is active.')}</span>
        </div>
        <button type="button" onClick={onManage}><CreditCard size={14} />{tr ? 'Mağazada yönet' : 'Manage in store'}</button>
      </div>}

      <div className="pricing-plans-header">
        <div><p className="eyebrow">{tr ? 'PLANINI SEÇ' : 'CHOOSE YOUR PLAN'}</p><h2>{tr ? 'Basit, şeffaf fiyatlandırma.' : 'Simple, transparent pricing.'}</h2></div>
        <span><LockKeyhole size={15} />{isNative
          ? (tr ? 'Giriş yok · Ödeme Apple/Google’da' : 'No login · billing handled by Apple/Google')
          : (tr ? 'Giriş yok · Mobil uygulamada satın al' : 'No login · purchase in mobile app')}</span>
      </div>

      <PlanCards
        language={language}
        activePlanId={membership?.planId}
        onSelect={selectPlan}
        isNative={isNative}
        storePackages={storePackages}
        billingStatus={billingStatus}
        storeProvider={storeProvider}
        busyPlanId={busyPlanId}
      />

      {notice && <div className="pricing-notice" role="status">{notice}</div>}
      {isNative ? (
        <div className="store-pricing-footer">
          <div className="store-terms-copy">
            <p>{tr ? 'Haftalık ve aylık abonelikler mağaza üzerinden otomatik yenilenir; yenilemeden en az 24 saat önce mağaza ayarlarından iptal edilebilir. Ömür boyu erişim tek seferlik satın alımdır. Ödeme, satın alma onayında mağaza hesabına yansıtılır.' : 'Weekly and monthly subscriptions renew through the store unless canceled at least 24 hours before renewal in your store settings. Lifetime access is a one-time purchase. Payment is charged to your store account upon confirmation.'}</p>
            <p>{tr ? 'Gösterilen fiyat ve yerel para birimi mağaza tarafından sağlanır. Yenileme ve deneme koşulları satın alma onay ekranında görünür.' : 'Prices and local currency are supplied by the store. Any renewal, trial, and billing terms are shown in the store purchase sheet.'}</p>
          </div>
          <div className="store-account-actions">
            <button className="restore-link" type="button" disabled={restoring || billingStatus === 'not-configured'} onClick={restore}><RefreshCw size={13} className={restoring ? 'spinner-icon' : ''} />{restoring ? (tr ? 'Geri yükleniyor…' : 'Restoring…') : (tr ? 'Satın alımları geri yükle' : 'Restore purchases')}</button>
            {billingStatus === 'error' && <button className="restore-link" type="button" onClick={onRefresh}><RefreshCw size={13} />{tr ? 'Mağazayı yeniden dene' : 'Retry store connection'}</button>}
          </div>
          {(billingError || billingStatus === 'not-configured' || billingStatus === 'empty') && <p className="billing-status-note">{billingStatus === 'not-configured' ? (tr ? 'Uygulama mağaza ürünleri henüz yapılandırılmadı.' : 'In-app products have not been configured for this build yet.') : billingStatus === 'empty' ? (tr ? 'Fiyatları yüklemek için RevenueCat panelinde güncel bir teklif (offering) ayarla.' : 'Set a current offering with all products in the RevenueCat dashboard to load store prices.') : billingError}</p>}
        </div>
      ) : (
        <div className="web-checkout-note"><ShieldCheck size={16} /><span>{tr ? 'Bu sayfa plan seçeneklerini gösterir, ancak web üzerinden ödeme veya Plus erişimi etkinleştirmez. Satın alma mobil uygulamada App Store ya da Google Play üzerinden yapılır. Buradaki USD fiyatları referans niteliğindedir; geçerli yerel fiyat mağaza ödeme ekranında gösterilir.' : 'This page shows plan options but does not take payment or activate Plus on the web. Purchase in the mobile app through the App Store or Google Play. USD prices shown here are references; the applicable local price appears in the store purchase sheet.'}</span></div>
      )}

      <div className="pricing-details-grid">
        <article><span className="pricing-detail-icon"><BookIcon /></span><div><strong>{tr ? 'Bir kez çalış, her yerde' : 'One workspace, all your tools'}</strong><p>{tr ? 'Soru bankası, tam denemeler, flashcardlar ve formül rehberi.' : 'Question bank, mock exams, flashcards, and formula reference.'}</p></div></article>
        <article><span className="pricing-detail-icon detail-shield"><ShieldCheck size={17} /></span><div><strong>{tr ? 'Giriş gerektirmez' : 'No account required'}</strong><p>{tr ? 'Mağaza satın alımları cihazın Apple/Google hesabıyla, çalışma durumu yerel olarak saklanır.' : 'Purchases use your device’s Apple/Google store account; study progress is stored locally.'}</p></div></article>
        <article><span className="pricing-detail-icon detail-credit"><CreditCard size={17} /></span><div><strong>{tr ? 'Güvenli mağaza ödemesi' : 'Secure in-app billing'}</strong><p>{tr ? 'Kart bilgileri bu uygulamada tutulmaz; App Store veya Google Play üzerinden işlenir.' : 'Card details are not stored in this app; billing is handled by the App Store or Google Play.'}</p></div></article>
      </div>
      <div className="pricing-legal-links"><a href="/terms.html">{tr ? 'Kullanım Koşulları' : 'Terms of Use'}</a><i /><a href="/privacy.html">{tr ? 'Gizlilik Politikası' : 'Privacy Policy'}</a><i /><a href="/support.html">{tr ? 'Destek' : 'Support'}</a></div>
      <p className="pricing-footnote">{isNative
        ? (tr ? 'Satın alımlar App Store / Google Play hesabına bağlıdır. Aboneliği mağaza ayarlarından yönetebilir ve aynı mağaza hesabıyla geri yükleyebilirsin.' : 'Purchases are tied to your App Store / Google Play account. Manage subscriptions in the store settings or restore them with the same store account.')
        : (tr ? 'Web önizlemesinde satın alma yapılamaz. Mobil uygulamada mağaza satın alımlarını aynı Apple / Google hesabıyla geri yükleyebilirsin.' : 'Checkout is unavailable in the web preview. In the mobile app, restore purchases with the same Apple / Google account used to buy.')}</p>
    </div>
  )
}

function BookIcon() {
  return <span className="book-icon-glyph">S</span>
}

import { useState } from 'react'
import { CheckCircle2, LockKeyhole, RefreshCw, ShieldCheck } from 'lucide-react'
import Modal from './Modal'
import PlanCards from './PlanCards'
import { useSubscription } from '../context/SubscriptionContext'

export default function PaywallModal({ language = 'en', onClose, onActivated }) {
  const {
    membership,
    plan,
    hasPremium,
    activatePlan,
    isNative,
    storePackages,
    billingStatus,
    billingError,
    purchasePlan,
    restorePurchases,
    refreshBilling,
    openManageSubscriptions,
    storeProvider,
  } = useSubscription()
  const [activated, setActivated] = useState(false)
  const [chosenPlan, setChosenPlan] = useState(null)
  const [busyPlanId, setBusyPlanId] = useState(null)
  const [restoring, setRestoring] = useState(false)
  const [message, setMessage] = useState('')
  const tr = language === 'tr'

  const selectPlan = async (planId) => {
    setMessage('')
    if (isNative) {
      setBusyPlanId(planId)
      const result = await purchasePlan(planId)
      setBusyPlanId(null)
      if (result.success) {
        setChosenPlan(planId)
        setActivated(true)
      } else if (!result.cancelled) {
        setMessage(tr ? 'Satın alma tamamlanamadı. Mağaza bağlantını kontrol edip tekrar dene.' : (result.error || 'The purchase could not be completed. Check your store connection and try again.'))
      }
      return
    }
    activatePlan(planId)
    setChosenPlan(planId)
    setActivated(true)
  }

  const restore = async () => {
    setRestoring(true)
    setMessage('')
    const result = await restorePurchases()
    setRestoring(false)
    if (result.success) {
      setChosenPlan(plan?.id || null)
      setActivated(true)
    } else if (result.reason === 'web-preview') {
      setMessage(tr ? 'Satın alımları geri yükleme, uygulama mağazası üzerinden kullanılabilir.' : 'Purchase restoration is available in the mobile app stores.')
    } else {
      setMessage(tr ? 'Önceki satın alım bulunamadı. Satın aldığın mağaza hesabıyla giriş yaptığını kontrol et.' : 'No purchase was found. Check that you are signed into the store account used for the purchase.')
    }
  }

  const continueToApp = () => {
    onActivated?.()
    onClose?.()
  }

  const manageSubscription = async () => {
    const result = await openManageSubscriptions()
    if (!result.success) setMessage(tr ? 'Abonelik yönetimi şu an açılamıyor. Mağaza hesabından yönetebilirsin.' : 'Subscription management is unavailable right now. Manage it in your store account.')
  }

  const successName = chosenPlan
    ? (tr ? ({ weekly: 'Haftalık', monthly: 'Aylık', lifetime: 'Ömür boyu' }[chosenPlan]) : ({ weekly: 'Weekly', monthly: 'Monthly', lifetime: 'Lifetime' }[chosenPlan]))
    : (plan ? (tr ? plan.nameTr : plan.name) : '')

  return (
    <Modal title={tr ? 'Tam erişimin kilidini aç' : 'Unlock your full study suite'} onClose={onClose} wide className="paywall-modal">
      {activated ? (
        <div className="activation-success">
          <span className="success-orb"><CheckCircle2 size={34} /></span>
          <p className="eyebrow">{tr ? 'HAZIRSIN' : 'YOU’RE ALL SET'}</p>
          <h3>{tr ? `${successName} planın etkin` : `${successName} access is active`}</h3>
          <p>{isNative ? (tr ? 'Erişimin mağaza hesabına bağlıdır. Satın alma durumunu istediğin zaman geri yükleyebilirsin.' : 'Your access is linked to your store account. You can restore purchases at any time.') : (tr ? 'Bu demo planı yalnızca bu tarayıcıda saklanır. Gerçek ödeme alınmadı.' : 'This demo plan is stored in this browser only. No payment has been processed.')}</p>
          {isNative && hasPremium && <button className="restore-inline-link" type="button" onClick={() => void manageSubscription()}>{tr ? 'Aboneliği mağazada yönet' : 'Manage subscription in store'}</button>}
          <button className="button button-primary" type="button" onClick={continueToApp}>{tr ? 'Çalışmaya devam et' : 'Continue studying'}</button>
        </div>
      ) : (
        <>
          <div className="paywall-intro">
            <span className="paywall-lock"><LockKeyhole size={17} /></span>
            <div>
              <p className="eyebrow">{tr ? 'HESAP AÇMADAN ÇALIŞ' : 'STUDY WITHOUT AN ACCOUNT'}</p>
              <h3>{tr ? 'Sınava hazır hissetmek için ihtiyacın olan her şey.' : 'Everything you need to feel ready for exam day.'}</h3>
              <p>{tr ? 'Tam denemeler, tüm soru bankası, flashcardlar ve açıklamalı cevaplar.' : 'Full-length simulations, the complete question bank, flashcards, and explained answers.'}</p>
            </div>
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
          {(message || billingError) && <div className="purchase-feedback" role="status">{message || (billingStatus === 'not-configured' ? (tr ? 'Mağaza ödemeleri henüz bu uygulama için yapılandırılmadı.' : 'Store purchases have not been configured for this app yet.') : billingError)}</div>}
          {isNative ? (
            <div className="store-purchase-footer">
              <p>{tr ? 'Haftalık ve aylık planlar mağaza üzerinden otomatik yenilenir; yenilemeden en az 24 saat önce mağaza hesabından iptal edebilirsin. Ömür boyu plan tek seferliktir. Satın alma onayı, geçerli mağaza fiyatını gösterir.' : 'Weekly and monthly plans renew through the store unless canceled at least 24 hours before renewal. Cancel in your store account. Lifetime is a one-time purchase. The store confirmation shows the applicable price.'}</p>
              <div className="store-account-actions">
                <button className="restore-link" type="button" disabled={restoring || billingStatus === 'not-configured'} onClick={restore}><RefreshCw size={13} className={restoring ? 'spinner-icon' : ''} />{restoring ? (tr ? 'Geri yükleniyor…' : 'Restoring…') : (tr ? 'Satın alımları geri yükle' : 'Restore purchases')}</button>
                {hasPremium && <button className="restore-link" type="button" onClick={() => void manageSubscription()}>{tr ? 'Aboneliği yönet' : 'Manage subscription'}</button>}
                {billingStatus === 'error' && <button className="restore-link" type="button" onClick={() => void refreshBilling()}><RefreshCw size={13} />{tr ? 'Yeniden dene' : 'Retry store'}</button>}
              </div>
            </div>
          ) : (
            <div className="demo-checkout-note"><ShieldCheck size={16} /><span>{tr ? 'Web önizlemesi: plan etkinleştirme demo amaçlıdır; ödeme alınmaz. Mobil uygulamada gerçek satın alımlar Apple App Store veya Google Play üzerinden yapılır.' : 'Web preview: plan activation is a demo and does not charge you. Real mobile purchases use Apple App Store or Google Play billing.'}</span></div>
          )}
          <div className="legal-links-row"><a href="/terms.html">{tr ? 'Kullanım Koşulları' : 'Terms of Use'}</a><i /> <a href="/privacy.html">{tr ? 'Gizlilik Politikası' : 'Privacy Policy'}</a></div>
          {plan && <p className="current-plan-note">{tr ? `Şu an etkin plan: ${plan.nameTr}.` : `Current plan: ${plan.name}.`}</p>}
        </>
      )}
    </Modal>
  )
}

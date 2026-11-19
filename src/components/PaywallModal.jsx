import { useState } from 'react'
import { CheckCircle2, LockKeyhole, ShieldCheck } from 'lucide-react'
import Modal from './Modal'
import PlanCards from './PlanCards'
import { useSubscription } from '../context/SubscriptionContext'

export default function PaywallModal({ language = 'en', onClose, onActivated }) {
  const { membership, plan, activatePlan } = useSubscription()
  const [activated, setActivated] = useState(false)
  const [chosenPlan, setChosenPlan] = useState(null)
  const tr = language === 'tr'

  const selectPlan = (planId) => {
    setChosenPlan(planId)
    activatePlan(planId)
    setActivated(true)
  }

  const continueToApp = () => {
    onActivated?.()
    onClose?.()
  }

  return (
    <Modal title={tr ? 'Tam erişimin kilidini aç' : 'Unlock your full study suite'} onClose={onClose} wide className="paywall-modal">
      {activated ? (
        <div className="activation-success">
          <span className="success-orb"><CheckCircle2 size={34} /></span>
          <p className="eyebrow">{tr ? 'HAZIRSIN' : 'YOU’RE ALL SET'}</p>
          <h3>{tr ? `${chosenPlan === 'weekly' ? 'Haftalık' : chosenPlan === 'monthly' ? 'Aylık' : 'Ömür boyu'} demo plan etkinleştirildi` : `${chosenPlan?.[0]?.toUpperCase()}${chosenPlan?.slice(1)} demo plan activated`}</h3>
          <p>{tr ? 'Bu demo üyeliği yalnızca bu tarayıcıda saklanır. Gerçek ödeme alınmadı.' : 'This demo membership is stored in this browser only. No payment has been processed.'}</p>
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
          <PlanCards language={language} activePlanId={membership?.planId} onSelect={selectPlan} />
          <div className="demo-checkout-note"><ShieldCheck size={16} /><span>{tr ? 'Önizleme: ödeme sağlayıcısı bağlanmadı. Plan seçimi gerçek ücret çekmez; üyelik bu cihazda yerel olarak saklanır.' : 'Preview only: no payment provider is connected. Plan selection does not charge you; membership is stored locally on this device.'}</span></div>
          {plan && <p className="current-plan-note">{tr ? `Şu an etkin plan: ${plan.nameTr}.` : `Current local plan: ${plan.name}.`}</p>}
        </>
      )}
    </Modal>
  )
}

import { Check, Sparkles } from 'lucide-react'
import { PLANS } from '../data/plans'

export default function PlanCards({ language = 'en', onSelect, activePlanId = null }) {
  const tr = language === 'tr'
  const benefits = tr
    ? ['Tam soru bankası ve tüm seviyeler', '85 soruluk, 105 dakikalık deneme sınavı', 'Flashcardlar, cevap açıklamaları ve çalışma notları', 'Hesap açma yok — ilerleme bu cihazda saklanır']
    : ['Full question bank across all difficulty levels', '85-question, 105-minute mock exam', 'Flashcards, answer explanations, and study notes', 'No account — progress stays on this device']

  return (
    <div className="plan-grid">
      {PLANS.map((plan) => {
        const active = activePlanId === plan.id
        return (
          <article key={plan.id} className={`plan-card ${plan.popular ? 'plan-popular' : ''} ${active ? 'plan-current' : ''}`}>
            {plan.popular && <span className="plan-ribbon">{tr ? 'EN ÇOK TERCİH EDİLEN' : 'MOST POPULAR'}</span>}
            {active && <span className="plan-active-label"><Check size={13} /> {tr ? 'AKTİF PLAN' : 'ACTIVE PLAN'}</span>}
            <div className="plan-name-row">
              <span className="plan-icon"><Sparkles size={17} /></span>
              <h3>{tr ? plan.nameTr : plan.name}</h3>
            </div>
            <div className="plan-price"><strong>${plan.price}</strong><span>{tr ? plan.cadenceTr : plan.cadence}</span></div>
            <p className="plan-descriptor">{tr ? plan.descriptorTr : plan.descriptor}</p>
            <ul className="plan-benefits">
              {benefits.map((benefit) => <li key={benefit}><Check size={15} />{benefit}</li>)}
            </ul>
            <button
              className={`button ${plan.popular ? 'button-primary' : 'button-outline'} plan-button`}
              type="button"
              disabled={active}
              onClick={() => onSelect?.(plan.id)}
            >
              {active ? (tr ? 'Mevcut planınız' : 'Current plan') : (tr ? 'Demo planı etkinleştir' : 'Activate demo plan')}
            </button>
          </article>
        )
      })}
    </div>
  )
}

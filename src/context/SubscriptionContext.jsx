import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PLANS } from '../data/plans'

const STORAGE_KEY = 'sie-prep-membership-v1'
const SubscriptionContext = createContext(null)

function getStoredMembership() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    const membership = JSON.parse(stored)
    if (membership.planId !== 'lifetime' && membership.expiresAt && Date.now() >= membership.expiresAt) {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return membership
  } catch {
    return null
  }
}

export function SubscriptionProvider({ children }) {
  const [membership, setMembership] = useState(getStoredMembership)

  useEffect(() => {
    if (!membership) {
      window.localStorage.removeItem(STORAGE_KEY)
      return
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(membership))
  }, [membership])

  useEffect(() => {
    if (!membership || membership.planId === 'lifetime' || !membership.expiresAt) return undefined
    const remaining = Math.max(0, membership.expiresAt - Date.now())
    const timeout = window.setTimeout(() => setMembership(null), remaining)
    return () => window.clearTimeout(timeout)
  }, [membership])

  const activatePlan = (planId) => {
    const plan = PLANS.find((item) => item.id === planId)
    if (!plan) return
    const startedAt = Date.now()
    const expiresAt = plan.durationDays
      ? startedAt + plan.durationDays * 24 * 60 * 60 * 1000
      : null
    setMembership({ planId: plan.id, startedAt, expiresAt, mode: 'local-demo' })
  }

  const value = useMemo(() => ({
    membership,
    hasPremium: Boolean(membership),
    activatePlan,
    clearMembership: () => setMembership(null),
    plan: PLANS.find((item) => item.id === membership?.planId) || null,
  }), [membership])

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useSubscription() {
  const value = useContext(SubscriptionContext)
  if (!value) throw new Error('useSubscription must be used inside SubscriptionProvider')
  return value
}

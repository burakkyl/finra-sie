import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { App as CapacitorApp } from '@capacitor/app'
import { Browser } from '@capacitor/browser'
import { Capacitor } from '@capacitor/core'
import { PLANS } from '../data/plans'

const DEFAULT_ENTITLEMENT_ID = import.meta.env.VITE_REVENUECAT_ENTITLEMENT_ID || 'sie_plus'
const IS_NATIVE = Capacitor.isNativePlatform()
const NATIVE_PLATFORM = Capacitor.getPlatform()
const REVENUECAT_API_KEY = NATIVE_PLATFORM === 'ios'
  ? import.meta.env.VITE_REVENUECAT_IOS_API_KEY
  : NATIVE_PLATFORM === 'android'
    ? import.meta.env.VITE_REVENUECAT_ANDROID_API_KEY
    : ''

const PURCHASE_PACKAGE_IDS = {
  weekly: import.meta.env.VITE_REVENUECAT_WEEKLY_PACKAGE_ID,
  monthly: import.meta.env.VITE_REVENUECAT_MONTHLY_PACKAGE_ID,
  lifetime: import.meta.env.VITE_REVENUECAT_LIFETIME_PACKAGE_ID,
}

const PURCHASE_PRODUCT_IDS = {
  weekly: import.meta.env.VITE_REVENUECAT_WEEKLY_PRODUCT_ID,
  monthly: import.meta.env.VITE_REVENUECAT_MONTHLY_PRODUCT_ID,
  lifetime: import.meta.env.VITE_REVENUECAT_LIFETIME_PRODUCT_ID,
}

let purchasesPluginPromise
let revenueCatConfiguration
const SubscriptionContext = createContext(null)

async function getRevenueCatPurchases() {
  if (!purchasesPluginPromise) {
    purchasesPluginPromise = import('@revenuecat/purchases-capacitor')
      .then((module) => module.Purchases)
      .catch((error) => {
        purchasesPluginPromise = null
        throw error
      })
  }
  return purchasesPluginPromise
}

async function ensureRevenueCatConfigured(apiKey) {
  const Purchases = await getRevenueCatPurchases()
  if (!revenueCatConfiguration) {
    revenueCatConfiguration = (async () => {
      const { isConfigured } = await Purchases.isConfigured()
      if (!isConfigured) await Purchases.configure({ apiKey })
    })().catch((error) => {
      revenueCatConfiguration = null
      throw error
    })
  }
  await revenueCatConfiguration
  return Purchases
}

function resolveStorePackages(offering) {
  const availablePackages = offering?.availablePackages || []
  const packageTypes = { weekly: 'WEEKLY', monthly: 'MONTHLY', lifetime: 'LIFETIME' }

  return Object.fromEntries(PLANS.map((plan) => {
    const configuredPackageId = PURCHASE_PACKAGE_IDS[plan.id]
    const configuredProductId = PURCHASE_PRODUCT_IDS[plan.id]
    const matchesProductId = (storePackage) => {
      const productId = storePackage?.product?.identifier || ''
      return Boolean(configuredProductId && (productId === configuredProductId || productId.startsWith(`${configuredProductId}:`)))
    }
    const selectedPackage = (configuredPackageId && availablePackages.find((item) => item.identifier === configuredPackageId))
      || availablePackages.find(matchesProductId)
      || availablePackages.find((item) => item.packageType === packageTypes[plan.id])
      || null
    return [plan.id, selectedPackage]
  }))
}

function hasActiveEntitlement(customerInfo) {
  return Boolean(customerInfo?.entitlements?.active?.[DEFAULT_ENTITLEMENT_ID]?.isActive)
}

function safeErrorMessage(error) {
  if (error?.userCancelled || error?.userCanceled) return null
  return error?.message || 'The store could not complete that request. Please try again.'
}

export function SubscriptionProvider({ children }) {
  const [nativeStore, setNativeStore] = useState({
    status: !IS_NATIVE ? 'web-preview' : REVENUECAT_API_KEY ? 'loading' : 'not-configured',
    packages: {},
    customerInfo: null,
    entitlementActive: false,
    error: null,
  })

  useEffect(() => {
    if (IS_NATIVE) return
    try { window.localStorage.removeItem('sie-prep-membership-v1') } catch { /* Ignore unavailable browser storage. */ }
  }, [])

  const syncCustomerInfo = useCallback((customerInfo) => {
    setNativeStore((current) => ({
      ...current,
      customerInfo,
      entitlementActive: hasActiveEntitlement(customerInfo),
      error: null,
    }))
  }, [])

  const refreshBilling = useCallback(async () => {
    if (!IS_NATIVE) return { success: false, reason: 'web-preview' }
    if (!REVENUECAT_API_KEY) {
      setNativeStore((current) => ({ ...current, status: 'not-configured', error: null }))
      return { success: false, reason: 'not-configured' }
    }

    setNativeStore((current) => ({ ...current, status: 'loading', error: null }))
    try {
      const Purchases = await ensureRevenueCatConfigured(REVENUECAT_API_KEY)
      const [offeringsResult, customerResult] = await Promise.all([
        Purchases.getOfferings(),
        Purchases.getCustomerInfo(),
      ])
      const packages = resolveStorePackages(offeringsResult.current)
      const customerInfo = customerResult.customerInfo
      const hasProducts = Object.values(packages).some(Boolean)
      setNativeStore({
        status: hasProducts ? 'ready' : 'empty',
        packages,
        customerInfo,
        entitlementActive: hasActiveEntitlement(customerInfo),
        error: null,
      })
      return { success: true, packages, customerInfo }
    } catch (error) {
      const message = safeErrorMessage(error)
      setNativeStore((current) => ({ ...current, status: 'error', error: message }))
      return { success: false, reason: 'store-error', error: message }
    }
  }, [])

  useEffect(() => {
    if (!IS_NATIVE || !REVENUECAT_API_KEY) return undefined
    let active = true
    let appStateListener = null
    let customerInfoListenerId = null

    const initialize = async () => {
      try {
        appStateListener = await CapacitorApp.addListener('appStateChange', ({ isActive }) => {
          if (active && isActive) void refreshBilling()
        })
        if (!active) {
          await appStateListener.remove()
          appStateListener = null
          return
        }
      } catch {
        // Billing still works through the in-app screen if lifecycle events are unavailable.
      }

      await refreshBilling()
      if (!active) return
      try {
        const Purchases = await ensureRevenueCatConfigured(REVENUECAT_API_KEY)
        customerInfoListenerId = await Purchases.addCustomerInfoUpdateListener((customerInfo) => {
          if (active) syncCustomerInfo(customerInfo)
        })
        if (!active && customerInfoListenerId) {
          await Purchases.removeCustomerInfoUpdateListener({ listenerToRemove: customerInfoListenerId })
          customerInfoListenerId = null
        }
      } catch {
        // On-demand refresh, purchase, and restore remain available if listeners fail.
      }
    }

    void initialize()
    return () => {
      active = false
      if (appStateListener) void appStateListener.remove().catch(() => {})
      if (customerInfoListenerId) {
        void getRevenueCatPurchases()
          .then((Purchases) => Purchases.removeCustomerInfoUpdateListener({ listenerToRemove: customerInfoListenerId }))
          .catch(() => {})
      }
    }
  }, [refreshBilling, syncCustomerInfo])

  const purchasePlan = useCallback(async (planId) => {
    if (!IS_NATIVE) return { success: false, reason: 'web-preview' }
    if (!REVENUECAT_API_KEY) return { success: false, reason: 'not-configured' }
    const selectedPackage = nativeStore.packages[planId]
    if (!selectedPackage) return { success: false, reason: 'product-unavailable' }

    try {
      const Purchases = await ensureRevenueCatConfigured(REVENUECAT_API_KEY)
      const result = await Purchases.purchasePackage({ aPackage: selectedPackage })
      syncCustomerInfo(result.customerInfo)
      return { success: hasActiveEntitlement(result.customerInfo), customerInfo: result.customerInfo }
    } catch (error) {
      return {
        success: false,
        cancelled: Boolean(error?.userCancelled || error?.userCanceled),
        error: safeErrorMessage(error),
      }
    }
  }, [nativeStore.packages, syncCustomerInfo])

  const restorePurchases = useCallback(async () => {
    if (!IS_NATIVE) return { success: false, reason: 'web-preview' }
    if (!REVENUECAT_API_KEY) return { success: false, reason: 'not-configured' }
    try {
      const Purchases = await ensureRevenueCatConfigured(REVENUECAT_API_KEY)
      const result = await Purchases.restorePurchases()
      syncCustomerInfo(result.customerInfo)
      return { success: hasActiveEntitlement(result.customerInfo), customerInfo: result.customerInfo }
    } catch (error) {
      return { success: false, error: safeErrorMessage(error) }
    }
  }, [syncCustomerInfo])

  const openManageSubscriptions = useCallback(async () => {
    if (!IS_NATIVE) return { success: false, reason: 'web-preview' }
    if (!REVENUECAT_API_KEY) return { success: false, reason: 'not-configured' }
    try {
      const Purchases = await ensureRevenueCatConfigured(REVENUECAT_API_KEY)
      const customerInfo = nativeStore.customerInfo || (await Purchases.getCustomerInfo()).customerInfo
      syncCustomerInfo(customerInfo)
      if (!customerInfo.managementURL) return { success: false, reason: 'no-management-url' }
      await Browser.open({ url: customerInfo.managementURL })
      return { success: true }
    } catch (error) {
      return { success: false, error: safeErrorMessage(error) }
    }
  }, [nativeStore.customerInfo, syncCustomerInfo])

  const activeEntitlement = nativeStore.customerInfo?.entitlements?.active?.[DEFAULT_ENTITLEMENT_ID]
  const storePlanId = activeEntitlement
    ? Object.entries(nativeStore.packages).find(([, storePackage]) => {
      const productId = storePackage?.product?.identifier
      return productId === activeEntitlement.productIdentifier || productId?.startsWith(`${activeEntitlement.productIdentifier}:`)
    })?.[0] || Object.entries(PURCHASE_PRODUCT_IDS).find(([, productId]) => productId === activeEntitlement.productIdentifier)?.[0]
    : null
  const effectivePlanId = IS_NATIVE && nativeStore.entitlementActive ? storePlanId : null
  const entitlementExpirationDate = activeEntitlement?.expirationDate
  const effectiveMembership = useMemo(() => {
    if (!IS_NATIVE || !nativeStore.entitlementActive) return null
    return {
      planId: effectivePlanId,
      expiresAt: entitlementExpirationDate ? new Date(entitlementExpirationDate).getTime() : null,
      mode: 'app-store',
    }
  }, [effectivePlanId, entitlementExpirationDate, nativeStore.entitlementActive])

  const value = useMemo(() => ({
    membership: effectiveMembership,
    hasPremium: IS_NATIVE && nativeStore.entitlementActive,
    plan: PLANS.find((item) => item.id === effectivePlanId) || null,
    isNative: IS_NATIVE,
    storeProvider: NATIVE_PLATFORM === 'ios' ? 'App Store' : 'Google Play',
    storePackages: nativeStore.packages,
    billingStatus: nativeStore.status,
    billingError: nativeStore.error,
    refreshBilling,
    purchasePlan,
    restorePurchases,
    openManageSubscriptions,
  }), [
    effectiveMembership,
    effectivePlanId,
    nativeStore.entitlementActive,
    nativeStore.error,
    nativeStore.packages,
    nativeStore.status,
    openManageSubscriptions,
    purchasePlan,
    refreshBilling,
    restorePurchases,
  ])

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useSubscription() {
  const value = useContext(SubscriptionContext)
  if (!value) throw new Error('useSubscription must be used inside SubscriptionProvider')
  return value
}

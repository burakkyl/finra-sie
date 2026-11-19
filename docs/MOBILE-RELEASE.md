# Mobile builds and store-readiness checklist

SIE Prep is a Capacitor 8 app targeting Android and iOS. The shared React app remains usable on the web; local demo membership is web-only. A native install never treats a local browser flag as a purchase: mobile Plus access comes only from the configured RevenueCat entitlement backed by Apple App Store or Google Play billing.

> A successful CI build is not a store submission and cannot guarantee review or acceptance. Store accounts, signing, product configuration, public legal/support URLs, privacy disclosures, device testing, and the stores' review decisions remain separate release requirements.

## Build locally

- Install Node.js 22 and run `npm ci`.
- `npm run mobile:android` builds the web bundle and syncs the Android project. Build an AAB with `cd android && ./gradlew bundleRelease` (or `./gradlew bundleDebug` for a debug APK). Android Studio and a compatible Android SDK are needed for a local native build.
- On macOS with Xcode installed, `npm run mobile:ios` builds and syncs the iOS project. Open `ios/App/App.xcodeproj`, select the shared **App** scheme, set the development team and signing settings, then build/archive for a connected device or App Store Connect.
- `npm run mobile:sync` builds the web app and syncs both native projects.
- `npm run assets:generate` regenerates the platform icons and splash assets from `assets/logo.svg`.

## GitHub Actions artifacts

`.github/workflows/mobile-build.yml` runs web lint/build checks, builds an Android release AAB, and makes an unsigned generic iOS `.xcarchive` on pull requests, matching pushes, or manual dispatch. Download the artifacts from the completed Actions run:

- `sie-prep-android-aab-<commit>` — signed only when all Android signing secrets are configured; otherwise unsigned and intended for CI/testing, not direct Play upload.
- `sie-prep-ios-unsigned-xcarchive-<commit>` — compiled but not signed or exported as an `.ipa`; it must be opened/re-archived with valid Apple signing/provisioning settings before distribution.

### Optional Android release signing

Create and securely back up an upload key, enable Play App Signing in Play Console, and add these **GitHub Actions secrets**. Never commit the key or passwords.

- `ANDROID_KEYSTORE_BASE64` — base64-encoded Java keystore (`base64 -w 0 upload-key.jks` on GNU/Linux; use an equivalent no-line-break command on macOS).
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEY_PASSWORD`

The Gradle release configuration signs the AAB only when all four values are present. The workflow deliberately fails on a partial signing configuration. An AAB still needs to meet Play Console's target API, package, listing, testing, and policy requirements before release.

### App identifiers and versions

- Android application ID / iOS bundle ID: `com.burakkyl.sieprep`.
- Current app version: `1.0.0`; Android `versionCode` is in `android/app/build.gradle`. Increment the Android code for every Play upload; update the app version and both platform projects deliberately for a release.
- The included iOS scheme is shared so Xcode and CI use the same target.

## Configure real in-app purchases

Complete the store product setup before enabling native plans. Empty API keys or missing offerings leave the native purchase buttons unavailable; they do not activate demo access.

1. Create the app in App Store Connect and Google Play Console using bundle/application ID `com.burakkyl.sieprep`; add its in-app products in each store.
2. Configure the intended plan structure in the stores (for the U.S. storefront, the intended starting prices are `$7` weekly, `$19` monthly, and `$100` one-time/lifetime; configure localized prices and tax handling in the stores). Weekly/monthly are auto-renewable subscriptions; lifetime is a one-time non-consumable purchase. Do not rely on web demo prices for mobile checkout.
3. Connect each store to RevenueCat. Add the matching iOS and Android products, create the `sie_plus` entitlement (or set a different entitlement ID), attach the products to it, and create a **current offering** containing the weekly, monthly, and lifetime packages. Use RevenueCat package types `WEEKLY`, `MONTHLY`, and `LIFETIME`; package/product ID overrides are available if custom identifiers are required.
4. Add the RevenueCat **public app SDK keys** to GitHub Actions secrets `REVENUECAT_IOS_API_KEY` and `REVENUECAT_ANDROID_API_KEY`. These keys are embedded in the mobile client and are not server secrets. Never put a RevenueCat secret/server API key in a `VITE_` variable. Optional GitHub Actions variables are `REVENUECAT_ENTITLEMENT_ID`, `REVENUECAT_WEEKLY_PACKAGE_ID`, `REVENUECAT_MONTHLY_PACKAGE_ID`, `REVENUECAT_LIFETIME_PACKAGE_ID`, and corresponding `REVENUECAT_WEEKLY_PRODUCT_ID`, `REVENUECAT_MONTHLY_PRODUCT_ID`, `REVENUECAT_LIFETIME_PRODUCT_ID`. A local `.env` can be based on `.env.example` and must not be committed.
5. Configure store agreements, tax/banking, subscription group/base plans, availability, and sandbox/test accounts. Verify all three store products resolve to the intended cadence and entitlement before distributing a release build.

The app gets price strings from the current store offering at runtime, uses the native purchase sheet, checks the `sie_plus` entitlement, supports store restore, and links to the store-provided subscription-management URL when available. A purchase/restore must be tested on real iOS and Android sandbox/TestFlight/internal-test tracks with fresh, existing, canceled, expired, and lifetime test users. Check cancellation, renewal, restore, network failure, and cross-store behavior. Apple and Google purchases are store-account-specific; they are not guaranteed to transfer across platforms.

## Legal, privacy, and store listing preparation

- `public/privacy.html`, `public/terms.html`, and `public/support.html` are bilingual English/Turkish starter pages and are served at `/privacy.html`, `/terms.html`, and `/support.html` by the web host. Deploy them to a stable public HTTPS site before submission; set the actual Privacy Policy, Terms/EULA, and Support URLs in both store listings. Do not submit an unpublished/local URL. Review the policy against the final SDKs, actual hosting/logging, store privacy/data-safety forms, and applicable law; get legal review if needed.
- Support currently links to the public issue tracker at `https://github.com/burakkyl/finra-sie/issues`. Do not ask users to post receipts, payment details, or sensitive information publicly.
- Store purchase UI and terms disclose weekly/monthly auto-renewal, cancellation through store settings, one-time lifetime access, localized store pricing, restore purchases, and Terms/Privacy links. Verify exact titles, cadence, prices, introductory offers, and any required localized disclosures in each store's purchase sheet and storefront.
- Complete App Store privacy details and Google Play Data safety from the actual release SDK/data flows; the privacy page is not a substitute for those console forms. RevenueCat processes purchase/entitlement data. Review and accurately disclose any changes to SDK collection, analytics, crash reporting, hosting logs, and support handling.
- Provide accurate app descriptions, screenshots, age/content ratings, contact/support details, review notes, and any requested demo/test credentials. The app has no required SIE Prep account; study data stays in local device storage and does not sync between devices.
- Keep the independent-content notice visible: practice questions are original study material, not official, secure, recalled, past, or live FINRA exam questions. Do not imply FINRA affiliation or guarantee a passing result.
- Test on multiple supported phone sizes, languages, text sizes, connectivity states, and devices. Specifically test the first-launch flow, start-practice and start-mock entry points, subscription purchase/cancel/restore/manage flows, safe-area navigation, and offline/empty history states.

The current legal text is a release-preparation draft, not legal advice. Store review is determined by Apple and Google after the real app, metadata, products, privacy disclosures, and signed builds are submitted.

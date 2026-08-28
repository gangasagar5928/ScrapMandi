<p align="center">
  <img src="public/logo.png" width="220" alt="ScrapMandi Logo" />
</p>

<h1 align="center">ScrapMandi — Delhi NCR's B2B Scrap Exchange 🇮🇳</h1>

<p align="center">
  <strong>Sell • Buy • Recycle — Turning Waste Into Value</strong><br />
  A direct B2B digital marketplace connecting scrap yard owners, kabaris, recyclers, and secondary steel re-rolling mills in <strong>Mayapuri, Mundka, Bawana, Wazirpur, Okhla, and Faridabad</strong>.
</p>

<p align="center">
  <a href="https://scrapmandi5928.firebaseapp.com"><img src="https://img.shields.io/badge/Live%20App-scrapmandi5928.firebaseapp.com-059669?style=for-the-badge&logo=firebase" alt="Live App" /></a>
  <img src="https://img.shields.io/badge/Region-Delhi%20NCR%20Hubs-10b981?style=for-the-badge" alt="Delhi NCR" />
  <img src="https://img.shields.io/badge/Settlement-Dharam%20Kanta%20Verified-3b82f6?style=for-the-badge" alt="Dharam Kanta" />
</p>

---

## 🌟 Key Highlights & PRD v1.1 Guardrails

- **60–90 Second Vendor Listing Flow**: Rapid lot creation with standardized Delhi scrap streams (HMS 1 Structure, Copper 99% Wire, Honey Peetal, Aluminium 6063, OCC Gatta Bales, PET Washed Flakes).
- **Atomic Inventory & Overselling Prevention**: Partial lot purchases deduct remaining stock transactionally; once quantity reaches zero, lot is marked `Sold`.
- **Server-Verified Order State Machine**:
  $$\text{Order Created} \rightarrow \text{Payment Confirmed} \rightarrow \text{Vendor Accepted} \rightarrow \text{Ready / Fulfilment} \rightarrow \text{Completed \& Settled}$$
  *(With deterministic automated refund routing on vendor rejection and dispute arbitration).*
- **Indicative Delhi Mandi Benchmark Pricing**: Strict PRD Section 5.4 compliance — benchmark prices display exact methodology, sample size ($N$), timestamp, and Delhi NCR hub with no false claims of fixed market prices.
- **Privacy by Design (Section 5.1)**: Exact yard coordinates and weighbridge gate details remain private until an order is confirmed.
- **Opt-in WhatsApp Daily Digest**: Meta Business Platform compliant rate notifications with 1-click `STOP` unsubscribe.
- **Razorpay Checkout & Webhooks**: Cryptographic HMAC-SHA256 signature verification and `paymentEvents` idempotency keys.
- **Verified Trust Badges**: Multi-tier badges distinguishing Phone Verified, GSTIN Verified, and Yard Audited status.

---

## 🏗️ Architecture & Tech Stack

```
ScrapMandi Web Application
├── React 18 + Vite (SPA)
├── Tailwind CSS + Lucide Icons + Canvas Confetti
├── Razorpay SDK (Client & Cloud Functions Webhook)
├── Meta WhatsApp Cloud API (Daily Mandi Digest Scheduler & STOP Webhook)
├── Firebase Authentication (Phone OTP + Google)
├── Cloud Firestore (Listings, Orders, Payment Events, Disputes, Audit Logs)
├── Firebase Storage (Listing Photos & Dispute Proofs)
└── Firebase Hosting (Site: scrapmandi)
```

---

## 🔐 Environment Variables & Security

All Firebase credentials are kept in `.env` (which is excluded from Git via `.gitignore`).  
A `.env.example` file is provided for template configuration:

```bash
# .env.example
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=scrapmandi5928.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=scrapmandi5928
VITE_FIREBASE_STORAGE_BUCKET=scrapmandi5928.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=616129398050
VITE_FIREBASE_APP_ID=1:616129398050:web:9acb556e3389fd1566917b
VITE_FIREBASE_MEASUREMENT_ID=G-4C62KMG8F9
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## 🚀 Local Development

```bash
# 1. Clone repository
git clone https://github.com/gangasagar5928/ScrapMandi.git
cd ScrapMandi

# 2. Install dependencies
npm install

# 3. Create .env file with your credentials
cp .env.example .env

# 4. Start Vite development server
npm run dev
```

---

## 🚢 Deployment to Firebase Hosting

To deploy the production build directly to the configured Firebase Hosting site:

```bash
# 1. Build the production bundle
npm run build

# 2. Deploy to Firebase Hosting target site 'scrapmandi'
firebase.cmd deploy --only hosting:scrapmandi
```

---

## 👥 Personas & Demo Access

| Persona | Role | Key Capabilities |
|---|---|---|
| **Vendor (Rajesh Sharma - Mayapuri)** | Seller / Yard | 60s listing creation, inline price/qty updates, accept/decline POs, yard handover signoff. |
| **Dealer (Vikram Singhania - Mill)** | Buyer / Mill | Normalized token search, price range & mandi filter, partial lot ordering, weighbridge dispute desk, rating submission. |
| **Admin (Mandi Operations)** | Platform Admin | Live GMV tracking, listing moderation/suspension, dispute arbitration, payment split reconciliation ledger. |

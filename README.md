# ScrapMandi — India's Digital Scrap Exchange 🇮🇳

> **Product Requirements Document (PRD v1.1) Reference Implementation**  
> A high-velocity B2B marketplace connecting accredited scrap vendors (sellers) with dealers, steel mills, foundries, and recyclers across India.

---

## 🌟 Key Highlights & PRD v1.1 Guardrails

- **60–90 Second Vendor Listing Flow**: Rapid lot creation with standardized Indian scrap specifications (HMS 1, Copper Armature, Aluminium 6063, OCC Cardboard, PET Flakes, Server PCBs).
- **Atomic Inventory & Overselling Prevention**: Partial lot purchases deduct remaining stock transactionally; once quantity reaches zero, lot is marked `Sold`.
- **Server-Verified Order State Machine**:
  $$\text{Order Created} \rightarrow \text{Payment Confirmed} \rightarrow \text{Vendor Accepted} \rightarrow \text{Ready / Fulfilment} \rightarrow \text{Completed \& Settled}$$
  *(With deterministic automated refund routing on vendor rejection and dispute arbitration).*
- **Indicative Mandi Benchmark Pricing**: Strict PRD Section 5.4 compliance — benchmark prices display exact methodology, sample size ($N$), timestamp, and regional hub with no false claims of fixed market prices.
- **Privacy by Design (Section 5.1)**: Exact yard coordinates and weighbridge gate details remain private until an order is accepted.
- **Opt-in WhatsApp Daily Digest**: Meta Business Platform compliant rate notifications with 1-click `STOP` unsubscribe.
- **Verified Trust Badges**: Multi-tier badges distinguishing Phone Verified, GSTIN Verified, and Yard Audited status.

---

## 🏗️ Architecture & Tech Stack

```
ScrapMandi Web Application
├── React 18 + Vite (SPA)
├── Tailwind CSS + Lucide Icons + Canvas Confetti
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
firebase deploy --only hosting:scrapmandi
```

---

## 👥 Personas & Demo Access

| Persona | Role | Key Capabilities |
|---|---|---|
| **Vendor (Rajesh Sharma)** | Seller / Yard | 60s listing creation, inline price/qty updates, accept/decline POs, yard handover signoff. |
| **Dealer (Vikram Singhania)** | Buyer / Mill | Normalized token search, price range & mandi filter, partial lot ordering, weighbridge dispute desk, rating submission. |
| **Admin (Ops Control)** | Platform Admin | Live GMV tracking, listing moderation/suspension, dispute arbitration, payment split reconciliation ledger. |

---

## 📄 License & Compliance

Prepared in accordance with ScrapMandi PRD v1.1 (Audit-Hardened).  
© 2026 ScrapMandi Technologies Pvt Ltd. All rights reserved.

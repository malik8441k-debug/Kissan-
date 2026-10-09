# Kisan Margdarshak (किसान मार्गदर्शक / शेतकरी मार्गदर्शक)
## Mobile-First Farmer Guidance App Prototype • Pilot Edition (Nashik District)

A lightweight, accessible, mobile-first web prototype engineered specifically for Indian farmers who may not read comfortably and prefer their regional language.

---

## 🌾 Pilot Configuration

- **Pilot District:** **Nashik District, Maharashtra** (Western Maharashtra Agro-Climatic Zone)
- **Supported Languages:**
  - **Hindi (हिंदी)** - Default pilot regional language
  - **Marathi (मराठी)** - Local regional language of Nashik & Maharashtra
  - **English** - Standard baseline
- **Pilot Crops:**
  - **Soybean (सोयाबीन)** — Kharif cash/pulse crop
  - **Onion / Rangda (कांदा / प्याज)** — Premier Nashik horticulture crop
  - **Gram / Chickpea (हरभरा / चना)** — Moisture-conserving Rabi pulse
  - **Tomato (टोमॅटो / टमाटर)** — High-investment vegetable crop
  - **Cotton (कापूस / कपास)** — Eastern Nashik belt cash crop

---

## 📱 Key Features & Working Capabilities

### 1. Choose What to Grow (फसल चयन / पीक निवड)
- Asks for farmer's district (Nashik pilot), land area (with +/- stepper and 1, 2, 5 acre quick chips), season (Kharif, Rabi, Zaid), soil type (Black, Loamy, Sandy, Clayey), soil testing status, and water availability.
- Big buttons, visual icons, and simple tap targets.
- Displays a shortlist of matched crops with transparent agricultural reasoning:
  - **Why it may suit the land:** Plain-language agronomic explanation.
  - **What information is missing:** Highlights unverified factors (e.g., lack of soil pH test, unknown drainage).
  - **What risks to consider:** Pest threats, waterlogging vulnerabilities, and post-harvest market volatility.
- Direct shortcut to compute crop budget for any recommended crop.

### 2. Crop Budget and Possible Profit (खर्च और अनुमानित आय / पीक खर्च आणि नफा)
- Farmer enters acreage and itemized costs: Seed/nursery, Fertilizer/manure, Labor (sowing, weeding, picking), Irrigation/electricity, Crop protection, Machinery/tractor, and Transport.
- Automatically calculates total estimated investment in real-time.
- Displays **3 Scenarios (Low, Typical, High)**:
  - Shows yield per acre, total expected quintals, expected selling price, total gross revenue, and estimated net profit or loss.
  - Transparently lists the assumptions behind each scenario (e.g. weather conditions, arrival gluts).
  - **Prominent Trust Disclaimer:** Never promises a profit. Clearly marks all values as demo estimates.

### 3. Market Prices & Selling (मंडी भाव और बिक्री / बाजार भाव आणि विक्री)
- Displays demo market prices for key pilot mandis: Lasalgaon APMC, Nashik APMC (Panchavati), Pimpalgaon Baswant APMC, and Yeola APMC.
- **In-Pocket Net Return Comparison:** Automatically deducts transit transport costs, mandi cess, and quality/moisture dockage.
- **Critical Learning Highlight:** Demonstrates how a higher headline price at a distant mandi (e.g. Pimpalgaon) can result in *lower* actual cash in hand after vehicle freight is paid!
- **"Sell Now or Wait" Comparison:** Evaluates immediate sale versus storing for 2–3 months, weighing storage warehouse rent, natural shrinkage/rot (e.g. 15% for Kharif onion), and loan interest against price uncertainty.

### 4. Crop Protection & Health (फसल सुरक्षा और स्वास्थ्य / पीक संरक्षण)
- **Season-wise Prevention Checklist:** Pre-sowing & soil prep, early vegetative stage, and flowering/pod stage cultural practices.
- **Symptom Checker:** Visual symptom cards (yellow leaves, chewed holes, wilting, white patches) + optional camera photo upload.
- **Honest Diagnostic Feedback:** Discloses that the app cannot make a definitive diagnosis from symptoms or photographs alone; recommends taking a live sample to the nearest Krishi Vigyan Kendra (KVK) or calling Kisan Call Center (`1800-180-1551`).
- **Strict Pesticide Safety Warning:** Adheres strictly to safety protocols; does not provide unverified chemical dosages or unapproved trade names. Requires consultation of CIB&RC labels.
- **Method Comparison:** Compares Cultural Prevention vs Biological/Non-chemical vs Chemical Pesticides across advantages, disadvantages, costs, and safety/PPE requirements.

### 5. Farm Records (किसान डायरी / शेती नोंदवही)
- Farmer can record crop, season, area, itemized/total costs, harvest quantity, sale rate, buyer name, and date.
- Computes total expenses, total sales, and net profit or loss.
- Fully editable and deletable with large tap buttons.
- **Local Persistence:** Uses browser `localStorage` for offline operation on rural phone connections. Preloaded with authentic sample entries that can be reset at any time.

### 6. Accessibility & Language Architecture
- **Language Switcher:** Toggle between English, Hindi, and Marathi at any time without reloading screens. All texts are structured in `js/i18n/translations.js`.
- **Text-to-Speech (🔊 Read Aloud):** Every advice card and screen header has a speaker button powered by the Web Speech API (`SpeechSynthesis`) with Hindi/Marathi/English accent support.
- **Voice Input (🎤 Prototype Microphone):** Clear microphone buttons on forms. In browsers without Web Speech recognition, it triggers an honest fallback modal with manual input.
- **Stakeholder Device Preview:** Top toolbar allows instant toggling between **📱 Mobile Frame** (simulated phone) and **🖥️ Full Responsive View**.

---

## 📂 Project Structure

```
/Users/ranjankumar/testantygravity/
├── index.html                   # Mobile-first semantic app shell & screens
├── manifest.json                # PWA manifest for mobile home-screen install
├── css/
│   └── styles.css               # Accessible, high-contrast, thumb-friendly CSS
├── js/
│   ├── app.js                   # Application coordinator & event handling
│   ├── data/
│   │   └── demoData.js          # Isolated demo data module (Crops, Mandis, Checklists)
│   ├── i18n/
│   │   └── translations.js      # Complete translations for Hindi, Marathi & English
│   └── services/
│       ├── speechService.js     # Web Speech TTS & Voice recognition + fallback
│       └── storageService.js    # Persistent local farm records & settings (localStorage)
└── icons/                       # App icons (192x192, 512x512)
```

---

## 🚀 How to Run & Preview

Start the lightweight Python local HTTP server:
```bash
python3 -m http.server 8080
```
Open in any browser:
```
http://localhost:8080
```
- On mobile devices: Open the URL on your phone's browser (or add to home screen via PWA).
- On desktop: Use the top toolbar toggle to view in **Mobile Frame** or **Responsive View**.

---

## 🔍 Trust & Demo Data Disclosures

- **Isolated Data:** All demo figures are contained exclusively within [`js/data/demoData.js`](file:///Users/ranjankumar/testantygravity/js/data/demoData.js).
- **Date & Tag Badges:** Every price and estimate displays `⚠️ Demo Data • 10 Oct 2026`.
- **Fact vs. Estimate Separation:** Historical benchmark rates are explicitly distinguished from prospective estimates.
- **No Unfounded Promises:** Disclaimers emphasize that real agricultural outcomes depend on micro-climate events, localized pests, and market arrivals.

---

## 📋 Roadmap: Transitioning to Production Pilot

To take this prototype from demo data to a live district pilot in Nashik, the following integrations and datasets are required:

| Component | Current Prototype State | Production Requirement for Pilot |
| :--- | :--- | :--- |
| **Market Prices** | Simulated APMC rates for Lasalgaon & Nashik | Connect to live **Agmarknet API / e-NAM API** for daily arrivals and modal auction rates. |
| **Soil Profiling** | Farmer selects broad soil texture (Black, Loam, etc.) | Connect to **Soil Health Card (SHC) API** via farmer's Aadhaar or survey number for exact N, P, K, Organic Carbon, and pH values. |
| **Crop Recommendations** | Heuristic matching with suitability notes | Validate rules with local **Krishi Vigyan Kendra (KVK Yashwantrao Chavan / ICAR)** agronomists. |
| **Crop Protection** | General symptoms & CIB&RC safety disclaimer | Integrate official **Central Insecticides Board & Registration Committee (CIB&RC)** approved label database. |
| **Weather & Sowing Windows** | Static season selection | Integrate **IMD (India Meteorological Department) Gramin Krishi Mausam Seva (GKMS)** district agro-bulletins. |
| **Voice Processing** | Browser Web Speech API + honest modal fallback | Integrate **AI4Bharat / Bhashini API** for high-accuracy regional Marathi and Hindi speech recognition. |

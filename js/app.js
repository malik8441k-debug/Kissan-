/**
 * KISAN MARGDARSHAK - MAIN APPLICATION CONTROLLER
 * Orchestrates navigation, i18n, speech services, scenario calculations,
 * and persistent local farm records.
 */

class KisanApp {
  constructor() {
    this.currentLang = storageService.getLanguage();
    this.currentScreen = 'screen-home';
    this.activeCropFilter = {
      season: 'kharif',
      soil: 'black',
      soilTest: 'no',
      water: 'moderate',
      acres: 2.0
    };
    this.budgetState = {
      cropId: 'soybean',
      acres: 2.0
    };
    this.mandiState = {
      cropId: 'onion',
      quintals: 50
    };
    this.selectedSymptomId = null;

    this.init();
  }

  init() {
    this.setupViewMode();
    this.setupNavigation();
    this.setupLanguageSwitcher();
    this.setupSpeechEvents();
    this.setupCropRecScreen();
    this.setupBudgetScreen();
    this.setupMandiScreen();
    this.setupProtectScreen();
    this.setupDiaryScreen();

    // Initial language render
    this.applyLanguage(this.currentLang);

    // Initial data renders
    this.renderSuitableCrops();
    this.renderBudgetCalculations();
    this.renderMandiComparisons();
    this.renderSellNowWaitComparison();
    this.renderProtectionChecklist();
    this.renderSymptomsList();
    this.renderProtectionMethods();
    this.renderDiaryRecords();
  }

  // =========================================================================
  // VIEW MODE (MOBILE FRAME vs FULLSCREEN RESPONSIVE)
  // =========================================================================
  setupViewMode() {
    const btnMobile = document.getElementById('btn-mode-mobile');
    const btnFullscreen = document.getElementById('btn-mode-fullscreen');
    const currentView = storageService.getDeviceView();

    const applyView = (mode) => {
      if (mode === 'fullscreen') {
        document.body.classList.add('fullscreen-mode');
        btnFullscreen.classList.add('active');
        btnMobile.classList.remove('active');
      } else {
        document.body.classList.remove('fullscreen-mode');
        btnMobile.classList.add('active');
        btnFullscreen.classList.remove('active');
      }
      storageService.setDeviceView(mode);
    };

    applyView(currentView);

    btnMobile.addEventListener('click', () => applyView('mobile'));
    btnFullscreen.addEventListener('click', () => applyView('fullscreen'));
  }

  // =========================================================================
  // NAVIGATION & ROUTING
  // =========================================================================
  setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const brandBtn = document.getElementById('brand-home-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    const switchScreen = (screenId) => {
      speechService.stopSpeaking();

      // Update screen visibility
      document.querySelectorAll('.screen').forEach(scr => {
        scr.classList.remove('active');
      });
      const targetScreen = document.getElementById(screenId);
      if (targetScreen) {
        targetScreen.classList.add('active');
        this.currentScreen = screenId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      // Update bottom nav active state
      navItems.forEach(item => {
        if (item.getAttribute('data-target') === screenId) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    };

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        switchScreen(target);
      });
    });

    brandBtn.addEventListener('click', () => switchScreen('screen-home'));

    menuCards.forEach(card => {
      card.addEventListener('click', () => {
        const target = card.getAttribute('data-target');
        switchScreen(target);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const target = card.getAttribute('data-target');
          switchScreen(target);
        }
      });
    });

    this.switchScreen = switchScreen;
  }

  // =========================================================================
  // LOCALIZATION (i18n) ENGINE
  // =========================================================================
  setupLanguageSwitcher() {
    const langModal = document.getElementById('modal-language');
    const openBtn = document.getElementById('open-lang-modal-btn');
    const closeBtn = document.getElementById('close-lang-modal-btn');
    const langOptions = document.querySelectorAll('.lang-option-btn');

    openBtn.addEventListener('click', () => {
      langModal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
      langModal.classList.remove('active');
    });

    langModal.addEventListener('click', (e) => {
      if (e.target === langModal) langModal.classList.remove('active');
    });

    langOptions.forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedLang = btn.getAttribute('data-lang');
        this.setLanguage(selectedLang);
        langModal.classList.remove('active');
      });
    });
  }

  setLanguage(langCode) {
    this.currentLang = langCode;
    storageService.setLanguage(langCode);
    this.applyLanguage(langCode);
    // Re-render data views to reflect translated content
    this.renderSuitableCrops();
    this.renderBudgetCalculations();
    this.renderMandiComparisons();
    this.renderSellNowWaitComparison();
    this.renderProtectionChecklist();
    this.renderSymptomsList();
    this.renderProtectionMethods();
    this.renderDiaryRecords();
  }

  applyLanguage(lang) {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    document.documentElement.lang = lang;

    // Header labels
    document.getElementById('app-title-txt').textContent = t.appTitle;
    document.getElementById('app-sub-txt').textContent = t.appSubtitle;
    document.getElementById('pilot-badge-txt').textContent = "📍 " + t.pilotDistrictBadge;
    document.getElementById('current-lang-label').textContent = lang === 'hi' ? 'हिंदी' : (lang === 'mr' ? 'मराठी' : 'English');

    // Bottom nav
    document.getElementById('nav-lbl-home').textContent = t.navHome;
    document.getElementById('nav-lbl-crops').textContent = t.navCrops;
    document.getElementById('nav-lbl-budget').textContent = t.navBudget;
    document.getElementById('nav-lbl-mandi').textContent = t.navMandi;
    document.getElementById('nav-lbl-protect').textContent = t.navProtect;
    document.getElementById('nav-lbl-diary').textContent = t.navDiary;

    // Home Screen
    document.getElementById('txt-welcome-farmer').textContent = t.welcomeFarmer;
    document.getElementById('txt-home-sub').textContent = t.homeSubtitle;
    document.getElementById('txt-menu-1-title').textContent = t.homeCard1Title;
    document.getElementById('txt-menu-1-desc').textContent = t.homeCard1Desc;
    document.getElementById('txt-menu-2-title').textContent = t.homeCard2Title;
    document.getElementById('txt-menu-2-desc').textContent = t.homeCard2Desc;
    document.getElementById('txt-menu-3-title').textContent = t.homeCard3Title;
    document.getElementById('txt-menu-3-desc').textContent = t.homeCard3Desc;
    document.getElementById('txt-menu-4-title').textContent = t.homeCard4Title;
    document.getElementById('txt-menu-4-desc').textContent = t.homeCard4Desc;
    document.getElementById('txt-menu-5-title').textContent = t.homeCard5Title;
    document.getElementById('txt-menu-5-desc').textContent = t.homeCard5Desc;

    // Screen 1: Crops
    document.getElementById('crops-title').textContent = t.cropRecTitle;
    document.getElementById('crops-subtitle').textContent = t.cropRecSubtitle;
    document.getElementById('lbl-crop-district').textContent = t.fieldDistrictLabel;
    document.getElementById('lbl-crop-area').textContent = t.fieldAreaLabel;
    document.getElementById('lbl-crop-season').textContent = t.fieldSeasonLabel;
    document.getElementById('lbl-crop-soil').textContent = t.fieldSoilLabel;
    document.getElementById('lbl-crop-soiltest').textContent = t.fieldSoilTestLabel;
    document.getElementById('lbl-crop-water').textContent = t.fieldWaterLabel;
    document.getElementById('opt-kharif').textContent = t.seasonKharif;
    document.getElementById('opt-rabi').textContent = t.seasonRabi;
    document.getElementById('opt-zaid').textContent = t.seasonZaid;
    document.getElementById('opt-soil-black').textContent = t.soilBlack;
    document.getElementById('opt-soil-loam').textContent = t.soilLoam;
    document.getElementById('opt-soil-sandy').textContent = t.soilSandy;
    document.getElementById('opt-soil-clay').textContent = t.soilClay;
    document.getElementById('opt-soiltest-yes').textContent = t.soilTestYes;
    document.getElementById('opt-soiltest-no').textContent = t.soilTestNo;
    document.getElementById('opt-water-canal').textContent = t.waterCanal;
    document.getElementById('opt-water-tube').textContent = t.waterTube;
    document.getElementById('opt-water-rain').textContent = t.waterRain;
    document.getElementById('txt-find-crops').textContent = t.findCropsBtn;
    document.getElementById('txt-crop-voice').textContent = t.voiceInputBtn;
    document.getElementById('txt-suitable-crops-hdr').textContent = t.suitableCropsHeader;

    // Screen 2: Budget
    document.getElementById('budget-title').textContent = t.budgetTitle;
    document.getElementById('budget-subtitle').textContent = t.budgetSubtitle;
    document.getElementById('lbl-budget-crop').textContent = t.selectCropLabel;
    document.getElementById('lbl-budget-area').textContent = t.enterAreaLabel;
    document.getElementById('txt-costs-hdr').textContent = t.costsHeader;
    document.getElementById('lbl-cost-seed').textContent = t.seedCostLabel;
    document.getElementById('lbl-cost-fert').textContent = t.fertCostLabel;
    document.getElementById('lbl-cost-labor').textContent = t.laborCostLabel;
    document.getElementById('lbl-cost-irrig').textContent = t.irrigCostLabel;
    document.getElementById('lbl-cost-protect').textContent = t.protectCostLabel;
    document.getElementById('lbl-cost-mach').textContent = t.machCostLabel;
    document.getElementById('lbl-cost-transp').textContent = t.transpCostLabel;
    document.getElementById('txt-calc-budget-btn').textContent = t.calcBudgetBtn;
    document.getElementById('lbl-total-cost').textContent = t.totalCostLabel;
    document.getElementById('txt-scenarios-hdr').textContent = t.scenariosHeader;

    // Screen 3: Mandi
    document.getElementById('mandi-title').textContent = t.mandiTitle;
    document.getElementById('mandi-subtitle').textContent = t.mandiSubtitle;
    document.getElementById('lbl-mandi-crop-select').textContent = t.selectCropMandiLabel;
    document.getElementById('txt-mandi-table-title').textContent = t.mandiTableTitle;
    document.getElementById('mandi-insight-body').textContent = " " + t.netPocketExpl;
    document.getElementById('txt-sellnow-wait-hdr').textContent = t.sellNowWaitHeader;

    // Screen 4: Protection
    document.getElementById('protect-title').textContent = t.protectTitle;
    document.getElementById('protect-subtitle').textContent = t.protectSubtitle;
    document.getElementById('txt-checklist-hdr').textContent = t.checklistHeader;
    document.getElementById('txt-symptom-hdr').textContent = t.symptomHeader;
    document.getElementById('txt-select-symptom-prompt').textContent = t.selectSymptomPrompt;
    document.getElementById('lbl-photo-upload').textContent = t.photoUploadLabel;
    document.getElementById('txt-diagnose-btn').textContent = t.diagnoseBtn;
    document.getElementById('txt-pest-safety-body').textContent = t.pesticideSafetyWarning;
    document.getElementById('txt-kvk-body').textContent = t.kvkRecommendation;
    document.getElementById('txt-compare-methods-hdr').textContent = t.methodsComparisonHeader;

    // Screen 5: Diary
    document.getElementById('diary-title').textContent = t.diaryTitle;
    document.getElementById('diary-subtitle').textContent = t.diarySubtitle;
    document.getElementById('txt-new-record-btn').textContent = t.newRecordBtn;
    document.getElementById('lbl-sum-expense').textContent = t.summaryInvested;
    document.getElementById('lbl-sum-sales').textContent = t.summarySales;
    document.getElementById('lbl-sum-net').textContent = t.summaryNet;

    // Footer
    document.getElementById('app-footer-source').textContent = t.demoDataSourceFooter;

    // Update listen button labels
    document.querySelectorAll('.listen-btn-text').forEach(el => {
      el.textContent = t.listenButton;
    });

    // Update active highlight on language modal
    document.querySelectorAll('.lang-option-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // SPEECH / AUDIO & VOICE PROTOTYPE SERVICES
  // =========================================================================
  setupSpeechEvents() {
    const listenButtons = [
      { id: 'listen-home-btn', text: () => TRANSLATIONS[this.currentLang].welcomeFarmer + ". " + TRANSLATIONS[this.currentLang].homeSubtitle },
      { id: 'listen-crops-btn', text: () => TRANSLATIONS[this.currentLang].cropRecTitle + ". " + TRANSLATIONS[this.currentLang].cropRecSubtitle },
      { id: 'listen-budget-btn', text: () => TRANSLATIONS[this.currentLang].budgetTitle + ". " + TRANSLATIONS[this.currentLang].budgetSubtitle + " " + TRANSLATIONS[this.currentLang].budgetDisclaimer },
      { id: 'listen-mandi-btn', text: () => TRANSLATIONS[this.currentLang].mandiTitle + ". " + TRANSLATIONS[this.currentLang].netPocketExpl },
      { id: 'listen-protect-btn', text: () => TRANSLATIONS[this.currentLang].protectTitle + ". " + TRANSLATIONS[this.currentLang].pesticideSafetyWarning },
      { id: 'listen-diary-btn', text: () => TRANSLATIONS[this.currentLang].diaryTitle + ". " + TRANSLATIONS[this.currentLang].diarySubtitle }
    ];

    listenButtons.forEach(cfg => {
      const btn = document.getElementById(cfg.id);
      if (btn) {
        btn.addEventListener('click', () => {
          const txt = cfg.text();
          speechService.speakText(txt, this.currentLang, btn);
        });
      }
    });

    // Voice Input prototype triggers
    const voiceTriggers = ['home-mic-btn', 'crop-voice-btn', 'diary-mic-btn'];
    const voiceModal = document.getElementById('modal-voice');
    const closeVoiceBtn = document.getElementById('close-voice-modal-btn');
    const dismissVoiceBtn = document.getElementById('btn-dismiss-voice-modal');
    const submitVoiceBtn = document.getElementById('btn-submit-voice-fallback');
    const statusText = document.getElementById('voice-status-text');
    const fallbackInput = document.getElementById('voice-manual-fallback-input');

    const openVoicePrototype = (context = 'general') => {
      voiceModal.classList.add('active');
      statusText.textContent = this.currentLang === 'hi' 
        ? "माइक सुन रहा है... फसल, रकबा या समस्या बोलें।"
        : (this.currentLang === 'mr' ? "माइक सुरू आहे... पीक, क्षेत्र किंवा समस्या बोला." : "Mic listening... Speak your crop or query.");

      speechService.startVoiceInput(
        this.currentLang,
        (transcript) => {
          fallbackInput.value = transcript;
          statusText.textContent = (this.currentLang === 'hi' ? "पहचाना गया: " : "Recognized: ") + transcript;
        },
        (errorType) => {
          statusText.textContent = this.currentLang === 'hi'
            ? "⚠️ आवाज पहचान ब्राउज़र में उपलब्ध नहीं है। नीचे लिखकर या चुनकर बताएं।"
            : (this.currentLang === 'mr' 
              ? "⚠️ ब्राऊझरमध्ये आवाज ओळख उपलब्ध नाही. कृपया खाली लिहून किंवा निवडून सांगा."
              : "⚠️ Speech recognition unavailable or blocked. Please type or tap options below.");
        }
      );
    };

    voiceTriggers.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', () => openVoicePrototype(id));
    });

    closeVoiceBtn.addEventListener('click', () => voiceModal.classList.remove('active'));
    dismissVoiceBtn.addEventListener('click', () => voiceModal.classList.remove('active'));
    voiceModal.addEventListener('click', (e) => {
      if (e.target === voiceModal) voiceModal.classList.remove('active');
    });

    submitVoiceBtn.addEventListener('click', () => {
      const val = fallbackInput.value.trim();
      if (val) {
        speechService.showVoiceNotification("Voice input saved: " + val, "आवाज इनपुट लागू किया गया: " + val);
        voiceModal.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // SECTION 1: CHOOSE WHAT TO GROW LOGIC
  // =========================================================================
  setupCropRecScreen() {
    const areaDisplay = document.getElementById('crop-area-display');
    const btnInc = document.getElementById('step-area-inc');
    const btnDec = document.getElementById('step-area-dec');
    const quickAreaBtns = document.querySelectorAll('.quick-area');
    const filterBtn = document.getElementById('btn-filter-crops');

    const updateAreaDisplay = () => {
      const unit = this.currentLang === 'hi' ? 'एकड़' : (this.currentLang === 'mr' ? 'एकर' : 'Acres');
      areaDisplay.textContent = this.activeCropFilter.acres.toFixed(1) + ' ' + unit;
    };

    btnInc.addEventListener('click', () => {
      this.activeCropFilter.acres = Math.min(50, this.activeCropFilter.acres + 0.5);
      updateAreaDisplay();
    });

    btnDec.addEventListener('click', () => {
      this.activeCropFilter.acres = Math.max(0.5, this.activeCropFilter.acres - 0.5);
      updateAreaDisplay();
    });

    quickAreaBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        quickAreaBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCropFilter.acres = parseFloat(btn.getAttribute('data-acres'));
        updateAreaDisplay();
      });
    });

    // Helper for choice grids
    const setupChipGroup = (containerId, onSelect) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      const chips = container.querySelectorAll('.chip-btn');
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          const val = chip.getAttribute('data-val');
          onSelect(val);
        });
      });
    };

    setupChipGroup('season-choice-grid', (val) => { this.activeCropFilter.season = val; });
    setupChipGroup('soil-choice-grid', (val) => { this.activeCropFilter.soil = val; });
    setupChipGroup('soiltest-choice-grid', (val) => { this.activeCropFilter.soilTest = val; });
    setupChipGroup('water-choice-grid', (val) => { this.activeCropFilter.water = val; });

    filterBtn.addEventListener('click', () => {
      this.renderSuitableCrops();
      const resultsEl = document.getElementById('crop-results-section');
      if (resultsEl) resultsEl.scrollIntoView({ behavior: 'smooth' });
    });
  }

  renderSuitableCrops() {
    const container = document.getElementById('crop-results-list');
    if (!container) return;
    container.innerHTML = '';

    const lang = this.currentLang;
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const filter = this.activeCropFilter;

    // Filter DEMO_CROPS based on season and soil match
    let matches = DEMO_CROPS.filter(crop => {
      const seasonMatch = crop.seasons.includes(filter.season);
      const soilMatch = crop.soilTypes.includes(filter.soil);
      return seasonMatch || soilMatch; // Inclusive so farmer always gets suggestions with reasons
    });

    if (matches.length === 0) {
      matches = DEMO_CROPS.slice(0, 3); // Fallback to pilot crops
    }

    matches.forEach(crop => {
      const card = document.createElement('div');
      card.className = 'crop-result-card';

      const cropName = crop.name[lang] || crop.name.en;
      const whyText = crop.whySuitable[lang] || crop.whySuitable.en;
      const missingText = (filter.soilTest === 'no' 
        ? (lang === 'hi' ? 'मिट्टी जांच (pH, N, P, K) नहीं कराई गई है। ' : (lang === 'mr' ? 'माती परीक्षण केलेले नाही. ' : 'Soil test report is missing. '))
        : '') + (crop.missingInfo[lang] || crop.missingInfo.en);
      const risksText = crop.keyRisks[lang] || crop.keyRisks.en;

      card.innerHTML = `
        <div class="crop-header">
          <div class="crop-name-group">
            <span class="crop-icon-large">${crop.icon}</span>
            <div>
              <div class="crop-title">${cropName}</div>
              <span class="badge-pilot" style="color:var(--color-text-main); background:var(--color-bg-muted); font-size:0.75rem;">
                ⏱️ ${crop.durationDays}
              </span>
            </div>
          </div>
          <button class="listen-btn listen-crop-item-btn" style="padding:4px 10px; min-height:36px;" aria-label="Listen about ${cropName}">
            🔊
          </button>
        </div>

        <div class="info-block why">
          <span class="info-block-label">✅ ${t.whySuitableLabel}</span>
          ${whyText}
        </div>

        <div class="info-block missing">
          <span class="info-block-label">🔍 ${t.missingInfoLabel}</span>
          ${missingText}
        </div>

        <div class="info-block risks">
          <span class="info-block-label">⚠️ ${t.keyRisksLabel}</span>
          ${risksText}
        </div>

        <button type="button" class="btn-secondary link-to-budget-btn" data-crop="${crop.id}" style="margin-top: 12px; font-size: 0.95rem;">
          💰 ${t.viewBudgetForThisCrop}
        </button>
      `;

      // Listen speech event for this crop
      const listenBtn = card.querySelector('.listen-crop-item-btn');
      listenBtn.addEventListener('click', () => {
        const fullAdvice = `${cropName}. ${whyText}. ${t.keyRisksLabel}: ${risksText}`;
        speechService.speakText(fullAdvice, lang, listenBtn);
      });

      // Navigate to budget screen for this crop
      const budgetBtn = card.querySelector('.link-to-budget-btn');
      budgetBtn.addEventListener('click', () => {
        this.budgetState.cropId = crop.id;
        this.budgetState.acres = this.activeCropFilter.acres;
        this.switchScreen('screen-budget');
        this.syncBudgetInputs();
        this.renderBudgetCalculations();
      });

      container.appendChild(card);
    });
  }

  // =========================================================================
  // SECTION 2: CROP BUDGET & SCENARIOS LOGIC
  // =========================================================================
  setupBudgetScreen() {
    const cropSelect = document.getElementById('budget-crop-select');
    const areaDisplay = document.getElementById('budget-area-display');
    const btnInc = document.getElementById('budget-area-inc');
    const btnDec = document.getElementById('budget-area-dec');
    const calcBtn = document.getElementById('btn-calc-budget');

    // Populate crops in dropdown
    const populateCrops = () => {
      cropSelect.innerHTML = '';
      DEMO_CROPS.forEach(crop => {
        const opt = document.createElement('option');
        opt.value = crop.id;
        opt.textContent = `${crop.icon} ${crop.name[this.currentLang] || crop.name.en}`;
        cropSelect.appendChild(opt);
      });
      cropSelect.value = this.budgetState.cropId;
    };
    populateCrops();
    this.populateBudgetCrops = populateCrops;

    const updateAreaDisplay = () => {
      const unit = this.currentLang === 'hi' ? 'एकड़' : (this.currentLang === 'mr' ? 'एकर' : 'Acres');
      areaDisplay.textContent = this.budgetState.acres.toFixed(1) + ' ' + unit;
    };

    btnInc.addEventListener('click', () => {
      this.budgetState.acres = Math.min(50, this.budgetState.acres + 0.5);
      updateAreaDisplay();
      this.scaleBudgetDefaults();
      this.renderBudgetCalculations();
    });

    btnDec.addEventListener('click', () => {
      this.budgetState.acres = Math.max(0.5, this.budgetState.acres - 0.5);
      updateAreaDisplay();
      this.scaleBudgetDefaults();
      this.renderBudgetCalculations();
    });

    cropSelect.addEventListener('change', (e) => {
      this.budgetState.cropId = e.target.value;
      this.scaleBudgetDefaults();
      this.renderBudgetCalculations();
    });

    calcBtn.addEventListener('click', () => {
      this.renderBudgetCalculations();
      const scenariosEl = document.getElementById('scenarios-list');
      if (scenariosEl) scenariosEl.scrollIntoView({ behavior: 'smooth' });
    });

    // Re-calc on any cost input edit
    document.querySelectorAll('.budget-cost-input').forEach(input => {
      input.addEventListener('input', () => {
        this.renderBudgetCalculations();
      });
    });
  }

  syncBudgetInputs() {
    const cropSelect = document.getElementById('budget-crop-select');
    if (cropSelect) cropSelect.value = this.budgetState.cropId;
    const areaDisplay = document.getElementById('budget-area-display');
    if (areaDisplay) {
      const unit = this.currentLang === 'hi' ? 'एकड़' : (this.currentLang === 'mr' ? 'एकर' : 'Acres');
      areaDisplay.textContent = this.budgetState.acres.toFixed(1) + ' ' + unit;
    }
    this.scaleBudgetDefaults();
  }

  scaleBudgetDefaults() {
    const crop = DEMO_CROPS.find(c => c.id === this.budgetState.cropId) || DEMO_CROPS[0];
    const acres = this.budgetState.acres;
    const def = crop.defaultCostsPerAcre;

    document.getElementById('cost-seed').value = Math.round(def.seed * acres);
    document.getElementById('cost-fert').value = Math.round(def.fertilizer * acres);
    document.getElementById('cost-labor').value = Math.round(def.labor * acres);
    document.getElementById('cost-irrig').value = Math.round(def.irrigation * acres);
    document.getElementById('cost-protect').value = Math.round(def.protection * acres);
    document.getElementById('cost-mach').value = Math.round(def.machinery * acres);
    document.getElementById('cost-transp').value = Math.round(def.transport * acres);
  }

  renderBudgetCalculations() {
    if (this.populateBudgetCrops) this.populateBudgetCrops();

    const crop = DEMO_CROPS.find(c => c.id === this.budgetState.cropId) || DEMO_CROPS[0];
    const acres = this.budgetState.acres;
    const lang = this.currentLang;
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

    // Sum entered costs
    const seed = parseFloat(document.getElementById('cost-seed').value) || 0;
    const fert = parseFloat(document.getElementById('cost-fert').value) || 0;
    const labor = parseFloat(document.getElementById('cost-labor').value) || 0;
    const irrig = parseFloat(document.getElementById('cost-irrig').value) || 0;
    const protect = parseFloat(document.getElementById('cost-protect').value) || 0;
    const mach = parseFloat(document.getElementById('cost-mach').value) || 0;
    const transp = parseFloat(document.getElementById('cost-transp').value) || 0;

    const totalCost = seed + fert + labor + irrig + protect + mach + transp;
    document.getElementById('budget-total-cost-num').textContent = `₹ ${totalCost.toLocaleString('en-IN')}`;

    // Render 3 scenarios
    const scenariosList = document.getElementById('scenarios-list');
    if (!scenariosList) return;
    scenariosList.innerHTML = '';

    const scData = crop.scenarios;
    const configs = [
      { key: 'low', title: t.scenarioLow, data: scData.low, cls: 'low' },
      { key: 'typical', title: t.scenarioTypical, data: scData.typical, cls: 'typical' },
      { key: 'high', title: t.scenarioHigh, data: scData.high, cls: 'high' }
    ];

    configs.forEach(cfg => {
      const totalYieldQtl = (cfg.data.yieldPerAcre * acres).toFixed(1);
      const grossSales = Math.round(totalYieldQtl * cfg.data.pricePerQuintal);
      const netGain = grossSales - totalCost;
      const isProfit = netGain >= 0;

      const assumptionsText = lang === 'hi' ? cfg.data.assumptionsHi : (lang === 'mr' ? cfg.data.assumptionsMr : cfg.data.assumptionsEn);

      const card = document.createElement('div');
      card.className = `scenario-card ${cfg.cls}`;
      card.innerHTML = `
        <div class="scenario-title">
          <span>${cfg.title}</span>
          <span class="badge-demo" style="font-size:0.75rem;">Estimate</span>
        </div>

        <div class="scenario-grid">
          <div class="scenario-metric">
            <span class="metric-label">${t.yieldAssumed}</span>
            <div class="metric-value">${totalYieldQtl} ${t.quintalUnit}</div>
            <span style="font-size:0.75rem; color:var(--color-text-muted);">(${cfg.data.yieldPerAcre} Q/acre)</span>
          </div>

          <div class="scenario-metric">
            <span class="metric-label">${t.priceAssumed}</span>
            <div class="metric-value">₹ ${cfg.data.pricePerQuintal.toLocaleString('en-IN')} / Q</div>
          </div>

          <div class="scenario-metric">
            <span class="metric-label">${t.totalSalesLabel}</span>
            <div class="metric-value">₹ ${grossSales.toLocaleString('en-IN')}</div>
          </div>

          <div class="scenario-metric" style="background:${isProfit ? 'rgba(232, 245, 233, 0.9)' : 'rgba(255, 235, 238, 0.9)'};">
            <span class="metric-label">${t.netProfitLabel}</span>
            <div class="metric-value metric-profit ${isProfit ? 'positive' : 'negative'}">
              ${isProfit ? '+' : ''}₹ ${netGain.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div style="font-size:0.85rem; color:var(--color-text-secondary); margin-top:6px;">
          <strong>${t.assumptionsNote}</strong> ${assumptionsText}
        </div>
      `;

      scenariosList.appendChild(card);
    });
  }

  // =========================================================================
  // SECTION 3: MARKET PRICES & SELLING LOGIC
  // =========================================================================
  setupMandiScreen() {
    const cropSelect = document.getElementById('mandi-crop-select');
    const qtyDisplay = document.getElementById('mandi-qty-display');
    const btnInc = document.getElementById('mandi-qty-inc');
    const btnDec = document.getElementById('mandi-qty-dec');

    const updateQtyDisplay = () => {
      const unit = this.currentLang === 'hi' ? 'क्विंटल' : (this.currentLang === 'mr' ? 'क्विंटल' : 'Quintals');
      qtyDisplay.textContent = this.mandiState.quintals + ' ' + unit;
    };

    btnInc.addEventListener('click', () => {
      this.mandiState.quintals = Math.min(500, this.mandiState.quintals + 10);
      updateQtyDisplay();
      this.renderMandiComparisons();
    });

    btnDec.addEventListener('click', () => {
      this.mandiState.quintals = Math.max(5, this.mandiState.quintals - 10);
      updateQtyDisplay();
      this.renderMandiComparisons();
    });

    cropSelect.addEventListener('change', (e) => {
      this.mandiState.cropId = e.target.value;
      this.renderMandiComparisons();
      this.renderSellNowWaitComparison();
    });
  }

  renderMandiComparisons() {
    const container = document.getElementById('mandi-cards-list');
    if (!container) return;
    container.innerHTML = '';

    const lang = this.currentLang;
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const selectedCrop = this.mandiState.cropId;
    const qty = this.mandiState.quintals;

    // Filter mandis matching crop
    const mandis = DEMO_MARKET_PRICES.filter(m => m.cropId === selectedCrop);

    mandis.forEach(m => {
      const mandiName = lang === 'hi' ? m.mandiNameHi : (lang === 'mr' ? m.mandiNameMr : m.mandiNameEn);
      const noteText = lang === 'hi' ? m.noteHi : (lang === 'mr' ? m.noteMr : m.noteEn);

      // Deductions per quintal
      const totalDeductionsPerQtl = m.transportCostPerQtl + m.mandiFeePerQtl + m.qualityDeductionAvgPerQtl;
      const netReturnPerQtl = m.modalPrice - totalDeductionsPerQtl;
      const totalNetInPocket = netReturnPerQtl * qty;

      const card = document.createElement('div');
      card.className = 'mandi-card';
      card.innerHTML = `
        <div class="mandi-header">
          <div>
            <div class="mandi-name">${mandiName}</div>
            <span style="font-size: 0.8rem; color: var(--color-text-muted);">📅 ${m.date} • ${m.isDemo ? 'Demo data' : 'Verified'}</span>
          </div>
          <span class="mandi-dist">📍 ${m.distanceKm} km</span>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:8px;">
          <div>
            <span style="font-size:0.85rem; color:var(--color-text-muted);">${t.modalPriceColumn}:</span>
            <strong style="font-size:1.25rem; color:var(--color-primary-dark); display:block;">
              ₹ ${m.modalPrice.toLocaleString('en-IN')} <span style="font-size:0.8rem; font-weight:normal;">/ Qtl</span>
            </strong>
          </div>
          <div style="text-align:right;">
            <span style="font-size:0.8rem; color:var(--color-text-muted);">Range:</span>
            <div style="font-size:0.85rem; font-weight:600;">₹ ${m.minPrice} - ₹ ${m.maxPrice}</div>
          </div>
        </div>

        <div class="mandi-breakdown">
          <div class="breakdown-row">
            <span>🚛 ${t.transportDeductionLabel} (${m.distanceKm} km):</span>
            <span>- ₹ ${m.transportCostPerQtl} / Q</span>
          </div>
          <div class="breakdown-row">
            <span>⚖️ ${t.mandiCessLabel}:</span>
            <span>- ₹ ${m.mandiFeePerQtl} / Q</span>
          </div>
          <div class="breakdown-row">
            <span>💧 ${t.qualityDockageLabel}:</span>
            <span>- ₹ ${m.qualityDeductionAvgPerQtl} / Q</span>
          </div>
          <div class="breakdown-row net-total">
            <span>💵 ${t.netReturnColumn}:</span>
            <span>₹ ${netReturnPerQtl.toLocaleString('en-IN')} / Qtl</span>
          </div>
          <div class="breakdown-row" style="margin-top:4px; font-weight:700; color:var(--color-text-main);">
            <span>📦 Total Pocket Net (${qty} Q):</span>
            <span style="color:var(--color-primary);">₹ ${totalNetInPocket.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div style="font-size:0.85rem; color:var(--color-accent); margin-top:8px; font-weight:600;">
          💡 ${noteText}
        </div>
      `;

      container.appendChild(card);
    });
  }

  renderSellNowWaitComparison() {
    const container = document.getElementById('sellnow-wait-content');
    if (!container) return;

    const lang = this.currentLang;
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const cropKey = this.mandiState.cropId === 'soybean' ? 'soybean' : 'onion';
    const data = DEMO_SELL_NOW_WAIT[cropKey] || DEMO_SELL_NOW_WAIT.onion;

    const timingNow = lang === 'hi' ? data.sellNow.timingHi : (lang === 'mr' ? data.sellNow.timingMr : data.sellNow.timingEn);
    const cashNow = lang === 'hi' ? data.sellNow.cashFlowHi : (lang === 'mr' ? data.sellNow.cashFlowMr : data.sellNow.cashFlowEn);

    const timingWait = lang === 'hi' ? data.waitAndSell.timingHi : (lang === 'mr' ? data.waitAndSell.timingMr : data.waitAndSell.timingEn);
    const cautionText = lang === 'hi' ? data.waitAndSell.futureUncertaintyNoteHi : (lang === 'mr' ? data.waitAndSell.futureUncertaintyNoteMr : data.waitAndSell.futureUncertaintyNoteEn);

    container.innerHTML = `
      <div class="comparison-grid">
        <div class="sell-option-card sell-now">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:var(--color-success); font-size:1.05rem;">⚡ ${t.sellNowCard}</strong>
            <span class="badge-demo" style="font-size:0.75rem;">Now</span>
          </div>
          <div style="margin-top:6px; font-size:0.9rem;">
            <div><strong>${t.timingLabel}</strong> ${timingNow}</div>
            <div><strong>${t.cashFlowLabel}</strong> ${cashNow}</div>
            <div><strong>${t.storageRisksLabel}</strong> ₹ 0 (Zero storage loss, zero rent)</div>
            <div style="margin-top:6px; font-size:1.1rem; font-weight:800; color:var(--color-primary-dark);">
              ${t.effectiveRealizationLabel}: ₹ ${data.sellNow.projectedNetPrice} / Qtl
            </div>
          </div>
        </div>

        <div class="sell-option-card wait-sell">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:var(--color-accent); font-size:1.05rem;">⏳ ${t.waitCard}</strong>
            <span class="badge-demo" style="font-size:0.75rem;">Uncertain</span>
          </div>
          <div style="margin-top:6px; font-size:0.9rem;">
            <div><strong>${t.timingLabel}</strong> ${timingWait}</div>
            <div><strong>Paper Price:</strong> ₹ ${data.waitAndSell.prospectiveGrossPrice} / Qtl (Headline look)</div>
            <div><strong>Deductions:</strong> Warehouse rent ₹${data.waitAndSell.storageRentPerQtl} + ${data.waitAndSell.weightLossPct}% natural shrinkage/rot</div>
            <div style="margin-top:6px; font-size:1.1rem; font-weight:800; color:var(--color-accent);">
              ${t.effectiveRealizationLabel}: ₹ ${data.waitAndSell.effectiveNetRealization} / Qtl
            </div>
          </div>
        </div>
      </div>

      <div class="notice-box warning" style="margin-top:12px;">
        <strong>⚠️ ${t.futureUncertaintyTitle}:</strong>
        <p style="margin-top:4px;">${cautionText}</p>
      </div>
    `;
  }

  // =========================================================================
  // SECTION 4: CROP PROTECTION & HEALTH LOGIC
  // =========================================================================
  setupProtectScreen() {
    const photoBox = document.getElementById('photo-upload-box');
    const photoInput = document.getElementById('crop-photo-input');
    const photoPreview = document.getElementById('photo-preview-img');
    const diagnoseBtn = document.getElementById('btn-diagnose-symptom');

    photoBox.addEventListener('click', () => photoInput.click());

    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          photoPreview.src = event.target.result;
          photoPreview.style.display = 'block';
          document.getElementById('txt-tap-camera').textContent = TRANSLATIONS[this.currentLang].photoChosen + " (✓)";
        };
        reader.readAsDataURL(file);
      }
    });

    diagnoseBtn.addEventListener('click', () => {
      this.renderDiagnosisResult();
    });
  }

  renderProtectionChecklist() {
    const container = document.getElementById('checklist-container');
    if (!container) return;
    container.innerHTML = '';

    const lang = this.currentLang;

    DEMO_PROTECTION_CHECKLIST.forEach(stage => {
      const stageName = lang === 'hi' ? stage.stageHi : (lang === 'mr' ? stage.stageMr : stage.stageEn);

      const block = document.createElement('div');
      block.style.marginBottom = '14px';
      block.innerHTML = `
        <div style="font-weight:800; color:var(--color-primary-dark); font-size:1.02rem; margin-bottom:6px;">
          📅 ${stageName}
        </div>
      `;

      stage.items.forEach(item => {
        const itemText = lang === 'hi' ? item.textHi : (lang === 'mr' ? item.textMr : item.textEn);
        const itemRow = document.createElement('div');
        itemRow.className = 'checklist-item';
        itemRow.innerHTML = `
          <span class="check-icon">✓</span>
          <span>${itemText}</span>
        `;
        block.appendChild(itemRow);
      });

      container.appendChild(block);
    });
  }

  renderSymptomsList() {
    const container = document.getElementById('symptoms-list');
    if (!container) return;
    container.innerHTML = '';

    const lang = this.currentLang;

    DEMO_SYMPTOMS.forEach(sym => {
      const symName = lang === 'hi' ? sym.nameHi : (lang === 'mr' ? sym.nameMr : sym.nameEn);

      const card = document.createElement('div');
      card.className = `symptom-card ${this.selectedSymptomId === sym.id ? 'active' : ''}`;
      card.setAttribute('data-id', sym.id);
      card.innerHTML = `
        <span style="font-size:1.6rem;">${sym.icon}</span>
        <span style="font-weight:700; font-size:0.98rem; flex:1;">${symName}</span>
      `;

      card.addEventListener('click', () => {
        document.querySelectorAll('.symptom-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.selectedSymptomId = sym.id;
      });

      container.appendChild(card);
    });
  }

  renderDiagnosisResult() {
    const resultArea = document.getElementById('diagnosis-result-area');
    const obsText = document.getElementById('diag-observation-text');
    if (!resultArea || !obsText) return;

    const lang = this.currentLang;
    const sym = DEMO_SYMPTOMS.find(s => s.id === this.selectedSymptomId) || DEMO_SYMPTOMS[0];
    const causes = lang === 'hi' ? sym.possibleCausesHi : (lang === 'mr' ? sym.possibleCausesMr : sym.possibleCausesEn);

    resultArea.style.display = 'block';
    obsText.innerHTML = `
      <strong>${sym.icon} ${lang === 'hi' ? sym.nameHi : (lang === 'mr' ? sym.nameMr : sym.nameEn)}:</strong>
      <p style="margin-top:4px;">${causes}</p>
      <div style="margin-top:8px; font-size:0.85rem; color:#7f0000; font-weight:700;">
        ⚠️ ${lang === 'hi' 
          ? "सूचना: ऐप केवल फोटो या लक्षण देखकर निश्चित बीमारी का दावा नहीं कर सकता। सटीक पुष्टि के लिए जीवित पत्ता कृषि वैज्ञानिक को दिखाएं।"
          : (lang === 'mr' 
            ? "सूचना: ॲप केवळ फोटो किंवा लक्षणांवरून निश्चित रोगाचा दावा करू शकत नाही. खात्रीसाठी जिवंत पान कृषी शास्त्रज्ञांना दाखवा."
            : "Notice: The app cannot make a definitive diagnosis from symptoms or photographs alone. Consult local agricultural officers for verification.")}
      </div>
    `;

    resultArea.scrollIntoView({ behavior: 'smooth' });
  }

  renderProtectionMethods() {
    const container = document.getElementById('methods-compare-container');
    if (!container) return;
    container.innerHTML = '';

    const lang = this.currentLang;
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

    DEMO_PROTECTION_COMPARISON.forEach(method => {
      const cat = lang === 'hi' ? method.categoryHi : (lang === 'mr' ? method.categoryMr : method.categoryEn);
      const pros = lang === 'hi' ? method.prosHi : (lang === 'mr' ? method.prosMr : method.prosEn);
      const cons = lang === 'hi' ? method.consHi : (lang === 'mr' ? method.consMr : method.consEn);
      const cost = lang === 'hi' ? method.costLevelHi : (lang === 'mr' ? method.costLevelMr : method.costLevelEn);
      const safety = lang === 'hi' ? method.safetyNoteHi : (lang === 'mr' ? method.safetyNoteMr : method.safetyNoteEn);

      const card = document.createElement('div');
      card.className = 'method-compare-card';
      card.innerHTML = `
        <div style="font-weight:800; font-size:1.05rem; color:var(--color-primary-dark); margin-bottom:6px;">
          ${method.icon} ${cat}
        </div>
        <div style="font-size:0.88rem; line-height:1.45;">
          <div><strong style="color:var(--color-success);">+ ${t.tableColPros}:</strong> ${pros}</div>
          <div style="margin-top:4px;"><strong style="color:var(--color-danger);">- ${t.tableColCons}:</strong> ${cons}</div>
          <div style="margin-top:4px;"><strong>💰 ${t.tableColCost}:</strong> ${cost}</div>
          <div style="margin-top:4px; font-weight:600; color:var(--color-accent);"><strong>🛡️ ${t.tableColSafety}:</strong> ${safety}</div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  // =========================================================================
  // SECTION 5: FARM RECORDS (DIARY / BAHIKHATA) LOGIC
  // =========================================================================
  setupDiaryScreen() {
    const openAddBtn = document.getElementById('btn-open-add-record');
    const recordModal = document.getElementById('modal-record-form');
    const closeModalBtn = document.getElementById('close-record-form-btn');
    const cancelModalBtn = document.getElementById('btn-cancel-record-modal');
    const saveBtn = document.getElementById('btn-save-record-modal');
    const resetBtn = document.getElementById('btn-reset-sample-records');

    openAddBtn.addEventListener('click', () => {
      this.openRecordForm(null); // Add new
    });

    closeModalBtn.addEventListener('click', () => recordModal.classList.remove('active'));
    cancelModalBtn.addEventListener('click', () => recordModal.classList.remove('active'));
    recordModal.addEventListener('click', (e) => {
      if (e.target === recordModal) recordModal.classList.remove('active');
    });

    saveBtn.addEventListener('click', () => {
      this.saveRecordFromModal();
    });

    resetBtn.addEventListener('click', () => {
      if (confirm(this.currentLang === 'hi' ? "क्या आप नमूना रिकॉर्ड पुनर्स्थापित करना चाहते हैं?" : "Reset to demo sample records?")) {
        storageService.resetToSampleRecords();
        this.renderDiaryRecords();
      }
    });
  }

  openRecordForm(record = null) {
    const modal = document.getElementById('modal-record-form');
    const titleEl = document.getElementById('record-form-title');
    const editIdInput = document.getElementById('edit-record-id');

    if (record) {
      titleEl.textContent = this.currentLang === 'hi' ? "✏️ फसल खाता संपादित करें" : "Edit Crop Record";
      editIdInput.value = record.id;
      document.getElementById('rec-crop-select').value = record.cropId || 'soybean';
      document.getElementById('rec-season-input').value = record.seasonLabelHi || record.seasonLabelEn || '';
      document.getElementById('rec-area-input').value = record.areaAcres || 2.0;
      document.getElementById('rec-harvest-input').value = record.harvestQuintals || '';
      document.getElementById('rec-salerate-input').value = record.salePricePerQtl || '';
      document.getElementById('rec-buyer-input').value = record.buyerName || '';
      document.getElementById('rec-date-input').value = record.date || new Date().toISOString().split('T')[0];
      document.getElementById('rec-total-expense-input').value = record.totalExpense || '';
      document.getElementById('rec-notes-input').value = record.notes || '';
    } else {
      titleEl.textContent = this.currentLang === 'hi' ? "✍️ + नया फसल खाता जोड़ें" : "+ Add New Crop Record";
      editIdInput.value = '';
      document.getElementById('rec-crop-select').value = 'soybean';
      document.getElementById('rec-season-input').value = this.currentLang === 'hi' ? 'खरीफ 2026' : 'Kharif 2026';
      document.getElementById('rec-area-input').value = 2.0;
      document.getElementById('rec-harvest-input').value = '';
      document.getElementById('rec-salerate-input').value = '';
      document.getElementById('rec-buyer-input').value = '';
      document.getElementById('rec-date-input').value = new Date().toISOString().split('T')[0];
      document.getElementById('rec-total-expense-input').value = '';
      document.getElementById('rec-notes-input').value = '';
    }

    modal.classList.add('active');
  }

  saveRecordFromModal() {
    const editId = document.getElementById('edit-record-id').value;
    const cropId = document.getElementById('rec-crop-select').value;
    const seasonLabel = document.getElementById('rec-season-input').value.trim() || 'Kharif 2026';
    const area = parseFloat(document.getElementById('rec-area-input').value) || 1.0;
    const harvest = parseFloat(document.getElementById('rec-harvest-input').value) || 0;
    const saleRate = parseFloat(document.getElementById('rec-salerate-input').value) || 0;
    const buyer = document.getElementById('rec-buyer-input').value.trim() || 'Mandi / Local Buyer';
    const date = document.getElementById('rec-date-input').value || new Date().toISOString().split('T')[0];
    const totalExp = parseFloat(document.getElementById('rec-total-expense-input').value) || 0;
    const notes = document.getElementById('rec-notes-input').value.trim();

    // Find crop display name
    const cropMeta = DEMO_CROPS.find(c => c.id === cropId);
    const cropNameEn = cropMeta ? cropMeta.name.en : cropId;
    const cropNameHi = cropMeta ? cropMeta.name.hi : cropId;
    const cropNameMr = cropMeta ? cropMeta.name.mr : cropId;

    const recordData = {
      id: editId || undefined,
      cropId,
      cropNameEn,
      cropNameHi,
      cropNameMr,
      seasonLabelEn: seasonLabel,
      seasonLabelHi: seasonLabel,
      seasonLabelMr: seasonLabel,
      areaAcres: area,
      harvestQuintals: harvest,
      salePricePerQtl: saleRate,
      buyerName: buyer,
      date,
      totalExpense: totalExp,
      costs: {
        seed: Math.round(totalExp * 0.2),
        fertilizer: Math.round(totalExp * 0.2),
        labor: Math.round(totalExp * 0.35),
        irrigation: Math.round(totalExp * 0.05),
        protection: Math.round(totalExp * 0.1),
        machinery: Math.round(totalExp * 0.05),
        transport: Math.round(totalExp * 0.05)
      },
      notes
    };

    storageService.saveRecord(recordData);
    document.getElementById('modal-record-form').classList.remove('active');
    this.renderDiaryRecords();

    speechService.showVoiceNotification("Farm record saved successfully!", "फसल खाता सफलतापूर्वक सुरक्षित हुआ!");
  }

  renderDiaryRecords() {
    const container = document.getElementById('diary-records-list');
    if (!container) return;
    container.innerHTML = '';

    const records = storageService.getAllRecords();
    const lang = this.currentLang;
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

    // Financial totals across all records
    let sumExpense = 0;
    let sumSales = 0;
    records.forEach(r => {
      sumExpense += (r.totalExpense || 0);
      sumSales += (r.totalSales || 0);
    });
    const sumNet = sumSales - sumExpense;

    document.getElementById('diary-sum-expense').textContent = `₹ ${sumExpense.toLocaleString('en-IN')}`;
    document.getElementById('diary-sum-sales').textContent = `₹ ${sumSales.toLocaleString('en-IN')}`;
    const netEl = document.getElementById('diary-sum-net');
    netEl.textContent = `${sumNet >= 0 ? '+' : ''}₹ ${sumNet.toLocaleString('en-IN')}`;
    netEl.style.color = sumNet >= 0 ? 'var(--color-success)' : 'var(--color-danger)';

    if (records.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📓</div>
          <div style="font-weight:700; font-size:1.1rem; color:var(--color-text-main);">${t.noRecordsYet}</div>
        </div>
      `;
      return;
    }

    records.forEach(rec => {
      const cropName = lang === 'hi' ? (rec.cropNameHi || rec.cropNameEn) : (lang === 'mr' ? (rec.cropNameMr || rec.cropNameEn) : rec.cropNameEn);
      const isProfit = (rec.netProfit || 0) >= 0;

      const item = document.createElement('div');
      item.className = 'record-item';
      item.innerHTML = `
        <div class="record-header">
          <div>
            <div class="record-crop-title">🌱 ${cropName}</div>
            <span style="font-size:0.85rem; color:var(--color-text-muted);">
              📅 ${rec.date} • ${rec.seasonLabelHi || rec.seasonLabelEn || ''} • ${rec.areaAcres} ${t.acresUnit}
            </span>
          </div>
          <div style="text-align:right;">
            <span class="metric-label">${t.summaryNet}</span>
            <div style="font-size:1.2rem; font-weight:900; color:${isProfit ? 'var(--color-success)' : 'var(--color-danger)'};">
              ${isProfit ? '+' : ''}₹ ${(rec.netProfit || 0).toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:6px; font-size:0.88rem; background:var(--color-bg-app); padding:8px; border-radius:var(--radius-sm);">
          <div><strong>${t.summaryInvested}:</strong> ₹ ${(rec.totalExpense || 0).toLocaleString('en-IN')}</div>
          <div><strong>${t.summarySales}:</strong> ₹ ${(rec.totalSales || 0).toLocaleString('en-IN')}</div>
          <div><strong>${t.recordHarvestLabel}:</strong> ${rec.harvestQuintals || 0} Qtl</div>
          <div><strong>${t.recordSaleRateLabel}:</strong> ₹ ${rec.salePricePerQtl || 0} / Qtl</div>
          <div style="grid-column:span 2;"><strong>${t.recordBuyerLabel}:</strong> ${rec.buyerName || 'Local Mandi'}</div>
        </div>

        ${rec.notes ? `<div style="font-size:0.85rem; color:var(--color-text-secondary); margin-top:6px; font-style:italic;">"${rec.notes}"</div>` : ''}

        <div class="record-actions">
          <button type="button" class="btn-action-small edit-record-btn" data-id="${rec.id}">
            ✏️ ${t.editRecordBtn}
          </button>
          <button type="button" class="btn-action-small delete delete-record-btn" data-id="${rec.id}">
            🗑️ ${t.deleteRecordBtn}
          </button>
        </div>
      `;

      item.querySelector('.edit-record-btn').addEventListener('click', () => {
        this.openRecordForm(rec);
      });

      item.querySelector('.delete-record-btn').addEventListener('click', () => {
        if (confirm(t.confirmDelete)) {
          storageService.deleteRecord(rec.id);
          this.renderDiaryRecords();
        }
      });

      container.appendChild(item);
    });
  }
}

// Instantiate and initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.kisanApp = new KisanApp();
});

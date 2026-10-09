/**
 * DEMO DATA MODULE FOR PILOT DISTRICT: NASHIK, MAHARASHTRA
 * 
 * IMPORTANT NOTICE:
 * All figures, market prices, crop suggestions, and checklists in this file
 * are SAMPLE DEMO DATA for prototype testing and user experience validation.
 * No real agricultural advice, pesticide doses, or live financial promises
 * are made. Live APIs (e.g., e-NAM, Agmarknet, IMD Weather, ICAR KVK) 
 * will replace this module in pilot phase 2.
 */

const DEMO_CONFIG = {
  pilotDistrict: {
    id: "nashik",
    nameEn: "Nashik District, Maharashtra",
    nameHi: "नासिक जिला, महाराष्ट्र",
    nameMr: "नाशिक जिल्हा, महाराष्ट्र",
    state: "Maharashtra",
    agroZoneEn: "Western Maharashtra Plateau (Zone 7)",
    agroZoneHi: "पश्चिमी महाराष्ट्र पठार (ज़ोन 7)",
    agroZoneMr: "पश्चिम महाराष्ट्र पठार (विभाग 7)",
    demoTag: "DEMO DATA (नमूना डेटा)",
    lastUpdated: "10 Oct 2026",
    dataSource: "Prototype Demo Repository (Simulated local data)"
  },
  disclaimer: {
    en: "SAMPLE DATA ONLY: Market prices, budget estimates, and crop guidance are mock values for app evaluation. Real farming decisions require local KVK consultation and verified local market receipts.",
    hi: "केवल नमूना डेटा: मंडी भाव, बजट अनुमान और फसल सलाह केवल ऐप परीक्षण के लिए काल्पनिक हैं। वास्तविक खेती निर्णय के लिए स्थानीय केवीके या कृषि अधिकारी से संपर्क करें।",
    mr: "केवळ नमुना माहिती: बाजार भाव, अंदाजपत्रक आणि पीक सल्ला केवळ ॲप चाचणीसाठी आहेत. प्रत्यक्ष शेतीविषयक निर्णयासाठी स्थानिक केव्हीके किंवा कृषी सल्लागारांशी संपर्क साधावा."
  }
};

const DEMO_CROPS = [
  {
    id: "soybean",
    icon: "🌱",
    name: {
      en: "Soybean",
      hi: "सोयाबीन",
      mr: "सोयाबीन"
    },
    seasons: ["kharif"],
    soilTypes: ["black", "loamy"],
    waterReq: "moderate", // rainfed / moderate
    durationDays: "90-105 days",
    whySuitable: {
      en: "Well-suited for medium to deep black soils in Nashik during Kharif season. Fixes atmospheric nitrogen and matures in around 95-100 days.",
      hi: "खरीफ के दौरान नासिक की मध्यम से गहरी काली मिट्टी के लिए उपयुक्त। हवा से नाइट्रोजन स्थिर करता है और 95-100 दिनों में पक जाता है।",
      mr: "खरीप हंगामात नाशिकमधील मध्यम ते खोल काळ्या जमिनीसाठी उत्तम. हवेतील नत्र जमिनीत स्थिर करते आणि ९५-१०० दिवसांत काढणीस येते."
    },
    missingInfo: {
      en: "Soil test report (pH, organic carbon, and phosphorus availability) not recorded. Drainage capacity of your specific plot is unverified.",
      hi: "मिट्टी जांच रिपोर्ट (पीएच, जैविक कार्बन, फास्फोरस) दर्ज नहीं है। आपके खेत में जल निकासी क्षमता अज्ञात है।",
      mr: "माती परीक्षण अहवाल (सामू/pH, सेंद्रिय कर्ब, स्फुरद) उपलब्ध नाही. तुमच्या शेतातील निचरा क्षमता अज्ञात आहे."
    },
    keyRisks: {
      en: "High vulnerability to waterlogging during heavy continuous rains. Stem fly and pod borer attacks. Post-harvest market price volatility.",
      hi: "लगातार तेज बारिश में जलभराव का खतरा। तना मक्खी और फली छेदक कीट का प्रकोप। फसल कटाई के समय कीमतों में भारी उतार-चढ़ाव।",
      mr: "सततच्या पावसात पाणी साचण्याचा धोका. खोड माशी आणि शेंगा पोखरणारी अळीचा प्रादुर्भाव. काढणीनंतर बाजारातील दरात चढ-उतार."
    },
    defaultCostsPerAcre: {
      seed: 2800,
      fertilizer: 2600,
      labor: 4200,
      irrigation: 900,
      protection: 1800,
      machinery: 3200,
      transport: 1100
    },
    scenarios: {
      low: {
        yieldPerAcre: 4.5, // Quintals
        pricePerQuintal: 3800,
        assumptionsEn: "Excess rainfall/dry spell at flowering + heavy arrivals at local mandis.",
        assumptionsHi: "फूल आने के समय सूखा या अतिवृष्टि + मंडी में बंपर आवक से कम भाव।",
        assumptionsMr: "फुलोऱ्याच्या वेळी अतिवृष्टी किंवा खंड + बाजारात जास्त आवकमुळे कमी भाव."
      },
      typical: {
        yieldPerAcre: 7.5,
        pricePerQuintal: 4600,
        assumptionsEn: "Normal monsoon distribution + average prevailing modal mandi rate.",
        assumptionsHi: "सामान्य मानसून + स्थानीय मंडी का औसत प्रचलित भाव।",
        assumptionsMr: "सरासरी पाऊस + स्थानिक बाजार समितीचा सरासरी दर."
      },
      high: {
        yieldPerAcre: 10.5,
        pricePerQuintal: 5200,
        assumptionsEn: "Timely sowing + clean weeding + quality seed + favorable market timing.",
        assumptionsHi: "समय पर बुवाई + बढ़िया निराई + उत्तम बीज + मांग के समय बिक्री।",
        assumptionsMr: "वेळेवर पेरणी + दर्जेदार बियाणे + चांगली निगा + चांगल्या भावात विक्री."
      }
    }
  },
  {
    id: "onion",
    icon: "🧅",
    name: {
      en: "Onion (Kharif / Rangda)",
      hi: "प्याज (खरीफ / रांगडा)",
      mr: "कांदा (खरीप / रांगडा)"
    },
    seasons: ["kharif", "late_kharif", "rabi"],
    soilTypes: ["loamy", "black", "sandy_loam"],
    waterReq: "moderate_high",
    durationDays: "110-125 days",
    whySuitable: {
      en: "Nashik is India's prime onion cluster with established nursery, grading, and mandi infrastructure. Performs well in well-drained loams.",
      hi: "नासिक भारत का प्रमुख प्याज केंद्र है जहां नर्सरी, ग्रेडिंग और मंडियां मौजूद हैं। अच्छी जल निकासी वाली दोमट मिट्टी में बढ़िया पैदावार।",
      mr: "नाशिक हे देशातील कांद्याचे प्रमुख केंद्र असून येथे बाजार व रोपवाटिकांची उत्तम सोय आहे. निचरा होणाऱ्या जमिनीत चांगले उत्पादन येते."
    },
    missingInfo: {
      en: "Nursery seedling age, seedling dipping history, and micro-irrigation (drip/sprinkler) setup details are unrecorded.",
      hi: "नर्सरी की पौध की उम्र, पौध उपचार इतिहास, और ड्रिप/स्प्रिंकलर सिंचाई की जानकारी उपलब्ध नहीं है।",
      mr: "रोपांचे वय, रोप प्रक्रिया आणि ठिबक/तुषार सिंचनाची माहिती नोंदवलेली नाही."
    },
    keyRisks: {
      en: "Purple blotch disease in damp weather. High perishability of Kharif crop (low shelf life). Extreme price swings and export policy shifts.",
      hi: "नम मौसम में बैंगनी धब्बा (पर्पल ब्लॉच) रोग। खरीफ प्याज जल्दी खराब होता है। कीमतों में बहुत तेज उतार-चढ़ाव।",
      mr: "दमट हवामानात करपा/जांभळा करपा रोग. खरीप कांद्याची टिकवण क्षमता कमी. दरांमध्ये मोठी अनिश्चितता."
    },
    defaultCostsPerAcre: {
      seed: 4500, // Nursery/seedlings
      fertilizer: 4800,
      labor: 8500, // Transplanting, weeding, de-topping
      irrigation: 2200,
      protection: 3400,
      machinery: 3800,
      transport: 2400
    },
    scenarios: {
      low: {
        yieldPerAcre: 60,
        pricePerQuintal: 950,
        assumptionsEn: "Cloudy humid weather causing fungal attack + market supply glut.",
        assumptionsHi: "बादल छाए रहने से फफूंद रोग + मंडी में भारी आवक से मंदी।",
        assumptionsMr: "ढगाळ वातावरणामुळे रोगाचा प्रादुर्भाव + बाजारात अतिरिक्त आवक."
      },
      typical: {
        yieldPerAcre: 90,
        pricePerQuintal: 1650,
        assumptionsEn: "Moderate weather + graded medium-large bulbs + standard APMC auction.",
        assumptionsHi: "सामान्य मौसम + मध्यम-बड़ा साइज + मानक मंडी नीलामी भाव।",
        assumptionsMr: "सरासरी हवामान + प्रतवारी केलेला कांदा + सरासरी लिलाव भाव."
      },
      high: {
        yieldPerAcre: 120,
        pricePerQuintal: 2500,
        assumptionsEn: "Optimal bulb development + low supply in terminal markets + prime grade.",
        assumptionsHi: "उत्कृष्ट कंद विकास + प्रमुख मंडियों में कम आपूर्ति + अव्वल ग्रेड।",
        assumptionsMr: "उत्कृष्ट गुणवत्ता + इतर बाजारात कमी आवक + उच्च प्रत."
      }
    }
  },
  {
    id: "chickpea",
    icon: "🥣",
    name: {
      en: "Gram / Chickpea (Chana)",
      hi: "चना (हरभरा)",
      mr: "हरभरा (चना)"
    },
    seasons: ["rabi"],
    soilTypes: ["black", "loamy", "clayey"],
    waterReq: "low",
    durationDays: "95-110 days",
    whySuitable: {
      en: "Ideal Rabi pulse for deep black soils retaining residual monsoon moisture. Low irrigation requirement and low external fertilizer demand.",
      hi: "मानसून की बची नमी वाली गहरी काली मिट्टी के लिए आदर्श रबी दलहन। कम पानी और कम रासायनिक खाद की आवश्यकता।",
      mr: "पावसाळ्यानंतरच्या ओलाव्यावर येणारे उत्तम रब्बी कडधान्य पीक. कमी पाणी व कमी खतांची गरज."
    },
    missingInfo: {
      en: "Subsoil residual moisture depth, wilt history of the plot, and seed inoculation status with Rhizobium are unverified.",
      hi: "जमीन में गहराई तक नमी का स्तर, खेत में उकठा (विल्ट) रोग का इतिहास, और राइजोबियम उपचार की जानकारी दर्ज नहीं।",
      mr: "जमिनीतील ओलाव्याची खोली, मर रोगाचा पूर्वेतिहास आणि रायझोबियम बीजप्रक्रिया माहिती उपलब्ध नाही."
    },
    keyRisks: {
      en: "Fusarium wilt in early stages. Helicoverpa pod borer during pod formation. Sudden temperature surge during grain filling.",
      hi: "शुरुआती दौर में उकठा रोग। फलियां बनने पर फली छेदक इल्ली का हमला। दाना भरते समय अचानक तापमान बढ़ना।",
      mr: "सुरुवातीला मर रोग. घाटे तयार होताना घाटे अळीचा प्रादुर्भाव. दाणे भरताना अचानक वाढणारे तापमान."
    },
    defaultCostsPerAcre: {
      seed: 2400,
      fertilizer: 1900,
      labor: 3100,
      irrigation: 800,
      protection: 1600,
      machinery: 2800,
      transport: 900
    },
    scenarios: {
      low: {
        yieldPerAcre: 4.0,
        pricePerQuintal: 4500,
        assumptionsEn: "Wilt damage + pod borer pressure + unseasonal rain at maturity.",
        assumptionsHi: "उकठा रोग + फली छेदक कीट + कटाई के समय बेमौसम बारिश।",
        assumptionsMr: "मर रोगामुळे नुकसान + घाटे अळी + काढणीच्या वेळी अवकाळी पाऊस."
      },
      typical: {
        yieldPerAcre: 6.5,
        pricePerQuintal: 5300,
        assumptionsEn: "1-2 protective irrigations + timely IPM management + MSP proximity.",
        assumptionsHi: "1-2 हल्की सिंचाई + समय पर कीट नियंत्रण + एमएसपी के आसपास भाव।",
        assumptionsMr: "१-२ संरक्षक सिंचन + वेळेवर कीड नियंत्रण + हमीभावाच्या जवळपास दर."
      },
      high: {
        yieldPerAcre: 9.0,
        pricePerQuintal: 5900,
        assumptionsEn: "Wilt-resistant variety + pheromone monitoring + bold seed quality.",
        assumptionsHi: "रोग-प्रतिरोधी किस्म + फेरोमोन ट्रैप से निगरानी + मोटा चमकदार दाना।",
        assumptionsMr: "रोगप्रतिकारक वाण + कामगंध सापळे + टपोरे दाणे व उत्तम प्रत."
      }
    }
  },
  {
    id: "tomato",
    icon: "🍅",
    name: {
      en: "Tomato",
      hi: "टमाटर",
      mr: "टोमॅटो"
    },
    seasons: ["kharif", "rabi", "zaid"],
    soilTypes: ["loamy", "red_loam", "sandy_loam"],
    waterReq: "high",
    durationDays: "120-140 days",
    whySuitable: {
      en: "Major commercial cash crop around Nashik (Girna/Godavari basin). High yield potential with staking and micro-irrigation.",
      hi: "नासिक क्षेत्र (गिरना/गोदावरी कछार) की प्रमुख नकदी सब्जी फसल। स्टेकिंग और ड्रिप सिंचाई से उच्च पैदावार संभव।",
      mr: "नाशिक परिसरातील प्रमुख नगदी भाजीपाला पीक. तार-काठी आधार व ठिबक सिंचनाने भरपूर उत्पादन शक्य."
    },
    missingInfo: {
      en: "Trellising/staking material availability, irrigation water salinity (EC/TDS), and virus history in neighborhood unrecorded.",
      hi: "तार-बांस लगाने की व्यवस्था, सिंचाई पानी का खारापन (टीडीएस), और आसपास वायरस का इतिहास अज्ञात है।",
      mr: "तार-काठी साहित्य उपलब्धता, सिंचनाच्या पाण्याचे क्षार आणि शेजारील विषाणू रोगाचा इतिहास उपलब्ध नाही."
    },
    keyRisks: {
      en: "Tomato leaf curl virus (whitefly transmitted), Early and late blight. Extreme price crashes during peak picking weeks.",
      hi: "सफेद मक्खी द्वारा फैला पत्ता मरोड़ वायरस (लीफ कर्ल), झुलसा रोग। ज्यादा आवक के समय कीमतों में भारी गिरावट।",
      mr: "पांढऱ्या माशीमुळे येणारा पर्णगुच्छ (व्हायरस), करपा रोग. आवक वाढल्यास कवडीमोल भावाचा धोका."
    },
    defaultCostsPerAcre: {
      seed: 5500, // Hybrid seedlings
      fertilizer: 6200,
      labor: 12000, // Staking, regular picking, packing
      irrigation: 3000,
      protection: 5800,
      machinery: 4500,
      transport: 3500
    },
    scenarios: {
      low: {
        yieldPerAcre: 140, // Crates / Quintals approx
        pricePerQuintal: 600, // ₹6/kg
        assumptionsEn: "Blight outbreak + glut across Maharashtra mandis.",
        assumptionsHi: "झुलसा रोग + राज्यभर की मंडियों में भारी आवक से मंदी।",
        assumptionsMr: "करप्याचा प्रादुर्भाव + राज्यातील बाजारांमध्ये अति-आवक."
      },
      typical: {
        yieldPerAcre: 220,
        pricePerQuintal: 1400, // ₹14/kg
        assumptionsEn: "Good staking + weekly pickings + steady regional wholesale demand.",
        assumptionsHi: "अच्छी स्टेकिंग + नियमित तुड़ाई + स्थिर थोक मांग।",
        assumptionsMr: "चांगला आधार + नियमित तोडणी + स्थिर बाजार मागणी."
      },
      high: {
        yieldPerAcre: 300,
        pricePerQuintal: 2400, // ₹24/kg
        assumptionsEn: "Pest-free crop + festival season demand + outstation dispatches.",
        assumptionsHi: "रोगमुक्त फसल + त्योहारी सीजन की मांग + बाहरी शहरों में आपूर्ति।",
        assumptionsMr: "रोगमुक्त पीक + सणासुदीची मागणी + परराज्यात पाठवणी."
      }
    }
  },
  {
    id: "cotton",
    icon: "☁️",
    name: {
      en: "Cotton (Kapas)",
      hi: "कपास (कॉटन)",
      mr: "कापूस"
    },
    seasons: ["kharif"],
    soilTypes: ["black", "clayey"],
    waterReq: "moderate",
    durationDays: "150-175 days",
    whySuitable: {
      en: "Grown in Malegaon/Yeola eastern belt of Nashik district. Deep taproot system withstands dry intervals in deep black soils.",
      hi: "नासिक जिले के मालेगांव/येवला पूर्वी हिस्से में प्रचलित। गहरी जड़ें काली मिट्टी में सूखे के अंतराल को सहन करती हैं।",
      mr: "नाशिक जिल्ह्यातील मालेगाव/येवला पट्ट्यात घेतले जाते. खोल मुळे काळ्या जमिनीत पाण्याचा ताण सहन करतात."
    },
    missingInfo: {
      en: "Purity of Bt seed, soil depth (>90 cm required), and pink bollworm trap monitoring facilities not verified.",
      hi: "बीज की शुद्धता, मिट्टी की गहराई (90 सेमी आवश्यक), और गुलाबी सुंडी ट्रैप व्यवस्था दर्ज नहीं।",
      mr: "बियाण्यांची शुद्धता, मातीची खोली (९० सेमी आवश्यक), आणि बोंडअळी सापळ्यांची सोय नोंदवलेली नाही."
    },
    keyRisks: {
      en: "Pink bollworm resistance in later pickings. Sucking pest complex (jassids, thrips). Labor shortage during manual picking.",
      hi: "बाद की तुड़ाई में गुलाबी सुंडी का प्रकोप। रस चूसक कीट। हाथ से चुगाई के समय मजदूरों की कमी।",
      mr: "पुढील वेचणीत गुलाबी बोंडअळीचा धोका. रसशोषक किडींचा प्रादुर्भाव. कापूस वेचणीसाठी मजुरांची टंचाई."
    },
    defaultCostsPerAcre: {
      seed: 2200,
      fertilizer: 3400,
      labor: 6800, // Manual pickings
      irrigation: 1200,
      protection: 2900,
      machinery: 3100,
      transport: 1200
    },
    scenarios: {
      low: {
        yieldPerAcre: 5.0,
        pricePerQuintal: 5600,
        assumptionsEn: "Bollworm damage in 2nd picking + sluggish textile mill buying.",
        assumptionsHi: "दूसरी तुड़ाई में सुंडी से नुकसान + मिलों की सुस्त खरीद।",
        assumptionsMr: "दुसऱ्या वेचणीत बोंडअळीचे नुकसान + कापूस गिरण्यांची मंद खरेदी."
      },
      typical: {
        yieldPerAcre: 8.0,
        pricePerQuintal: 6800,
        assumptionsEn: "Regular scouting + 3 clean pickings + CCI purchase near MSP.",
        assumptionsHi: "नियमित निगरानी + 3 साफ चुगाइयां + समर्थन मूल्य के पास सरकारी/निजी खरीद।",
        assumptionsMr: "नियमित पाहणी + ३ चांगल्या वेचण्या + हमीभाव किंवा बाजार समिती दर."
      },
      high: {
        yieldPerAcre: 11.0,
        pricePerQuintal: 7800,
        assumptionsEn: "Timely sowing + clean bolls + high lint ginning percentage.",
        assumptionsHi: "समय पर बुवाई + चमकदार सफेद रुई + बेहतर जिनिंग प्रतिशत।",
        assumptionsMr: "वेळेवर पेरणी + पांढराशुभ्र कापूस + चांगला उतारा व उच्च भाव."
      }
    }
  }
];

const DEMO_MARKET_PRICES = [
  {
    id: "mkt-1",
    mandiNameEn: "Lasalgaon APMC",
    mandiNameHi: "लासलगांव कृषि उपज मंडी",
    mandiNameMr: "लासलगाव कृषी उत्पन्न बाजार समिती",
    distanceKm: 32,
    date: "10 Oct 2026",
    cropId: "onion",
    unitEn: "₹ / Quintal (100 kg)",
    unitHi: "₹ / क्विंटल (100 किग्रा)",
    unitMr: "₹ / क्विंटल (१०० किलो)",
    minPrice: 1150,
    modalPrice: 1680,
    maxPrice: 2220,
    transportCostPerQtl: 65,
    mandiFeePerQtl: 25,
    qualityDeductionAvgPerQtl: 40,
    isDemo: true,
    noteEn: "India's largest onion market benchmark. High buyer density, cash payment counter.",
    noteHi: "एशिया की प्रमुख प्याज मंडी। अधिक खरीदार, नकद भुगतान काउंटर।",
    noteMr: "कांद्याची प्रमुख बाजारपेठ. मोठी व्यापारी गर्दी व रोख पट्टी."
  },
  {
    id: "mkt-2",
    mandiNameEn: "Nashik APMC (Panchavati)",
    mandiNameHi: "नासिक मंडी (पंचवटी)",
    mandiNameMr: "नाशिक बाजार समिती (पंचवटी)",
    distanceKm: 14,
    date: "10 Oct 2026",
    cropId: "onion",
    unitEn: "₹ / Quintal (100 kg)",
    unitHi: "₹ / क्विंटल (100 किग्रा)",
    unitMr: "₹ / क्विंटल (१०० किलो)",
    minPrice: 1100,
    modalPrice: 1620,
    maxPrice: 2150,
    transportCostPerQtl: 35, // Closer distance!
    mandiFeePerQtl: 25,
    qualityDeductionAvgPerQtl: 35,
    isDemo: true,
    noteEn: "Closer to farm gate. Lower transport expenses reduce difference with Lasalgaon.",
    noteHi: "खेत से निकट। कम ढुलाई खर्च से शुद्ध बचत बेहतर।",
    noteMr: "शेतकऱ्यांच्या जवळ. कमी वाहतूक खर्चामुळे निव्वळ नफा समाधानकारक."
  },
  {
    id: "mkt-3",
    mandiNameEn: "Pimpalgaon Baswant APMC",
    mandiNameHi: "पिंपलगांव बसवंत मंडी",
    mandiNameMr: "पिंपळगाव बसवंत बाजार समिती",
    distanceKm: 42,
    date: "10 Oct 2026",
    cropId: "onion",
    unitEn: "₹ / Quintal (100 kg)",
    unitHi: "₹ / क्विंटल (100 किग्रा)",
    unitMr: "₹ / क्विंटल (१०० किलो)",
    minPrice: 1200,
    modalPrice: 1720,
    maxPrice: 2310,
    transportCostPerQtl: 90, // Higher transport!
    mandiFeePerQtl: 30,
    qualityDeductionAvgPerQtl: 45,
    isDemo: true,
    noteEn: "Listed price is higher by ₹40, but extra ₹55 transport actually lowers net pocket return!",
    noteHi: "लिस्टेड भाव ₹40 अधिक है, लेकिन ₹55 अतिरिक्त ढुलाई से जेब में कम पैसा बचेगा!",
    noteMr: "दिसणारा भाव ₹४० ने जास्त, पण ₹५५ जास्त वाहतूक खर्चामुळे हातात कमी रक्कम!"
  },
  {
    id: "mkt-4",
    mandiNameEn: "Nashik APMC (Grain Yard)",
    mandiNameHi: "नासिक मंडी (अनाज यार्ड)",
    mandiNameMr: "नाशिक बाजार समिती (धान्य यार्ड)",
    distanceKm: 15,
    date: "10 Oct 2026",
    cropId: "soybean",
    unitEn: "₹ / Quintal (100 kg)",
    unitHi: "₹ / क्विंटल (100 किग्रा)",
    unitMr: "₹ / क्विंटल (१०० किलो)",
    minPrice: 4200,
    modalPrice: 4650,
    maxPrice: 4850,
    transportCostPerQtl: 40,
    mandiFeePerQtl: 25,
    qualityDeductionAvgPerQtl: 50,
    isDemo: true,
    noteEn: "Moisture level > 12% attracts ₹50-₹80 dockage at weighbridge.",
    noteHi: "12% से अधिक नमी होने पर ₹50-₹80 की कटौती होती है।",
    noteMr: "१२% पेक्षा जास्त ओलावा असल्यास ₹५०-₹८० वजावट होते."
  },
  {
    id: "mkt-5",
    mandiNameEn: "Yeola APMC",
    mandiNameHi: "येवला कृषि मंडी",
    mandiNameMr: "येवला बाजार समिती",
    distanceKm: 65,
    date: "10 Oct 2026",
    cropId: "soybean",
    unitEn: "₹ / Quintal (100 kg)",
    unitHi: "₹ / क्विंटल (100 किग्रा)",
    unitMr: "₹ / क्विंटल (१०० किलो)",
    minPrice: 4250,
    modalPrice: 4720,
    maxPrice: 4900,
    transportCostPerQtl: 130, // Long distance
    mandiFeePerQtl: 25,
    qualityDeductionAvgPerQtl: 50,
    isDemo: true,
    noteEn: "Higher rate canceled out by long transit cost for small quantities.",
    noteHi: "कम माल होने पर अधिक भाव का लाभ लंबी दूरी के भाड़े में खत्म हो जाता है।",
    noteMr: "कमी माल असल्यास लांबच्या अंतराचा वाहतूक खर्च अधिक भावाचा फायदा गिळंकृत करतो."
  },
  {
    id: "mkt-6",
    mandiNameEn: "Nashik Sub-Yard",
    mandiNameHi: "नासिक उप-मंडी",
    mandiNameMr: "नाशिक उप-बाजार",
    distanceKm: 18,
    date: "10 Oct 2026",
    cropId: "tomato",
    unitEn: "₹ / Quintal (100 kg)",
    unitHi: "₹ / क्विंटल (100 किग्रा)",
    unitMr: "₹ / क्विंटल (१०० किलो)",
    minPrice: 1100,
    modalPrice: 1450,
    maxPrice: 1800,
    transportCostPerQtl: 50,
    mandiFeePerQtl: 30,
    qualityDeductionAvgPerQtl: 60,
    isDemo: true,
    noteEn: "Tomato crates auctioned early morning. Requires quick dispatch to avoid softness.",
    noteHi: "टमाटर की क्रेट नीलामी सुबह जल्दी। नमी और नरमी से बचने के लिए तुरंत ढुलाई जरूरी।",
    noteMr: "टोमॅटो क्रेट लिलाव पहाटे होतो. फळे मऊ पडू नयेत म्हणून तात्काळ वाहतूक आवश्यक."
  }
];

const DEMO_SELL_NOW_WAIT = {
  onion: {
    cropNameEn: "Onion (Kharif/Rangda)",
    cropNameHi: "प्याज (खरीफ/रांगडा)",
    cropNameMr: "कांदा (खरीप/रांगडा)",
    sellNow: {
      timingEn: "Sell Right After Harvest (Day 1 - 7)",
      timingHi: "फसल कटाई के तुरंत बाद बेचें (दिन 1 - 7)",
      timingMr: "काढणीनंतर लगेच विक्री (दिवस १ - ७)",
      projectedNetPrice: 1550, // ₹ / Q
      storageCost: 0,
      weightLossPct: 0,
      cashFlowEn: "Immediate cash flow to repay seasonal crop loans.",
      cashFlowHi: "फसली कर्ज चुकाने के लिए तुरंत नकद राशि।",
      cashFlowMr: "हंगामी पीक कर्ज फेडण्यासाठी तात्काळ रोख रक्कम.",
      risksEn: "Miss out if prices shoot up significantly later.",
      risksHi: "यदि बाद में कीमतें बहुत बढ़ जाएं तो संभावित लाभ छूट सकता है।",
      risksMr: "नंतर भाव खूप वाढल्यास जास्त नफ्याची संधी हुकणे."
    },
    waitAndSell: {
      timingEn: "Store and Sell after 60-90 Days",
      timingHi: "60-90 दिन बाद भंडारण करके बेचें",
      timingMr: "६०-९० दिवस साठवणूक करून विक्री",
      prospectiveGrossPrice: 2100, // Looks higher on paper
      storageRentPerQtl: 90, // Chawl / Warehouse rent & maintenance
      weightLossPct: 15, // Kharif onion rots/dries 12-18%!
      interestCostPerQtl: 60, // Holding interest cost
      effectiveNetRealization: 1635, // After 15% weight loss & costs!
      netGainOrLoss: "+ ₹85 / Qtl (Marginal gain with high spoilage hazard)",
      futureUncertaintyNoteEn: "CAUTION: Kharif onions have very high moisture and rot easily in storage. If the market dips to ₹1,700, you will face heavy net loss due to 15% weight loss and storage rent.",
      futureUncertaintyNoteHi: "सावधानी: खरीफ प्याज में पानी अधिक होता है और वह भंडारण में सड़ता है। यदि भाव ₹1,700 रह गया, तो 15% वजन घटने और किराए से भारी घाटा होगा।",
      futureUncertaintyNoteMr: "सावधान: खरीप कांद्यात पाण्याचे प्रमाण जास्त असल्याने तो लवकर सडतो. भाव जर ₹१,७०० राहिला तर वजन घट व भाड्यामुळे मोठे नुकसान होईल."
    }
  },
  soybean: {
    cropNameEn: "Soybean",
    cropNameHi: "सोयाबीन",
    cropNameMr: "सोयाबीन",
    sellNow: {
      timingEn: "Sell at Mandi Yard upon Threshing",
      timingHi: "मड़ाई के तुरंत बाद मंडी में बेचें",
      timingMr: "मळणी होताच थेट बाजार समितीत विक्री",
      projectedNetPrice: 4550,
      storageCost: 0,
      weightLossPct: 0,
      cashFlowEn: "Immediate money for Rabi sowing inputs.",
      cashFlowHi: "रबी बुवाई के लिए खाद-बीज खरीदने को तुरंत नकद।",
      cashFlowMr: "रब्बी पेरणीसाठी खते-बियाणे खरेदीला लगेच पैसा.",
      risksEn: "Harvest glut usually depresses prices for 3-4 weeks.",
      risksHi: "कटाई के समय भारी आवक से अक्सर कीमतें 3-4 हफ्ते दबी रहती हैं।",
      risksMr: "काढणीच्या काळात आवक वाढल्याने ३-४ आठवडे दर दबावात राहतात."
    },
    waitAndSell: {
      timingEn: "Bag storage & Sell after 90 Days",
      timingHi: "बोरी में भरकर 90 दिन बाद बेचें",
      timingMr: "पोत्यांत साठवून ९० दिवसांनी विक्री",
      prospectiveGrossPrice: 5100,
      storageRentPerQtl: 50,
      weightLossPct: 2.5, // Dry pulse moisture loss
      interestCostPerQtl: 75,
      effectiveNetRealization: 4845,
      netGainOrLoss: "+ ₹295 / Qtl (Subject to international soymeal demand)",
      futureUncertaintyNoteEn: "Soybean stores better than onion if moisture is below 10%, but future rate depends on palm oil import duties and international bean crushing margins.",
      futureUncertaintyNoteHi: "10% से कम नमी होने पर सोयाबीन प्याज से बेहतर टिकता है, लेकिन भविष्य का भाव पाम तेल आयात शुल्क पर निर्भर करता है।",
      futureUncertaintyNoteMr: "ओलावा १०% पेक्षा कमी असल्यास सोयाबीन टिकते, पण पुढील दर खाद्यतेल आयात धोरणावर अवलंबून असतात."
    }
  }
};

const DEMO_PROTECTION_CHECKLIST = [
  {
    id: "chk-1",
    stageEn: "Pre-Sowing & Soil Prep",
    stageHi: "बुवाई पूर्व व खेत की तैयारी",
    stageMr: "पेरणीपूर्व व जमीन मशागत",
    items: [
      {
        textEn: "Deep summer ploughing to expose dormant pests, pupae, and weed seeds to sun heat.",
        textHi: "गर्मियों में गहरी जुताई ताकि कीटों के प्यूपा और खरपतवार के बीज धूप से नष्ट हों।",
        textMr: "उन्हाळी खोल नांगरट ज्यामुळे किडींचे कोष व तणांचे बी उन्हाने नष्ट होतात."
      },
      {
        textEn: "Use certified disease-free seeds and biological seed treatment (e.g. Trichoderma / Rhizobium).",
        textHi: "प्रमाणित रोगमुक्त बीज लें और जैविक बीज उपचार (ट्राइकोडर्मा/राइजोबियम) अवश्य करें।",
        textMr: "प्रमाणित रोगमुक्त बियाणे वापरा आणि ट्रायकोडर्मा/रायझोबियम जैविक बीजप्रक्रिया करा."
      },
      {
        textEn: "Apply well-decomposed FYM (cow dung manure) to prevent soil-borne grubs (Hunga/Gobar keede).",
        textHi: "पूरी तरह सड़ी हुई गोबर खाद डालें ताकि सफेद लट (हुमणी) न पनपे।",
        textMr: "पूर्ण कुजलेले शेणखतच वापरा जेणेकरून हुमणी किडीचा प्रादुर्भाव होणार नाही."
      }
    ]
  },
  {
    id: "chk-2",
    stageEn: "Vegetative Stage (First 35 Days)",
    stageHi: "शुरुआती वानस्पतिक बढ़वार (पहले 35 दिन)",
    stageMr: "सुरुवातीची शाकीय वाढ (पहिले ३५ दिवस)",
    items: [
      {
        textEn: "Walk across the field twice a week in a 'W' pattern to inspect undersides of leaves.",
        textHi: "हफ्ते में दो बार 'W' पैटर्न में खेत का चक्कर लगाएं और पत्तियों के नीचे कीट देखें।",
        textMr: "आठवड्यातून दोनदा 'W' आकारात शेतात फिरून पानांच्या खालच्या बाजूची पाहणी करा."
      },
      {
        textEn: "Install 4-6 yellow and blue sticky traps per acre for early detection of sucking pests.",
        textHi: "रस चूसक कीटों की समय पर पहचान के लिए प्रति एकड़ 4-6 पीले व नीले चिपचिपे कार्ड लगाएं।",
        textMr: "रसशोषक किडींच्या लवकर निदानासाठी एकरी ४-६ पिवळे व निळे चिकट सापळे लावा."
      },
      {
        textEn: "Ensure field trenches are cleared so rainwater never accumulates around crop roots.",
        textHi: "जल निकासी नालियां साफ रखें ताकि फसल की जड़ों के पास पानी न ठहरे।",
        textMr: "पाणी वाहून जाणाऱ्या चारी स्वच्छ ठेवा जेणेकरून मुळांशी पाणी साचणार नाही."
      }
    ]
  },
  {
    id: "chk-3",
    stageEn: "Flowering & Pod / Bulb Formation",
    stageHi: "फूल व फली / कंद बनने की अवस्था",
    stageMr: "फुलोरा व शेंगा / कंद भरण्याची अवस्था",
    items: [
      {
        textEn: "Install species-specific pheromone traps (Helilure / Spodolure) to monitor moth activity.",
        textHi: "नर कीटों की संख्या जानने के लिए उपयुक्त फेरोमोन ट्रैप (हेलील्योर/स्पोडोल्योर) लगाएं।",
        textMr: "पतंगांच्या हालचालींवर लक्ष ठेवण्यासाठी कामगंध सापळे (फेरोमोन ट्रॅप) लावा."
      },
      {
        textEn: "Avoid spraying broad-spectrum chemicals during early morning peak bee-pollination hours.",
        textHi: "सुबह के समय मधुमक्खियों के परागण के दौरान अंधाधुंध कीटनाशक छिड़काव से बचें।",
        textMr: "सकाळच्या वेळी मधमाश्यांच्या परागीभवनाच्या वेळेत सरसकट रासायनिक फवारणी टाळा."
      },
      {
        textEn: "Maintain uniform soil moisture; avoid abrupt drought followed by heavy flood irrigation.",
        textHi: "मिट्टी में सामान्य नमी बनाए रखें; तेज सूखे के बाद एकदम ज्यादा पानी न दें।",
        textMr: "जमिनीत संतुलित ओलावा ठेवा; मोठा ताण दिल्यानंतर एकदम भरमसाठ पाणी देणे टाळा."
      }
    ]
  }
];

const DEMO_SYMPTOMS = [
  {
    id: "sym-1",
    icon: "🍂",
    nameEn: "Leaves turning yellow or pale",
    nameHi: "पत्तियां पीली या हल्की पड़ रही हैं",
    nameMr: "पाने पिवळी किंवा फिकट पडत आहेत",
    possibleCausesEn: "Could be nitrogen deficiency, poor root aeration from water stagnation, or sucking pest attack (thrips/mites).",
    possibleCausesHi: "यह नाइट्रोजन की कमी, जलभराव के कारण जड़ों का घुटना, या रस चूसक कीट (थ्रिप्स/माइट्स) हो सकता है।",
    possibleCausesMr: "नत्राची कमतरता, पाणी साचल्यामुळे मुळांचा श्वास कोंडणे किंवा रसशोषक किडींचा प्रादुर्भाव असू शकतो."
  },
  {
    id: "sym-2",
    icon: "🐛",
    nameEn: "Holes chewed in leaves or cut stems",
    nameHi: "पत्तियों में छेद या कटे हुए तने",
    nameMr: "पानांना छिद्रे किंवा कुरतडलेली पाने",
    possibleCausesEn: "Chewing caterpillar larva (e.g. Spodoptera, Semilooper, or Cutworm).",
    possibleCausesHi: "पत्तियां खाने वाली इल्ली या सुंडी (जैसे स्पोडोप्टेरा, सेमीलूपर या कटवर्म)।",
    possibleCausesMr: "पाने खाणारी अळी (उदा. स्पोडोप्टेरा, सेमीलूपर किंवा कटवर्म)."
  },
  {
    id: "sym-3",
    icon: "🥀",
    nameEn: "Plant wilting or drooping despite damp soil",
    nameHi: "गीली मिट्टी में भी पौधा मुरझा या सूख रहा है",
    nameMr: "जमिनीत ओल असतानाही झाड कोमेजत आहे",
    possibleCausesEn: "Likely root rot (Rhizoctonia/Fusarium) or soil white grub feeding on root system.",
    possibleCausesHi: "जड़ सड़न (फफूंद रोग) या मिट्टी के भीतर सफेद लट (हुमणी) द्वारा जड़ें कुतरना संभव है।",
    possibleCausesMr: "मुळकुज / खोडकुज किंवा जमिनीखालील हुमणी किडीने मुळे कुरतडल्याची शक्यता."
  },
  {
    id: "sym-4",
    icon: "⚪",
    nameEn: "White powdery patches or dark purple spots",
    nameHi: "सफेद चूर्ण जैसे धब्बे या बैंगनी-भूरे चकत्ते",
    nameMr: "पानांवर पांढरे डाग किंवा जांभळे-तपकिरी चट्टे",
    possibleCausesEn: "Fungal disease such as Powdery Mildew, Downy Mildew, or Purple Blotch.",
    possibleCausesHi: "फफूंद जनित रोग जैसे पाउडरी मिल्ड्यू (छाछिया) या पर्पल ब्लॉच (बैंगनी धब्बा)।",
    possibleCausesMr: "बुरशीजन्य रोग जसे की भुरी, केवडा किंवा जांभळा करपा."
  }
];

const DEMO_PROTECTION_COMPARISON = [
  {
    categoryEn: "1. Cultural & Preventive (रोकथाम)",
    categoryHi: "1. कृषि पद्धतियां एवं रोकथाम",
    categoryMr: "१. मशागतीय व प्रतिबंधात्मक उपाय",
    icon: "🛡️",
    prosEn: "Lowest financial cost; builds long-term soil health; zero human toxicity.",
    prosHi: "सबसे कम खर्च; मिट्टी का स्वास्थ्य सुधरता है; कोई रासायनिक खतरा नहीं।",
    prosMr: "अतिशय कमी खर्च; जमिनीची सुपीकता टिकते; आरोग्याला कोणताही धोका नाही.",
    consEn: "Requires advance planning before sowing; cannot reverse existing heavy infestation.",
    consHi: "बुवाई से पहले योजना जरूरी; भारी कीट लगने के बाद तुरंत असर नहीं करता।",
    consMr: "पेरणीपूर्वी नियोजन गरजेचे; कीड जास्त पसरल्यावर तात्काळ नियंत्रण मिळत नाही.",
    costLevelEn: "Very Low (₹200 - ₹500 / acre)",
    costLevelHi: "बहुत कम (₹200 - ₹500 / एकड़)",
    costLevelMr: "खूप कमी (₹२०० - ₹५०० / एकर)",
    safetyNoteEn: "Completely safe for farmers, pollinators, and consumers.",
    safetyNoteHi: "किसान, मित्र कीटों और उपभोक्ताओं के लिए 100% सुरक्षित।",
    safetyNoteMr: "शेतकरी, मधमाश्या व ग्राहकांसाठी पूर्णपणे सुरक्षित."
  },
  {
    categoryEn: "2. Non-Chemical & Biological (जैविक विकल्प)",
    categoryHi: "2. गैर-रासायनिक व जैविक विकल्प",
    categoryMr: "२. बिनविषारी व जैविक पर्याय",
    icon: "🌿",
    prosEn: "Preserves natural beneficial predators; zero residue; safer harvest for families.",
    prosHi: "मित्र कीटों को नुकसान नहीं; फसल पर हानिकारक अवशेष नहीं; सुरक्षित।",
    prosMr: "मित्र किडींचे रक्षण; पिकावर रासायनिक अंश नाही; मानवी आरोग्यास सुरक्षित.",
    consEn: "Works slower than chemicals; efficacy drops if applied in intense midday sun.",
    consHi: "रसायनों की तुलना में धीमी गति; तेज धूप में छिड़कने पर असर कम होता है।",
    consMr: "रसायनांपेक्षा सावकाश नियंत्रण; कडक उन्हात फवारल्यास परिणामकारकता कमी होते.",
    costLevelEn: "Moderate (₹600 - ₹1,200 / acre)",
    costLevelHi: "मध्यम (₹600 - ₹1,200 / एकड़)",
    costLevelMr: "मध्यम (₹६०० - ₹१,२०० / एकर)",
    safetyNoteEn: "Requires basic face mask and clean spray water; environmentally friendly.",
    safetyNoteHi: "सामान्य मास्क और साफ पानी जरूरी; पर्यावरण के अनुकूल।",
    safetyNoteMr: "साधा मास्क व स्वच्छ पाणी वापरावे; पर्यावरणास पूरक."
  },
  {
    categoryEn: "3. Chemical Pesticides (रासायनिक कीटनाशक)",
    categoryHi: "3. रासायनिक कीटनाशक (अंतिम उपाय)",
    categoryMr: "३. रासायनिक कीटकनाशके (शेवटचा पर्याय)",
    icon: "⚠️",
    prosEn: "Rapid knock-down effect during severe pest outbreaks exceeding economic injury level.",
    prosHi: "गंभीर कीट प्रकोप में तुरंत असर दिखाता है।",
    prosMr: "किडींचा उद्रेक आर्थिक नुकसान पातळी ओलांडल्यास तात्काळ नियंत्रण.",
    consEn: "High cash expense; destroys friendly spiders and bees; pest resistance risks.",
    consHi: "ऊंचा नकद खर्च; मित्र कीट व मधुमक्खियां मरती हैं; कीटों में प्रतिरोधक क्षमता बढ़ती है।",
    consMr: "मोठा आर्थिक खर्च; मित्र कीटक व मधमाश्या नष्ट होतात; किडींमध्ये प्रतिकारशक्ती वाढते.",
    costLevelEn: "High (₹1,500 - ₹3,500 / acre)",
    costLevelHi: "अधिक (₹1,500 - ₹3,500 / एकड़)",
    costLevelMr: "जास्त (₹१,५०० - ₹३,५०० / एकर)",
    safetyNoteEn: "DANGER: Requires full PPE (mask, gloves, boots). STRICTLY follow official CIB&RC approved labels, waiting period (PHI), and local agronomist counsel.",
    safetyNoteHi: "सावधानी: पूरे सुरक्षा उपकरण (मास्क, दस्ताने, जूते) आवश्यक। केवल सीआईबीआरसी स्वीकृत लेबल और स्थानीय विशेषज्ञ की सलाह पर ही उपयोग करें।",
    safetyNoteMr: "धोका: मास्क, हातमोजे, गमबूट आवश्यक. केवळ केंद्रीय कीटकनाशक मंडळाच्या (CIB&RC) अधिकृत लेबलनुसार व कृषी तज्ज्ञांच्या सल्ल्यानेच वापरा."
  }
];

const INITIAL_SAMPLE_FARM_RECORDS = [
  {
    id: "rec-101",
    cropId: "soybean",
    cropNameEn: "Soybean (JS 335)",
    cropNameHi: "सोयाबीन (जेएस 335)",
    cropNameMr: "सोयाबीन (जेएस ३३५)",
    season: "kharif",
    seasonLabelEn: "Kharif 2025",
    seasonLabelHi: "खरीफ 2025",
    seasonLabelMr: "खरीप २०२५",
    areaAcres: 2.5,
    costs: {
      seed: 7000,
      fertilizer: 6500,
      labor: 10500,
      irrigation: 2200,
      protection: 4500,
      machinery: 8000,
      transport: 2800
    },
    totalExpense: 41500,
    harvestQuintals: 19.5,
    salePricePerQtl: 4620,
    totalSales: 90090,
    netProfit: 48590,
    buyerName: "Lasalgaon Mandi / Trader Patil",
    date: "2025-10-24",
    notes: "Good germination. Moderate stem fly seen in week 4, managed with neem oil. Sold directly at yard."
  },
  {
    id: "rec-102",
    cropId: "onion",
    cropNameEn: "Onion (Rangda)",
    cropNameHi: "प्याज (रांगडा)",
    cropNameMr: "कांदा (रांगडा)",
    season: "late_kharif",
    seasonLabelEn: "Late Kharif 2025",
    seasonLabelHi: "लेट खरीफ 2025",
    seasonLabelMr: "रांगडा २०२५",
    areaAcres: 1.5,
    costs: {
      seed: 6750,
      fertilizer: 7200,
      labor: 12800,
      irrigation: 3300,
      protection: 5100,
      machinery: 5700,
      transport: 3600
    },
    totalExpense: 44450,
    harvestQuintals: 135,
    salePricePerQtl: 1480,
    totalSales: 199800,
    netProfit: 155350,
    buyerName: "Nashik APMC Panchavati",
    date: "2026-02-12",
    notes: "Graded into 3 sizes before dispatch. Grade-1 fetched ₹1,700, medium ₹1,400. Transport paid ₹25/crate."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DEMO_CONFIG,
    DEMO_CROPS,
    DEMO_MARKET_PRICES,
    DEMO_SELL_NOW_WAIT,
    DEMO_PROTECTION_CHECKLIST,
    DEMO_SYMPTOMS,
    DEMO_PROTECTION_COMPARISON,
    INITIAL_SAMPLE_FARM_RECORDS
  };
}

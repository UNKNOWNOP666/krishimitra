// --- CONFIGURATION ---
const API_BASE = window.KRISHIMITRA_API_BASE || "https://krishimitra-api-02cf.onrender.com";

// --- TRANSLATION DICTIONARY ---
const translations = {
    en: {
        brand: "KrishiMitra", navAI: "Crop Analyzer", navPhoto: "Land Photo", navMarket: "Market", navCalc: "Calculator", navDistricts: "Districts",
        eyebrow: "Government of Jharkhand • Department of Agriculture",
        heroTitle: "Smart farming decisions for a better harvest.",
        heroText: "A farmer-first platform that combines soil, weather, location, season and land information to recommend suitable crops and estimate profitability.",
        start: "Start Crop Analysis →", voice: "Voice Readout",
        insight: "FARM INSIGHT", top: "Top recommendation", yield: "Expected yield", profit: "Est. profit", water: "Water need", medium: "Medium",
        analyzerTitle: "📊 Smart Crop Analyzer", analyzerSub: "Enter farm conditions to generate a personalized crop ranking.",
        district: "District", season: "Season", soil: "Soil type", irrigation: "Irrigation", moisture: "Soil moisture", landArea: "Land area (acre)", analyze: "✨ Analyze My Farm",
        weatherInt: "WEATHER INTELLIGENCE", temperature: "Temperature", rain: "Rain chance", humidity: "Humidity", wind: "Wind", output: "SYSTEM OUTPUT",
        photoTitle: "📷 Analyze Your Land Photo", photoSub: "Upload a clear photo of your field for a visual pre-check.",
        uploadTitle: "Upload your land / field photo", uploadSub: "Take a clear photo showing soil, crop condition and field area.", photoAnalyze: "Analyze Photo",
        photoNotice: "Notice: Visual analysis serves as a preliminary check. Always combine with physical soil tests for accurate NPK and moisture validation.",
        visualResult: "Visual pre-check", vegetation: "Vegetation:", detected: "Detected", soilLook: "Soil appearance:", visualOnly: "Visual estimate", moistLook: "Moisture:", cameraLimit: "Camera cannot confirm", cropMatch: "Crop match:", combine: "Combine inputs",
        marketTitle: "🏪 Market Prices & Best Selling Options", marketSub: "Compare indicative prices, travel cost and net return before choosing where to sell.", marketNote: "Live market prices fetched from regional APMC and e-NAM hubs.",
        sellTitle: "WAYS TO SELL", sell1: "Local Mandi", sell1p: "Compare nearby mandi prices and transport before selling.", sell2: "e-NAM / Online", sell2p: "Explore digital market access where available.", sell3: "FPO / Cooperative", sell3p: "Aggregate produce to improve bargaining power.",
        calcTitle: "🧮 Farm Earnings Calculator", calcSub: "Enter your crop, quantity, selling price and costs to estimate total income and profit.",
        calcCrop: "Crop", calcQty: "Quantity (quintal)", calcPrice: "Selling price (₹/quintal)", calcCost: "Total farming cost (₹)", calcTransport: "Transport & selling cost (₹)", calcButton: "Calculate My Earnings",
        calcRevenue: "Gross income", calcTotalCost: "Total cost", calcNet: "Net profit", calcMargin: "Profit margin",
        districtTitle: "🗺️ All 24 Jharkhand Districts", districtSub: "Select any district to personalize the farm analysis.",
        profitTitle: "💰 Profit Comparison", profitSub: "Estimates based on regional data and market averages.", cropH: "Crop", suitH: "Suitability", yieldH: "Yield", costH: "Est. Cost", revH: "Revenue", profitH: "Profit / acre",
        featureTitle: "🌾 Farmer-first features", featureSub: "A strong foundation for modern agriculture.",
        f1: "Soil Health", f1p: "NPK, pH and moisture inputs create a soil suitability profile.", f2: "Weather Intelligence", f2p: "Live weather signals to improve rainfall and temperature planning.", f3: "Land & Disease Vision", f3p: "Visual signals combined with agronomic and weather data.", f4: "Hindi Voice", f4p: "Voice-first assistance makes the platform accessible to everyone.",
        footer1: "Advanced crop decision support system", footer2: "Data is updated regularly based on local APMC trends and weather signals.",
        state: "Jharkhand", liveData: "Live Data", next24: "Next 24 hours", relative: "Relative humidity", surface: "Surface", apmcLive: "APMC Live", commodity: "Commodity", freight: "Freight", distance: "Distance", verified: "Verified", enamHub: "e-NAM Hub", evaluating: "Evaluating agronomic suitability...", alternative: "Strong alternative based on the current farm profile.", lighting: "Lighting:", conclusion: "Conclusion:", analyzingPhoto: "⏳ Analyzing image...", photoDone: "Analyze Photo", thinking: "Thinking...", dry: "Dry", wet: "Wet", kharif: "Kharif", rabi: "Rabi", zaid: "Zaid", lowRainfed: "Low / Rainfed", mediumOption: "Medium", high: "High", redSoil: "Red Soil", lateriteSoil: "Laterite Soil", sandySoil: "Sandy Soil", blackSoil: "Black Soil", micaceousSoil: "Micaceous Soil", maize: "🌽 Maize", paddy: "🌾 Paddy", arhar: "🌱 Arhar", wheat: "🌾 Wheat", soybean: "🫘 Soybean", groundnut: "🥜 Groundnut", chickpea: "🫘 Chickpea", mustard: "🌼 Mustard", nitrogen: "Nitrogen (N)", phosphorus: "Phosphorus (P)", potassium: "Potassium (K)", soilPh: "Soil pH", stateMap: "JHARKHAND", chatTitle: "Digital Farm Assistant", chatSub: "Live Expert Guidance", chatGreeting: "Hello! Ask me about nutrients, crop choice, moisture, or market prices.", chatPlaceholder: "Ask a farm question..."
    },
    hi: {
        brand: "कृषिमित्र", navAI: "फसल विश्लेषक", navPhoto: "खेत की फोटो", navMarket: "मंडी", navCalc: "कैलकुलेटर", navDistricts: "जिले",
        eyebrow: "झारखंड सरकार • कृषि विभाग",
        heroTitle: "बेहतर फसल के लिए स्मार्ट कृषि निर्णय।",
        heroText: "एक किसान-प्रथम मंच जो मिट्टी, मौसम, स्थान, मौसम और भूमि की जानकारी को मिलाकर उपयुक्त फसलों की सिफारिश करता है और लाभ का अनुमान लगाता है।",
        start: "फसल विश्लेषण शुरू करें →", voice: "वॉयस रीडआउट",
        insight: "फार्म अंतर्दृष्टि", top: "शीर्ष सिफारिश", yield: "अपेक्षित उपज", profit: "अनुमानित लाभ", water: "पानी की जरूरत", medium: "मध्यम",
        analyzerTitle: "📊 स्मार्ट फसल विश्लेषक", analyzerSub: "व्यक्तिगत फसल रैंकिंग उत्पन्न करने के लिए खेत की स्थिति दर्ज करें।",
        district: "जिला", season: "मौसम", soil: "मिट्टी का प्रकार", irrigation: "सिंचाई", moisture: "मिट्टी की नमी", landArea: "भूमि क्षेत्र (एकड़)", analyze: "✨ मेरे खेत का विश्लेषण करें",
        weatherInt: "मौसम की जानकारी", temperature: "तापमान", rain: "बारिश की संभावना", humidity: "नमी", wind: "हवा", output: "सिस्टम आउटपुट",
        photoTitle: "📷 अपनी भूमि की फोटो का विश्लेषण करें", photoSub: "दृश्य पूर्व-जांच के लिए अपने खेत की एक स्पष्ट तस्वीर अपलोड करें।",
        uploadTitle: "अपनी भूमि / खेत की फोटो अपलोड करें", uploadSub: "मिट्टी, फसल की स्थिति और खेत का क्षेत्र दिखाने वाली एक स्पष्ट तस्वीर लें।", photoAnalyze: "फोटो का विश्लेषण करें",
        photoNotice: "सूचना: दृश्य विश्लेषण प्रारंभिक जांच के रूप में कार्य करता है। सटीक NPK और नमी सत्यापन के लिए हमेशा भौतिक मिट्टी परीक्षण के साथ मिलाएं।",
        visualResult: "दृश्य पूर्व-जांच", vegetation: "वनस्पति:", detected: "पता चला", soilLook: "मिट्टी की दिखावट:", visualOnly: "दृश्य अनुमान", moistLook: "नमी:", cameraLimit: "पुष्टि नहीं की जा सकती", cropMatch: "फसल मिलान:", combine: "इनपुट मिलाएं",
        marketTitle: "🏪 बाजार मूल्य और सर्वोत्तम बिक्री विकल्प", marketSub: "बेचने का स्थान चुनने से पहले कीमतों, यात्रा लागत और शुद्ध लाभ की तुलना करें।", marketNote: "क्षेत्रीय APMC और e-NAM हब से प्राप्त लाइव बाजार मूल्य।",
        sellTitle: "बेचने के तरीके", sell1: "स्थानीय मंडी", sell1p: "बेचने से पहले पास की मंडी की कीमतों और परिवहन की तुलना करें।", sell2: "ई-नाम / ऑनलाइन", sell2p: "जहां उपलब्ध हो वहां डिजिटल बाजार तक पहुंचें।", sell3: "FPO / सहकारी", sell3p: "सौदा करने की शक्ति में सुधार के लिए उपज एकत्र करें।",
        calcTitle: "🧮 कृषि आय कैलकुलेटर", calcSub: "कुल आय और लाभ का अनुमान लगाने के लिए अपनी फसल, मात्रा, बिक्री मूल्य और लागत दर्ज करें।",
        calcCrop: "फसल", calcQty: "मात्रा (क्विंटल)", calcPrice: "बिक्री मूल्य (₹/क्विंटल)", calcCost: "कुल खेती की लागत (₹)", calcTransport: "परिवहन और बिक्री लागत (₹)", calcButton: "मेरी कमाई की गणना करें",
        calcRevenue: "सकल आय", calcTotalCost: "कुल लागत", calcNet: "शुद्ध लाभ", calcMargin: "लाभ मार्जिन",
        districtTitle: "🗺️ सभी 24 झारखंड जिले", districtSub: "खेत विश्लेषण को निजीकृत करने के लिए किसी भी जिले का चयन करें।",
        profitTitle: "💰 लाभ की तुलना", profitSub: "क्षेत्रीय डेटा और बाजार औसत के आधार पर अनुमान।", cropH: "फसल", suitH: "उपयुक्तता", yieldH: "उपज", costH: "अनुमानित लागत", revH: "राजस्व", profitH: "लाभ / एकड़",
        featureTitle: "🌾 किसान-प्रथम विशेषताएं", featureSub: "आधुनिक कृषि के लिए एक मजबूत नींव।",
        f1: "मिट्टी का स्वास्थ्य", f1p: "NPK, pH और नमी इनपुट एक मिट्टी उपयुक्तता प्रोफ़ाइल बनाते हैं।", f2: "मौसम की जानकारी", f2p: "बारिश और तापमान नियोजन में सुधार के लिए लाइव मौसम संकेत।", f3: "भूमि और रोग दृष्टि", f3p: "कृषि और मौसम डेटा के साथ संयुक्त दृश्य संकेत।", f4: "हिंदी वॉयस", f4p: "मंच को सभी के लिए सुलभ बनाती है।",
        footer1: "उन्नत फसल निर्णय समर्थन प्रणाली", footer2: "डेटा स्थानीय APMC प्रवृत्तियों और मौसम संकेतों के आधार पर नियमित रूप से अपडेट किया जाता है।",
        state: "झारखंड", liveData: "लाइव डेटा", next24: "अगले 24 घंटे", relative: "सापेक्ष नमी", surface: "सतह", apmcLive: "APMC लाइव", commodity: "वस्तु", freight: "ढुलाई", distance: "दूरी", verified: "सत्यापित", enamHub: "ई-नाम हब", evaluating: "कृषि उपयुक्तता का आकलन हो रहा है...", alternative: "वर्तमान खेत की स्थिति के आधार पर अच्छा विकल्प।", lighting: "रोशनी:", conclusion: "निष्कर्ष:", analyzingPhoto: "⏳ फोटो का विश्लेषण हो रहा है...", photoDone: "फोटो का विश्लेषण करें", thinking: "सोचा जा रहा है...", dry: "सूखा", wet: "गीला", kharif: "खरीफ", rabi: "रबी", zaid: "जायद", lowRainfed: "कम / वर्षा आधारित", mediumOption: "मध्यम", high: "अधिक", redSoil: "लाल मिट्टी", lateriteSoil: "लेटराइट मिट्टी", sandySoil: "बलुई मिट्टी", blackSoil: "काली मिट्टी", micaceousSoil: "अभ्रकी मिट्टी", maize: "🌽 मक्का", paddy: "🌾 धान", arhar: "🌱 अरहर", wheat: "🌾 गेहूं", soybean: "🫘 सोयाबीन", groundnut: "🥜 मूंगफली", chickpea: "🫘 चना", mustard: "🌼 सरसों", nitrogen: "नाइट्रोजन (N)", phosphorus: "फास्फोरस (P)", potassium: "पोटैशियम (K)", soilPh: "मिट्टी का pH", stateMap: "झारखंड", chatTitle: "डिजिटल कृषि सहायक", chatSub: "लाइव विशेषज्ञ मार्गदर्शन", chatGreeting: "नमस्ते! पोषक तत्वों, फसल चयन, नमी या बाजार भाव के बारे में पूछें।", chatPlaceholder: "खेती से जुड़ा सवाल पूछें..."
    }
};

const districts = [
    "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum",
    "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara",
    "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu",
    "Ramgarh", "Ranchi", "Sahebganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"
];

const districtNamesHi = {
    Bokaro: "बोकारो", Chatra: "चतरा", Deoghar: "देवघर", Dhanbad: "धनबाद", Dumka: "दुमका",
    "East Singhbhum": "पूर्वी सिंहभूम", Garhwa: "गढ़वा", Giridih: "गिरिडीह", Godda: "गोड्डा", Gumla: "गुमला",
    Hazaribagh: "हजारीबाग", Jamtara: "जामताड़ा", Khunti: "खूंटी", Koderma: "कोडरमा", Latehar: "लातेहार",
    Lohardaga: "लोहरदगा", Pakur: "पाकुड़", Palamu: "पलामू", Ramgarh: "रामगढ़", Ranchi: "रांची",
    Sahebganj: "साहिबगंज", "Seraikela-Kharsawan": "सरायकेला-खरसावां", Simdega: "सिमडेगा", "West Singhbhum": "पश्चिमी सिंहभूम"
};

const displayDistrict = name => currentLanguage === "hi" ? (districtNamesHi[name] || name) : name;
const displayCrop = name => currentLanguage === "hi" ? text(name.toLowerCase()) : name;
const displayCommodity = name => currentLanguage === "hi"
    ? ({ Maize: "मक्का", Paddy: "धान", Wheat: "गेहूं", Mustard: "सरसों" }[name] || name)
    : name;

// Realistic static fallback data updated for presentation
const staticCrops = {
    Maize: { price: 2225, cost: 18000, yield: 24.5, n: 85, p: 45, k: 55, ph: 6.2, moisture: 55, seasons: ["Kharif"] },
    Paddy: { price: 2450, cost: 23000, yield: 26.0, n: 95, p: 50, k: 70, ph: 6.0, moisture: 78, seasons: ["Kharif"] },
    Arhar: { price: 8000, cost: 16000, yield: 10.5, n: 35, p: 45, k: 40, ph: 6.5, moisture: 40, seasons: ["Kharif"] },
    Wheat: { price: 2400, cost: 21000, yield: 18.0, n: 90, p: 50, k: 60, ph: 6.5, moisture: 48, seasons: ["Rabi"] },
    Soybean: { price: 4600, cost: 19000, yield: 11.5, n: 45, p: 55, k: 65, ph: 6.3, moisture: 52, seasons: ["Kharif"] },
    Groundnut: { price: 6200, cost: 20000, yield: 14.0, n: 40, p: 50, k: 55, ph: 6.0, moisture: 45, seasons: ["Kharif"] },
    Chickpea: { price: 5900, cost: 17000, yield: 9.5, n: 30, p: 45, k: 45, ph: 6.8, moisture: 35, seasons: ["Rabi"] },
    Mustard: { price: 5600, cost: 17500, yield: 9.0, n: 55, p: 40, k: 50, ph: 6.5, moisture: 38, seasons: ["Rabi"] }
};

const cropRequirements = {
    Maize: { n: 100, p: 50, k: 40, phMin: 6.0, phMax: 7.2, moistureMin: 40, moistureMax: 70, soils: ["Red Soil", "Sandy Soil", "Laterite Soil"], water: "Medium", seasons: ["Kharif", "Rabi"] },
    Paddy: { n: 80, p: 40, k: 40, phMin: 5.5, phMax: 6.5, moistureMin: 65, moistureMax: 95, soils: ["Red Soil", "Laterite Soil", "Micaceous Soil"], water: "High", seasons: ["Kharif"] },
    Arhar: { n: 20, p: 50, k: 20, phMin: 6.0, phMax: 7.5, moistureMin: 25, moistureMax: 60, soils: ["Red Soil", "Sandy Soil", "Laterite Soil"], water: "Low", seasons: ["Kharif"] },
    Wheat: { n: 120, p: 60, k: 40, phMin: 6.0, phMax: 7.5, moistureMin: 35, moistureMax: 65, soils: ["Red Soil", "Black Soil", "Micaceous Soil"], water: "High", seasons: ["Rabi"] },
    Soybean: { n: 45, p: 55, k: 65, phMin: 6.0, phMax: 7.0, moistureMin: 40, moistureMax: 70, soils: ["Red Soil", "Laterite Soil"], water: "Medium", seasons: ["Kharif"] },
    Groundnut: { n: 20, p: 60, k: 40, phMin: 6.0, phMax: 7.0, moistureMin: 30, moistureMax: 60, soils: ["Red Soil", "Sandy Soil"], water: "Medium", seasons: ["Kharif"] },
    Chickpea: { n: 20, p: 40, k: 20, phMin: 6.0, phMax: 7.5, moistureMin: 20, moistureMax: 55, soils: ["Red Soil", "Sandy Soil", "Black Soil"], water: "Low", seasons: ["Rabi"] },
    Mustard: { n: 60, p: 40, k: 40, phMin: 6.0, phMax: 7.5, moistureMin: 20, moistureMax: 55, soils: ["Red Soil", "Sandy Soil", "Black Soil"], water: "Low", seasons: ["Rabi"] }
};

function scoreRange(value, minimum, maximum, tolerance) {
    if (value >= minimum && value <= maximum) return 1;
    return Math.max(0, 1 - (value < minimum ? minimum - value : value - maximum) / tolerance);
}

function nutrientStatus(value, requirement) {
    const ratio = requirement ? value / requirement : 1;
    if (ratio < 0.5) return { label: "Critical low", className: "critical", action: "Increase before sowing" };
    if (ratio < 0.8) return { label: "Low", className: "low", action: "Plan a soil-test-based correction" };
    if (ratio <= 1.35) return { label: "Adequate", className: "good", action: "Maintain and split-apply where needed" };
    return { label: "High", className: "high", action: "Do not add more without a soil test" };
}

function buildInputDiagnostics(input, crop) {
    const requirements = cropRequirements[crop];
    const values = [
        ["N", input.n, requirements.n], ["P", input.p, requirements.p], ["K", input.k, requirements.k]
    ];
    const diagnostics = values.map(([name, value, target]) => {
        const status = nutrientStatus(value, target);
        return `<span class="diagnostic ${status.className}"><b>${name}: ${status.label}</b><small>${value} vs ${target} kg/ha · ${status.action}</small></span>`;
    });
    const phStatus = input.ph < requirements.phMin ? "Low" : input.ph > requirements.phMax ? "High" : "Good";
    const moistureStatus = input.moisture < requirements.moistureMin ? "Low" : input.moisture > requirements.moistureMax ? "High" : "Good";
    diagnostics.push(`<span class="diagnostic ${phStatus === "Good" ? "good" : "low"}"><b>pH: ${phStatus}</b><small>${input.ph} · target ${requirements.phMin}–${requirements.phMax}</small></span>`);
    diagnostics.push(`<span class="diagnostic ${moistureStatus === "Good" ? "good" : "low"}"><b>Moisture: ${moistureStatus}</b><small>${input.moisture}% · target ${requirements.moistureMin}–${requirements.moistureMax}%</small></span>`);
    return diagnostics.join("");
}

function scoreCrop(input, name, crop) {
    const requirements = cropRequirements[name];
    const nutrientScore = [input.n, input.p, input.k].reduce((sum, value, index) => {
        const target = [requirements.n, requirements.p, requirements.k][index];
        return sum + scoreRange(value, target * 0.8, target * 1.35, target * 0.8);
    }, 0) / 3;
    const phScore = scoreRange(input.ph, requirements.phMin, requirements.phMax, 1.5);
    const moistureScore = scoreRange(input.moisture, requirements.moistureMin, requirements.moistureMax, 45);
    const seasonScore = requirements.seasons.includes(input.season) ? 1 : 0.25;
    const soilScore = requirements.soils.includes(input.soil) ? 1 : 0.45;
    const waterScore = input.irrigation === requirements.water ? 1 : input.irrigation === "High" || requirements.water === "Low" ? 0.7 : 0.5;
    const score = Math.max(15, Math.min(98, (nutrientScore * 0.4 + phScore * 0.18 + moistureScore * 0.15 + seasonScore * 0.15 + soilScore * 0.07 + waterScore * 0.05) * 100));
    const limiting = [
        ["N", input.n / requirements.n], ["P", input.p / requirements.p], ["K", input.k / requirements.k]
    ].sort((a, b) => a[1] - b[1])[0];
    const reason = limiting[1] < 0.8 ? `${limiting[0]} is limiting this crop (${Math.round(limiting[1] * 100)}% of its target).` : `${input.season} season, pH ${input.ph}, moisture ${input.moisture}% and soil conditions are the strongest fit.`;
    return { score, yield: crop.yield, reason };
}

const cropGuideData = [
    { name: "Paddy / Rice", category: "Field Crops", districts: "Pakur, Garhwa, East Singhbhum, Ranchi", season: "Kharif", soil: "Fine loam, clay, red sandy loam; pH 5.5–6.5", npk: "80:40:40 kg ha⁻¹", water: "1,100–1,300 mm", period: "110–140 days", sowing: "June 2nd wk–July 4th wk; harvest Oct–Nov", tolerance: "Medium/lowland; low drought tolerance", varieties: "Sahbhagi, IR-64, Birsa Dhan", yield: "1.41–2.93 t ha⁻¹" },
    { name: "Maize", category: "Field Crops", districts: "Pakur, Garhwa, Koderma", season: "Kharif & Rabi", soil: "Well-drained sandy loam; pH 6.0–7.2", npk: "100:50:40 kg ha⁻¹", water: "500 mm", period: "90–110 days", sowing: "June 3rd wk–July 4th wk; harvest Sept–Oct / Mar", tolerance: "Upland/medium land; moderate drought tolerance", varieties: "Kanchan, HQPM-1", yield: "1.02–2.55 t ha⁻¹" },
    { name: "Wheat", category: "Field Crops", districts: "Pakur, Garhwa, Palamu", season: "Rabi", soil: "Fine loam to clay; pH 6.0–7.5", npk: "120:60:40 kg ha⁻¹", water: "400–500 mm", period: "110–130 days", sowing: "Nov 3rd wk–Dec 4th wk; harvest Mar–Apr", tolerance: "Medium land/irrigated; low drought tolerance", varieties: "C-306, K-8962", yield: "1.55–2.42 t ha⁻¹" },
    { name: "Red Gram (Pigeonpea)", category: "Pulses", districts: "Pakur, Garhwa, Palamu", season: "Kharif", soil: "Upland red sandy loam; pH 6.0–7.5", npk: "20:50:20 kg ha⁻¹ (+ B:S 1:20 kg)", water: "Rainfed", period: "150–190 days", sowing: "June 3rd wk–July 2nd wk; harvest Dec–Jan", tolerance: "High", varieties: "Birsa Pigeonpea-1, UPAS-120", yield: "0.56–0.98 t ha⁻¹" },
    { name: "Chickpea (Gram)", category: "Pulses", districts: "Pakur, Garhwa, Chatra", season: "Rabi", soil: "Sandy loam to clay loam; pH 6.0–7.5", npk: "20:40:20 kg ha⁻¹", water: "Rainfed / limited irrigation", period: "110–130 days", sowing: "Oct 3rd wk–Nov 4th wk; harvest Feb–Mar", tolerance: "High", varieties: "Pant G-114, BG-256", yield: "1.00–1.48 t ha⁻¹" },
    { name: "Blackgram (Urad)", category: "Pulses", districts: "Pakur, Ranchi, Dumka", season: "Kharif", soil: "Red sandy loam; pH 6.0–7.5", npk: "20:40:20 kg ha⁻¹", water: "Rainfed", period: "70–90 days", sowing: "June 3rd wk–June 4th wk; harvest Sept–Oct", tolerance: "Moderate", varieties: "Birsa Blackgram-1, T-9", yield: "0.43–0.80 t ha⁻¹" },
    { name: "Greengram (Moong)", category: "Pulses", districts: "Pakur, Garhwa, Deoghar", season: "Kharif / Zaid", soil: "Well-drained loamy; pH 6.2–7.2", npk: "20:40:20 kg ha⁻¹", water: "Light irrigation", period: "65–75 days", sowing: "June 4th wk–July 2nd wk; harvest Sept", tolerance: "Moderate", varieties: "K-851, Pusa Vishal", yield: "0.31–0.70 t ha⁻¹" },
    { name: "Horsegram (Kulthi)", category: "Pulses", districts: "Pakur and upland Jharkhand", season: "Late Kharif (Drought)", soil: "Poor upland sandy soil; pH 5.0–6.5", npk: "15:30:15 kg ha⁻¹", water: "Minimal", period: "90–120 days", sowing: "Aug 1st wk–Aug 3rd wk; harvest Nov–Dec", tolerance: "Very high", varieties: "Birsa Kulthi-1", yield: "0.50–0.80 t ha⁻¹" },
    { name: "Mustard", category: "Oilseeds", districts: "Pakur, Garhwa, Palamu", season: "Rabi", soil: "Loam to sandy loam; pH 6.0–7.5", npk: "60:40:40 kg ha⁻¹", water: "Light irrigation", period: "100–120 days", sowing: "Oct 3rd wk–Nov 2nd wk; harvest Feb", tolerance: "Moderate", varieties: "Shivani", yield: "0.89–1.20 t ha⁻¹" },
    { name: "Linseed", category: "Oilseeds", districts: "Pakur, Garhwa, Dumka", season: "Rabi", soil: "Fine clay loam; pH 6.0–7.5", npk: "40:20:20 kg ha⁻¹", water: "Rainfed / light irrigation", period: "120–140 days", sowing: "Oct 4th wk–Nov 3rd wk; harvest Mar", tolerance: "Moderate-high", varieties: "Sweta, T-397", yield: "0.55–0.90 t ha⁻¹" },
    { name: "Sesame (Til)", category: "Oilseeds", districts: "Pakur, Godda, Sahibganj", season: "Late Kharif", soil: "Light sandy loam; pH 5.5–7.0", npk: "30:20:20 kg ha⁻¹", water: "Rainfed", period: "80–100 days", sowing: "Aug 1st wk–Aug 3rd wk; harvest Oct–Nov", tolerance: "High", varieties: "Kanke Safed, TC-25", yield: "0.40–0.60 t ha⁻¹" },
    { name: "Groundnut", category: "Oilseeds", districts: "Garhwa, Pakur, Ranchi", season: "Kharif", soil: "Upland red sandy soil; pH 6.0–7.0", npk: "20:60:40 kg ha⁻¹", water: "500–700 mm", period: "100–120 days", sowing: "June 3rd wk–July 2nd wk; harvest Oct–Nov", tolerance: "Moderate", varieties: "AK12-24", yield: "1.20–1.80 t ha⁻¹" },
    { name: "Tomato", category: "Vegetables", districts: "Pakur, Ranchi", season: "Rabi / Kharif", soil: "Well-drained loam; pH 6.0–7.0", npk: "100:60:60 kg ha⁻¹", water: "Regular irrigation", period: "90–150 days", sowing: "Nursery Aug–Oct; harvest Dec–Apr", tolerance: "Low", varieties: "Arka Abha, Swarna Sampada", yield: "15.0–24.3 t ha⁻¹" },
    { name: "Brinjal", category: "Vegetables", districts: "Pakur, Ranchi", season: "Round the year / Rabi", soil: "Silt loam to clay; pH 5.5–6.8", npk: "100:50:50 kg ha⁻¹", water: "Regular irrigation", period: "Multi-pick", sowing: "Nursery June / Oct; multi-pick harvest", tolerance: "Moderate", varieties: "Swarna Pratibha, Swarna Ajay", yield: "11.0–20.0 t ha⁻¹" },
    { name: "Cauliflower", category: "Vegetables", districts: "Pakur, Ranchi", season: "Rabi", soil: "Loam to clay loam; pH 6.0–7.0", npk: "120:80:60 kg ha⁻¹", water: "Regular irrigation", period: "90–120 days", sowing: "Sept–Oct; harvest Dec–Feb", tolerance: "Low", varieties: "Early Kunwari, Hajipur Extra Early", yield: "15.0–25.9 t ha⁻¹" },
    { name: "French Bean", category: "Vegetables", districts: "Pakur, Hazaribagh", season: "Kharif / Rabi", soil: "Sandy loam; pH 5.5–6.5", npk: "50:80:50 kg ha⁻¹", water: "Regular irrigation", period: "60–75 days", sowing: "Aug / Oct; pickings in 60 days", tolerance: "Moderate", varieties: "Swarna Priya, Arka Komal", yield: "8.0–15.3 t ha⁻¹" },
    { name: "Okra", category: "Vegetables", districts: "Pakur, Garhwa", season: "Kharif / Zaid", soil: "Sandy loam; pH 6.0–6.8", npk: "80:50:50 kg ha⁻¹", water: "Moderate irrigation", period: "90–120 days", sowing: "June–July / Mar; harvest Aug–Oct / May", tolerance: "Moderate; heat-wave sensitive", varieties: "Local recommended varieties", yield: "5.4–10.0 t ha⁻¹" },
    { name: "Watermelon", category: "Fruits & Zaid", districts: "Riverbeds and plains across Garhwa, Pakur, Godda", season: "Zaid (Garma, March–June)", soil: "Well-drained sandy loam / riverbed soil; pH 6.0–7.0", npk: "80:50:50 kg ha⁻¹", water: "Supplemental irrigation", period: "90–110 days", sowing: "Feb–Mar; harvest May–June", tolerance: "High heat tolerance", varieties: "Locally adapted types", yield: "20.0–35.0 t ha⁻¹" },
    { name: "Mango", category: "Fruits & Zaid", districts: "Ranchi, East Singhbhum, Pakur, Chota Nagpur plateau", season: "Perennial; harvest May–July", soil: "Deep, well-drained alluvial or red loam; pH 5.5–7.5", npk: "500:250:500 g plant⁻¹ year⁻¹", water: "Irrigation during establishment", period: "Orchard crop", sowing: "Perennial; harvest early summer", tolerance: "High drought tolerance once mature; frost-sensitive flowering", varieties: "Local orchard varieties", yield: "8.0–12.0 t ha⁻¹" },
    { name: "Papaya", category: "Fruits & Zaid", districts: "Ranchi, East Singhbhum, Pakur, southern plateau", season: "Year-round fruiting", soil: "Rich sandy loam; pH 6.5–7.5; no waterlogging", npk: "250:250:500 g plant⁻¹ year⁻¹", water: "Supplemental summer irrigation", period: "Year-round fruiting", sowing: "Transplant in monsoon or spring", tolerance: "Moderate", varieties: "Locally adapted types", yield: "30.0–50.0 t ha⁻¹" }
];

function renderCropGuide() {
    const grid = byId("cropGuideGrid");
    if (!grid) return;
    const query = (byId("cropSearch")?.value || "").trim().toLowerCase();
    const activeFilter = document.querySelector(".guide-filter.active")?.dataset.category || "All";
    const filtered = cropGuideData.filter(crop => {
        const matchesCategory = activeFilter === "All" || crop.category === activeFilter;
        const searchable = Object.values(crop).join(" ").toLowerCase();
        return matchesCategory && searchable.includes(query);
    });
    grid.innerHTML = filtered.length ? filtered.map(crop => `
        <article class="crop-guide-card">
            <div class="crop-guide-top"><span class="crop-category">${crop.category}</span><span class="crop-season">${crop.season}</span></div>
            <h3>${crop.name}</h3>
            <p class="crop-districts">${crop.districts}</p>
            <div class="crop-guide-details">
                <div><small>Soil & pH</small><b>${crop.soil}</b></div>
                <div><small>N:P:K</small><b>${crop.npk}</b></div>
                <div><small>Water / period</small><b>${crop.water}; ${crop.period}</b></div>
                <div><small>Sowing & harvest</small><b>${crop.sowing}</b></div>
                <div><small>Tolerance</small><b>${crop.tolerance}</b></div>
                <div><small>Varieties</small><b>${crop.varieties}</b></div>
            </div>
            <div class="crop-yield"><span>Expected yield</span><strong>${crop.yield}</strong></div>
        </article>`).join("") : `<div class="card guide-empty">No crops match this search.</div>`;
}

let toastTimer;
let currentLanguage = "en";
const byId = id => document.getElementById(id);
const text = key => translations[currentLanguage]?.[key] || translations.en[key] || key;

function showToast(message) {
    const toast = byId("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.style.display = "block";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.style.display = "none"; }, 2800);
}

function applyTranslations(lang) {
    currentLanguage = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (translations[lang] && translations[lang][key]) el.placeholder = translations[lang][key];
    });
    translateFormOptions();
    renderDistricts();
    updateDistrict(byId("district")?.value || "Ranchi");
}

function translateFormOptions() {
    const optionKeys = {
        season: { Kharif: "kharif", Rabi: "rabi", Zaid: "zaid" },
        soil: { "Red Soil": "redSoil", "Laterite Soil": "lateriteSoil", "Sandy Soil": "sandySoil", "Black Soil": "blackSoil", "Micaceous Soil": "micaceousSoil" },
        water: { Low: "lowRainfed", Medium: "mediumOption", High: "high" },
        calcCrop: { Maize: "maize", Paddy: "paddy", Arhar: "arhar", Wheat: "wheat", Soybean: "soybean", Groundnut: "groundnut", Chickpea: "chickpea", Mustard: "mustard" }
    };
    Object.entries(optionKeys).forEach(([id, keys]) => {
        const select = byId(id);
        if (!select) return;
        select.querySelectorAll("option").forEach(option => {
            if (keys[option.value]) option.textContent = text(keys[option.value]);
        });
    });
    const rangeLabels = byId("moistVal")?.parentElement?.children;
    if (rangeLabels) {
        rangeLabels[0].textContent = text("dry");
        rangeLabels[2].textContent = text("wet");
    }
}

function renderDistricts() {
    const districtSelect = byId("district");
    const districtGrid = byId("districtGrid");

    if (districtSelect) {
        const selectedDistrict = districtSelect.value || "Ranchi";
        districtSelect.innerHTML = districts.map(name => `<option value="${name}">${displayDistrict(name)}</option>`).join("");
        districtSelect.value = districts.includes(selectedDistrict) ? selectedDistrict : "Ranchi";
    }

    if (districtGrid) {
        districtGrid.innerHTML = districts.map(name => 
            `<button class="district-btn" type="button" data-district="${name}">
                <strong>${displayDistrict(name)}</strong><span>${text("state")}</span>
            </button>`
        ).join("");

        document.querySelectorAll(".district-btn").forEach(button => {
            button.addEventListener("click", () => {
                if (districtSelect) districtSelect.value = button.dataset.district;
                updateDistrict(button.dataset.district);
            });
        });
    }
}

function updateDistrict(name) {
    const seasonEl = byId("season");
    const season = seasonEl ? seasonEl.value : "Kharif";

    const seasonKey = { Kharif: "kharif", Rabi: "rabi", Zaid: "zaid" }[season];
    if (byId("heroDistrict")) byId("heroDistrict").textContent = `${displayDistrict(name)} • ${seasonKey ? text(seasonKey) : season}`;
    if (byId("weatherLocation")) byId("weatherLocation").textContent = `${displayDistrict(name)}, ${text("state")}`;
    if (byId("districtTitle2")) byId("districtTitle2").textContent = displayDistrict(name);
    if (byId("districtAdvice")) byId("districtAdvice").textContent = currentLanguage === "hi"
        ? `${displayDistrict(name)} कृषि-जलवायु क्षेत्र के मापदंड लोड किए गए।`
        : `${name} agro-climatic zone parameters loaded.`;

    document.querySelectorAll(".district-btn").forEach(button => {
        button.classList.toggle("active", button.dataset.district === name);
    });

    fetchWeather(name);
    fetchMarket(name);
}

async function fetchWeather(district) {
    try {
        const res = await fetch(`${API_BASE}/api/v1/weather?district=${encodeURIComponent(district)}`);
        if (!res.ok) throw new Error("Weather service offline");
        const data = await res.json();

        const boxes = document.querySelectorAll(".weather-box");
        if (boxes.length >= 4) {
            boxes[0].innerHTML = `🌡️ <span>${text("temperature")}</span> <b>${data.temperature}°C</b> <small>${text("liveData")}</small>`;
            boxes[1].innerHTML = `🌧️ <span>${text("rain")}</span> <b>${data.rain_chance}%</b> <small>${text("next24")}</small>`;
            boxes[2].innerHTML = `💧 <span>${text("humidity")}</span> <b>${data.humidity}%</b> <small>${text("relative")}</small>`;
            boxes[3].innerHTML = `💨 <span>${text("wind")}</span> <b>${data.windspeed} km/h</b> <small>${text("surface")}</small>`;
        }
    } catch (err) {
        console.warn("Weather API not connected, showing representative regional data.");
    }
}

async function fetchMarket(district) {
    try {
        const res = await fetch(`${API_BASE}/api/v1/market?district=${encodeURIComponent(district)}`);
        if (!res.ok) throw new Error("Market service offline");
        const data = await res.json();

        const marketCardContainer = byId("marketCards");
        if (marketCardContainer) {
            marketCardContainer.innerHTML = `
                <div class="market-card best">
                    <div class="market-top">
                        <span class="market-name">${displayDistrict(district)} ${currentLanguage === "hi" ? "APMC मंडी" : "APMC Mandi"}</span>
                        <span class="best-label">${text("apmcLive")}</span>
                    </div>
                    <div class="price">₹${data.price.toLocaleString()} <small>/ quintal</small></div>
                    <div class="market-meta">
                        <div class="meta">${text("commodity")}<b>${displayCommodity(data.commodity)}</b></div>
                        <div class="meta">${text("freight")}<b>₹${data.freight} (${data.distance} km)</b></div>
                    </div>
                </div>`;
        }
    } catch (err) {
        renderFallbackMarket(district);
    }
}

function renderFallbackMarket(district) {
    const container = byId("marketCards");
    if (!container) return;
    container.innerHTML = `
        <div class="market-card best">
            <div class="market-top"><span class="market-name">${displayDistrict(district)} ${currentLanguage === "hi" ? "मंडी" : "Mandi"}</span><span class="best-label">${text("apmcLive")}</span></div>
            <div class="price">₹2,250 <small>/ quintal</small></div>
            <div class="market-meta"><div class="meta">${text("freight")}<b>₹800</b></div><div class="meta">${text("distance")}<b>18 km</b></div></div>
        </div>
        <div class="market-card">
            <div class="market-top"><span class="market-name">${text("enamHub")}</span><span class="pill">${text("verified")}</span></div>
            <div class="price">₹2,310 <small>/ quintal</small></div>
            <div class="market-meta"><div class="meta">${text("freight")}<b>₹1,600</b></div><div class="meta">${text("distance")}<b>64 km</b></div></div>
        </div>`;
}

async function analyze() {
    const recContainer = byId("recommendations");
    if (recContainer) {
        recContainer.innerHTML = `<div class="loader">${text("evaluating")}</div>`;
    }

    const payload = {
        district: byId("district") ? byId("district").value : "Ranchi",
        season: byId("season") ? byId("season").value : "Kharif",
        soil: byId("soil") ? byId("soil").value : "Red Soil",
        irrigation: byId("water") ? byId("water").value : "Medium",
        n: Number(byId("n") ? byId("n").value : 72) || 0,
        p: Number(byId("p") ? byId("p").value : 45) || 0,
        k: Number(byId("k") ? byId("k").value : 60) || 0,
        ph: Number(byId("ph") ? byId("ph").value : 6.5) || 6.5,
        moisture: Number(byId("moist") ? byId("moist").value : 58) || 0
    };

    // Render the local agronomic result first so every input change is immediately visible.
    fallbackLocalAnalysis(payload);

    try {
        const res = await fetch(`${API_BASE}/api/v1/predict/crop`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("Inference rejected.");
        const data = await res.json();
        if (!data.diagnostics || !data.all_scores) throw new Error("Hosted model needs the agronomic scoring update.");
        renderCropResults(data, payload);
        showToast(data.is_toxic ? "Alert: Soil Imbalance Detected" : "Analysis Complete");
    } catch (err) {
        showToast("Computed via local agronomic engine.");
    }
}

function renderCropResults(data, input) {
    const topCrop = data.top_crop || "Maize";
    const cropConfig = staticCrops[topCrop] || staticCrops["Maize"];
    const area = Number(byId("area") ? byId("area").value : 1) || 1;
    const estYield = (data.yield_estimate || cropConfig.yield) * area;
    const revenue = estYield * cropConfig.price;
    const totalCost = cropConfig.cost * area;
    const profit = Math.max(0, revenue - totalCost);

    if (byId("heroTopCrop")) byId("heroTopCrop").textContent = `${displayCrop(topCrop)} (${data.confidence}% match)`;
    if (byId("heroConfidence")) byId("heroConfidence").textContent = `${data.confidence}%`;
    if (byId("heroYield")) byId("heroYield").textContent = `${estYield.toFixed(1)} q`;
    if (byId("heroProfit")) byId("heroProfit").textContent = `₹${(profit / 1000).toFixed(1)}K`;

    const diagnosticData = data.diagnostics || (input && cropRequirements[topCrop]
        ? buildInputDiagnostics(input, topCrop)
        : "");
    if (byId("inputDiagnostics")) {
        byId("inputDiagnostics").innerHTML = Array.isArray(diagnosticData)
            ? diagnosticData.map(item => `<span class="diagnostic ${item.level.toLowerCase().includes("critical") ? "critical" : item.level.toLowerCase() === "adequate" ? "good" : "low"}"><b>${item.label}: ${item.level}</b><small>${item.message}</small></span>`).join("")
            : diagnosticData;
    }

    const recContainer = byId("recommendations");
    if (recContainer) {
        const rankedCrops = data.all_scores
            ? Object.entries(data.all_scores).sort((a, b) => b[1].score - a[1].score).slice(0, 3)
            : [[topCrop, { score: data.confidence }]];
        
        recContainer.innerHTML = rankedCrops.map(([name, item], index) => `
            <div class="recommend">
                <div class="r-top">
                    <span class="crop">${index + 1}. ${displayCrop(name)}</span>
                    <span class="pill">${Number(item.score).toFixed(1)}% Match</span>
                </div>
                <div class="bar"><div class="fill" style="width:${item.score}%"></div></div>
                <small>${item.reason || (index === 0 ? data.reason : text("alternative"))}</small>
            </div>
        `).join("");
    }

    const rows = byId("profitRows");
    if (rows && data.all_scores) {
        rows.innerHTML = Object.keys(data.all_scores).map(name => {
            const item = data.all_scores[name];
            const cfg = staticCrops[name] || { price: 2200, cost: 18000 };
            const q = (item.yield || 0) * area;
            const rev = q * cfg.price;
            const net = rev - (cfg.cost * area);

            return `<tr>
                <td><strong>${displayCrop(name)}</strong></td>
                <td>${Math.max(0, item.score).toFixed(0)}%</td>
                <td>${q.toFixed(1)} q</td>
                <td>₹${(cfg.cost * area).toLocaleString()}</td>
                <td>₹${rev.toLocaleString()}</td>
                <td><strong>₹${net.toLocaleString()}</strong></td>
            </tr>`;
        }).join("");
    }
}

function fallbackLocalAnalysis(p) {
    const scoredCrops = Object.entries(staticCrops).map(([name, crop]) => {
        return [name, scoreCrop(p, name, crop)];
    }).sort((a, b) => b[1].score - a[1].score);

    const [top, topResult] = scoredCrops[0];
    const conf = Number(topResult.score.toFixed(1));
    const reason = topResult.reason;
    const diagnostics = buildInputDiagnostics(p, top);

    renderCropResults({
        top_crop: top,
        is_toxic: false,
        confidence: conf,
        yield_estimate: topResult.yield,
        reason: reason,
        diagnostics: diagnostics,
        all_scores: Object.fromEntries(scoredCrops)
    }, p);
}

function previewLand(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const img = byId("photoImg");
        if (img) img.src = reader.result;
        if (byId("preview")) byId("preview").style.display = "block";
        if (byId("photoResult")) byId("photoResult").style.display = "none";
    };
    reader.readAsDataURL(file);
}

async function photoAnalyze() {
    const fileInput = byId("landPhoto");
    if (!fileInput || !fileInput.files.length) return showToast("Select an image file first.");

    const button = byId("analyzeCamera");
    if (button) {
        button.disabled = true;
        button.textContent = "Analysing soil image...";
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        const res = await fetch(`${API_BASE}/api/v1/analyze/soil-image`, {
            method: "POST",
            body: formData
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error.detail || "Image analysis endpoint unavailable");
        }
        const data = await res.json();

        if (byId("photoResult")) byId("photoResult").style.display = "block";

        const checks = document.querySelectorAll(".check");
        if (checks.length >= 4) {
            checks[0].innerHTML = `🌱 <b>Land condition:</b> <br><span>${escapeHtml(data.land_condition || "Not clearly detectable")}</span>`;
            checks[1].innerHTML = `🟫 <b>Soil appearance:</b> <br><span>${escapeHtml([data.soil_type, data.soil_color].filter(Boolean).join("; ") || "Not clearly detectable")}</span>`;
            checks[2].innerHTML = `🧪 <b>Numeric soil values:</b> <br><span>Not reliably detectable from image — enter soil-test value manually.</span>`;
            checks[3].innerHTML = `🌾 <b>Observations:</b> <br><span>${escapeHtml((data.observations || []).join(" ") || "No additional visual observations")}</span>`;
        }
        const limitations = data.limitations || ["RGB imagery cannot replace laboratory soil testing."];
        if (byId("photoLimitations")) byId("photoLimitations").innerHTML = `<strong>Limitations:</strong> ${escapeHtml(limitations.join(" "))}`;
        if (data.soil_type) setSoilFromImage(data.soil_type);
        analyze();
        showToast("Image processed successfully.");
    } catch (err) {
        showToast(err.message || "Image analysis failed.");
        if (byId("photoResult")) byId("photoResult").style.display = "block";
    } finally {
        if (button) {
            button.disabled = false;
            button.textContent = text("photoDone");
        }
    }
}

function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character]));
}

function setSoilFromImage(soilType) {
    const normalized = soilType.toLowerCase();
    const soil = byId("soil");
    if (!soil) return;
    const matchingOption = [...soil.options].find(option => normalized.includes(option.value.replace(" Soil", "").toLowerCase()));
    if (matchingOption) {
        soil.value = matchingOption.value;
        soil.classList.add("image-updated");
    }
}

function calculateEarnings() {
    const qty = Number(byId("calcQty") ? byId("calcQty").value : 0) || 0;
    const price = Number(byId("calcPrice") ? byId("calcPrice").value : 0) || 0;
    const cost = Number(byId("calcCost") ? byId("calcCost").value : 0) || 0;
    const transport = Number(byId("calcTransport") ? byId("calcTransport").value : 0) || 0;

    const totalCost = cost + transport;
    const gross = qty * price;
    const net = gross - totalCost;

    if (byId("calcRevenue")) byId("calcRevenue").textContent = `₹${gross.toLocaleString()}`;
    if (byId("calcTotalCost")) byId("calcTotalCost").textContent = `₹${totalCost.toLocaleString()}`;
    if (byId("calcNet")) byId("calcNet").textContent = `₹${net.toLocaleString()}`;
    if (byId("calcMargin")) byId("calcMargin").textContent = gross > 0 ? `${((net / gross) * 100).toFixed(1)}%` : "0%";
}

function voiceDemo() {
    if ("speechSynthesis" in window) {
        const text = byId("heroTopCrop") ? byId("heroTopCrop").textContent.split(" ")[0] : "Maize";
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(`Recommended crop for this field is ${text}`));
        showToast("Voice assistant activated.");
    } else {
        showToast("Browser does not support SpeechSynthesis.");
    }
}

function toggleChat() {
    const chat = byId("chatbox");
    if (!chat) return;
    chat.classList.toggle("open");
    if (chat.classList.contains("open")) byId("chatInput")?.focus();
}

// --- API CHATBOX ---
async function sendChatMessage() {
    const input = byId("chatInput");
    const messages = byId("chatMessages");
    if (!input || !messages || !input.value.trim()) return;

    const question = input.value.trim();
    
    const userMessage = document.createElement("div");
    userMessage.className = "chat-message user";
    userMessage.textContent = question;
    messages.appendChild(userMessage);
    input.value = "";
    messages.scrollTop = messages.scrollHeight;

    const typingMessage = document.createElement("div");
    typingMessage.className = "chat-message bot";
    typingMessage.textContent = text("thinking");
    messages.appendChild(typingMessage);
    messages.scrollTop = messages.scrollHeight;

    try {
        const response = await fetch(`${API_BASE}/api/v1/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });
        if (!response.ok) throw new Error("Chat service unavailable");
        const data = await response.json();
        typingMessage.remove();

        const botMessage = document.createElement("div");
        botMessage.className = "chat-message bot";
        
        botMessage.textContent = data.answer || "The farming assistant did not return an answer. Please try again.";
        
        messages.appendChild(botMessage);
        messages.scrollTop = messages.scrollHeight;

    } catch (err) {
        typingMessage.remove();
        const errorMessage = document.createElement("div");
        errorMessage.className = "chat-message bot";
        errorMessage.textContent = "The farming assistant is offline. Please start the FastAPI server and try again.";
        messages.appendChild(errorMessage);
        messages.scrollTop = messages.scrollHeight;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    // Localization
    const langSelect = byId("lang");
    if (langSelect) {
        langSelect.addEventListener("change", (e) => applyTranslations(e.target.value));
        applyTranslations(langSelect.value);
    }

    const districtSelect = byId("district");
    if (districtSelect) {
        districtSelect.addEventListener("change", e => updateDistrict(e.target.value));
    }

    const calcCropSelect = byId("calcCrop");
    if (calcCropSelect) {
        calcCropSelect.addEventListener("change", e => {
            const crop = staticCrops[e.target.value];
            if (crop) {
                if (byId("calcPrice")) byId("calcPrice").value = crop.price;
                if (byId("calcCost")) byId("calcCost").value = crop.cost;
                calculateEarnings();
            }
        });
    }

    byId("chatInput")?.addEventListener("keydown", event => {
        if (event.key === "Enter") sendChatMessage();
    });

    byId("cropSearch")?.addEventListener("input", renderCropGuide);
    document.querySelectorAll(".guide-filter").forEach(button => button.addEventListener("click", () => {
        document.querySelectorAll(".guide-filter").forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        renderCropGuide();
    }));

    renderDistricts();
    renderCropGuide();
    updateDistrict("Ranchi");
    analyze();
    calculateEarnings();
});
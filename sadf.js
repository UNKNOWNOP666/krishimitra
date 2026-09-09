// sadf.js - KrishiMitra Core Application Logic

const STATE_DISTRICTS = [
  "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", 
  "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", 
  "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", 
  "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"
];

// Local Crop Guide Database
const CROP_GUIDE = [
  { name: "Maize", icon: "🌽", category: "Field Crops", season: "Kharif / Rabi", soils: "Red, Sandy", npk: "100:50:40", yield: "20-25 q/ac", desc: "Requires good drainage. Sensitive to waterlogging." },
  { name: "Paddy", icon: "🌾", category: "Field Crops", season: "Kharif", soils: "Clay, Red", npk: "80:40:40", yield: "22-28 q/ac", desc: "Staple crop. High water requirement during tillering." },
  { name: "Wheat", icon: "🌾", category: "Field Crops", season: "Rabi", soils: "Loam, Clay", npk: "120:60:40", yield: "18-22 q/ac", desc: "Sown after Kharif harvest. Needs 3-4 irrigations." },
  { name: "Arhar (Pigeon Pea)", icon: "🌱", category: "Pulses", season: "Kharif", soils: "Red, Sandy", npk: "20:50:20", yield: "6-9 q/ac", desc: "Drought tolerant. Avoid poorly drained soils." },
  { name: "Soybean", icon: "🫘", category: "Oilseeds", season: "Kharif", soils: "Red, Loam", npk: "45:55:65", yield: "10-12 q/ac", desc: "Improves soil health through nitrogen fixation." },
  { name: "Groundnut", icon: "🥜", category: "Oilseeds", season: "Kharif", soils: "Red, Sandy", npk: "20:60:40", yield: "12-15 q/ac", desc: "Needs loose soil for pod development. Avoid heavy clay." },
  { name: "Chickpea", icon: "🫘", category: "Pulses", season: "Rabi", soils: "Sandy, Red", npk: "20:40:20", yield: "10-14 q/ac", desc: "Grown on residual moisture. Low irrigation needs." },
  { name: "Mustard", icon: "🌼", category: "Oilseeds", season: "Rabi", soils: "Loam, Sandy", npk: "60:40:40", yield: "8-12 q/ac", desc: "Highly profitable winter crop. Sensitive to frost." },
  { name: "Tomato", icon: "🍅", category: "Vegetables", season: "Rabi / Zaid", soils: "Loam", npk: "100:50:50", yield: "100-150 q/ac", desc: "Requires staking and regular moisture." },
  { name: "Mango", icon: "🥭", category: "Fruits & Zaid", season: "Perennial", soils: "Laterite, Red", npk: "Varies", yield: "30-50 q/ac", desc: "Long-term investment. Needs pruning and orchard management." }
];

// Simple i18n Dictionary
const TRANSLATIONS = {
  hi: {
    brand: "कृषिमित्र", navAI: "फसल विश्लेषक", navPhoto: "खेत की फोटो", navMarket: "बाज़ार", navCalc: "कैलकुलेटर",
    navDistricts: "जिले", heroTitle: "बेहतर फसल के लिए स्मार्ट कृषि निर्णय।",
    heroText: "एक किसान-प्रथम प्लेटफ़ॉर्म जो मिट्टी, मौसम, स्थान और मौसम की जानकारी को मिलाकर उपयुक्त फसलों की सिफारिश करता है।",
    eyebrow: "झारखंड सरकार • कृषि विभाग", start: "फसल विश्लेषण शुरू करें →", voice: "आवाज़ में सुनें",
    insight: "खेत की जानकारी", top: "शीर्ष सिफारिश", yield: "संभावित उपज", profit: "अनुमानित लाभ",
    water: "पानी की आवश्यकता", medium: "मध्यम", analyzerTitle: "📊 स्मार्ट फसल विश्लेषक",
    analyzerSub: "व्यक्तिगत फसल रैंकिंग उत्पन्न करने के लिए खेत की स्थिति दर्ज करें।", district: "जिला", season: "मौसम",
    soil: "मिट्टी का प्रकार", irrigation: "सिंचाई सुविधा", nitrogen: "नाइट्रोजन (N)", phosphorus: "फास्फोरस (P)",
    potassium: "पोटेशियम (K)", soilPh: "मिट्टी का pH", moisture: "मिट्टी की नमी", landArea: "भूमि क्षेत्र (एकड़)",
    analyze: "✨ मेरे खेत का विश्लेषण करें", weatherInt: "मौसम की जानकारी", temperature: "तापमान",
    rain: "बारिश की संभावना", humidity: "नमी", wind: "हवा", output: "सिस्टम आउटपुट", photoTitle: "📷 अपनी भूमि का विश्लेषण करें",
    photoSub: "दृश्य जांच के लिए अपने खेत की एक स्पष्ट तस्वीर अपलोड करें।", marketTitle: "🏪 बाज़ार मूल्य और विकल्प",
    marketSub: "बेचने से पहले कीमतों और यात्रा लागत की तुलना करें।", calcTitle: "🧮 आय कैलकुलेटर",
    calcSub: "कुल आय और लाभ का अनुमान लगाने के लिए विवरण दर्ज करें।", calcButton: "मेरी कमाई की गणना करें",
    featureTitle: "🌾 किसान-प्रथम सुविधाएँ", featureSub: "आधुनिक कृषि के लिए एक मजबूत नींव।"
  }
};

let currentLang = 'en';

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  initDistricts();
  initCropGuide();
  
  // Set default district data
  fetchWeather("Ranchi");
  fetchMarket("Ranchi");

  // Setup Lang Toggle
  document.getElementById("lang").addEventListener("change", (e) => {
    currentLang = e.target.value;
    applyLanguage(currentLang);
  });

  // Setup Crop Guide Search & Filters
  document.getElementById("cropSearch").addEventListener("input", filterCropGuide);
  document.querySelectorAll(".guide-filter").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".guide-filter").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      filterCropGuide();
    });
  });
});

// --- UI HELPERS ---
window.showToast = function(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 3500);
};

// --- DATA FETCHERS & RENDERERS ---

async function fetchWeather(district) {
  try {
    const res = await fetch(`/api/v1/weather?district=${district}`);
    const data = await res.json();
    document.getElementById("weatherLocation").textContent = `${data.district}, Jharkhand`;
    const boxes = document.querySelectorAll(".weather-box b");
    if(boxes.length === 4) {
      boxes[0].textContent = `${data.temperature}°C`;
      boxes[1].textContent = `${data.rain_chance}%`;
      boxes[2].textContent = `${data.humidity}%`;
      boxes[3].textContent = `${data.windspeed} km/h`;
    }
  } catch (e) {
    console.error("Weather fetch failed", e);
  }
}

async function fetchMarket(district) {
  try {
    const res = await fetch(`/api/v1/market?district=${district}`);
    const best = await res.json();
    
    // Simulate a secondary alternate market for comparison
    const alt = {
      name: "Nearby Sub-Mandi",
      commodity: best.commodity,
      price: best.price - Math.floor(Math.random() * 150 + 50),
      freight: best.freight - Math.floor(Math.random() * 200 + 100),
      distance: best.distance - Math.floor(Math.random() * 10 + 2)
    };

    const container = document.getElementById("marketCards");
    container.innerHTML = `
      <div class="market-card best">
        <div class="market-top">
          <div>
            <div class="market-name">${best.name}</div>
            <div class="price">₹${best.price} <small>/ quintal</small></div>
          </div>
          <span class="best-label">Best Net Return</span>
        </div>
        <div class="market-meta">
          <div class="meta">Distance<b>${best.distance} km</b></div>
          <div class="meta">Est. Freight<b>₹${best.freight}/trip</b></div>
        </div>
      </div>
      <div class="market-card">
        <div class="market-top">
          <div>
            <div class="market-name">${alt.name}</div>
            <div class="price">₹${alt.price} <small>/ quintal</small></div>
          </div>
        </div>
        <div class="market-meta">
          <div class="meta">Distance<b>${Math.max(1, alt.distance)} km</b></div>
          <div class="meta">Est. Freight<b>₹${Math.max(100, alt.freight)}/trip</b></div>
        </div>
      </div>
    `;
  } catch (e) {
    console.error("Market fetch failed", e);
  }
}

window.selectDistrict = function(name) {
  document.getElementById("district").value = name;
  document.getElementById("districtTitle2").textContent = name;
  document.getElementById("districtAdvice").textContent = `Viewing data and optimizing recommendations for ${name} district.`;
  
  document.querySelectorAll(".district-btn").forEach(b => b.classList.remove("active"));
  const activeBtn = Array.from(document.querySelectorAll(".district-btn")).find(b => b.querySelector('strong').textContent === name);
  if (activeBtn) activeBtn.classList.add("active");

  fetchWeather(name);
  fetchMarket(name);
  window.location.hash = "#analyzer";
  showToast(`Location set to ${name}`);
};

function initDistricts() {
  const select = document.getElementById("district");
  const grid = document.getElementById("districtGrid");
  
  STATE_DISTRICTS.forEach((d, i) => {
    // Populate Select
    const opt = document.createElement("option");
    opt.value = d;
    opt.textContent = d;
    if (d === "Ranchi") opt.selected = true;
    select.appendChild(opt);

    // Populate Grid
    const btn = document.createElement("button");
    btn.className = `district-btn ${d === "Ranchi" ? "active" : ""}`;
    btn.type = "button";
    btn.innerHTML = `<strong>${d}</strong><span>Jharkhand</span>`;
    btn.onclick = () => selectDistrict(d);
    grid.appendChild(btn);
  });
}

function initCropGuide() {
  const grid = document.getElementById("cropGuideGrid");
  grid.innerHTML = "";
  CROP_GUIDE.forEach(crop => {
    const div = document.createElement("div");
    div.className = "crop-guide-card";
    div.dataset.category = crop.category;
    div.innerHTML = `
      <div class="crop-guide-top">
        <span class="crop-category">${crop.category}</span>
        <span class="crop-season">${crop.season}</span>
      </div>
      <h3>${crop.icon} ${crop.name}</h3>
      <p class="crop-districts">${crop.desc}</p>
      <div class="crop-guide-details">
        <div><small>Preferred Soil</small><b>${crop.soils}</b></div>
        <div><small>Ideal NPK Ratio</small><b>${crop.npk}</b></div>
      </div>
      <div class="crop-yield">
        <span>Average State Yield</span>
        <strong>${crop.yield}</strong>
      </div>
    `;
    grid.appendChild(div);
  });
}

function filterCropGuide() {
  const query = document.getElementById("cropSearch").value.toLowerCase();
  const activeCategory = document.querySelector(".guide-filter.active").dataset.category;
  const cards = document.querySelectorAll(".crop-guide-card");
  
  let visibleCount = 0;
  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const category = card.dataset.category;
    const matchesSearch = text.includes(query);
    const matchesCat = activeCategory === "All" || category === activeCategory;
    
    if (matchesSearch && matchesCat) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  const existingEmpty = document.querySelector(".guide-empty");
  if (existingEmpty) existingEmpty.remove();

  if (visibleCount === 0) {
    const empty = document.createElement("div");
    empty.className = "guide-empty";
    empty.style.padding = "20px";
    empty.style.textAlign = "center";
    empty.style.color = "var(--muted)";
    empty.textContent = "No crops match your search or filter.";
    document.getElementById("cropGuideGrid").appendChild(empty);
  }
}


// --- MAIN ANALYZER FUNCTIONALITY ---

window.analyze = async function() {
  const btn = document.querySelector('.analyze');
  const originalText = btn.innerHTML;
  btn.textContent = "⏳ Analyzing Farm Data...";
  btn.disabled = true;

  const data = {
    district: document.getElementById('district').value,
    season: document.getElementById('season').value,
    soil: document.getElementById('soil').value,
    irrigation: document.getElementById('water').value,
    n: parseFloat(document.getElementById('n').value) || 0,
    p: parseFloat(document.getElementById('p').value) || 0,
    k: parseFloat(document.getElementById('k').value) || 0,
    ph: parseFloat(document.getElementById('ph').value) || 6.5,
    moisture: parseFloat(document.getElementById('moist').value) || 50
  };

  const area = parseFloat(document.getElementById('area').value) || 1;

  try {
    const res = await fetch('/api/v1/predict/crop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("API Error");
    const result = await res.json();

    // 1. Update Hero Card
    document.getElementById('heroDistrict').textContent = `${data.district} • ${data.season}`;
    document.getElementById('heroTopCrop').textContent = result.top_crop;
    document.getElementById('heroConfidence').textContent = `${result.confidence}% Match`;
    
    const yieldPerAcre = result.yield_estimate;
    const totalYield = (yieldPerAcre * area).toFixed(1);
    document.getElementById('heroYield').textContent = `${totalYield} q`;
    
    // Estimate Profit for Hero based on total yield (simulated market price)
    const estMarketPrice = 2100; 
    const estCostPerAcre = 16000;
    const netProfit = (totalYield * estMarketPrice) - (estCostPerAcre * area);
    document.getElementById('heroProfit').textContent = `₹${(netProfit/1000).toFixed(1)}K`;

    // 2. Render Diagnostics
    const diagBox = document.getElementById('inputDiagnostics');
    diagBox.innerHTML = "";
    result.diagnostics.forEach(d => {
      const cssClass = d.level.includes("Critical") ? "critical" : 
                       d.level === "Low" ? "low" : 
                       d.level === "High" ? "high" : "good";
      
      diagBox.innerHTML += `
        <div class="diagnostic ${cssClass}">
          <b>${d.label}: ${d.level}</b>
          <small>${d.message}</small>
        </div>
      `;
    });

    // 3. Render Recommendations List
    const recBox = document.getElementById('recommendations');
    recBox.innerHTML = `<p style="font-size:13px; color:var(--muted); margin: 0 0 10px;">${result.reason}</p>`;
    
    // Sort and limit to top 4
    const sortedScores = Object.entries(result.all_scores).sort((a, b) => b[1].score - a[1].score).slice(0, 4);
    
    sortedScores.forEach(([cropName, details]) => {
      recBox.innerHTML += `
        <div class="recommend">
          <div class="r-top">
            <div class="crop">${cropName}</div>
            <div class="crop">${details.score}%</div>
          </div>
          <div class="bar"><div class="fill" style="width: ${details.score}%"></div></div>
          <small style="color:var(--muted)">Est. Yield: ${details.yield} q/acre</small>
        </div>
      `;
    });

    // 4. Update Profit Table
    updateProfitTable(sortedScores, area);
    showToast("Analysis Complete!");
    
    // Scroll to results if mobile
    if (window.innerWidth < 768) {
       document.querySelector(".weather").scrollIntoView({ behavior: 'smooth' });
    }

  } catch (err) {
    console.error(err);
    showToast("Error connecting to analyzer. Please try again.");
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
};

function updateProfitTable(scoredCrops, area) {
  const tbody = document.getElementById("profitRows");
  tbody.innerHTML = "";
  
  // Simulated baseline prices and costs per crop for comparison
  const economics = {
    "Maize": { price: 2100, cost: 16000 },
    "Paddy": { price: 2200, cost: 18000 },
    "Wheat": { price: 2300, cost: 15000 },
    "Mustard": { price: 5400, cost: 12000 },
    "Chickpea": { price: 5300, cost: 11000 },
    "Groundnut": { price: 6200, cost: 19000 },
    "Soybean": { price: 4600, cost: 14000 },
    "Arhar": { price: 7000, cost: 13000 }
  };

  scoredCrops.forEach(([cropName, details]) => {
    const eco = economics[cropName] || { price: 2000, cost: 15000 };
    const totalYield = details.yield * area;
    const revenue = totalYield * eco.price;
    const totalCost = eco.cost * area;
    const profit = revenue - totalCost;
    
    tbody.innerHTML += `
      <tr>
        <td><strong>${cropName}</strong></td>
        <td>
          <div class="bar" style="width: 80px; margin:0"><div class="fill" style="width: ${details.score}%"></div></div>
        </td>
        <td>${totalYield.toFixed(1)} q</td>
        <td>₹${totalCost.toLocaleString('en-IN')}</td>
        <td>₹${revenue.toLocaleString('en-IN')}</td>
        <td style="color: ${profit > 0 ? 'var(--g)' : 'var(--red)'}; font-weight: 800;">
          ₹${profit.toLocaleString('en-IN')}
        </td>
      </tr>
    `;
  });
}


// --- PHOTO ANALYSIS ---

window.previewLand = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const img = document.getElementById('photoImg');
  img.src = URL.createObjectURL(file);
  img.classList.remove('image-updated');
  
  document.getElementById('preview').style.display = 'block';
  document.getElementById('photoResult').style.display = 'none';
  document.getElementById('analyzeCamera').textContent = "Analyse Camera / Photo";
};

window.photoAnalyze = async function() {
  const fileInput = document.getElementById('landPhoto');
  if (!fileInput.files.length) return showToast("Please select an image first.");

  const btn = document.getElementById('analyzeCamera');
  btn.textContent = "⏳ Processing Image using AI...";
  btn.disabled = true;

  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  try {
    const res = await fetch('/api/v1/analyze/soil-image', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) throw new Error("Image analysis failed");
    const data = await res.json();

    document.getElementById('photoResult').style.display = 'block';
    const checks = document.querySelectorAll('.check span');
    
    // Update checklist based on JSON output
    checks[0].textContent = data.land_condition || "Assessed";
    checks[1].textContent = data.soil_color ? `${data.soil_color} (${data.soil_type})` : "Indeterminate";
    checks[2].textContent = "Requires physical sensor"; // Aligning with the backend limitation logic
    checks[3].textContent = `Confidence: ${data.confidence}%`;

    const limitsBox = document.getElementById('photoLimitations');
    limitsBox.innerHTML = `<strong>Observations:</strong> ${data.observations.join(' ')}<br><br><strong>Limitations:</strong> ${data.limitations.join(' ')}`;

    document.getElementById('photoImg').classList.add('image-updated');
    showToast("Visual pre-check complete!");

    // If the image AI detected actual values (e.g., from a soil report photo), auto-fill them.
    if (data.ph !== null) document.getElementById('ph').value = data.ph;
    if (data.nitrogen !== null) document.getElementById('n').value = data.nitrogen;
    if (data.phosphorus !== null) document.getElementById('p').value = data.phosphorus;
    if (data.potassium !== null) document.getElementById('k').value = data.potassium;

  } catch (err) {
    console.error(err);
    showToast("Analysis failed. Please try a clearer photo.");
  } finally {
    btn.textContent = "Re-Analyse Photo";
    btn.disabled = false;
  }
};


// --- EARNINGS CALCULATOR ---

window.calculateEarnings = function() {
  const qty = parseFloat(document.getElementById("calcQty").value) || 0;
  const price = parseFloat(document.getElementById("calcPrice").value) || 0;
  const cost = parseFloat(document.getElementById("calcCost").value) || 0;
  const transport = parseFloat(document.getElementById("calcTransport").value) || 0;

  const revenue = qty * price;
  const totalCost = cost + transport;
  const net = revenue - totalCost;
  const margin = revenue > 0 ? (net / revenue) * 100 : 0;

  document.getElementById("calcRevenue").textContent = `₹${revenue.toLocaleString('en-IN')}`;
  document.getElementById("calcTotalCost").textContent = `₹${totalCost.toLocaleString('en-IN')}`;
  document.getElementById("calcNet").textContent = `₹${net.toLocaleString('en-IN')}`;
  
  const netEl = document.getElementById("calcNet").parentElement;
  if (net < 0) {
    document.getElementById("calcNet").style.color = "var(--red)";
    netEl.style.backgroundColor = "#fff1ee";
    netEl.style.borderColor = "#ffd0c7";
  } else {
    document.getElementById("calcNet").style.color = "inherit";
    netEl.style.backgroundColor = "#eaf8ed";
    netEl.style.borderColor = "#b9dfc1";
  }

  document.getElementById("calcMargin").textContent = `${margin.toFixed(1)}%`;
  showToast("Earnings updated!");
};


// --- CHATBOT ---

window.toggleChat = function() {
  const box = document.getElementById('chatbox');
  box.classList.toggle('open');
  if (box.classList.contains('open')) {
    document.getElementById('chatInput').focus();
  }
};

window.sendChatMessage = async function() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  const msgContainer = document.getElementById('chatMessages');
  
  // User Message
  msgContainer.innerHTML += `<div class="chat-message user">${escapeHTML(text)}</div>`;
  input.value = '';
  msgContainer.scrollTop = msgContainer.scrollHeight;

  // Bot loading state
  const loadingId = 'loading-' + Date.now();
  msgContainer.innerHTML += `<div id="${loadingId}" class="chat-message bot">...</div>`;
  msgContainer.scrollTop = msgContainer.scrollHeight;

  try {
    const res = await fetch('/api/v1/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: text })
    });
    const data = await res.json();
    
    document.getElementById(loadingId).remove();
    msgContainer.innerHTML += `<div class="chat-message bot">${escapeHTML(data.answer)}</div>`;
  } catch (err) {
    document.getElementById(loadingId).remove();
    msgContainer.innerHTML += `<div class="chat-message bot" style="color:var(--red)">Connection error. Try again.</div>`;
  }
  msgContainer.scrollTop = msgContainer.scrollHeight;
};

// Handle Enter key in chat
document.getElementById("chatInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendChatMessage();
  }
});

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}


// --- ACCESSIBILITY / VOICE ---

window.voiceDemo = function() {
  if (!('speechSynthesis' in window)) {
    return showToast("Voice readout is not supported in your browser.");
  }
  
  const crop = document.getElementById('heroTopCrop').textContent;
  const yieldEst = document.getElementById('heroYield').textContent;
  const dist = document.getElementById('heroDistrict').textContent;
  
  const text = `Based on current inputs for ${dist}, the top recommended crop is ${crop}, with an expected yield of ${yieldEst}.`;
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = currentLang === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
  showToast("Playing voice readout...");
};


// --- i18n TRANSLATION ENGINE ---

function applyLanguage(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  const placeholders = document.querySelectorAll("[data-i18n-placeholder]");
  
  const dict = TRANSLATIONS[lang];
  
  if (dict) {
    elements.forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });
    
    placeholders.forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key]) el.setAttribute("placeholder", dict[key]);
    });
  } else {
    // If dictionary missing (e.g. falling back to English default HTML state)
    // A robust app would reload from a base English dictionary. For this implementation, 
    // we assume the HTML contains the base English strings.
    window.location.reload(); 
  }
}

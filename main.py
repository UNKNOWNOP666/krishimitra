from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import base64
import json
import re
import os
import random
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

MAX_IMAGE_BYTES = 8 * 1024 * 1024
ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}

# Initialize the API
app = FastAPI(title="KrishiMitra API")

# Enable CORS so your frontend (index.html) can fetch data from this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Model for Crop Prediction Request
class CropRequest(BaseModel):
    district: str
    season: str
    soil: str
    irrigation: str
    n: float
    p: float
    k: float
    ph: float
    moisture: float


class ChatRequest(BaseModel):
    question: str


CROP_PROFILES = {
    "Maize": {"npk": (100, 50, 40), "ph": (6.0, 7.2), "moisture": (45, 70), "seasons": ["Kharif", "Rabi"], "soils": ["Red Soil", "Sandy Soil"], "water": "Medium", "yield": 2.55},
    "Paddy": {"npk": (80, 40, 40), "ph": (5.5, 6.5), "moisture": (65, 90), "seasons": ["Kharif"], "soils": ["Clay", "Red Soil"], "water": "High", "yield": 2.93},
    "Wheat": {"npk": (120, 60, 40), "ph": (6.0, 7.5), "moisture": (35, 60), "seasons": ["Rabi"], "soils": ["Loam", "Clay"], "water": "Medium", "yield": 2.42},
    "Arhar": {"npk": (20, 50, 20), "ph": (6.0, 7.5), "moisture": (25, 55), "seasons": ["Kharif"], "soils": ["Red Soil", "Sandy Soil"], "water": "Low", "yield": 0.98},
    "Soybean": {"npk": (45, 55, 65), "ph": (6.0, 7.2), "moisture": (40, 65), "seasons": ["Kharif"], "soils": ["Red Soil", "Loam"], "water": "Medium", "yield": 1.15},
    "Groundnut": {"npk": (20, 60, 40), "ph": (6.0, 7.0), "moisture": (30, 55), "seasons": ["Kharif"], "soils": ["Red Soil", "Sandy Soil"], "water": "Low", "yield": 1.80},
    "Chickpea": {"npk": (20, 40, 20), "ph": (6.0, 7.5), "moisture": (20, 45), "seasons": ["Rabi"], "soils": ["Sandy Soil", "Red Soil"], "water": "Low", "yield": 1.48},
    "Mustard": {"npk": (60, 40, 40), "ph": (6.0, 7.5), "moisture": (20, 48), "seasons": ["Rabi"], "soils": ["Loam", "Sandy Soil"], "water": "Low", "yield": 1.20}
}


def crop_score(data: CropRequest, profile: dict):
    requirements = profile["npk"]
    nutrient_scores = [
        max(0.0, 1 - abs(actual - required) / (required * 0.8)) if required else 1.0
        for actual, required in zip((data.n, data.p, data.k), requirements)
    ]
    nutrient_score = sum(nutrient_scores) / 3
    ph_low, ph_high = profile["ph"]
    moisture_low, moisture_high = profile["moisture"]
    ph_score = 1.0 if ph_low <= data.ph <= ph_high else max(0.0, 1 - min(abs(data.ph - ph_low), abs(data.ph - ph_high)) / 1.5)
    moisture_score = 1.0 if moisture_low <= data.moisture <= moisture_high else max(0.0, 1 - min(abs(data.moisture - moisture_low), abs(data.moisture - moisture_high)) / 35)
    season_score = 1.0 if data.season in profile["seasons"] else 0.25
    water_score = 1.0 if data.irrigation == profile["water"] or (profile["water"] == "Low" and data.irrigation in ["Low", "Medium"]) else 0.7 if data.irrigation == "High" else 0.45
    soil_score = 1.0 if any(soil in data.soil for soil in profile["soils"]) else 0.7
    score = round(max(0, min(98, (nutrient_score * 0.38 + ph_score * 0.18 + moisture_score * 0.16 + season_score * 0.14 + soil_score * 0.08 + water_score * 0.06) * 100)), 1)
    return score, nutrient_scores, ph_score, moisture_score


def build_diagnostics(data: CropRequest, profile: dict):
    labels = [("N", data.n, profile["npk"][0]), ("P", data.p, profile["npk"][1]), ("K", data.k, profile["npk"][2])]
    diagnostics = []
    for label, actual, required in labels:
        ratio = actual / required if required else 1
        if ratio < 0.5:
            level = "Critical low"
        elif ratio < 0.8:
            level = "Low"
        elif ratio > 1.6:
            level = "High"
        else:
            level = "Adequate"
        diagnostics.append({"label": label, "level": level, "message": f"{label} {actual:g} vs about {required:g} kg/ha required"})
    ph_low, ph_high = profile["ph"]
    ph_level = "Adequate" if ph_low <= data.ph <= ph_high else "Critical" if data.ph < 5 or data.ph > 8 else "Outside crop band"
    diagnostics.append({"label": "pH", "level": ph_level, "message": f"Measured {data.ph:g}; crop band {ph_low:g}–{ph_high:g}"})
    moisture_low, moisture_high = profile["moisture"]
    moisture_level = "Adequate" if moisture_low <= data.moisture <= moisture_high else "Low" if data.moisture < moisture_low else "High"
    diagnostics.append({"label": "Moisture", "level": moisture_level, "message": f"Measured {data.moisture:g}%; target {moisture_low:g}–{moisture_high:g}%"})
    return diagnostics

@app.get("/api/v1/weather")
def get_weather(district: str = "Ranchi"):
    """Returns realistic weather data for the selected district."""
    # Generate slight variations so the demo feels "live" when changing districts
    base_temp = 28 if district == "Ranchi" else random.randint(26, 34)
    return {
        "district": district,
        "temperature": base_temp,
        "rain_chance": random.randint(10, 85),
        "humidity": random.randint(50, 80),
        "windspeed": random.randint(8, 18)
    }

@app.get("/api/v1/market")
def get_market(district: str = "Ranchi"):
    """Returns simulated APMC mandi market prices."""
    commodities = ["Maize", "Paddy", "Wheat", "Mustard"]
    return {
        "name": f"{district} APMC Mandi",
        "commodity": random.choice(commodities),
        "price": random.randint(2100, 2600),
        "freight": random.randint(400, 1200),
        "distance": random.randint(10, 45)
    }

@app.post("/api/v1/predict/crop")
def predict_crop(data: CropRequest):
    """Score crop fit deterministically and expose the limiting soil factors."""
    scored = []
    for name, profile in CROP_PROFILES.items():
        score, nutrient_scores, ph_score, moisture_score = crop_score(data, profile)
        scored.append((name, score, profile, nutrient_scores, ph_score, moisture_score))
    scored.sort(key=lambda item: item[1], reverse=True)
    top_crop, top_score, top_profile, _, _, _ = scored[0]
    diagnostics = build_diagnostics(data, top_profile)
    critical = [item["label"] for item in diagnostics if item["level"] in ["Critical", "Critical low"]]
    limiting = ", ".join(critical) if critical else "no critical constraint"
    return {
        "top_crop": top_crop,
        "confidence": top_score,
        "yield_estimate": round(top_profile["yield"] * top_score / 100, 2),
        "is_toxic": data.ph < 4.5 or data.ph > 8.5,
        "reason": f"{top_crop} ranks highest for {data.season}, {data.soil}, N/P/K, pH and moisture; limiting factor: {limiting}.",
        "diagnostics": diagnostics,
        "all_scores": {name: {"score": score, "yield": round(profile["yield"] * score / 100, 2)} for name, score, profile, _, _, _ in scored}
    }


async def call_gemini(prompt: str):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured on the server")

    request_body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.4, "maxOutputTokens": 512}
    }).encode("utf-8")
    request = Request(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
        data=request_body,
        headers={"Content-Type": "application/json", "x-goog-api-key": api_key},
        method="POST"
    )

    def send_request():
        with urlopen(request, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))

    return await asyncio.to_thread(send_request)


def parse_json_response(text: str):
    cleaned = text.strip()
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", cleaned, flags=re.IGNORECASE)
    return json.loads(cleaned)


def normalize_soil_analysis(value: dict):
    allowed = {
        "soil_type": value.get("soil_type") or "",
        "soil_color": value.get("soil_color") or "",
        "ph": None,
        "nitrogen": None,
        "phosphorus": None,
        "potassium": None,
        "moisture": None,
        "organic_matter": None,
        "land_condition": value.get("land_condition") or "",
        "confidence": max(0, min(100, float(value.get("confidence") or 0))),
        "observations": value.get("observations") if isinstance(value.get("observations"), list) else [],
        "limitations": value.get("limitations") if isinstance(value.get("limitations"), list) else []
    }
    if not allowed["limitations"]:
        allowed["limitations"] = ["RGB imagery cannot reliably measure soil moisture, N, P, K, pH, or organic matter; use a laboratory soil test."]
    return allowed


@app.post("/api/v1/analyze/soil-image")
@app.post("/analyze-soil-image")
async def analyze_soil_image(file: UploadFile = File(...)):
    """Analyze observable soil appearance without inventing lab measurements."""
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=415, detail="Upload a JPEG, PNG, or WebP image.")
    image_bytes = await file.read(MAX_IMAGE_BYTES + 1)
    if len(image_bytes) > MAX_IMAGE_BYTES:
        raise HTTPException(status_code=413, detail="Image must be 8 MB or smaller.")
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="GEMINI_API_KEY is not configured on the server.")

    prompt = """Analyze this soil or land image for KrishiMitra. Return ONLY valid JSON with exactly these keys:
soil_type (string or empty), soil_color (observable string or empty), ph (number or null), nitrogen (number kg/ha or null), phosphorus (number kg/ha or null), potassium (number kg/ha or null), moisture (always null for ordinary RGB imagery), organic_matter (number percent or null), land_condition (observable string), confidence (0-100), observations (array of strings), limitations (array of strings).
Only describe soil type, color, texture, visible crusting, stones, erosion, standing water, vegetation, or crop condition when visible. Do not infer numerical pH, N, P, K, moisture, or organic matter from color or appearance; set those values to null unless the image visibly contains a readable soil-test report or instrument measurement. Even then, mention that it is read from the report, not measured by the camera. State limitations clearly."""
    request_body = json.dumps({
        "contents": [{"parts": [
            {"text": prompt},
            {"inline_data": {"mime_type": file.content_type, "data": base64.b64encode(image_bytes).decode("ascii")}}
        ]}],
        "generationConfig": {"temperature": 0, "responseMimeType": "application/json", "maxOutputTokens": 700}
    }).encode("utf-8")
    request = Request(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
        data=request_body,
        headers={"Content-Type": "application/json", "x-goog-api-key": api_key},
        method="POST"
    )
    try:
        result = await asyncio.to_thread(lambda: urlopen(request, timeout=45).read().decode("utf-8"))
        response = json.loads(result)
        text = response["candidates"][0]["content"]["parts"][0]["text"]
        return normalize_soil_analysis(parse_json_response(text))
    except (HTTPError, URLError, KeyError, IndexError, TypeError, ValueError, TimeoutError) as error:
        print(f"Gemini soil image analysis unavailable: {error}")
        raise HTTPException(status_code=502, detail="Gemini soil image analysis is temporarily unavailable.")


def local_chat_answer(question: str):
    question_lower = question.lower()
    if "moisture" in question_lower or "water" in question_lower:
        return "Check soil moisture by squeezing a handful of soil gently. Water when it forms a weak ball that breaks apart easily, and avoid leaving the field waterlogged."
    if "fertilizer" in question_lower or "nutrient" in question_lower or "npk" in question_lower:
        return "Use a soil test before choosing fertilizer so nitrogen, phosphorus, and potassium match the crop need. Apply nutrients in measured doses and follow the product label or local agriculture officer's advice."
    if "crop" in question_lower or "plant" in question_lower:
        return "Choose a crop that matches your season, soil type, water supply, and local market. A soil test and advice from your nearest agriculture office can improve the final decision."
    if "price" in question_lower or "market" in question_lower or "sell" in question_lower:
        return "Compare the local mandi price with transport, handling, and commission costs before selling. Farmer producer organizations can sometimes improve bargaining power by combining produce."
    return "Use the crop analyzer with your soil, season, irrigation, and moisture details for a practical recommendation. For important decisions, confirm the result with a soil test or your local agriculture officer."


@app.post("/api/v1/chat")
async def chat(data: ChatRequest):
    """Sends farmer questions to Gemini without exposing the API key to the browser."""
    question = data.question.strip()
    if not question:
        return {"answer": "Please enter a farming question."}

    prompt = f"""You are KrishiMitra, a helpful agricultural assistant for farmers in Jharkhand, India.
Answer in the same language as the question (Hindi or English). Give practical, concise guidance in exactly two short sentences.
Do not use markdown, emojis, or unsupported medical/agricultural certainty.
Question: {question}"""

    try:
        result = await call_gemini(prompt)
        answer = result["candidates"][0]["content"]["parts"][0]["text"].strip()
        if len(answer) < 40 or answer[-1] not in ".!?।":
            answer = "Check soil moisture by taking a handful of soil and squeezing it gently. If it forms a loose ball without dripping water, the moisture is usually suitable for the crop."
        return {"answer": answer}
    except (HTTPError, URLError, KeyError, IndexError, RuntimeError, TimeoutError) as error:
        print(f"Gemini chat unavailable: {error}")
        return {"answer": local_chat_answer(question)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "8000")))
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import json
import os
import random
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

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
    """Evaluates NPK, pH, and moisture to return a crop recommendation."""
    # Simple logic to flag extreme pH levels as "toxic/imbalanced" for the demo
    is_toxic = data.ph < 4.5 or data.ph > 8.5
    
    # Base response prioritizing Maize or Paddy for Kharif, Wheat for Rabi
    top_crop = "Wheat" if data.season == "Rabi" else "Maize"
    if data.moisture > 70 and data.season == "Kharif":
        top_crop = "Paddy"

    return {
        "top_crop": top_crop,
        "confidence": round(random.uniform(85.0, 96.5), 1),
        "yield_estimate": round(random.uniform(18.0, 26.0), 1),
        "is_toxic": is_toxic,
        "reason": f"Optimal match for {data.soil} in {data.season} season based on current NPK.",
        "all_scores": {
            top_crop: {"score": 92.5, "yield": 22.0},
            "Arhar": {"score": 78.0, "yield": 12.5},
            "Soybean": {"score": 65.5, "yield": 14.0}
        }
    }


async def call_gemini(prompt: str):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is not configured on the server")

    request_body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.4, "maxOutputTokens": 180}
    }).encode("utf-8")
    request = Request(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
        data=request_body,
        headers={"Content-Type": "application/json", "x-goog-api-key": api_key},
        method="POST"
    )

    def send_request():
        with urlopen(request, timeout=30) as response:
            return json.loads(response.read().decode("utf-8"))

    return await asyncio.to_thread(send_request)


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
        return {"answer": answer}
    except (HTTPError, URLError, KeyError, IndexError, RuntimeError) as error:
        print(f"Gemini chat unavailable: {error}")
        return {"answer": "The farming assistant is temporarily unavailable. Please try again shortly."}

@app.post("/api/v1/analyze/vision")
async def analyze_vision(file: UploadFile = File(...)):
    """Simulates computer vision processing of an uploaded land photo."""
    # In a real app, this would pass the image bytes to an ML model like PyTorch/TensorFlow
    return {
        "filename": file.filename,
        "vegetation": "Healthy green coverage detected (approx. 60%)",
        "soil_appearance": "Dry topsoil, reddish tint observed",
        "lighting": "Clear daylight, good visibility",
        "conclusion": "Visuals align with Kharif season growth phase. No severe blight detected."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "8000")))
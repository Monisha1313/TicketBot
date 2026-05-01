import json
import os
from groq import Groq
from config import Config

client = Groq(api_key=Config.GROQ_API_KEY)

def load_exhibits():
    path = os.path.join(os.path.dirname(__file__), "../data/exhibits.json")
    with open(path) as f:
        return json.load(f)

def generate_itinerary(interests: list, duration_hours: float = 3.0, group_type: str = "individual") -> list:
    exhibits = load_exhibits()
    exhibits_summary = json.dumps([
        {
            "id": e["id"],
            "name": e["name"],
            "tags": e["tags"],
            "duration_minutes": e["duration_minutes"],
            "location": e["location"],
            "description": e["description"]
        }
        for e in exhibits
    ], indent=2)

    prompt = f"""You are a museum itinerary planner.

Visitor interests: {interests}
Available time: {duration_hours} hours
Group type: {group_type}

Available exhibits:
{exhibits_summary}

Select the most relevant exhibits based on interests.
Fit them within the available time (include a 10-minute buffer between each).
Order them logically by floor/location to minimise walking.

Respond ONLY with a raw JSON array — no markdown, no explanation:
[
  {{
    "order": 1,
    "exhibit_id": "E001",
    "exhibit_name": "Ancient Civilizations",
    "location": "Hall A, Ground Floor",
    "recommended_duration_minutes": 40,
    "why_recommended": "Matches your interest in history",
    "tip": "Don't miss the Indus Valley seal collection near the exit"
  }}
]"""

    response = client.chat.completions.create(
        model=Config.GROQ_MODEL,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=1024,
        temperature=0.3
    )

    raw = response.choices[0].message.content.strip()
    if raw.startswith("```"):
        parts = raw.split("```")
        raw = parts[1]
        if raw.startswith("json"):
            raw = raw[4:]

    return json.loads(raw.strip())
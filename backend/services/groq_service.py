from groq import Groq
from config import Config
import json

client = Groq(api_key=Config.GROQ_API_KEY)

SYSTEM_PROMPT = """You are MuseBot, a friendly AI assistant for the National Museum ticketing system.

Your capabilities:
1. Help visitors book tickets — individual OR group/school bookings
2. Ask about their interests and generate a personalized exhibit itinerary
3. Answer questions about exhibits, timings, pricing, and accessibility

Museum Info:
- Opening hours: 10 AM – 6 PM, Tuesday to Sunday (closed Mondays)
- Ticket prices: Adults ₹150 | Children (under 12) ₹50 | Students ₹80 | Groups (20+) get 20% discount
- Available time slots: 10:00 AM, 11:30 AM, 1:00 PM, 2:30 PM, 4:00 PM
- Address: Museum Road, Bengaluru – 560001

Individual Booking Flow:
1. Ask for: full name, email, visit date, preferred slot, number of tickets
2. Ask about interests: history, science, art, nature, technology, kids
3. Confirm all details

Group/School Booking Flow:
1. Ask for: coordinator name, coordinator email, school/org name, visit date, preferred slot
2. Ask for number of students and number of adults separately
3. Ask about the group's primary interests
4. Confirm all details

When you have collected ALL required info, output a JSON block inside <BOOKING_DATA> tags:
<BOOKING_DATA>
{"action":"create_booking","visitor_name":"...","visitor_email":"...","booking_type":"individual","num_tickets":2,"visit_date":"2025-08-15","visit_slot":"10:00 AM","interests":["history","science"],"group_name":null,"group_contact":null}
</BOOKING_DATA>

Always be warm, concise, and helpful. You may respond in Hindi or Kannada if the user writes in those languages."""


def chat(messages: list) -> dict:
    formatted = [{"role": "system", "content": SYSTEM_PROMPT}]
    for m in messages:
        formatted.append({
            "role": "user" if m["role"] == "user" else "assistant",
            "content": m["content"]
        })

    response = client.chat.completions.create(
        model=Config.GROQ_MODEL,
        messages=formatted,
        max_tokens=1024,
        temperature=0.7
    )

    reply_text = response.choices[0].message.content
    action = None
    data = None

    if "<BOOKING_DATA>" in reply_text:
        try:
            start = reply_text.index("<BOOKING_DATA>") + len("<BOOKING_DATA>")
            end   = reply_text.index("</BOOKING_DATA>")
            data  = json.loads(reply_text[start:end].strip())
            action = "create_booking"
            reply_text = reply_text[:reply_text.index("<BOOKING_DATA>")].strip()
        except Exception as e:
            print(f"Booking parse error: {e}")

    return {"reply": reply_text, "action": action, "data": data}
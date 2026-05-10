import random
import string
import json
import qrcode
import os
from models import db
from models.booking import Booking
from services.itinerary_service import generate_itinerary

def generate_ref():
    return "MUS-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=8))

def calculate_amount(booking_type: str, num_tickets: int) -> float:
    base = 150  # adult price ₹150
    if booking_type == "group":
        return round(num_tickets * base * 0.8, 2)  # 20% group discount
    return float(num_tickets * base)

def generate_qr(booking_ref: str) -> str:
    qr = qrcode.make(booking_ref)
    os.makedirs("static/qr", exist_ok=True)
    path = f"static/qr/{booking_ref}.png"
    qr.save(path)
    return path

from routes.bookings import get_slot_availability

def create_booking(data: dict) -> dict:
    # Check slot capacity before creating
    visit_date = data["visit_date"]
    visit_slot = data["visit_slot"]
    num_tickets = int(data.get("num_tickets", 1))

    avail = get_slot_availability(visit_date)
    slot_info = avail.get(visit_slot, {})
    if not slot_info.get("available") or slot_info.get("remaining", 0) < num_tickets:
        raise ValueError(
            f"Sorry, the {visit_slot} slot on {visit_date} only has "
            f"{slot_info.get('remaining', 0)} spots left. Please choose another slot."
        )

    # ... rest of the function stays exactly the same

    ref         = generate_ref()
    booking_type = data.get("booking_type", "individual")
    num_tickets = int(data.get("num_tickets", 1))
    amount      = calculate_amount(booking_type, num_tickets)
    interests   = data.get("interests", [])

    # Generate personalised itinerary
    itinerary = []
    if interests:
        try:
            itinerary = generate_itinerary(
                interests=interests,
                duration_hours=3.0,
                group_type=booking_type
            )
        except Exception as e:
            print(f"Itinerary error: {e}")

    qr_path = generate_qr(ref)

    booking = Booking(
        booking_ref   = ref,
        visitor_name  = data["visitor_name"],
        visitor_email = data["visitor_email"],
        visitor_phone = data.get("visitor_phone", ""),
        booking_type  = booking_type,
        num_tickets   = num_tickets,
        visit_date    = data["visit_date"],
        visit_slot    = data["visit_slot"],
        interests     = json.dumps(interests),
        itinerary     = json.dumps(itinerary),
        payment_status = "confirmed",
        total_amount  = amount,
        qr_code_path  = qr_path,
        group_name    = data.get("group_name"),
        group_contact = data.get("group_contact"),
    )
    db.session.add(booking)
    db.session.commit()

    return {"booking": booking.to_dict(), "itinerary": itinerary, "amount": amount}
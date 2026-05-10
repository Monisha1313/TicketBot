from flask import Blueprint, jsonify
from models.booking import Booking
from models import db

bookings_bp = Blueprint("bookings", __name__)

SLOT_CAPACITY = 100  # max visitors per slot per date

def get_slot_availability(visit_date: str) -> dict:
    """Returns booked count per slot for a given date."""
    slots = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"]
    availability = {}
    for slot in slots:
        booked = db.session.query(
            db.func.sum(Booking.num_tickets)
        ).filter_by(visit_date=visit_date, visit_slot=slot).scalar() or 0
        availability[slot] = {
            "booked":    int(booked),
            "capacity":  SLOT_CAPACITY,
            "available": int(booked) < SLOT_CAPACITY,
            "remaining": max(0, SLOT_CAPACITY - int(booked)),
        }
    return availability

@bookings_bp.route("/", methods=["GET"])
def list_bookings():
    bookings = Booking.query.order_by(Booking.created_at.desc()).limit(50).all()
    return jsonify([b.to_dict() for b in bookings])

@bookings_bp.route("/<ref>", methods=["GET"])
def get_booking(ref):
    booking = Booking.query.filter_by(booking_ref=ref).first()
    if not booking:
        return jsonify({"error": "Not found"}), 404
    return jsonify(booking.to_dict())

@bookings_bp.route("/availability/<date>", methods=["GET"])
def availability(date):
    return jsonify(get_slot_availability(date))

@bookings_bp.route("/my/<email>", methods=["GET"])
def my_bookings(email):
    bookings = (
        Booking.query
        .filter_by(visitor_email=email)
        .order_by(Booking.created_at.desc())
        .all()
    )
    return jsonify([b.to_dict() for b in bookings])

@bookings_bp.route("/<ref>/cancel", methods=["PATCH"])
def cancel_booking(ref):
    booking = Booking.query.filter_by(booking_ref=ref).first()
    if not booking:
        return jsonify({"error": "Not found"}), 404
    if booking.payment_status == "cancelled":
        return jsonify({"error": "Already cancelled"}), 400
    booking.payment_status = "cancelled"
    db.session.commit()
    return jsonify({"success": True, "booking": booking.to_dict()})


@bookings_bp.route("/clear", methods=["DELETE"])
def clear_all():
    Booking.query.delete()
    db.session.commit()
    return jsonify({"success": True, "message": "All bookings cleared"})
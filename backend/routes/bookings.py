from flask import Blueprint, jsonify
from models.booking import Booking

bookings_bp = Blueprint("bookings", __name__)

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
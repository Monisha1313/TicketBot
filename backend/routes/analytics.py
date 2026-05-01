from flask import Blueprint, jsonify
from models.booking import Booking
from models import db
from sqlalchemy import func

analytics_bp = Blueprint("analytics", __name__)

@analytics_bp.route("/summary", methods=["GET"])
def summary():
    total   = Booking.query.count()
    revenue = db.session.query(func.sum(Booking.total_amount)).scalar() or 0
    groups  = Booking.query.filter_by(booking_type="group").count()

    date_counts = (
        db.session.query(Booking.visit_date, func.count(Booking.id))
        .group_by(Booking.visit_date)
        .order_by(func.count(Booking.id).desc())
        .limit(5)
        .all()
    )

    return jsonify({
        "total_bookings": total,
        "total_revenue":  float(revenue),
        "group_bookings": groups,
        "top_dates": [{"date": d, "count": c} for d, c in date_counts],
    })
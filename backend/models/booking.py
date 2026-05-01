from models import db
from datetime import datetime
import json

class Booking(db.Model):
    __tablename__ = "bookings"

    id            = db.Column(db.Integer, primary_key=True)
    booking_ref   = db.Column(db.String(20), unique=True, nullable=False)
    visitor_name  = db.Column(db.String(100), nullable=False)
    visitor_email = db.Column(db.String(120), nullable=False)
    visitor_phone = db.Column(db.String(20))
    booking_type  = db.Column(db.String(20), default="individual")  # individual | group
    num_tickets   = db.Column(db.Integer, default=1)
    visit_date    = db.Column(db.String(20), nullable=False)
    visit_slot    = db.Column(db.String(20), nullable=False)
    interests     = db.Column(db.Text)   # JSON list
    itinerary     = db.Column(db.Text)   # JSON list
    payment_status = db.Column(db.String(20), default="confirmed")  # always confirmed (mock)
    total_amount  = db.Column(db.Float, default=0.0)
    qr_code_path  = db.Column(db.String(200))
    group_name    = db.Column(db.String(100))
    group_contact = db.Column(db.String(100))
    created_at    = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id":             self.id,
            "booking_ref":    self.booking_ref,
            "visitor_name":   self.visitor_name,
            "visitor_email":  self.visitor_email,
            "booking_type":   self.booking_type,
            "num_tickets":    self.num_tickets,
            "visit_date":     self.visit_date,
            "visit_slot":     self.visit_slot,
            "interests":      json.loads(self.interests)  if self.interests  else [],
            "itinerary":      json.loads(self.itinerary)  if self.itinerary  else [],
            "payment_status": self.payment_status,
            "total_amount":   self.total_amount,
            "group_name":     self.group_name,
            "created_at":     self.created_at.isoformat(),
        }
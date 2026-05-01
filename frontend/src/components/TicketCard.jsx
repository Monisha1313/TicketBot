import { CheckCircle } from "lucide-react";

export default function TicketCard({ booking }) {
  if (!booking) return null;

  return (
    <div
      style={{
        background:   "#1a1a22",
        border:       "1px solid #22c55e44",
        borderRadius: 14,
        padding:      24,
        marginTop:    16,
        textAlign:    "center",
      }}
    >
      <CheckCircle size={40} color="#22c55e" style={{ marginBottom: 12 }} />
      <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>
        Booking Confirmed! 🎉
      </h3>
      <p style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>
        Reference:{" "}
        <span style={{ color: "#a78bfa", fontWeight: 600 }}>
          {booking.booking_ref}
        </span>
      </p>

      <div
        style={{
          textAlign:  "left",
          fontSize:   13,
          lineHeight: 2.2,
          background: "#13131a",
          borderRadius: 10,
          padding:    "12px 16px",
        }}
      >
        <p>👤 <b>{booking.visitor_name}</b></p>
        <p>📧 {booking.visitor_email}</p>
        <p>📅 {booking.visit_date} at {booking.visit_slot}</p>
        <p>🎟️ {booking.num_tickets} ticket{booking.num_tickets > 1 ? "s" : ""}</p>
        {booking.group_name && <p>🏫 {booking.group_name}</p>}
        <p>💰 ₹{booking.total_amount}</p>
        <p>
          ✅ Status:{" "}
          <span style={{ color: "#22c55e", fontWeight: 600 }}>
            {booking.payment_status}
          </span>
        </p>
      </div>

      <p style={{ marginTop: 14, fontSize: 12, color: "#555" }}>
        Show this reference at the museum entrance
      </p>
    </div>
  );
}
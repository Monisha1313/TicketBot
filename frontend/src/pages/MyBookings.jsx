import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyBookings } from "../utils/api";
import ItineraryCard from "../components/ItineraryCard";
import { CalendarDays, Clock, Ticket, ChevronDown, ChevronUp } from "lucide-react";

export default function MyBookings() {
  const { user }                      = useAuth();
  const [bookings, setBookings]       = useState([]);
  const [loading, setLoading]         = useState(true);
  const [expanded, setExpanded]       = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    getMyBookings(user.email)
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return (
    <div style={{ padding: "120px 0", textAlign: "center", color: "#555" }}>
      Loading your bookings…
    </div>
  );

  return (
    <div style={{ paddingTop: 80, maxWidth: 700, margin: "0 auto", padding: "80px 20px 40px" }}>
      <p style={{ color: "#6c63ff", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 6 }}>
        YOUR VISITS
      </p>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32 }}>My Bookings</h1>

      {bookings.length === 0 ? (
        <div style={{
          background: "#13131a", border: "1px solid #1e1e28",
          borderRadius: 16, padding: "48px 24px", textAlign: "center",
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎟️</div>
          <p style={{ color: "#888", fontSize: 15 }}>No bookings yet.</p>
          <p style={{ color: "#555", fontSize: 13, marginTop: 6 }}>
            Head to the chat to plan your first visit!
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {bookings.map((b) => (
            <div
              key={b.id}
              style={{
                background:   "#13131a",
                border:       "1px solid #1e1e28",
                borderRadius: 16,
                overflow:     "hidden",
              }}
            >
              {/* Card header — always visible */}
              <div style={{ padding: "20px 24px" }}>
                <div style={{
                  display:        "flex",
                  justifyContent: "space-between",
                  alignItems:     "flex-start",
                  marginBottom:   12,
                }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 16 }}>{b.visitor_name}</p>
                    <p style={{ color: "#a78bfa", fontSize: 13, fontWeight: 600, marginTop: 2 }}>
                      {b.booking_ref}
                    </p>
                  </div>
                  <span style={{
                    background:   "#1a2a1a",
                    color:        "#22c55e",
                    fontSize:     11,
                    fontWeight:   600,
                    padding:      "4px 10px",
                    borderRadius: 100,
                    border:       "1px solid #22c55e33",
                  }}>
                    {b.payment_status}
                  </span>
                </div>

                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#888", fontSize: 13 }}>
                    <CalendarDays size={13} /> {b.visit_date}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#888", fontSize: 13 }}>
                    <Clock size={13} /> {b.visit_slot}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6, color: "#888", fontSize: 13 }}>
                    <Ticket size={13} /> {b.num_tickets} ticket{b.num_tickets > 1 ? "s" : ""}
                  </span>
                  <span style={{ color: "#888", fontSize: 13 }}>₹{b.total_amount}</span>
                </div>

                {b.group_name && (
                  <p style={{ marginTop: 8, fontSize: 13, color: "#666" }}>🏫 {b.group_name}</p>
                )}
              </div>

              {/* Expand/collapse itinerary */}
              {b.itinerary?.length > 0 && (
                <>
                  <button
                    onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                    style={{
                      width:          "100%",
                      background:     "#0d0d11",
                      border:         "none",
                      borderTop:      "1px solid #1e1e28",
                      padding:        "12px 24px",
                      color:          "#666",
                      fontSize:       13,
                      cursor:         "pointer",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>🗺️ View Itinerary ({b.itinerary.length} exhibits)</span>
                    {expanded === b.id
                      ? <ChevronUp size={15} />
                      : <ChevronDown size={15} />}
                  </button>

                  {expanded === b.id && (
                    <div style={{ padding: "0 24px 24px" }}>
                      <ItineraryCard itinerary={b.itinerary} />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
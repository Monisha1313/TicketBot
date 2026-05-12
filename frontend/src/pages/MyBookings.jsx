import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getMyBookings, cancelBooking, clearAllBookings } from "../utils/api";
import ItineraryCard from "../components/ItineraryCard";
import { CalendarDays, Clock, Ticket, ChevronDown, ChevronUp, Trash2, XCircle } from "lucide-react";

export default function MyBookings() {
  const { user }                = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [confirm, setConfirm]   = useState(null); // ref of booking pending cancel
  const [clearing, setClearing] = useState(false);

  const fetchBookings = () => {
    if (!user?.email) return;
    getMyBookings(user.email)
      .then(setBookings)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, [user]);

  const handleCancel = async (ref) => {
    try {
      await cancelBooking(ref);
      setBookings((prev) =>
        prev.map((b) =>
          b.booking_ref === ref ? { ...b, payment_status: "cancelled" } : b
        )
      );
    } catch (e) {
      alert("Could not cancel booking.");
    } finally {
      setConfirm(null);
    }
  };

  

  const statusColor = (status) => {
    if (status === "confirmed") return { bg: "#1a2a1a", color: "#22c55e", border: "#22c55e33" };
    if (status === "cancelled") return { bg: "#2a1a1a", color: "#f87171", border: "#f8717133" };
    return { bg: "#1a1a2a", color: "#888", border: "#33333355" };
  };

  if (loading) return (
    <div style={{ paddingTop: 120, textAlign: "center", color: "#555" }}>
      Loading your bookings…
    </div>
  );

  return (
    <div style={{ paddingTop: 80, maxWidth: 700, margin: "0 auto", padding: "80px 20px 60px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <p style={{ color: "#6c63ff", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 6 }}>
            YOUR VISITS
          </p>
          <h1 style={{ fontSize: 28, fontWeight: 700 }}>My Bookings</h1>
        </div>

      </div>

      {/* Empty state */}
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
          {bookings.map((b) => {
            const sc         = statusColor(b.payment_status);
            const isCancelled = b.payment_status === "cancelled";

            return (
              <div
                key={b.id}
                style={{
                  background:   "#13131a",
                  border:       `1px solid ${isCancelled ? "#2a1a1a" : "#1e1e28"}`,
                  borderRadius: 16,
                  overflow:     "hidden",
                  opacity:      isCancelled ? 0.7 : 1,
                }}
              >
                {/* Card body */}
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
                      background:   sc.bg,
                      color:        sc.color,
                      fontSize:     11,
                      fontWeight:   600,
                      padding:      "4px 10px",
                      borderRadius: 100,
                      border:       `1px solid ${sc.border}`,
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

                  {/* Cancel button */}
                  {!isCancelled && (
                    <div style={{ marginTop: 16 }}>
                      {confirm === b.booking_ref ? (
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 13, color: "#888" }}>Cancel this booking?</span>
                          <button
                            onClick={() => handleCancel(b.booking_ref)}
                            style={{
                              background: "#7f1d1d", border: "none", borderRadius: 7,
                              padding: "5px 12px", color: "#fca5a5",
                              fontSize: 12, fontWeight: 600, cursor: "pointer",
                            }}
                          >
                            Yes, cancel
                          </button>
                          <button
                            onClick={() => setConfirm(null)}
                            style={{
                              background: "transparent", border: "1px solid #333",
                              borderRadius: 7, padding: "5px 12px",
                              color: "#888", fontSize: 12, cursor: "pointer",
                            }}
                          >
                            Keep it
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirm(b.booking_ref)}
                          style={{
                            display:    "flex",
                            alignItems: "center",
                            gap:        5,
                            background: "transparent",
                            border:     "1px solid #2a1a1a",
                            borderRadius: 7,
                            padding:    "6px 12px",
                            color:      "#f87171",
                            fontSize:   12,
                            cursor:     "pointer",
                          }}
                        >
                          <XCircle size={13} /> Cancel Booking
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Itinerary expand */}
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
                      {expanded === b.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>

                    {expanded === b.id && (
                      <div style={{ padding: "0 24px 24px" }}>
                        <ItineraryCard itinerary={b.itinerary} />
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
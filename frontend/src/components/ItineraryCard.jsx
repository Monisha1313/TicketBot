import { MapPin, Clock } from "lucide-react";

export default function ItineraryCard({ itinerary }) {
  if (!itinerary || itinerary.length === 0) return null;

  const totalMins = itinerary.reduce(
    (sum, item) => sum + (item.recommended_duration_minutes || 0), 0
  );

  return (
    <div
      style={{
        background:   "#1a1a22",
        border:       "1px solid #2d2d3a",
        borderRadius: 14,
        padding:      20,
        marginTop:    16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#a78bfa" }}>
          🗺️ Your Personalised Itinerary
        </h3>
        <span style={{ fontSize: 12, color: "#666" }}>~{totalMins} min total</span>
      </div>

      {itinerary.map((item, i) => (
        <div
          key={i}
          style={{
            display:       "flex",
            gap:           14,
            marginBottom:  14,
            paddingBottom: 14,
            borderBottom:  i < itinerary.length - 1 ? "1px solid #2a2a34" : "none",
          }}
        >
          <div
            style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "#6c63ff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}
          >
            {item.order}
          </div>

          <div>
            <p style={{ fontWeight: 600, fontSize: 14 }}>{item.exhibit_name}</p>
            <p style={{ color: "#888", fontSize: 12, marginTop: 2 }}>
              {item.why_recommended}
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#666", fontSize: 12 }}>
                <MapPin size={11} /> {item.location}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#666", fontSize: 12 }}>
                <Clock size={11} /> {item.recommended_duration_minutes} min
              </span>
            </div>
            {item.tip && (
              <p style={{ marginTop: 6, fontSize: 12, color: "#a78bfa", fontStyle: "italic" }}>
                💡 {item.tip}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
import { useNavigate } from "react-router-dom";

const FEATURES = [
  { icon: "🤖", label: "AI Chatbot Booking" },
  { icon: "🎙️", label: "Voice Support" },
  { icon: "🗺️", label: "Personalised Itinerary" },
  { icon: "🏫", label: "Group & School Booking" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="page"
      style={{ justifyContent: "center", padding: 40, textAlign: "center" }}
    >
      <div style={{ fontSize: 64, marginBottom: 16 }}>🏛️</div>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
        National Museum
      </h1>
      <p style={{ color: "#888", fontSize: 16, marginBottom: 12 }}>
        Bengaluru · Tues–Sun · 10 AM – 6 PM
      </p>
      <p
        style={{
          color: "#aaa", fontSize: 14,
          maxWidth: 440, margin: "0 auto 32px",
          lineHeight: 1.7,
        }}
      >
        Book tickets, plan your visit with a personalised itinerary, and explore
        our exhibits — all through our AI chatbot.
      </p>

      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <button className="btn btn-primary" onClick={() => navigate("/chat")}>
          🎟️ Book Tickets
        </button>
        <button className="btn btn-ghost" onClick={() => navigate("/chat")}>
          🗺️ Plan My Visit
        </button>
      </div>

      <div
        style={{
          display:        "flex",
          gap:            20,
          marginTop:      56,
          flexWrap:       "wrap",
          justifyContent: "center",
        }}
      >
        {FEATURES.map((f) => (
          <div
            key={f.label}
            style={{
              background:   "#1a1a22",
              border:       "1px solid #2a2a34",
              borderRadius: 12,
              padding:      "16px 20px",
              minWidth:     140,
              textAlign:    "center",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 6 }}>{f.icon}</div>
            <p style={{ fontSize: 12, color: "#aaa" }}>{f.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
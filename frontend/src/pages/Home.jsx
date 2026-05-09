import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EXHIBITS = [
  { emoji: "🏺", name: "Ancient Civilizations", desc: "3000-year-old artefacts from Egypt, Mesopotamia & Indus Valley", tag: "History" },
  { emoji: "🚀", name: "Space & Cosmos",         desc: "Interactive black holes, Mars missions & solar system models",  tag: "Science" },
  { emoji: "🌿", name: "Biodiversity Wonders",   desc: "India's rarest specimens and live nature demonstrations",       tag: "Nature" },
  { emoji: "🎨", name: "Modern Art Gallery",      desc: "Post-independence Indian art — paintings & sculpture",         tag: "Art" },
  { emoji: "🤖", name: "Robotics & AI Lab",       desc: "Live robot demos and hands-on AI kiosks",                     tag: "Technology" },
  { emoji: "🧩", name: "Kids Discovery Zone",     desc: "Hands-on experiments and storytelling for children",          tag: "Kids" },
];

const STATS = [
  { value: "7",    label: "Exhibit Halls" },
  { value: "50K+", label: "Artefacts" },
  { value: "200+", label: "Years of History" },
  { value: "10AM", label: "Opens Daily" },
];

export default function Home() {
  const navigate    = useNavigate();
  const { user }    = useAuth();

  return (
    <div style={{ paddingTop: 60 }}>

      {/* ── Hero ── */}
      <section style={{
        minHeight:      "92vh",
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        textAlign:      "center",
        padding:        "60px 24px 40px",
        background:     "radial-gradient(ellipse at 50% 0%, #1a1040 0%, #0d0d11 60%)",
        position:       "relative",
        overflow:       "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: -100, left: "20%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, #6c63ff22, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: "10%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, #a78bfa18, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          display:        "inline-flex",
          alignItems:     "center",
          gap:            8,
          background:     "#1a1a28",
          border:         "1px solid #2d2d44",
          borderRadius:   100,
          padding:        "6px 16px",
          fontSize:       12,
          color:          "#a78bfa",
          marginBottom:   28,
          fontWeight:     500,
        }}>
          ✨ AI-Powered Museum Experience
        </div>

        <h1 style={{
          fontSize:   "clamp(36px, 6vw, 72px)",
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: 20,
          maxWidth:   700,
          background: "linear-gradient(135deg, #fff 40%, #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Discover History,<br />Art & Science
        </h1>

        <p style={{
          color:      "#888",
          fontSize:   17,
          maxWidth:   480,
          lineHeight: 1.7,
          marginBottom: 40,
        }}>
          Plan your perfect museum visit with our AI guide. Get a personalised
          itinerary, book tickets in seconds, and explore 7 world-class exhibit halls.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            className="btn btn-primary"
            style={{ padding: "13px 28px", fontSize: 15, borderRadius: 12 }}
            onClick={() => navigate("/chat", { state: { intent: "explore" } })}
          >
            🗺️ Plan My Visit
          </button>
          <button
            className="btn btn-ghost"
            style={{ padding: "13px 28px", fontSize: 15, borderRadius: 12 }}
            onClick={() => navigate("/chat", { state: { intent: "book" } })}
          >
            🎟️ Book Tickets
          </button>
        </div>

        {/* Stats row */}
        <div style={{
          display:        "flex",
          gap:            40,
          marginTop:      64,
          flexWrap:       "wrap",
          justifyContent: "center",
        }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 28, fontWeight: 800, color: "#a78bfa" }}>{s.value}</p>
              <p style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Exhibits grid ── */}
      <section style={{ padding: "80px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ color: "#6c63ff", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8 }}>
          EXPLORE
        </p>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 48 }}>Our Exhibit Halls</h2>

        <div style={{
          display:               "grid",
          gridTemplateColumns:   "repeat(auto-fill, minmax(300px, 1fr))",
          gap:                   20,
        }}>
          {EXHIBITS.map((e) => (
            <div
              key={e.name}
              style={{
                background:   "#13131a",
                border:       "1px solid #1e1e28",
                borderRadius: 16,
                padding:      "28px 24px",
                cursor:       "pointer",
                transition:   "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(el) => {
                el.currentTarget.style.borderColor = "#6c63ff55";
                el.currentTarget.style.transform   = "translateY(-2px)";
              }}
              onMouseLeave={(el) => {
                el.currentTarget.style.borderColor = "#1e1e28";
                el.currentTarget.style.transform   = "translateY(0)";
              }}
              onClick={() => navigate("/chat", { state: { intent: "explore" } })}
            >
              <div style={{ fontSize: 36, marginBottom: 14 }}>{e.emoji}</div>
              <div style={{
                display:      "inline-block",
                background:   "#1a1a28",
                border:       "1px solid #2d2d44",
                borderRadius: 100,
                padding:      "2px 10px",
                fontSize:     11,
                color:        "#a78bfa",
                fontWeight:   600,
                marginBottom: 10,
              }}>
                {e.tag}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{e.name}</h3>
              <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{e.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Visit Info ── */}
      <section style={{
        background: "#0d0d11",
        borderTop:  "1px solid #1a1a24",
        padding:    "80px 32px",
      }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 48, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <p style={{ color: "#6c63ff", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8 }}>
              PLAN YOUR VISIT
            </p>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Visitor Information</h2>
            {[
              { label: "Opening Hours", value: "Tue – Sun, 10 AM – 6 PM" },
              { label: "Closed",        value: "Every Monday" },
              { label: "Adult Ticket",  value: "₹150" },
              { label: "Student",       value: "₹80" },
              { label: "Children",      value: "₹50 (under 12)" },
              { label: "Group (20+)",   value: "20% discount" },
              { label: "Address",       value: "Museum Road, Bengaluru – 560001" },
            ].map((r) => (
              <div key={r.label} style={{
                display:       "flex",
                justifyContent:"space-between",
                padding:       "10px 0",
                borderBottom:  "1px solid #1a1a24",
                fontSize:      14,
              }}>
                <span style={{ color: "#666" }}>{r.label}</span>
                <span style={{ color: "#ccc", fontWeight: 500 }}>{r.value}</span>
              </div>
            ))}
          </div>

          <div style={{
            flex:         1,
            minWidth:     240,
            background:   "#13131a",
            border:       "1px solid #1e1e28",
            borderRadius: 20,
            padding:      "32px 28px",
            display:      "flex",
            flexDirection:"column",
            alignItems:   "center",
            justifyContent:"center",
            textAlign:    "center",
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🤖</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
              Talk to MuseBot
            </h3>
            <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
              Tell our AI your interests and available time — it'll build you a personalised itinerary and book your tickets.
            </p>
            <button
              className="btn btn-primary"
              style={{ width: "100%", padding: "12px 0", borderRadius: 12 }}
              onClick={() => navigate("/chat", { state: { intent: "explore" } })}
            >
              Start Planning →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop:  "1px solid #1a1a24",
        padding:    "24px 32px",
        textAlign:  "center",
        color:      "#333",
        fontSize:   12,
      }}>
        © 2025 National Museum, Bengaluru. Built for SIH.
      </footer>
    </div>
  );
}
import { useNavigate } from "react-router-dom";

const EXHIBITS = [
  {
    emoji: "🏺", name: "Ancient Civilizations", tag: "History",
    location: "Hall A, Ground Floor", duration: "45 min",
    desc: "Journey through Mesopotamia, Egypt, and the Indus Valley. Marvel at 3000-year-old artefacts including seals, pottery, and manuscripts that shaped human civilisation.",
    highlights: ["Indus Valley seals", "Egyptian papyrus scrolls", "Mesopotamian cuneiform tablets"],
    color: "#a78bfa",
  },
  {
    emoji: "🚀", name: "Space & Cosmos", tag: "Science",
    location: "Hall B, Ground Floor", duration: "60 min",
    desc: "Explore the universe through interactive displays on black holes, Mars missions, and our solar system. Walk through a scale model of the cosmos.",
    highlights: ["Mars rover replica", "Black hole simulator", "ISS module walkthrough"],
    color: "#60a5fa",
  },
  {
    emoji: "🌿", name: "Biodiversity Wonders", tag: "Nature",
    location: "Hall C, First Floor", duration: "40 min",
    desc: "Discover India's extraordinary biodiversity through rare specimens, live demonstrations, and immersive habitat recreations of ecosystems from the Himalayas to the ocean.",
    highlights: ["Western Ghats diorama", "Coral reef display", "Live insect terrariums"],
    color: "#34d399",
  },
  {
    emoji: "🎨", name: "Modern Art Gallery", tag: "Art",
    location: "Hall D, First Floor", duration: "50 min",
    desc: "A curated collection of post-independence Indian art spanning painting, sculpture, and installation. Features rotating exhibitions from emerging and established artists.",
    highlights: ["MF Husain collection", "Contemporary sculpture garden", "Digital art installations"],
    color: "#f472b6",
  },
  {
    emoji: "🧩", name: "Kids Discovery Zone", tag: "Kids",
    location: "Hall E, Ground Floor", duration: "60 min",
    desc: "A fully interactive learning space designed for children under 12. Hands-on science experiments, storytelling sessions, and build-your-own exhibit challenges.",
    highlights: ["Science experiment kits", "Story theatre", "Build-a-fossil station"],
    color: "#fbbf24",
  },
  {
    emoji: "🇮🇳", name: "Freedom Struggle", tag: "History",
    location: "Hall F, Second Floor", duration: "35 min",
    desc: "Rare artefacts, personal letters, and photographs from India's independence movement. Walk through key moments from 1857 to 1947 in vivid historical detail.",
    highlights: ["Gandhi's personal letters", "Partition photographs", "1857 uprising artefacts"],
    color: "#fb923c",
  },
  {
    emoji: "🤖", name: "Robotics & AI Lab", tag: "Technology",
    location: "Hall G, Second Floor", duration: "55 min",
    desc: "Live robot demonstrations, AI kiosks you can interact with, and exhibits tracing the history of computing from the abacus to large language models.",
    highlights: ["Live robot arm demos", "Build-a-circuit station", "AI conversation kiosk"],
    color: "#22d3ee",
  },
];

const TAG_COLORS = {
  History:    "#a78bfa",
  Science:    "#60a5fa",
  Nature:     "#34d399",
  Art:        "#f472b6",
  Kids:       "#fbbf24",
  Technology: "#22d3ee",
};

export default function Exhibits() {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: 60, background: "#0d0d11", minHeight: "100vh" }}>

      {/* Header */}
      <section style={{
        padding:    "64px 32px 48px",
        textAlign:  "center",
        background: "radial-gradient(ellipse at 50% 0%, #1a1040 0%, #0d0d11 70%)",
      }}>
        <p style={{ color: "#6c63ff", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 10 }}>
          EXPLORE
        </p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, marginBottom: 16 }}>
          Our Exhibit Halls
        </h1>
        <p style={{ color: "#666", fontSize: 15, maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.7 }}>
          7 world-class halls spanning history, science, art, nature, and technology.
          Each visit is unique — plan yours with MuseBot.
        </p>
        <button
          className="btn btn-primary"
          style={{ padding: "12px 28px", borderRadius: 12, fontSize: 14 }}
          onClick={() => navigate("/chat", { state: { intent: "explore" } })}
        >
          🗺️ Plan My Visit with AI
        </button>
      </section>

      {/* Exhibits grid */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 24,
        }}>
          {EXHIBITS.map((e) => (
            <div
              key={e.name}
              style={{
                background:   "#13131a",
                border:       "1px solid #1e1e28",
                borderRadius: 20,
                overflow:     "hidden",
                transition:   "transform 0.2s, border-color 0.2s",
                cursor:       "pointer",
              }}
              onMouseEnter={(ev) => {
                ev.currentTarget.style.transform   = "translateY(-3px)";
                ev.currentTarget.style.borderColor = e.color + "55";
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.transform   = "translateY(0)";
                ev.currentTarget.style.borderColor = "#1e1e28";
              }}
              onClick={() => navigate("/chat", { state: { intent: "explore" } })}
            >
              {/* Coloured top strip */}
              <div style={{
                height:     4,
                background: `linear-gradient(90deg, ${e.color}, transparent)`,
              }} />

              <div style={{ padding: "24px 24px 28px" }}>
                {/* Emoji + tag */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span style={{ fontSize: 40 }}>{e.emoji}</span>
                  <span style={{
                    background:   e.color + "18",
                    color:        e.color,
                    fontSize:     11,
                    fontWeight:   700,
                    padding:      "3px 10px",
                    borderRadius: 100,
                    border:       `1px solid ${e.color}33`,
                  }}>
                    {e.tag}
                  </span>
                </div>

                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{e.name}</h3>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65, marginBottom: 16 }}>{e.desc}</p>

                {/* Highlights */}
                <div style={{ marginBottom: 18 }}>
                  {e.highlights.map((h) => (
                    <div key={h} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: e.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: "#888" }}>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Footer info */}
                <div style={{
                  display:       "flex",
                  justifyContent:"space-between",
                  paddingTop:    12,
                  borderTop:     "1px solid #1e1e28",
                  fontSize:      12,
                  color:         "#555",
                }}>
                  <span>📍 {e.location}</span>
                  <span>⏱ {e.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
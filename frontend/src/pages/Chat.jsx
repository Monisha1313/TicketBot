import { useNavigate } from "react-router-dom";
import { ArrowLeft }   from "lucide-react";
import ChatWindow      from "../components/ChatWindow";

export default function Chat() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height:        "100vh",
        display:       "flex",
        flexDirection: "column",
        maxWidth:      720,
        margin:        "0 auto",
        width:         "100%",
        padding:       "12px 12px 0",
      }}
    >
      {/* Header */}
      <div
        style={{
          display:    "flex",
          alignItems: "center",
          gap:        12,
          padding:    "8px 0 12px",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none", border: "none",
            cursor: "pointer", color: "#888",
          }}
        >
          <ArrowLeft size={20} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 20 }}>🏛️</span>
          <div>
            <p style={{ fontWeight: 600, fontSize: 14 }}>MuseBot</p>
            <p style={{ fontSize: 11, color: "#22c55e" }}>● Online</p>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, overflow: "hidden", paddingBottom: 12 }}>
        <ChatWindow />
      </div>
    </div>
  );
}
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (location.pathname === "/login") return null;

  return (
    <nav style={{
      position:       "fixed",
      top:            0,
      left:           0,
      right:          0,
      zIndex:         100,
      display:        "flex",
      alignItems:     "center",
      justifyContent: "space-between",
      padding:        "0 32px",
      height:         60,
      background:     "rgba(13,13,17,0.85)",
      backdropFilter: "blur(12px)",
      borderBottom:   "1px solid #1e1e28",
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
      >
        <span style={{ fontSize: 22 }}>🏛️</span>
        <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "0.02em" }}>
          National Museum
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {[
          { label: "Home",    path: "/" },
          { label: "Exhibits", path: "/exhibits" },
          { label: "Book",    path: "/chat" },
          { label: "My Bookings", path: "/my-bookings" },
        ].map((l) => (
          <span
            key={l.path}
            onClick={() => navigate(l.path)}
            style={{
              fontSize:   13,
              fontWeight: 500,
              color:      location.pathname === l.path ? "#a78bfa" : "#888",
              cursor:     "pointer",
              transition: "color 0.2s",
            }}
          >
            {l.label}
          </span>
        ))}
      </div>

      {/* User */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {user.photoURL
              ? <img src={user.photoURL} style={{ width: 28, height: 28, borderRadius: "50%" }} />
              : <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: "#6c63ff", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  <User size={14} color="#fff" />
                </div>
            }
            <span style={{ fontSize: 13, color: "#ccc" }}>
              {user.displayName || user.email?.split("@")[0]}
            </span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent", border: "1px solid #2a2a36",
              borderRadius: 8, padding: "5px 10px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 5, color: "#888",
            }}
          >
            <LogOut size={13} /> <span style={{ fontSize: 12 }}>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function Login() {
  const navigate  = useNavigate();
  const [isSignup, setIsSignup]   = useState(false);
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  const handleEmail = async () => {
    setLoading(true);
    setError("");
    try {
      if (isSignup) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) await updateProfile(cred.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/");
    } catch (e) {
      setError(e.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight:      "100vh",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      background:     "#0d0d11",
      padding:        20,
    }}>
      <div style={{
        width:        "100%",
        maxWidth:     400,
        background:   "#13131a",
        border:       "1px solid #1e1e28",
        borderRadius: 20,
        padding:      "40px 36px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🏛️</div>
          <h1 style={{ fontSize: 22, fontWeight: 700 }}>National Museum</h1>
          <p style={{ color: "#666", fontSize: 13, marginTop: 4 }}>
            {isSignup ? "Create your account" : "Sign in to continue"}
          </p>
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          style={{
            width:        "100%",
            padding:      "11px 0",
            borderRadius: 10,
            border:       "1px solid #2a2a36",
            background:   "#1a1a24",
            color:        "#f0f0f0",
            fontSize:     14,
            fontWeight:   500,
            cursor:       "pointer",
            display:      "flex",
            alignItems:   "center",
            justifyContent: "center",
            gap:          10,
            marginBottom: 20,
          }}
        >
          <img src="https://www.google.com/favicon.ico" width={16} height={16} />
          Continue with Google
        </button>

        <div style={{
          display:        "flex",
          alignItems:     "center",
          gap:            12,
          marginBottom:   20,
        }}>
          <div style={{ flex: 1, height: 1, background: "#1e1e28" }} />
          <span style={{ color: "#444", fontSize: 12 }}>or</span>
          <div style={{ flex: 1, height: 1, background: "#1e1e28" }} />
        </div>

        {/* Email form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {isSignup && (
            <input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          )}
          <input
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEmail()}
            style={inputStyle}
          />
        </div>

        {error && (
          <p style={{ color: "#f87171", fontSize: 12, marginTop: 10 }}>{error}</p>
        )}

        <button
          onClick={handleEmail}
          disabled={loading}
          style={{
            width:        "100%",
            padding:      "12px 0",
            borderRadius: 10,
            border:       "none",
            background:   "#6c63ff",
            color:        "#fff",
            fontSize:     14,
            fontWeight:   600,
            cursor:       "pointer",
            marginTop:    16,
            opacity:      loading ? 0.6 : 1,
          }}
        >
          {loading ? "Please wait…" : isSignup ? "Create Account" : "Sign In"}
        </button>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#555" }}>
          {isSignup ? "Already have an account? " : "New here? "}
          <span
            onClick={() => { setIsSignup(!isSignup); setError(""); }}
            style={{ color: "#a78bfa", cursor: "pointer" }}
          >
            {isSignup ? "Sign in" : "Create account"}
          </span>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width:        "100%",
  padding:      "11px 14px",
  borderRadius: 10,
  border:       "1px solid #2a2a36",
  background:   "#0d0d11",
  color:        "#f0f0f0",
  fontSize:     14,
  outline:      "none",
  boxSizing:    "border-box",
};
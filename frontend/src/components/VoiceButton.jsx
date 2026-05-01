import { Mic, MicOff } from "lucide-react";

export default function VoiceButton({ listening, supported, onToggle }) {
  if (!supported) return null;

  return (
    <button
      onClick={onToggle}
      title={listening ? "Stop listening" : "Speak your message"}
      style={{
        background:    listening ? "#ff4757" : "#2a2a32",
        border:        "none",
        borderRadius:  "50%",
        width:         40,
        height:        40,
        cursor:        "pointer",
        display:       "flex",
        alignItems:    "center",
        justifyContent:"center",
        flexShrink:    0,
        transition:    "background 0.2s",
      }}
    >
      {listening
        ? <MicOff size={18} color="#fff" />
        : <Mic    size={18} color="#aaa" />}
    </button>
  );
}
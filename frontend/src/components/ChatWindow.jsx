import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useChat } from "../hooks/useChat";
import { useVoice } from "../hooks/useVoice";
import ChatBubble    from "./ChatBubble";
import VoiceButton   from "./VoiceButton";
import ItineraryCard from "./ItineraryCard";
import TicketCard    from "./TicketCard";

export default function ChatWindow() {
  const [input, setInput] = useState("");
  const { messages, loading, sendUserMessage, bookingResult } = useChat();
  const bottomRef = useRef(null);

  const handleVoiceResult = (text) => setInput(text);
  const { listening, supported, toggle, speak, stopSpeaking } = useVoice(handleVoiceResult);

  // Stop speech when component unmounts (user navigates away)
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, bookingResult]);

  // Speak last bot reply (short ones only)
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.role === "assistant" && last.content.length < 250) {
      speak(last.content);
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    stopSpeaking(); // stop bot mid-speech when user sends
    sendUserMessage(input.trim());
    setInput("");
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
      background: "#13131a", borderRadius: 16,
      overflow: "hidden", border: "1px solid #2a2a36",
    }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px" }}>
        {messages.map((msg, i) => <ChatBubble key={i} message={msg} />)}
        {loading && (
          <div style={{ color: "#555", fontSize: 13, padding: "8px 4px" }}>
            MuseBot is typing…
          </div>
        )}
        {bookingResult && (
          <>
            <TicketCard    booking={bookingResult.booking} />
            <ItineraryCard itinerary={bookingResult.itinerary} />
          </>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "12px 16px", borderTop: "1px solid #22222c",
        background: "#0f0f15",
      }}>
        <VoiceButton listening={listening} supported={supported} onToggle={toggle} />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder={listening ? "🎙️ Listening…" : "Type or speak your message…"}
          style={{
            flex: 1, background: "#1e1e26", border: "1px solid #2d2d3a",
            borderRadius: 10, padding: "10px 14px", color: "#f0f0f0",
            fontSize: 14, outline: "none",
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{
            background: "#6c63ff", border: "none", borderRadius: 10,
            width: 40, height: 40, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: loading || !input.trim() ? 0.4 : 1,
          }}
        >
          <Send size={16} color="#fff" />
        </button>
      </div>
    </div>
  );
}
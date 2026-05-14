import { useState, useCallback } from "react";
import { sendMessage } from "../utils/api";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { saveBookingToFirestore } from "../utils/firestore";

const getIntro = (intent, user) => {
  const name = user?.displayName?.split(" ")[0] || null;
  const hi   = name ? `👋 Hi ${name}!` : "👋 Welcome!";

  if (intent === "explore") return {
    role: "assistant",
    content: `${hi} I'm MuseBot, your museum guide.\n\nBefore we book anything — let's plan the perfect visit. What kind of exhibits do you enjoy? (history, science, art, nature, technology, kids)\n\nAnd roughly how much time do you have?`,
  };
  if (intent === "book") return {
    role: "assistant",
    content: `${hi} I'm MuseBot. Let's get your tickets sorted.\n\nAre you booking as an individual or for a group/school?`,
  };
  return {
    role: "assistant",
    content: `${hi} I'm MuseBot.\n\nI can help you book tickets, plan a personalised itinerary, or answer questions about our exhibits.\n\nShall we get started?`,
  };
};

export function useChat() {
  const location = useLocation();
  const { user } = useAuth();
  const intent   = location.state?.intent || "default";

  const [messages,      setMessages]      = useState([getIntro(intent, user)]);
  const [loading,       setLoading]       = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  const sendUserMessage = useCallback(async (text) => {
    const userMsg = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);

    try {
      const apiMessages = updated.map((m) => ({ role: m.role, content: m.content }));
      const result = await sendMessage(apiMessages, user);

      setMessages((prev) => [...prev, { role: "assistant", content: result.reply }]);

      if (result.action === "booking_created") {
        setBookingResult(result);
        // Save to Firestore
        await saveBookingToFirestore(result.booking, result.itinerary, user);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages, user]);

  return { messages, loading, sendUserMessage, bookingResult };
}
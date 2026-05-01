import { useState, useCallback } from "react";
import { sendMessage } from "../utils/api";

export function useChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Welcome to the National Museum! I'm MuseBot.\n\nI can help you book tickets, plan a personalised itinerary, or answer any questions about our exhibits.\n\nShall we get started?",
    },
  ]);
  const [loading,       setLoading]       = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  const sendUserMessage = useCallback(
    async (text) => {
      const userMsg = { role: "user", content: text };
      const updated = [...messages, userMsg];
      setMessages(updated);
      setLoading(true);

      try {
        const apiMessages = updated.map((m) => ({
          role:    m.role,
          content: m.content,
        }));
        const result = await sendMessage(apiMessages);

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: result.reply },
        ]);

        if (result.action === "booking_created") {
          setBookingResult(result);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "⚠️ Something went wrong. Please try again.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages]
  );

  return { messages, loading, sendUserMessage, bookingResult };
}
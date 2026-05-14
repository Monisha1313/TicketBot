import { useState, useEffect, useRef } from "react";

export function useVoice(onResult) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const recRef = useRef(null);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    setSupported(true);
    const rec = new SR();
    rec.continuous     = false;
    rec.interimResults = false;
    rec.lang           = "en-IN";
    rec.onresult = (e) => {
      onResult(e.results[0][0].transcript);
      setListening(false);
    };
    rec.onend   = () => setListening(false);
    rec.onerror = () => setListening(false);
    recRef.current = rec;
  }, [onResult]);

  const toggle = () => {
    if (!recRef.current) return;
    if (listening) { recRef.current.stop(); setListening(false); }
    else           { recRef.current.start(); setListening(true); }
  };

  // Stop speaking immediately
  const stopSpeaking = () => window.speechSynthesis?.cancel();

  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // stop any current speech first
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-IN";
    u.rate = 1.0;
    window.speechSynthesis.speak(u);
  };

  return { listening, supported, toggle, speak, stopSpeaking };
}
"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatPanel() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hello Mukul 👋 Main aapka JARVIS Assistant hoon." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef<any>(null);

  // 🎤 Voice recognition setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = "en-IN";
      recog.continuous = false;
      recog.interimResults = false;

      recog.onresult = (e: any) => {
        const text = e.results[0][0].transcript;
        setInput(text);
      };

      recognitionRef.current = recog;
    }
  }, []);

  // 🔊 Speak function
  const speak = (text: string) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";
    utter.rate = 1;
    speechSynthesis.speak(utter);
  };

  const send = async () => {
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setLoading(true);

    setMessages((m) => [...m, { role: "user", text: userText }]);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await res.json();
      const reply = data.reply || "No reply";

      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      speak(reply); // 🔊 AI speaks
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "❌ Backend connect error" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "min(900px, 94vw)",
        height: "min(700px, 86vh)",
        background: "var(--panel)",
        border: "1px solid var(--line)",
        borderRadius: 22,
        display: "grid",
        gridTemplateRows: "60px 1fr 70px",
      }}
    >
      <div style={{ padding: 16, fontWeight: 700 }}>
        🤖 Mukul Assistant — JARVIS VOICE MODE
      </div>

      <div style={{ padding: 16, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                maxWidth: "75%",
                padding: "10px 14px",
                borderRadius: 16,
                background:
                  m.role === "user"
                    ? "rgba(90,220,255,.18)"
                    : "rgba(255,255,255,.05)",
                border: "1px solid var(--line)",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div>Jarvis soch raha hai…</div>}
      </div>

      <div style={{ display: "flex", gap: 10, padding: 12 }}>
        <button
          onClick={() => recognitionRef.current?.start()}
          style={{
            padding: "0 16px",
            borderRadius: 14,
            border: "1px solid var(--line)",
            background: "rgba(90,220,255,.25)",
          }}
        >
          🎤
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Speak or type..."
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 14,
            border: "1px solid var(--line)",
            background: "rgba(0,0,0,.25)",
            color: "var(--text)",
          }}
        />

        <button
          onClick={send}
          disabled={loading}
          style={{
            padding: "0 18px",
            borderRadius: 14,
            border: "1px solid var(--line)",
            background: "rgba(90,220,255,.2)",
            fontWeight: 700,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

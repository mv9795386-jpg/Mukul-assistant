"use client";
import { useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function ChatPanel() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Hello Mukul 👋 Main aapka JARVIS Assistant hoon." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

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

      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.reply || "No reply" },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: "❌ Backend connect nahi ho paaya" },
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
        backdropFilter: "blur(10px)",
        display: "grid",
        gridTemplateRows: "60px 1fr 70px",
        boxShadow: "0 0 60px rgba(20,120,255,.15)",
      }}
    >
      {/* header */}
      <div style={{ padding: 16, fontWeight: 700 }}>
        🤖 Mukul Assistant — JARVIS MODE
      </div>

      {/* messages */}
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
                boxShadow: "0 0 20px rgba(90,220,255,.12)",
                whiteSpace: "pre-wrap",
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ opacity: 0.7 }}>Jarvis soch raha hai…</div>
        )}
      </div>

      {/* input */}
      <div style={{ display: "flex", gap: 10, padding: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message…"
          style={{
            flex: 1,
            padding: 14,
            borderRadius: 14,
            border: "1px solid var(--line)",
            background: "rgba(0,0,0,.25)",
            color: "var(--text)",
            outline: "none",
          }}
        />
        <button
          onClick={send}
          disabled={loading}
          style={{
            padding: "14px 18px",
            borderRadius: 14,
            border: "1px solid var(--line)",
            background: "rgba(90,220,255,.2)",
            color: "var(--text)",
            fontWeight: 700,
            cursor: "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

export default function Loader() {
  const [pct,    setPct]    = useState(0);
  const [done,   setDone]   = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let current = 0;
    const id = setInterval(() => {
      current += Math.random() * 18 + 4;
      if (current >= 100) {
        current = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 400);
        setTimeout(() => setHidden(true), 1000);
      }
      setPct(Math.floor(current));
    }, 80);
    return () => clearInterval(id);
  }, []);

  if (hidden) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#020408",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transition: "opacity 0.6s ease, transform 0.6s ease",
      opacity: done ? 0 : 1,
      transform: done ? "scale(1.05)" : "scale(1)",
      pointerEvents: done ? "none" : "all",
    }}>
      {/* Logo */}
      <div style={{
        width: 72, height: 72, borderRadius: 20,
        background: "linear-gradient(135deg, #8b5cf6, #f59e0b)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 32, fontWeight: 900, marginBottom: 32,
        boxShadow: "0 0 40px rgba(139,92,246,0.6)",
        animation: "loaderPulse 1.5s ease-in-out infinite",
      }}>A</div>

      {/* Name */}
      <p style={{ color: "#e2e8f0", fontSize: 18, fontWeight: 700, marginBottom: 32, letterSpacing: "0.1em" }}>
        ADITYA PRATAP SINGH
      </p>

      {/* Progress bar */}
      <div style={{ width: 200, height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden", marginBottom: 12 }}>
        <div style={{
          height: "100%", borderRadius: 4,
          background: "linear-gradient(90deg, #8b5cf6, #f59e0b)",
          width: `${pct}%`,
          transition: "width 0.1s ease",
          boxShadow: "0 0 10px rgba(139,92,246,0.8)",
        }} />
      </div>
      <p style={{ color: "#475569", fontSize: 12, letterSpacing: "0.15em" }}>{pct}%</p>

      <style>{`
        @keyframes loaderPulse {
          0%,100% { box-shadow: 0 0 40px rgba(139,92,246,0.6); }
          50%      { box-shadow: 0 0 80px rgba(139,92,246,0.9), 0 0 120px rgba(245,158,11,0.3); }
        }
      `}</style>
    </div>
  );
}

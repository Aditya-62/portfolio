import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const h   = el.scrollHeight - el.clientHeight;
      setPct(h > 0 ? (top / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ position:"fixed", top:0, left:0, right:0, height:3, zIndex:9999, background:"rgba(255,255,255,0.05)" }}>
      <div style={{
        height: "100%",
        width: `${pct}%`,
        background: "linear-gradient(90deg, #8b5cf6, #6366f1, #f59e0b)",
        transition: "width 0.1s linear",
        boxShadow: "0 0 10px rgba(139,92,246,0.8)",
      }} />
    </div>
  );
}

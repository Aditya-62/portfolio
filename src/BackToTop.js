import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed", bottom: 90, right: 24, zIndex: 999,
        width: 46, height: 46, borderRadius: 14,
        background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
        border: "none", cursor: "pointer", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, boxShadow: "0 0 20px rgba(139,92,246,0.5)",
        transition: "all 0.3s cubic-bezier(0.175,0.885,0.32,1.275)",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
        pointerEvents: show ? "all" : "none",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px) scale(1.1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0) scale(1)"}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

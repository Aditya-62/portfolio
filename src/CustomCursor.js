import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Only show on desktop
    if (window.matchMedia("(hover: none)").matches) return;

    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 5}px, ${e.clientY - 5}px)`;
        cursorRef.current.style.opacity = "1";
      }
    };

    const onEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "12px";
        cursorRef.current.style.height = "12px";
        cursorRef.current.style.background = "#a855f7";
      }
    };

    const onLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.width = "8px";
        cursorRef.current.style.height = "8px";
        cursorRef.current.style.background = "#a855f7";
      }
    };

    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed", top: 0, left: 0,
        width: 8, height: 8,
        borderRadius: "50%",
        background: "#a855f7",
        pointerEvents: "none",
        zIndex: 99999,
        opacity: 0,
        transition: "width 0.2s ease, height 0.2s ease, background 0.2s ease",
        boxShadow: "0 0 8px rgba(168,85,247,0.8)",
      }}
    />
  );
}

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const pos      = useRef({ x: 0, y: 0 });
  const ring     = useRef({ x: 0, y: 0 });
  const raf      = useRef(null);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onEnter = () => { if (ringRef.current) ringRef.current.style.transform += " scale(1.8)"; };
    const onLeave = () => { if (ringRef.current) ringRef.current.style.transform = ringRef.current.style.transform.replace(" scale(1.8)", ""); };

    document.querySelectorAll("a, button, [data-hover]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", move);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}   style={{ position:"fixed", top:0, left:0, width:8,  height:8,  borderRadius:"50%", background:"#8b5cf6", pointerEvents:"none", zIndex:99999, transition:"transform 0.05s linear", boxShadow:"0 0 10px #8b5cf6, 0 0 20px #8b5cf6" }} />
      <div ref={ringRef}  style={{ position:"fixed", top:0, left:0, width:40, height:40, borderRadius:"50%", border:"1.5px solid rgba(139,92,246,0.6)", pointerEvents:"none", zIndex:99998, transition:"transform 0.08s linear", boxShadow:"0 0 15px rgba(139,92,246,0.2)" }} />
    </>
  );
}

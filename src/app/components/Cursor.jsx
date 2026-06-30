import { useState, useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

// Custom cursor — a dot + a trailing ring that grow on interactive elements.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => {
      gsap.to(dot.current,  { x: e.clientX, y: e.clientY, duration: 0.05 });
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.28, ease: "power2.out" });
    };
    const enter = () => setHovered(true);
    const leave = () => setHovered(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,input,textarea,[data-hover]")
      .forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ width: hovered?16:6, height: hovered?16:6, borderRadius:"50%",
          background: hovered?"rgba(224,64,251,0.5)":"#e040fb",
          transition:"width 0.2s,height 0.2s,background 0.2s", mixBlendMode:"screen" }} />
      <div ref={ring} className="fixed top-0 left-0 z-[9997] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ width: hovered?52:28, height: hovered?52:28, borderRadius:"50%",
          border: `1.5px solid ${hovered?"#e040fb":"rgba(224,64,251,0.4)"}`,
          transition:"width 0.25s,height 0.25s,border-color 0.2s" }} />
    </>
  );
}

import { useRef } from "react";
import { gsap } from "../lib/gsap";

// Magnetic button — gently pulls toward the cursor, springs back on leave.
export default function MagBtn({ children, onClick, className="", style={} }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width/2) * .35;
    const y = (e.clientY - r.top - r.height/2) * .35;
    gsap.to(ref.current, { x, y, duration: 0.4, ease:"power2.out" });
  };
  const onLeave = () => gsap.to(ref.current, { x:0, y:0, duration:0.6, ease:"elastic.out(1,0.4)" });

  return (
    <button ref={ref} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave}
      className={className} style={style}>
      {children}
    </button>
  );
}

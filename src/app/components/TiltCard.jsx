import { useRef } from "react";
import { gsap } from "../lib/gsap";

// Wrapper that gives its children a 3D mouse-tilt effect.
export default function TiltCard({ children, className="" }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    gsap.to(ref.current, { rotateY: x*14, rotateX: -y*14, transformPerspective:800, duration:0.4, ease:"power2.out" });
  };
  const onLeave = () => gsap.to(ref.current, { rotateY:0, rotateX:0, duration:0.6, ease:"elastic.out(1,0.4)" });

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      className={className} style={{ willChange:"transform", transformStyle:"preserve-3d" }}>
      {children}
    </div>
  );
}

import { useRef, useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";

// Full-screen intro loader with animated progress bar + percentage.
export default function Loader({ onDone }) {
  const ref = useRef(null);
  const pctRef = useRef(null);
  const barRef = useRef(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (!ref.current) return;
        gsap.to(ref.current, { yPercent:-100, duration:0.9, ease:"expo.inOut", onComplete:onDone });
      },
    });
    if (barRef.current) tl.to(barRef.current, { width:"100%", duration:1.6, ease:"power2.inOut" });
    tl.to({}, { duration:0.2 });

    let n = 0;
    const iv = setInterval(() => {
      n = Math.min(n + Math.random() * 8, 100);
      if (pctRef.current) pctRef.current.textContent = Math.floor(n) + "%";
      if (n >= 100) clearInterval(iv);
    }, 60);
    return () => clearInterval(iv);
  }, []);

  return (
    <div ref={ref} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "#04020d" }}>
      <div className="font-black text-6xl md:text-8xl mb-2 select-none"
        style={{ fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.06em",
          background:"linear-gradient(135deg,#e040fb,#7c4dff,#00bcd4)",
          WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
        MAAZ KHAN
      </div>
      <div className="font-mono text-xs text-purple-400 tracking-[0.3em] mb-12">MERN STACK DEVELOPER</div>
      <div className="w-64 h-px bg-white/10 relative overflow-hidden">
        <div ref={barRef} className="absolute left-0 top-0 h-full w-0"
          style={{ background:"linear-gradient(90deg,#e040fb,#7c4dff,#00bcd4)" }} />
      </div>
      <div className="font-mono text-xs text-white/30 mt-3">
        <span ref={pctRef}>0%</span>
      </div>
    </div>
  );
}

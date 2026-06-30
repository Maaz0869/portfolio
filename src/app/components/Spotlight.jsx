import { useRef, useEffect } from "react";

// A soft radial glow that follows the cursor across the whole page.
export default function Spotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current)
        ref.current.style.background =
          `radial-gradient(500px circle at ${e.clientX}px ${e.clientY}px, rgba(167,139,250,0.08), transparent 65%)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} className="fixed inset-0 z-[60] pointer-events-none" style={{ mixBlendMode:"screen" }} />;
}

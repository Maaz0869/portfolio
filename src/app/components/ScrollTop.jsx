import { useState, useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { ArrowUp } from "lucide-react";

// Floating "back to top" button that fades in after scrolling down.
export default function ScrollTop() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    if (ref.current) gsap.to(ref.current, { autoAlpha: show ? 1 : 0, y: show ? 0 : 20, duration:0.4, ease:"power2.out" });
  }, [show]);
  return (
    <button ref={ref} onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      aria-label="Back to top"
      className="fixed right-6 bottom-6 z-40 w-12 h-12 flex items-center justify-center"
      style={{ opacity:0, visibility:"hidden", background:"linear-gradient(135deg,#e040fb,#7c4dff)", color:"#fff" }}
      onMouseEnter={e => gsap.to(e.currentTarget, { scale:1.12, duration:0.2 })}
      onMouseLeave={e => gsap.to(e.currentTarget, { scale:1, duration:0.2 })}>
      <ArrowUp size={18} />
    </button>
  );
}

import { useRef, useEffect } from "react";
import { gsap } from "../lib/gsap";

// Number that counts up from 0 to `to` when scrolled into view.
export default function Counter({ to, suffix = "" }) {
  const spanRef   = useRef(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: to,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => { el.textContent = Math.floor(proxy.val) + suffix; },
        });
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, suffix]);

  return <span ref={spanRef}>0{suffix}</span>;
}

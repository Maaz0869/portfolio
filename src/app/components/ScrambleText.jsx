import { useRef, useEffect } from "react";

// Reveals text with a "decoding" scramble effect after an optional delay.
export default function ScrambleText({ text, className = "", style = {}, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@%&*<>/|";
    let raf, start;
    const duration = 1400;
    const reveal = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const revealCount = Math.floor(p * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        if (i < revealCount || text[i] === " ") out += text[i];
        else out += chars[Math.floor(Math.random() * chars.length)];
      }
      el.textContent = out;
      if (p < 1) raf = requestAnimationFrame(reveal);
      else el.textContent = text;
    };
    const t = setTimeout(() => { raf = requestAnimationFrame(reveal); }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [text, delay]);
  return <span ref={ref} className={className} style={style}>{text}</span>;
}

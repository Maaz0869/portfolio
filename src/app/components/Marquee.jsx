import { MARQUEE_ITEMS } from "../data/portfolio";

// Infinite horizontally-scrolling tech-stack ticker.
export default function Marquee() {
  return (
    <div className="overflow-hidden border-y py-4 select-none"
      style={{ borderColor:"rgba(124,77,255,0.2)", background:"rgba(124,77,255,0.04)" }}>
      <div className="flex gap-0" style={{ animation:"marquee 25s linear infinite", width:"max-content" }}>
        {[...MARQUEE_ITEMS,...MARQUEE_ITEMS,...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-6 font-mono text-xs tracking-widest"
            style={{ color: i%3===0?"#e040fb":i%3===1?"#7c4dff":"#00bcd4" }}>
            <span className="opacity-40">◆</span> {item}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-33.33%)} }`}</style>
    </div>
  );
}

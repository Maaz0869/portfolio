import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";
import { Menu, X } from "lucide-react";
import MagBtn from "./MagBtn";
import { NAV } from "../data/portfolio";

// Sticky top navigation with active-section highlight + mobile menu.
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const ref = useRef(null);

  useEffect(() => {
    const fn = () => {
      setScrolled(scrollY > 50);
      const y = scrollY + 100;
      for(let i=NAV.length-1;i>=0;i--) {
        const el = document.getElementById(NAV[i].toLowerCase());
        if(el && el.offsetTop <= y) { setActive(NAV[i]); break; }
      }
    };
    window.addEventListener("scroll", fn, {passive:true});
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useLayoutEffect(() => {
    if (ref.current) gsap.from(ref.current, { y:-70, opacity:0, duration:0.9, ease:"expo.out", delay:2.2 });
  }, []);

  const go = (id) => { document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth"}); setOpen(false); };

  return (
    <header ref={ref} className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ borderBottom: scrolled?"1px solid rgba(124,77,255,0.2)":"none",
        background: scrolled?"rgba(4,2,13,0.92)":"transparent",
        backdropFilter: scrolled?"blur(20px)":"none" }}>
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => go("home")} className="font-mono text-sm font-bold tracking-widest"
          style={{background:"linear-gradient(90deg,#e040fb,#7c4dff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>
          {"<Maaz.Dev />"}
        </button>
        <ul className="hidden md:flex items-center gap-8">
          {NAV.map(l => (
            <li key={l}>
              <button onClick={() => go(l)} className="font-mono text-xs tracking-widest uppercase relative transition-colors"
                style={{color: active===l?"#e040fb":"rgba(255,255,255,0.5)"}}>
                {l}
                {active===l && <span className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{background:"linear-gradient(90deg,#e040fb,transparent)"}} />}
              </button>
            </li>
          ))}
          <li>
            <MagBtn onClick={() => go("contact")}
              className="font-mono text-xs tracking-widest font-bold px-5 py-2 text-white"
              style={{background:"linear-gradient(135deg,#e040fb,#7c4dff)"}}>
              Hire Me
            </MagBtn>
          </li>
        </ul>
        <button onClick={() => setOpen(!open)} className="md:hidden" style={{color:"#e040fb"}}>
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </nav>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4"
          style={{background:"rgba(4,2,13,0.97)", borderTop:"1px solid rgba(124,77,255,0.2)"}}>
          {NAV.map(l => (
            <button key={l} onClick={() => go(l)}
              className="font-mono text-xs tracking-widest uppercase text-left"
              style={{color:"rgba(255,255,255,0.5)"}}>
              {l}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

import { useRef, useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";
import { ArrowUpRight, Check } from "lucide-react";
import TiltCard from "../components/TiltCard";
import MagBtn from "../components/MagBtn";
import { ABOUT, IMG_PROFILE } from "../data/portfolio";

// About Me — profile picture + personal story + quick facts.
export default function About() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-head", { y:50, opacity:0, duration:0.9,
        scrollTrigger:{trigger:".about-head", start:"top 85%"} });
      gsap.from(".about-img", { x:-60, opacity:0, duration:1, ease:"expo.out",
        scrollTrigger:{trigger:".about-img", start:"top 80%"} });
      gsap.from(".about-copy > *", { y:40, opacity:0, stagger:0.12, duration:0.8, ease:"power3.out",
        scrollTrigger:{trigger:".about-copy", start:"top 82%"} });
      gsap.from(".about-fact", { y:24, opacity:0, stagger:0.08, duration:0.6,
        scrollTrigger:{trigger:".about-facts", start:"top 88%"} });
    }, ref);
    return () => ctx.revert();
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  return (
    <section ref={ref} id="about" className="relative py-28 overflow-hidden"
      style={{borderTop:"1px solid rgba(124,77,255,0.12)"}}>
      <div className="absolute inset-0 pointer-events-none"
        style={{background:"radial-gradient(ellipse at 30% 0%, rgba(224,64,251,0.08) 0%, transparent 60%)"}} />
      {/* big bg number */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-black select-none pointer-events-none"
        style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(150px,22vw,380px)",
          opacity:0.025, color:"#e040fb", userSelect:"none"}}>01</div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="about-head mb-16">
          <div className="font-mono text-xs tracking-[0.3em] mb-4" style={{color:"#e040fb"}}>01 / WHO I AM</div>
          <h2 className="font-black" style={{fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(48px,8vw,100px)", letterSpacing:"0.04em",
            background:"linear-gradient(135deg,#e040fb,#7c4dff,#00bcd4)", backgroundSize:"200% auto",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"textShine 6s linear infinite"}}>
            ABOUT ME
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* ── Picture ─────────────────────────────────────────── */}
          <div className="about-img">
            <TiltCard>
              <div className="relative overflow-hidden group"
                style={{border:"1px solid rgba(124,77,255,0.3)"}}>
                <img src={IMG_PROFILE} alt="Maaz Khan"
                  className="w-full h-[460px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  style={{filter:"saturate(0.7) contrast(1.1)"}} />
                {/* color grade */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{background:"linear-gradient(135deg, rgba(224,64,251,0.18) 0%, rgba(124,77,255,0.12) 50%, rgba(0,188,212,0.1) 100%)", mixBlendMode:"color"}} />
                {/* bottom fade + tag */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{background:"linear-gradient(to top, rgba(4,2,13,0.95) 0%, transparent 45%)"}} />
                <div className="absolute bottom-5 left-5 font-mono text-xs tracking-widest px-3 py-2"
                  style={{background:"rgba(4,2,13,0.7)", border:"1px solid rgba(224,64,251,0.45)", color:"#e040fb", backdropFilter:"blur(10px)"}}>
                  MERN STACK DEVELOPER
                </div>
              </div>
            </TiltCard>
          </div>

          {/* ── Story + facts ───────────────────────────────────── */}
          <div>
            <div className="about-copy space-y-5">
              {ABOUT.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed"
                  style={{fontFamily:"'Outfit',sans-serif", color:"rgba(240,234,255,0.65)"}}>
                  {p}
                </p>
              ))}
            </div>

            {/* quick facts grid */}
            <div className="about-facts grid sm:grid-cols-2 gap-3 mt-8">
              {ABOUT.facts.map((f) => (
                <div key={f.label} className="about-fact flex items-center gap-3 border px-4 py-3"
                  style={{borderColor:"rgba(124,77,255,0.2)", background:"rgba(124,77,255,0.05)"}}>
                  <Check size={14} style={{color:"#69f0ae", flexShrink:0}} />
                  <span className="font-mono text-xs tracking-wider" style={{color:"rgba(167,139,250,0.6)"}}>{f.label}:</span>
                  <span className="text-sm font-semibold text-white truncate" style={{fontFamily:"'Outfit',sans-serif"}}>{f.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <MagBtn onClick={() => go("contact")}
                className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white"
                style={{fontFamily:"'Outfit',sans-serif", background:"linear-gradient(135deg,#e040fb,#7c4dff)"}}>
                Let's Work Together <ArrowUpRight size={16} />
              </MagBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

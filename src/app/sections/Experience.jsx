import { useRef, useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";
import Counter from "../components/Counter";
import { IMG_WORKSPACE, EXPERIENCE } from "../data/portfolio";

// Career timeline with animated reveal + workspace mockup.
export default function Experience() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-head", { y:50, opacity:0, duration:0.9,
        scrollTrigger:{trigger:".exp-head", start:"top 85%"} });
      gsap.from(".exp-line", { scaleY:0, transformOrigin:"top", duration:1.4, ease:"power2.out",
        scrollTrigger:{trigger:".exp-line", start:"top 80%"} });
      gsap.utils.toArray(".exp-item").forEach((el,i) => {
        gsap.from(el, { x:-50, opacity:0, duration:0.8, delay:i*0.15, ease:"power3.out",
          scrollTrigger:{trigger:el, start:"top 86%"} });
      });
      gsap.from(".exp-img", { x:60, opacity:0, duration:1, ease:"expo.out",
        scrollTrigger:{trigger:".exp-img", start:"top 80%"} });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="experience" className="py-28 relative overflow-hidden"
      style={{borderTop:"1px solid rgba(124,77,255,0.12)"}}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 font-black select-none pointer-events-none"
        style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(150px,22vw,380px)",
          opacity:0.025, color:"#00bcd4", userSelect:"none"}}>04</div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="exp-head mb-16">
          <div className="font-mono text-xs tracking-[0.3em] mb-4" style={{color:"#00bcd4"}}>04 / JOURNEY</div>
          <h2 className="font-black" style={{fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(48px,8vw,100px)", letterSpacing:"0.04em"}}>MY JOURNEY</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="relative pl-8">
            <div className="exp-line absolute left-0 top-0 bottom-0 w-px"
              style={{background:"linear-gradient(to bottom,#e040fb,#7c4dff,#00bcd4)"}} />
            {EXPERIENCE.map((j) => (
              <div key={j.company} className="exp-item relative pb-12 last:pb-0">
                <div className="absolute -left-[13px] top-1 w-6 h-6 flex items-center justify-center border-2"
                  style={{borderColor:j.color, background:"#04020d"}}>
                  <div className="w-2 h-2" style={{background:j.color}} />
                </div>
                <div className="font-mono text-xs tracking-widest mb-1" style={{color:j.color}}>{j.period}</div>
                <h3 className="text-2xl font-black mb-1" style={{fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.05em"}}>{j.role}</h3>
                <div className="font-mono text-xs mb-3 uppercase tracking-wider" style={{color:"rgba(167,139,250,0.55)"}}>@ {j.company}</div>
                <p className="text-sm leading-relaxed" style={{fontFamily:"'Outfit',sans-serif", color:"rgba(240,234,255,0.55)"}}>{j.desc}</p>
              </div>
            ))}
          </div>

          <div className="exp-img relative">
            <div className="border overflow-hidden" style={{borderColor:"rgba(124,77,255,0.2)"}}>
              <div className="flex items-center gap-2 px-4 py-3" style={{background:"#0e0a1f", borderBottom:"1px solid rgba(124,77,255,0.15)"}}>
                <span className="w-3 h-3 rounded-full bg-red-500/60"/><span className="w-3 h-3 rounded-full bg-yellow-500/60"/><span className="w-3 h-3 rounded-full" style={{background:"#69f0ae99"}}/>
                <span className="font-mono text-xs ml-2" style={{color:"rgba(167,139,250,0.5)"}}>workspace.png</span>
              </div>
              <div className="relative" style={{aspectRatio:"16/9", background:"#0e0a1f"}}>
                <img src={IMG_WORKSPACE} alt="Coding workspace"
                  className="w-full h-full object-cover" style={{opacity:0.65, filter:"saturate(0.5)"}} />
                <div className="absolute inset-0"
                  style={{background:"linear-gradient(135deg,rgba(124,77,255,0.3),rgba(0,188,212,0.2))", mixBlendMode:"color"}} />
                <div className="absolute inset-0"
                  style={{background:"linear-gradient(to top, #04020d 0%, transparent 50%)"}} />
              </div>
            </div>

            {/* floating cards */}
            <div className="absolute -bottom-5 -left-5 px-5 py-4 border"
              style={{background:"rgba(4,2,13,0.9)", borderColor:"rgba(224,64,251,0.4)", backdropFilter:"blur(12px)"}}>
              <div className="font-mono text-xs mb-1" style={{color:"rgba(167,139,250,0.6)"}}>Lines written</div>
              <div className="font-black text-2xl" style={{fontFamily:"'Bebas Neue',sans-serif", color:"#e040fb"}}>
                <Counter to={500} suffix="K+" />
              </div>
            </div>
            <div className="absolute -top-5 -right-5 px-5 py-4 border"
              style={{background:"rgba(4,2,13,0.9)", borderColor:"rgba(124,77,255,0.4)", backdropFilter:"blur(12px)"}}>
              <div className="font-mono text-xs mb-1" style={{color:"rgba(167,139,250,0.6)"}}>Coffee cups</div>
              <div className="font-black text-2xl" style={{fontFamily:"'Bebas Neue',sans-serif", color:"#7c4dff"}}>∞</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

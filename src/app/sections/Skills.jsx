import { useRef, useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";
import { Zap } from "lucide-react";
import TiltCard from "../components/TiltCard";
import { SKILLS } from "../data/portfolio";
import { spotMove, spotClear } from "../lib/cardSpotlight";

// Tech-stack grid with tilt cards, cursor spotlight + animated proficiency bars.
export default function Skills() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-head", { y:50, opacity:0, duration:0.9,
        scrollTrigger:{trigger:".skill-head", start:"top 85%"} });
      gsap.from(".skill-card", { y:70, opacity:0, stagger:0.13, duration:0.85, ease:"back.out(1.3)",
        scrollTrigger:{trigger:".skill-card", start:"top 82%"} });
      gsap.utils.toArray(".skill-bar").forEach((bar) => {
        gsap.to(bar, { width: bar.dataset.level + "%", duration:1.4, ease:"power3.out",
          scrollTrigger:{trigger:bar, start:"top 92%"} });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="skills" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{background:"radial-gradient(ellipse at 50% 0%, rgba(124,77,255,0.1) 0%, transparent 60%)"}} />
      {/* big bg number */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 font-black select-none pointer-events-none"
        style={{fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(150px,22vw,380px)",
          opacity:0.025, color:"#7c4dff", userSelect:"none"}}>02</div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="skill-head text-center mb-16">
          <div className="font-mono text-xs tracking-[0.3em] mb-4" style={{color:"#7c4dff"}}>02 / EXPERTISE</div>
          <h2 className="font-black" style={{fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(48px,8vw,100px)", letterSpacing:"0.04em",
            background:"linear-gradient(135deg,#e040fb,#7c4dff,#00bcd4)", backgroundSize:"200% auto",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"textShine 6s linear infinite"}}>
            TECH STACK
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((g) => (
            <TiltCard key={g.category} className="skill-card">
              <div className="relative border bg-card p-6 h-full overflow-hidden group transition-all duration-500"
                style={{borderColor:`${g.color}25`}}
                onMouseEnter={e => gsap.to(e.currentTarget, {borderColor:g.color+"60", duration:0.3})}
                onMouseMove={spotMove}
                onMouseLeave={e => { gsap.to(e.currentTarget, {borderColor:g.color+"25", duration:0.3}); spotClear(e); }}>

                {/* glow blob */}
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{background:`radial-gradient(circle, ${g.color}30, transparent 70%)`, filter:"blur(20px)"}} />

                {/* cursor spotlight */}
                <div className="card-spot absolute inset-0 pointer-events-none" style={{background:"transparent"}} />

                <div className="relative z-10">
                  <div className="w-11 h-11 flex items-center justify-center mb-5 border"
                    style={{borderColor:`${g.color}40`, background:`${g.color}12`}}>
                    <g.icon size={20} style={{color:g.color}} />
                  </div>
                  <div className="font-bold text-sm tracking-wide mb-4" style={{fontFamily:"'Outfit',sans-serif", color:g.color}}>
                    {g.category}
                  </div>
                  <div className="space-y-2">
                    {g.items.map(item => (
                      <div key={item} className="flex items-center gap-2 font-mono text-xs" style={{color:"rgba(240,234,255,0.55)"}}>
                        <Zap size={9} style={{color:g.color}} />{item}
                      </div>
                    ))}
                  </div>

                  {/* animated proficiency bar */}
                  <div className="mt-5">
                    <div className="flex justify-between font-mono text-[10px] mb-1.5" style={{color:`${g.color}cc`}}>
                      <span>PROFICIENCY</span><span>{g.level}%</span>
                    </div>
                    <div className="h-1 w-full overflow-hidden" style={{background:"rgba(255,255,255,0.07)"}}>
                      <div className="skill-bar h-full" data-level={g.level}
                        style={{width:0, background:`linear-gradient(90deg,${g.color},${g.color}55)`}} />
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { Github, ExternalLink } from "lucide-react";
import TiltCard from "../components/TiltCard";
import { PROJECTS } from "../data/portfolio";
import { spotMove, spotClear } from "../lib/cardSpotlight";

// Featured projects in a pinned GSAP horizontal-scroll strip.
export default function Projects() {
  const sectionRef  = useRef(null);
  const pinWrapRef  = useRef(null);   // the pinned container
  const trackRef    = useRef(null);   // horizontal track

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // head fade in
      gsap.from(".proj-head", { y:50, opacity:0, duration:0.9,
        scrollTrigger:{ trigger:".proj-head", start:"top 85%" } });

      // ── GSAP Horizontal scroll pin ──────────────────────────────────
      const cards = gsap.utils.toArray(".hcard");
      const totalScroll = () => trackRef.current.scrollWidth - window.innerWidth;

      // Keep animation separate so containerAnimation can reference it
      const hAnim = gsap.to(trackRef.current, {
        x: () => -totalScroll(),
        ease: "none",
        paused: true,
      });

      ScrollTrigger.create({
        trigger: pinWrapRef.current,
        start: "top top",
        end: () => `+=${totalScroll()}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        animation: hAnim,
        invalidateOnRefresh: true,
      });

      // cards entrance — simple scroll-based reveal, no containerAnimation needed
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 60, opacity: 0, duration: 0.7, delay: i * 0.06,
          scrollTrigger: {
            trigger: card,
            containerAnimation: hAnim,
            start: "left 95%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // project counter
      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: hAnim,
          start: "left 55%",
          end: "right 55%",
          onEnter: () => {
            const el = document.getElementById("proj-counter");
            if (el) el.textContent = `0${i + 1} / 0${cards.length}`;
          },
          onEnterBack: () => {
            const el = document.getElementById("proj-counter");
            if (el) el.textContent = `0${i + 1} / 0${cards.length}`;
          },
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative"
      style={{ borderTop:"1px solid rgba(124,77,255,0.12)" }}>

      {/* ── Section header (outside pin so it scrolls away) ── */}
      <div className="proj-head max-w-6xl mx-auto px-6 pt-28 pb-14 flex items-end justify-between">
        <div>
          <div className="font-mono text-xs tracking-[0.3em] mb-4" style={{ color:"#e040fb" }}>03 / WORK</div>
          <h2 className="font-black" style={{ fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(48px,8vw,100px)", letterSpacing:"0.04em" }}>
            FEATURED PROJECTS
          </h2>
        </div>
        <div id="proj-counter" className="hidden md:block font-mono text-4xl font-black pb-2"
          style={{ fontFamily:"'Bebas Neue',sans-serif", color:"rgba(224,64,251,0.25)", letterSpacing:"0.08em" }}>
          01 / 04
        </div>
      </div>

      {/* ── Pinned horizontal strip ── */}
      <div ref={pinWrapRef} className="relative overflow-hidden" style={{ height:"100vh" }}>

        {/* scroll hint */}
        <div className="absolute bottom-8 right-8 z-20 font-mono text-xs tracking-widest flex items-center gap-2"
          style={{ color:"rgba(167,139,250,0.45)" }}>
          <span>SCROLL TO EXPLORE</span>
          <span style={{ animation:"bounceX 1.2s ease-in-out infinite" }}>→</span>
        </div>

        {/* horizontal track */}
        <div ref={trackRef}
          className="flex items-center gap-8 h-full"
          style={{ paddingLeft:"6vw", paddingRight:"6vw", width:"max-content" }}>

          {PROJECTS.map((p) => {
            const primary = p.link || p.github;   // whole-card click target
            return (
            <div key={p.title} className="hcard shrink-0"
              style={{ width:"min(420px, 85vw)" }}>
              <TiltCard>
                <div className="relative border bg-card overflow-hidden flex flex-col group"
                  style={{ borderColor:"rgba(124,77,255,0.2)", height:"520px", cursor: primary ? "pointer" : "default" }}
                  onClick={() => { if (primary) window.open(primary, "_blank", "noopener,noreferrer"); }}
                  onMouseEnter={e => gsap.to(e.currentTarget,{ borderColor:`${p.color}55`, duration:0.3 })}
                  onMouseMove={spotMove}
                  onMouseLeave={e => { gsap.to(e.currentTarget,{ borderColor:"rgba(124,77,255,0.2)", duration:0.3 }); spotClear(e); }}>

                  {/* cursor spotlight */}
                  <div className="card-spot absolute inset-0 z-20 pointer-events-none" style={{background:"transparent", mixBlendMode:"soft-light"}} />

                  {/* image top */}
                  <div className="relative overflow-hidden shrink-0" style={{ height:"240px", background:"#0e0a1f" }}>
                    <img src={p.img} alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      style={{ opacity:0.65 }} />
                    <div className="absolute inset-0"
                      style={{ background:`linear-gradient(140deg,${p.color}45 0%,rgba(4,2,13,0.65) 100%)` }} />
                    <div className="absolute inset-0"
                      style={{ background:"linear-gradient(to top,#0e0a1f 0%,transparent 50%)" }} />

                    <span className="absolute top-4 left-4 font-mono text-xs tracking-widest px-3 py-1.5"
                      style={{ background:"rgba(4,2,13,0.82)", border:`1px solid ${p.color}45`, color:p.color, backdropFilter:"blur(10px)" }}>
                      {p.tag}
                    </span>
                    <div className="absolute top-4 right-4 flex gap-2">
                      {[{Icon:Github, url:p.github}, {Icon:ExternalLink, url:p.link}]
                        .filter(b => b.url)
                        .map(({Icon, url}, i) => (
                          <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="w-9 h-9 flex items-center justify-center transition-colors"
                            style={{ background:"rgba(4,2,13,0.75)", border:"1px solid rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", color:"rgba(255,255,255,0.75)" }}
                            onMouseEnter={e => gsap.to(e.currentTarget,{ color:p.color, borderColor:`${p.color}55`, duration:0.2 })}
                            onMouseLeave={e => gsap.to(e.currentTarget,{ color:"rgba(255,255,255,0.75)", borderColor:"rgba(255,255,255,0.15)", duration:0.2 })}>
                            <Icon size={14}/>
                          </a>
                      ))}
                    </div>
                  </div>

                  {/* content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-black text-3xl mb-3 transition-colors duration-200"
                      style={{ fontFamily:"'Bebas Neue',sans-serif", letterSpacing:"0.06em" }}
                      onMouseEnter={e => gsap.to(e.currentTarget,{ color:p.color, duration:0.2 })}
                      onMouseLeave={e => gsap.to(e.currentTarget,{ color:"#f0eaff", duration:0.2 })}>
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1 mb-5"
                      style={{ fontFamily:"'Outfit',sans-serif", color:"rgba(240,234,255,0.55)" }}>
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map(t => (
                        <span key={t} className="font-mono text-xs px-2.5 py-1"
                          style={{ background:`${p.color}12`, border:`1px solid ${p.color}30`, color:p.color }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
            );
          })}

          {/* End card */}
          <div className="hcard shrink-0 flex items-center justify-center"
            style={{ width:"280px", height:"520px" }}>
            <div className="text-center">
              <div className="font-black text-7xl mb-4" style={{ fontFamily:"'Bebas Neue',sans-serif",
                background:"linear-gradient(135deg,#e040fb,#7c4dff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                MORE
              </div>
              <div className="font-mono text-xs tracking-widest mb-6" style={{ color:"rgba(167,139,250,0.5)" }}>PROJECTS ON GITHUB</div>
              <a href="#" className="inline-flex items-center gap-2 font-mono text-xs px-5 py-3 tracking-widest"
                style={{ border:"1px solid rgba(224,64,251,0.35)", color:"#e040fb" }}>
                <Github size={14}/> VIEW ALL
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes bounceX { 0%,100%{transform:translateX(0)} 50%{transform:translateX(6px)} }`}</style>
    </section>
  );
}

import { useRef, useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";
import { ArrowUpRight, Download } from "lucide-react";
import Particles from "../components/Particles";
import GlitchText from "../components/GlitchText";
import ScrambleText from "../components/ScrambleText";
import MagBtn from "../components/MagBtn";
import Counter from "../components/Counter";
import { IMG_PROFILE } from "../data/portfolio";
import cvFile from "../../assets/maaz-cv.pdf";

// Landing hero — animated intro, parallax profile image, stats.
export default function Hero() {
  const sectionRef = useRef(null);
  const imgRef     = useRef(null);
  const textColRef = useRef(null);
  const overlayRef = useRef(null);
  const revealRef  = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── 1. Entrance: picture reveals from clip-path ──────────────────
      const enter = gsap.timeline({ delay: 2.0, defaults:{ ease:"expo.out" } });

      // the image clip reveals bottom-to-top
      enter
        .fromTo(revealRef.current,
          { clipPath:"inset(100% 0% 0% 0%)" },
          { clipPath:"inset(0% 0% 0% 0%)", duration:1.2, ease:"expo.inOut" })
        .from(".hero-line",  { y:"110%", duration:1, stagger:0.1 }, "-=0.8")
        .from(".hero-info",  { y:30, opacity:0, duration:0.8 },     "-=0.5")
        .from(".hero-stat",  { y:20, opacity:0, stagger:0.08, duration:0.6 }, "-=0.4");

      // ── 2. Floating loop on the image ────────────────────────────────
      gsap.to(imgRef.current, {
        y: -18, duration: 4, repeat: -1, yoyo: true,
        ease: "sine.inOut", delay: 3.5,
      });

      // ── 3. ScrollTrigger SCRUB — cinematic parallax ──────────────────
      //   Picture slides UP faster than scroll → depth illusion
      gsap.to(imgRef.current, {
        yPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      //   Text column drifts left & fades
      gsap.to(textColRef.current, {
        x: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "30% top",
          end: "85% top",
          scrub: 1.5,
        },
      });

      //   Dark overlay fades in over image as we scroll away
      gsap.to(overlayRef.current, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "40% top",
          end: "bottom top",
          scrub: true,
        },
      });

      // glow handled via CSS animation on .img-frame

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });

  const downloadCV = () => {
    const a = document.createElement("a");
    a.href = cvFile;
    a.download = "Maaz-Khan-CV.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <section ref={sectionRef} id="home"
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background:"radial-gradient(ellipse at 70% 40%, rgba(124,77,255,0.1) 0%, transparent 55%)" }}>

      <Particles />

      {/* ── Full-bleed profile image (RIGHT BG) ───────────────────── */}
      <div ref={revealRef}
        className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] overflow-hidden"
        style={{ zIndex:1 }}>
        <img
          ref={imgRef}
          src={IMG_PROFILE}
          alt="Maaz Khan — MERN Stack Developer"
          className="w-full h-[120%] object-cover object-top"
          style={{
            filter: "saturate(0.55) contrast(1.15) brightness(0.9)",
            transformOrigin: "center top",
          }}
        />
        {/* Left gradient — fades image into dark BG */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"linear-gradient(to right, #04020d 0%, rgba(4,2,13,0.85) 25%, rgba(4,2,13,0.3) 55%, transparent 100%)" }} />
        {/* Bottom fade */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"linear-gradient(to top, #04020d 0%, transparent 45%)" }} />
        {/* Purple color grade */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"linear-gradient(135deg, rgba(224,64,251,0.18) 0%, rgba(124,77,255,0.15) 50%, rgba(0,188,212,0.1) 100%)", mixBlendMode:"color" }} />
        {/* Dark scroll overlay */}
        <div ref={overlayRef} className="absolute inset-0 pointer-events-none" style={{ opacity:0, background:"rgba(4,2,13,0.7)" }} />

        {/* Floating badges ON the image */}
        <div className="absolute top-28 right-6 font-mono text-xs px-3 py-2 tracking-widest"
          style={{ background:"rgba(4,2,13,0.75)", border:"1px solid rgba(224,64,251,0.45)", color:"#e040fb", backdropFilter:"blur(12px)" }}>
          FULL-STACK DEV
        </div>
        <div className="absolute bottom-28 right-6 px-4 py-3 border"
          style={{ background:"rgba(4,2,13,0.8)", borderColor:"rgba(124,77,255,0.4)", backdropFilter:"blur(12px)" }}>
          <div className="font-mono text-xs mb-1" style={{ color:"rgba(167,139,250,0.6)" }}>Currently</div>
          <div className="text-sm font-semibold text-white" style={{ fontFamily:"'Outfit',sans-serif" }}>Learning MERN Stack</div>
        </div>
      </div>

      {/* ── Left: Text column ─────────────────────────────────────── */}
      <div ref={textColRef} className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-20">
        <div className="max-w-xl">

          {/* available pill */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 font-mono text-xs tracking-widest"
            style={{ border:"1px solid rgba(224,64,251,0.3)", background:"rgba(224,64,251,0.07)", color:"#e040fb" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            AVAILABLE FOR HIRE — 2026
          </div>

          {/* Name — giant slide-up lines */}
          <div className="mb-5">
            <div className="overflow-hidden leading-none">
              <div className="hero-line" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(72px,13vw,140px)", letterSpacing:"0.03em" }}>
                <GlitchText text="MAAZ" />
              </div>
            </div>
            <div className="overflow-hidden leading-none">
              <div className="hero-line" style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(72px,13vw,140px)", letterSpacing:"0.03em", WebkitTextStroke:"2px #7c4dff", color:"transparent" }}>
                KHAN
              </div>
            </div>
            <div className="overflow-hidden mt-3">
              <div className="hero-line flex items-center gap-3">
                <div className="h-px w-12" style={{ background:"linear-gradient(90deg,#e040fb,transparent)" }} />
                <ScrambleText text="MERN STACK DEVELOPER" delay={2600} className="font-mono text-xs tracking-[0.22em]" style={{ color:"#7c4dff" }} />
              </div>
            </div>
          </div>

          <div className="hero-info">
            <p className="text-base leading-relaxed max-w-sm mb-8" style={{ fontFamily:"'Outfit',sans-serif", color:"rgba(240,234,255,0.62)" }}>
              I engineer scalable web apps end-to-end — MongoDB to React. Clean architecture, real performance, shipped on time.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <MagBtn onClick={() => go("projects")}
                className="flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white"
                style={{ fontFamily:"'Outfit',sans-serif", background:"linear-gradient(135deg,#e040fb,#7c4dff)" }}>
                View Projects <ArrowUpRight size={16} />
              </MagBtn>
              <MagBtn onClick={downloadCV} className="flex items-center gap-2 px-8 py-4 text-sm font-semibold"
                style={{ fontFamily:"'Outfit',sans-serif", border:"1px solid rgba(124,77,255,0.4)", color:"#a78bfa" }}>
                <Download size={16} /> Download CV
              </MagBtn>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 flex-wrap">
              {[{n:4,s:"",l:"Projects"},{n:4,s:"",l:"Tech (MERN)"},{n:100,s:"%",l:"Dedication"}].map(s => (
                <div key={s.l} className="hero-stat">
                  <div className="text-3xl font-black" style={{ fontFamily:"'Bebas Neue',sans-serif", color:"#e040fb", letterSpacing:"0.04em" }}>
                    <Counter to={s.n} suffix={s.s} />
                  </div>
                  <div className="font-mono text-xs tracking-widest" style={{ color:"rgba(167,139,250,0.55)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MERN pills — bottom left, over image */}
        <div className="absolute bottom-10 left-6 hidden lg:flex gap-2">
          {[{t:"MongoDB",c:"#69f0ae"},{t:"Express.js",c:"#7c4dff"},{t:"React.js",c:"#00bcd4"},{t:"Node.js",c:"#e040fb"}].map(p => (
            <div key={p.t} className="font-mono text-xs px-3 py-1.5"
              style={{ border:`1px solid ${p.c}35`, background:`${p.c}12`, color:p.c, backdropFilter:"blur(8px)" }}>
              {p.t}
            </div>
          ))}
        </div>
      </div>

      {/* CSS glow pulse on image panel */}
      <style>{`@keyframes glowPulse{0%,100%{box-shadow:inset 0 0 0 0 rgba(224,64,251,0)}50%{box-shadow:inset 0 0 40px 0 rgba(224,64,251,0.12)}}`}</style>
    </section>
  );
}

import { useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";
import { Github, Linkedin, Mail } from "lucide-react";
import { SOCIALS } from "../data/portfolio";

// Fixed vertical social links dock on the left edge (desktop only).
export default function SocialDock() {
  useLayoutEffect(() => {
    gsap.from(".dock-item", { y:30, autoAlpha:0, stagger:0.12, duration:0.7, ease:"back.out(1.6)", delay:3 });
  }, []);
  const items = [
    { Icon: Github, href: SOCIALS.github, label:"GitHub" },
    { Icon: Linkedin, href: SOCIALS.linkedin, label:"LinkedIn" },
    { Icon: Mail, href: `mailto:${SOCIALS.email}`, label:"Email" },
  ];
  return (
    <div className="fixed left-5 bottom-0 z-40 hidden lg:flex flex-col items-center gap-4">
      {items.map(({ Icon, href, label }) => (
        <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"
          className="dock-item w-10 h-10 flex items-center justify-center border transition-colors duration-300"
          style={{ borderColor:"rgba(124,77,255,0.25)", background:"rgba(14,10,31,0.6)", color:"rgba(167,139,250,0.7)", backdropFilter:"blur(8px)" }}
          onMouseEnter={e => gsap.to(e.currentTarget, { y:-4, borderColor:"#e040fb", color:"#e040fb", duration:0.25 })}
          onMouseLeave={e => gsap.to(e.currentTarget, { y:0, borderColor:"rgba(124,77,255,0.25)", color:"rgba(167,139,250,0.7)", duration:0.25 })}>
          <Icon size={16} />
        </a>
      ))}
      <div className="dock-item w-px h-24" style={{ background:"linear-gradient(to bottom,#7c4dff,transparent)" }} />
    </div>
  );
}

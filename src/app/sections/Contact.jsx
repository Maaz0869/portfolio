import { useRef, useState, useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";
import { Mail, Phone, MapPin, Github, Linkedin, ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import MagBtn from "../components/MagBtn";
import { SOCIALS, WEB3FORMS_KEY } from "../data/portfolio";

// Contact section — info cards + a working message form (emails via Web3Forms).
export default function Contact() {
  const ref = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", `Portfolio message: ${data.get("subject") || "New message"}`);
    data.append("from_name", "Maaz Khan Portfolio");
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) { setStatus("success"); form.reset(); }
      else { setStatus("error"); setErrorMsg(json.message || "Unknown error"); }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err?.message || "Network error");
    }
  };
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-head", { y:50, opacity:0, duration:0.9,
        scrollTrigger:{trigger:".contact-head", start:"top 85%"} });
      gsap.from(".contact-info", { x:-50, opacity:0, duration:0.9, ease:"expo.out",
        scrollTrigger:{trigger:".contact-info", start:"top 82%"} });
      gsap.from(".contact-form", { x:50, opacity:0, duration:0.9, ease:"expo.out",
        scrollTrigger:{trigger:".contact-form", start:"top 82%"} });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="contact" className="py-28 relative overflow-hidden"
      style={{borderTop:"1px solid rgba(124,77,255,0.12)"}}>
      <div className="absolute inset-0 pointer-events-none"
        style={{background:"radial-gradient(ellipse at 50% 100%, rgba(224,64,251,0.1) 0%, transparent 60%)"}} />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="contact-head text-center mb-16">
          <div className="font-mono text-xs tracking-[0.3em] mb-4" style={{color:"#e040fb"}}>05 / CONTACT</div>
          <h2 className="font-black" style={{fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(48px,8vw,100px)", letterSpacing:"0.04em",
            background:"linear-gradient(135deg,#e040fb,#7c4dff,#00bcd4)", backgroundSize:"200% auto",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"textShine 6s linear infinite"}}>
            LET&apos;S BUILD TOGETHER
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="contact-info space-y-4">
            {[
              {icon:Mail, label:"Email", val:SOCIALS.email, href:`mailto:${SOCIALS.email}`, c:"#e040fb", ext:false},
              {icon:Phone, label:"Phone", val:SOCIALS.phone, href:`tel:+92${SOCIALS.phone.replace(/^0/, "")}`, c:"#7c4dff", ext:false},
              {icon:Linkedin, label:"LinkedIn", val:"linkedin.com/in/maaz-khan", href:SOCIALS.linkedin, c:"#7c4dff", ext:true},
              {icon:Github, label:"GitHub", val:"github.com/Maaz0869", href:SOCIALS.github, c:"#69f0ae", ext:true},
              {icon:MapPin, label:"Location", val:"Pakistan", href:"#", c:"#00bcd4", ext:false},
            ].map(({icon:Icon,label,val,href,c,ext}) => (
              <a key={label} href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 border p-5 transition-all duration-300"
                style={{borderColor:"rgba(124,77,255,0.15)", background:"rgba(14,10,31,0.8)"}}
                onMouseEnter={e => gsap.to(e.currentTarget,{borderColor:c+"50", duration:0.3})}
                onMouseLeave={e => gsap.to(e.currentTarget,{borderColor:"rgba(124,77,255,0.15)", duration:0.3})}>
                <div className="w-12 h-12 flex items-center justify-center border shrink-0 transition-all duration-300"
                  style={{borderColor:`${c}30`, background:`${c}10`}}>
                  <Icon size={18} style={{color:c}} />
                </div>
                <div>
                  <div className="font-mono text-xs tracking-widest mb-0.5" style={{color:"rgba(167,139,250,0.5)"}}>{label}</div>
                  <div className="text-sm font-medium transition-colors" style={{fontFamily:"'Outfit',sans-serif", color:"rgba(240,234,255,0.85)"}}>{val}</div>
                </div>
                <ArrowUpRight size={15} className="ml-auto" style={{color:"rgba(167,139,250,0.3)"}} />
              </a>
            ))}
          </div>

          <div className="contact-form border p-8" style={{borderColor:"rgba(124,77,255,0.2)", background:"rgba(14,10,31,0.8)"}}>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                {[{l:"NAME",n:"name",t:"text",p:"Ali Khan"},{l:"EMAIL",n:"email",t:"email",p:"ali@example.com"}].map(({l,n,t,p}) => (
                  <div key={l}>
                    <label className="font-mono text-xs tracking-widest block mb-2" style={{color:"rgba(167,139,250,0.5)"}}>{l}</label>
                    <input type={t} name={n} placeholder={p} required
                      className="w-full text-sm px-4 py-3 font-mono focus:outline-none transition-colors placeholder:opacity-30"
                      style={{border:"1px solid rgba(124,77,255,0.2)", background:"rgba(4,2,13,0.8)", color:"#f0eaff"}}
                      onFocus={e => gsap.to(e.currentTarget,{borderColor:"#e040fb", duration:0.25})}
                      onBlur={e => gsap.to(e.currentTarget,{borderColor:"rgba(124,77,255,0.2)", duration:0.25})} />
                  </div>
                ))}
              </div>
              <div>
                <label className="font-mono text-xs tracking-widest block mb-2" style={{color:"rgba(167,139,250,0.5)"}}>SUBJECT</label>
                <input type="text" name="subject" placeholder="Project Inquiry"
                  className="w-full text-sm px-4 py-3 font-mono focus:outline-none transition-colors placeholder:opacity-30"
                  style={{border:"1px solid rgba(124,77,255,0.2)", background:"rgba(4,2,13,0.8)", color:"#f0eaff"}}
                  onFocus={e => gsap.to(e.currentTarget,{borderColor:"#e040fb", duration:0.25})}
                  onBlur={e => gsap.to(e.currentTarget,{borderColor:"rgba(124,77,255,0.2)", duration:0.25})} />
              </div>
              <div>
                <label className="font-mono text-xs tracking-widest block mb-2" style={{color:"rgba(167,139,250,0.5)"}}>MESSAGE</label>
                <textarea rows={5} name="message" placeholder="Tell me about your project..." required
                  className="w-full text-sm px-4 py-3 font-mono focus:outline-none resize-none transition-colors placeholder:opacity-30"
                  style={{border:"1px solid rgba(124,77,255,0.2)", background:"rgba(4,2,13,0.8)", color:"#f0eaff"}}
                  onFocus={e => gsap.to(e.currentTarget,{borderColor:"#e040fb", duration:0.25})}
                  onBlur={e => gsap.to(e.currentTarget,{borderColor:"rgba(124,77,255,0.2)", duration:0.25})} />
              </div>
              <MagBtn
                className="w-full py-4 font-bold text-sm text-white flex items-center justify-center gap-2"
                style={{fontFamily:"'Outfit',sans-serif", background:"linear-gradient(135deg,#e040fb,#7c4dff)", opacity: status==="sending"?0.7:1}}>
                {status==="sending"
                  ? <>Sending... <Loader2 size={16} className="animate-spin"/></>
                  : <>Send Message <ArrowUpRight size={16}/></>}
              </MagBtn>

              {status==="success" && (
                <div className="flex items-center gap-2 text-sm font-mono" style={{color:"#69f0ae"}}>
                  <CheckCircle2 size={16}/> Message sent! I&apos;ll get back to you soon.
                </div>
              )}
              {status==="error" && (
                <div className="flex items-start gap-2 text-sm font-mono" style={{color:"#ff5c8a"}}>
                  <AlertCircle size={16} className="shrink-0 mt-0.5"/>
                  <span>{errorMsg || "Something went wrong. Please email me directly."}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

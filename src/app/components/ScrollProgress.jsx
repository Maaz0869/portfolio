import { useRef, useEffect } from "react";

// Thin gradient bar at the top showing page scroll progress.
export default function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - innerHeight) * 100;
      if(ref.current) ref.current.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, {passive:true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[9995] h-[2px]" style={{background:"rgba(255,255,255,0.05)"}}>
      <div ref={ref} className="h-full w-0"
        style={{background:"linear-gradient(90deg,#e040fb,#7c4dff,#00bcd4)", transition:"width 0.05s"}} />
    </div>
  );
}

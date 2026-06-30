import { Code2 } from "lucide-react";

// Page footer with credits.
export default function Footer() {
  return (
    <footer className="py-10" style={{borderTop:"1px solid rgba(124,77,255,0.12)"}}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-mono text-xs" style={{color:"rgba(167,139,250,0.45)"}}>
          © 2026 Maaz Khan — Built with{" "}
          <span style={{color:"#e040fb"}}>React</span> +{" "}
          <span style={{color:"#7c4dff"}}>Node.js</span> +{" "}
          <span style={{color:"#00bcd4"}}>MongoDB</span>
        </div>
        <div className="font-mono text-xs flex items-center gap-2" style={{color:"rgba(167,139,250,0.45)"}}>
          <Code2 size={11} style={{color:"#e040fb"}}/>
          Crafted with passion — Lahore, Pakistan
        </div>
      </div>
    </footer>
  );
}

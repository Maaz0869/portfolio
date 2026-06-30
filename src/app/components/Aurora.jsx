// Slowly drifting glowing gradient blobs behind all content.
export default function Aurora() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute rounded-full"
        style={{ width:"45vw", height:"45vw", top:"-12%", left:"-6%",
          background:"radial-gradient(circle, rgba(224,64,251,0.20), transparent 60%)",
          filter:"blur(70px)", animation:"auroraA 18s ease-in-out infinite" }} />
      <div className="absolute rounded-full"
        style={{ width:"42vw", height:"42vw", top:"28%", right:"-10%",
          background:"radial-gradient(circle, rgba(124,77,255,0.20), transparent 60%)",
          filter:"blur(80px)", animation:"auroraB 22s ease-in-out infinite" }} />
      <div className="absolute rounded-full"
        style={{ width:"40vw", height:"40vw", bottom:"-16%", left:"22%",
          background:"radial-gradient(circle, rgba(0,188,212,0.16), transparent 60%)",
          filter:"blur(80px)", animation:"auroraC 20s ease-in-out infinite" }} />
      <style>{`
        @keyframes auroraA {0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(8vw,6vh) scale(1.1)}}
        @keyframes auroraB {0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-7vw,-5vh) scale(1.15)}}
        @keyframes auroraC {0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(5vw,-7vh) scale(1.1)}}
      `}</style>
    </div>
  );
}

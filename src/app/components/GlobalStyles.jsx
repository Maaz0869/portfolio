// Global CSS injected once — scrollbar, selection, custom-cursor hide, shimmer.
export default function GlobalStyles() {
  return (
    <style>{`
      @keyframes textShine { to { background-position: 200% center; } }
      html { scroll-behavior: smooth; cursor: none; }
      * { cursor: none !important; }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: #04020d; }
      ::-webkit-scrollbar-thumb { background: #2d1f4a; }
      ::-webkit-scrollbar-thumb:hover { background: #e040fb; }
      ::selection { background: rgba(224,64,251,0.25); color: #f0eaff; }
    `}</style>
  );
}

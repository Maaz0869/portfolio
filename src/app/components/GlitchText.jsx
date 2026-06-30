// Text with a chromatic-aberration glitch effect via CSS pseudo-elements.
export default function GlitchText({ text, className = "" }) {
  return (
    <span className={`relative inline-block ${className}`} data-text={text}
      style={{ fontFamily:"'Bebas Neue',sans-serif" }}>
      {text}
      <style>{`
        [data-text="${text}"]::before,[data-text="${text}"]::after {
          content: attr(data-text);
          position: absolute; top:0; left:0;
          width:100%; height:100%;
          background: transparent;
        }
        [data-text="${text}"]::before {
          left: 2px; text-shadow: -1px 0 #e040fb;
          clip-path: polygon(0 30%,100% 30%,100% 50%,0 50%);
          animation: glitch-a 3s infinite linear;
        }
        [data-text="${text}"]::after {
          left: -2px; text-shadow: 1px 0 #00bcd4;
          clip-path: polygon(0 60%,100% 60%,100% 75%,0 75%);
          animation: glitch-b 3.5s infinite linear;
        }
        @keyframes glitch-a {
          0%,90%,100%{transform:translate(0)} 92%{transform:translate(-3px,1px)} 94%{transform:translate(3px,-1px)} 96%{transform:translate(-1px,2px)}
        }
        @keyframes glitch-b {
          0%,85%,100%{transform:translate(0)} 87%{transform:translate(3px,-2px)} 89%{transform:translate(-3px,1px)} 91%{transform:translate(2px,0)}
        }
      `}</style>
    </span>
  );
}

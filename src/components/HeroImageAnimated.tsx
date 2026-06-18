const heroImage = 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=900';

export default function HeroImageAnimated() {
  return (
    <div className="relative w-full select-none" style={{ maxWidth: 560 }}>
      <style>{`
        @keyframes hi-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes hi-glow-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        @keyframes hi-ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes hi-ring-spin-r {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes hi-scan {
          0%   { top: 5%; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 95%; opacity: 0; }
        }
        @keyframes hi-particle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          50%       { transform: translate(var(--pdx), var(--pdy)) scale(1.6); opacity: 1; }
        }
        @keyframes hi-shimmer {
          0%   { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(350%) skewX(-12deg); }
        }
        @keyframes hi-corner-blink {
          0%, 75%, 100% { opacity: 1; }
          88% { opacity: 0.15; }
        }
        @keyframes hi-badge-pop {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px #3b82f6); }
          50%       { transform: scale(1.08); filter: drop-shadow(0 0 22px #60a5fa); }
        }
        @keyframes hi-circuit-dash {
          0%   { stroke-dashoffset: 80; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* Outer ambient glow behind the image */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-10% -8%',
          background: 'radial-gradient(ellipse at 55% 38%, rgba(37,99,235,0.45) 0%, rgba(6,182,212,0.12) 50%, transparent 72%)',
          animation: 'hi-glow-pulse 3.5s ease-in-out infinite',
        }}
      />

      {/* Floating particles */}
      {[
        { top: '8%',  left: '6%',  pdx: '-7px',  pdy: '-10px', delay: '0s',    size: 5,   color: '#60a5fa' },
        { top: '22%', left: '3%',  pdx: '8px',   pdy: '-6px',  delay: '0.6s',  size: 3.5, color: '#06b6d4' },
        { top: '45%', left: '1%',  pdx: '-9px',  pdy: '8px',   delay: '1.1s',  size: 4,   color: '#3b82f6' },
        { top: '68%', left: '5%',  pdx: '6px',   pdy: '-9px',  delay: '0.3s',  size: 3,   color: '#60a5fa' },
        { top: '84%', left: '9%',  pdx: '-5px',  pdy: '9px',   delay: '0.9s',  size: 4.5, color: '#818cf8' },
        { top: '10%', right: '5%', pdx: '9px',   pdy: '-10px', delay: '0.2s',  size: 4,   color: '#60a5fa' },
        { top: '28%', right: '2%', pdx: '-7px',  pdy: '-9px',  delay: '0.8s',  size: 3,   color: '#06b6d4' },
        { top: '52%', right: '4%', pdx: '11px',  pdy: '6px',   delay: '1.3s',  size: 5,   color: '#3b82f6' },
        { top: '76%', right: '7%', pdx: '-9px',  pdy: '-5px',  delay: '0.5s',  size: 3.5, color: '#60a5fa' },
        { top: '90%', left: '18%', pdx: '7px',   pdy: '-13px', delay: '1.0s',  size: 4,   color: '#06b6d4' },
        { top: '90%', right:'18%', pdx: '-7px',  pdy: '-13px', delay: '0.7s',  size: 3.5, color: '#818cf8' },
        { top: '50%', left: '2%',  pdx: '11px',  pdy: '-5px',  delay: '1.6s',  size: 2.5, color: '#93c5fd' },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute pointer-events-none rounded-full z-20"
          style={{
            top: p.top,
            left: 'left' in p ? (p as any).left : undefined,
            right: 'right' in p ? (p as any).right : undefined,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2.5}px ${p.color}`,
            ['--pdx' as string]: p.pdx,
            ['--pdy' as string]: p.pdy,
            animation: `hi-particle 3s ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}

      {/* The robot image — floats gently */}
      <div
        className="relative z-10"
        style={{ animation: 'hi-float 7s ease-in-out infinite' }}
      >
        <img
          src={heroImage}
          alt="AI Robot"
          className="w-full"
          style={{
            borderRadius: '28px',
            boxShadow: '0 0 80px rgba(37,99,235,0.45), 0 0 200px rgba(6,182,212,0.12), 0 40px 100px rgba(0,0,0,0.7)',
            maskImage: 'radial-gradient(ellipse 100% 96% at 50% 48%, black 72%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 100% 96% at 50% 48%, black 72%, transparent 100%)',
          }}
        />

        {/* Scan line sweeping down */}
        <div
          className="absolute left-0 right-0 h-px pointer-events-none z-20"
          style={{
            background: 'linear-gradient(90deg, transparent 5%, rgba(59,130,246,0.9) 30%, rgba(6,182,212,0.7) 70%, transparent 95%)',
            animation: 'hi-scan 6s 1.5s ease-in-out infinite',
          }}
        />

        {/* Shimmer sweep */}
        <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none z-20">
          <div
            className="absolute inset-y-0 w-1/4"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
              animation: 'hi-shimmer 5s 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Corner tech brackets */}
        {[
          { top: '10px', left: '10px',   rotate: '0deg'   },
          { top: '10px', right: '10px',  rotate: '90deg'  },
          { bottom: '10px', left: '10px',  rotate: '270deg' },
          { bottom: '10px', right: '10px', rotate: '180deg' },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute pointer-events-none z-30"
            style={{
              top: 'top' in pos ? pos.top : undefined,
              bottom: 'bottom' in pos ? pos.bottom : undefined,
              left: 'left' in pos ? pos.left : undefined,
              right: 'right' in pos ? pos.right : undefined,
              width: 28,
              height: 28,
              borderTop: '2px solid rgba(59,130,246,0.85)',
              borderLeft: '2px solid rgba(59,130,246,0.85)',
              borderRadius: '4px 0 0 0',
              transform: `rotate(${pos.rotate})`,
              animation: `hi-corner-blink 3.5s ${i * 0.45}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Glowing AI badge ring — overlaid on top-center (robot head area) */}
        <div
          className="absolute pointer-events-none z-30"
          style={{
            top: '4%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '38%',
            aspectRatio: '1',
            animation: 'hi-badge-pop 2.8s ease-in-out infinite',
          }}
        >
          <svg viewBox="0 0 120 120" className="w-full h-full">
            {/* Outer dashed ring */}
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(59,130,246,0.55)"
              strokeWidth="1.5" strokeDasharray="10 6"
              style={{ transformOrigin: '60px 60px', animation: 'hi-ring-spin 9s linear infinite' }} />
            {/* Inner dashed ring */}
            <circle cx="60" cy="60" r="44" fill="none" stroke="rgba(6,182,212,0.4)"
              strokeWidth="1" strokeDasharray="6 8"
              style={{ transformOrigin: '60px 60px', animation: 'hi-ring-spin-r 6s linear infinite' }} />
            {/* Solid glow ring */}
            <circle cx="60" cy="60" r="35" fill="rgba(15,30,70,0.55)"
              stroke="rgba(59,130,246,0.8)" strokeWidth="2" />
            {/* AI text */}
            <text x="60" y="67" textAnchor="middle"
              fontFamily="Space Grotesk, sans-serif" fontWeight="800" fontSize="22"
              fill="#ffffff">AI</text>
            {/* 6 orbit dots */}
            {[0,1,2,3,4,5].map(k => {
              const a = (k / 6) * Math.PI * 2;
              return (
                <circle key={k}
                  cx={60 + Math.cos(a) * 54} cy={60 + Math.sin(a) * 54}
                  r="3.5" fill="#60a5fa"
                  style={{ animation: `hi-particle 2.4s ${k * 0.28}s ease-in-out infinite` }} />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Edge glow border */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none z-0"
        style={{
          boxShadow: 'inset 0 0 40px rgba(37,99,235,0.14)',
          border: '1px solid rgba(59,130,246,0.28)',
          animation: 'hi-glow-pulse 3.5s ease-in-out infinite',
        }}
      />
    </div>
  );
}

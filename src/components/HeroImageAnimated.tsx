const heroImage = 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800';

export default function HeroImageAnimated() {
  return (
    <div className="relative w-full max-w-lg select-none">
      <style>{`
        @keyframes hi-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes hi-glow-pulse {
          0%, 100% { opacity: 0.35; transform: scale(0.97); }
          50% { opacity: 0.75; transform: scale(1.04); }
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
          0%   { top: 8%; opacity: 0; }
          10%  { opacity: 0.9; }
          90%  { opacity: 0.9; }
          100% { top: 92%; opacity: 0; }
        }
        @keyframes hi-particle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50%       { transform: translate(var(--dx), var(--dy)) scale(1.4); opacity: 1; }
        }
        @keyframes hi-badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.5), 0 0 20px rgba(59,130,246,0.3); }
          50%       { box-shadow: 0 0 0 12px rgba(59,130,246,0), 0 0 40px rgba(59,130,246,0.6); }
        }
        @keyframes hi-shimmer {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        @keyframes hi-corner-blink {
          0%, 80%, 100% { opacity: 1; }
          90% { opacity: 0.2; }
        }
      `}</style>

      {/* ── Outer ambient glow ── */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(59,130,246,0.35) 0%, rgba(99,102,241,0.15) 45%, transparent 75%)',
          animation: 'hi-glow-pulse 4s ease-in-out infinite',
        }}
      />

      {/* ── Spinning dashed rings (positioned over the AI head area ~top-right) ── */}
      <div className="absolute pointer-events-none" style={{ top: '6%', right: '2%', width: '44%', aspectRatio: '1' }}>
        {/* Ring 1 */}
        <div className="absolute inset-0 rounded-full border border-blue-400/40"
          style={{
            borderStyle: 'dashed',
            borderWidth: '1.5px',
            animation: 'hi-ring-spin 8s linear infinite',
          }}
        />
        {/* Ring 2 */}
        <div className="absolute inset-3 rounded-full border border-cyan-400/30"
          style={{
            borderStyle: 'dashed',
            borderWidth: '1px',
            borderDasharray: '4 6',
            animation: 'hi-ring-spin-r 6s linear infinite',
          }}
        />
        {/* Ring 3 */}
        <div className="absolute inset-6 rounded-full border border-blue-300/20"
          style={{
            animation: 'hi-ring-spin 12s linear infinite',
          }}
        />
      </div>

      {/* ── Floating particle dots ── */}
      {[
        { top: '10%', left: '5%', dx: '-6px', dy: '-10px', delay: '0s', size: 5, color: '#60a5fa' },
        { top: '20%', left: '2%', dx: '8px', dy: '-6px', delay: '0.5s', size: 3.5, color: '#06b6d4' },
        { top: '40%', left: '0%', dx: '-8px', dy: '10px', delay: '1s', size: 4, color: '#3b82f6' },
        { top: '65%', left: '4%', dx: '6px', dy: '-8px', delay: '0.3s', size: 3, color: '#60a5fa' },
        { top: '80%', left: '8%', dx: '-4px', dy: '8px', delay: '0.8s', size: 4.5, color: '#818cf8' },
        { top: '12%', right: '4%', dx: '8px', dy: '-10px', delay: '0.2s', size: 4, color: '#60a5fa' },
        { top: '30%', right: '1%', dx: '-6px', dy: '-8px', delay: '0.7s', size: 3, color: '#06b6d4' },
        { top: '55%', right: '3%', dx: '10px', dy: '6px', delay: '1.2s', size: 5, color: '#3b82f6' },
        { top: '72%', right: '6%', dx: '-8px', dy: '-4px', delay: '0.4s', size: 3.5, color: '#60a5fa' },
        { top: '88%', left: '15%', dx: '6px', dy: '-12px', delay: '0.9s', size: 4, color: '#06b6d4' },
        { top: '88%', right: '15%', dx: '-6px', dy: '-12px', delay: '0.6s', size: 3.5, color: '#818cf8' },
        { top: '48%', left: '1%', dx: '10px', dy: '-4px', delay: '1.5s', size: 2.5, color: '#93c5fd' },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            top: p.top,
            left: 'left' in p ? p.left : undefined,
            right: 'right' in p ? p.right : undefined,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            ['--dx' as string]: p.dx,
            ['--dy' as string]: p.dy,
            animation: `hi-particle 3s ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}

      {/* ── The actual image ── */}
      <div
        className="relative z-10"
        style={{ animation: 'hi-float 6s ease-in-out infinite' }}
      >
        <img
          src={heroImage}
          alt="AI Awareness Hub"
          className="w-full rounded-3xl shadow-2xl"
          style={{ boxShadow: '0 0 60px rgba(59,130,246,0.3), 0 30px 80px rgba(0,0,0,0.6)' }}
        />

        {/* Shimmer sweep over image */}
        <div
          className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none z-20"
        >
          <div
            className="absolute inset-y-0 w-1/3"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
              animation: 'hi-shimmer 4s 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Scan line */}
        <div
          className="absolute left-0 right-0 h-0.5 pointer-events-none z-20 rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.8), rgba(6,182,212,0.6), transparent)',
            animation: 'hi-scan 5s 1s ease-in-out infinite',
          }}
        />

        {/* Corner tech brackets */}
        {[
          { top: '8px', left: '8px', rotate: '0deg' },
          { top: '8px', right: '8px', rotate: '90deg' },
          { bottom: '8px', left: '8px', rotate: '270deg' },
          { bottom: '8px', right: '8px', rotate: '180deg' },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute pointer-events-none z-20"
            style={{
              top: 'top' in pos ? pos.top : undefined,
              bottom: 'bottom' in pos ? pos.bottom : undefined,
              left: 'left' in pos ? pos.left : undefined,
              right: 'right' in pos ? pos.right : undefined,
              width: 24,
              height: 24,
              borderTop: '2px solid rgba(59,130,246,0.8)',
              borderLeft: '2px solid rgba(59,130,246,0.8)',
              borderRadius: '3px 0 0 0',
              transform: `rotate(${pos.rotate})`,
              animation: `hi-corner-blink 3s ${i * 0.4}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Blue edge glow border ── */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none z-0"
        style={{
          boxShadow: 'inset 0 0 30px rgba(59,130,246,0.12)',
          border: '1px solid rgba(59,130,246,0.25)',
          animation: 'hi-glow-pulse 3s ease-in-out infinite',
        }}
      />
    </div>
  );
}

export default function AIHeroVisual() {
  return (
    <div className="relative w-full max-w-lg">
      <style>{`
        @keyframes hero-ring-1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes hero-ring-2 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes hero-pulse { 0%,100%{opacity:0.3;r:90} 50%{opacity:0.7;r:96} }
        @keyframes hero-ai-glow { 0%,100%{filter:drop-shadow(0 0 12px #3b82f6) drop-shadow(0 0 30px #1d4ed8);} 50%{filter:drop-shadow(0 0 24px #60a5fa) drop-shadow(0 0 60px #3b82f6);} }
        @keyframes hero-node-pulse { 0%,100%{r:4;opacity:0.6} 50%{r:7;opacity:1} }
        @keyframes hero-line-flow { 0%{stroke-dashoffset:120} 100%{stroke-dashoffset:0} }
        @keyframes hero-particle { 0%,100%{transform:translate(0,0);opacity:0.4} 50%{transform:translate(var(--px),var(--py));opacity:1} }
        @keyframes hero-scan { 0%{transform:translateY(0);opacity:0.9} 100%{transform:translateY(220px);opacity:0.2} }
        @keyframes hero-head-glow { 0%,100%{opacity:0.15} 50%{opacity:0.35} }
        @keyframes hero-circuit-dash { 0%{stroke-dashoffset:300} 100%{stroke-dashoffset:0} }
        @keyframes hero-badge-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes hero-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
      `}</style>

      <svg viewBox="0 0 480 520" className="w-full drop-shadow-2xl" style={{ animation: 'hero-float 5s ease-in-out infinite' }}>
        <defs>
          <radialGradient id="hbg" cx="55%" cy="42%">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#0f172a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#020817" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hhead" cx="50%" cy="38%">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="1" />
            <stop offset="55%" stopColor="#bfdbfe" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.8" />
          </radialGradient>
          <radialGradient id="hbrain" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.2" />
          </radialGradient>
          <radialGradient id="hairglow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
          <filter id="hglow">
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="hglow2">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <clipPath id="hheadclip">
            <path d="M 155 55 Q 200 28 265 38 Q 320 48 345 105 Q 368 155 362 215 Q 356 275 335 315 Q 310 350 278 365 Q 255 375 235 374 L 230 395 L 215 395 L 215 374 Q 192 370 172 355 Q 145 335 135 295 Q 118 248 122 200 Q 126 148 140 105 Q 147 77 155 55 Z" />
          </clipPath>
        </defs>

        {/* Background ambient glow */}
        <ellipse cx="270" cy="220" rx="230" ry="230" fill="url(#hbg)" />

        {/* Outer particle ring glow */}
        <circle cx="268" cy="195" r="195" fill="none" stroke="#1d4ed8" strokeWidth="1" strokeOpacity="0.2"
          strokeDasharray="4 8"
          style={{ transformOrigin: '268px 195px', animation: 'hero-ring-1 25s linear infinite' }} />

        {/* ───── ROBOT HEAD ───── */}
        {/* Head shape - profile facing right */}
        <path
          d="M 155 55 Q 200 28 265 38 Q 320 48 345 105 Q 368 155 362 215 Q 356 275 335 315 Q 310 350 278 365 Q 255 375 235 374 L 230 395 L 215 395 L 215 374 Q 192 370 172 355 Q 145 335 135 295 Q 118 248 122 200 Q 126 148 140 105 Q 147 77 155 55 Z"
          fill="url(#hhead)"
        />

        {/* Head inner metallic sheen */}
        <path
          d="M 162 68 Q 203 44 262 52 Q 312 60 337 112 Q 357 160 351 215 Q 345 268 326 306 Q 303 338 274 352 Q 255 360 237 360"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
        />

        {/* Neck */}
        <rect x="207" y="390" width="52" height="45" rx="6" fill="#cbd5e1" />
        <rect x="214" y="393" width="38" height="5" rx="2" fill="rgba(255,255,255,0.3)" />
        <rect x="214" y="402" width="38" height="5" rx="2" fill="rgba(255,255,255,0.3)" />
        <rect x="214" y="411" width="38" height="5" rx="2" fill="rgba(255,255,255,0.3)" />

        {/* Shoulder base */}
        <path d="M 110 435 Q 120 428 185 428 L 282 428 Q 340 428 360 435 L 370 475 L 95 475 Z" fill="#bfdbfe" opacity="0.6" />

        {/* Face details - eye area */}
        <ellipse cx="295" cy="188" rx="26" ry="18" fill="rgba(30,58,138,0.8)" />
        <ellipse cx="295" cy="188" rx="18" ry="12" fill="rgba(59,130,246,0.9)" />
        <ellipse cx="295" cy="188" rx="9" ry="9" fill="rgba(96,165,250,1)" />
        <circle cx="295" cy="188" r="4" fill="white" opacity="0.9" />
        <circle cx="298" cy="185" r="2" fill="white" />
        {/* Eye glow */}
        <ellipse cx="295" cy="188" rx="28" ry="20" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.6"
          style={{ animation: 'hero-pulse 2s ease-in-out infinite' }} />

        {/* Nose hint */}
        <path d="M 340 235 Q 355 245 348 260" fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth="2" />

        {/* Mouth area */}
        <path d="M 295 295 Q 315 300 330 295" fill="none" stroke="rgba(148,163,184,0.6)" strokeWidth="2" strokeLinecap="round" />

        {/* Panel lines on face */}
        <line x1="200" y1="180" x2="265" y2="180" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
        <line x1="198" y1="230" x2="290" y2="230" stroke="rgba(148,163,184,0.25)" strokeWidth="1" />

        {/* ───── BRAIN / CIRCUIT AREA ───── */}
        {/* Brain cavity glow background */}
        <ellipse cx="218" cy="120" rx="72" ry="68" fill="url(#hbrain)" clipPath="url(#hheadclip)"
          style={{ animation: 'hero-head-glow 2.5s ease-in-out infinite' }} />

        {/* Circuit grid lines */}
        {[0,1,2,3].map(i => (
          <line key={`h${i}`} x1="148" y1={62 + i * 26} x2="310" y2={62 + i * 26}
            stroke="#60a5fa" strokeWidth="0.8" strokeOpacity="0.35" clipPath="url(#hheadclip)"
            strokeDasharray="8 5"
            style={{ animation: `hero-circuit-dash 3s ${i * 0.4}s ease-in-out infinite` }} />
        ))}
        {[0,1,2,3,4].map(i => (
          <line key={`v${i}`} x1={148 + i * 38} y1="50" x2={148 + i * 38} y2="175"
            stroke="#60a5fa" strokeWidth="0.8" strokeOpacity="0.3" clipPath="url(#hheadclip)"
            strokeDasharray="6 6"
            style={{ animation: `hero-circuit-dash 3.5s ${i * 0.3}s ease-in-out infinite` }} />
        ))}

        {/* Circuit nodes in brain */}
        {[
          [182, 72], [218, 65], [256, 75], [172, 98], [210, 95], [250, 92],
          [188, 122], [224, 118], [262, 110], [195, 148], [235, 142],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="#3b82f6" clipPath="url(#hheadclip)"
            style={{ animation: `hero-node-pulse 2s ${i * 0.18}s ease-in-out infinite` }} />
        ))}

        {/* Circuit connection lines */}
        {[
          "M 182 72 L 218 65", "M 218 65 L 256 75", "M 182 72 L 172 98",
          "M 218 65 L 210 95", "M 256 75 L 250 92", "M 172 98 L 188 122",
          "M 210 95 L 224 118", "M 250 92 L 262 110", "M 188 122 L 195 148",
          "M 224 118 L 235 142", "M 210 95 L 188 122",
        ].map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.55"
            clipPath="url(#hheadclip)"
            strokeDasharray="120" strokeDashoffset="120"
            style={{ animation: `hero-line-flow 2.5s ${i * 0.15}s ease-in-out infinite` }} />
        ))}

        {/* Scan line over brain */}
        <rect x="148" y="52" width="162" height="2" fill="none"
          stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.7"
          clipPath="url(#hheadclip)"
          style={{ animation: 'hero-scan 3s ease-in-out infinite' }} />

        {/* ───── AI BADGE ───── */}
        {/* Outer spinning dashed ring */}
        <circle cx="358" cy="100" r="52"
          fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.4"
          strokeDasharray="6 4"
          style={{ transformOrigin: '358px 100px', animation: 'hero-badge-spin 8s linear infinite' }} />
        {/* Inner spinning ring (opposite) */}
        <circle cx="358" cy="100" r="44"
          fill="none" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.3"
          strokeDasharray="3 6"
          style={{ transformOrigin: '358px 100px', animation: 'hero-badge-spin 6s linear infinite reverse' }} />
        {/* Badge fill */}
        <circle cx="358" cy="100" r="37" fill="rgba(30,58,138,0.85)" />
        <circle cx="358" cy="100" r="37" fill="none" stroke="#3b82f6" strokeWidth="2" />
        {/* Glow rings behind badge */}
        <circle cx="358" cy="100" r="37" fill="url(#hairglow)"
          style={{ animation: 'hero-ai-glow 2s ease-in-out infinite' }} />
        {/* AI text */}
        <text x="358" y="108" textAnchor="middle" fontSize="26" fontWeight="800"
          fontFamily="Space Grotesk, sans-serif" fill="#ffffff"
          style={{ filter: 'drop-shadow(0 0 8px #3b82f6)' }}>
          AI
        </text>
        {/* Small dots around badge */}
        {[0,1,2,3,4,5,6,7].map(i => {
          const angle = (i / 8) * Math.PI * 2;
          const x = 358 + Math.cos(angle) * 55;
          const y = 100 + Math.sin(angle) * 55;
          return (
            <circle key={i} cx={x} cy={y} r="2.5" fill="#3b82f6"
              style={{ animation: `hero-node-pulse 2s ${i * 0.25}s ease-in-out infinite` }} />
          );
        })}

        {/* ───── FLOATING PARTICLES ───── */}
        {[
          { x: 70, y: 80, px: '-8', py: '-12', delay: '0s', r: 3 },
          { x: 95, y: 150, px: '10', py: '-8', delay: '0.4s', r: 2 },
          { x: 60, y: 250, px: '-6', py: '10', delay: '0.8s', r: 4 },
          { x: 400, y: 200, px: '8', py: '-10', delay: '0.2s', r: 3 },
          { x: 420, y: 300, px: '-8', py: '12', delay: '0.6s', r: 2.5 },
          { x: 380, y: 380, px: '10', py: '-8', delay: '1s', r: 3 },
          { x: 130, y: 410, px: '-10', py: '-6', delay: '0.3s', r: 2 },
          { x: 320, y: 440, px: '6', py: '-12', delay: '0.7s', r: 3.5 },
          { x: 90, y: 340, px: '-4', py: '8', delay: '1.2s', r: 2 },
          { x: 440, y: 150, px: '6', py: '-8', delay: '0.5s', r: 2.5 },
          { x: 45, y: 195, px: '-8', py: '-4', delay: '0.9s', r: 2 },
          { x: 430, y: 420, px: '-6', py: '10', delay: '1.4s', r: 3 },
        ].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#60a5fa" opacity="0.7"
            style={{
              ['--px' as string]: `${p.px}px`,
              ['--py' as string]: `${p.py}px`,
              animation: `hero-particle 3s ${p.delay} ease-in-out infinite`
            }} />
        ))}

        {/* Connection lines from badge to head */}
        <path d="M 322 100 L 285 148" fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeOpacity="0.4"
          strokeDasharray="80" strokeDashoffset="80"
          style={{ animation: 'hero-line-flow 2s 0.5s ease-in-out infinite' }} />
        <path d="M 310 115 L 270 165" fill="none" stroke="#60a5fa" strokeWidth="0.8" strokeOpacity="0.3"
          strokeDasharray="60" strokeDashoffset="60"
          style={{ animation: 'hero-line-flow 2.2s 0.8s ease-in-out infinite' }} />

        {/* Bottom glow under neck */}
        <ellipse cx="233" cy="470" rx="80" ry="12" fill="#1d4ed8" opacity="0.3" />
      </svg>
    </div>
  );
}

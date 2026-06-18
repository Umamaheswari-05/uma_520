export default function AIHeroVisual() {
  /* ─── A blue wireframe-mesh AI head in profile, matching the poster aesthetic ─── */
  return (
    <div className="relative w-full max-w-lg select-none">
      <style>{`
        @keyframes aihv-float   { 0%,100%{transform:translateY(0)}    50%{transform:translateY(-14px)} }
        @keyframes aihv-glow    { 0%,100%{opacity:.35;filter:blur(30px)}  50%{opacity:.7;filter:blur(40px)} }
        @keyframes aihv-stars   { 0%,100%{opacity:.3} 50%{opacity:.9} }
        @keyframes aihv-spin    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes aihv-spinR   { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes aihv-dot     { 0%,100%{r:2.5;opacity:.5} 50%{r:5;opacity:1} }
        @keyframes aihv-line    { 0%{stroke-dashoffset:300} 100%{stroke-dashoffset:0} }
        @keyframes aihv-badge   { 0%,100%{filter:drop-shadow(0 0 8px #3b82f6) drop-shadow(0 0 20px #1d4ed8)}
                                   50%{filter:drop-shadow(0 0 18px #60a5fa) drop-shadow(0 0 45px #3b82f6)} }
        @keyframes aihv-scan    { 0%{transform:translateY(0);opacity:.8} 100%{transform:translateY(340px);opacity:0} }
        @keyframes aihv-pulse-r { 0%,100%{r:52;opacity:.6} 50%{r:58;opacity:1} }
        @keyframes aihv-silh    { 0%,100%{opacity:.55} 50%{opacity:.8} }
        @keyframes aihv-shimmer { 0%{opacity:0;transform:translateX(-60px)} 50%{opacity:.15} 100%{opacity:0;transform:translateX(60px)} }
      `}</style>

      {/* ── Outer svg canvas ── */}
      <svg
        viewBox="0 0 480 580"
        className="w-full"
        style={{ animation: 'aihv-float 6s ease-in-out infinite' }}
      >
        <defs>
          {/* Main navy background */}
          <radialGradient id="bg1" cx="55%" cy="40%">
            <stop offset="0%"   stopColor="#0d1b4b" />
            <stop offset="55%"  stopColor="#050d24" />
            <stop offset="100%" stopColor="#020817" />
          </radialGradient>
          {/* Head mesh color */}
          <radialGradient id="headGrad" cx="50%" cy="35%">
            <stop offset="0%"   stopColor="#60a5fa" stopOpacity=".9" />
            <stop offset="60%"  stopColor="#3b82f6" stopOpacity=".6" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity=".2" />
          </radialGradient>
          {/* Blue ambient halo */}
          <radialGradient id="halo" cx="58%" cy="38%">
            <stop offset="0%"   stopColor="#2563eb" stopOpacity=".4" />
            <stop offset="50%"  stopColor="#1d4ed8" stopOpacity=".15" />
            <stop offset="100%" stopColor="#0a0f1e" stopOpacity="0" />
          </radialGradient>
          {/* AI badge gradient */}
          <radialGradient id="badgeFill" cx="40%" cy="35%">
            <stop offset="0%"   stopColor="#1e40af" />
            <stop offset="100%" stopColor="#0d1b4b" />
          </radialGradient>
          {/* Clip for image bg */}
          <clipPath id="bgClip">
            <rect width="480" height="580" rx="24" />
          </clipPath>
          {/* Bottom fade */}
          <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="70%" stopColor="#020817" stopOpacity="0" />
            <stop offset="100%" stopColor="#020817" stopOpacity="1" />
          </linearGradient>
          {/* Glow filter for outline */}
          <filter id="glofilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Shimmer gradient */}
          <linearGradient id="shimmerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%"  stopColor="#93c5fd" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* ── Background ── */}
        <rect width="480" height="580" rx="24" fill="url(#bg1)" clipPath="url(#bgClip)" />

        {/* Background ambient radial halo */}
        <ellipse cx="270" cy="200" rx="260" ry="240" fill="url(#halo)"
          style={{ animation: 'aihv-glow 4s ease-in-out infinite' }} />

        {/* ── Star field ── */}
        {[
          [30,35],[60,90],[110,20],[165,55],[210,15],[280,40],[330,22],[390,65],[435,30],
          [15,140],[55,180],[95,155],[145,130],[200,165],[260,115],[310,145],[370,100],[440,170],
          [25,250],[70,280],[120,235],[175,265],[230,240],[290,280],[345,255],[400,240],[455,275],
          [40,370],[85,390],[130,360],[185,395],[240,375],[295,365],[350,400],[405,370],[450,395],
          [22,480],[65,470],[115,490],[170,460],[220,485],[270,465],[325,490],[380,475],[440,490],
        ].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r={1+Math.sin(i)*0.7} fill="#93c5fd"
            style={{ animation: `aihv-stars ${2+i%3}s ${(i*0.12)%3}s ease-in-out infinite` }} />
        ))}

        {/* ── Mesh head profile ──
            Profile facing right: forehead top → down back of head → neck
            We'll place ~80 mesh nodes and triangulate them to form the face
        ── */}

        {/* Outline glow (soft) */}
        <path
          d="M 195 52 Q 240 28 295 40 Q 360 52 390 110 Q 415 162 408 228
             Q 400 290 378 330 Q 352 368 318 385 Q 295 395 270 394
             L 265 418 L 245 418 L 245 394
             Q 220 388 200 372 Q 168 350 155 308
             Q 138 260 142 210 Q 146 155 163 110 Q 175 72 195 52 Z"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeOpacity="0.5"
          filter="url(#glofilter)"
        />
        <path
          d="M 195 52 Q 240 28 295 40 Q 360 52 390 110 Q 415 162 408 228
             Q 400 290 378 330 Q 352 368 318 385 Q 295 395 270 394
             L 265 418 L 245 418 L 245 394
             Q 220 388 200 372 Q 168 350 155 308
             Q 138 260 142 210 Q 146 155 163 110 Q 175 72 195 52 Z"
          fill="#1e3a5f"
          fillOpacity="0.08"
          stroke="#60a5fa"
          strokeWidth="1"
          strokeOpacity="0.25"
        />

        {/* Mesh node positions (x,y) - face profile */}
        {/* Row top-head */}
        {[
          /* Top arc */
          [210,60],[240,46],[272,44],[302,52],[328,66],[348,88],
          /* Upper face */
          [190,88],[215,75],[248,65],[278,62],[308,72],[338,95],[362,118],
          [178,118],[200,103],[228,90],[260,84],[292,90],[320,108],[348,130],[372,150],
          /* Mid face */
          [168,148],[188,132],[212,118],[242,112],[272,116],[302,128],[330,148],[356,168],[380,188],
          [162,178],[180,162],[202,148],[230,142],[260,146],[290,158],[318,174],[344,196],[368,218],
          /* Eye area */
          [160,210],[176,194],[198,180],[228,174],[258,178],[288,188],[316,204],[342,224],[366,246],
          /* Nose/cheek */
          [158,242],[172,228],[194,214],[224,208],[254,212],[284,222],[312,238],[338,258],[360,276],
          [160,272],[174,258],[196,244],[224,238],[254,242],[282,252],[308,268],[334,288],[355,308],
          /* Lower face */
          [165,302],[180,288],[200,274],[226,268],[254,272],[282,284],[308,300],[330,320],
          [172,332],[192,318],[215,302],[242,296],[268,300],[295,316],[318,336],
          [185,360],[206,346],[230,332],[256,328],[280,340],[302,358],
          /* Neck */
          [228,388],[255,384],[272,388],
        ].map(([x,y],i)=>(
          <circle key={`n${i}`} cx={x} cy={y} r="3"
            fill="#3b82f6" fillOpacity="0.85"
            style={{ animation: `aihv-dot ${1.5+i%2*.5}s ${(i*.08)%2}s ease-in-out infinite` }} />
        ))}

        {/* Mesh triangulation lines - horizontal rows */}
        {[
          /* Top arc connections */
          [[210,60],[240,46]],[[240,46],[272,44]],[[272,44],[302,52]],[[302,52],[328,66]],[[328,66],[348,88]],
          /* Row 2 */
          [[190,88],[215,75]],[[215,75],[248,65]],[[248,65],[278,62]],[[278,62],[308,72]],
          [[308,72],[338,95]],[[338,95],[362,118]],
          /* Row 3 */
          [[178,118],[200,103]],[[200,103],[228,90]],[[228,90],[260,84]],[[260,84],[292,90]],
          [[292,90],[320,108]],[[320,108],[348,130]],[[348,130],[372,150]],
          /* Row 4 */
          [[168,148],[188,132]],[[188,132],[212,118]],[[212,118],[242,112]],[[242,112],[272,116]],
          [[272,116],[302,128]],[[302,128],[330,148]],[[330,148],[356,168]],[[356,168],[380,188]],
          /* Row 5 */
          [[162,178],[180,162]],[[180,162],[202,148]],[[202,148],[230,142]],[[230,142],[260,146]],
          [[260,146],[290,158]],[[290,158],[318,174]],[[318,174],[344,196]],[[344,196],[368,218]],
          /* Row 6 eye */
          [[160,210],[176,194]],[[176,194],[198,180]],[[198,180],[228,174]],[[228,174],[258,178]],
          [[258,178],[288,188]],[[288,188],[316,204]],[[316,204],[342,224]],[[342,224],[366,246]],
          /* Row 7 nose */
          [[158,242],[172,228]],[[172,228],[194,214]],[[194,214],[224,208]],[[224,208],[254,212]],
          [[254,212],[284,222]],[[284,222],[312,238]],[[312,238],[338,258]],[[338,258],[360,276]],
          /* Row 8 */
          [[160,272],[174,258]],[[174,258],[196,244]],[[196,244],[224,238]],[[224,238],[254,242]],
          [[254,242],[282,252]],[[282,252],[308,268]],[[308,268],[334,288]],[[334,288],[355,308]],
          /* Row 9 lower */
          [[165,302],[180,288]],[[180,288],[200,274]],[[200,274],[226,268]],[[226,268],[254,272]],
          [[254,272],[282,284]],[[282,284],[308,300]],[[308,300],[330,320]],
          /* Row 10 */
          [[172,332],[192,318]],[[192,318],[215,302]],[[215,302],[242,296]],[[242,296],[268,300]],
          [[268,300],[295,316]],[[295,316],[318,336]],
          /* Row 11 */
          [[185,360],[206,346]],[[206,346],[230,332]],[[230,332],[256,328]],[[256,328],[280,340]],[[280,340],[302,358]],
          /* Vertical diagonals - left side */
          [[210,60],[190,88]],[[190,88],[178,118]],[[178,118],[168,148]],[[168,148],[162,178]],
          [[162,178],[160,210]],[[160,210],[158,242]],[[158,242],[160,272]],[[160,272],[165,302]],
          [[165,302],[172,332]],[[172,332],[185,360]],
          /* Vertical diagonals - right side */
          [[348,88],[362,118]],[[362,118],[372,150]],[[372,150],[380,188]],[[380,188],[368,218]],
          [[368,218],[366,246]],[[366,246],[360,276]],[[360,276],[355,308]],[[355,308],[330,320]],
          /* Cross diagonals */
          [[215,75],[200,103]],[[248,65],[228,90]],[[278,62],[260,84]],[[308,72],[292,90]],
          [[338,95],[320,108]],[[362,118],[348,130]],
          [[200,103],[188,132]],[[228,90],[212,118]],[[260,84],[242,112]],[[292,90],[272,116]],
          [[320,108],[302,128]],[[348,130],[330,148]],[[372,150],[356,168]],
          [[188,132],[180,162]],[[212,118],[202,148]],[[242,112],[230,142]],[[272,116],[260,146]],
          [[302,128],[290,158]],[[330,148],[318,174]],[[356,168],[344,196]],
          [[180,162],[176,194]],[[202,148],[198,180]],[[230,142],[228,174]],[[260,146],[258,178]],
          [[290,158],[288,188]],[[318,174],[316,204]],[[344,196],[342,224]],[[368,218],[366,246]],
          [[176,194],[172,228]],[[198,180],[194,214]],[[228,174],[224,208]],[[258,178],[254,212]],
          [[288,188],[284,222]],[[316,204],[312,238]],[[342,224],[338,258]],[[366,246],[360,276]],
          [[172,228],[174,258]],[[194,214],[196,244]],[[224,208],[224,238]],[[254,212],[254,242]],
          [[284,222],[282,252]],[[312,238],[308,268]],[[338,258],[334,288]],[[360,276],[355,308]],
          [[174,258],[180,288]],[[196,244],[200,274]],[[224,238],[226,268]],[[254,242],[254,272]],
          [[282,252],[282,284]],[[308,268],[308,300]],[[334,288],[330,320]],
          [[180,288],[192,318]],[[200,274],[215,302]],[[226,268],[242,296]],[[254,272],[268,300]],
          [[282,284],[295,316]],[[308,300],[318,336]],
          [[192,318],[206,346]],[[215,302],[230,332]],[[242,296],[256,328]],[[268,300],[280,340]],[[295,316],[302,358]],
          /* Neck */
          [[228,388],[245,418]],[[255,384],[255,418]],[[272,388],[265,418]],
          [[185,360],[228,388]],[[206,346],[245,418]],[[302,358],[272,388]],
        ].map(([[x1,y1],[x2,y2]],i)=>(
          <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#3b82f6" strokeWidth="0.9" strokeOpacity="0.35"
            strokeDasharray="300" strokeDashoffset="300"
            style={{ animation: `aihv-line 3s ${(i*0.03)%2}s ease-in-out infinite` }} />
        ))}

        {/* Brighter outline path for face shape */}
        <path
          d="M 210 60 L 190 88 L 178 118 L 168 148 L 162 178 L 160 210
             L 158 242 L 160 272 L 165 302 L 172 332 L 185 360
             L 228 388 L 245 418 L 265 418 L 272 388
             L 302 358 L 318 336 L 330 320 L 355 308 L 360 276
             L 366 246 L 368 218 L 380 188 L 372 150 L 362 118
             L 348 88 L 328 66 L 302 52 L 272 44 L 240 46 L 210 60 Z"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.8"
          strokeOpacity="0.6"
          strokeDasharray="8 4"
          style={{ animation: 'aihv-line 4s ease-in-out infinite' }}
        />

        {/* ── AI Badge (temple area) ── */}
        {/* Outer rings */}
        <g style={{ animation: 'aihv-badge 2.5s ease-in-out infinite' }}>
          <circle cx="395" cy="105" r="62" fill="none" stroke="#3b82f6" strokeWidth="1.5"
            strokeDasharray="10 5" strokeOpacity="0.5"
            style={{ transformOrigin: '395px 105px', animation: 'aihv-spin 10s linear infinite' }} />
          <circle cx="395" cy="105" r="53" fill="none" stroke="#60a5fa" strokeWidth="1"
            strokeDasharray="5 7" strokeOpacity="0.4"
            style={{ transformOrigin: '395px 105px', animation: 'aihv-spinR 7s linear infinite' }} />
          {/* Badge fill */}
          <circle cx="395" cy="105" r="42" fill="url(#badgeFill)" stroke="#3b82f6" strokeWidth="2" />
          {/* AI text */}
          <text x="395" y="115" textAnchor="middle"
            fontFamily="Space Grotesk, sans-serif" fontWeight="800" fontSize="28"
            fill="#ffffff">
            AI
          </text>
          {/* Connection line to head */}
          <line x1="353" y1="105" x2="328" y2="66"
            stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.5"
            strokeDasharray="50" strokeDashoffset="50"
            style={{ animation: 'aihv-line 2.5s ease-in-out infinite' }} />
          {/* Dot accents around badge */}
          {[0,1,2,3,4,5].map(i => {
            const a = (i/6)*Math.PI*2;
            return (
              <circle key={i} cx={395+Math.cos(a)*62} cy={105+Math.sin(a)*62} r="3" fill="#60a5fa"
                style={{ animation: `aihv-dot 2s ${i*0.25}s ease-in-out infinite` }} />
            );
          })}
        </g>

        {/* ── Scan line ── */}
        <rect x="148" y="44" width="248" height="2" rx="1"
          fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.8"
          style={{ animation: 'aihv-scan 5s 1s ease-in-out infinite' }} />

        {/* ── Shimmer sweep ── */}
        <rect x="148" y="44" width="60" height="400" rx="2"
          fill="url(#shimmerGrad)" fillOpacity="0.06"
          style={{ animation: 'aihv-shimmer 4s 2s ease-in-out infinite' }} />

        {/* ── Silhouette person (bottom, like the poster) ── */}
        <g style={{ animation: 'aihv-silh 3s ease-in-out infinite' }}>
          {/* Mountain / cliff */}
          <path d="M 0 540 L 80 490 L 140 510 L 185 465 L 235 520 L 285 495 L 330 510 L 400 480 L 480 520 L 480 580 L 0 580 Z"
            fill="#0a1535" />
          <path d="M 130 480 L 185 462 L 240 495" fill="none" stroke="#1e40af" strokeWidth="1" strokeOpacity="0.5" />
          {/* Person silhouette on cliff */}
          <ellipse cx="190" cy="456" rx="7" ry="9" fill="#1e3a8a" />
          <rect x="186" y="460" width="8" height="14" rx="1" fill="#1e3a8a" />
          <line x1="186" y1="468" x2="180" y2="476" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="194" y1="468" x2="200" y2="476" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="188" y1="474" x2="186" y2="484" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="194" y1="474" x2="196" y2="484" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Bottom gradient fade */}
        <rect width="480" height="580" rx="24" fill="url(#bottomFade)" />

        {/* ── Bottom text: AWARE TODAY. EMPOWER TOMORROW ── */}
        <line x1="40" y1="570" x2="150" y2="570" stroke="#1d4ed8" strokeWidth="0.8" strokeOpacity="0.6" />
        <text x="240" y="574" textAnchor="middle"
          fontFamily="Space Grotesk, sans-serif" fontSize="9"
          fontWeight="600" letterSpacing="3"
          fill="#3b82f6" fillOpacity="0.7">
          AWARE TODAY. EMPOWER TOMORROW.
        </text>
        <line x1="330" y1="570" x2="440" y2="570" stroke="#1d4ed8" strokeWidth="0.8" strokeOpacity="0.6" />
      </svg>

      {/* ── Outer box glow ── */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          boxShadow: '0 0 60px rgba(59,130,246,0.25), 0 0 120px rgba(29,78,216,0.15)',
          animation: 'aihv-glow 4s ease-in-out infinite',
        }}
      />
    </div>
  );
}

export type TopicKey =
  | 'ml' | 'dl' | 'nlp' | 'cv' | 'genai'
  | 'education' | 'healthcare' | 'business' | 'transport' | 'environment' | 'retail'
  | 'career-ml' | 'career-ds' | 'career-research' | 'career-nlp' | 'career-pm' | 'career-cv'
  | 'default';

const CSS = `
  @keyframes ta-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes ta-pulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
  @keyframes ta-dash { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
  @keyframes ta-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes ta-spin-r { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes ta-wave { 0%,100%{d:path("M 0 50 Q 60 30 120 50 Q 180 70 240 50 Q 300 30 360 50 L 360 100 L 0 100 Z")} 50%{d:path("M 0 50 Q 60 70 120 50 Q 180 30 240 50 Q 300 70 360 50 L 360 100 L 0 100 Z")} }
  @keyframes ta-scan { 0%,100%{transform:translateY(0)} 50%{transform:translateY(140px)} }
  @keyframes ta-data { 0%{transform:translateX(-20px);opacity:0} 50%{opacity:1} 100%{transform:translateX(20px);opacity:0} }
  @keyframes ta-grow { 0%{transform:scaleY(0)} 100%{transform:scaleY(1)} }
  @keyframes ta-orbit { from{transform:rotate(0deg) translateX(65px) rotate(0deg)} to{transform:rotate(360deg) translateX(65px) rotate(-360deg)} }
  @keyframes ta-beat { 0%,100%{transform:scale(1)} 30%{transform:scale(1.2)} 60%{transform:scale(0.95)} }
  @keyframes ta-fade-loop { 0%,100%{opacity:0.2} 50%{opacity:1} }
  @keyframes ta-slide-right { 0%{transform:translateX(-30px);opacity:0} 60%{opacity:1} 100%{transform:translateX(0px);opacity:0.8} }
  @keyframes ta-morph { 0%,100%{d:path("M180,110 L230,80 L280,110 L280,170 L230,200 L180,170 Z")} 50%{d:path("M170,100 L230,65 L290,100 L290,180 L230,215 L170,180 Z")} }
  @keyframes ta-blink { 0%,90%,100%{opacity:1} 95%{opacity:0.1} }
`;

/* ── Helpers ── */
const Nodes = ({ points, color, delay = 0 }: { points: number[][], color: string, delay?: number }) => (
  <>
    {points.map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="5" fill={color}
        style={{ animation: `ta-pulse 2s ${(i * 0.2 + delay).toFixed(1)}s ease-in-out infinite` }} />
    ))}
  </>
);

const Lines = ({ pairs, color = '#3b82f6', opacity = 0.5 }: { pairs: number[][][], color?: string, opacity?: number }) => (
  <>
    {pairs.map(([[x1, y1], [x2, y2]], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth="1.5" strokeOpacity={opacity}
        strokeDasharray="200" strokeDashoffset="200"
        style={{ animation: `ta-dash 2s ${(i * 0.15).toFixed(1)}s ease-in-out infinite` }} />
    ))}
  </>
);

/* ────────────────────────────────────────
   MACHINE LEARNING — scatter clustering
──────────────────────────────────────── */
function MLAnimation() {
  const cluster1 = [[80,80],[95,100],[70,115],[110,90],[85,130],[100,70]];
  const cluster2 = [[200,150],[220,130],[240,160],[210,175],[230,115],[250,140]];
  const cluster3 = [[310,80],[295,100],[325,115],[305,130],[340,90],[320,65]];
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full">
      <defs>
        <radialGradient id="ml-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0a0f1e" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#ml-bg)" rx="12" />
      {/* Grid */}
      {[50,100,150,200,250,300,350].map(x=><line key={x} x1={x} y1="20" x2={x} y2="260" stroke="#1e40af" strokeWidth="0.5" strokeOpacity="0.3" />)}
      {[50,100,150,200,250].map(y=><line key={y} x1="20" y1={y} x2="380" y2={y} stroke="#1e40af" strokeWidth="0.5" strokeOpacity="0.3" />)}
      {/* Cluster regions */}
      <circle cx="90" cy="100" r="52" fill="#3b82f6" fillOpacity="0.07" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="6 3" style={{transformOrigin:'90px 100px',animation:'ta-spin 20s linear infinite'}} />
      <circle cx="220" cy="148" r="52" fill="#06b6d4" fillOpacity="0.07" stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="6 3" style={{transformOrigin:'220px 148px',animation:'ta-spin-r 18s linear infinite'}} />
      <circle cx="315" cy="95" r="52" fill="#8b5cf6" fillOpacity="0.07" stroke="#8b5cf6" strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="6 3" style={{transformOrigin:'315px 95px',animation:'ta-spin 22s linear infinite'}} />
      {/* Data points */}
      <Nodes points={cluster1} color="#3b82f6" />
      <Nodes points={cluster2} color="#06b6d4" delay={0.3} />
      <Nodes points={cluster3} color="#8b5cf6" delay={0.6} />
      {/* Labels */}
      <text x="90" y="170" textAnchor="middle" fill="#60a5fa" fontSize="10" fontFamily="monospace">Cluster A</text>
      <text x="220" y="215" textAnchor="middle" fill="#22d3ee" fontSize="10" fontFamily="monospace">Cluster B</text>
      <text x="315" y="165" textAnchor="middle" fill="#a78bfa" fontSize="10" fontFamily="monospace">Cluster C</text>
      {/* Title */}
      <text x="200" y="258" textAnchor="middle" fill="#60a5fa" fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="600">Machine Learning — K-Means Clustering</text>
    </svg>
  );
}

/* ────────────────────────────────────────
   DEEP LEARNING — neural network layers
──────────────────────────────────────── */
function DLAnimation() {
  const layers = [
    { x: 60, nodes: [[60,60],[60,110],[60,160],[60,210]] },
    { x: 155, nodes: [[155,45],[155,95],[155,145],[155,195],[155,235]] },
    { x: 250, nodes: [[250,70],[250,120],[250,170],[250,215]] },
    { x: 340, nodes: [[340,100],[340,155],[340,200]] },
  ];
  const colors = ['#3b82f6','#06b6d4','#10b981','#f59e0b'];
  const connections: number[][][] = [];
  for (let l=0;l<layers.length-1;l++)
    for (const n1 of layers[l].nodes)
      for (const n2 of layers[l+1].nodes)
        connections.push([n1, n2]);
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full">
      <defs>
        <radialGradient id="dl-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#1a2744" />
          <stop offset="100%" stopColor="#0a0f1e" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#dl-bg)" rx="12" />
      {/* Connections */}
      {connections.slice(0,40).map(([[x1,y1],[x2,y2]],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#3b82f6" strokeWidth="0.7" strokeOpacity="0.2"
          strokeDasharray="200" strokeDashoffset="200"
          style={{animation:`ta-dash 3s ${(i*0.04).toFixed(2)}s ease-in-out infinite`}} />
      ))}
      {/* Nodes */}
      {layers.map((layer,li)=>
        layer.nodes.map(([x,y],ni)=>(
          <circle key={`${li}-${ni}`} cx={x} cy={y} r="9"
            fill={colors[li]} fillOpacity="0.85"
            style={{animation:`ta-pulse 2s ${(li*0.3+ni*0.15).toFixed(2)}s ease-in-out infinite`}} />
        ))
      )}
      {/* Layer labels */}
      {[{x:60,l:'Input'},{x:155,l:'Hidden 1'},{x:250,l:'Hidden 2'},{x:340,l:'Output'}].map(({x,l})=>(
        <text key={l} x={x} y="262" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">{l}</text>
      ))}
      <text x="200" y="14" textAnchor="middle" fill="#60a5fa" fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="600">Deep Neural Network</text>
    </svg>
  );
}

/* ────────────────────────────────────────
   NLP — attention tokens
──────────────────────────────────────── */
function NLPAnimation() {
  const tokens = ['The','AI','model','reads','and','understands','text'];
  const colors = ['#3b82f6','#06b6d4','#10b981','#f59e0b','#8b5cf6','#ec4899','#22d3ee'];
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full">
      <defs>
        <radialGradient id="nlp-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#1a2040" />
          <stop offset="100%" stopColor="#0a0f1e" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#nlp-bg)" rx="12" />
      {/* Tokens row 1 */}
      {tokens.map((tok, i) => (
        <g key={tok} style={{animation:`ta-pulse 2.5s ${(i*0.25).toFixed(2)}s ease-in-out infinite`}}>
          <rect x={18+i*52} y="50" width="46" height="30" rx="6"
            fill={colors[i]} fillOpacity="0.18" stroke={colors[i]} strokeWidth="1.2" strokeOpacity="0.7" />
          <text x={41+i*52} y="70" textAnchor="middle" fill={colors[i]} fontSize="11" fontWeight="600" fontFamily="monospace">{tok}</text>
        </g>
      ))}
      {/* Attention arcs */}
      {[[0,6,0.8],[1,5,0.6],[2,4,0.5],[3,6,0.7],[1,3,0.4]].map(([from,to,w],i)=>{
        const x1=41+from*52, x2=41+to*52;
        const cy = 50 - 20 - i*12;
        return (
          <path key={i} d={`M ${x1} 50 Q ${(x1+x2)/2} ${cy} ${x2} 50`}
            fill="none" stroke={colors[from as number]} strokeWidth={w as number}
            strokeOpacity="0.5" strokeDasharray="200" strokeDashoffset="200"
            style={{animation:`ta-dash 2s ${(i*0.3).toFixed(1)}s ease-in-out infinite`}} />
        );
      })}
      {/* Embedding visualization */}
      <text x="200" y="130" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="monospace">Contextual Embeddings</text>
      {tokens.map((_, i) => (
        <g key={i}>
          <rect x={18+i*52} y="145" width="46" height="60" rx="4" fill="none" stroke={colors[i]} strokeWidth="1" strokeOpacity="0.4" />
          {[0,1,2,3,4].map(j=>(
            <rect key={j} x={22+i*52} y={149+j*10} width={Math.random()*28+10} height="6" rx="2"
              fill={colors[i]} fillOpacity="0.4"
              style={{animation:`ta-fade-loop 2s ${((i+j)*0.2).toFixed(1)}s ease-in-out infinite`}} />
          ))}
        </g>
      ))}
      <text x="200" y="230" textAnchor="middle" fill="#60a5fa" fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="600">Natural Language Processing</text>
      <text x="200" y="248" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="monospace">Token → Attention → Embedding → Output</text>
    </svg>
  );
}

/* ────────────────────────────────────────
   COMPUTER VISION — grid scan
──────────────────────────────────────── */
function CVAnimation() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full">
      <defs>
        <radialGradient id="cv-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#1a2a30" />
          <stop offset="100%" stopColor="#0a0f1e" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#cv-bg)" rx="12" />
      {/* Image grid */}
      <rect x="80" y="30" width="160" height="160" fill="#0f172a" stroke="#1e40af" strokeWidth="1.5" />
      {[0,1,2,3].map(r=>[0,1,2,3].map(c=>(
        <rect key={`${r}-${c}`} x={80+c*40} y={30+r*40} width="40" height="40"
          fill={`hsl(${220+r*10+c*8},60%,${15+r*5+c*3}%)`}
          stroke="#1e40af" strokeWidth="0.5" />
      )))}
      {/* Face outline overlay */}
      <ellipse cx="160" cy="100" rx="52" ry="65" fill="none" stroke="#06b6d4" strokeWidth="2" strokeOpacity="0.8"
        strokeDasharray="6 3"
        style={{animation:'ta-spin 8s linear infinite',transformOrigin:'160px 100px'}} />
      {/* Feature points */}
      {[[138,78],[182,78],[160,98],[148,118],[172,118],[160,130]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="3.5" fill="#06b6d4"
          style={{animation:`ta-pulse 1.8s ${(i*0.2).toFixed(1)}s ease-in-out infinite`}} />
      ))}
      {/* Scan line */}
      <rect x="80" y="30" width="160" height="3" fill="none"
        stroke="#06b6d4" strokeWidth="2" strokeOpacity="0.9"
        style={{animation:'ta-scan 2.5s ease-in-out infinite'}} />
      {/* Detection box */}
      <rect x="108" y="48" width="104" height="110" fill="none" stroke="#22d3ee" strokeWidth="2"
        strokeDasharray="10 4"
        style={{animation:'ta-pulse 2s ease-in-out infinite'}} />
      {/* Corner brackets */}
      {[[108,48,1],[212,48,-1],[108,158,1],[212,158,-1]].map(([x,y,d],i)=>(
        <g key={i}>
          <line x1={x} y1={y} x2={x+(d as number)*15} y2={y} stroke="#22d3ee" strokeWidth="2.5" />
          <line x1={x} y1={y} x2={x} y2={y+(i<2?1:-1)*15} stroke="#22d3ee" strokeWidth="2.5" />
        </g>
      ))}
      {/* Label */}
      <rect x="108" y="40" width="80" height="16" fill="#0e7490" rx="3" />
      <text x="148" y="52" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace">FACE 98.7%</text>
      {/* Probabilities panel */}
      <rect x="260" y="30" width="118" height="160" fill="#0f172a" stroke="#1e40af" strokeWidth="1" rx="6" />
      <text x="319" y="50" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">Classification</text>
      {[['Face','#06b6d4',0.987],['Person','#3b82f6',0.95],['Eyes','#8b5cf6',0.88],['Nose','#10b981',0.76],['Mouth','#f59e0b',0.71]].map(([lbl,color,val],i)=>(
        <g key={lbl as string}>
          <text x="270" y={72+i*24} fill="#94a3b8" fontSize="9" fontFamily="monospace">{lbl as string}</text>
          <rect x="310" y={62+i*24} width="55" height="10" rx="3" fill="#1e293b" />
          <rect x="310" y={62+i*24} width={55*(val as number)} height="10" rx="3" fill={color as string} fillOpacity="0.7"
            style={{animation:`ta-grow 2s ${(i*0.15).toFixed(1)}s ease-out both`,transformOrigin:`310px ${62+i*24}px`}} />
          <text x="370" y={72+i*24} fill={color as string} fontSize="9" fontFamily="monospace">{Math.round((val as number)*100)}%</text>
        </g>
      ))}
      <text x="200" y="210" textAnchor="middle" fill="#60a5fa" fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="600">Computer Vision — Object Detection</text>
    </svg>
  );
}

/* ────────────────────────────────────────
   GENERATIVE AI — particle diffusion
──────────────────────────────────────── */
function GenAIAnimation() {
  const pts = Array.from({length:30},(_,i)=>({
    x: 200 + Math.cos(i/30*Math.PI*2)*80,
    y: 120 + Math.sin(i/30*Math.PI*2)*55,
    r: 3+Math.random()*4,
  }));
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full">
      <defs>
        <radialGradient id="gen-bg" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#1e1040" />
          <stop offset="100%" stopColor="#0a0f1e" />
        </radialGradient>
        <radialGradient id="gen-core" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#gen-bg)" rx="12" />
      {/* Core glow */}
      <circle cx="200" cy="120" r="70" fill="url(#gen-core)"
        style={{animation:'ta-pulse 2s ease-in-out infinite'}} />
      {/* Orbiting rings */}
      <circle cx="200" cy="120" r="90" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeOpacity="0.3"
        strokeDasharray="8 5"
        style={{transformOrigin:'200px 120px',animation:'ta-spin 10s linear infinite'}} />
      <circle cx="200" cy="120" r="110" fill="none" stroke="#ec4899" strokeWidth="0.8" strokeOpacity="0.25"
        strokeDasharray="5 8"
        style={{transformOrigin:'200px 120px',animation:'ta-spin-r 14s linear infinite'}} />
      {/* Particles */}
      {pts.map((p,i)=>(
        <circle key={i} cx={p.x} cy={p.y} r={p.r}
          fill={i%3===0?'#8b5cf6':i%3===1?'#ec4899':'#3b82f6'}
          style={{animation:`ta-pulse 2s ${(i*0.1).toFixed(1)}s ease-in-out infinite`}} />
      ))}
      {/* Central text */}
      <text x="200" y="112" textAnchor="middle" fill="white" fontSize="22" fontWeight="800" fontFamily="Space Grotesk, sans-serif"
        style={{filter:'drop-shadow(0 0 12px #8b5cf6)'}}>GenAI</text>
      <text x="200" y="132" textAnchor="middle" fill="#c084fc" fontSize="10" fontFamily="monospace">Generating new content</text>
      {/* Output examples */}
      {[{x:60,y:200,txt:'Text',col:'#3b82f6'},{x:160,y:210,txt:'Images',col:'#8b5cf6'},{x:260,y:200,txt:'Code',col:'#ec4899'},{x:350,y:208,txt:'Audio',col:'#06b6d4'}].map((item,i)=>(
        <g key={item.txt} style={{animation:`ta-slide-right 3s ${(i*0.4).toFixed(1)}s ease-in-out infinite`}}>
          <rect x={item.x-22} y={item.y-14} width="44" height="22" rx="8" fill={item.col} fillOpacity="0.15" stroke={item.col} strokeWidth="1" strokeOpacity="0.6" />
          <text x={item.x} y={item.y+2} textAnchor="middle" fill={item.col} fontSize="10" fontFamily="monospace">{item.txt}</text>
        </g>
      ))}
      <text x="200" y="262" textAnchor="middle" fill="#a78bfa" fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="600">Generative AI — Creating New Content</text>
    </svg>
  );
}

/* ────────────────────────────────────────
   EDUCATION
──────────────────────────────────────── */
function EducationAnimation() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full">
      <defs>
        <radialGradient id="edu-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#1a2744" />
          <stop offset="100%" stopColor="#0a0f1e" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#edu-bg)" rx="12" />
      {/* Book shape */}
      <rect x="120" y="50" width="80" height="120" rx="4" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5" />
      <rect x="200" y="50" width="80" height="120" rx="4" fill="#172040" stroke="#3b82f6" strokeWidth="1.5" />
      <line x1="200" y1="50" x2="200" y2="170" stroke="#3b82f6" strokeWidth="2" />
      {/* Book lines */}
      {[0,1,2,3,4].map(i=>(
        <g key={i}>
          <line x1="130" y1={72+i*16} x2="188" y2={72+i*16} stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.6"
            strokeDasharray="60" strokeDashoffset="60"
            style={{animation:`ta-dash 2s ${(i*0.2).toFixed(1)}s ease-in-out infinite`}} />
          <line x1="212" y1={72+i*16} x2="270" y2={72+i*16} stroke="#06b6d4" strokeWidth="1.5" strokeOpacity="0.6"
            strokeDasharray="60" strokeDashoffset="60"
            style={{animation:`ta-dash 2s ${(i*0.2+0.1).toFixed(1)}s ease-in-out infinite`}} />
        </g>
      ))}
      {/* Light rays from book */}
      {[-40,-20,0,20,40].map((angle,i)=>(
        <line key={i}
          x1="200" y1="50"
          x2={200+Math.sin(angle*Math.PI/180)*80}
          y2={50-Math.cos(angle*Math.PI/180)*80}
          stroke="#f59e0b" strokeWidth="1.5" strokeOpacity="0.5"
          strokeDasharray="80" strokeDashoffset="80"
          style={{animation:`ta-dash 2.5s ${(i*0.2).toFixed(1)}s ease-in-out infinite`}} />
      ))}
      {/* AI nodes branching from book */}
      {[{x:100,y:220,lbl:'Math'},{x:160,y:230,lbl:'Science'},{x:240,y:230,lbl:'History'},{x:300,y:220,lbl:'Coding'}].map((n,i)=>(
        <g key={n.lbl}>
          <line x1="200" y1="170" x2={n.x} y2={n.y-15} stroke="#3b82f6" strokeWidth="1.2" strokeOpacity="0.5"
            strokeDasharray="80" strokeDashoffset="80"
            style={{animation:`ta-dash 2s ${(i*0.25).toFixed(1)}s ease-in-out infinite`}} />
          <circle cx={n.x} cy={n.y} r="18" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"
            style={{animation:`ta-pulse 2s ${(i*0.25).toFixed(1)}s ease-in-out infinite`}} />
          <text x={n.x} y={n.y+4} textAnchor="middle" fill="#60a5fa" fontSize="8" fontFamily="monospace">{n.lbl}</text>
        </g>
      ))}
      <text x="200" y="262" textAnchor="middle" fill="#60a5fa" fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="600">AI in Education — Personalized Learning</text>
    </svg>
  );
}

/* ────────────────────────────────────────
   HEALTHCARE — heartbeat + AI
──────────────────────────────────────── */
function HealthcareAnimation() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full">
      <defs>
        <radialGradient id="hc-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#2a1020" />
          <stop offset="100%" stopColor="#0a0f1e" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#hc-bg)" rx="12" />
      {/* ECG line */}
      <path d="M 20 130 L 80 130 L 95 100 L 110 160 L 125 80 L 140 160 L 155 130 L 380 130"
        fill="none" stroke="#10b981" strokeWidth="2.5"
        strokeDasharray="500" strokeDashoffset="500"
        style={{animation:'ta-dash 3s ease-in-out infinite'}} />
      {/* Heart */}
      <g style={{animation:'ta-beat 1.2s ease-in-out infinite',transformOrigin:'200px 80px'}}>
        <path d="M 200 100 C 200 100 175 85 175 70 C 175 60 185 55 193 62 C 196 65 200 68 200 68 C 200 68 204 65 207 62 C 215 55 225 60 225 70 C 225 85 200 100 200 100 Z"
          fill="#ef4444" fillOpacity="0.9" />
      </g>
      {/* AI scan grid over heart */}
      {[-3,-2,-1,0,1,2,3].map(i=>(
        <line key={i} x1={177+i*7} y1="57" x2={200+i*3} y2="102"
          stroke="#f87171" strokeWidth="0.8" strokeOpacity="0.3" />
      ))}
      {/* Detection rings */}
      <circle cx="200" cy="80" r="45" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.4"
        strokeDasharray="6 4"
        style={{transformOrigin:'200px 80px',animation:'ta-spin 5s linear infinite'}} />
      {/* Data cards */}
      {[{x:60,y:180,lbl:'HR',val:'72 bpm',col:'#10b981'},{x:190,y:175,lbl:'SpO2',val:'98%',col:'#3b82f6'},{x:315,y:180,lbl:'AI Dx',val:'Normal',col:'#06b6d4'}].map(item=>(
        <g key={item.lbl} style={{animation:'ta-pulse 2s ease-in-out infinite'}}>
          <rect x={item.x-40} y={item.y-10} width="80" height="50" rx="8"
            fill="#0f172a" stroke={item.col} strokeWidth="1.5" />
          <text x={item.x} y={item.y+8} textAnchor="middle" fill={item.col} fontSize="10" fontFamily="monospace">{item.lbl}</text>
          <text x={item.x} y={item.y+24} textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Space Grotesk, sans-serif">{item.val}</text>
        </g>
      ))}
      <text x="200" y="263" textAnchor="middle" fill="#34d399" fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="600">AI in Healthcare — Real-Time Diagnostics</text>
    </svg>
  );
}

/* ────────────────────────────────────────
   BUSINESS — growing bar chart
──────────────────────────────────────── */
function BusinessAnimation() {
  const bars = [
    {h:60,col:'#3b82f6',lbl:'Q1'},{h:80,col:'#06b6d4',lbl:'Q2'},
    {h:55,col:'#3b82f6',lbl:'Q3'},{h:110,col:'#10b981',lbl:'Q4'},
    {h:90,col:'#06b6d4',lbl:'Q5'},{h:130,col:'#10b981',lbl:'Q6 AI'},
  ];
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full">
      <defs>
        <radialGradient id="biz-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#1a2030" />
          <stop offset="100%" stopColor="#0a0f1e" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#biz-bg)" rx="12" />
      {/* Axes */}
      <line x1="55" y1="200" x2="370" y2="200" stroke="#1e40af" strokeWidth="1.5" />
      <line x1="55" y1="40" x2="55" y2="200" stroke="#1e40af" strokeWidth="1.5" />
      {/* Y axis ticks */}
      {[0,40,80,120,160].map((v,i)=>(
        <text key={v} x="48" y={200-v+4} textAnchor="end" fill="#475569" fontSize="9" fontFamily="monospace">{i*25}K</text>
      ))}
      {/* Bars */}
      {bars.map((b,i)=>(
        <g key={b.lbl}>
          <rect x={75+i*48} y={200-b.h} width="36" height={b.h} rx="3"
            fill={b.col} fillOpacity="0.7"
            style={{animation:`ta-grow 2s ${(i*0.2).toFixed(1)}s ease-out both`,transformOrigin:`${75+i*48+18}px 200px`}} />
          <text x={93+i*48} y="214" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">{b.lbl}</text>
        </g>
      ))}
      {/* Trend line */}
      <polyline points="93,140 141,120 189,145 237,90 285,110 333,70"
        fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8 4"
        style={{strokeDashoffset:300,animation:'ta-dash 3s ease-in-out infinite'}} />
      {/* AI label on last bar */}
      <rect x="316" y="58" width="50" height="16" rx="4" fill="#059669" />
      <text x="341" y="70" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace">+43% AI</text>
      <text x="200" y="263" textAnchor="middle" fill="#60a5fa" fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="600">AI in Business — Revenue Growth</text>
    </svg>
  );
}

/* ────────────────────────────────────────
   TRANSPORT — route network
──────────────────────────────────────── */
function TransportAnimation() {
  const nodes = [[80,80],[200,50],[320,80],[100,170],[200,160],[300,170],[80,260],[200,240],[320,260]];
  const edges = [[0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5],[3,6],[4,7],[5,8],[6,7],[7,8]];
  const route = [[0,1],[1,2],[2,5],[5,8]];
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full">
      <defs>
        <radialGradient id="tr-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#0a1a30" />
          <stop offset="100%" stopColor="#0a0f1e" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#tr-bg)" rx="12" />
      {/* All edges */}
      {edges.map(([a,b],i)=>(
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="#1e40af" strokeWidth="1.5" strokeOpacity="0.3" />
      ))}
      {/* Optimal route */}
      {route.map(([a,b],i)=>(
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
          stroke="#10b981" strokeWidth="3" strokeOpacity="0.9"
          strokeDasharray="200" strokeDashoffset="200"
          style={{animation:`ta-dash 2s ${(i*0.4).toFixed(1)}s ease-in-out infinite`}} />
      ))}
      {/* City nodes */}
      {nodes.map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="12" fill={route.flat().includes(i)?'#059669':'#1e3a5f'}
            stroke={route.flat().includes(i)?'#10b981':'#3b82f6'} strokeWidth="2"
            style={{animation:`ta-pulse 2s ${(i*0.15).toFixed(1)}s ease-in-out infinite`}} />
          <text x={x} y={y+4} textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace">{String.fromCharCode(65+i)}</text>
        </g>
      ))}
      {/* Moving vehicle on route */}
      <circle cx="80" cy="80" r="6" fill="#f59e0b"
        style={{
          offsetPath:'path("M 80 80 L 200 50 L 320 80 L 300 170 L 320 260")',
          animation:'ta-spin 4s linear infinite',
        }} />
      <text x="200" y="288" textAnchor="middle" fill="#60a5fa" fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="600">AI in Transport — Route Optimization</text>
    </svg>
  );
}

/* ────────────────────────────────────────
   ENVIRONMENT — globe orbit
──────────────────────────────────────── */
function EnvironmentAnimation() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full">
      <defs>
        <radialGradient id="env-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#0a2010" />
          <stop offset="100%" stopColor="#0a0f1e" />
        </radialGradient>
        <radialGradient id="globe-fill" cx="45%" cy="40%">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="50%" stopColor="#065f46" />
          <stop offset="100%" stopColor="#064e3b" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#env-bg)" rx="12" />
      {/* Globe */}
      <circle cx="200" cy="130" r="80" fill="url(#globe-fill)" stroke="#10b981" strokeWidth="1.5" />
      {/* Continent hints */}
      <ellipse cx="178" cy="108" rx="28" ry="22" fill="#065f46" fillOpacity="0.8" />
      <ellipse cx="230" cy="118" rx="18" ry="28" fill="#065f46" fillOpacity="0.8" />
      <ellipse cx="200" cy="150" rx="24" ry="16" fill="#065f46" fillOpacity="0.7" />
      {/* Latitude/longitude lines */}
      <ellipse cx="200" cy="130" rx="80" ry="25" fill="none" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.4" />
      <ellipse cx="200" cy="130" rx="80" ry="50" fill="none" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.3" />
      <line x1="200" y1="50" x2="200" y2="210" stroke="#10b981" strokeWidth="0.8" strokeOpacity="0.3" />
      {/* Orbit ring */}
      <ellipse cx="200" cy="130" rx="115" ry="35" fill="none" stroke="#10b981" strokeWidth="1.5" strokeOpacity="0.5"
        strokeDasharray="8 5"
        style={{transformOrigin:'200px 130px',animation:'ta-spin 8s linear infinite'}} />
      {/* Satellite */}
      <circle cx="315" cy="130" r="7" fill="#3b82f6"
        style={{transformOrigin:'200px 130px',animation:'ta-orbit 8s linear infinite'}} />
      {/* Data points */}
      {[{x:80,y:80,lbl:'CO₂ -12%',col:'#10b981'},{x:300,y:65,lbl:'Temp +0.1°',col:'#f59e0b'},{x:70,y:200,lbl:'Forest +8%',col:'#34d399'},{x:300,y:205,lbl:'Ice -3%',col:'#06b6d4'}].map(item=>(
        <g key={item.lbl} style={{animation:'ta-pulse 2.5s ease-in-out infinite'}}>
          <line x1={item.x} y1={item.y} x2={200} y2={130} stroke={item.col} strokeWidth="0.8" strokeOpacity="0.3" />
          <rect x={item.x-30} y={item.y-10} width="60" height="18" rx="4" fill="#0f172a" stroke={item.col} strokeWidth="1" />
          <text x={item.x} y={item.y+4} textAnchor="middle" fill={item.col} fontSize="9" fontFamily="monospace">{item.lbl}</text>
        </g>
      ))}
      <text x="200" y="263" textAnchor="middle" fill="#34d399" fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="600">AI for Environment — Climate Monitoring</text>
    </svg>
  );
}

/* ────────────────────────────────────────
   RETAIL — product recommendation
──────────────────────────────────────── */
function RetailAnimation() {
  const products = ['Shoes','Laptop','Watch','Phone','Bag','Camera'];
  const colors = ['#3b82f6','#06b6d4','#10b981','#f59e0b','#8b5cf6','#ec4899'];
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full">
      <defs>
        <radialGradient id="ret-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#20102a" />
          <stop offset="100%" stopColor="#0a0f1e" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#ret-bg)" rx="12" />
      {/* AI brain node center */}
      <circle cx="200" cy="120" r="35" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2"
        style={{animation:'ta-pulse 2s ease-in-out infinite'}} />
      <text x="200" y="115" textAnchor="middle" fill="#c084fc" fontSize="10" fontFamily="monospace">AI</text>
      <text x="200" y="130" textAnchor="middle" fill="#c084fc" fontSize="8" fontFamily="monospace">Engine</text>
      {/* Product cards in orbit */}
      {products.map((p,i)=>{
        const angle=(i/6)*Math.PI*2-Math.PI/2;
        const x=200+Math.cos(angle)*100, y=120+Math.sin(angle)*85;
        return (
          <g key={p}>
            <line x1="200" y1="120" x2={x} y2={y}
              stroke={colors[i]} strokeWidth="1.2" strokeOpacity="0.4"
              strokeDasharray="120" strokeDashoffset="120"
              style={{animation:`ta-dash 2s ${(i*0.3).toFixed(1)}s ease-in-out infinite`}} />
            <rect x={x-25} y={y-18} width="50" height="36" rx="6"
              fill="#1e293b" stroke={colors[i]} strokeWidth="1.5"
              style={{animation:`ta-pulse 2s ${(i*0.3).toFixed(1)}s ease-in-out infinite`}} />
            <text x={x} y={y-4} textAnchor="middle" fill={colors[i]} fontSize="9" fontFamily="monospace">{p}</text>
            <rect x={x-18} y={y+2} width="36" height="6" rx="2" fill={colors[i]} fillOpacity="0.4" />
          </g>
        );
      })}
      {/* Recommendation score */}
      <rect x="150" y="230" width="100" height="24" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1" />
      <text x="200" y="246" textAnchor="middle" fill="#c084fc" fontSize="10" fontFamily="monospace">Match Score: 97%</text>
      <text x="200" y="270" textAnchor="middle" fill="#a78bfa" fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="600">AI in Retail — Smart Recommendations</text>
    </svg>
  );
}

/* ────────────────────────────────────────
   CAREER animations (reuse DL/ML variants)
──────────────────────────────────────── */
function CareerMLAnimation() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full">
      <defs>
        <radialGradient id="cml-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#1a2a44" />
          <stop offset="100%" stopColor="#0a0f1e" />
        </radialGradient>
      </defs>
      <rect width="400" height="280" fill="url(#cml-bg)" rx="12" />
      {/* Pipeline flow */}
      {['Data','Feature Eng.','Training','Evaluation','Deployment'].map((step,i)=>{
        const x=40+i*72;
        return (
          <g key={step}>
            <rect x={x} y="100" width="64" height="50" rx="8" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.5"
              style={{animation:`ta-pulse 2s ${(i*0.3).toFixed(1)}s ease-in-out infinite`}} />
            <text x={x+32} y="122" textAnchor="middle" fill="#60a5fa" fontSize="8" fontFamily="monospace">{step.split(' ')[0]}</text>
            <text x={x+32} y="136" textAnchor="middle" fill="#60a5fa" fontSize="8" fontFamily="monospace">{step.split(' ')[1]||''}</text>
            {i<4&&<path d={`M ${x+64} 125 L ${x+72} 125`} fill="none" stroke="#06b6d4" strokeWidth="2"
              strokeDasharray="20" strokeDashoffset="20"
              style={{animation:`ta-dash 2s ${(i*0.3).toFixed(1)}s ease-in-out infinite`}} />}
          </g>
        );
      })}
      {/* Salary band */}
      <rect x="50" y="195" width="300" height="40" rx="8" fill="#0f172a" stroke="#1e40af" strokeWidth="1" />
      <rect x="55" y="200" width="200" height="30" rx="6" fill="#1d4ed8" fillOpacity="0.5"
        style={{animation:'ta-grow 2s ease-out both',transformOrigin:'55px 215px'}} />
      <text x="200" y="220" textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Space Grotesk, sans-serif">$120K – $200K / year</text>
      <text x="200" y="263" textAnchor="middle" fill="#60a5fa" fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="600">ML Engineer — Career Path</text>
    </svg>
  );
}

function CareerDSAnimation() {
  return <BusinessAnimation />;
}
function CareerResearchAnimation() {
  return <GenAIAnimation />;
}
function CareerNLPAnimation() {
  return <NLPAnimation />;
}
function CareerPMAnimation() {
  return <BusinessAnimation />;
}
function CareerCVAnimation() {
  return <CVAnimation />;
}

/* ────────────────────────────────────────
   DEFAULT fallback
──────────────────────────────────────── */
function DefaultAnimation() {
  return <DLAnimation />;
}

const animationMap: Record<TopicKey, () => JSX.Element> = {
  ml: MLAnimation,
  dl: DLAnimation,
  nlp: NLPAnimation,
  cv: CVAnimation,
  genai: GenAIAnimation,
  education: EducationAnimation,
  healthcare: HealthcareAnimation,
  business: BusinessAnimation,
  transport: TransportAnimation,
  environment: EnvironmentAnimation,
  retail: RetailAnimation,
  'career-ml': CareerMLAnimation,
  'career-ds': CareerDSAnimation,
  'career-research': CareerResearchAnimation,
  'career-nlp': CareerNLPAnimation,
  'career-pm': CareerPMAnimation,
  'career-cv': CareerCVAnimation,
  default: DefaultAnimation,
};

interface TopicAnimationProps {
  topicKey: TopicKey;
  className?: string;
}

export default function TopicAnimation({ topicKey, className = '' }: TopicAnimationProps) {
  const Animation = animationMap[topicKey] || DefaultAnimation;
  return (
    <div className={`w-full rounded-2xl overflow-hidden border border-blue-500/15 bg-navy-950 ${className}`}>
      <style>{CSS}</style>
      <Animation />
    </div>
  );
}

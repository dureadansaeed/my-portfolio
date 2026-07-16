import { useState, useEffect, useRef } from "react";
import {
  motion, useScroll, useTransform, useInView,
  AnimatePresence, useMotionValue, useSpring,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   SVG ICON LIBRARY  — inline, no deps
═══════════════════════════════════════════════════════════════ */
const Icon = ({ name, size = 20, color = "currentColor", className = "" }) => {
  const s = size;
  const icons = {
    medal: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
    robot: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="11" width="18" height="10" rx="2"/><path d="M12 11V7"/><circle cx="12" cy="5" r="2"/>
        <line x1="8" y1="15" x2="8" y2="15" strokeWidth="2.5"/><line x1="12" y1="15" x2="12" y2="15" strokeWidth="2.5"/><line x1="16" y1="15" x2="16" y2="15" strokeWidth="2.5"/>
        <path d="M6 11V9a6 6 0 0112 0v2"/>
      </svg>
    ),
    cpu: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
        <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
        <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
        <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
        <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
      </svg>
    ),
    briefcase: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12" strokeWidth="2.5"/>
      </svg>
    ),
    graduation: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    pencil: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    arm: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 12l2 2 4-4"/><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 012 2v12H5V7z"/><path d="M9 19v2m6-2v2"/>
      </svg>
    ),
    calendar: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    hand: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 11V6a2 2 0 00-2-2v0a2 2 0 00-2 2v0"/><path d="M14 10V4a2 2 0 00-2-2v0a2 2 0 00-2 2v2"/><path d="M10 10.5V6a2 2 0 00-2-2v0a2 2 0 00-2 2v8"/><path d="M18 8a2 2 0 114 0v6a8 8 0 01-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 012.83-2.82L7 15"/>
      </svg>
    ),
    mail: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    linkedin: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
    github: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
      </svg>
    ),
    zap: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    layers: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    target: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    compass: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
    star: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    link: (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:'DM Sans',sans-serif;background:#00000a;color:#dde0ff;overflow-x:hidden}
    .fd{font-family:'Syne',sans-serif}
    ::-webkit-scrollbar{width:2px}
    ::-webkit-scrollbar-track{background:#00000a}
    ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#6d28d9,#1d4ed8);border-radius:2px}
    ::selection{background:rgba(109,40,217,.4);color:#fff}

    .glass {background:rgba(255,255,255,.03);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.07)}
    .glass2{background:rgba(255,255,255,.06);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,.1)}
    .gt{background:linear-gradient(100deg,#a78bfa,#60a5fa,#67e8f9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

    a, button, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"]){outline:none}
    a:focus-visible, button:focus-visible, [role="button"]:focus-visible, [role="link"]:focus-visible, [tabindex]:not([tabindex="-1"]):focus-visible{
      outline:2px solid rgba(103,232,249,.95);
      outline-offset:3px;
      box-shadow:0 0 0 4px rgba(109,40,217,.22);
      border-radius:999px;
    }
    .skip-link{position:absolute;left:1rem;top:-3rem;z-index:300;display:inline-flex;align-items:center;justify-content:center;padding:.8rem 1rem;border-radius:999px;background:rgba(109,40,217,.95);color:#fff;text-decoration:none;font-size:.8rem;letter-spacing:.16em;text-transform:uppercase;transition:top .2s ease,box-shadow .2s ease}
    .skip-link:focus{top:1rem;box-shadow:0 0 0 4px rgba(103,232,249,.25)}

    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      .star, .norb, .wstreak, .rush-star, .pulse-glow { animation: none !important; }
      .star { opacity: .35 !important; }
      .norb { transform: none !important; }
    }

    @keyframes twinkle    {0%,100%{opacity:.1;transform:scale(1)}50%{opacity:1;transform:scale(1.7)}}
    @keyframes ndrift     {0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(24px,-16px) scale(1.04)}66%{transform:translate(-16px,12px) scale(.97)}}
    @keyframes spin-cw    {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes spin-ccw   {from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
    @keyframes pulse-glow {0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.1)}}
    @keyframes bh-rotate  {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes warp-streak{0%{transform:scaleX(0);opacity:0}15%{opacity:1}100%{transform:scaleX(1);opacity:0}}
    @keyframes star-rush  {0%{transform:translateZ(0) scale(1);opacity:.3}100%{transform:translateZ(800px) scale(12);opacity:0}}
    @keyframes float-card {0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}

    .star      {position:absolute;border-radius:50%;background:white;animation:twinkle var(--d,3s) ease-in-out infinite;animation-delay:var(--dl,0s)}
    .norb      {position:absolute;border-radius:50%;filter:blur(90px);animation:ndrift var(--nd,14s) ease-in-out infinite;animation-delay:var(--ndl,0s)}
    .wstreak   {position:absolute;height:1px;transform-origin:left center;animation:warp-streak var(--wd,.5s) ease-out forwards;animation-delay:var(--wdl,0s)}
    .rush-star {position:absolute;border-radius:50%;background:white;animation:star-rush var(--sd,.8s) ease-in forwards;animation-delay:var(--sdl,0s)}
  `}</style>
);

/* ═══════════════════════════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════════════════════════ */
const BG_STARS   = Array.from({length:220},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,s:Math.random()*2.2+.3,d:`${(Math.random()*4+1.5).toFixed(1)}s`,dl:`${(Math.random()*7).toFixed(1)}s`,op:(Math.random()*.55+.07).toFixed(2)}));
const WARP_STREAKS= Array.from({length:60},(_,i)=>({id:i,top:`${Math.random()*100}%`,left:`${Math.random()*40+10}%`,width:`${Math.random()*280+60}px`,wd:`${(Math.random()*.35+.2).toFixed(2)}s`,wdl:`${(Math.random()*.28).toFixed(2)}s`,op:(Math.random()*.6+.3).toFixed(2),col:["rgba(167,139,250,","rgba(96,165,250,","rgba(255,255,255,"][i%3]}));
const RUSH_STARS  = Array.from({length:80},(_,i)=>({id:i,left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,size:Math.random()*3+1,sd:`${(Math.random()*.5+.4).toFixed(2)}s`,sdl:`${(Math.random()*.3).toFixed(2)}s`}));

/* ═══════════════════════════════════════════════════════════════
   STAR FIELD
═══════════════════════════════════════════════════════════════ */
const StarField = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {BG_STARS.map(s=><div key={s.id} className="star" style={{left:`${s.x}%`,top:`${s.y}%`,width:s.s,height:s.s,"--d":s.d,"--dl":s.dl,opacity:s.op}}/>)}
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   CURSOR GLOW
═══════════════════════════════════════════════════════════════ */
const CursorGlow = () => {
  const mx=useMotionValue(-500),my=useMotionValue(-500);
  const sx=useSpring(mx,{stiffness:90,damping:20}),sy=useSpring(my,{stiffness:90,damping:20});
  useEffect(()=>{const fn=e=>{mx.set(e.clientX);my.set(e.clientY)};window.addEventListener("mousemove",fn);return()=>window.removeEventListener("mousemove",fn)},[]);
  return <motion.div className="fixed pointer-events-none z-50 rounded-full" style={{left:sx,top:sy,width:460,height:460,x:"-50%",y:"-50%",background:"radial-gradient(circle,rgba(109,40,217,.07) 0%,transparent 65%)"}}/>;
};

/* ═══════════════════════════════════════════════════════════════
   WARP TRANSITION
═══════════════════════════════════════════════════════════════ */
const WarpTransition = ({active,destination}) => (
  <AnimatePresence>
    {active&&(
      <motion.div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
        initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:.25}}>
        <motion.div className="absolute inset-0" initial={{opacity:0}} animate={{opacity:[0,1,1,0]}} transition={{duration:.9,times:[0,.15,.75,1]}} style={{background:"#00000a"}}/>
        {RUSH_STARS.map(s=><div key={s.id} className="rush-star" style={{left:s.left,top:s.top,width:s.size,height:s.size,"--sd":s.sd,"--sdl":s.sdl,opacity:.9}}/>)}
        {WARP_STREAKS.map(s=><div key={s.id} className="wstreak" style={{top:s.top,left:s.left,width:s.width,"--wd":s.wd,"--wdl":s.wdl,opacity:s.op,background:`linear-gradient(90deg,transparent,${s.col}0.9),transparent)`}}/>)}
        <motion.div className="absolute inset-0" initial={{opacity:0}} animate={{opacity:[0,.7,0]}} transition={{duration:.9,times:[0,.4,1]}} style={{background:"radial-gradient(ellipse at center,transparent 15%,#00000a 75%)"}}/>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div initial={{scale:0,opacity:.9}} animate={{scale:6,opacity:0}} transition={{duration:.7,ease:"easeOut"}}
            style={{width:200,height:200,borderRadius:"50%",border:"2px solid rgba(139,92,246,.7)",boxShadow:"0 0 40px rgba(139,92,246,.5),inset 0 0 40px rgba(139,92,246,.3)"}}/>
        </div>
        <motion.div className="absolute inset-0" initial={{opacity:0}} animate={{opacity:[0,.18,0]}} transition={{duration:.5,times:[0,.2,1]}} style={{background:"radial-gradient(ellipse at center,rgba(109,40,217,.6),transparent 60%)"}}/>
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{opacity:0}} animate={{opacity:[0,1,1,0]}} transition={{duration:.9,times:[0,.25,.75,1]}}>
          <div className="fd text-[10px] tracking-[.45em] uppercase mb-2" style={{color:"rgba(167,139,250,.5)"}}>Warping to</div>
          <div className="fd font-800 text-white text-2xl md:text-4xl tracking-wide" style={{textShadow:"0 0 40px rgba(139,92,246,.9),0 0 80px rgba(96,165,250,.5)"}}>{destination}</div>
          <motion.div className="mt-4" style={{width:180,height:1,background:"linear-gradient(90deg,transparent,rgba(139,92,246,.8),transparent)"}} animate={{scaleX:[0,1,0]}} transition={{duration:.6,delay:.15}}/>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ═══════════════════════════════════════════════════════════════
   WARP TRIGGER HOOK
═══════════════════════════════════════════════════════════════ */
const useWarpOnEnter=(dest,setWarp)=>{
  const ref=useRef(null);
  const inView=useInView(ref,{once:true,amount:.18});
  useEffect(()=>{if(inView){setWarp(dest);const t=setTimeout(()=>setWarp(null),950);return()=>clearTimeout(t)}},[inView]);
  return ref;
};

/* ═══════════════════════════════════════════════════════════════
   SHARED UTILS
═══════════════════════════════════════════════════════════════ */
const useReveal=(amt=.12)=>{const ref=useRef(null);const inView=useInView(ref,{once:true,amount:amt});return[ref,inView]};
const useReducedMotion=()=>{
  const [prefersReducedMotion,setPrefersReducedMotion]=useState(false);
  useEffect(()=>{
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mediaQuery=window.matchMedia("(prefers-reduced-motion: reduce)");
    const update=()=>setPrefersReducedMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener?.("change",update);
    return ()=>mediaQuery.removeEventListener?.("change",update);
  },[]);
  return prefersReducedMotion;
};
const useSectionVisibility=(amt=.1)=>{const ref=useRef(null);const inView=useInView(ref,{once:false,amount:amt});return[ref,inView]};
const fU={h:{opacity:0,y:50},v:(i=0)=>({opacity:1,y:0,transition:{duration:.8,delay:i*.08,ease:[.16,1,.3,1]}})};
const fS={h:{opacity:0,scale:.9},v:(i=0)=>({opacity:1,scale:1,transition:{duration:.7,delay:i*.07,ease:[.16,1,.3,1]}})};

const SLabel=({text})=>(
  <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 mb-5" style={{border:"1px solid rgba(139,92,246,.2)"}}>
    <div className="w-1.5 h-1.5 rounded-full bg-violet-400" style={{boxShadow:"0 0 5px rgba(167,139,250,1)"}}/>
    <span className="text-[10px] tracking-[.25em] uppercase text-violet-300/80">{text}</span>
  </div>
);
const SHead=({label,line1,accent,inView})=>(
  <motion.div variants={fU} initial="h" animate={inView?"v":"h"} className="mb-12 md:mb-16">
    <SLabel text={label}/>
    <h2 className="fd font-800 leading-[.92]" style={{fontSize:"clamp(2rem,5vw,4rem)"}}>
      <span className="text-white">{line1}</span><br/>
      <span className="gt">{accent}</span>
    </h2>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════
   COCKPIT DIVIDER
═══════════════════════════════════════════════════════════════ */
const CockpitDivider=({from,to})=>{
  const [ref,inView]=useReveal(.6);
  return(
    <div ref={ref} className="relative py-20 overflow-hidden flex items-center justify-center" style={{background:"linear-gradient(180deg,transparent,rgba(0,0,10,.85),transparent)"}}>
      {Array.from({length:20},(_,i)=>(
        <motion.div key={i} initial={{scaleX:0,opacity:0}} animate={inView?{scaleX:1,opacity:[0,.6,0]}:{}} transition={{duration:.65,delay:i*.03,ease:"easeOut"}}
          className="absolute h-px" style={{top:`${Math.random()*100}%`,left:`${Math.random()*20}%`,width:`${Math.random()*45+15}%`,transformOrigin:"left",
          background:`linear-gradient(90deg,transparent,${i%3===0?"rgba(167,139,250,.8)":i%3===1?"rgba(96,165,250,.7)":"rgba(255,255,255,.4)"},transparent)`}}/>
      ))}
      <motion.div initial={{opacity:0,scale:.92}} animate={inView?{opacity:1,scale:1}:{}} transition={{duration:.5,delay:.1}}
        className="relative z-10 glass2 rounded-2xl px-8 py-4 flex flex-col items-center gap-2" style={{border:"1px solid rgba(139,92,246,.22)",minWidth:260}}>
        <motion.div className="absolute top-0 left-0 right-0 h-px" style={{background:"linear-gradient(90deg,transparent,rgba(139,92,246,.6),transparent)"}} animate={inView?{scaleX:[0,1]}:{}} transition={{duration:.5,delay:.2}}/>
        <div className="fd text-[8px] tracking-[.4em] uppercase text-violet-400/80 mb-1">// NAV SYSTEM //</div>
        <div className="flex items-center gap-4">
          <div className="text-right"><div className="text-[8px] tracking-[.2em] uppercase text-white/70 mb-0.5">Departing</div><div className="fd font-600 text-xs text-white/75">{from}</div></div>
          <div className="flex items-center gap-0.5 px-2">
            {[0,1,2,3].map(i=>(
              <motion.div key={i} animate={inView?{opacity:[0,1,0]}:{}} transition={{duration:.5,delay:.3+i*.08,repeat:Infinity,repeatDelay:.9}}
                style={{width:7,height:1,background:`rgba(${i<2?"167,139,250":"96,165,250"},${.9-i*.1})`}}/>
            ))}
            <motion.span animate={inView?{x:[0,4,0]}:{}} transition={{duration:.5,delay:.3,repeat:Infinity,repeatDelay:.9}}
              className="fd font-700 text-sm ml-1" style={{color:"rgba(167,139,250,.9)"}}>›</motion.span>
          </div>
          <div><div className="text-[8px] tracking-[.2em] uppercase text-violet-400/80 mb-0.5">Arriving</div><div className="fd font-700 text-xs gt">{to}</div></div>
        </div>
        <div className="w-full h-px mt-1" style={{background:"rgba(255,255,255,.05)"}}>
          <motion.div className="h-full origin-left" initial={{scaleX:0}} animate={inView?{scaleX:1}:{}} transition={{duration:.7,delay:.25,ease:"easeInOut"}} style={{background:"linear-gradient(90deg,#6d28d9,#2563eb,#67e8f9)"}}/>
        </div>
        <motion.div className="absolute bottom-0 left-0 right-0 h-px" style={{background:"linear-gradient(90deg,transparent,rgba(96,165,250,.4),transparent)"}} animate={inView?{scaleX:[0,1]}:{}} transition={{duration:.5,delay:.3}}/>
      </motion.div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ① HERO
═══════════════════════════════════════════════════════════════ */
const ROLES=["Agentic AI & ML Engineer","Robotics Builder","4× Gold Medalist","Full-Stack Dev"];
const Hero=({setWarp})=>{
  const {scrollY}=useScroll();
  const yP=useTransform(scrollY,[0,800],[0,180]);
  const opP=useTransform(scrollY,[0,500],[1,0]);
  const [ri,setRi]=useState(0);
  const prefersReducedMotion=useReducedMotion();
  const [ambientRef,ambientInView]=useSectionVisibility(.1);
  useEffect(()=>{const t=setInterval(()=>setRi(i=>(i+1)%ROLES.length),3000);return()=>clearInterval(t)},[]);

  return(
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 overflow-hidden">
      <div ref={ambientRef} className="absolute inset-0 pointer-events-none">
        {(ambientInView || !ambientRef.current) && (
          <>
            <div className="norb" style={{top:"-12%",left:"-8%",width:700,height:700,"--nd":"16s",background:"radial-gradient(circle,rgba(109,40,217,.45) 0%,rgba(109,40,217,.04) 55%,transparent 72%)",animation:prefersReducedMotion?"none":"ndrift 16s ease-in-out infinite"}}/>
            <div className="norb" style={{top:"30%",right:"-15%",width:600,height:600,"--nd":"20s","--ndl":"4s",background:"radial-gradient(circle,rgba(29,78,216,.5) 0%,rgba(29,78,216,.04) 55%,transparent 72%)",animation:prefersReducedMotion?"none":"ndrift 20s ease-in-out infinite"}}/>
            <div className="norb" style={{bottom:"-5%",left:"20%",width:800,height:800,"--nd":"24s","--ndl":"8s",background:"radial-gradient(circle,rgba(147,51,234,.22) 0%,rgba(79,70,229,.03) 55%,transparent 70%)",animation:prefersReducedMotion?"none":"ndrift 24s ease-in-out infinite"}}/>
          </>
        )}
      </div>

      {/* Entry streaks */}
      <motion.div className="absolute inset-0 pointer-events-none" initial={{opacity:1}} animate={{opacity:0}} transition={{duration:1.1,delay:.5}}>
        {Array.from({length:18},(_,i)=>(
          <div key={i} className="absolute h-px" style={{top:`${Math.random()*100}%`,left:0,width:`${Math.random()*44+16}%`,
            background:`linear-gradient(90deg,transparent,${i%3===0?"rgba(167,139,250,.85)":i%3===1?"rgba(96,165,250,.75)":"rgba(255,255,255,.5)"},transparent)`,
            animation:`warp-streak ${.25+Math.random()*.4}s ease-out forwards`,animationDelay:`${Math.random()*.35}s`}}/>
        ))}
      </motion.div>

      <motion.div style={{y:yP,opacity:opP}} className="relative z-10 max-w-7xl mx-auto w-full pt-20">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.8,duration:.7}}
          className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-10" style={{border:"1px solid rgba(139,92,246,.2)"}}>
          <div className="pulse-glow w-1.5 h-1.5 rounded-full" style={{background:"#67e8f9",boxShadow:"0 0 6px #67e8f9"}}/>
          <span className="text-xs tracking-[.22em] uppercase text-white/70">NUCES FAST · Islamabad · 4× Gold Medalist</span>
        </motion.div>

        <h1 className="overflow-hidden mb-3">
          <motion.div className="flex flex-wrap" initial="h" animate="v" variants={{v:{transition:{staggerChildren:.05,delayChildren:.9}}}}>
            {"Dur E Adan".split("").map((ch,i)=>(
              <motion.span key={i} variants={{h:{y:100,opacity:0,filter:"blur(10px)"},v:{y:0,opacity:1,filter:"blur(0px)",transition:{duration:.8,ease:[.16,1,.3,1]}}}}
                className="fd font-800 text-white"
                style={{fontSize:"clamp(3rem,8.5vw,8.5rem)",lineHeight:.9,letterSpacing:"-.02em",marginRight:ch===" "?"clamp(10px,2vw,24px)":0}}>
                {ch!==" "?ch:"\u00A0"}
              </motion.span>
            ))}
          </motion.div>
        </h1>

        <div className="flex items-center gap-4 mb-8">
          <motion.div initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:1.6,duration:.8,ease:[.16,1,.3,1]}} className="h-px w-14 origin-left" style={{background:"linear-gradient(90deg,#7c3aed,#2563eb)"}}/>
          <AnimatePresence mode="wait">
            <motion.span key={ri} initial={{opacity:0,y:14,filter:"blur(12px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} exit={{opacity:0,y:-14,filter:"blur(12px)"}} transition={{duration:.5}}
              className="fd font-700 gt" style={{fontSize:"clamp(1.1rem,2.5vw,2rem)"}}>
              {ROLES[ri]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:1.2,duration:.7}}
          className="text-base md:text-lg font-light mb-10 max-w-lg leading-relaxed" style={{color:"rgba(255,255,255,.72)"}}>
          I study AI at NUCES FAST and spend most of my time actually building things — robots that walk, agents that learn, and web apps that ship.
        </motion.p>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-xl">
          {[
            {n:"4×",l:"Gold Medalist",icon:"medal"},
            {n:"3",l:"AI Projects",icon:"cpu"},
            {n:"ROS2",l:"Robotics",icon:"robot"},
            {n:"'25",l:"Avancod Intern",icon:"briefcase"},
          ].map((s,i)=>(
            <motion.div key={s.l} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:1.3+i*.1,duration:.6}}
              whileHover={{scale:1.06,borderColor:"rgba(139,92,246,.5)"}}
              className="glass rounded-2xl p-4 text-center transition-all duration-300" style={{border:"1px solid rgba(255,255,255,.07)"}}>
              <div className="flex justify-center mb-2 text-violet-400/60">
                <Icon name={s.icon} size={18} color="rgba(167,139,250,.7)"/>
              </div>
              <div className="fd font-700 text-xl text-white">{s.n}</div>
              <div className="text-[10px] tracking-[.15em] uppercase text-white/70 mt-0.5">{s.l}</div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:1.6,duration:.7}} className="flex flex-wrap gap-4">
          <motion.a href="#work" whileHover={{scale:1.03}} whileTap={{scale:.97}} aria-label="View my projects"
            className="inline-flex items-center gap-3 px-7 py-3.5 text-sm tracking-[.12em] uppercase font-medium text-white rounded-xl"
            style={{background:"linear-gradient(135deg,rgba(109,40,217,.85),rgba(29,78,216,.85))",border:"1px solid rgba(139,92,246,.4)",backdropFilter:"blur(20px)"}}>
            <span className="sr-only">View my projects</span>
            <span>Launch Mission</span>
            <motion.span animate={{x:[0,5,0]}} transition={{repeat:Infinity,duration:1.8}}>→</motion.span>
          </motion.a>
          <motion.a href="#about" whileHover={{scale:1.02}} aria-label="Learn more about me" className="glass inline-flex items-center px-7 py-3.5 text-sm tracking-[.12em] uppercase rounded-xl text-white/70 hover:text-white/90 transition-colors duration-300">
            <span className="sr-only">Learn more about me</span>
            <span>My Universe</span>
          </motion.a>
          <motion.a href="/resume.pdf" target="_blank" rel="noopener noreferrer" whileHover={{scale:1.02}} aria-label="View resume in new tab"
            className="inline-flex items-center gap-3 px-7 py-3.5 text-sm tracking-[.12em] uppercase font-medium text-white rounded-xl"
            style={{background:"linear-gradient(135deg,rgba(29,78,216,.6),rgba(6,182,212,.45))",border:"1px solid rgba(96,165,250,.28)",backdropFilter:"blur(24px)"}}>
            <span>View Resume</span>
          </motion.a>
          <motion.a href="/resume.pdf" download="resume.pdf" whileHover={{scale:1.02}} aria-label="Download resume PDF"
            className="glass inline-flex items-center px-7 py-3.5 text-sm tracking-[.12em] uppercase rounded-xl text-white/70 hover:text-white/90 transition-colors duration-300">
            <span>Download Resume</span>
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.2}} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[9px] tracking-[.3em] uppercase text-white/70">Nebula Cloud ahead</span>
        <motion.div animate={{y:[0,10,0]}} transition={{repeat:Infinity,duration:2,ease:"easeInOut"}} className="w-px h-8" style={{background:"linear-gradient(180deg,rgba(139,92,246,.8),transparent)"}}/>
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ② ABOUT — NEBULA CLOUD
═══════════════════════════════════════════════════════════════ */
const About=({setWarp})=>{
  const [ref,inView]=useReveal();
  const [ambientRef,ambientInView]=useSectionVisibility(.1);
  const prefersReducedMotion=useReducedMotion();
  const warpRef=useWarpOnEnter("Nebula Cloud",setWarp);
  const HIGHLIGHTS=[
    {icon:"zap",   stat:"End-to-End Builder",  sub:"Simulation to production, start to finish"},
    {icon:"robot", stat:"ROS2 + RL",            sub:"Hexapod locomotion, Gymnasium environments"},
    {icon:"medal", stat:"4× Gold Medalist",     sub:"NUCES FAST — AI Engineering"},
  ];
  return(
    <>
    <CockpitDivider from="Deep Space" to="Nebula Cloud"/>
    <section id="about" ref={warpRef} className="relative py-28 md:py-36 px-8 md:px-20 overflow-hidden">
      <div ref={ambientRef} className="absolute inset-0 pointer-events-none">
        {(ambientInView || !ambientRef.current) && (
          <>
            <div className="norb" style={{top:"5%",left:"45%",width:600,height:600,"--nd":"18s",background:"radial-gradient(circle,rgba(139,92,246,.16) 0%,rgba(109,40,217,.04) 52%,transparent 70%)",animation:prefersReducedMotion?"none":"ndrift 18s ease-in-out infinite"}}/>
            <div className="norb" style={{bottom:"0%",right:"5%",width:400,height:400,"--nd":"13s","--ndl":"3s",background:"radial-gradient(circle,rgba(109,40,217,.18) 0%,transparent 65%)",animation:prefersReducedMotion?"none":"ndrift 13s ease-in-out infinite"}}/>
          </>
        )}
      </div>
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <SHead label="Nebula Cloud · About" line1="The Mind" accent="Behind the Code" inView={inView}/>

        <motion.p variants={fU} custom={1} initial="h" animate={inView?"v":"h"}
          className="text-base md:text-lg font-light mb-8 max-w-xl leading-relaxed" style={{color:"rgba(255,255,255,.72)"}}>
          First-year AI student at NUCES FAST Islamabad. I spend my free time breaking robots in Gazebo, training agents that mostly do the wrong thing, and occasionally shipping something that actually works.
        </motion.p>

        <motion.div variants={fU} custom={2} initial="h" animate={inView?"v":"h"} className="flex flex-wrap gap-3 mb-10">
          {[
            "4× Gold Medalist — Academic Excellence",
            "AI & Robotics Certificate — NUCES FAST"
          ].map(item=>(
            <span key={item} className="glass rounded-full px-3 py-1.5 text-[10px] tracking-[.16em] uppercase text-white/75" style={{border:"1px solid rgba(255,255,255,.06)"}}>{item}</span>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {HIGHLIGHTS.map((h,i)=>(
            <motion.div key={h.stat} custom={i} variants={fS} initial="h" animate={inView?"v":"h"}
              whileHover={{scale:1.04,borderColor:"rgba(139,92,246,.4)"}}
              className="glass2 rounded-2xl p-7 flex flex-col gap-4 transition-all duration-400"
              style={{border:"1px solid rgba(255,255,255,.08)",animation:`float-card ${4+i*1.2}s ease-in-out infinite`,animationDelay:`${i*.6}s`}}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:"rgba(139,92,246,.12)",border:"1px solid rgba(139,92,246,.2)"}}>
                <Icon name={h.icon} size={18} color="#a78bfa"/>
              </div>
              <div>
                <div className="fd font-700 text-base text-white mb-1">{h.stat}</div>
                <div className="text-xs text-white/70 leading-relaxed">{h.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fU} custom={4} initial="h" animate={inView?"v":"h"} className="flex flex-wrap gap-3">
          {[
            {l:"dureadan.wahid@gmail.com",h:"mailto:dureadan.wahid@gmail.com",icon:"mail"},
            {l:"LinkedIn",h:"https://linkedin.com/in/dur-e-adan-b3598a32b",icon:"linkedin"},
            {l:"GitHub",h:"https://github.com/dureadansaeed",icon:"github"},
          ].map(x=>(
            <a key={x.l} href={x.h} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs tracking-[.1em] text-violet-300/65 hover:text-violet-200 transition-colors duration-300"
              style={{border:"1px solid rgba(139,92,246,.2)"}}
              aria-label={x.l === "dureadan.wahid@gmail.com" ? "Email Dur E Adan" : x.l === "LinkedIn" ? "Visit Dur E Adan on LinkedIn" : "Visit Dur E Adan on GitHub"}>
              <Icon name={x.icon} size={13} color="rgba(167,139,250,.7)"/>
              {x.l}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ③ SKILLS — ASTEROID BELT  (SVG rings)
═══════════════════════════════════════════════════════════════ */
const R=42, CIRC=2*Math.PI*R;

const SkillRing=({label,pct,color,delay,inView})=>{
  const offset=CIRC-(pct/100)*CIRC;
  return(
    <motion.div initial={{opacity:0,scale:.8}} animate={inView?{opacity:1,scale:1}:{}} transition={{duration:.7,delay,ease:[.16,1,.3,1]}}
      className="flex flex-col items-center gap-2 group cursor-default">
      <div className="relative w-20 h-20 md:w-24 md:h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="5"/>
          <motion.circle cx="50" cy="50" r={R} fill="none" stroke={color} strokeWidth="5"
            strokeLinecap="round" strokeDasharray={CIRC}
            initial={{strokeDashoffset:CIRC}}
            animate={inView?{strokeDashoffset:offset}:{strokeDashoffset:CIRC}}
            transition={{duration:1.4,delay:delay+.2,ease:[.25,.46,.45,.94]}}
            style={{filter:`drop-shadow(0 0 5px ${color}88)`}}/>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="fd font-700 text-xs text-white">{pct}%</span>
        </div>
      </div>
      <span className="text-[10px] tracking-[.1em] uppercase text-center text-white/70 group-hover:text-white/85 transition-colors duration-300 max-w-[72px] leading-tight">{label}</span>
    </motion.div>
  );
};

const SKILL_GROUPS=[
  {cat:"AI / ML",    color:"#a78bfa", skills:[{l:"PyTorch / TF",p:88},{l:"Comp. Vision",p:86},{l:"Reinf. Learning",p:85},{l:"Scikit / NLTK",p:80}]},
  {cat:"Robotics",   color:"#60a5fa", skills:[{l:"ROS2",p:87},{l:"Gazebo / Rviz",p:82},{l:"Gymnasium",p:84},{l:"Inv. Kinematics",p:80}]},
  {cat:"Full Stack", color:"#67e8f9", skills:[{l:"React.js",p:85},{l:"Flask / APIs",p:83},{l:"MongoDB",p:82},{l:"Data Analytics",p:88}]},
];

const Skills=({setWarp})=>{
  const [ref,inView]=useReveal();
  const [ambientRef,ambientInView]=useSectionVisibility(.1);
  const prefersReducedMotion=useReducedMotion();
  const warpRef=useWarpOnEnter("Asteroid Belt",setWarp);
  return(
    <>
    <CockpitDivider from="Nebula Cloud" to="Asteroid Belt"/>
    <section id="skills" ref={warpRef} className="relative py-28 md:py-36 px-8 md:px-20 overflow-hidden">
      <div ref={ambientRef} className="absolute inset-0 pointer-events-none">
        {(ambientInView || !ambientRef.current) && (
          <>
            {Array.from({length:8},(_,i)=>{const sz=Math.random()*14+4;return(
              <div key={i} className="absolute rounded-sm"
                style={{width:sz,height:sz*(.5+Math.random()*.9),left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,
                  background:`rgba(96,${130+Math.random()*50|0},${200+Math.random()*50|0},${Math.random()*.22+.05})`,
                  border:"1px solid rgba(96,165,250,.1)",
                  animation:prefersReducedMotion?"none":`ndrift ${8+Math.random()*8}s ease-in-out infinite`,animationDelay:`${Math.random()*5}s`,
                  filter:`blur(${Math.random()>.6?0:1}px)`,transform:`rotate(${Math.random()*360}deg)`}}/>
            )})}
            <div className="norb" style={{top:"20%",right:"-5%",width:400,height:400,"--nd":"15s",background:"radial-gradient(circle,rgba(29,78,216,.1) 0%,transparent 65%)",animation:prefersReducedMotion?"none":"ndrift 15s ease-in-out infinite"}}/>
          </>
        )}
      </div>
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <SHead label="Asteroid Belt · Skills" line1="Tools of" accent="My Thinking" inView={inView}/>
        <div className="space-y-8">
          {SKILL_GROUPS.map((grp,gi)=>(
            <motion.div key={grp.cat} variants={fU} custom={gi} initial="h" animate={inView?"v":"h"}
              className="glass2 rounded-2xl p-6 md:p-8" style={{border:"1px solid rgba(255,255,255,.07)"}}>
              <div className="flex items-center gap-3 mb-7">
                <div className="w-2 h-2 rounded-full" style={{background:grp.color,boxShadow:`0 0 8px ${grp.color}`}}/>
                <span className="fd font-600 text-sm tracking-[.18em] uppercase" style={{color:grp.color}}>{grp.cat}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 justify-items-center">
                {grp.skills.map((sk,si)=>(
                  <SkillRing key={sk.l} label={sk.l} pct={sk.p} color={grp.color} delay={gi*.15+si*.1} inView={inView}/>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fU} custom={4} initial="h" animate={inView?"v":"h"} className="mt-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px flex-1" style={{background:"linear-gradient(90deg,transparent,rgba(96,165,250,.35),transparent)"}}/>
            <span className="text-[10px] tracking-[.2em] uppercase text-white/70">Tools & Workflow</span>
            <div className="h-px flex-1" style={{background:"linear-gradient(90deg,transparent,rgba(96,165,250,.35),transparent)"}}/>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Git","Figma","Postman","VS Code","Trello","Agile","Pygame","Fusion 360","JWT","Bcrypt"].map(t=>(
              <span key={t} className="glass rounded-full px-3 py-1 text-[10px] tracking-[.12em] uppercase text-white/75" style={{border:"1px solid rgba(255,255,255,.06)"}}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ④ WORK — PLANET STATION  (bento grid)
═══════════════════════════════════════════════════════════════ */
const PROJECTS=[
  {id:1,title:"Hexapod Robot Control",sub:"Getting a six-legged robot to walk on its own",tag:"Robotics · RL",year:"2024",
    detail:"Simulated a full hexapod robot in ROS2 Humble, implemented inverse kinematics for precise leg trajectory control, and built a reinforcement learning pipeline using Gymnasium and Stable Baselines for autonomous locomotion.",
    impact:"Autonomous locomotion in simulation",
    stack:["ROS2 Humble","Gymnasium","Stable Baselines","Python"],
    techStack:["ROS2 Humble","Gymnasium","Stable Baselines","Python"],
    image:"/images/hexapod.png",
    video:"/videos/hexapod.mp4",
    githubUrl:"https://github.com/dureadansaeed/hexapod-robot-control",
    demoUrl:"",
    icon:"arm",grad:"linear-gradient(135deg,rgba(109,40,217,.14),rgba(29,78,216,.07))",ac:"#a78bfa",size:"md:col-span-2"},
  {id:2,title:"Planora",sub:"An event planner people can actually use",tag:"Full Stack",year:"2024",
    detail:"Built a full-stack event planning platform with a React/Figma frontend, a RESTful Flask backend, and MongoDB Atlas, then added JWT auth, Bcrypt password hashing, Gmail SMTP notifications, and Postman-validated APIs.",
    impact:"Shipped — auth, notifications, the lot",
    stack:["React","Flask","MongoDB","JWT","Bcrypt"],
    techStack:["React","Flask","MongoDB","JWT","Bcrypt"],
    image:"/images/planora.png",
    video:"/videos/planora.mp4",
    githubUrl:"https://github.com/dureadansaeed/planora",
    demoUrl:"https://planora.example.com",
    icon:"calendar",grad:"linear-gradient(135deg,rgba(29,78,216,.14),rgba(6,182,212,.07))",ac:"#60a5fa",size:"md:col-span-1"},
  {id:3,title:"Blind Assist Bot",sub:"A car you control by tilting your hand",tag:"Robotics · ROS1",year:"2024",
    detail:"RC car driven by gyroscope readings from a sensor glove. ROS1 Noetic for all the plumbing — topics, action servers, the works. Tested and debugged live in Gazebo and Rviz until the motion felt smooth.",
    impact:"Real gesture → real robot motion",
    stack:["ROS1 Noetic","Python","OpenCV"],
    techStack:["ROS1 Noetic","Python","OpenCV"],
    image:"/images/blind-assist.png",
    githubUrl:"",
    demoUrl:"",
    icon:"hand",grad:"linear-gradient(135deg,rgba(6,182,212,.12),rgba(29,78,216,.07))",ac:"#67e8f9",size:"md:col-span-1"},
  {id:4,title:"Campus Companion AI",sub:"RAG-based document Q&A assistant built for student workflows",tag:"AI · RAG",year:"2025",
    detail:"Built a Retrieval-Augmented Generation application for university PDFs with grounded answers, source citations, confidence scoring, summaries, and MCQ generation.",
    impact:"Grounded answers over hallucinated ones",
    stack:["Python","Streamlit","FAISS","Gemini API","Sentence-Transformers"],
    techStack:["Python","Streamlit","FAISS","Gemini API","Sentence-Transformers"],
    image:"/images/campus-companion.png",
    video:"/videos/campus-companion.mp4",
    githubUrl:"https://github.com/dureadansaeed/campus-companion-ai",
    demoUrl:"",
    icon:"cpu",grad:"linear-gradient(135deg,rgba(139,92,246,.14),rgba(6,182,212,.08))",ac:"#a78bfa",size:"md:col-span-2"},
];

const Projects=({setWarp})=>{
  const [ref,inView]=useReveal();
  const warpRef=useWarpOnEnter("Planet Station",setWarp);
  const [active,setActive]=useState(null);
  return(
    <>
    <CockpitDivider from="Asteroid Belt" to="Planet Station"/>
    <section id="work" ref={warpRef} className="relative py-28 md:py-36 px-8 md:px-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-end">
        <div className="relative opacity-[.07]" style={{width:480,height:480,marginRight:-150}}>
          {[160,230,300,370].map((r,i)=>(
            <div key={r} className="absolute rounded-full"
              style={{width:r,height:r,top:"50%",left:"50%",marginLeft:-r/2,marginTop:-r/2,
                border:`${i<2?2:1}px solid rgba(${i%2===0?96:139},${i%2===0?165:92},250,.7)`,
                animation:`${i%2===0?"spin-cw":"spin-ccw"} ${20+i*6}s linear infinite`}}/>
          ))}
        </div>
      </div>

      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <SHead label="Planet Station · Work" line1="Things I've" accent="Actually Built" inView={inView}/>
        <div className="grid md:grid-cols-3 gap-4">
          {PROJECTS.map((p,i)=>(
            <motion.div key={p.id} custom={i} variants={fS} initial="h" animate={inView?"v":"h"}
              className={`${p.size} glass2 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-400 relative`}
              style={{border:active===p.id?`1px solid ${p.ac}55`:"1px solid rgba(255,255,255,.07)",background:p.grad,willChange:"transform"}}
              onClick={()=>setActive(active===p.id?null:p.id)}
              onKeyDown={(e)=>{if(e.key==="Enter"||e.key === " "){e.preventDefault();setActive(active===p.id?null:p.id);}}}
              role="button"
              tabIndex={0}
              aria-label={active===p.id?`Collapse ${p.title}`:`Expand ${p.title}`}
              aria-expanded={active===p.id}
              aria-controls={`project-panel-${p.id}`}
              whileHover={{scale:1.02}}>
              <div className="absolute inset-0 z-0">
                {p.video ? (
                  <video
                    src={p.video}
                    poster={p.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover opacity-35"
                    style={{willChange:"transform"}}
                  />
                ) : (
                  <img
                    src={p.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width="1280"
                    height="720"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="h-full w-full object-cover opacity-35"
                    style={{willChange:"transform"}}
                  />
                )}
                <div className="absolute inset-0" style={{background:"linear-gradient(180deg,rgba(3,8,20,.15) 0%,rgba(3,8,20,.55) 100%)"}} />
              </div>
              <div className="relative z-10 p-6 md:p-7 h-full flex flex-col justify-between" style={{minHeight:260}}>
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)"}}>
                      <Icon name={p.icon} size={20} color={p.ac}/>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="glass rounded-full px-2.5 py-1 text-[9px] tracking-[.15em] uppercase" style={{color:"rgba(255,255,255,.75)",border:"1px solid rgba(255,255,255,.08)"}}>{p.tag}</span>
                      <span className="text-[10px] text-white/70">{p.year}</span>
                    </div>
                  </div>
                  <h3 className="fd font-700 text-xl text-white mb-1.5 transition-all duration-300"
                    style={active===p.id?{background:`linear-gradient(90deg,${p.ac},#60a5fa)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}:{}}>
                    {p.title}
                  </h3>
                  <p className="text-xs text-white/70 mb-3 leading-relaxed">{p.sub}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.techStack.slice(0,4).map(t=>(
                    <span key={t} className="glass rounded-full px-2 py-0.5 text-[9px] tracking-wider uppercase text-white/75">{t}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5" style={{border:`1px solid ${p.ac}33`}}>
                    <div className="w-1 h-1 rounded-full" style={{background:p.ac,boxShadow:`0 0 4px ${p.ac}`}}/>
                    <span className="text-[10px] text-white/75">{p.impact}</span>
                  </div>
                  <div className="flex items-center gap-2 relative z-20">
                    {p.githubUrl ? (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" aria-label={`View GitHub repository for ${p.title}`} className="glass rounded-full p-2 text-white/80 hover:text-white/90 transition-colors duration-300" onClick={(e)=>e.stopPropagation()}>
                        <Icon name="github" size={14} color="rgba(255,255,255,.7)"/>
                      </a>
                    ) : (
                      <span aria-label={`GitHub unavailable for ${p.title}`} className="glass rounded-full p-2 text-white/70" title="GitHub unavailable">
                        <Icon name="github" size={14} color="rgba(255,255,255,.25)"/>
                      </span>
                    )}
                    {p.demoUrl ? (
                      <a href={p.demoUrl} target="_blank" rel="noreferrer" aria-label={`View live demo for ${p.title}`} className="glass rounded-full p-2 text-white/80 hover:text-white/90 transition-colors duration-300" onClick={(e)=>e.stopPropagation()}>
                        <Icon name="link" size={14} color="rgba(255,255,255,.7)"/>
                      </a>
                    ) : (
                      <span aria-label={`Live demo unavailable for ${p.title}`} className="glass rounded-full p-2 text-white/70" title="Live demo unavailable">
                        <Icon name="link" size={14} color="rgba(255,255,255,.25)"/>
                      </span>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {active===p.id&&(
                    <motion.div id={`project-panel-${p.id}`} initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.35,ease:[.25,.46,.45,.94]}} className="overflow-hidden">
                      <p className="text-xs text-white/70 leading-relaxed mb-3 pt-1">{p.detail}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.stack.map(t=>(
                          <span key={t} className="glass rounded px-2 py-0.5 text-[9px] tracking-wider uppercase text-white/75">{t}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div animate={{rotate:active===p.id?45:0}} transition={{duration:.3}}
                  className="mt-3 w-6 h-6 rounded-full flex items-center justify-center text-sm text-white/75"
                  style={{border:"1px solid rgba(255,255,255,.1)"}}>+</motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ⑤ JOURNEY — STAR SYSTEM
═══════════════════════════════════════════════════════════════ */
const TIMELINE=[
  {year:"Jun–Aug 2025",role:"AI Engineer Intern",place:"Avancod Pvt Ltd · Islamabad",
    note:"Built OpenCV pipelines, helped with model training and deployment. First real taste of AI work outside a classroom.",
    icon:"briefcase"},
  {year:"Aug 2024 – Now",role:"B.S. Artificial Intelligence",place:"NUCES FAST · Islamabad",
    note:"4× Gold Medalist. Learning a lot, building more. Robotics, RL, full-stack — trying to do it all.",
    icon:"graduation"},
  {year:"2022 – 2024",role:"F.Sc Pre-Engineering",place:"Tameer-i-Wattan · Mansehra",
    note:"Finished with 92%. The maths stuck — still using it every day.",
    icon:"pencil"},
];

const Journey=({setWarp})=>{
  const [ref,inView]=useReveal();
  const [ambientRef,ambientInView]=useSectionVisibility(.1);
  const prefersReducedMotion=useReducedMotion();
  const warpRef=useWarpOnEnter("Star System",setWarp);
  return(
    <>
    <CockpitDivider from="Planet Station" to="Star System"/>
    <section id="journey" ref={warpRef} className="relative py-28 md:py-36 px-8 md:px-20 overflow-hidden">
      <div ref={ambientRef} className="absolute inset-0 pointer-events-none">
        {(ambientInView || !ambientRef.current) && (
          <>
            <div className="norb" style={{top:"10%",left:"0%",width:450,height:450,"--nd":"20s",background:"radial-gradient(circle,rgba(96,165,250,.09) 0%,transparent 65%)",animation:prefersReducedMotion?"none":"ndrift 20s ease-in-out infinite"}}/>
            <div className="norb" style={{bottom:"5%",right:"0%",width:380,height:380,"--nd":"16s","--ndl":"5s",background:"radial-gradient(circle,rgba(109,40,217,.09) 0%,transparent 65%)",animation:prefersReducedMotion?"none":"ndrift 16s ease-in-out infinite"}}/>
            {Array.from({length:10},(_,i)=>(
              <div key={i} className="absolute rounded-full" style={{left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,width:Math.random()*2+.4,height:Math.random()*2+.4,background:"rgba(220,220,255,1)",opacity:Math.random()*.4+.1,animation:prefersReducedMotion?"none":`twinkle ${Math.random()*3+2}s ease-in-out infinite`,animationDelay:`${Math.random()*4}s`}}/>
            ))}
          </>
        )}
      </div>
      <div ref={ref} className="max-w-5xl mx-auto relative z-10">
        <SHead label="Star System · Journey" line1="The Journey" accent="So Far" inView={inView}/>

        <div className="relative space-y-4 pl-8 md:pl-10">
          <div className="absolute left-3.5 top-2 bottom-2 w-px" style={{background:"linear-gradient(180deg,rgba(167,139,250,.95),rgba(96,165,250,.55),transparent)"}} />
          {TIMELINE.map((item,i)=>(
            <motion.div key={i} custom={i} variants={fU} initial="h" animate={inView?"v":"h"}
              whileHover={{scale:1.015}}
              className="relative glass2 rounded-2xl p-5 md:p-6 flex items-center gap-5 transition-all duration-300"
              style={{border:"1px solid rgba(255,255,255,.07)"}}>
              <div className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border border-violet-400/70" style={{background:"radial-gradient(circle,rgba(167,139,250,.95),rgba(96,165,250,.2))",boxShadow:"0 0 10px rgba(139,92,246,.35)"}} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{background:"rgba(139,92,246,.1)",border:"1px solid rgba(139,92,246,.2)"}}>
                <Icon name={item.icon} size={18} color="#a78bfa"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                  <h3 className="fd font-700 text-base text-white">{item.role}</h3>
                  <span className="text-[10px] tracking-[.15em] uppercase text-violet-400/70 flex-shrink-0">{item.year}</span>
                </div>
                <div className="text-xs text-white/70 mb-2 tracking-wide">{item.place}</div>
                <p className="text-xs text-white/70 leading-relaxed">{item.note}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fU} custom={4} initial="h" animate={inView?"v":"h"} className="grid sm:grid-cols-2 gap-3 mt-6">
          {[
            {text:"4× Gold Medalist – Academic Excellence",icon:"medal"},
            {text:"AI & Robotics Certificate – NUCES FAST",icon:"star"},
          ].map((c,i)=>(
            <div key={c.text} className="glass rounded-xl px-4 py-3.5 flex items-center gap-3" style={{border:"1px solid rgba(139,92,246,.15)"}}>
              <Icon name={c.icon} size={14} color="rgba(167,139,250,.7)"/>
              <span className="text-xs text-white/70">{c.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ⑥ PHILOSOPHY — BLACK HOLE
═══════════════════════════════════════════════════════════════ */
const PHILO=[
  {icon:"layers",  title:"Simulation First",  body:"I'd rather break things in Gazebo a hundred times than break them once in the real world.",         g:"rgba(109,40,217,.12)"},
  {icon:"target",  title:"Pipelines, Not Scripts", body:"If it can't be maintained, it doesn't count. I build for the version of me that comes back six months later.", g:"rgba(29,78,216,.1)"},
  {icon:"zap",     title:"Just Ship It",       body:"Agile sprints, Postman-tested endpoints, Trello boards. I like things done more than I like things perfect.", g:"rgba(6,182,212,.08)"},
  {icon:"compass", title:"Go Deep",            body:"I'd rather really know ROS2 than vaguely know ten frameworks. Depth is the only thing that holds up under pressure.", g:"rgba(147,51,234,.1)"},
];

const Philosophy=({setWarp})=>{
  const [ref,inView]=useReveal();
  const [ambientRef,ambientInView]=useSectionVisibility(.1);
  const prefersReducedMotion=useReducedMotion();
  const warpRef=useWarpOnEnter("Black Hole",setWarp);
  return(
    <>
    <CockpitDivider from="Star System" to="Black Hole"/>
    <section id="philo" ref={warpRef} className="relative py-28 md:py-36 px-8 md:px-20 overflow-hidden">
      <div ref={ambientRef} className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {(ambientInView || !ambientRef.current) && (
          <div className="relative opacity-[.13]" style={{width:600,height:600}}>
            {[90,150,210,270,340].map((r,i)=>(
              <div key={r} className="absolute rounded-full"
                style={{width:r*2,height:r*2,top:"50%",left:"50%",marginLeft:-r,marginTop:-r,
                  border:`${i<2?2:1}px solid rgba(${i%2===0?139:96},${i%2===0?92:165},250,.${7-i})`,
                  animation:prefersReducedMotion?"none":`bh-rotate ${7+i*4}s linear infinite ${i%2===0?"":"reverse"}`}}/>
            ))}
            <div className="absolute rounded-full" style={{width:160,height:160,top:"50%",left:"50%",marginLeft:-80,marginTop:-80,
              background:"radial-gradient(circle,#000 45%,rgba(109,40,217,.3) 70%,transparent)",boxShadow:"0 0 70px rgba(109,40,217,.5)"}}/>
          </div>
        )}
      </div>
      <div ref={ref} className="max-w-6xl mx-auto relative z-10">
        <SHead label="Black Hole · Principles" line1="How I Think" accent="About AI" inView={inView}/>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {PHILO.map((p,i)=>(
            <motion.div key={p.title} custom={i} variants={fS} initial="h" animate={inView?"v":"h"}
              whileHover={{scale:1.05}}
              className="glass2 rounded-2xl p-6 group transition-all duration-400 cursor-default"
              style={{border:"1px solid rgba(255,255,255,.06)",background:`radial-gradient(ellipse at top left,${p.g},transparent 70%)`}}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(139,92,246,.3)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.06)"}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 transition-all duration-400"
                style={{background:"rgba(139,92,246,.1)",border:"1px solid rgba(139,92,246,.15)"}}>
                <Icon name={p.icon} size={16} color="rgba(167,139,250,.55)" className="group-hover:text-violet-300"/>
              </div>
              <h3 className="fd font-700 text-sm text-white mb-2">{p.title}</h3>
              <p className="text-xs leading-relaxed text-white/70 group-hover:text-white/85 transition-colors duration-400">{p.body}</p>
            </motion.div>
          ))}
        </div>
        <motion.div custom={5} variants={fU} initial="h" animate={inView?"v":"h"}
          className="glass2 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          style={{border:"1px solid rgba(139,92,246,.12)"}}>
          <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse at center,rgba(109,40,217,.09),transparent 65%)"}}/>
          <blockquote className="fd font-700 leading-relaxed max-w-2xl mx-auto text-white/75 relative z-10"
            style={{fontSize:"clamp(1rem,2.2vw,1.4rem)"}}>
            "I don't just run experiments —{" "}
            <span className="gt">I build things that have to actually work.</span>"
          </blockquote>
        </motion.div>
      </div>
    </section>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ⑦ CONTACT — HOME BASE
═══════════════════════════════════════════════════════════════ */
const initialFormState={name:"",email:"",subject:"",message:""};

const ContactForm=()=>{
  const [values,setValues]=useState(initialFormState);
  const [errors,setErrors]=useState({});
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [submitStatus,setSubmitStatus]=useState(null);

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setValues(prev=>({...prev,[name]:value}));
    if(errors[name]){
      setErrors(prev=>({...prev,[name]:""}));
    }
    if(submitStatus){
      setSubmitStatus(null);
    }
  };

  const validateForm=()=>{
    const nextErrors={};
    if(!values.name.trim()) nextErrors.name="Full name is required.";
    if(!values.email.trim()) nextErrors.email="Email address is required.";
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email="Please enter a valid email address.";
    if(!values.subject.trim()) nextErrors.subject="Subject is required.";
    if(!values.message.trim()) nextErrors.message="Message is required.";
    return nextErrors;
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const nextErrors=validateForm();
    setErrors(nextErrors);
    if(Object.keys(nextErrors).length){
      setSubmitStatus({type:"error",message:"Please correct the highlighted fields and try again."});
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try{
      const accessKey=import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if(!accessKey){
        throw new Error("Web3Forms access key is missing. Please add VITE_WEB3FORMS_ACCESS_KEY to your environment.");
      }

      const response=await fetch("https://api.web3forms.com/submit",{
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body:JSON.stringify({
          access_key:accessKey,
          name:values.name.trim(),
          email:values.email.trim(),
          subject:values.subject.trim(),
          message:`Name: ${values.name.trim()}\nEmail: ${values.email.trim()}\nSubject: ${values.subject.trim()}\n\nMessage:\n${values.message.trim()}`,
          from_name:values.name.trim(),
          replyto:values.email.trim(),
          to:"dureadan.wahid@gmail.com",
        }),
      });

      const result=await response.json();
      if(!response.ok || !result.success){
        throw new Error(result.message || "Unable to send your message right now. Please try again.");
      }

      setValues(initialFormState);
      setSubmitStatus({type:"success",message:"Thanks! Your message was sent successfully."});
    }catch(error){
      setSubmitStatus({type:"error",message:error.message || "Unable to send your message right now. Please try again."});
    }finally{
      setIsSubmitting(false);
    }
  };

  return(
    <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label="Contact form">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-2 block text-[10px] tracking-[.16em] uppercase text-white/70">Full Name</label>
          <input id="contact-name" name="name" value={values.name} onChange={handleChange} aria-invalid={!!errors.name} aria-describedby={errors.name?"name-error":""} required className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40" placeholder="Your name" />
          {errors.name && <p id="name-error" role="alert" className="mt-2 text-[11px] uppercase tracking-[.16em] text-rose-300/90">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-[10px] tracking-[.16em] uppercase text-white/70">Email Address</label>
          <input id="contact-email" type="email" name="email" value={values.email} onChange={handleChange} aria-invalid={!!errors.email} aria-describedby={errors.email?"email-error":""} required className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40" placeholder="you@example.com" />
          {errors.email && <p id="email-error" role="alert" className="mt-2 text-[11px] uppercase tracking-[.16em] text-rose-300/90">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="contact-subject" className="mb-2 block text-[10px] tracking-[.16em] uppercase text-white/70">Subject</label>
        <input id="contact-subject" name="subject" value={values.subject} onChange={handleChange} aria-invalid={!!errors.subject} aria-describedby={errors.subject?"subject-error":""} required className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40" placeholder="What would you like to discuss?" />
        {errors.subject && <p id="subject-error" role="alert" className="mt-2 text-[11px] uppercase tracking-[.16em] text-rose-300/90">{errors.subject}</p>}
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-[10px] tracking-[.16em] uppercase text-white/70">Message</label>
        <textarea id="contact-message" name="message" rows="6" value={values.message} onChange={handleChange} aria-invalid={!!errors.message} aria-describedby={errors.message?"message-error":""} required className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-white/40" placeholder="Share your thoughts, suggestions, or feedback..." />
        {errors.message && <p id="message-error" role="alert" className="mt-2 text-[11px] uppercase tracking-[.16em] text-rose-300/90">{errors.message}</p>}
      </div>
      {submitStatus && (
        <div role="status" className={`rounded-xl border px-4 py-3 text-sm ${submitStatus.type === "success" ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-200" : "border-rose-400/30 bg-rose-500/10 text-rose-200"}`}>
          {submitStatus.message}
        </div>
      )}
      <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center gap-3 px-6 py-3.5 text-sm tracking-[.15em] uppercase font-medium text-white rounded-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70" style={{background:"linear-gradient(135deg,rgba(29,78,216,.6),rgba(6,182,212,.45))",border:"1px solid rgba(96,165,250,.28)",backdropFilter:"blur(24px)"}}>
        <Icon name="mail" size={15} color="rgba(255,255,255,.8)"/>
        <span>{isSubmitting ? "Sending..." : "Send Feedback"}</span>
      </button>
    </form>
  );
};

const Contact=({setWarp})=>{
  const [ref,inView]=useReveal();
  const [ambientRef,ambientInView]=useSectionVisibility(.1);
  const prefersReducedMotion=useReducedMotion();
  const warpRef=useWarpOnEnter("Home Base",setWarp);
  return(
    <>
    <CockpitDivider from="Black Hole" to="Home Base"/>
    <section id="contact" ref={warpRef} className="relative py-28 md:py-40 px-8 md:px-20 overflow-hidden">
      <div ref={ambientRef} className="absolute inset-0 pointer-events-none">
        {(ambientInView || !ambientRef.current) && (
          <>
            <div className="norb" style={{bottom:"-18%",left:"50%",marginLeft:-430,width:860,height:860,"--nd":"22s",background:"radial-gradient(circle,rgba(29,78,216,.2) 0%,rgba(6,182,212,.05) 50%,transparent 70%)",animation:prefersReducedMotion?"none":"ndrift 22s ease-in-out infinite"}}/>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{width:1000,height:250,filter:"blur(50px)",background:"radial-gradient(ellipse at bottom,rgba(29,78,216,.16),rgba(6,182,212,.04),transparent)"}}/>
          </>
        )}
      </div>
      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div custom={0} variants={fU} initial="h" animate={inView?"v":"h"}><SLabel text="Home Base · Contact"/></motion.div>

        <motion.h2 custom={1} variants={fU} initial="h" animate={inView?"v":"h"}
          className="fd font-800 leading-[.9] text-white mb-5" style={{fontSize:"clamp(2.5rem,7vw,6rem)"}}>
          Let's Build<br/><span className="gt">Something Real</span>
        </motion.h2>

        <motion.p custom={2} variants={fU} initial="h" animate={inView?"v":"h"}
          className="text-sm md:text-base leading-relaxed mb-10 max-w-sm mx-auto font-light" style={{color:"rgba(255,255,255,.72)"}}>
          If you're working on something interesting, I'd like to hear about it. Roles, collabs, or just a good problem to think through.
        </motion.p>

        <motion.div custom={3} variants={fU} initial="h" animate={inView?"v":"h"}
          className="glass2 rounded-2xl p-6 md:p-8 mb-8 max-w-2xl mx-auto"
          style={{border:"1px solid rgba(255,255,255,.07)"}}>
          <div className="text-left mb-6">
            <div className="fd font-700 text-base text-white mb-2">Share Your Feedback</div>
            <p className="text-sm leading-relaxed" style={{color:"rgba(255,255,255,.72)"}}>
              Suggestions, issue reports, and constructive feedback are always welcome. I’d love to hear what stood out and what could be improved.
            </p>
          </div>
          <ContactForm />
        </motion.div>

        <motion.div custom={4} variants={fU} initial="h" animate={inView?"v":"h"} className="grid sm:grid-cols-3 gap-3 mb-10 max-w-xl mx-auto">
          {[
            {icon:"mail",    label:"Email",    val:"dureadan.wahid@gmail.com", href:"mailto:dureadan.wahid@gmail.com"},
            {icon:"linkedin",label:"LinkedIn", val:"dur-e-adan",               href:"https://linkedin.com/in/dur-e-adan-b3598a32b"},
            {icon:"github",  label:"GitHub",   val:"dureadansaeed",            href:"https://github.com/dureadansaeed"},
          ].map(c=>(
            <motion.a key={c.label} href={c.href} target="_blank" rel="noreferrer"
              whileHover={{scale:1.05,borderColor:"rgba(139,92,246,.4)"}}
              className="glass2 rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-300"
              style={{border:"1px solid rgba(255,255,255,.07)"}}
              aria-label={c.label === "Email" ? "Email Dur E Adan" : c.label === "LinkedIn" ? "Visit Dur E Adan on LinkedIn" : "Visit Dur E Adan on GitHub"}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:"rgba(139,92,246,.1)",border:"1px solid rgba(139,92,246,.18)"}}>
                <Icon name={c.icon} size={17} color="#a78bfa"/>
              </div>
              <span className="fd font-600 text-xs text-white/80 tracking-wide">{c.label}</span>
              <span className="text-[10px] text-white/75 text-center break-all">{c.val}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div custom={4} variants={fU} initial="h" animate={inView?"v":"h"} className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.a
            href="mailto:dureadan.wahid@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[.15em] uppercase font-medium text-white rounded-xl transition-all duration-300"
            style={{background:"linear-gradient(135deg,rgba(29,78,216,.6),rgba(6,182,212,.45))",border:"1px solid rgba(96,165,250,.28)",backdropFilter:"blur(24px)"}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 0 50px rgba(96,165,250,.25)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}
            aria-label="Email Dur E Adan"
          >
            <Icon name="mail" size={15} color="rgba(255,255,255,.8)"/>
            <span>Open Comms</span>
            <motion.span animate={{x:[0,5,0]}} transition={{repeat:Infinity,duration:2}}>→</motion.span>
          </motion.a>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[.15em] uppercase font-medium text-white rounded-xl transition-all duration-300"
            style={{background:"linear-gradient(135deg,rgba(29,78,216,.6),rgba(6,182,212,.45))",border:"1px solid rgba(96,165,250,.28)",backdropFilter:"blur(24px)"}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 0 50px rgba(96,165,250,.25)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}
            aria-label="View resume in new tab"
          >
            <Icon name="briefcase" size={15} color="rgba(255,255,255,.8)"/>
            <span>View Resume</span>
          </motion.a>
          <motion.a
            href="/resume.pdf"
            download="resume.pdf"
            className="inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[.15em] uppercase font-medium text-white rounded-xl transition-all duration-300"
            style={{background:"linear-gradient(135deg,rgba(29,78,216,.6),rgba(6,182,212,.45))",border:"1px solid rgba(96,165,250,.28)",backdropFilter:"blur(24px)"}}
            onMouseEnter={e=>e.currentTarget.style.boxShadow="0 0 50px rgba(96,165,250,.25)"}
            onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}
            aria-label="Download resume PDF"
          >
            <Icon name="download" size={15} color="rgba(255,255,255,.8)"/>
            <span>Download Resume</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   NAV
═══════════════════════════════════════════════════════════════ */
const NAV=[
  {label:"Deep Space",href:"#hero",    dot:"rgba(167,139,250,1)",cue:"Intro"},
  {label:"Nebula",    href:"#about",   dot:"rgba(139,92,246,1)" ,cue:"About"},
  {label:"Asteroid",  href:"#skills",  dot:"rgba(96,165,250,1)" ,cue:"Skills"},
  {label:"Station",   href:"#work",    dot:"rgba(103,232,249,1)",cue:"Projects"},
  {label:"Star Sys.", href:"#journey", dot:"rgba(167,139,250,1)",cue:"Journey"},
  {label:"Black Hole",href:"#philo",   dot:"rgba(192,132,252,1)",cue:"Philosophy"},
  {label:"Home Base", href:"#contact", dot:"rgba(96,165,250,1)" ,cue:"Contact"},
];
const Nav=()=>{
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>60);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn)},[]);
  return(
    <motion.nav initial={{y:-44,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.9,delay:.3,ease:[.16,1,.3,1]}}
      className={`fixed top-0 left-0 right-0 z-40 px-8 md:px-16 py-4 flex items-center justify-between transition-all duration-500 ${scrolled?"glass":""}`}>
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{border:"1px solid rgba(139,92,246,.5)"}}>
          <div className="w-2 h-2 rounded-full" style={{background:"linear-gradient(135deg,#a78bfa,#60a5fa)",boxShadow:"0 0 8px rgba(139,92,246,1)",animation:"pulse-glow 2s ease-in-out infinite"}}/>
        </div>
        <span className="fd font-800 text-sm tracking-[.22em] uppercase text-white/75">DEA</span>
      </div>
      <div className="hidden lg:flex gap-6">
        {NAV.map(n=>(
          <a key={n.label} href={n.href} aria-label={`${n.label} — ${n.cue}`}
            className="group flex items-center gap-1.5 text-[10px] tracking-[.18em] uppercase text-white/70 hover:text-white/90 transition-colors duration-300">
            <div className="w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background:n.dot,boxShadow:`0 0 4px ${n.dot}`}}/>
            <span className="flex flex-col items-start leading-none">
              <span>{n.label}</span>
              <span className="mt-1 text-[8px] tracking-[.2em] uppercase text-white/45">{n.cue}</span>
            </span>
          </a>
        ))}
      </div>
      <a href="mailto:dureadan.wahid@gmail.com"
        className="glass rounded-full px-4 py-2 text-[10px] tracking-[.15em] uppercase transition-all duration-300"
        style={{color:"rgba(167,139,250,.8)",border:"1px solid rgba(139,92,246,.3)"}}
        onMouseEnter={e=>e.currentTarget.style.background="rgba(109,40,217,.2)"}
        onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.03)"}>
        Hail Frequency
      </a>
    </motion.nav>
  );
};

/* ═══════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════ */
const Footer=()=>(
  <footer className="px-8 md:px-20 py-7 flex flex-col md:flex-row items-center justify-between gap-3" style={{borderTop:"1px solid rgba(255,255,255,.03)"}}>
    <span className="text-[10px] tracking-[.2em] uppercase text-white/70">© 2025 Dur E Adan · Islamabad, Pakistan</span>
    <div className="flex items-center gap-2 text-[10px] tracking-[.2em] uppercase text-white/70">
      <span>Mission Log</span><span style={{color:"rgba(139,92,246,.5)"}}>·</span><span>7 Worlds Visited</span>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════ */
export default function Portfolio(){
  const [warpDest,setWarpDest]=useState(null);
  return(
    <div style={{background:"#00000a",minHeight:"100vh"}}>
      <GlobalStyles/>
      <StarField/>
      <CursorGlow/>
      <WarpTransition active={!!warpDest} destination={warpDest}/>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Nav/>
      <main id="main-content" tabIndex="-1">
        <Hero setWarp={setWarpDest}/>
        <About setWarp={setWarpDest}/>
        <Skills setWarp={setWarpDest}/>
        <Projects setWarp={setWarpDest}/>
        <Journey setWarp={setWarpDest}/>
        <Philosophy setWarp={setWarpDest}/>
        <Contact setWarp={setWarpDest}/>
        <Footer/>
      </main>
    </div>
  );
}

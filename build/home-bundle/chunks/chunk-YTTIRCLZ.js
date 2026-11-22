import{a as Le}from"./chunk-VOW7FQLQ.js";import{A as de,Aa as Ae,Ba as Ie,C as ge,D as Te,E as He,Ea as ke,G as L,I as lt,K as Zt,L as Kt,N as xe,Q as Me,Qa as Se,R as B,S as j,Y as ye,ea as ut,eb as Fe,ha as U,ka as Re,pa as Pe,qa as $t,ra as ve,t as Ee,ta as z,ua as Ut,wa as we,ya as X,za as ft}from"./chunk-2HACNRCN.js";import{_ as he,t as be}from"./chunk-I3ZUGN7A.js";var Ht=.15,p=.045,T=.172,A=be,N0=A+.2,G0=A+.1,It=t=>Math.sqrt(A*A-t*t);var qt={near:{detail:1.5,rounded:!0},far:{detail:1,rounded:!1}},_e=8,B0=_e*Math.tan(78/360*Math.PI);function O0(t,e){return t*Math.tan(e/360*Math.PI)<B0?"near":"far"}var xt="near";function Wt(t,e){let r=xt;xt=t;try{return e()}finally{xt=r}}var v=t=>Math.max(3,Math.round(t*qt[xt].detail)),Ne=()=>qt[xt].rounded;var C0=.12;function No(t,e,r){let o=Math.floor(t/r),a=Math.abs(Math.sin(o*12.9898+e*78.233)*43758.5453)%1,n=t-o*r-r*(.25+.5*a);return n>=0&&n<C0}var kt=1.5*Math.PI,Ge=t=>1-.07*Math.abs(Math.sin(4*t));function P(t,e,r=14){return{geo:new z(t.map(([o,a])=>new L(o,a)),v(r)),color:e}}function Y(t,e,r,o,a,n=16){return P([[e,r-o],[e,r],[t,r],[t,r-o],[e,r-o]],a,n)}function k(t,e,r,o=14,a=1){let n=v(5),s=Math.acos(e/t),c=[];for(let i=n;i>=0;i--){let l=s*i/n;c.push([Math.sin(l)*t,e+(Math.cos(l)*t-e)*a])}return P(c,r,o)}function H(t,e,r,o=8,a=6){return{geo:new X(t,v(o),v(a)).translate(...e),color:r}}function I(t,e,r,o=[0,0,0]){let a=Ne()?new Le(...t,1,Math.min(.02,...t.map(n=>n*.3))):new ut(...t);return a.applyMatrix4(new Zt().makeRotationFromEuler(new Kt(...o,"YXZ"))),{geo:a.translate(...e),color:r}}function S(t,e,r,o,a,n=10){return{geo:new U(e,t,o,v(n)).translate(0,r+o/2,0),color:a}}function N(t,e,r,o,a=7){return Mt(t,n=>e+(r-e)*n,o,a,6)}function Mt(t,e,r,o=7,a=6){let n=new Re(t.map(m=>new lt(...m)));a=v(a),o=v(o);let s=n.getLength(),c=new Ae(n,a,1,o,!1),i=c.attributes.position,l=o+1;for(let m=0;m<=a;m++){let f=n.getPointAt(m/a),u=e(m/a,s);for(let b=0;b<l;b++){let E=m*l+b;i.setXYZ(E,f.x+(i.getX(E)-f.x)*u,f.y+(i.getY(E)-f.y)*u,f.z+(i.getZ(E)-f.z)*u)}}return{geo:c,color:r}}function h(t){let e=new xe,r=t.map(({geo:o,color:a})=>{let n=o.index?o.toNonIndexed():o;n.deleteAttribute("uv"),e.set(a);let s=n.getAttribute("position").count,c=new Float32Array(s*3);for(let i=0;i<s;i++)c.set([e.r,e.g,e.b],i*3);return n.setAttribute("color",new Me(c,3)),n});return Se(r)}function pt(t,e,r){let o=t.attributes.position;for(let a=0;a<o.count;a++)o.setY(a,e+(o.getY(a)-e)*r)}function Z(t,e,r,o){return t.geo.translate(e,r,o),t}function bt(t,e,r,o){return t.geo.applyMatrix4(new Zt().makeRotationFromEuler(new Kt(e,r,o))),t}function V(t,e,r,o){return t.geo.scale(e,r,o),t}function ht(t,e,r){return N(t,e,e,r,4)}function Be(t,e,r){let o=new Pe(t.map(([s,c])=>new L(s,c))),a=Math.min(.006,e/3),n=new ve(o,{depth:e,bevelEnabled:!0,bevelThickness:a,bevelSize:a,bevelSegments:2,curveSegments:6});return n.translate(0,0,-e/2),{geo:n,color:r}}function Et(t,e,r,o,a=16,n=10){return{geo:new X(t,a,n,e[0],e[1],r[0],r[1]),color:o}}function dt(t){return h(t).rotateX(-Ht)}function St(t,e,r){let o=new X(t,24,14),a=o.attributes.position,n=new lt;for(let s=0;s<a.count;s++){n.fromBufferAttribute(a,s);let c=Ge(Math.atan2(n.x,n.z));a.setXYZ(s,n.x*c,n.y*e,n.z*c)}return o.computeVertexNormals(),{geo:o,color:r}}function Oe(t,e,r,o,a){let n=-r;for(let s=0;s<2;s++){let c=r*Ge(Math.atan2(t,n));n=-Math.sqrt(Math.max(0,c*c*(1-((e-a)/(r*o))**2)-t*t))}return n}var yt="#ef4d4d",F="#f6f1e4",Q="#ffd166",Ft="#ff7a1a",Lt="#2fae72",at="#9b7be0",Ce="#f28fb1",jt="#a4602c",Ve="#6b3a1a",Qt="#a9adc4",K="#e8b84a",De="#efe3c6",_t="#2b2638";var J="#ece0c4";var Rt="#f08a24";var ze="#ffd84a";function Xe(){let t=p-.005,e=.172,r=1.06,o=[0,.1,.16],a=[];for(let n=0;n<11;n++){let s=n/11*Math.PI*2+.3,c=.45+n%2*.4,i=t+(Math.cos(c)*e-t)*r;a.push(H(.013,[Math.sin(s)*Math.sin(c)*(e+.002),i,Math.cos(s)*Math.sin(c)*(e+.002)],F,5,3))}return{body:h([k(e,t,at,18,r),...a,H(.036,o,at,7,5),N([o,[-.035,.05,.215],[-.05,-.04,.22]],.024,.012,at),N([o,[.03,.06,.225],[.06,-.02,.232]],.024,.012,at)])}}function Ye(){let t=p-.01,e=1.35,r=.176,o=t+.03+(r-t-.03)*e;return{body:h([k(r,t+.03,Lt,16,e),P([[.172,t],[.178,t+.03],[.172,t+.06],[.162,t+.06],[.162,t],[.172,t]],"#25895a",18),H(.055,[0,o+.035,0],F)])}}function Ze(){let t="#2b3a67",r=new U(.15,.15,.014,14,1,!1,Math.PI/2,Math.PI);r.scale(1,1,1.4);let o=r.attributes.position;for(let s=0;s<o.count;s++)o.setY(s,o.getY(s)-1.6*o.getX(s)**2);r.rotateX(-.12).translate(0,p+.014,-.04);let a=S(.022,.022,-.003,.006,F,10);return a.geo.rotateX(Math.PI/2-.5).translate(0,p+.06,-T+.004),{body:h([k(T,p,t,16,1.12),{geo:r,color:t},H(.016,[0,p+(T-p)*1.12,0],t,6,4),a])}}function Ke(){let e=new U(.15,.15,.014,12,1,!1,Math.PI/2,Math.PI);return e.scale(1,1,1.45).rotateX(-.1).translate(0,p+.012,-.04),{body:h([k(T,p,yt,16,1.12),{geo:e,color:"#c73a3a"},H(.018,[0,p+(T-p)*1.12,0],F,6,4)])}}function $e(){return{body:h([I([.25,.022,.25],[0,.1+.011,0],Ft),S(.112,.08,.1+.022,.075,Ft),S(.08,.055,.1+.097,.055,F),S(.055,.018,.1+.152,.095,Ft)])}}function Ue(){let t=p-.005,e=Y(.16,.255,t+.012,.012,jt,22),r=e.geo.attributes.position;for(let n=0;n<r.count;n++){let s=r.getX(n),c=Math.max(0,Math.hypot(s,r.getZ(n))-.185)/.07;r.setY(n,r.getY(n)+.06*c*(s/.255)**2)}let o=P([[T,t],[.18,t+.12],[.168,t+.19],[.12,t+.205],[.05,t+.185],[0,t+.19]],jt,16),a=P([[.186,t+.012],[.185,t+.045],[.178,t+.045],[.179,t+.012],[.186,t+.012]],Ve,16);return{body:h([e,o,a])}}var We=.135,V0=Math.PI/2-.12,je=.28,qe=5,Jt=(t,e)=>new ft(We,t,e,28).rotateX(V0).translate(0,je,.01);function D0(){let t=[];for(let e=0;e<qe;e++){let r=e/qe*Math.PI*2+.3,o=e%2?.011:.015,a=new Ut(o,0).scale(.3,1,.3),n=new Ut(o*.8,0).scale(1,.3,.3),s=We+(e%2?.035:-.03);for(let c of[a,n])c.translate(Math.cos(r)*s,[.04,-.02,.025,.05,-.015][e],Math.sin(r)*s),t.push({geo:c,color:"#fff6c8"})}return t}function Qe(){return{body:h([{geo:Jt(.017,6),color:"#fffdf2"}]),glow:h([{geo:Jt(.03,8),color:"#9c8a50"},{geo:Jt(.08,12),color:"#b8921a"}]),spin:{geo:h(D0()),at:[0,je,.01],rate:.9},shine:!0}}function Je(){let t=p+.01,e=1.15,r=.182,o=Math.asin(t/(r+.004)),a=new ft(r+.004,.015,4,14,Math.PI-2*o).rotateZ(o).rotateY(Math.PI/2);pt(a,t,e);let n=Y(.16,.205,t+.006,.012,Q,20),s=n.geo.attributes.position;for(let l=0;l<s.count;l++){let m=s.getZ(l);m<0&&Math.hypot(s.getX(l),m)>.2&&s.setZ(l,m*1.18)}let c=.12,i=I([.085,.045,.012],[0,t+(c-t)*e,-Math.sqrt(r*r-c*c)-.004],F,[-.6,0,0]);return{body:h([k(r,t,Q,18,e),n,{geo:a,color:"#f2b53c"},i])}}function t0(){let o=[];for(let s=0;s<4;s++){let c=.148*(1-s/4),i=.148*(1-(s+1)/4);o.push(S(c,i,.08+.24*s/4,.24/4,s%2?Q:Ce,14))}o.push(H(.03,[0,.08+.24+.01,0],F,7,5));let n=h(o);return n.translate(0,-.08,0).rotateZ(-.18).translate(.015,.08,0),{body:n}}function e0(){let t=T,e=1.12,o=[yt,Q,Lt,at].map((s,c)=>({geo:new X(t,5,7,c*Math.PI/2,Math.PI/2,0,Math.acos(p/t)),color:s}));for(let s of o)pt(s.geo,p,e);o.push(Y(It(p+.012)+.008,.182,p+.016,.02,_t,18));let a=p+(t-p)*e;o.push(S(.009,.009,a-.01,.05,_t,6));let n=h([I([.26,.006,.045],[0,0,0],yt,[0,0,.25]),I([.045,.006,.26],[0,0,0],Q,[.25,0,0]),H(.015,[0,0,0],_t,6,4)]);return{body:h(o),spin:{geo:n,at:[0,a+.04,0],rate:14}}}function o0(){let t="#b8322f",e="#2f3a66",r=p,o=T+.004,a=1.1,n=[k(o,r,t,18,a),Y(T-.01,o+.01,r+.014,.018,K,20)],s=[[r,o+.002,-.005,o+.012],[-.005,o+.01,-.055,o+.022],[-.055,o+.018,-.1,o+.03]],c=u=>new z(u.map(([b,E])=>new L(b,E)),18,-2.1,4.2);for(let[u,b,E,g]of s)n.push({geo:c([[g,E],[g+.012,E+.012*.5],[b+.012,u],[b,u-.012*.2],[g,E]]),color:e}),n.push({geo:c([[g+.004,E-.004],[g+.014,E+.006],[g+.004,E+.006],[g+.004,E-.004]]),color:K});for(let u of[-1,1])n.push(I([.014,.06,.05],[u*.18,.005,-.115],e,[0,u*.5,0]));let i=.1,l=r+(i-r)/a,m=-Math.sqrt(o*o-l*l),f=S(.03,.03,-.008,.016,K,14);f.geo.rotateX(Math.PI/2-.55).translate(0,i,m-.002),n.push(f);for(let u of[-1,1])n.push(N([[u*.01,i+.004,m+.004],[u*.05,i+.09,m-.02],[u*.09,i+.19,m]],.018,.006,K));return{body:h(n)}}function r0(){let t=p,e=1.15,r=.178,o=s=>N([[s*.15,.13,0],[s*.212,.15,-.01],[s*.24,.21,-.025],[s*.232,.28,-.04]],.048,.005,De),a=Math.asin((t+.02)/(r+.003)),n=new ft(r+.003,.013,4,14,Math.PI-2*a).rotateZ(a).rotateY(Math.PI/2);return pt(n,t,e),{body:h([k(r,t,Qt,18,e),P([[.178,t-.008],[.18,t+.03],[.172,t+.03],[.166,t-.008],[.178,t-.008]],K,18),{geo:n,color:K},I([.032,.085,.014],[0,t-.03,-.172],Qt,[.15,0,0]),o(-1),o(1)])}}var te=(t,e)=>typeof t=="function"?t(e):t;function Nt(t){let e=[],r=[],o=[],a=[],n=[],s=[];for(let i of t){let l=e.length/3,m=i.geo.getAttribute("position");for(let u=0;u<m.count;u++)e.push(m.getX(u),m.getY(u),m.getZ(u)),r.push(i.part),o.push(...te(i.a??[0,0,0],u)),a.push(...te(i.b??[0,0],u)),n.push(te(i.c??0,u));let f=i.geo.getIndex();if(f)for(let u=0;u<f.count;u++)s.push(l+f.getX(u));else for(let u=0;u<m.count;u++)s.push(l+u)}let c=new j;return c.setAttribute("position",new B(e,3)),c.setAttribute("aPart",new B(r,1)),c.setAttribute("aA",new B(o,3)),c.setAttribute("aB",new B(a,2)),c.setAttribute("aC",new B(n,1)),c.setIndex(s),c}function Pt(){let t=new j;return t.setAttribute("position",new B(new Array(12).fill(0),3)),t.setIndex([0,1,2,2,1,3]),t}var ct=[[-1,-1],[1,-1],[-1,1],[1,1]],Gt=`
  uniform float uFxTime;
  float h11(float n) { return fract(sin(n * 127.1) * 43758.5453); }
  float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y);
  }
`,s0=`
  // A mesh that is not instanced (a stand, the model viewer) is drawn as one wearer at the origin.
  mat4 wearerMatrix() {
    #ifdef USE_INSTANCING
      return instanceMatrix;
    #else
      return mat4(1.0);
    #endif
  }
  // The wearer's own number (0 to 1), so two wearers never move together.
  float wearerSeed() {
    #ifdef USE_INSTANCING_COLOR
      return instanceColor.r;
    #else
      return 0.0;
    #endif
  }
`,G={height:.22,ring:.147,diskInner:.091,diskOuter:.175,tilt:32*Math.PI/180},Tt={disk:0,ring:1,spark:2,shock:3,jet:4},z0=`
  ${Gt}
  ${s0}
  attribute float aPart;
  attribute vec3 aA;
  attribute vec2 aB;
  varying float vPart;
  varying vec2 vC;
  varying float vSeed;
  varying float vFade;
  void main() {
    float seed = wearerSeed();
    vPart = aPart;
    vC = aB;
    vSeed = seed;
    vFade = 1.0;
    vec3 centre = vec3(0.0, ${G.height.toFixed(3)}, 0.0);
    vec3 p = position;
    float size = 0.0;
    if (aPart > 1.5 && aPart < 2.5) {
      // A spark: it circles in the disk's plane and falls in, and starts again somewhere else.
      float ph = fract(uFxTime * (0.1 + 0.16 * aA.y) + aA.x + seed * 3.7);
      float a = aA.x * 6.2832 + ph * 3.4 + seed * 6.0;
      float r = mix(0.24, 0.1, ph * ph);
      vec3 q = vec3(cos(a) * r, (aA.z - 0.5) * 0.05 * (1.0 - ph), sin(a) * r);
      float ct = cos(${G.tilt.toFixed(4)});
      float st = sin(${G.tilt.toFixed(4)});
      p = centre + vec3(q.x, q.y * ct - q.z * st, q.y * st + q.z * ct);
      vFade = smoothstep(0.0, 0.12, ph) * (1.0 - smoothstep(0.75, 1.0, ph));
      size = 0.0098 + 0.007 * aA.y;
    } else if (aPart > 3.5) {
      // A jet: a streak along the hat's up axis, through the hole.
      vec4 c = modelViewMatrix * wearerMatrix() * vec4(centre, 1.0);
      vec3 upv = normalize((modelViewMatrix * wearerMatrix() * vec4(0.0, 1.0, 0.0, 0.0)).xyz);
      vec3 side = normalize(vec3(upv.y, -upv.x, 0.0));
      c.xyz += upv * aB.y * 0.14 + side * aB.x * 0.015;
      gl_Position = projectionMatrix * c;
      return;
    } else if (aPart > 0.5) {
      p = centre;
      size = ${G.ring.toFixed(3)};
    }
    vec4 mv = modelViewMatrix * wearerMatrix() * vec4(p, 1.0);
    if (aPart > 0.5) mv.xy += aB * size;
    gl_Position = projectionMatrix * mv;
  }
`,X0=`
  ${Gt}
  varying float vPart;
  varying vec2 vC;
  varying float vSeed;
  varying float vFade;
  void main() {
    vec3 col;
    float a;
    if (vPart < 0.5) {
      // The accretion disk: streaks that swirl, faster nearer the middle; one side is hotter.
      float r = length(vC);
      float t = clamp((r - ${G.diskInner.toFixed(3)}) / ${(G.diskOuter-G.diskInner).toFixed(3)}, 0.0, 1.0);
      float ang = atan(vC.y, vC.x);
      float w = ang - uFxTime * (1.9 - 1.1 * t) - vSeed * 6.2832;
      vec2 q = vec2(cos(w), sin(w));
      float streak = vnoise(q * 3.0 + vec2(0.0, t * 7.0)) * 0.6 + vnoise(q * 7.0 + vec2(t * 13.0, 3.0)) * 0.4;
      float hot = 0.7 + 0.3 * cos(ang + 1.0);
      col = mix(mix(vec3(1.0, 0.96, 0.75), vec3(1.0, 0.66, 0.16), smoothstep(0.0, 0.55, t)), vec3(0.62, 0.22, 0.05), smoothstep(0.5, 1.0, t));
      a = (0.3 + 0.7 * streak) * hot * smoothstep(0.0, 0.1, t) * (1.0 - smoothstep(0.7, 1.0, t));
      // Now and then a flare, at a random moment.
      float flare = pow(vnoise(vec2(uFxTime * 0.8, vSeed * 40.0)), 3.0);
      a *= 1.0 + 1.2 * flare;
      col *= 1.0 + 0.6 * flare;
      // The colours drift: now and then the disk turns from gold to a cold blue-white.
      float hue = 0.5 + 0.5 * sin(uFxTime * 0.55 + vSeed * 6.2832);
      col = mix(col, col.zyx * vec3(1.0, 1.0, 1.1), 0.65 * smoothstep(0.55, 0.95, hue));
    } else if (vPart < 1.5) {
      // The lens ring: light bent round the hole, a thin bright ring that ripples, and a haze outside it.
      float r = length(vC);
      float ang = atan(vC.y, vC.x);
      float ring = 0.62 + 0.02 * sin(ang * 3.0 + uFxTime * 1.7) + 0.011 * sin(ang * 7.0 - uFxTime * 2.3 + vSeed * 6.0);
      float d = r - ring;
      float core = exp(-d * d * 700.0);
      float haze = exp(-max(d, 0.0) * 7.0) * smoothstep(ring - 0.3, ring, r);
      a = (core * 0.85 + haze * 0.3) * (1.0 - smoothstep(0.82, 1.0, r));
      col = mix(vec3(1.0, 0.6, 0.18), vec3(1.0, 0.93, 0.68), core);
    } else if (vPart < 2.5) {
      float d = abs(vC.x) + abs(vC.y);
      a = pow(smoothstep(1.0, 0.15, d), 1.4) * vFade;
      col = vec3(1.0, 0.94, 0.68);
    } else if (vPart < 3.5) {
      // A shock wave: a ring that leaves the hole every few seconds and fades, at the wearer's own rhythm.
      float per = 3.5 + 2.5 * h11(vSeed * 91.0);
      float ph = fract((uFxTime + vSeed * 17.0) / per) / 0.3;
      if (ph > 1.0) discard;
      float r = length(vC);
      float d = r - (0.35 + 0.62 * (1.0 - pow(1.0 - ph, 2.0)));
      a = exp(-d * d * 500.0) * (1.0 - ph) * 0.8;
      col = mix(vec3(1.0, 0.7, 0.3), vec3(0.7, 0.85, 1.0), ph);
    } else {
      // A jet: it comes on for a moment at random, flickering, brightest at the hole.
      float per = 4.5 + 3.0 * h11(vSeed * 53.0 + 1.0);
      float ph = fract((uFxTime + vSeed * 29.0) / per);
      float on = smoothstep(0.0, 0.03, ph) * (1.0 - smoothstep(0.16, 0.24, ph));
      float flick = 0.6 + 0.4 * sin(uFxTime * 60.0 + vC.y * 8.0);
      float along = 1.0 - abs(vC.y);
      a = on * flick * pow(max(along, 0.0), 1.5) * smoothstep(1.0, 0.0, abs(vC.x)) * 0.9;
      col = mix(vec3(0.6, 0.8, 1.0), vec3(1.0, 0.95, 0.8), 1.0 - abs(vC.x));
    }
    if (a < 0.01) discard;
    gl_FragColor = vec4(col, min(a, 1.0));
  }
`,oe={puff:0,bolt:1},re=[.13,.57,.91],st={y:.236,drop:.14,levels:4},Y0=`
  ${Gt}
  ${s0}
  // A strike: x is the bolt's brightness (0 to 1), y the number of the cycle (so each strike lands somewhere new),
  // z the cloud's glow: it eases in before the strike, then snaps to full, strobes, and dies fast.
  vec3 strike(float s) {
    float P = 1.1 + 3.4 * h11(s * 7.3 + 1.7);
    float tt = uFxTime + h11(s) * P;
    float c = floor(tt / P);
    // Each cycle holds one strike at a random moment, and sometimes none at all.
    float x = tt - c * P - P * (0.1 + 0.8 * h11(c * 1.7 + s * 5.1));
    float skip = step(0.82, h11(c * 3.9 + s * 2.3));
    float ease = x < 0.0 ? 0.4 * smoothstep(-0.2, 0.0, x) * smoothstep(-0.2, 0.0, x) * (1.0 - skip) : 0.0;
    if (x < 0.0 || x > 0.26 || skip > 0.5) return vec3(0.0, c, ease);
    float f = exp(-x * 60.0) + 0.9 * exp(-abs(x - 0.06) * 120.0) * step(0.035, x) + 0.6 * exp(-abs(x - 0.12) * 130.0) * step(0.09, x);
    f = clamp(f, 0.0, 1.0);
    return vec3(f, c, max(f, 0.3 * exp(-x * 14.0)));
  }
`,Z0=`
  ${Y0}
  attribute float aPart;
  attribute vec3 aA;
  attribute vec2 aB;
  attribute float aC;
  varying float vPart;
  varying float vFlash;
  varying float vUp;
  varying float vBump;
  varying vec3 vPos;
  void main() {
    float seed = wearerSeed();
    vPart = aPart;
    vec3 p = position;
    vFlash = 0.0;
    vUp = 0.0;
    vBump = 0.0;
    if (aPart < 0.5) {
      // A puff: its billowing is on the CPU (animateStorm), so the ink pass sees the same shape. Here only the light.
      vec3 dn = normalize(position - aA);
      float f = 0.0;
      ${re.map(t=>`f = max(f, strike(${t.toFixed(2)} + seed * 13.1).z);`).join(`
      `)}
      vFlash = f;
      vUp = dn.y;
      vBump = 0.0;
    } else {
      // A bolt: it exists only while it strikes, at a new place with a new shape every time.
      vec3 st = strike(aB.x + seed * 13.1);
      if (st.x < 0.02) {
        gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
        return;
      }
      float c = st.y;
      float s0 = aB.x + seed * 13.1;
      float ang = h11(c * 3.1 + s0) * 6.2832;
      float rad = 0.1 + 0.05 * h11(c * 5.3 + s0);
      vec2 out2 = vec2(cos(ang), sin(ang));
      float lv = aC;
      float inner = step(0.5, lv) * step(lv, ${(st.levels-.5).toFixed(1)});
      vec2 jit = vec2(h11(c + lv * 1.9 + s0) - 0.5, h11(c * 0.7 + lv * 3.3 + s0) - 0.5) * 0.05 * inner;
      float taper = 1.0 - lv * 0.12;
      p = vec3(out2.x * rad + out2.x * lv * 0.008 + jit.x + position.x * taper, ${st.y.toFixed(3)} - ${st.drop.toFixed(3)} * (0.75 + 0.25 * h11(c + s0)) * lv / ${st.levels.toFixed(1)}, out2.y * rad + out2.y * lv * 0.008 + jit.y + position.z * taper);
      vFlash = st.x;
    }
    vPos = p;
    gl_Position = projectionMatrix * modelViewMatrix * wearerMatrix() * vec4(p, 1.0);
  }
`,K0=`
  ${Gt}
  varying vec3 vPos;
  varying float vPart;
  varying float vFlash;
  varying float vUp;
  varying float vBump;
  void main() {
    if (vPart > 0.5) {
      gl_FragColor = vec4(mix(vec3(0.62, 0.8, 1.0), vec3(1.0), vFlash * 0.8), 1.0);
      return;
    }
    // Cartoon: three flat bands, like the smoke, lit from above; the ink pass draws the outline.
    float l = vUp * 0.5 + 0.5;
    vec3 col = l > 0.62 ? vec3(0.97, 0.98, 1.0) : l > 0.34 ? vec3(0.78, 0.83, 0.94) : vec3(0.58, 0.63, 0.8);
    // A strike lights the cloud from inside, most at its belly.
    col = mix(col, vec3(0.82, 0.92, 1.0), vFlash * (0.55 + 0.3 * (1.0 - l)));
    col += vFlash * vec3(0.12, 0.14, 0.2);
    gl_FragColor = vec4(col, 1.0);
  }
`,n0={};function $0(t){let e=n0[t];if(!e){let r=t==="blackhole";e=new Ie({uniforms:{uFxTime:Fe},vertexShader:r?z0:Z0,fragmentShader:r?X0:K0,transparent:r,depthWrite:!r,side:Ee}),e.customProgramCacheKey=()=>`hatfx-${t}`,n0[t]=e}return e}var q=64;function U0(){let t=new Uint8Array(q*q*4);for(let r=0;r<q;r++)for(let o=0;o<q;o++){let a=(o+.5)/q*2-1,n=1-(r+.5)/q*2,s=a*a+n*n,c=Math.sqrt(Math.max(0,1-s)),i=Math.max(0,a*-.42+n*.6+c*.68),l=Math.pow(Math.max(0,i),18),m=n>0?.25*n:0,f=Math.exp(-Math.pow((n+.12)/.16,2))*.32,u=n<-.12?.14*Math.min(1,-n-.12):0,b=Math.min(1,.74+.22*i+m+u-f+.6*l),E=(r*q+o)*4;t[E]=Math.min(255,b*255*1),t[E+1]=Math.min(255,b*255*.985),t[E+2]=Math.min(255,b*255*.95),t[E+3]=255}let e=new ye(t,q,q,ge);return e.colorSpace=Te,e.minFilter=e.magFilter=de,e.needsUpdate=!0,e}var a0={};function q0(t){let e=a0[t];return e||(e=new ke({vertexColors:!0,matcap:U0()}),e.customProgramCacheKey=()=>`hatmatcap-${t}`,a0[t]=e),e}var Sr=(t,e)=>t.glowKind?$0(t.glowKind):e(),Fr=(t,e,r)=>t.matcap?q0(t.matcap):t.shine?e():r(),ee=t=>t-Math.floor(t),gt=(t,e)=>ee(Math.sin(t*127.1+e*311.7)*43758.5453);function W0(t,e){let r=Math.floor(t),o=Math.floor(e),a=ee(t),n=ee(e),s=a*a*(3-2*a),c=n*n*(3-2*n),i=gt(r,o)+(gt(r+1,o)-gt(r,o))*s,l=gt(r,o+1)+(gt(r+1,o+1)-gt(r,o+1))*s;return i+(l-i)*c}function j0(t,e){let r=t.userData.rest,o=t.getAttribute("position"),a=t.getAttribute("aPart"),n=t.getAttribute("aA"),s=t.getAttribute("aB");for(let c=0;c<o.count;c++){if(a.getX(c)!==0)continue;let i=n.getX(c),l=n.getY(c),m=n.getZ(c),f=r[c*3]-i,u=r[c*3+1]-l,b=r[c*3+2]-m,E=Math.hypot(f,u,b)||1,g=s.getX(c),x=s.getY(c),y=1+.06*Math.sin(e*x+g)+.025*Math.sin(e*x*1.7+g*2),M=W0(f/E*5+b/E*3+e*.2+g,u/E*6-e*.15),O=y*(.95+.1*M);o.setXYZ(c,i+.006*Math.sin(e*.25+g*1.7)+f*O,l+.004*Math.sin(e*.2+g*3.1)+u*O,m+.006*Math.cos(e*.22+g*2.3)+b*O)}o.needsUpdate=!0}function c0(t){return t.userData.rest=Float32Array.from(t.getAttribute("position").array),t.getAttribute("position").setUsage(He),t.userData.animate=e=>j0(t,e),t}var tt="#15111c",et="#f2b92e",ne="#fff0b8",Bt="#b07a0c",Q0={0:"abcdef",1:"bc",2:"abged",6:"acdefg",s:"afgcd",t:"fged"};function i0(t,e,r,o,a=.006){let n=e*.55,s=e*.2,c=n+s*.9,i=[];return[...t].forEach((l,m)=>{let f=r[0]+((t.length-1)/2-m)*c,u=Q0[l]??"",b=(E,g,x,y)=>{if(u.includes(E)){let M=y?[n,s,a]:[s,e/2,a];i.push({geo:new ut(...M).translate(f+g,r[1]+x,r[2]),color:o})}};b("a",0,e/2-s/2,!0),b("g",0,0,!0),b("d",0,-e/2+s/2,!0),b("f",n/2-s/2,e/4,!1),b("b",-n/2+s/2,e/4,!1),b("e",n/2-s/2,-e/4,!1),b("c",-n/2+s/2,-e/4,!1)}),i}var J0=.07,m0=22;function to(){let t=new we(G.diskInner,G.diskOuter,v(28),4),e=t.getAttribute("position"),r=[];for(let o=0;o<e.count;o++)r.push([e.getX(o),e.getY(o)]);return t.rotateX(-Math.PI/2).rotateX(G.tilt).translate(0,G.height,0),{geo:t,part:Tt.disk,b:o=>r[o]}}function l0(){let t=[to(),{geo:Pt(),part:Tt.ring,b:e=>ct[e]},{geo:Pt(),part:Tt.shock,b:e=>ct[e]}];for(let e of[1,-1])t.push({geo:Pt(),part:Tt.jet,b:r=>[ct[r][0],ct[r][1]*0+e*(ct[r][1]+1)/2]});for(let e=0;e<m0;e++){let r=[(e+.37*(e%3))/m0,e*.618%1,(e*.382+.2)%1];t.push({geo:Pt(),part:Tt.spark,a:r,b:o=>ct[o]})}return{body:h([{geo:new X(J0,v(10),v(8)).translate(0,G.height,0),color:tt}]),glow:Nt(t),glowKind:"blackhole",float:{lift:.045,bob:.014},shine:!0}}function u0(t=!1){let e=t?et:"#ffd23f",r=t?tt:"#1d1a24",o=1.25,a=k(T,p,e,16,o),n=a.geo.attributes.position;for(let l=0;l<n.count;l++){let m=n.getZ(l);m<0&&n.setY(l,n.getY(l)+.025*Math.min(1,-m/T)*Math.min(1,(n.getY(l)-p)/.08))}let s=new U(.15,.15,.012,14,1,!1,Math.PI/2,Math.PI);return s.scale(1,1,1.32).translate(0,p+.008,-.03),{body:h([a,...t?(()=>{let l=Math.acos(p/T);return[0,1,2,3,4,5].map(m=>{let f=Math.PI/6*(1+2*m),u=[];for(let b=0;b<=6;b++){let E=l*(1-b/6),g=Math.sin(E)*T*1.012,x=p+(Math.cos(E)*T-p)*o,y=-Math.cos(f)*g,M=y<0?.025*Math.min(1,-y/T)*Math.min(1,(x-p)/.08):0;u.push([Math.sin(f)*g,x+M,y])}return ht(u,.0026,tt)})})():[],{geo:s,color:r},I([.05,.004,.035],[.03,p+.016,-.17],F,[0,.4,0]),I([.07,.016,.01],[0,p+.012,It(p)+.01],r),H(.012,[0,p+(T-p)*o+.006,0],e,6,4),...t?[{geo:new U(.046,.046,.006,20).rotateX(Math.PI/2).translate(0,p+.082,-.166),color:tt},...i0("1st",.034,[0,p+.082,-.171],et,.004)]:[]]).rotateY(Math.PI/2).rotateZ(-.08),matcap:t?"foil":void 0}}function f0(t=!1){let e="#c8b27a",r="#9c8656",o=p-.01;return{body:h([P([[T,o],[.17,o+.08],[.15,o+.12],[.1,o+.135],[0,o+.138]],e,18),P([[.245,o-.055],[.247,o-.045],[T+.004,o+.012],[T-.002,o+.002],[.245,o-.055]],e,22),P([[.174,o+.03],[.175,o+.04],[.17,o+.04],[.169,o+.03],[.174,o+.03]],r,18),P([[.195,o-.012],[.23,o-.04],[.225,o-.04],[.19,o-.012],[.195,o-.012]],r,22),...t?[P([[T+.003,o+.012],[.176,o+.05],[.171,o+.05],[T-.002,o+.012],[T+.003,o+.012]],tt,22),H(.014,[.172,o+.045,0],et,8,6),P([[.177,o+.052],[.178,o+.058],[.172,o+.058],[.171,o+.052],[.177,o+.052]],et,22)]:[H(.016,[.172,o+.07,-.05],"#ef4d4d",6,4),Z(bt(S(.012,0,0,.04,"#ffd166",6),0,0,-1.2),.181,o+.075,-.05)]])}}var ae="#6d748a",p0=.0045;function eo(){let t=[],e=(r,o,a,n,s)=>{for(let c=0;c<r;c++){let i=s+c/r*Math.PI*2,l=1+.18*Math.sin(c*2.7+o*40);t.push([Math.cos(i)*o*l,a+.006*Math.sin(c*1.9),Math.sin(i)*o*l,n*(1+.14*Math.sin(c*3.3)),.35+(c*.37+o*9)%1*.5])}};return e(7,.085,.231,.062,.2),e(6,.055,.268,.062,1),e(4,.026,.301,.042,.4),t}var oo=eo();function ro(t){let e=[[-1,-1],[1,-1],[1,1],[-1,1]],r=[],o=[];for(let s=0;s<=st.levels;s++)for(let[c,i]of e)r.push(c*p0,0,i*p0),o.push(s);let a=[];for(let s=0;s<st.levels;s++)for(let c=0;c<4;c++){let i=s*4+c,l=s*4+(c+1)%4;a.push(i,l,i+4,l,l+4,i+4)}let n=new j;return n.setAttribute("position",new B(r,3)),n.setIndex(a),{geo:n,part:oe.bolt,b:[t,0],c:s=>o[s]}}function b0(){let t=oo.map(([e,r,o,a,n],s)=>({geo:new X(a,v(6),v(4)).translate(e,r,o),part:oe.puff,a:[e,r,o],b:[s*1.7,n]}));return{body:h([H(.07,[0,.268,0],ae,7,5),H(.06,[.045,.246,.02],ae,7,5),H(.06,[-.045,.246,-.02],ae,7,5)]),glow:c0(Nt([...t,...re.map(ro)])),glowKind:"storm",float:{lift:0,bob:.014},shine:!0}}var no=.72,se=t=>t%2?Bt:et;function h0(t,e,r,o,a){let n=[[e[0],e[1]],[t[0],t[1]],[t[0]-r,t[1]],[e[0]-r,e[1]],[e[0],e[1]]].map(([s,c])=>new L(s,c));return{geo:new z(n,v(18),a-Math.PI,2*(Math.PI-a)),color:o}}function ao(){let t=T+.008,e=p-.005,r=[],o=5;for(let a=0;a<o;a++){let n=Math.acos(e/t)*(1-a/o),s=Math.acos(e/t)*(1-(a+1)/o),c=l=>[Math.sin(l)*t,Math.cos(l)*t*1.08],i=a===o-1?[0,c(s)[1]]:c(s);r.push({geo:new z([new L(...c(n)),new L(i[0],i[1])],v(18)),color:se(a)})}return r}function E0(t){let e=[];for(let o=0;o<6;o++){let a=-.045-o*.032,n=.05+o*.004,s=new ut(n,.032,.018).translate(t*.2,a,-.06);e.push({geo:s,color:se(o+1)})}return e}function d0(){let t=[[.18,.07],[.2,.03],[.224,-.01],[.245,-.045]],e=t.slice(1).map((r,o)=>h0(t[o],r,.012,se(o),no));return{body:h([...ao(),...e,...E0(1),...E0(-1),h0([T+.012,p+.012],[T+.014,p-.012],.01,ne,0),N([[0,-.04,.2],[0,-.1,.205],[0,-.16,.19]],.03,.018,Bt),N([[0,p,-.19],[0,p+.03,-.2],[0,p+.06,-.19]],.011,.008,ne),H(.017,[0,p+.072,-.188],Bt,6,5)])}}function so(t,e){let r=[];return t.forEach((o,a)=>{let n=t[(a+1)%t.length],s=Math.max(1,Math.ceil(Math.hypot(n[0]-o[0],n[1]-o[1])/e));for(let c=0;c<s;c++)r.push([o[0]+(n[0]-o[0])*c/s,o[1]+(n[1]-o[1])*c/s])}),r}var co=t=>t.reduce((e,r,o)=>{let a=t[(o+1)%t.length];return e+r[0]*a[1]-a[0]*r[1]},0)/2;function g0(t,e){return e.map(([r,o,a])=>{let[n,s,c]=[t[r],t[o],t[a]];return(s[0]-n[0])*(c[1]-n[1])-(s[1]-n[1])*(c[0]-n[0])<0?[r,o,a]:[r,a,o]})}function T0(t,e){let r=!1;return e.forEach((o,a)=>{let n=e[(a+1)%e.length];o[1]>t[1]!=n[1]>t[1]&&t[0]<o[0]+(t[1]-o[1])*(n[0]-o[0])/(n[1]-o[1])&&(r=!r)}),r}function io(t,e,r){let[o,a]=[r[0]-e[0],r[1]-e[1]],n=Math.max(0,Math.min(1,((t[0]-e[0])*o+(t[1]-e[1])*a)/(o*o+a*a||1)));return Math.hypot(t[0]-e[0]-n*o,t[1]-e[1]-n*a)}function mo(t,e,r,o,a){let n=r.map(i=>i[0]),s=r.map(i=>i[1]),c=[r,...o].flatMap(i=>i.map((l,m)=>[l,i[(m+1)%i.length]]));for(let i=Math.min(...s)+a/2;i<Math.max(...s);i+=a*.866){let l=Math.round(i/(a*.866))%2?a/2:0;for(let m=Math.min(...n)+l;m<Math.max(...n);m+=a){let f=[m,i];if(!T0(f,r)||o.some(y=>T0(f,y))||c.some(([y,M])=>io(f,y,M)<a*.55))continue;let u=e.findIndex(([y,M,O])=>{let W=(C,$)=>($[0]-C[0])*(f[1]-C[1])-($[1]-C[1])*(f[0]-C[0])<=0;return W(t[y],t[M])&&W(t[M],t[O])&&W(t[O],t[y])});if(u<0)continue;let[b,E,g]=e[u],x=t.push(f)-1;e[u]=[b,E,x],e.push([E,g,x],[g,b,x])}}return e}function lo(t,e){let r=(a,n,s)=>(n[0]-a[0])*(s[1]-a[1])-(n[1]-a[1])*(s[0]-a[0])<-1e-12,o=(a,n,s,c)=>{let[i,l,m,f,u,b]=[a[0]-c[0],a[1]-c[1],n[0]-c[0],n[1]-c[1],s[0]-c[0],s[1]-c[1]];return(i*i+l*l)*(m*b-u*f)-(m*m+f*f)*(i*b-u*l)+(u*u+b*b)*(i*f-m*l)<-1e-14};for(let a=0;a<30;a++){let n=new Map;e.forEach((i,l)=>i.forEach((m,f)=>{let u=i[(f+1)%3],b=m<u?`${m},${u}`:`${u},${m}`;n.set(b,[...n.get(b)??[],[l,f]])}));let s=new Set,c=!1;for(let i of n.values()){if(i.length!==2)continue;let[[l,m],[f,u]]=i;if(s.has(l)||s.has(f))continue;let b=e[l],E=e[f],[g,x,y]=[b[m],b[(m+1)%3],b[(m+2)%3]],M=E[(u+2)%3],[O,W,C,$]=[t[g],t[x],t[y],t[M]];!o(O,W,C,$)||!r(C,O,$)||!r(C,$,W)||(e[l]=[y,g,M],e[f]=[y,M,x],s.add(l).add(f),c=!0)}if(!c)break}return e}function uo(t,e,r,o){for(let a=0;a<6;a++){let n=new Map,s=(i,l)=>{let m=i<l?`${i},${l}`:`${l},${i}`,f=n.get(m);return f===void 0&&(f=-1,o(t[i]).distanceTo(o(t[l]))>r&&(t.push([(t[i][0]+t[l][0])/2,(t[i][1]+t[l][1])/2]),f=t.length-1),n.set(m,f)),f},c=[];for(let i of e){let l=[s(i[0],i[1]),s(i[1],i[2]),s(i[2],i[0])],m=l.filter(M=>M>=0).length,f=0;m===1&&(f=l.findIndex(M=>M>=0)),m===2&&(f=(l.findIndex(M=>M<0)+1)%3);let[u,b,E]=[i[f],i[(f+1)%3],i[(f+2)%3]],[g,x,y]=[l[f],l[(f+1)%3],l[(f+2)%3]];m===0?c.push([u,b,E]):m===1?c.push([u,g,E],[g,b,E]):m===2?c.push([u,g,x],[g,b,x],[u,x,E]):c.push([u,g,y],[g,b,x],[y,x,E],[g,x,y])}if(e=c,![...n.values()].some(i=>i>=0))break}return e}function Ot(t,e){let r=new j;return r.setAttribute("position",new B(t,3)),e?r.setAttribute("normal",new B(e,3)):r.computeVertexNormals(),r}function H0(t,e){let[r,o,a]=e.oval,n=(d,w)=>(d/r)**2+((w-a)/o)**2<=1,s=(d,w)=>Oe(d,w,e.r,e.squash,e.lift),c=([d,w])=>new lt(d,w,s(d,w)-.002),i=([d,w])=>new lt((s(d+.001,w)-s(d-.001,w))/(2*.001),(s(d,w+.001)-s(d,w-.001))/(2*.001),-1).normalize(),l=t.geo.index?t.geo.toNonIndexed():t.geo,m=l.attributes.position,f=l.attributes.normal,[u,b]=[[],[]];for(let d=0;d<m.count;d+=3){let w=!0;for(let R=d;R<d+3;R++)w&&=m.getZ(R)<0&&n(m.getX(R),m.getY(R));if(!w)for(let R=d;R<d+3;R++)u.push(m.getX(R),m.getY(R),m.getZ(R)),b.push(f.getX(R),f.getY(R),f.getZ(R))}let E=v(10)/10,g=e.holes.map(d=>so(co(d)>0?d:[...d].reverse(),.012/E)),x=[],y=v(28);for(let d=0;d<y;d++)x.push([r*Math.cos(2*Math.PI*d/y),a+o*Math.sin(2*Math.PI*d/y)]);let M=[...x,...g.flat()],O=$t.triangulateShape(x.map(d=>new L(...d)),g.map(d=>d.map(w=>new L(...w)))),W=uo(M,lo(M,mo(M,g0(M,O),x,g,.03/E)),.08/E,c),[C,$]=[[],[]];for(let d of W)for(let w of d){let R=c(M[w]),ot=i(M[w]);C.push(R.x,R.y,R.z),$.push(ot.x,ot.y,ot.z)}let[Xt,Yt]=[[],[]];for(let d of g){d.forEach((R,ot)=>{let wt=d[(ot+1)%d.length],[rt,mt]=[c(R),c(wt)],[At,pe]=[rt.clone().setZ(rt.z+e.depth),mt.clone().setZ(mt.z+e.depth)];for(let nt of[rt,At,mt,mt,At,pe])Xt.push(nt.x,nt.y,nt.z);for(let nt of[rt,mt,At,mt,pe,At])Xt.push(nt.x,nt.y,nt.z)});let w=g0(d,$t.triangulateShape(d.map(R=>new L(...R)),[]));for(let R of w)for(let ot of R){let[wt,rt]=d[ot];Yt.push(wt,rt,s(wt,rt)+e.depth)}}return[{geo:Ot(u,b),color:e.skin},{geo:Ot(C,$),color:e.skin},{geo:Ot(Xt),color:e.wall},{geo:Ot(Yt,Yt.map((d,w)=>w%3===2?-1:0)),color:e.glow}]}var fo="#d97a22",po=.032,ce=(t,e,r)=>t.map(([o,a])=>[o+e,a+r]);function x0(){let o=St(.205,.88,Rt);o.geo.translate(0,.01,0);let a=[...[-1,1].map(s=>ce([[-.038,-.024],[.038,-.024],[s*.012,.034]],s*.068,.055)),ce([[-.018,-.012],[.018,-.012],[0,.016]],0,.008),ce([[-.12,.03],[-.075,-.004],[-.048,-.01],[-.048,-.034],[-.022,-.034],[-.022,-.014],[.022,-.014],[.022,-.034],[.048,-.034],[.048,-.01],[.075,-.004],[.12,.03],[.09,-.035],[.045,-.062],[.013,-.068],[.013,-.046],[-.013,-.046],[-.013,-.068],[-.045,-.062],[-.09,-.035]],0,-.035)],n=H0(o,{r:.205,squash:.88,lift:.01,oval:[.17,.145,-.005],holes:a,depth:po,skin:Rt,wall:fo,glow:ze});return n.push(N([[0,.17,0],[.01,.22,.01],[.04,.245,.015]],.02,.014,"#6f8a3a")),{body:dt(n)}}function M0(){let t=St(.12,.72,Rt);return t.geo.translate(0,.2,0),{body:h([t,N([[0,.27,0],[.005,.31,.005],[.025,.33,.01]],.016,.011,"#6f8a3a"),ht([[0,.28,0],[.05,.3,-.02],[.07,.28,-.05],[.05,.27,-.06]],.004,"#4c7a2a")])}}var R0=.6,Ct=.12,y0=T-R0*Ct;function P0(){let t="#4b2f6b",e="#ff8a2a",r=p-.005,o=m=>T-R0*m,a=Y(.165,.255,r+.012,.012,t,24),n=a.geo.attributes.position;for(let m=0;m<n.count;m++){let f=Math.max(0,Math.hypot(n.getX(m),n.getZ(m))-.2)/.055;n.setY(m,n.getY(m)+.02*f*Math.sin(3*Math.atan2(n.getX(m),n.getZ(m))))}let s=Mt([[0,r,0],[0,r+.06,0],[0,r+.115,0],[.01,r+.19,.015],[.06,r+.25,.05],[.12,r+.25,.1]],(m,f)=>{let u=m*f;return u<Ct?o(u):y0-(y0-.008)*((u-Ct)/(f-Ct))},t,18,14),[c,i,l]=[.012,.068,.04];return{body:h([a,s,H(.009,[.12,r+.25,.1],t,6,4),P([[o(c)+.012,r+c],[o(i)+.012,r+i],[o(i)-.003,r+i],[o(c)-.003,r+c],[o(c)+.012,r+c]],e,18),I([.05,.05,.012],[0,r+l,-(o(l)+.014)],K,[.54,0,0]),I([.024,.026,.014],[0,r+l,-(o(l)+.015)],t,[.54,0,0])])}}var bo="#3a2f4d",ho="#e98fb0",Eo=.32,go=.35,v0=.55,ie=1.35,Vt=[[.001,-.02],[.03,-.02],[.036,.012],[.035,.04],[.027,.07],[.015,.095],[.001,.112]];function To(t){for(let e=1;e<Vt.length;e++){let[r,o]=Vt[e-1],[a,n]=Vt[e];if(t<=n)return r+(a-r)*(t-o)/(n-o)}return 0}function w0(t){let e=V(P(Vt,bo,14),1,1,v0),r=Be([[-.018,0],[.018,0],[.022,.035],[.015,.065],[.004,.09],[-.012,.055],[-.02,.025]],.004,ho),o=r.geo.attributes.position;for(let a=0;a<o.count;a++){let n=-v0*Math.sqrt(Math.max(0,To(o.getY(a))**2-o.getX(a)**2));o.setZ(a,n+o.getZ(a)-.0015)}return r.geo.computeVertexNormals(),[e,r].map(a=>Z(bt(V(a,ie,ie,ie),-.12,-t*go,-t*Eo),t*.098,.118,.005))}function A0(){return{body:h([...w0(1),...w0(-1)])}}var Dt="#1c1726",it=(t,e,r)=>[t,e,-Math.sqrt(Math.max(0,A*A-t*t-e*e))-r];function I0(){let t=[Et(A+.012,[kt-1.35,2.7],[.55,1.95],J,20,12)],e=A+.014,r=1.12;t.push(Z(V(Et(e,[0,2*Math.PI],[0,1.05],J,20,10),1,r,1),0,-e*Math.cos(1.05)*(r-1),0));for(let o of[-1,1]){let a=V(H(.038,[0,0,0],Dt,8,6),1.1,1,.35);a.geo.rotateZ(o*.2).translate(...it(o*.06,.03,.01)),t.push(a)}for(let o of[-1,1]){let a=V(H(.014,[0,0,0],Dt,6,4),.8,1.3,.35);a.geo.rotateZ(o*.25).translate(...it(o*.012,-.03,.008)),t.push(a)}t.push(I([.108,.008,.008],it(0,-.078,.012),Dt));for(let o=-3;o<=3;o++)t.push(I([.013,.026,.008],it(o*.016,-.064,.011),"#fbf6e8"));return t.push(ht([it(-.03,.115,.012),it(-.045,.085,.014),it(-.035,.065,.014)],.003,Dt)),{body:dt(t)}}var k0="#241f2a",Ho="#2b262e",xo="#d9cfb4",Mo="#ffbe3a",yo="#e8801e",Ro="#17131c";var me=(t,e,r)=>[t,e,-Math.sqrt(Math.max(0,A*A-t*t-e*e))-r],le=t=>t.map(e=>bt(e,-Ht,0,0));function S0(){let t=p-.005,e=[P([[.262,t-.004],[.262,t+.005],[.21,t+.015],[.16,t+.018],[.16,t+.006],[.21,t+.004],[.262,t-.004]],J,20),S(T,.13,t,.17,J,18),P([[.18,t+.012],[.174,t+.046],[.168,t+.046],[.172,t+.012],[.18,t+.012]],Ho,16),P([[.1805,t+.026],[.1785,t+.033],[.1745,t+.033],[.1765,t+.026],[.1805,t+.026]],xo,14)],r=[Et(A+.013,[0,2*Math.PI],[1,Math.PI-1],k0,16,8),P([[.16,-.1],[.2,-.15],[.215,-.2],[.205,-.215],[.15,-.16],[.16,-.1]],k0,14)],o=[Et(A+.02,[kt-.6,1.2],[1.1,1],J,12,7)],a=[];for(let n of[-1,1]){let s=n*.06;o.push(Z(V(H(.047,[0,0,0],Ro,10,5),1,1,.45),...me(s,.01,.014))),a.push(Z(V(H(.043,[0,0,0],yo,12,6),1,1,.4),...me(s,.01,.022))),a.push(Z(V(H(.03,[0,0,0],Mo,12,6),1,1,.55),...me(s,.01,.03)))}return o.push(Mt([[0,.008,-.14],[0,.003,-.23],[0,-.006,-.33],[0,-.022,-.43]],n=>.058*(1-n)**.85+.002,J,8,8)),{body:h([...e,...le(r),...le(o)]),lamp:h(le(a))}}var vt="#efe6cc",zt="#c9b98f",F0="#9a8a63",ue=-.028,fe=.04,Po=.8;function D(t,e,r,o,a=[0,0],n=0,s=3){let c=A+r,i=[];for(let m=0;m<=s;m++){let f=Math.max(-c,Math.min(c,t+(e-t)*m/s)),u=m>0&&m<s?.004:0;i.push(new L(Math.max(.001,Math.sqrt(c*c-f*f)+u),f))}let l=n>0?new z(i,v(18),n-Math.PI,2*(Math.PI-n)):new z(i,v(18));return l.rotateX(a[0]).rotateZ(a[1]),{geo:l,color:o}}function L0(){let t=[D(fe-.004,A+.01,.004,F0,[0,0],0,4),D(-A-.01,ue+.004,.004,F0,[0,0],0,4),D(ue-.002,fe+.002,.006,vt,[0,0],Po,2),D(fe,.08,.009,vt),D(.07,.115,.012,zt,[.2,0]),D(.1,.14,.009,vt,[0,.25]),D(.128,A+.02,.013,zt,[-.18,.1]),D(-.072,ue,.009,vt),D(-.108,-.062,.012,zt,[0,-.22]),D(-A-.02,-.098,.009,vt,[.16,0]),D(-.014,.014,.014,zt,[0,Math.PI/2],0,2)];return{body:dt(t)}}var vo={cap:Ke,beanie:Ye,hardhat:Je,bandana:Xe,cowboy:Ue,viking:r0,party:t0,propeller:e0,cone:$e,halo:Qe,bentcap:Ze,samurai:o0,pioneer:()=>f0(!0),founder:()=>u0(!0),blackhole:l0,thundercloud:b0,pharaoh:d0,witch:P0,pumpkin:M0,jackolantern:x0,batears:A0,skullmask:I0,plague:S0,mummy:L0},_0=new Map;function wo(t,e){let r=vo[t];if(!r)throw new Error(`no model for hat ${t}`);return Wt(e,r)}function aa(t,e="near"){let r=`${t}:${e}`,o=_0.get(r);if(o)return o;let a=wo(he[t].key,e);return _0.set(r,a),a}export{qt as a,O0 as b,Ht as c,No as d,h as e,Sr as f,Fr as g,aa as h};
//# sourceMappingURL=/chunks/chunk-YTTIRCLZ.js.map

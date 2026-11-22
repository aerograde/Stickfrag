import{Ba as d,Ca as H,G as n,I as p,J as T,Ka as y,O as u,X as g,c as m,da as x,p as o,v as h,va as R,w as c,x as E,z as v}from"./chunk-2HACNRCN.js";var D=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`,w=`
  uniform sampler2D tNormal;
  uniform sampler2D tDepth;
  uniform vec2 texel;
  uniform vec2 px;
  uniform vec2 devicePx;
  uniform float near;
  uniform float far;
  uniform float fogNear;
  uniform float fogFar;
  uniform vec3 ink;
  uniform float silhouette;
  uniform float depthK;
  uniform float creaseK;
  uniform float fogAmount;
  uniform float taper;
  uniform float boil;
  uniform float boilSeed;
  uniform float tint;
  uniform float tintFrom;
  varying vec2 vUv;

  float linearDepth(vec2 uv) {
    float z = texture2D(tDepth, uv).x * 2.0 - 1.0;
    return (2.0 * near * far) / (far + near - z * (far - near));
  }
  vec3 normalAt(vec2 uv) { return texture2D(tNormal, uv).xyz * 2.0 - 1.0; }
  float hash2(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise2(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash2(i), hash2(i + vec2(1, 0)), f.x), mix(hash2(i + vec2(0, 1)), hash2(i + vec2(1, 1)), f.x), f.y);
  }

  void main() {
    vec2 uv = vUv;
    if (boil > 0.0) {
      vec2 q = uv / px / 26.0 + boilSeed * 7.31;
      // In whole device pixels: a fractional shift samples the depth unevenly and draws ink blobs on far floors.
      uv += floor((vec2(noise2(q), noise2(q + 17.3)) - 0.5) * 2.0 * boil * px / devicePx + 0.5) * devicePx;
    }
    float d = linearDepth(uv);
    vec2 tn = texel * (1.0 - taper * 0.6 * smoothstep(4.0, 60.0, d));
    vec2 td = tn * silhouette;
    float dl = linearDepth(uv - vec2(td.x, 0.0));
    float dr = linearDepth(uv + vec2(td.x, 0.0));
    float dd = linearDepth(uv - vec2(0.0, td.y));
    float du = linearDepth(uv + vec2(0.0, td.y));
    float lap = max(abs(dl + dr - 2.0 * d), abs(dd + du - 2.0 * d)) / d;

    vec3 n = normalAt(uv);
    float nd = max(
      max(1.0 - dot(n, normalAt(uv - vec2(tn.x, 0.0))), 1.0 - dot(n, normalAt(uv + vec2(tn.x, 0.0)))),
      max(1.0 - dot(n, normalAt(uv - vec2(0.0, tn.y))), 1.0 - dot(n, normalAt(uv + vec2(0.0, tn.y))))
    );

    float edge = max(smoothstep(0.012 / depthK, 0.025 / depthK, lap), smoothstep(0.2 / creaseK, 0.35 / creaseK, nd));
    float fog = smoothstep(fogNear, fogFar, d);
    float a = edge * (1.0 - fog * fogAmount);
    float t = tint * smoothstep(tintFrom, tintFrom + 30.0, d);
    #ifdef TINT
      gl_FragColor = vec4(mix(vec3(1.0), vec3(0.42), a * t), 1.0);
    #else
      gl_FragColor = vec4(ink, a * (1.0 - t));
    #endif
  }
`,M=class{normalMaterial=new H;normalTarget;edgeMaterial;tintMaterial;edgeScene=new u;tintScene=new u;quadCamera=new y(-1,1,1,-1,0,1);cssWidth=1;cssHeight=1;constructor(){this.normalTarget=new T(1,1,{depthTexture:new x(1,1),minFilter:v,magFilter:v});let e={tNormal:{value:this.normalTarget.texture},tDepth:{value:this.normalTarget.depthTexture},texel:{value:new n},px:{value:new n},devicePx:{value:new n},near:{value:.1},far:{value:100},fogNear:{value:1e9},fogFar:{value:2e9},ink:{value:new p(...m)},silhouette:{value:1},depthK:{value:1},creaseK:{value:1},fogAmount:{value:.7},taper:{value:0},boil:{value:0},boilSeed:{value:0},tint:{value:0},tintFrom:{value:20}},r={vertexShader:D,fragmentShader:w,uniforms:e,transparent:!0,depthTest:!1,depthWrite:!1};this.edgeMaterial=new d(r),this.tintMaterial=new d({...r,defines:{TINT:1},blending:h,blendSrc:E,blendDst:c});for(let[t,l]of[[this.edgeScene,this.edgeMaterial],[this.tintScene,this.tintMaterial]]){let i=new g(new R(2,2),l);i.frustumCulled=!1,t.add(i)}}get depth(){return this.normalTarget.depthTexture}setSize(e,r,t){this.cssWidth=e,this.cssHeight=r,this.normalTarget.setSize(Math.floor(e*t),Math.floor(r*t)),this.edgeMaterial.uniforms.devicePx.value.set(1/Math.floor(e*t),1/Math.floor(r*t))}compile(e,r,t){let l=t.layers.mask;t.layers.set(0),r.overrideMaterial=this.normalMaterial;try{return Promise.all([e.compileAsync(r,t),e.compileAsync(this.edgeScene,this.quadCamera),e.compileAsync(this.tintScene,this.quadCamera)])}finally{r.overrideMaterial=null,t.layers.mask=l}}render(e,r,t,l,i=1/0,f=1/0,s=!1,S=!1){t.layers.set(0),r.overrideMaterial=this.normalMaterial,e.setRenderTarget(this.normalTarget),e.setClearColor(8421631,1),e.clear(),e.render(r,t),r.overrideMaterial=null,t.layers.enable(1);let a=this.edgeMaterial.uniforms;a.near.value=t.near,a.far.value=t.far,a.fogNear.value=Number.isFinite(i)?i:1e9,a.fogFar.value=Number.isFinite(f)?f:2e9,a.texel.value.set(l/this.cssWidth,l/this.cssHeight),a.px.value.set(1/this.cssWidth,1/this.cssHeight),a.silhouette.value=o.silhouette,a.depthK.value=o.depthEdge,a.creaseK.value=o.creaseEdge,a.fogAmount.value=o.inkFog,a.taper.value=s?0:o.inkTaper,a.boil.value=s&&!o.boilGun?0:o.boil,a.boilSeed.value=Math.floor(performance.now()/1e3*o.boilFps)%1e3,a.tint.value=s?0:o.inkTint,a.tintFrom.value=o.inkTintFrom,e.setRenderTarget(null),e.render(this.edgeScene,this.quadCamera),(a.tint.value>0||S)&&e.render(this.tintScene,this.quadCamera)}};export{M as a};
//# sourceMappingURL=/chunks/chunk-LJWM5LQQ.js.map

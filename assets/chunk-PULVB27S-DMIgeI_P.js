import{f as x,j as h,r as v,a1 as F,c as k}from"./index-TC9QcNlt.js";var I=x(function(e,r){const{htmlWidth:a,htmlHeight:o,alt:t,...i}=e;return h.jsx("img",{width:a,height:o,ref:r,alt:t,...i})});I.displayName="NativeImage";function w(n){const{loading:e,src:r,srcSet:a,onLoad:o,onError:t,crossOrigin:i,sizes:d,ignoreFallback:f}=n,[c,g]=v.useState("pending");v.useEffect(()=>{g(r?"loading":"pending")},[r]);const l=v.useRef(),b=v.useCallback(()=>{if(!r)return;u();const s=new Image;s.src=r,i&&(s.crossOrigin=i),a&&(s.srcset=a),d&&(s.sizes=d),e&&(s.loading=e),s.onload=m=>{u(),g("loaded"),o==null||o(m)},s.onerror=m=>{u(),g("failed"),t==null||t(m)},l.current=s},[r,i,a,d,o,t,e]),u=()=>{l.current&&(l.current.onload=null,l.current.onerror=null,l.current=null)};return F(()=>{if(!f)return c==="loading"&&b(),()=>{u()}},[c,b,f]),f?"loaded":c}var C=(n,e)=>n!=="loaded"&&e==="beforeLoadOrError"||n==="failed"&&e==="onError";function O(n,e=[]){const r=Object.assign({},n);for(const a of e)a in r&&delete r[a];return r}var z=x(function(e,r){const{fallbackSrc:a,fallback:o,src:t,srcSet:i,align:d,fit:f,loading:c,ignoreFallback:g,crossOrigin:l,fallbackStrategy:b="beforeLoadOrError",referrerPolicy:u,...s}=e,m=a!==void 0||o!==void 0,p=c!=null||g||!m,N=w({...e,crossOrigin:l,ignoreFallback:p}),E=C(N,b),S={ref:r,objectFit:f,objectPosition:d,...p?s:O(s,["onError","onLoad"])};return E?o||h.jsx(k.img,{as:I,className:"chakra-image__placeholder",src:a,...S}):h.jsx(k.img,{as:I,src:t,srcSet:i,crossOrigin:l,loading:c,referrerPolicy:u,className:"chakra-image",...S})});z.displayName="Image";var j=k("div");j.displayName="Box";var y=x(function(e,r){const{size:a,centerContent:o=!0,...t}=e,i=o?{display:"flex",alignItems:"center",justifyContent:"center"}:{};return h.jsx(j,{ref:r,boxSize:a,__css:{...i,flexShrink:0,flexGrow:0},...t})});y.displayName="Square";var L=x(function(e,r){const{size:a,...o}=e;return h.jsx(y,{size:a,ref:r,borderRadius:"9999px",...o})});L.displayName="Circle";export{j as B,z as I,w as u};
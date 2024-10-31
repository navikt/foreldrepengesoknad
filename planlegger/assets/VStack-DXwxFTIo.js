import{R as d,r as f}from"./index-CTjT7uj6.js";function H(t){var r,n,e="";if(typeof t=="string"||typeof t=="number")e+=t;else if(typeof t=="object")if(Array.isArray(t)){var s=t.length;for(r=0;r<s;r++)t[r]&&(n=H(t[r]))&&(e&&(e+=" "),e+=n)}else for(n in t)t[n]&&(e&&(e+=" "),e+=n);return e}function B(){for(var t,r,n=0,e="",s=arguments.length;n<s;n++)(t=arguments[n])&&(r=H(t))&&(e&&(e+=" "),e+=r);return e}function U(t,r){const n=Object.entries(t).filter(([e])=>!r.includes(e));return Object.fromEntries(n)}let P=0;function Z(t){const[r,n]=f.useState(t),e=t||r;return f.useEffect(()=>{r==null&&(P+=1,n(`aksel-id-${P}`))},[r]),e}const V=d.useId;function ee(t){var r;if(V!==void 0){const n=V();return t??n.replace(/(:)/g,"")}return(r=Z(t))!==null&&r!==void 0?r:""}let N=0;function q(t){const[r,n]=f.useState(t),e=t||r;return f.useEffect(()=>{r==null&&(N+=1,n(`aksel-icon-${N}`))},[r]),e}const T=d.useId;function te(t){var r;return T!==void 0?T().replace(/(:)/g,""):(r=q(t))!==null&&r!==void 0?r:""}function D(t){return r=>{t.forEach(n=>{typeof n=="function"?n(r):n!=null&&(n.current=r)})}}function ne(...t){return d.useCallback(D(t),t)}function z(t,r){const n=Object.assign({},r);for(const e in r){const s=t[e],a=r[e];/^on[A-Z]/.test(e)?s&&a?n[e]=(...i)=>{a(...i),s(...i)}:s&&(n[e]=s):e==="style"?n[e]=Object.assign(Object.assign({},s),a):e==="className"&&(n[e]=[s,a].filter(Boolean).join(" "))}return Object.assign(Object.assign({},t),n)}var F=function(t,r){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&r.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,e=Object.getOwnPropertySymbols(t);s<e.length;s++)r.indexOf(e[s])<0&&Object.prototype.propertyIsEnumerable.call(t,e[s])&&(n[e[s]]=t[e[s]]);return n};const y=f.forwardRef((t,r)=>{var n;const{children:e}=t,s=F(t,["children"]);if(f.isValidElement(e)){const a=Object.prototype.propertyIsEnumerable.call(e.props,"ref")?e.props.ref:e.ref;return f.cloneElement(e,Object.assign(Object.assign({},z(s,e.props)),{ref:r?D([r,a]):a}))}if(f.Children.count(e)>1){const a=new Error("Aksel: Components using 'asChild' expects to recieve a single React element child.");throw a.name="SlotError",(n=Error.captureStackTrace)===null||n===void 0||n.call(Error,a,y),a}return null});function c(t,r,n){return n?typeof n=="string"?{[`--__ac-${t}-${r}-xs`]:n}:Object.fromEntries(Object.entries(n).map(([e,s])=>[`--__ac-${t}-${r}-${e}`,s])):{}}const J=t=>{switch(t){case"px":return"1px"}return t},A=(t,r,n,e,s)=>r.split(" ").map((a,u,i)=>{if(t==="margin-inline"&&a==="full")return`calc((100vw - ${100/i.length}%)/-2)`;if(t==="padding-inline"&&a==="full")return`calc((100vw - ${100/i.length}%)/2)`;if(["mi","mb"].includes(t)&&a==="auto")return"auto";let o=`var(--a-${n}-${a})`;return e.includes(a)&&(o=J(a)),s?a==="0"?"0":`calc(-1 * ${o})`:o}).join(" ");function l(t,r,n,e,s=!1,a=[]){if(!e)return{};if(typeof e=="string")return{[`--__ac-${t}-${r}-xs`]:A(r,e,n,a,s)};const u={};return Object.entries(e).forEach(([i,o])=>{u[`--__ac-${t}-${r}-${i}`]=A(r,o,n,a,s)}),u}const K=["className","padding","paddingInline","paddingBlock","margin","marginInline","marginBlock","width","minWidth","maxWidth","height","minHeight","maxHeight","position","inset","top","right","bottom","left","overflow","overflowX","overflowY","flexBasis","flexGrow","flexShrink","gridColumn"],L=({children:t,className:r,padding:n,paddingInline:e,paddingBlock:s,margin:a,marginInline:u,marginBlock:i,width:o,minWidth:b,maxWidth:g,height:p,minHeight:O,maxHeight:j,position:v,inset:m,top:w,right:h,left:_,bottom:E,overflow:I,overflowX:$,overflowY:S,flexBasis:k,flexGrow:x,flexShrink:R,gridColumn:C})=>{const M=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},l("r","p","spacing",n)),l("r","pi","spacing",e)),l("r","pb","spacing",s)),l("r","m","spacing",a)),l("r","mi","spacing",u)),l("r","mb","spacing",i)),c("r","w",o)),c("r","minw",b)),c("r","maxw",g)),c("r","h",p)),c("r","minh",O)),c("r","maxh",j)),c("r","position",v)),l("r","inset","spacing",m)),l("r","top","spacing",w)),l("r","right","spacing",h)),l("r","bottom","spacing",E)),l("r","left","spacing",_)),c("r","overflow",I)),c("r","overflowx",$)),c("r","overflowy",S)),c("r","flex-basis",k)),c("r","flex-grow",x)),c("r","flex-shrink",R)),c("r","grid-column",C));return d.createElement(y,{className:B({className:r,"navds-r-p":n,"navds-r-pi":e,"navds-r-pb":s,"navds-r-m":a,"navds-r-mi":u,"navds-r-mb":i,"navds-r-w":o,"navds-r-minw":b,"navds-r-maxw":g,"navds-r-h":p,"navds-r-minh":O,"navds-r-maxh":j,"navds-r-position":v,"navds-r-inset":m,"navds-r-top":w,"navds-r-right":h,"navds-r-bottom":E,"navds-r-left":_,"navds-r-overflow":I,"navds-r-overflowx":$,"navds-r-overflowy":S,"navds-r-flex-basis":k,"navds-r-flex-grow":x,"navds-r-flex-shrink":R,"navds-r-grid-column":C}),style:M},t)};var Q=function(t,r){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&r.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,e=Object.getOwnPropertySymbols(t);s<e.length;s++)r.indexOf(e[s])<0&&Object.prototype.propertyIsEnumerable.call(t,e[s])&&(n[e[s]]=t[e[s]]);return n};const G=f.forwardRef((t,r)=>{var{children:n,className:e,as:s="div",align:a,justify:u,wrap:i=!0,gap:o,style:b,direction:g="row",asChild:p}=t,O=Q(t,["children","className","as","align","justify","wrap","gap","style","direction","asChild"]);const j=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},b),l("stack","gap","spacing",o)),c("stack","direction",g)),c("stack","align",a)),c("stack","justify",u)),v=p?y:s;return d.createElement(L,Object.assign({},O),d.createElement(v,Object.assign({},U(O,K),{ref:r,style:j,className:B("navds-stack",e,{"navds-vstack":g==="column","navds-hstack":g==="row","navds-stack-gap":o,"navds-stack-align":a,"navds-stack-justify":u,"navds-stack-direction":g,"navds-stack-wrap":i})}),n))});var W=function(t,r){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&r.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,e=Object.getOwnPropertySymbols(t);s<e.length;s++)r.indexOf(e[s])<0&&Object.prototype.propertyIsEnumerable.call(t,e[s])&&(n[e[s]]=t[e[s]]);return n};const re=f.forwardRef((t,r)=>{var{as:n="div"}=t,e=W(t,["as"]);return d.createElement(G,Object.assign({as:n},e,{ref:r,direction:"row"}))});var X=function(t,r){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&r.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,e=Object.getOwnPropertySymbols(t);s<e.length;s++)r.indexOf(e[s])<0&&Object.prototype.propertyIsEnumerable.call(t,e[s])&&(n[e[s]]=t[e[s]]);return n};const se=f.forwardRef((t,r)=>{var{as:n="div"}=t,e=X(t,["as"]);return d.createElement(G,Object.assign({as:n},e,{ref:r,direction:"column",wrap:!1}))});export{L as B,re as H,K as P,y as S,se as V,ee as a,ne as b,B as c,c as d,l as g,D as m,U as o,te as u};

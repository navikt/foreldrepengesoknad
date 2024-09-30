import{R as d,r as f}from"./index-CTjT7uj6.js";function H(e){var r,n,t="";if(typeof e=="string"||typeof e=="number")t+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(r=0;r<s;r++)e[r]&&(n=H(e[r]))&&(t&&(t+=" "),t+=n)}else for(n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function B(){for(var e,r,n=0,t="",s=arguments.length;n<s;n++)(e=arguments[n])&&(r=H(e))&&(t&&(t+=" "),t+=r);return t}function U(e,r){const n=Object.entries(e).filter(([t])=>!r.includes(t));return Object.fromEntries(n)}let P=0;function Z(e){const[r,n]=f.useState(e),t=e||r;return f.useEffect(()=>{r==null&&(P+=1,n(`aksel-id-${P}`))},[r]),t}const V=d.useId;function tt(e){var r;if(V!==void 0){const n=V();return e??n.replace(/(:)/g,"")}return(r=Z(e))!==null&&r!==void 0?r:""}let N=0;function q(e){const[r,n]=f.useState(e),t=e||r;return f.useEffect(()=>{r==null&&(N+=1,n(`aksel-icon-${N}`))},[r]),t}const T=d.useId;function et(e){var r;return T!==void 0?T().replace(/(:)/g,""):(r=q(e))!==null&&r!==void 0?r:""}function D(e){return r=>{e.forEach(n=>{typeof n=="function"?n(r):n!=null&&(n.current=r)})}}function nt(...e){return d.useCallback(D(e),e)}function z(e,r){const n=Object.assign({},r);for(const t in r){const s=e[t],a=r[t];/^on[A-Z]/.test(t)?s&&a?n[t]=(...c)=>{a(...c),s(...c)}:s&&(n[t]=s):t==="style"?n[t]=Object.assign(Object.assign({},s),a):t==="className"&&(n[t]=[s,a].filter(Boolean).join(" "))}return Object.assign(Object.assign({},e),n)}var F=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)r.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(n[t[s]]=e[t[s]]);return n};const y=f.forwardRef((e,r)=>{var n;const{children:t}=e,s=F(e,["children"]);if(f.isValidElement(t))return f.cloneElement(t,Object.assign(Object.assign({},z(s,t.props)),{ref:r?D([r,t.ref]):t.ref}));if(f.Children.count(t)>1){const a=new Error("Aksel: Components using 'asChild' expects to recieve a single React element child.");throw a.name="SlotError",(n=Error.captureStackTrace)===null||n===void 0||n.call(Error,a,y),a}return null});function i(e,r,n){return n?typeof n=="string"?{[`--__ac-${e}-${r}-xs`]:n}:Object.fromEntries(Object.entries(n).map(([t,s])=>[`--__ac-${e}-${r}-${t}`,s])):{}}const J=e=>{switch(e){case"px":return"1px"}return e},A=(e,r,n,t,s)=>r.split(" ").map((a,u,c)=>{if(e==="margin-inline"&&a==="full")return`calc((100vw - ${100/c.length}%)/-2)`;if(e==="padding-inline"&&a==="full")return`calc((100vw - ${100/c.length}%)/2)`;if(["mi","mb"].includes(e)&&a==="auto")return"auto";let o=`var(--a-${n}-${a})`;return t.includes(a)&&(o=J(a)),s?a==="0"?"0":`calc(-1 * ${o})`:o}).join(" ");function l(e,r,n,t,s=!1,a=[]){if(!t)return{};if(typeof t=="string")return{[`--__ac-${e}-${r}-xs`]:A(r,t,n,a,s)};const u={};return Object.entries(t).forEach(([c,o])=>{u[`--__ac-${e}-${r}-${c}`]=A(r,o,n,a,s)}),u}const K=["className","padding","paddingInline","paddingBlock","margin","marginInline","marginBlock","width","minWidth","maxWidth","height","minHeight","maxHeight","position","inset","top","right","bottom","left","overflow","overflowX","overflowY","flexBasis","flexGrow","flexShrink","gridColumn"],L=({children:e,className:r,padding:n,paddingInline:t,paddingBlock:s,margin:a,marginInline:u,marginBlock:c,width:o,minWidth:b,maxWidth:g,height:j,minHeight:O,maxHeight:v,position:p,inset:m,top:w,right:h,left:_,bottom:E,overflow:I,overflowX:$,overflowY:S,flexBasis:k,flexGrow:x,flexShrink:R,gridColumn:C})=>{const M=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},l("r","p","spacing",n)),l("r","pi","spacing",t)),l("r","pb","spacing",s)),l("r","m","spacing",a)),l("r","mi","spacing",u)),l("r","mb","spacing",c)),i("r","w",o)),i("r","minw",b)),i("r","maxw",g)),i("r","h",j)),i("r","minh",O)),i("r","maxh",v)),i("r","position",p)),l("r","inset","spacing",m)),l("r","top","spacing",w)),l("r","right","spacing",h)),l("r","bottom","spacing",E)),l("r","left","spacing",_)),i("r","overflow",I)),i("r","overflowx",$)),i("r","overflowy",S)),i("r","flex-basis",k)),i("r","flex-grow",x)),i("r","flex-shrink",R)),i("r","grid-column",C));return d.createElement(y,{className:B({className:r,"navds-r-p":n,"navds-r-pi":t,"navds-r-pb":s,"navds-r-m":a,"navds-r-mi":u,"navds-r-mb":c,"navds-r-w":o,"navds-r-minw":b,"navds-r-maxw":g,"navds-r-h":j,"navds-r-minh":O,"navds-r-maxh":v,"navds-r-position":p,"navds-r-inset":m,"navds-r-top":w,"navds-r-right":h,"navds-r-bottom":E,"navds-r-left":_,"navds-r-overflow":I,"navds-r-overflowx":$,"navds-r-overflowy":S,"navds-r-flex-basis":k,"navds-r-flex-grow":x,"navds-r-flex-shrink":R,"navds-r-grid-column":C}),style:M},e)};var Q=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)r.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(n[t[s]]=e[t[s]]);return n};const G=f.forwardRef((e,r)=>{var{children:n,className:t,as:s="div",align:a,justify:u,wrap:c=!0,gap:o,style:b,direction:g="row",asChild:j}=e,O=Q(e,["children","className","as","align","justify","wrap","gap","style","direction","asChild"]);const v=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},b),l("stack","gap","spacing",o)),i("stack","direction",g)),i("stack","align",a)),i("stack","justify",u)),p=j?y:s;return d.createElement(L,Object.assign({},O),d.createElement(p,Object.assign({},U(O,K),{ref:r,style:v,className:B("navds-stack",t,{"navds-vstack":g==="column","navds-hstack":g==="row","navds-stack-gap":o,"navds-stack-align":a,"navds-stack-justify":u,"navds-stack-direction":g,"navds-stack-wrap":c})}),n))});var W=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)r.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(n[t[s]]=e[t[s]]);return n};const rt=f.forwardRef((e,r)=>{var{as:n="div"}=e,t=W(e,["as"]);return d.createElement(G,Object.assign({as:n},t,{ref:r,direction:"row"}))});var X=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)r.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(n[t[s]]=e[t[s]]);return n};const st=f.forwardRef((e,r)=>{var{as:n="div"}=e,t=X(e,["as"]);return d.createElement(G,Object.assign({as:n},t,{ref:r,direction:"column",wrap:!1}))});export{L as B,rt as H,K as P,y as S,st as V,tt as a,nt as b,B as c,i as d,l as g,D as m,U as o,et as u};

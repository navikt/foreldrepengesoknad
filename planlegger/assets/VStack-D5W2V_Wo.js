import{R as O,r as i}from"./index-BX3iQpgp.js";function D(t){var r,n,e="";if(typeof t=="string"||typeof t=="number")e+=t;else if(typeof t=="object")if(Array.isArray(t)){var a=t.length;for(r=0;r<a;r++)t[r]&&(n=D(t[r]))&&(e&&(e+=" "),e+=n)}else for(n in t)t[n]&&(e&&(e+=" "),e+=n);return e}function x(){for(var t,r,n=0,e="",a=arguments.length;n<a;n++)(t=arguments[n])&&(r=D(t))&&(e&&(e+=" "),e+=r);return e}function G(t){return r=>{t.forEach(n=>{typeof n=="function"?n(r):n!=null&&(n.current=r)})}}function le(...t){return O.useCallback(G(t),t)}function Z(t,r){const n=Object.assign({},r);for(const e in r){const a=t[e],s=r[e];/^on[A-Z]/.test(e)?a&&s?n[e]=(...d)=>{s(...d),a(...d)}:a&&(n[e]=a):e==="style"?n[e]=Object.assign(Object.assign({},a),s):e==="className"&&(n[e]=[a,s].filter(Boolean).join(" "))}return Object.assign(Object.assign({},t),n)}var q=function(t,r){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&r.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)r.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(n[e[a]]=t[e[a]]);return n};const w=i.forwardRef((t,r)=>{var n;const{children:e}=t,a=q(t,["children"]);if(i.isValidElement(e)){const s=Object.prototype.propertyIsEnumerable.call(e.props,"ref")?e.props.ref:e.ref;return i.cloneElement(e,Object.assign(Object.assign({},Z(a,e.props)),{ref:r?G([r,s]):s}))}if(i.Children.count(e)>1){const s=new Error("Aksel: Components using 'asChild' expects to recieve a single React element child.");throw s.name="SlotError",(n=Error.captureStackTrace)===null||n===void 0||n.call(Error,s,w),s}return null});var z=function(t,r){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&r.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)r.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(n[e[a]]=t[e[a]]);return n};function J(t,r){return`${t} returned \`undefined\`. Seems you forgot to wrap component within ${r}`}function K(t={}){const{name:r,hookName:n="useContext",providerName:e="Provider",errorMessage:a,defaultValue:s}=t,c=i.createContext(s),d=i.forwardRef((g,l)=>{var{children:p}=g,b=z(g,["children"]);const y=O.useMemo(()=>b,Object.values(b));return O.createElement(c.Provider,{value:l?Object.assign(Object.assign({},y),{ref:l}):y},p)});function f(g=!0){var l;const p=i.useContext(c);if(!p&&g){const b=new Error(a??J(n,e));throw b.name="ContextError",(l=Error.captureStackTrace)===null||l===void 0||l.call(Error,b,f),b}return p}return c.displayName=r,[d,f]}const[L,E]=K({hookName:"useTheme",name:"ThemeProvider",providerName:"ThemeProvider"});i.forwardRef((t,r)=>{var n;const e=E(!1),{children:a,className:s,asChild:c=!1,theme:d=(n=e==null?void 0:e.theme)!==null&&n!==void 0?n:"light",hasBackground:f=!0}=t,l=f??(e===void 0&&t.theme!==void 0),p=c?w:"div";return O.createElement(L,{theme:d},O.createElement(p,{ref:r,className:x("navds-theme",s,d),"data-background":l},a))});function Q(t,r){const n=Object.entries(t).filter(([e])=>!r.includes(e));return Object.fromEntries(n)}let V=0;function W(t){const[r,n]=i.useState(t),e=t||r;return i.useEffect(()=>{r==null&&(V+=1,n(`aksel-id-${V}`))},[r]),e}const B=O.useId;function fe(t){var r;if(B!==void 0){const n=B();return t??n.replace(/(:)/g,"")}return(r=W(t))!==null&&r!==void 0?r:""}let M=0;function X(t){const[r,n]=i.useState(t),e=t||r;return i.useEffect(()=>{r==null&&(M+=1,n(`aksel-icon-${M}`))},[r]),e}const H=O.useId;function Y(t){var r;return H!==void 0?H().replace(/(:)/g,""):(r=X(t))!==null&&r!==void 0?r:""}var ee=function(t,r){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&r.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)r.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(n[e[a]]=t[e[a]]);return n};const ue=i.forwardRef((t,r)=>{var{title:n,titleId:e}=t,a=ee(t,["title","titleId"]);let s=Y();return s=n?e||"title-"+s:void 0,i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:r,"aria-labelledby":s},a),n?i.createElement("title",{id:s},n):null,i.createElement("path",{fill:"currentColor",d:"M12 4.969c1.399-1.242 2.776-1.844 4.125-1.844 1.519 0 2.823.763 3.905 1.845 2.373 2.372 2.206 6.354-1 9.56l-6.5 6.5a.75.75 0 0 1-1.06 0l-6.5-6.5c-3.207-3.206-3.373-7.188-1-9.56C5.05 3.888 6.355 3.125 7.874 3.125c1.349 0 2.726.602 4.125 1.844"}))});function u(t,r,n,e){return e?typeof e=="string"?{[`--__${t}c-${r}-${n}-xs`]:e}:Object.fromEntries(Object.entries(e).map(([a,s])=>[`--__${t}c-${r}-${n}-${a}`,s])):{}}const te=t=>{switch(t){case"px":return"1px"}return t},A=(t,r,n,e,a,s)=>r.split(" ").map((c,d,f)=>{if(t==="margin-inline"&&c==="full")return`calc((100vw - ${100/f.length}%)/-2)`;if(t==="padding-inline"&&c==="full")return`calc((100vw - ${100/f.length}%)/2)`;if(["mi","mb"].includes(t)&&c==="auto")return"auto";let g=`var(--${s}-${n}-${c})`;return e.includes(c)&&(g=te(c)),a?c==="0"?"0":`calc(-1 * ${g})`:g}).join(" ");function m(t,r,n,e,a,s=!1,c=[]){if(!a)return{};if(typeof a=="string")return{[`--__${t}c-${r}-${n}-xs`]:A(n,a,e,c,s,t)};const d={};return Object.entries(a).forEach(([f,g])=>{d[`--__${t}c-${r}-${n}-${f}`]=A(n,g,e,c,s,t)}),d}const ne=["className","padding","paddingInline","paddingBlock","margin","marginInline","marginBlock","width","minWidth","maxWidth","height","minHeight","maxHeight","position","inset","top","right","bottom","left","overflow","overflowX","overflowY","flexBasis","flexGrow","flexShrink","gridColumn"],re=({children:t,className:r,padding:n,paddingInline:e,paddingBlock:a,margin:s,marginInline:c,marginBlock:d,width:f,minWidth:g,maxWidth:l,height:p,minHeight:b,maxHeight:y,position:v,inset:j,top:h,right:_,left:$,bottom:I,overflow:S,overflowX:k,overflowY:C,flexBasis:P,flexGrow:R,flexShrink:N,gridColumn:T})=>{const o=E(!1)?"ax":"a",F=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},m(o,"r","p","spacing",n)),m(o,"r","pi","spacing",e)),m(o,"r","pb","spacing",a)),m(o,"r","m","spacing",s)),m(o,"r","mi","spacing",c)),m(o,"r","mb","spacing",d)),u(o,"r","w",f)),u(o,"r","minw",g)),u(o,"r","maxw",l)),u(o,"r","h",p)),u(o,"r","minh",b)),u(o,"r","maxh",y)),u(o,"r","position",v)),m(o,"r","inset","spacing",j)),m(o,"r","top","spacing",h)),m(o,"r","right","spacing",_)),m(o,"r","bottom","spacing",I)),m(o,"r","left","spacing",$)),u(o,"r","overflow",S)),u(o,"r","overflowx",k)),u(o,"r","overflowy",C)),u(o,"r","flex-basis",P)),u(o,"r","flex-grow",R)),u(o,"r","flex-shrink",N)),u(o,"r","grid-column",T));return O.createElement(w,{className:x({className:r,"navds-r-p":n,"navds-r-pi":e,"navds-r-pb":a,"navds-r-m":s,"navds-r-mi":c,"navds-r-mb":d,"navds-r-w":f,"navds-r-minw":g,"navds-r-maxw":l,"navds-r-h":p,"navds-r-minh":b,"navds-r-maxh":y,"navds-r-position":v,"navds-r-inset":j,"navds-r-top":h,"navds-r-right":_,"navds-r-bottom":I,"navds-r-left":$,"navds-r-overflow":S,"navds-r-overflowx":k,"navds-r-overflowy":C,"navds-r-flex-basis":P,"navds-r-flex-grow":R,"navds-r-flex-shrink":N,"navds-r-grid-column":T}),style:F},t)};var ae=function(t,r){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&r.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)r.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(n[e[a]]=t[e[a]]);return n};const U=i.forwardRef((t,r)=>{var{children:n,className:e,as:a="div",align:s,justify:c,wrap:d=!0,gap:f,style:g,direction:l="row",asChild:p}=t,b=ae(t,["children","className","as","align","justify","wrap","gap","style","direction","asChild"]);const v=E(!1)?"ax":"a",j=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},g),m(v,"stack","gap","spacing",f)),u(v,"stack","direction",l)),u(v,"stack","align",s)),u(v,"stack","justify",c)),h=p?w:a;return O.createElement(re,Object.assign({},b),O.createElement(h,Object.assign({},Q(b,ne),{ref:r,style:j,className:x("navds-stack",e,{"navds-vstack":l==="column","navds-hstack":l==="row","navds-stack-gap":f,"navds-stack-align":s,"navds-stack-justify":c,"navds-stack-direction":l,"navds-stack-wrap":d})}),n))});var se=function(t,r){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&r.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)r.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(n[e[a]]=t[e[a]]);return n};const de=i.forwardRef((t,r)=>{var{as:n="div"}=t,e=se(t,["as"]);return O.createElement(U,Object.assign({as:n},e,{ref:r,direction:"row"}))});var oe=function(t,r){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&r.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)r.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(n[e[a]]=t[e[a]]);return n};const ge=i.forwardRef((t,r)=>{var{as:n="div"}=t,e=oe(t,["as"]);return O.createElement(U,Object.assign({as:n},e,{ref:r,direction:"column",wrap:!1}))});export{re as B,de as H,ne as P,w as S,ge as V,K as a,fe as b,x as c,ue as d,E as e,U as f,m as g,u as h,le as i,G as m,Q as o,Y as u};

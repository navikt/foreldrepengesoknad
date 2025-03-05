import{R as v,r as w}from"./index-CR__hKHy.js";import{a as T,u as N,S as B}from"./Label-vuqQZ1tj.js";import{o as z}from"./useId-CID_lvh_.js";function i(s,r,e,a){return a?typeof a=="string"?{[`--__${s}c-${r}-${e}-xs`]:a}:Object.fromEntries(Object.entries(a).map(([n,g])=>[`--__${s}c-${r}-${e}-${n}`,g])):{}}const A={"--ax-spacing-32":"--ax-space-128","--ax-spacing-24":"--ax-space-96","--ax-spacing-20":"--ax-space-80","--ax-spacing-18":"--ax-space-72","--ax-spacing-16":"--ax-space-64","--ax-spacing-14":"--ax-space-56","--ax-spacing-12":"--ax-space-48","--ax-spacing-11":"--ax-space-44","--ax-spacing-10":"--ax-space-40","--ax-spacing-9":"--ax-space-36","--ax-spacing-8":"--ax-space-32","--ax-spacing-7":"--ax-space-28","--ax-spacing-6":"--ax-space-24","--ax-spacing-5":"--ax-space-20","--ax-spacing-4":"--ax-space-16","--ax-spacing-3":"--ax-space-12","--ax-spacing-2":"--ax-space-8","--ax-spacing-1-alt":"--ax-space-6","--ax-spacing-1":"--ax-space-4","--ax-spacing-05":"--ax-space-2","--ax-spacing-0":"--ax-space-0"},P=(s,r,e,a,n,g)=>r.split(" ").map((c,p,f)=>{var d;if(s==="margin-inline"&&c==="full")return`calc((100vw - ${100/f.length}%)/-2)`;if(s==="padding-inline"&&c==="full")return`calc((100vw - ${100/f.length}%)/2)`;if(["mi","mb"].includes(s)&&c==="auto")return"auto";let o=`var(--${g}-${e}-${c})`;if(a.includes(c))o=c==="px"?"1px":c;else if(e==="spacing"&&c.startsWith("space"))o=`var(--${g}-${c})`;else if(e==="spacing"){const x=`--${g}-spacing-${c}`;o=`var(${(d=A[x])!==null&&d!==void 0?d:x})`}return n?c==="0"?"0":`calc(-1 * ${o})`:o}).join(" ");function l(s,r,e,a,n,g=!1,c=[]){if(!n)return{};if(typeof n=="string")return{[`--__${s}c-${r}-${e}-xs`]:P(e,n,a,c,g,s)};const p={};return Object.entries(n).forEach(([f,d])=>{p[`--__${s}c-${r}-${e}-${f}`]=P(e,d,a,c,g,s)}),p}const D=["className","padding","paddingInline","paddingBlock","margin","marginInline","marginBlock","width","minWidth","maxWidth","height","minHeight","maxHeight","position","inset","top","right","bottom","left","overflow","overflowX","overflowY","flexBasis","flexGrow","flexShrink","gridColumn"],F=({children:s,className:r,padding:e,paddingInline:a,paddingBlock:n,margin:g,marginInline:c,marginBlock:p,width:f,minWidth:d,maxWidth:o,height:x,minHeight:b,maxHeight:y,position:O,inset:j,top:m,right:u,left:h,bottom:$,overflow:_,overflowX:k,overflowY:S,flexBasis:E,flexGrow:R,flexShrink:C,gridColumn:I})=>{const M=T(!1),{cn:W}=N(),t=M?"ax":"a",q=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},l(t,"r","p","spacing",e)),l(t,"r","pi","spacing",a)),l(t,"r","pb","spacing",n)),l(t,"r","m","spacing",g)),l(t,"r","mi","spacing",c)),l(t,"r","mb","spacing",p)),i(t,"r","w",f)),i(t,"r","minw",d)),i(t,"r","maxw",o)),i(t,"r","h",x)),i(t,"r","minh",b)),i(t,"r","maxh",y)),i(t,"r","position",O)),l(t,"r","inset","spacing",j)),l(t,"r","top","spacing",m)),l(t,"r","right","spacing",u)),l(t,"r","bottom","spacing",$)),l(t,"r","left","spacing",h)),i(t,"r","overflow",_)),i(t,"r","overflowx",k)),i(t,"r","overflowy",S)),i(t,"r","flex-basis",E)),i(t,"r","flex-grow",R)),i(t,"r","flex-shrink",C)),i(t,"r","grid-column",I));return v.createElement(B,{className:W({className:r,"navds-r-p":e,"navds-r-pi":a,"navds-r-pb":n,"navds-r-m":g,"navds-r-mi":c,"navds-r-mb":p,"navds-r-w":f,"navds-r-minw":d,"navds-r-maxw":o,"navds-r-h":x,"navds-r-minh":b,"navds-r-maxh":y,"navds-r-position":O,"navds-r-inset":j,"navds-r-top":m,"navds-r-right":u,"navds-r-bottom":$,"navds-r-left":h,"navds-r-overflow":_,"navds-r-overflowx":k,"navds-r-overflowy":S,"navds-r-flex-basis":E,"navds-r-flex-grow":R,"navds-r-flex-shrink":C,"navds-r-grid-column":I}),style:q},s)};var G=function(s,r){var e={};for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&r.indexOf(a)<0&&(e[a]=s[a]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,a=Object.getOwnPropertySymbols(s);n<a.length;n++)r.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(s,a[n])&&(e[a[n]]=s[a[n]]);return e};const H=w.forwardRef((s,r)=>{var{children:e,className:a,as:n="div",align:g,justify:c,wrap:p=!0,gap:f,style:d,direction:o="row",asChild:x}=s,b=G(s,["children","className","as","align","justify","wrap","gap","style","direction","asChild"]);const O=T(!1)?"ax":"a",{cn:j}=N(),m=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},d),l(O,"stack","gap","spacing",f)),i(O,"stack","direction",o)),i(O,"stack","align",g)),i(O,"stack","justify",c)),u=x?B:n;return v.createElement(F,Object.assign({},b),v.createElement(u,Object.assign({},z(b,D),{ref:r,style:m,className:j("navds-stack",a,{"navds-vstack":o==="column","navds-hstack":o==="row","navds-stack-gap":f,"navds-stack-align":g,"navds-stack-justify":c,"navds-stack-direction":o,"navds-stack-wrap":p})}),e))});var J=function(s,r){var e={};for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&r.indexOf(a)<0&&(e[a]=s[a]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,a=Object.getOwnPropertySymbols(s);n<a.length;n++)r.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(s,a[n])&&(e[a[n]]=s[a[n]]);return e};const Y=w.forwardRef((s,r)=>{var{as:e="div"}=s,a=J(s,["as"]);return v.createElement(H,Object.assign({as:e},a,{ref:r,direction:"row"}))});var K=function(s,r){var e={};for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&r.indexOf(a)<0&&(e[a]=s[a]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,a=Object.getOwnPropertySymbols(s);n<a.length;n++)r.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(s,a[n])&&(e[a[n]]=s[a[n]]);return e};const Z=w.forwardRef((s,r)=>{var{as:e="div"}=s,a=K(s,["as"]);return v.createElement(H,Object.assign({as:e},a,{ref:r,direction:"column",wrap:!1}))});export{F as B,Y as H,D as P,H as S,Z as V,i as a,l as g};

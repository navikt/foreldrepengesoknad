import{c as O}from"./util-dafe5a09.js";import{r as b,R as j}from"./index-76fb7be0.js";function u(t,s,r){return r?typeof r=="string"?{[`--__ac-${t}-${s}-xs`]:r}:Object.fromEntries(Object.entries(r).map(([a,e])=>[`--__ac-${t}-${s}-${a}`,e])):{}}const w=t=>{switch(t){case"px":return"1px"}return t},g=(t,s,r,a,e)=>s.split(" ").map((n,i,l)=>{if(t==="margin-inline"&&n==="full")return`calc((100vw - ${100/l.length}%)/-2)`;let c=`var(--a-${r}-${n})`;return a.includes(n)&&(c=w(n)),e?n==="0"?"0":`calc(-1 * ${c})`:c}).join(" ");function _(t,s,r,a,e=!1,n=[]){if(!a)return{};if(typeof a=="string")return{[`--__ac-${t}-${s}-xs`]:g(s,a,r,n,e)};const i={};return Object.entries(a).forEach(([l,c])=>{i[`--__ac-${t}-${s}-${l}`]=g(s,c,r,n,e)}),i}var $=globalThis&&globalThis.__rest||function(t,s){var r={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&s.indexOf(a)<0&&(r[a]=t[a]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var e=0,a=Object.getOwnPropertySymbols(t);e<a.length;e++)s.indexOf(a[e])<0&&Object.prototype.propertyIsEnumerable.call(t,a[e])&&(r[a[e]]=t[a[e]]);return r};const p=b.forwardRef((t,s)=>{var{as:r="div",className:a,align:e,justify:n,wrap:i=!0,gap:l,style:c,direction:f="row"}=t,o=$(t,["as","className","align","justify","wrap","gap","style","direction"]);const y=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},c),{"--__ac-stack-wrap":i?"wrap":"nowrap"}),_("stack","gap","spacing",l)),u("stack","direction",f)),u("stack","align",e)),u("stack","justify",n));return j.createElement(r,Object.assign({},o,{ref:s,style:y,className:O("navds-stack",a,{"navds-vstack":f==="column","navds-hstack":f==="row"})}))});export{p as S,_ as g};

import{r as g,R as o}from"./index-Dl6G-zuu.js";import{c as y}from"./Label-El8VFjDh.js";function u(t,a,r){return r?typeof r=="string"?{[`--__ac-${t}-${a}-xs`]:r}:Object.fromEntries(Object.entries(r).map(([e,n])=>[`--__ac-${t}-${a}-${e}`,n])):{}}const b=t=>{switch(t){case"px":return"1px"}return t},d=(t,a,r,e,n)=>a.split(" ").map((s,l,i)=>{if(t==="margin-inline"&&s==="full")return`calc((100vw - ${100/i.length}%)/-2)`;if(t==="padding-inline"&&s==="full")return`calc((100vw - ${100/i.length}%)/2)`;let c=`var(--a-${r}-${s})`;return e.includes(s)&&(c=b(s)),n?s==="0"?"0":`calc(-1 * ${c})`:c}).join(" ");function $(t,a,r,e,n=!1,s=[]){if(!e)return{};if(typeof e=="string")return{[`--__ac-${t}-${a}-xs`]:d(a,e,r,s,n)};const l={};return Object.entries(e).forEach(([i,c])=>{l[`--__ac-${t}-${a}-${i}`]=d(a,c,r,s,n)}),l}var _=function(t,a){var r={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(t);n<e.length;n++)a.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(t,e[n])&&(r[e[n]]=t[e[n]]);return r};const w=g.forwardRef((t,a)=>{var{as:r="div",className:e,align:n,justify:s,wrap:l=!0,gap:i,style:c,direction:f="row"}=t,O=_(t,["as","className","align","justify","wrap","gap","style","direction"]);const j=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},c),{"--__ac-stack-wrap":l?"wrap":"nowrap"}),$("stack","gap","spacing",i)),u("stack","direction",f)),u("stack","align",n)),u("stack","justify",s));return o.createElement(r,Object.assign({},O,{ref:a,style:j,className:y("navds-stack",e,{"navds-vstack":f==="column","navds-hstack":f==="row"})}))}),k=g.forwardRef((t,a)=>o.createElement(w,Object.assign({},t,{ref:a,direction:"row"}))),p=k,h=g.forwardRef((t,a)=>o.createElement(w,Object.assign({},t,{ref:a,direction:"column",wrap:!1}))),v=h;export{p as H,v as V,$ as g};

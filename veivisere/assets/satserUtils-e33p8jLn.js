import{d as l,e as h}from"./Link-D5ZPm6Rv.js";import{r as y,R as o}from"./index-CTjT7uj6.js";import{f as O}from"./Infobox-BWTFR4k9.js";import{u as _}from"./useControllableState-DVRZiZ02.js";import{S as E}from"./TextField-CVpNIVeq.js";import{c as i}from"./useScrollBehaviour-R9CMo-2c.js";var S=function(e,r){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)r.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(t[n[a]]=e[n[a]]);return t};const D=y.forwardRef((e,r)=>{var{className:t,header:n,children:a,open:m,defaultOpen:p=!1,onClick:u,size:d="medium",onOpenChange:f}=e,v=S(e,["className","header","children","open","defaultOpen","onClick","size","onOpenChange"]);const[s,b]=_({defaultValue:p,value:m,onChange:f});return o.createElement("div",{className:l("navds-read-more",`navds-read-more--${d}`,t,{"navds-read-more--open":s})},o.createElement("button",Object.assign({},v,{ref:r,type:"button",className:l("navds-read-more__button","navds-body-short",{"navds-body-short--small":d==="small"}),onClick:O(u,()=>b(g=>!g)),"aria-expanded":s}),o.createElement(E,{className:"navds-read-more__expand-icon","aria-hidden":!0}),o.createElement("span",null,n)),o.createElement(h,{as:"div","aria-hidden":!s,className:l("navds-read-more__content",{"navds-read-more__content--closed":!s}),size:d},a))}),c=e=>{if(e==null)throw Error("Data er ikke oppgitt");return e},C=/^\d+([,.]\d+)?$/,N=e=>C.test(e.toString()),x=/^\d+(.\d{1,2})?$/,P=e=>r=>i(r)||N(r)?null:e,$=e=>r=>i(r)||x.test(r.toString())?null:e,B=e=>c(e.grunnbeløp[0]).verdi,F=e=>c(e.engangstønad[0]).verdi;export{D as R,N as a,$ as b,F as c,B as f,P as i,c as n};

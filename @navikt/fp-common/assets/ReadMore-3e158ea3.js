import{c as m}from"./clsx.m-1229b3e0.js";import{r as l,R as s}from"./index-76fb7be0.js";import{u as h}from"./useId-b2ee2642.js";import{B as y}from"./BodyLong-f1325e33.js";var g=globalThis&&globalThis.__rest||function(t,a){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const w=l.forwardRef((t,a)=>{var{title:n,titleId:e}=t,r=g(t,["title","titleId"]);let o=h();return o=n?e||"title-"+o:void 0,l.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:a,"aria-labelledby":o},r),n?l.createElement("title",{id:o},n):null,l.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M5.97 9.47a.75.75 0 0 1 1.06 0L12 14.44l4.97-4.97a.75.75 0 1 1 1.06 1.06l-5.5 5.5a.75.75 0 0 1-1.06 0l-5.5-5.5a.75.75 0 0 1 0-1.06Z",fill:"currentColor"}))}),_=w;var x=globalThis&&globalThis.__rest||function(t,a){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const E=l.forwardRef((t,a)=>{var{className:n,header:e,children:r,open:o,defaultOpen:f=!1,onClick:i,size:c="medium"}=t,p=x(t,["className","header","children","open","defaultOpen","onClick","size"]);const[u,v]=l.useState(f),d=o??u;return s.createElement("div",{className:m("navds-read-more",`navds-read-more--${c}`,n,{"navds-read-more--open":d})},s.createElement("button",Object.assign({},p,{ref:a,type:"button",className:m("navds-read-more__button","navds-body-short",{"navds-body-short--small":c==="small"}),onClick:b=>{o===void 0&&v(O=>!O),i==null||i(b)},"aria-expanded":d}),s.createElement(_,{className:"navds-read-more__expand-icon","aria-hidden":!0}),s.createElement("span",null,e)),s.createElement(y,{as:"div","aria-hidden":!d,className:m("navds-read-more__content",{"navds-read-more__content--closed":!d}),size:c},r))}),N=E;export{_ as C,N as R};

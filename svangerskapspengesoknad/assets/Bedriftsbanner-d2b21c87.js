import{b as c,u as f,j as n,B as d}from"./Modal-5f6515f6.js";import{e as p}from"./fridagerUtils-57eeeb7b.js";import{r as l}from"./index-f1f2c4b1.js";import"./_baseToString-375081cd.js";import"./_createSet-53ab95fd.js";import{A as o}from"./useFortsettSøknadSenere-e239225e.js";import{H as b}from"./HStack-13158dfb.js";import{V as h}from"./VStack-ea079a1e.js";var v=globalThis&&globalThis.__rest||function(e,a){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,t=Object.getOwnPropertySymbols(e);i<t.length;i++)a.indexOf(t[i])<0&&Object.prototype.propertyIsEnumerable.call(e,t[i])&&(r[t[i]]=e[t[i]]);return r};const g=l.forwardRef((e,a)=>{var{title:r,titleId:t}=e,i=v(e,["title","titleId"]);let s=c();return s=r?t||"title-"+s:void 0,l.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:a,"aria-labelledby":s},i),r?l.createElement("title",{id:s},r):null,l.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6.25 3A.75.75 0 0 1 7 2.25h10a.75.75 0 0 1 .75.75v6.25H21a.75.75 0 0 1 .75.75v11a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75V10A.75.75 0 0 1 3 9.25h3.25V3Zm11.5 17.25v-9.5h2.5v9.5h-2.5Zm-1.5-16.5v16.5h-8.5V3.75h8.5Zm-10 7v9.5h-2.5v-9.5h2.5Zm3.75-5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Zm3 0a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Zm-2.25 6.75a.75.75 0 0 0-1.5 0v2a.75.75 0 0 0 1.5 0v-2Zm2.25-.75a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 1 .75-.75Z",fill:"currentColor"}))}),u=g;const x=(e,a,r)=>e===o.FRILANSER?r.formatMessage({id:"bedriftsbanner.tittel.frilansarbeid"}):e===o.SELVSTENDIG&&a.trim().length===0?r.formatMessage({id:"egenNæring"}):a,m=({arbeid:e})=>{const a=p("bedriftsbanner"),r=f(),t=x(e.type,e.navn,r),i=e.type!==o.FRILANSER?r.formatMessage({id:"bedriftsbanner.detail"}):r.formatMessage({id:"bedriftsbanner.detail.frilans"});return n.jsx("div",{className:a.block,children:n.jsxs(b,{gap:"5",children:[n.jsx("div",{className:a.element("ikon"),children:n.jsx(u,{"aria-hidden":!0,height:"24px",width:"24px"})}),n.jsx("div",{className:a.element("tekst"),children:n.jsxs(h,{gap:"1",children:[n.jsx(d,{size:"small",className:a.modifier("bold"),children:i}),n.jsx(d,{size:"medium",className:a.modifier("bold"),children:t})]})})]})})};try{m.displayName="Bedriftsbanner",m.__docgenInfo={description:"",displayName:"Bedriftsbanner",props:{arbeid:{defaultValue:null,description:"",name:"arbeid",required:!0,type:{name:"ArbeidsforholdForTilrettelegging"}}}}}catch{}export{m as B};

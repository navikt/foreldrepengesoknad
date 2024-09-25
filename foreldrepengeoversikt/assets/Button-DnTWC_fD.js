import{c as E,L as N}from"./Label-BeJqMiuK.js";import{r as f,R as o}from"./index-CTjT7uj6.js";import{u as R,o as _,a as P}from"./useMergeRefs-Dg7ETiim.js";import{c as $}from"./composeEventHandlers-DeH74NdU.js";const z=globalThis!=null&&globalThis.document?f.useLayoutEffect:()=>{};var L=function(t,l){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&l.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(t);n<e.length;n++)l.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(t,e[n])&&(a[e[n]]=t[e[n]]);return a};const I=f.forwardRef((t,l)=>{var{className:a,size:e="medium",title:n="venter...",transparent:d=!1,variant:c="neutral",id:s}=t,r=L(t,["className","size","title","transparent","variant","id"]);const m=R();return o.createElement("svg",Object.assign({"aria-labelledby":s??`loader-${m}`,ref:l,className:E("navds-loader",a,`navds-loader--${e}`,`navds-loader--${c}`,{"navds-loader--transparent":d}),focusable:"false",viewBox:"0 0 50 50",preserveAspectRatio:"xMidYMid"},_(r,["children"])),o.createElement("title",{id:s??`loader-${m}`},n),o.createElement("circle",{className:"navds-loader__background",xmlns:"http://www.w3.org/2000/svg",cx:"25",cy:"25",r:"20",fill:"none"}),o.createElement("circle",{className:"navds-loader__foreground",cx:"25",cy:"25",r:"20",fill:"none",strokeDasharray:"50 155"}))});var S=function(t,l){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&l.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(t);n<e.length;n++)l.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(t,e[n])&&(a[e[n]]=t[e[n]]);return a};const C=f.forwardRef((t,l)=>{var{as:a="button",variant:e="primary",className:n,children:d,size:c="medium",loading:s=!1,disabled:r,style:m,icon:u,iconPosition:g="left"}=t,O=S(t,["as","variant","className","children","size","loading","disabled","style","icon","iconPosition"]);const v=f.useRef(null),[i,h]=f.useState(),j=P(v,l);z(()=>{if(s){const b=window.requestAnimationFrame(()=>{var p,y;h((y=(p=v==null?void 0:v.current)===null||p===void 0?void 0:p.getBoundingClientRect())===null||y===void 0?void 0:y.width)});return()=>{h(void 0),cancelAnimationFrame(b)}}},[s,d]);const w=r??i?_(O,["href"]):O,x=b=>{b.key===" "&&!r&&!i&&b.currentTarget.click()};return o.createElement(a,Object.assign({},a!=="button"?{role:"button"}:{},w,{ref:j,onKeyUp:$(w.onKeyUp,x),className:E(n,"navds-button",`navds-button--${e}`,`navds-button--${c}`,{"navds-button--loading":i,"navds-button--icon-only":!!u&&!d,"navds-button--disabled":r??i}),style:Object.assign(Object.assign({},m),{width:i}),disabled:r??i?!0:void 0}),i?o.createElement(I,{size:c}):o.createElement(o.Fragment,null,u&&g==="left"&&o.createElement("span",{className:"navds-button__icon"},u),d&&o.createElement(N,{as:"span",size:c==="medium"?"medium":"small"},d),u&&g==="right"&&o.createElement("span",{className:"navds-button__icon"},u)))});export{C as B,I as L,z as u};

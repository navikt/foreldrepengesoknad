import{c as j}from"./util-dafe5a09.js";import{r as c,R as l}from"./index-76fb7be0.js";import{c as N,L as $}from"./composeEventHandlers-dd2474b2.js";const x=(e,a)=>Object.entries(e).filter(([n])=>!a.includes(n)).reduce((n,[t,o])=>Object.assign(Object.assign({},n),{[t]:o}),{}),P=globalThis!=null&&globalThis.document?c.useLayoutEffect:()=>{};let E=0;function T(e){const[a,n]=c.useState(e),t=e||a;return c.useEffect(()=>{a==null&&(E+=1,n(`aksel-id-${E}`))},[a]),t}const _=l["useId"];function L(e){var a;if(_!==void 0){const n=_();return e??n.replace(/(:)/g,"")}return(a=T(e))!==null&&a!==void 0?a:""}function k(e){return a=>{e.forEach(n=>{typeof n=="function"?n(a):n!=null&&(n.current=a)})}}function z(...e){return l.useCallback(k(e),e)}var S=globalThis&&globalThis.__rest||function(e,a){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(e);o<t.length;o++)a.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(n[t[o]]=e[t[o]]);return n};const B=c.forwardRef((e,a)=>{var{className:n,size:t="medium",title:o="venter...",transparent:d=!1,variant:u="neutral",id:s}=e,r=S(e,["className","size","title","transparent","variant","id"]);const m=L();return l.createElement("svg",Object.assign({"aria-labelledby":s??`loader-${m}`,ref:a,className:j("navds-loader",n,`navds-loader--${t}`,`navds-loader--${u}`,{"navds-loader--transparent":d}),focusable:"false",viewBox:"0 0 50 50",preserveAspectRatio:"xMidYMid"},x(r,["children"])),l.createElement("title",{id:s??`loader-${m}`},o),l.createElement("circle",{className:"navds-loader__background",xmlns:"http://www.w3.org/2000/svg",cx:"25",cy:"25",r:"20",fill:"none"}),l.createElement("circle",{className:"navds-loader__foreground",cx:"25",cy:"25",r:"20",fill:"none",strokeDasharray:"50 155"}))}),C=B;var U=globalThis&&globalThis.__rest||function(e,a){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&a.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(e);o<t.length;o++)a.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(e,t[o])&&(n[t[o]]=e[t[o]]);return n};const A=c.forwardRef((e,a)=>{var{as:n="button",variant:t="primary",className:o,children:d,size:u="medium",loading:s=!1,disabled:r,style:m,icon:f,iconPosition:y="left"}=e,h=U(e,["as","variant","className","children","size","loading","disabled","style","icon","iconPosition"]);const b=c.useRef(null),[i,O]=c.useState(),I=z(b,a);P(()=>{if(s){const v=window.requestAnimationFrame(()=>{var p,g;O((g=(p=b==null?void 0:b.current)===null||p===void 0?void 0:p.getBoundingClientRect())===null||g===void 0?void 0:g.width)});return()=>{O(void 0),cancelAnimationFrame(v)}}},[s,d]);const w=r??i?x(h,["href"]):h,R=v=>{v.key===" "&&!r&&!i&&v.currentTarget.click()};return l.createElement(n,Object.assign({},n!=="button"?{role:"button"}:{},w,{ref:I,onKeyUp:N(w.onKeyUp,R),className:j(o,"navds-button",`navds-button--${t}`,`navds-button--${u}`,{"navds-button--loading":i,"navds-button--icon-only":!!f&&!d,"navds-button--disabled":r??i}),style:Object.assign(Object.assign({},m),{width:i}),disabled:r??i?!0:void 0}),i?l.createElement(C,{size:u}):l.createElement(l.Fragment,null,f&&y==="left"&&l.createElement("span",{className:"navds-button__icon"},f),d&&l.createElement($,{as:"span",size:u==="medium"?"medium":"small"},d),f&&y==="right"&&l.createElement("span",{className:"navds-button__icon"},f)))}),M=A;export{M as B,C as L,z as a,L as u};

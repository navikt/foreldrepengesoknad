import{c as _}from"./clsx-B-dksMZM.js";import{r as f,R as l}from"./index-Dl6G-zuu.js";import{u as R,o as E}from"./useId-zmAp5ghi.js";import{L as N}from"./Label-DKKZxAV5.js";const P=globalThis!=null&&globalThis.document?f.useLayoutEffect:()=>{};function $(e,r,{checkForDefaultPrevented:a=!0}={}){return function(n){if(e==null||e(n),a===!1||!n.defaultPrevented)return r==null?void 0:r(n)}}function z(e){return r=>{e.forEach(a=>{typeof a=="function"?a(r):a!=null&&(a.current=r)})}}function L(...e){return l.useCallback(z(e),e)}var k=function(e,r){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(a[t[n]]=e[t[n]]);return a};const B=f.forwardRef((e,r)=>{var{className:a,size:t="medium",title:n="venter...",transparent:d=!1,variant:c="neutral",id:s}=e,o=k(e,["className","size","title","transparent","variant","id"]);const m=R();return l.createElement("svg",Object.assign({"aria-labelledby":s??`loader-${m}`,ref:r,className:_("navds-loader",a,`navds-loader--${t}`,`navds-loader--${c}`,{"navds-loader--transparent":d}),focusable:"false",viewBox:"0 0 50 50",preserveAspectRatio:"xMidYMid"},E(o,["children"])),l.createElement("title",{id:s??`loader-${m}`},n),l.createElement("circle",{className:"navds-loader__background",xmlns:"http://www.w3.org/2000/svg",cx:"25",cy:"25",r:"20",fill:"none"}),l.createElement("circle",{className:"navds-loader__foreground",cx:"25",cy:"25",r:"20",fill:"none",strokeDasharray:"50 155"}))});var I=function(e,r){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(a[t[n]]=e[t[n]]);return a};const S=f.forwardRef((e,r)=>{var{as:a="button",variant:t="primary",className:n,children:d,size:c="medium",loading:s=!1,disabled:o,style:m,icon:u,iconPosition:g="left"}=e,O=I(e,["as","variant","className","children","size","loading","disabled","style","icon","iconPosition"]);const v=f.useRef(null),[i,h]=f.useState(),j=L(v,r);P(()=>{if(s){const b=window.requestAnimationFrame(()=>{var p,y;h((y=(p=v==null?void 0:v.current)===null||p===void 0?void 0:p.getBoundingClientRect())===null||y===void 0?void 0:y.width)});return()=>{h(void 0),cancelAnimationFrame(b)}}},[s,d]);const w=o??i?E(O,["href"]):O,x=b=>{b.key===" "&&!o&&!i&&b.currentTarget.click()};return l.createElement(a,Object.assign({},a!=="button"?{role:"button"}:{},w,{ref:j,onKeyUp:$(w.onKeyUp,x),className:_(n,"navds-button",`navds-button--${t}`,`navds-button--${c}`,{"navds-button--loading":i,"navds-button--icon-only":!!u&&!d,"navds-button--disabled":o??i}),style:Object.assign(Object.assign({},m),{width:i}),disabled:o??i?!0:void 0}),i?l.createElement(B,{size:c}):l.createElement(l.Fragment,null,u&&g==="left"&&l.createElement("span",{className:"navds-button__icon"},u),d&&l.createElement(N,{as:"span",size:c==="medium"?"medium":"small"},d),u&&g==="right"&&l.createElement("span",{className:"navds-button__icon"},u)))}),K=S;export{K as B,B as L,P as a,$ as c,z as m,L as u};

import{r as o,R as c}from"./index-CTjT7uj6.js";import{u as i,d as s,i as d,c as f,g as u}from"./Infobox-D0dyQTcP.js";var p=function(e,r){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,t=Object.getOwnPropertySymbols(e);l<t.length;l++)r.indexOf(t[l])<0&&Object.prototype.propertyIsEnumerable.call(e,t[l])&&(a[t[l]]=e[t[l]]);return a};const b=o.forwardRef((e,r)=>{var{title:a,titleId:t}=e,l=p(e,["title","titleId"]);let n=i();return n=a?t||"title-"+n:void 0,o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:r,"aria-labelledby":n},l),a?o.createElement("title",{id:n},a):null,o.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M6.317 4.32a.75.75 0 0 0-1.023.932L7.704 12l-2.41 6.748a.75.75 0 0 0 1.023.932l15-7a.75.75 0 0 0 0-1.36zm2.712 6.93L7.31 6.44 19.227 12 7.31 17.56l1.719-4.81H12.5a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),v=()=>c.createElement("span",{className:"navds-stack__spacer"}),m=e=>e==null||e.toString().trim().length===0;s.extend(d);s().add(18,"week").add(3,"day").startOf("day").toDate();s().startOf("day").subtract(21,"days");s().add(1,"year").startOf("day").toDate();const w=e=>r=>m(r)||f.test(r)?null:e,g=e=>r=>s(r).isAfter(u)?e:null,E=()=>{const e=o.useRef(null),[r,a]=o.useState(0),t=()=>a(r+1);return o.useEffect(()=>{window.scrollTo(0,0)},[]),o.useEffect(()=>{e.current&&r>0&&e.current.scrollIntoView({behavior:"smooth",block:"nearest"})},[r]),{ref:e,scrollToBottom:t}};export{v as S,g as a,b,m as c,w as i,E as u};

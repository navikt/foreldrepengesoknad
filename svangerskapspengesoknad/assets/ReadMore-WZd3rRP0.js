import{p as b,m as l,q as h,r as y,o as _}from"./VeiviserPage-6gb9KOZj.js";import{r as g,R as r}from"./index-BX3iQpgp.js";var C=function(a,s){var o={};for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&s.indexOf(e)<0&&(o[e]=a[e]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(a);n<e.length;n++)s.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(a,e[n])&&(o[e[n]]=a[e[n]]);return o};const w=g.forwardRef((a,s)=>{var{className:o,header:e,children:n,open:c,defaultOpen:m=!1,onClick:p,size:d="medium",onOpenChange:i}=a,u=C(a,["className","header","children","open","defaultOpen","onClick","size","onOpenChange"]);const[t,f]=b({defaultValue:m,value:c,onChange:i}),v=d==="small"?"small":"medium";return r.createElement("div",{className:l("navds-read-more",`navds-read-more--${d}`,o,{"navds-read-more--open":t}),"data-volume":"low"},r.createElement("button",Object.assign({},u,{ref:s,type:"button",className:l("navds-read-more__button","navds-body-short",{"navds-body-short--small":d==="small"}),onClick:h(p,()=>f(O=>!O)),"aria-expanded":t,"data-state":t?"open":"closed"}),r.createElement(y,{className:"navds-read-more__expand-icon","aria-hidden":!0}),r.createElement("span",null,e)),r.createElement(_,{as:"div","aria-hidden":!t,className:l("navds-read-more__content",{"navds-read-more__content--closed":!t}),size:v,"data-state":t?"open":"closed"},n))});export{w as R};

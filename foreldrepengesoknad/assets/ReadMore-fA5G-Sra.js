import{r as b,R as r}from"./index-DI2V0i71.js";import{c as h,B as y}from"./List-CllE7Dzf.js";import{c as _}from"./VStack-CblYb0Xi.js";import{u as g,e as C}from"./Uttaksplan-R8uyWRL5.js";var E=function(a,s){var o={};for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&s.indexOf(e)<0&&(o[e]=a[e]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(a);n<e.length;n++)s.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(a,e[n])&&(o[e[n]]=a[e[n]]);return o};const R=b.forwardRef((a,s)=>{var{className:o,header:e,children:n,open:c,defaultOpen:m=!1,onClick:p,size:l="medium",onOpenChange:i}=a,u=E(a,["className","header","children","open","defaultOpen","onClick","size","onOpenChange"]);const{cn:d}=h(),[t,f]=g({defaultValue:m,value:c,onChange:i}),v=l==="small"?"small":"medium";return r.createElement("div",{className:d("navds-read-more",`navds-read-more--${l}`,o,{"navds-read-more--open":t}),"data-volume":"low"},r.createElement("button",Object.assign({},u,{ref:s,type:"button",className:d("navds-read-more__button","navds-body-short",{"navds-body-short--small":l==="small"}),onClick:_(p,()=>f(O=>!O)),"aria-expanded":t,"data-state":t?"open":"closed"}),r.createElement(C,{className:d("navds-read-more__expand-icon"),"aria-hidden":!0}),r.createElement("span",null,e)),r.createElement(y,{as:"div","aria-hidden":!t,className:d("navds-read-more__content",{"navds-read-more__content--closed":!t}),size:v,"data-state":t?"open":"closed"},n))});export{R};

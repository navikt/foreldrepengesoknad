import{c}from"./VStack-CL9KkpXr.js";import{r as l,R as s}from"./index-CTjT7uj6.js";import{a as O,l as x,k as y}from"./UttaksdagenString-CIHKv-n2.js";import{i as _}from"./VeiviserPage-DMWh4IvO.js";const d=l.createContext({open:!1,toggleOpen:()=>{},size:"medium"});var g=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const h=l.forwardRef((n,a)=>{var{children:r,className:e}=n,t=g(n,["children","className"]);const o=l.useContext(d);return o===null?(console.error("<ExpansionCard.Content> has to be used within an <ExpansionCard>"),null):s.createElement(O,Object.assign({},t,{ref:a,as:"div",className:c("navds-expansioncard__content",e,{"navds-expansioncard__content--closed":!o.open}),"aria-hidden":!o.open,size:o.size}),s.createElement("div",{className:"navds-expansioncard__content-inner"},r))});var E=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const C=l.forwardRef((n,a)=>{var{className:r}=n,e=E(n,["className"]);const t=l.useContext(d);return t===null?(console.error("<ExpansionCard.Description> has to be used within an <ExpansionCard>"),null):s.createElement(O,Object.assign({},e,{as:"p",ref:a,className:c("navds-link-panel__description",r),size:t.size}))});var j=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const w=l.forwardRef((n,a)=>{var{children:r,className:e}=n,t=j(n,["children","className"]);const o=l.useContext(d),i=_("global");return o===null?(console.error("<ExpansionCard.Header> has to be used within an <ExpansionCard>"),null):s.createElement("div",Object.assign({ref:a},t,{className:c("navds-expansioncard__header",e)}),s.createElement("div",{className:"navds-expansioncard__header-content"},r),s.createElement("button",{className:"navds-expansioncard__header-button",onClick:o.toggleOpen,type:"button","aria-expanded":o.open},s.createElement(x,{className:"navds-expansioncard__header-chevron",title:i("showMore")})))});var N=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const P=l.forwardRef((n,a)=>{var{className:r,as:e="h3",size:t="medium"}=n,o=N(n,["className","as","size"]);return s.createElement(e,Object.assign({},o,{ref:a,className:c("navds-expansioncard__title",`navds-expansioncard__title--${t}`,"navds-heading",`navds-heading--${t}`,r)}))});var S=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const p=l.forwardRef((n,a)=>{var{className:r,onToggle:e,open:t,defaultOpen:o=!1,size:i="medium"}=n,v=S(n,["className","onToggle","open","defaultOpen","size"]);const u=l.useRef(!(t||o)),[m,b]=y({value:t,onChange:f=>{e==null||e(f),u.current=!0},defaultValue:o});return s.createElement(d.Provider,{value:{open:t??m,toggleOpen:()=>b(f=>!f),size:i}},s.createElement("section",Object.assign({},v,{className:c("navds-expansioncard",r,`navds-expansioncard--${i}`,{"navds-expansioncard--open":t??m,"navds-expansioncard--no-animation":!u.current}),ref:a})))});p.Header=w;p.Content=h;p.Title=P;p.Description=C;export{p as E};

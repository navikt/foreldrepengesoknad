import{r as O,q as c,y as b,w as x}from"./VeiviserPage-C75wD2__.js";import{r as l,R as s}from"./index-CTjT7uj6.js";const d=l.createContext({open:!1,toggleOpen:()=>{},size:"medium"});var _=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const g=l.forwardRef((n,a)=>{var{children:r,className:e}=n,t=_(n,["children","className"]);const o=l.useContext(d);return o===null?(console.error("<ExpansionCard.Content> has to be used within an <ExpansionCard>"),null):s.createElement(O,Object.assign({},t,{ref:a,as:"div",className:c("navds-expansioncard__content",e,{"navds-expansioncard__content--closed":!o.open}),"aria-hidden":!o.open,size:o.size}),s.createElement("div",{className:"navds-expansioncard__content-inner"},r))});var h=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const E=l.forwardRef((n,a)=>{var{className:r}=n,e=h(n,["className"]);const t=l.useContext(d);return t===null?(console.error("<ExpansionCard.Description> has to be used within an <ExpansionCard>"),null):s.createElement(O,Object.assign({},e,{as:"p",ref:a,className:c("navds-link-panel__description",r),size:t.size}))});var C=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const j=l.forwardRef((n,a)=>{var{children:r,className:e}=n,t=C(n,["children","className"]);const o=l.useContext(d);return o===null?(console.error("<ExpansionCard.Header> has to be used within an <ExpansionCard>"),null):s.createElement("div",Object.assign({ref:a},t,{className:c("navds-expansioncard__header",e)}),s.createElement("div",{className:"navds-expansioncard__header-content"},r),s.createElement("button",{className:"navds-expansioncard__header-button",onClick:()=>o.toggleOpen(),type:"button","aria-expanded":o.open},s.createElement(b,{className:"navds-expansioncard__header-chevron",title:"Vis mer"})))});var w=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const N=l.forwardRef((n,a)=>{var{className:r,as:e="h3",size:t="medium"}=n,o=w(n,["className","as","size"]);return s.createElement(e,Object.assign({},o,{ref:a,className:c("navds-expansioncard__title",`navds-expansioncard__title--${t}`,"navds-heading",`navds-heading--${t}`,r)}))});var P=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const i=l.forwardRef((n,a)=>{var{className:r,onToggle:e,open:t,defaultOpen:o=!1,size:f="medium"}=n,v=P(n,["className","onToggle","open","defaultOpen","size"]);const u=l.useRef(!(t||o)),[m,y]=x({value:t,onChange:p=>{e==null||e(p),u.current=!0},defaultValue:o});return s.createElement(d.Provider,{value:{open:t??m,toggleOpen:()=>y(p=>!p),size:f}},s.createElement("section",Object.assign({},v,{className:c("navds-expansioncard",r,`navds-expansioncard--${f}`,{"navds-expansioncard--open":t??m,"navds-expansioncard--no-animation":!u.current}),ref:a})))});i.Header=j;i.Content=g;i.Title=N;i.Description=E;export{i as E};

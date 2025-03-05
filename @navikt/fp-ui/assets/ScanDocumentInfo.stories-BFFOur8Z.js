import{j as o}from"./jsx-runtime-CLpGMVip.js";import{u as S}from"./index-Bv0NUv48.js";import{l as w}from"./links-Cq4ifjPA.js";import"./dates-l9FtPD11.js";import{r as d,R as l}from"./index-CZMpeKRu.js";import{u as m}from"./useId-U89bW7jp.js";import{u as N}from"./useControllableState-buOAZ2EQ.js";import{a as i}from"./Label-QI4r3q9e.js";import{u as D}from"./i18n.hooks-Dta7jMm_.js";import{S as P}from"./ChevronDown-CXsSWUiT.js";import{M as p}from"./message-Dgb3GyQu.js";import{V as I}from"./VStack-DcgeE-Qb.js";import{L as k}from"./Link-DLesaqQ3.js";import"./dayjs.min-Cu1bdzaI.js";import"./useId-BOzDck44.js";import"./BasePrimitive-CMWW3eNW.js";const x=d.createContext({open:!1,toggleOpen:()=>{},size:"medium"});var z=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const R=d.forwardRef((n,a)=>{var{children:r,className:e}=n,t=z(n,["children","className"]);const{cn:s}=m(),c=d.useContext(x);return c===null?(console.error("<ExpansionCard.Content> has to be used within an <ExpansionCard>"),null):l.createElement(i,Object.assign({},t,{ref:a,as:"div",className:s("navds-expansioncard__content",e,{"navds-expansioncard__content--closed":!c.open}),"aria-hidden":!c.open,size:c.size,"data-open":c.open}),l.createElement("div",{className:s("navds-expansioncard__content-inner")},r))});var L=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const T=d.forwardRef((n,a)=>{var{className:r}=n,e=L(n,["className"]);const{cn:t}=m(),s=d.useContext(x);return s===null?(console.error("<ExpansionCard.Description> has to be used within an <ExpansionCard>"),null):l.createElement(i,Object.assign({},e,{as:"p",ref:a,className:t("navds-link-panel__description",r),size:s.size}))});var $=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const M=d.forwardRef((n,a)=>{var{children:r,className:e}=n,t=$(n,["children","className"]);const{cn:s}=m(),c=d.useContext(x),O=D("global");return c===null?(console.error("<ExpansionCard.Header> has to be used within an <ExpansionCard>"),null):l.createElement("div",Object.assign({ref:a},t,{className:s("navds-expansioncard__header",e),"data-open":c.open}),l.createElement("div",{className:s("navds-expansioncard__header-content")},r),l.createElement("button",{className:s("navds-expansioncard__header-button"),onClick:c.toggleOpen,type:"button","aria-expanded":c.open},l.createElement(P,{className:s("navds-expansioncard__header-chevron"),title:O("showMore")})))});var H=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const V=d.forwardRef((n,a)=>{var{className:r,as:e="h3",size:t="medium"}=n,s=H(n,["className","as","size"]);const{cn:c}=m();return l.createElement(e,Object.assign({},s,{ref:a,className:c("navds-expansioncard__title",`navds-expansioncard__title--${t}`,"navds-heading",`navds-heading--${t}`,r)}))});var B=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const f=d.forwardRef((n,a)=>{var{className:r,onToggle:e,open:t,defaultOpen:s=!1,size:c="medium"}=n,O=B(n,["className","onToggle","open","defaultOpen","size"]);const{cn:C}=m(),j=d.useRef(!(t||s)),[v,E]=N({value:t,onChange:h=>{e==null||e(h),j.current=!0},defaultValue:s});return l.createElement(x.Provider,{value:{open:t??v,toggleOpen:()=>E(h=>!h),size:c}},l.createElement("section",Object.assign({},O,{className:C("navds-expansioncard",r,`navds-expansioncard--${c}`,{"navds-expansioncard--open":t??v,"navds-expansioncard--no-animation":!j.current}),ref:a})))});f.Header=M;f.Content=R;f.Title=V;f.Description=T;const _=()=>o.jsxs(f,{size:"small","aria-label":S().formatMessage({id:"ScanDocumentInfo.Tittel"}),children:[o.jsx(f.Header,{children:o.jsx(f.Title,{size:"small",as:"h4",children:o.jsx(p,{id:"ScanDocumentInfo.Tittel"})})}),o.jsx(f.Content,{children:o.jsxs(I,{gap:"5",children:[o.jsx(i,{children:o.jsx(p,{id:"ScanDocumentInfo.Del1"})}),o.jsxs("ul",{children:[o.jsx(i,{children:o.jsx(p,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt1"})}),o.jsx(i,{children:o.jsx(p,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt2"})}),o.jsx(i,{children:o.jsx(p,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt3"})}),o.jsx(i,{children:o.jsx(p,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt4"})}),o.jsx(i,{children:o.jsx(p,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt5"})})]}),o.jsx(i,{children:o.jsx(p,{id:"ScanDocumentInfo.Del2"})}),o.jsx(i,{children:o.jsx(k,{href:w.scanneDokument,target:"_blank",children:o.jsx(p,{id:"ScanDocumentInfo.Link"})})})]})})]});_.__docgenInfo={description:"",methods:[],displayName:"ScanDocumentInfo"};const ae={component:_},u={};var b,y,g;u.parameters={...u.parameters,docs:{...(b=u.parameters)==null?void 0:b.docs,source:{originalSource:"{}",...(g=(y=u.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};const oe=["Default"];export{u as Default,oe as __namedExportsOrder,ae as default};

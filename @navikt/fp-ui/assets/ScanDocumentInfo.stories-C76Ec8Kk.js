import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import{u as C}from"./index-Bo6hejM9.js";import{l as S}from"./links-XBeNlE0K.js";import"./dates-wsUZxpzE.js";import{c as f}from"./useId-BGzI-o9Y.js";import{r as l,R as c}from"./index-CTjT7uj6.js";import{u as w}from"./useControllableState-CZwrAZhD.js";import{a as i}from"./Label-oPV7DuXz.js";import{u as N}from"./i18n.context-CjLN2Up4.js";import{S as D}from"./ChevronDown-Cwt6cPhU.js";import{M as d}from"./message-Cb07H1bc.js";import{V as P}from"./VStack-Bd1wS6ci.js";import{L as I}from"./Link-Cq_02NdE.js";import"./dayjs.min-0BeM2qWp.js";import"./useId-BFxX0aRd.js";import"./BasePrimitive-D4NMUMeT.js";import"./useMergeRefs-Bb4JH14W.js";const x=l.createContext({open:!1,toggleOpen:()=>{},size:"medium"});var k=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const z=l.forwardRef((n,a)=>{var{children:r,className:e}=n,t=k(n,["children","className"]);const s=l.useContext(x);return s===null?(console.error("<ExpansionCard.Content> has to be used within an <ExpansionCard>"),null):c.createElement(i,Object.assign({},t,{ref:a,as:"div",className:f("navds-expansioncard__content",e,{"navds-expansioncard__content--closed":!s.open}),"aria-hidden":!s.open,size:s.size}),c.createElement("div",{className:"navds-expansioncard__content-inner"},r))});var L=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const R=l.forwardRef((n,a)=>{var{className:r}=n,e=L(n,["className"]);const t=l.useContext(x);return t===null?(console.error("<ExpansionCard.Description> has to be used within an <ExpansionCard>"),null):c.createElement(i,Object.assign({},e,{as:"p",ref:a,className:f("navds-link-panel__description",r),size:t.size}))});var T=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const $=l.forwardRef((n,a)=>{var{children:r,className:e}=n,t=T(n,["children","className"]);const s=l.useContext(x),m=N("global");return s===null?(console.error("<ExpansionCard.Header> has to be used within an <ExpansionCard>"),null):c.createElement("div",Object.assign({ref:a},t,{className:f("navds-expansioncard__header",e)}),c.createElement("div",{className:"navds-expansioncard__header-content"},r),c.createElement("button",{className:"navds-expansioncard__header-button",onClick:s.toggleOpen,type:"button","aria-expanded":s.open},c.createElement(D,{className:"navds-expansioncard__header-chevron",title:m("showMore")})))});var M=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const H=l.forwardRef((n,a)=>{var{className:r,as:e="h3",size:t="medium"}=n,s=M(n,["className","as","size"]);return c.createElement(e,Object.assign({},s,{ref:a,className:f("navds-expansioncard__title",`navds-expansioncard__title--${t}`,"navds-heading",`navds-heading--${t}`,r)}))});var V=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const p=l.forwardRef((n,a)=>{var{className:r,onToggle:e,open:t,defaultOpen:s=!1,size:m="medium"}=n,_=V(n,["className","onToggle","open","defaultOpen","size"]);const v=l.useRef(!(t||s)),[h,E]=w({value:t,onChange:O=>{e==null||e(O),v.current=!0},defaultValue:s});return c.createElement(x.Provider,{value:{open:t??h,toggleOpen:()=>E(O=>!O),size:m}},c.createElement("section",Object.assign({},_,{className:f("navds-expansioncard",r,`navds-expansioncard--${m}`,{"navds-expansioncard--open":t??h,"navds-expansioncard--no-animation":!v.current}),ref:a})))});p.Header=$;p.Content=z;p.Title=H;p.Description=R;const g=()=>o.jsxs(p,{size:"small","aria-label":C().formatMessage({id:"ScanDocumentInfo.Tittel"}),children:[o.jsx(p.Header,{children:o.jsx(p.Title,{size:"small",as:"h4",children:o.jsx(d,{id:"ScanDocumentInfo.Tittel"})})}),o.jsx(p.Content,{children:o.jsxs(P,{gap:"5",children:[o.jsx(i,{children:o.jsx(d,{id:"ScanDocumentInfo.Del1"})}),o.jsxs("ul",{children:[o.jsx(i,{children:o.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt1"})}),o.jsx(i,{children:o.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt2"})}),o.jsx(i,{children:o.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt3"})}),o.jsx(i,{children:o.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt4"})}),o.jsx(i,{children:o.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt5"})})]}),o.jsx(i,{children:o.jsx(d,{id:"ScanDocumentInfo.Del2"})}),o.jsx(i,{children:o.jsx(I,{href:S.scanneDokument,target:"_blank",children:o.jsx(d,{id:"ScanDocumentInfo.Link"})})})]})})]});g.__docgenInfo={description:"",methods:[],displayName:"ScanDocumentInfo"};const ae={component:g},u={};var j,b,y;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:"{}",...(y=(b=u.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};const oe=["Default"];export{u as Default,oe as __namedExportsOrder,ae as default};

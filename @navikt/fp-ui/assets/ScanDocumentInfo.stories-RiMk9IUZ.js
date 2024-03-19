import{j as a}from"./jsx-runtime-Du8NFWEI.js";import{u as D}from"./index-Br48K-Zq.js";import{l as N}from"./links-dJHPeQm3.js";import"./dates-BgTHPkQK.js";import{a as i,c as p}from"./Label-El8VFjDh.js";import{r as c,R as l}from"./index-Dl6G-zuu.js";import{C as I}from"./ChevronDown-CY3RuW24.js";import{F as d}from"./message-D3WIBprz.js";import{V as P}from"./VStack-DWIsOqOD.js";import{L as k}from"./Link-DqQLotnN.js";import"./useId-BnKOV0D5.js";const x=c.createContext({open:!1,toggleOpen:()=>{},size:"medium"});var z=function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const L=c.forwardRef((n,o)=>{var{children:r,className:e}=n,t=z(n,["children","className"]);const s=c.useContext(x);return s===null?(console.error("<ExpansionCard.Content> has to be used within an <ExpansionCard>"),null):l.createElement(i,Object.assign({},t,{ref:o,as:"div",className:p("navds-expansioncard__content",e,{"navds-expansioncard__content--closed":!s.open}),"aria-hidden":!s.open,size:s.size}),l.createElement("div",{className:"navds-expansioncard__content-inner"},r))});var R=function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const $=c.forwardRef((n,o)=>{var{className:r}=n,e=R(n,["className"]);const t=c.useContext(x);return t===null?(console.error("<ExpansionCard.Description> has to be used within an <ExpansionCard>"),null):l.createElement(i,Object.assign({},e,{as:"p",ref:o,className:p("navds-link-panel__description",r),size:t.size}))});var T=function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const H=c.forwardRef((n,o)=>{var{children:r,className:e}=n,t=T(n,["children","className"]);const s=c.useContext(x);return s===null?(console.error("<ExpansionCard.Header> has to be used within an <ExpansionCard>"),null):l.createElement("div",Object.assign({ref:o},t,{className:p("navds-expansioncard__header",e)}),l.createElement("div",{className:"navds-expansioncard__header-content"},r),l.createElement("button",{className:"navds-expansioncard__header-button",onClick:()=>s.toggleOpen(),type:"button","aria-expanded":s.open},l.createElement(I,{className:"navds-expansioncard__header-chevron",title:"Vis mer"})))});var F=function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const V=c.forwardRef((n,o)=>{var{className:r,as:e="h3",size:t="medium"}=n,s=F(n,["className","as","size"]);return l.createElement(e,Object.assign({},s,{ref:o,className:p("navds-expansioncard__title",`navds-expansioncard__title--${t}`,"navds-heading",`navds-heading--${t}`,r)}))});var B=function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const f=c.forwardRef((n,o)=>{var{className:r,onToggle:e,open:t,defaultOpen:s=!1,size:v="medium"}=n,C=B(n,["className","onToggle","open","defaultOpen","size"]);const[O,S]=c.useState(s),j=c.useRef(!(t||s)),w=()=>{if(t===void 0){const h=!O;S(h),e==null||e(h)}else e==null||e(!t);j.current=!0};return l.createElement(x.Provider,{value:{open:t??O,toggleOpen:w,size:v}},l.createElement("section",Object.assign({},C,{className:p("navds-expansioncard",r,`navds-expansioncard--${v}`,{"navds-expansioncard--open":t??O,"navds-expansioncard--no-animation":!j.current}),ref:o})))});f.Header=H;f.Content=L;f.Title=V;f.Description=$;const m=f,_=()=>a.jsxs(m,{size:"small","aria-label":D().formatMessage({id:"ScanDocumentInfo.Tittel"}),children:[a.jsx(m.Header,{children:a.jsx(m.Title,{size:"small",as:"h4",children:a.jsx(d,{id:"ScanDocumentInfo.Tittel"})})}),a.jsx(m.Content,{children:a.jsxs(P,{gap:"5",children:[a.jsx(i,{children:a.jsx(d,{id:"ScanDocumentInfo.Del1"})}),a.jsxs("ul",{children:[a.jsx(i,{children:a.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt1"})}),a.jsx(i,{children:a.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt2"})}),a.jsx(i,{children:a.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt3"})}),a.jsx(i,{children:a.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt4"})}),a.jsx(i,{children:a.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt5"})})]}),a.jsx(i,{children:a.jsx(d,{id:"ScanDocumentInfo.Del2"})}),a.jsx(i,{children:a.jsx(k,{href:N.scanneDokument,target:"_blank",children:a.jsx(d,{id:"ScanDocumentInfo.Link"})})})]})})]}),E=_;_.__docgenInfo={description:"",methods:[],displayName:"ScanDocumentInfo"};const ee={title:"ScanDocumentInfo",component:E},M=()=>a.jsx(E,{}),u=M.bind({});var b,y,g;u.parameters={...u.parameters,docs:{...(b=u.parameters)==null?void 0:b.docs,source:{originalSource:`() => {
  return <ScanDocumentInfo />;
}`,...(g=(y=u.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};const ne=["Default"];export{u as Default,ne as __namedExportsOrder,ee as default};

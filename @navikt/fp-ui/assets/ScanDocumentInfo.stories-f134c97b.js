import{j as a}from"./jsx-runtime-ffb262ed.js";import"./index-ff53cee2.js";import{l as w}from"./links-022380bf.js";import"./dates-3338231f.js";import{U as D,F as d}from"./UiIntlProvider-cfc5b246.js";import{u as N}from"./useUiIntl-cb57dcdf.js";import{a as c,c as p}from"./Label-46ef80e6.js";import{r as l,R as i}from"./index-76fb7be0.js";import{C as I}from"./ChevronDown-1905476b.js";import{V as P}from"./VStack-e6d19ed6.js";import{L as T}from"./Link-d88ab007.js";import"./_commonjsHelpers-de833af9.js";import"./nn_NO-719bf87a.js";import"./provider-595edeb0.js";const x=l.createContext({open:!1,toggleOpen:()=>{},size:"medium"});var k=globalThis&&globalThis.__rest||function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const z=l.forwardRef((n,o)=>{var{children:r,className:e}=n,t=k(n,["children","className"]);const s=l.useContext(x);return s===null?(console.error("<ExpansionCard.Content> has to be used within an <ExpansionCard>"),null):i.createElement(c,Object.assign({},t,{ref:o,as:"div",className:p("navds-expansioncard__content",e,{"navds-expansioncard__content--closed":!s.open}),"aria-hidden":!s.open,size:s.size}),i.createElement("div",{className:"navds-expansioncard__content-inner"},r))});var L=globalThis&&globalThis.__rest||function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const R=l.forwardRef((n,o)=>{var{className:r}=n,e=L(n,["className"]);const t=l.useContext(x);return t===null?(console.error("<ExpansionCard.Description> has to be used within an <ExpansionCard>"),null):i.createElement(c,Object.assign({},e,{as:"p",ref:o,className:p("navds-link-panel__description",r),size:t.size}))});var $=globalThis&&globalThis.__rest||function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const H=l.forwardRef((n,o)=>{var{children:r,className:e}=n,t=$(n,["children","className"]);const s=l.useContext(x);return s===null?(console.error("<ExpansionCard.Header> has to be used within an <ExpansionCard>"),null):i.createElement("div",Object.assign({ref:o},t,{className:p("navds-expansioncard__header",e)}),i.createElement("div",{className:"navds-expansioncard__header-content"},r),i.createElement("button",{className:"navds-expansioncard__header-button",onClick:()=>s.toggleOpen(),type:"button","aria-expanded":s.open},i.createElement(I,{className:"navds-expansioncard__header-chevron",title:"Vis mer"})))});var F=globalThis&&globalThis.__rest||function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const U=l.forwardRef((n,o)=>{var{className:r,as:e="h3",size:t="medium"}=n,s=F(n,["className","as","size"]);return i.createElement(e,Object.assign({},s,{ref:o,className:p("navds-expansioncard__title",`navds-expansioncard__title--${t}`,"navds-heading",`navds-heading--${t}`,r)}))});var V=globalThis&&globalThis.__rest||function(n,o){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&o.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)o.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const m=l.forwardRef((n,o)=>{var{className:r,onToggle:e,open:t,defaultOpen:s=!1,size:b="medium"}=n,E=V(n,["className","onToggle","open","defaultOpen","size"]);const[h,C]=l.useState(s),O=l.useRef(!(t||s)),S=()=>{if(t===void 0){const v=!h;C(v),e==null||e(v)}else e==null||e(!t);O.current=!0};return i.createElement(x.Provider,{value:{open:t??h,toggleOpen:S,size:b}},i.createElement("section",Object.assign({},E,{className:p("navds-expansioncard",r,`navds-expansioncard--${b}`,{"navds-expansioncard--open":t??h,"navds-expansioncard--no-animation":!O.current}),ref:o})))});m.Header=H;m.Content=z;m.Title=U;m.Description=R;const f=m,B=()=>a.jsx(D,{children:a.jsxs(f,{size:"small","aria-label":N().formatMessage({id:"ScanDocumentInfo.Tittel"}),children:[a.jsx(f.Header,{children:a.jsx(f.Title,{size:"small",as:"h4",children:a.jsx(d,{id:"ScanDocumentInfo.Tittel"})})}),a.jsx(f.Content,{children:a.jsxs(P,{gap:"5",children:[a.jsx(c,{children:a.jsx(d,{id:"ScanDocumentInfo.Del1"})}),a.jsxs("ul",{children:[a.jsx(c,{children:a.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt1"})}),a.jsx(c,{children:a.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt2"})}),a.jsx(c,{children:a.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt3"})}),a.jsx(c,{children:a.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt4"})}),a.jsx(c,{children:a.jsx(d,{tagName:"li",id:"ScanDocumentInfo.Liste.Punkt5"})})]}),a.jsx(c,{children:a.jsx(d,{id:"ScanDocumentInfo.Del2"})}),a.jsx(c,{children:a.jsx(T,{href:w.scanneDokument,target:"_blank",children:a.jsx(d,{id:"ScanDocumentInfo.Link"})})})]})})]})}),_=B,ae={title:"ScanDocumentInfo",component:_},M=()=>a.jsx(_,{}),u=M.bind({});var g,j,y;u.parameters={...u.parameters,docs:{...(g=u.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  return <ScanDocumentInfo />;
}`,...(y=(j=u.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};const oe=["Default"];export{u as Default,oe as __namedExportsOrder,ae as default};

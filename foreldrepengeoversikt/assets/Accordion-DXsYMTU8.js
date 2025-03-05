import{r as i,R as s}from"./index-CR__hKHy.js";import{u as m,a as y,b as x,H as C}from"./Label-vuqQZ1tj.js";import{o as w}from"./useId-CID_lvh_.js";import{u as j,S}from"./ChevronDown-CtB47T9y.js";import{c as E}from"./composeEventHandlers-BV8udL3-.js";const v=i.createContext({headingSize:"small",size:"medium",openItems:[],mounted:!1});var N=function(n,r){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&r.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)r.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(o[e[t]]=n[e[t]]);return o};const O=i.createContext(null),A=i.forwardRef((n,r)=>{var{children:o,className:e,open:t,defaultOpen:c=!1,onOpenChange:u}=n,l=N(n,["children","className","open","defaultOpen","onOpenChange"]);const[a,p]=j({defaultValue:c,value:t,onChange:u}),d=i.useContext(v),{cn:f}=m(),b=i.useRef(!(t||c)),_=()=>{p(g=>!g),b.current=!0};return d!=null&&d.mounted||console.error("<Accordion.Item> has to be used within an <Accordion>"),s.createElement("div",Object.assign({className:f("navds-accordion__item",e,{"navds-accordion__item--open":a,"navds-accordion__item--neutral":(d==null?void 0:d.variant)==="neutral","navds-accordion__item--no-animation":!b.current}),"data-expanded":a,ref:r},w(l,["onClick"])),s.createElement(O.Provider,{value:{open:a,toggleOpen:_}},o))});var P=function(n,r){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&r.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)r.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(o[e[t]]=n[e[t]]);return o};const I=i.forwardRef((n,r)=>{var{children:o,className:e}=n,t=P(n,["children","className"]);const c=i.useContext(O),u=y(!1),{cn:l}=m();return c===null?(console.error("<Accordion.Content> has to be used within an <Accordion.Item>"),null):s.createElement(x,Object.assign({},t,{as:"div",ref:r,className:l("navds-accordion__content",{"navds-accordion__content--closed":!c.open},e),"aria-hidden":!c.open||void 0}),u?s.createElement("div",{className:l("navds-accordion__content-inner")},o):o)});var z=function(n,r){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&r.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)r.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(o[e[t]]=n[e[t]]);return o};const R=i.forwardRef((n,r)=>{var o,{children:e,className:t,onClick:c}=n,u=z(n,["children","className","onClick"]);const l=i.useContext(O),a=i.useContext(v),p=y(!1),{cn:d}=m();if(l===null)return console.error("<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>"),null;let f=(o=a==null?void 0:a.headingSize)!==null&&o!==void 0?o:"small";return p&&(f=(a==null?void 0:a.size)==="small"?"xsmall":"small"),s.createElement("button",Object.assign({ref:r},u,{className:d("navds-accordion__header",t),onClick:E(c,l.toggleOpen),"aria-expanded":l.open,type:"button"}),s.createElement("span",{className:d("navds-accordion__icon-wrapper")},s.createElement(S,{className:d("navds-accordion__header-chevron"),"aria-hidden":!0})),s.createElement(C,{size:f,as:"span",className:d("navds-accordion__header-content")},e))});var H=function(n,r){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&r.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)r.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(o[e[t]]=n[e[t]]);return o};const h=i.forwardRef((n,r)=>{var{className:o,variant:e="default",headingSize:t="small",size:c="medium",indent:u=!0}=n,l=H(n,["className","variant","headingSize","size","indent"]);const{cn:a}=m();return s.createElement(v.Provider,{value:{variant:e,headingSize:t,size:c,mounted:!0}},s.createElement("div",Object.assign({},l,{className:a("navds-accordion",o,`navds-accordion--${c}`,{"navds-accordion--indent":u}),ref:r})))});h.Header=R;h.Content=I;h.Item=A;export{h as A};

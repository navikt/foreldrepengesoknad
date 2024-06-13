import{c as p,a as g,H as C}from"./Link-SOWRV7cb.js";import{r as a,R as s}from"./index-DVXBtNgz.js";import{a7 as w,a8 as x,a9 as j}from"./Tidsperioden-JQeTBW8H.js";function h(n,r=[]){const o=a.useRef(n);return a.useEffect(()=>{o.current=n}),a.useCallback((...e)=>{var t;return(t=o.current)===null||t===void 0?void 0:t.call(o,...e)},r)}function S({value:n,defaultValue:r,onChange:o}){const e=h(o),[t,c]=a.useState(r),i=n!==void 0,l=i?n:t,d=h(f=>{const m=typeof f=="function"?f(l):f;i||c(m),e(m)},[i,e,l]);return[l,d]}const v=a.createContext({headingSize:"small",size:"medium",openItems:[],mounted:!1});var E=function(n,r){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&r.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)r.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(o[e[t]]=n[e[t]]);return o};const O=a.createContext(null),A=a.forwardRef((n,r)=>{var{children:o,className:e,open:t,defaultOpen:c=!1,onOpenChange:i}=n,l=E(n,["children","className","open","defaultOpen","onOpenChange"]);const[d,f]=S({defaultValue:c,value:t,onChange:i}),u=a.useContext(v),m=a.useRef(!(t||c)),y=()=>{f(_=>!_),m.current=!0};return u!=null&&u.mounted||console.error("<Accordion.Item> has to be used within an <Accordion>"),s.createElement("div",Object.assign({className:p("navds-accordion__item",e,{"navds-accordion__item--open":d,"navds-accordion__item--neutral":(u==null?void 0:u.variant)==="neutral","navds-accordion__item--no-animation":!m.current}),ref:r},w(l,["onClick"])),s.createElement(O.Provider,{value:{open:d,toggleOpen:y}},o))});var N=function(n,r){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&r.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)r.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(o[e[t]]=n[e[t]]);return o};const P=a.forwardRef((n,r)=>{var{children:o,className:e}=n,t=N(n,["children","className"]);const c=a.useContext(O);return c===null?(console.error("<Accordion.Content> has to be used within an <Accordion.Item>"),null):s.createElement(g,Object.assign({},t,{as:"div",ref:r,className:p("navds-accordion__content",{"navds-accordion__content--closed":!c.open},e),"aria-hidden":!c.open||void 0}),o)});var I=function(n,r){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&r.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)r.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(o[e[t]]=n[e[t]]);return o};const R=a.forwardRef((n,r)=>{var o,{children:e,className:t,onClick:c}=n,i=I(n,["children","className","onClick"]);const l=a.useContext(O),d=a.useContext(v);return l===null?(console.error("<Accordion.Header> has to be used within an <Accordion.Item>, which in turn must be within an <Accordion>"),null):s.createElement("button",Object.assign({ref:r},i,{className:p("navds-accordion__header",t),onClick:x(c,l.toggleOpen),"aria-expanded":l.open,type:"button"}),s.createElement("span",{className:"navds-accordion__icon-wrapper"},s.createElement(j,{className:"navds-accordion__header-chevron",title:"Vis mer","aria-hidden":!0})),s.createElement(C,{size:(o=d==null?void 0:d.headingSize)!==null&&o!==void 0?o:"small",as:"span",className:"navds-accordion__header-content"},e))});var z=function(n,r){var o={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&r.indexOf(e)<0&&(o[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)r.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(o[e[t]]=n[e[t]]);return o};const b=a.forwardRef((n,r)=>{var{className:o,variant:e="default",headingSize:t="small",size:c="medium",indent:i=!0}=n,l=z(n,["className","variant","headingSize","size","indent"]);return s.createElement(v.Provider,{value:{variant:e,headingSize:t,size:c,mounted:!0}},s.createElement("div",Object.assign({},l,{className:p("navds-accordion",o,`navds-accordion--${c}`,{"navds-accordion--indent":i}),ref:r})))});b.Header=R;b.Content=P;b.Item=A;export{b as A,S as u};

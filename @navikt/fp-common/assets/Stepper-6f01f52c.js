import{r as f,R as a}from"./index-61bf1805.js";import{c as b}from"./clsx.m-266f4de0.js";import{L as g}from"./Label-e660a0cb.js";var C=globalThis&&globalThis.__rest||function(t,o){var l={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(l[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(t);n<e.length;n++)o.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(t,e[n])&&(l[e[n]]=t[e[n]]);return l};const y=()=>a.createElement("svg",{width:"14",height:"10",viewBox:"0 0 14 10",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img","aria-hidden":!0,"aria-label":"Fullført"},a.createElement("path",{d:"M4.93563 6.41478L11.3755 0.404669C11.9796 -0.160351 12.9294 -0.130672 13.4959 0.47478C14.0624 1.08027 14.0299 2.03007 13.4249 2.59621L5.92151 9.59934C5.64138 9.85904 5.27598 10 4.90064 10C4.5069 10 4.12756 9.84621 3.83953 9.56111L1.33953 7.06111C0.75401 6.47558 0.75401 5.52542 1.33953 4.93989C1.92506 4.35437 2.87522 4.35437 3.46075 4.93989L4.93563 6.41478Z",fill:"currentColor"})),E=f.forwardRef((t,o)=>{var{className:l,children:e,as:n="a",unsafe_index:s=0,completed:u=!1,interactive:v}=t,i=C(t,["className","children","as","unsafe_index","completed","interactive"]);const r=f.useContext(O);if(r===null)return console.error("<Stepper.Step> has to be used within <Stepper>"),null;const{activeStep:c}=r,p=v??(r==null?void 0:r.interactive),m=p?n:"div";return a.createElement(m,Object.assign({},i,{"aria-current":c===s,ref:o,className:b("navds-stepper__step",l,{"navds-stepper__step--active":c===s,"navds-stepper__step--behind":c>s,"navds-stepper__step--non-interactive":!p,"navds-stepper__step--completed":u}),onClick:_=>{var d;p&&r.onStepChange(s+1),(d=i==null?void 0:i.onClick)===null||d===void 0||d.call(i,_)}}),u?a.createElement("span",{className:"navds-stepper__circle navds-stepper__circle--success"},a.createElement(y,null)):a.createElement(g,{className:"navds-stepper__circle",as:"span","aria-hidden":"true"},s+1),a.createElement(g,{as:"span",className:"navds-stepper__content"},e))}),w=E;var x=globalThis&&globalThis.__rest||function(t,o){var l={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(l[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,e=Object.getOwnPropertySymbols(t);n<e.length;n++)o.indexOf(e[n])<0&&Object.prototype.propertyIsEnumerable.call(t,e[n])&&(l[e[n]]=t[e[n]]);return l};const O=f.createContext(null),S=f.forwardRef((t,o)=>{var{children:l,className:e,activeStep:n,orientation:s="vertical",onStepChange:u=()=>{},interactive:v=!0}=t,i=x(t,["children","className","activeStep","orientation","onStepChange","interactive"]);return n=n-1,a.createElement("ol",Object.assign({},i,{ref:o,className:b("navds-stepper",s==="horizontal"?"navds-stepper--horizontal":"",e)}),a.createElement(O.Provider,{value:{activeStep:n,onStepChange:u,lastIndex:a.Children.count(l),orientation:s,interactive:v}},a.Children.map(l,(r,c)=>{var p,m,_,d,h;return a.createElement("li",{className:b("navds-stepper__item",{"navds-stepper__item--behind":n>c,"navds-stepper__item--completed":a.isValidElement(r)&&((p=r==null?void 0:r.props)===null||p===void 0?void 0:p.completed),"navds-stepper__item--non-interactive":a.isValidElement(r)&&!((_=(m=r==null?void 0:r.props)===null||m===void 0?void 0:m.interactive)!==null&&_!==void 0?_:v)}),key:c+((h=(d=l==null?void 0:l.toString)===null||d===void 0?void 0:d.call(l))!==null&&h!==void 0?h:"")},a.createElement("span",{className:"navds-stepper__line navds-stepper__line--1"}),a.isValidElement(r)?a.cloneElement(r,Object.assign(Object.assign({},r.props),{unsafe_index:c})):r,a.createElement("span",{className:"navds-stepper__line navds-stepper__line--2"}))})))});S.Step=w;const L=S;export{L as S};
//# sourceMappingURL=Stepper-6f01f52c.js.map
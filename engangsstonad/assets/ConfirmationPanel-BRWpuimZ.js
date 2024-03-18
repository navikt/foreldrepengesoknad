import{m as w,o as j,p as m,q as g,r as y,s as x,B as k,R as N,t as P,v as z}from"./useEsNavigator-CCPepSoW.js";import{r as f,R as l}from"./index-Dl6G-zuu.js";var S=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]]);return r};const _=f.createContext(null);f.forwardRef((e,t)=>{var r,n,{value:a,defaultValue:o,onChange:i=()=>{},children:d,className:u}=e,c=S(e,["value","defaultValue","onChange","children","className"]);const s=f.useContext(w),[v,p]=f.useState(o??[]),C=b=>{const h=a??v,O=h.includes(b)?h.filter(E=>E!==b):[...h,b];a===void 0&&p(O),i(O)};return l.createElement(j,Object.assign({},c,{ref:t,className:m(u,"navds-checkbox-group",`navds-checkbox-group--${(n=(r=c.size)!==null&&r!==void 0?r:s==null?void 0:s.size)!==null&&n!==void 0?n:"medium"}`),nativeReadOnly:!1}),l.createElement(_.Provider,{value:{value:a,defaultValue:o,toggleValue:C}},l.createElement("div",{className:"navds-checkboxes"},d)))});var I=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]]);return r};const R=e=>{const t=f.useContext(_),r=g(y(e,["description","children"]),"checkbox"),{inputProps:n,readOnly:a}=r,o=I(r,["inputProps","readOnly"]);return t&&(e.checked&&console.warn("`checked` is unsupported on <Checkbox> elements within a <CheckboxGroup>. Please set a `value` or `defaultValue` on <CheckboxGroup> instead."),e.value===void 0&&console.warn("A <Checkbox> element within a <CheckboxGroup> requires a `value` property.")),Object.assign(Object.assign({},o),{readOnly:a,nested:!!t,inputProps:Object.assign(Object.assign({},n),{checked:t!=null&&t.value?t.value.includes(e.value):e.checked,defaultChecked:t!=null&&t.defaultValue?t.defaultValue.includes(e.value):e.defaultChecked,onChange:i=>{a||(e.onChange&&e.onChange(i),t&&t.toggleValue(e.value))},onClick:i=>{var d;if(a){i.preventDefault();return}(d=e==null?void 0:e.onClick)===null||d===void 0||d.call(e,i)}})})},V=f.forwardRef((e,t)=>{const{inputProps:r,hasError:n,size:a,readOnly:o,nested:i}=R(e),d=x(),u=x();return l.createElement("div",{className:m(e.className,"navds-checkbox",`navds-checkbox--${a}`,{"navds-checkbox--error":n,"navds-checkbox--disabled":r.disabled,"navds-checkbox--readonly":o})},l.createElement("input",Object.assign({},y(e,["children","size","error","description","hideLabel","indeterminate","errorId","readOnly"]),y(r,["aria-invalid"]),{type:"checkbox",className:"navds-checkbox__input","aria-checked":e.indeterminate?"mixed":r.checked,ref:c=>{var s;c&&(c.indeterminate=(s=e.indeterminate)!==null&&s!==void 0?s:!1),typeof t=="function"?t(c):t!=null&&(t.current=c)},"aria-labelledby":m(d,!!e["aria-labelledby"]&&e["aria-labelledby"],{[u]:e.description})})),l.createElement("label",{htmlFor:r.id,className:"navds-checkbox__label"},l.createElement("span",{className:"navds-checkbox__icon"},l.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"0.8125rem",height:"0.625rem",viewBox:"0 0 13 10",fill:"none",focusable:!1,role:"img","aria-hidden":!0},l.createElement("path",{d:"M4.03524 6.41478L10.4752 0.404669C11.0792 -0.160351 12.029 -0.130672 12.5955 0.47478C13.162 1.08027 13.1296 2.03007 12.5245 2.59621L5.02111 9.59934C4.74099 9.85904 4.37559 10 4.00025 10C3.60651 10 3.22717 9.84621 2.93914 9.56111L0.439143 7.06111C-0.146381 6.47558 -0.146381 5.52542 0.439143 4.93989C1.02467 4.35437 1.97483 4.35437 2.56036 4.93989L4.03524 6.41478Z",fill:"currentColor"}))),l.createElement("span",{className:m("navds-checkbox__content",{"navds-sr-only":e.hideLabel})},l.createElement(k,{as:"span",id:d,size:a,className:"navds-checkbox__label-text","aria-hidden":!0},!i&&l.createElement(N,{readOnly:o,nativeReadOnly:!1}),e.children),e.description&&l.createElement(k,{as:"span",id:u,size:a,className:"navds-form-field__subdescription navds-checkbox__description","aria-hidden":!0},e.description))))});var L=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]]);return r};const $=f.forwardRef((e,t)=>{var{className:r,children:n,label:a}=e,o=L(e,["className","children","label"]);const{errorId:i,showErrorMsg:d,hasError:u,size:c,inputProps:s}=g(o,"confirmation-panel"),v=x();return l.createElement("div",{className:m("navds-confirmation-panel","navds-form-field",r,{"navds-confirmation-panel--small":c==="small","navds-confirmation-panel--error":u,"navds-confirmation-panel--checked":!!o.checked})},l.createElement("div",{className:"navds-confirmation-panel__inner"},n&&l.createElement(P,{size:o.size,className:"navds-confirmation-panel__content",id:`confirmation-panel-${v}`,as:"div"},n),l.createElement(V,Object.assign({ref:t},o,s,{"aria-describedby":m(s["aria-describedby"],n&&`confirmation-panel-${v}`),error:u,size:c}),a)),l.createElement("div",{className:"navds-form-field__error",id:i,role:"alert"},d&&l.createElement(z,{size:c},o.error)))}),B=$;export{B as C};

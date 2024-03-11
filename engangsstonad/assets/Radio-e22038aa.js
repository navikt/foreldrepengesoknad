import{m,o as s,p as u,q as c,B as v}from"./useEsNavigator-1fee33b1.js";import{r as f,R as l}from"./index-f1f2c4b1.js";import{a as b}from"./ErrorSummaryHookForm-bc7131af.js";var y=globalThis&&globalThis.__rest||function(e,a){var d={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&a.indexOf(n)<0&&(d[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(e);i<n.length;i++)a.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(d[n[i]]=e[n[i]]);return d};const h=e=>{const a=f.useContext(b),d=m(s(e,["description"]),"radio"),{inputProps:n,readOnly:i}=d,t=y(d,["inputProps","readOnly"]);return a||console.warn("<Radio> must be used inside <RadioGroup>."),(e==null?void 0:e.required)!==void 0&&console.warn("required is only supported on <RadioGroup>."),Object.assign(Object.assign({},t),{readOnly:i,inputProps:Object.assign(Object.assign({},n),{name:a==null?void 0:a.name,defaultChecked:(a==null?void 0:a.defaultValue)===void 0?void 0:(a==null?void 0:a.defaultValue)===e.value,checked:(a==null?void 0:a.value)===void 0?void 0:(a==null?void 0:a.value)===e.value,onChange:o=>{i||(e.onChange&&e.onChange(o),a!=null&&a.onChange&&a.onChange(e.value))},onClick:o=>{var r;if(i){o.preventDefault();return}(r=e==null?void 0:e.onClick)===null||r===void 0||r.call(e,o)},required:a==null?void 0:a.required,type:"radio"})})},O=f.forwardRef((e,a)=>{const{inputProps:d,size:n,hasError:i,readOnly:t}=h(e),o=u(),r=u();return l.createElement("div",{className:c(e.className,"navds-radio",`navds-radio--${n}`,{"navds-radio--error":i,"navds-radio--disabled":d.disabled,"navds-radio--readonly":t})},l.createElement("input",Object.assign({},s(e,["children","size","description","readOnly"]),s(d,["aria-invalid"]),{"aria-labelledby":c(o,!!e["aria-labelledby"]&&e["aria-labelledby"],{[r]:e.description}),className:"navds-radio__input",ref:a})),l.createElement("label",{htmlFor:d.id,className:"navds-radio__label"},l.createElement("span",{className:"navds-radio__content"},l.createElement(v,{as:"span",id:o,size:n,"aria-hidden":!0},e.children),e.description&&l.createElement(v,{as:"span",id:r,size:n,className:"navds-form-field__subdescription navds-radio__description","aria-hidden":!0},e.description))))}),C=O;export{C as R};

import{c as h}from"./clsx-B-dksMZM.js";import{r as s,R as d}from"./index-DVXBtNgz.js";import{L as E,B as p,E as I}from"./Label-DFEFJLqZ.js";import{u as j,o as S}from"./useId-BuMKUBu9.js";import{u as z}from"./useId-DbilmxAP.js";import{S as x}from"./ChevronDown-CcwFV5Ek.js";var A=function(e,o){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&o.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,r=Object.getOwnPropertySymbols(e);l<r.length;l++)o.indexOf(r[l])<0&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(n[r[l]]=e[r[l]]);return n};const N=s.forwardRef((e,o)=>{var{title:n,titleId:r}=e,l=A(e,["title","titleId"]);let i=z();return i=n?r||"title-"+i:void 0,s.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:o,"aria-labelledby":i},l),n?s.createElement("title",{id:i},n):null,s.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2.25A4.75 4.75 0 0 0 7.25 7v2.25H7A1.75 1.75 0 0 0 5.25 11v9c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75v-9A1.75 1.75 0 0 0 17 9.25h-.25V7A4.75 4.75 0 0 0 12 2.25Zm3.25 7V7a3.25 3.25 0 0 0-6.5 0v2.25h6.5ZM12 13a1.5 1.5 0 0 0-.75 2.8V17a.75.75 0 0 0 1.5 0v-1.2A1.5 1.5 0 0 0 12 13Z",fill:"currentColor"}))}),R=({readOnly:e,nativeReadOnly:o=!0})=>e?d.createElement(N,Object.assign({},o?{"aria-hidden":!0}:{title:"readonly"},{className:"navds-form-field__readonly-icon"})):null,$=s.createContext(null),k=(e,o)=>{var n,r,l;const{size:i,error:a,errorId:f}=e,t=s.useContext($),u=j(),w=(n=e.id)!==null&&n!==void 0?n:`${o}-${u}`,O=f??`${o}-error-${u}`,m=`${o}-description-${u}`,c=(t==null?void 0:t.disabled)||e.disabled,v=((t==null?void 0:t.readOnly)||e.readOnly)&&!c||void 0,y=!c&&!v&&!!(a||t!=null&&t.error),g=!c&&!v&&!!a&&typeof a!="boolean",_=Object.assign({},y?{"aria-invalid":!0}:{});return e!=null&&e.required,{showErrorMsg:g,hasError:y,errorId:O,inputDescriptionId:m,size:(r=i??(t==null?void 0:t.size))!==null&&r!==void 0?r:"medium",readOnly:v,inputProps:Object.assign(Object.assign({id:w},_),{"aria-describedby":h(e["aria-describedby"],{[m]:!!(e!=null&&e.description)&&typeof(e==null?void 0:e.description)=="string",[O]:g,[(l=t==null?void 0:t.errorId)!==null&&l!==void 0?l:""]:y&&!!(t!=null&&t.error)})||void 0,disabled:c})}};var D=function(e,o){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&o.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,r=Object.getOwnPropertySymbols(e);l<r.length;l++)o.indexOf(r[l])<0&&Object.prototype.propertyIsEnumerable.call(e,r[l])&&(n[r[l]]=e[r[l]]);return n};const V=s.forwardRef((e,o)=>{const{inputProps:n,errorId:r,showErrorMsg:l,hasError:i,size:a,inputDescriptionId:f,readOnly:t}=k(e,"select"),{children:u,label:w,className:O,description:m,htmlSize:c,hideLabel:v=!1,style:y}=e,g=D(e,["children","label","className","description","htmlSize","hideLabel","style"]),_={onMouseDown:b=>{t&&(b.preventDefault(),b.target.focus())},onKeyDown:b=>{t&&["ArrowDown","ArrowUp","ArrowRight","ArrowLeft"," "].includes(b.key)&&b.preventDefault()}};return d.createElement("div",{className:h(O,"navds-form-field",`navds-form-field--${a}`,{"navds-form-field--disabled":!!n.disabled,"navds-form-field--readonly":t,"navds-select--error":i,"navds-select--readonly":t})},d.createElement(E,{htmlFor:n.id,size:a,className:h("navds-form-field__label",{"navds-sr-only":v})},d.createElement(R,{readOnly:t,nativeReadOnly:!1}),w),!!m&&d.createElement(p,{className:h("navds-form-field__description",{"navds-sr-only":v}),id:f,size:a,as:"div"},m),d.createElement("div",{className:"navds-select__container",style:y},d.createElement("select",Object.assign({},S(g,["error","errorId","size","readOnly"]),n,_,{ref:o,className:h("navds-select__input","navds-body-short",`navds-body-short--${a??"medium"}`),size:c}),u),d.createElement(x,{className:"navds-select__chevron","aria-hidden":!0})),d.createElement("div",{className:"navds-form-field__error",id:r,"aria-relevant":"additions removals","aria-live":"polite"},l&&d.createElement(I,{size:a},e.error)))});export{$ as F,R,V as S,k as u};

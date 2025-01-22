import{w as S,P as z,j as C,X as k,m as b,Y as y,Z as V,c as p,E as L,k as E}from"./VeiviserPage-BqWeAT9o.js";import{r as o,R as r}from"./index-CR__hKHy.js";var F=function(e,a){var l={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&a.indexOf(n)<0&&(l[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(e);t<n.length;t++)a.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(e,n[t])&&(l[n[t]]=e[n[t]]);return l};const j=o.forwardRef((e,a)=>{var{title:l,titleId:n}=e,t=F(e,["title","titleId"]);let d=S();return d=l?n||"title-"+d:void 0,o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:a,"aria-labelledby":d},t),l?o.createElement("title",{id:d},l):null,o.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M12 2.25A4.75 4.75 0 0 0 7.25 7v2.25H7A1.75 1.75 0 0 0 5.25 11v9c0 .414.336.75.75.75h12a.75.75 0 0 0 .75-.75v-9A1.75 1.75 0 0 0 17 9.25h-.25V7A4.75 4.75 0 0 0 12 2.25m3.25 7V7a3.25 3.25 0 0 0-6.5 0v2.25zM12 13a1.5 1.5 0 0 0-.75 2.8V17a.75.75 0 0 0 1.5 0v-1.2A1.5 1.5 0 0 0 12 13",clipRule:"evenodd"}))}),$=()=>r.createElement(j,{"aria-hidden":!0,className:"navds-form-field__readonly-icon"}),P=()=>r.createElement(j,{title:z("global")("readOnly"),className:"navds-form-field__readonly-icon"}),A=e=>{const a=C(e,"fieldset"),{inputProps:l}=a;return Object.assign(Object.assign({},a),{inputProps:{"aria-invalid":l["aria-invalid"],"aria-describedby":l["aria-describedby"]}})};var G=function(e,a){var l={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&a.indexOf(n)<0&&(l[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(e);t<n.length;t++)a.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(e,n[t])&&(l[n[t]]=e[n[t]]);return l};const M=o.forwardRef((e,a)=>{var l,n,t;const{inputProps:d,errorId:s,showErrorMsg:i,hasError:v,size:c,readOnly:u,inputDescriptionId:g}=A(e),f=o.useContext(k),{children:x,className:m,errorPropagation:h=!0,legend:O,description:_,hideLegend:w,nativeReadOnly:N=!0}=e,R=G(e,["children","className","errorPropagation","legend","description","hideLegend","nativeReadOnly"]);return r.createElement(k.Provider,{value:{error:h?(l=e.error)!==null&&l!==void 0?l:f==null?void 0:f.error:void 0,errorId:b({[s]:i,[(n=f==null?void 0:f.errorId)!==null&&n!==void 0?n:""]:!!(f!=null&&f.error)}),size:c,disabled:(t=e.disabled)!==null&&t!==void 0?t:!1,readOnly:u}},r.createElement("fieldset",Object.assign({},y(R,["errorId","error","size","readOnly"]),y(d,["aria-describedby","aria-invalid"]),{ref:a,className:b(m,"navds-fieldset",`navds-fieldset--${c}`,{"navds-fieldset--error":v,"navds-fieldset--readonly":u})}),r.createElement(V,{size:c,as:"legend",className:b("navds-fieldset__legend",{"navds-sr-only":!!w})},u&&(N?r.createElement($,null):r.createElement(P,null)),O),!!_&&r.createElement(p,{className:b("navds-fieldset__description",{"navds-sr-only":!!w}),id:g,size:c??"medium",as:"div"},e.description),x,r.createElement("div",{id:s,"aria-relevant":"additions removals","aria-live":"polite",className:"navds-fieldset__error"},i&&r.createElement(L,{size:c,showIcon:!0},e.error))))});var B=function(e,a){var l={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&a.indexOf(n)<0&&(l[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(e);t<n.length;t++)a.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(e,n[t])&&(l[n[t]]=e[n[t]]);return l};const I=o.createContext(null),T=o.forwardRef((e,a)=>{var l,n,{value:t,defaultValue:d,onChange:s=()=>{},children:i,className:v}=e,c=B(e,["value","defaultValue","onChange","children","className"]);const u=o.useContext(k),[g,f]=o.useState(d??[]),x=m=>{const h=t??g,O=h.includes(m)?h.filter(_=>_!==m):[...h,m];t===void 0&&f(O),s(O)};return r.createElement(M,Object.assign({},c,{ref:a,className:b(v,"navds-checkbox-group",`navds-checkbox-group--${(n=(l=c.size)!==null&&l!==void 0?l:u==null?void 0:u.size)!==null&&n!==void 0?n:"medium"}`),nativeReadOnly:!1}),r.createElement(I.Provider,{value:{value:t,defaultValue:d,toggleValue:x}},r.createElement("div",{className:"navds-checkboxes"},i)))});var D=function(e,a){var l={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&a.indexOf(n)<0&&(l[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(e);t<n.length;t++)a.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(e,n[t])&&(l[n[t]]=e[n[t]]);return l};const Z=e=>{const a=o.useContext(I),l=C(y(e,["description","children"]),"checkbox"),{inputProps:n,readOnly:t}=l,d=D(l,["inputProps","readOnly"]);return a&&(e.checked&&console.warn("`checked` is unsupported on <Checkbox> elements within a <CheckboxGroup>. Please set a `value` or `defaultValue` on <CheckboxGroup> instead."),e.value===void 0&&console.warn("A <Checkbox> element within a <CheckboxGroup> requires a `value` property.")),Object.assign(Object.assign({},d),{readOnly:t,nested:!!a,inputProps:Object.assign(Object.assign({},n),{checked:a!=null&&a.value?a.value.includes(e.value):e.checked,defaultChecked:a!=null&&a.defaultValue?a.defaultValue.includes(e.value):e.defaultChecked,onChange:s=>{var i;t||((i=e.onChange)===null||i===void 0||i.call(e,s),a==null||a.toggleValue(e.value))},onClick:s=>{var i;if(t){s.preventDefault();return}(i=e==null?void 0:e.onClick)===null||i===void 0||i.call(e,s)}})})},W=o.forwardRef((e,a)=>{const{inputProps:l,hasError:n,size:t,readOnly:d,nested:s}=Z(e),i=E(),v=E();return r.createElement("div",{className:b(e.className,"navds-checkbox",`navds-checkbox--${t}`,{"navds-checkbox--error":n,"navds-checkbox--disabled":l.disabled,"navds-checkbox--readonly":d})},r.createElement("input",Object.assign({},y(e,["children","size","error","description","hideLabel","indeterminate","errorId","readOnly"]),y(l,["aria-invalid"]),{type:"checkbox",className:"navds-checkbox__input",ref:c=>{var u;c&&(c.indeterminate=(u=e.indeterminate)!==null&&u!==void 0?u:!1),typeof a=="function"?a(c):a!=null&&(a.current=c)},"aria-labelledby":b(i,!!e["aria-labelledby"]&&e["aria-labelledby"],{[v]:e.description})})),r.createElement("label",{htmlFor:l.id,className:"navds-checkbox__label"},r.createElement("span",{className:"navds-checkbox__icon"},r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"0.8125rem",height:"0.625rem",viewBox:"0 0 13 10",fill:"none",focusable:!1,role:"img","aria-hidden":!0},r.createElement("path",{d:"M4.03524 6.41478L10.4752 0.404669C11.0792 -0.160351 12.029 -0.130672 12.5955 0.47478C13.162 1.08027 13.1296 2.03007 12.5245 2.59621L5.02111 9.59934C4.74099 9.85904 4.37559 10 4.00025 10C3.60651 10 3.22717 9.84621 2.93914 9.56111L0.439143 7.06111C-0.146381 6.47558 -0.146381 5.52542 0.439143 4.93989C1.02467 4.35437 1.97483 4.35437 2.56036 4.93989L4.03524 6.41478Z",fill:"currentColor"}))),r.createElement("span",{className:b("navds-checkbox__content",{"navds-sr-only":e.hideLabel})},r.createElement(p,{as:"span",id:i,size:t,className:"navds-checkbox__label-text","aria-hidden":!0},!s&&d&&r.createElement(P,null),e.children),e.description&&r.createElement(p,{as:"span",id:v,size:t,className:"navds-form-field__subdescription navds-checkbox__description","aria-hidden":!0},e.description))))});export{W as C,M as F,$ as R,P as a,T as b};

import{R as f,r as u}from"./index-CR__hKHy.js";function O(n){var a,r,e="";if(typeof n=="string"||typeof n=="number")e+=n;else if(typeof n=="object")if(Array.isArray(n)){var t=n.length;for(a=0;a<t;a++)n[a]&&(r=O(n[a]))&&(e&&(e+=" "),e+=r)}else for(r in n)n[r]&&(e&&(e+=" "),e+=r);return e}function b(){for(var n,a,r=0,e="",t=arguments.length;r<t;r++)(n=arguments[r])&&(a=O(n))&&(e&&(e+=" "),e+=a);return e}function h(n){return a=>{n.forEach(r=>{typeof r=="function"?r(a):r!=null&&(r.current=a)})}}function L(...n){return f.useCallback(h(n),n)}function C(n,a){const r=Object.assign({},a);for(const e in a){const t=n[e],o=a[e];/^on[A-Z]/.test(e)?t&&o?r[e]=(...s)=>{o(...s),t(...s)}:t&&(r[e]=t):e==="style"?r[e]=Object.assign(Object.assign({},t),o):e==="className"&&(r[e]=[t,o].filter(Boolean).join(" "))}return Object.assign(Object.assign({},n),r)}var x=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const w=u.forwardRef((n,a)=>{var r;const{children:e}=n,t=x(n,["children"]);if(u.isValidElement(e)){const o=Object.prototype.propertyIsEnumerable.call(e.props,"ref")?e.props.ref:e.ref;return u.cloneElement(e,Object.assign(Object.assign({},C(t,e.props)),{ref:a?h([a,o]):o}))}if(u.Children.count(e)>1){const o=new Error("Aksel: Components using 'asChild' expects to recieve a single React element child.");throw o.name="SlotError",(r=Error.captureStackTrace)===null||r===void 0||r.call(Error,o,w),o}return null});var E=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};function P(n,a){return`${n} returned \`undefined\`. Seems you forgot to wrap component within ${a}`}function j(n={}){const{name:a,hookName:r="useContext",providerName:e="Provider",errorMessage:t,defaultValue:o}=n,l=u.createContext(o),s=u.forwardRef((i,d)=>{var{children:m}=i,p=E(i,["children"]);const v=f.useMemo(()=>p,Object.values(p));return f.createElement(l.Provider,{value:d?Object.assign(Object.assign({},v),{ref:d}):v},m)});function c(i=!0){var d;const m=u.useContext(l);if(!m&&i){const p=new Error(t??P(r,e));throw p.name="ContextError",(d=Error.captureStackTrace)===null||d===void 0||d.call(Error,p,c),p}return m}return l.displayName=a,[s,c]}const[S,y]=j({hookName:"useRenameCSS",name:"RenameCSS",providerName:"RenameCSSProvider",defaultValue:{cn:b}}),N=(...n)=>b(n).replace(/^navds-/g,"aksel-").replace(/\snavds-/g," aksel-").trim(),_=({children:n})=>f.createElement(S,{cn:N},n),[R,H]=j({hookName:"useTheme",name:"ThemeProvider",providerName:"ThemeProvider"});u.forwardRef((n,a)=>{var r;const e=H(!1),{children:t,className:o,asChild:l=!1,theme:s=(r=e==null?void 0:e.theme)!==null&&r!==void 0?r:"light",hasBackground:c=!0}=n,d=c??(e===void 0&&n.theme!==void 0),m=l?w:"div";return f.createElement(R,{theme:s},f.createElement(_,null,f.createElement(m,{ref:a,className:b("aksel-theme",o,s),"data-background":d},t)))});const g=n=>b({"navds-typo--spacing":n.spacing,"navds-typo--truncate":n.truncate,"navds-typo--semibold":n.weight==="semibold",[`navds-typo--align-${n.align}`]:n.align,[`navds-typo--color-${n.textColor}`]:n.textColor,"navds-typo--visually-hidden":n.visuallyHidden,"navds-typo--uppercase":n.uppercase});var $=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const A=u.forwardRef((n,a)=>{var{className:r,size:e="medium",as:t="p",spacing:o,truncate:l,weight:s="regular",align:c,visuallyHidden:i,textColor:d}=n,m=$(n,["className","size","as","spacing","truncate","weight","align","visuallyHidden","textColor"]);const{cn:p}=y();return f.createElement(t,Object.assign({},m,{ref:a,className:p(r,"navds-body-long",`navds-body-long--${e}`,g({spacing:o,truncate:l,weight:s,align:c,visuallyHidden:i,textColor:d}))}))});var k=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const Z=u.forwardRef((n,a)=>{var{className:r,size:e="medium",as:t="p",spacing:o,truncate:l,weight:s="regular",align:c,visuallyHidden:i,textColor:d}=n,m=k(n,["className","size","as","spacing","truncate","weight","align","visuallyHidden","textColor"]);const{cn:p}=y();return f.createElement(t,Object.assign({},m,{ref:a,className:p(r,"navds-body-short",`navds-body-short--${e}`,g({spacing:o,truncate:l,weight:s,align:c,visuallyHidden:i,textColor:d}))}))});var I=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const D=u.forwardRef((n,a)=>{var{className:r,size:e="medium",spacing:t,uppercase:o,as:l="p",truncate:s,weight:c="regular",align:i,visuallyHidden:d,textColor:m}=n,p=I(n,["className","size","spacing","uppercase","as","truncate","weight","align","visuallyHidden","textColor"]);const{cn:v}=y();return f.createElement(l,Object.assign({},p,{ref:a,className:v(r,"navds-detail",g({spacing:t,truncate:s,weight:c,align:i,visuallyHidden:d,textColor:m,uppercase:o}),{"navds-detail--small":e==="small"})}))});var z=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const F=u.forwardRef((n,a)=>{var{children:r,className:e,size:t,spacing:o,as:l="p",showIcon:s=!1}=n,c=z(n,["children","className","size","spacing","as","showIcon"]);const{cn:i}=y();return f.createElement(l,Object.assign({},c,{ref:a,className:i("navds-error-message","navds-label",e,g({spacing:o}),{"navds-label--small":t==="small","navds-error-message--show-icon":s})}),s&&f.createElement("svg",{viewBox:"0 0 17 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,"aria-hidden":!0},f.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M3.49209 11.534L8.11398 2.7594C8.48895 2.04752 9.50833 2.04743 9.88343 2.75924L14.5073 11.5339C14.8582 12.1998 14.3753 13 13.6226 13H4.37685C3.6242 13 3.14132 12.1999 3.49209 11.534ZM9.74855 10.495C9.74855 10.9092 9.41276 11.245 8.99855 11.245C8.58433 11.245 8.24855 10.9092 8.24855 10.495C8.24855 10.0808 8.58433 9.74497 8.99855 9.74497C9.41276 9.74497 9.74855 10.0808 9.74855 10.495ZM9.49988 5.49997C9.49988 5.22383 9.27602 4.99997 8.99988 4.99997C8.72373 4.99997 8.49988 5.22383 8.49988 5.49997V7.99997C8.49988 8.27611 8.72373 8.49997 8.99988 8.49997C9.27602 8.49997 9.49988 8.27611 9.49988 7.99997V5.49997Z",fill:"currentColor"})),r)});var B=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const q=u.forwardRef((n,a)=>{var{level:r="1",size:e,className:t,as:o,spacing:l,align:s,visuallyHidden:c,textColor:i}=n,d=B(n,["level","size","className","as","spacing","align","visuallyHidden","textColor"]);const{cn:m}=y(),p=o??`h${r}`;return f.createElement(p,Object.assign({},d,{ref:a,className:m(t,"navds-heading",`navds-heading--${e}`,g({spacing:l,align:s,visuallyHidden:c,textColor:i}))}))});var M=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};u.forwardRef((n,a)=>{var{className:r,spacing:e,as:t="p"}=n,o=M(n,["className","spacing","as"]);const{cn:l}=y();return f.createElement(t,Object.assign({},o,{ref:a,className:l(r,"navds-ingress",{"navds-typo--spacing":!!e})}))});var T=function(n,a){var r={};for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&a.indexOf(e)<0&&(r[e]=n[e]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(n);t<e.length;t++)a.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(n,e[t])&&(r[e[t]]=n[e[t]]);return r};const G=u.forwardRef((n,a)=>{var{className:r,size:e="medium",as:t="label",spacing:o,visuallyHidden:l,textColor:s}=n,c=T(n,["className","size","as","spacing","visuallyHidden","textColor"]);const{cn:i}=y();return f.createElement(t,Object.assign({},c,{ref:a,className:i(r,"navds-label",g({spacing:o,visuallyHidden:l,textColor:s}),{"navds-label--small":e==="small"})}))});export{Z as B,D,F as E,q as H,G as L,w as S,H as a,A as b,j as c,b as d,L as e,h as m,y as u};

import{r as f,a as g}from"./index-1cdf6ce0.js";function u(t){var n,r,e="";if(typeof t=="string"||typeof t=="number")e+=t;else if(typeof t=="object")if(Array.isArray(t)){var a=t.length;for(n=0;n<a;n++)t[n]&&(r=u(t[n]))&&(e&&(e+=" "),e+=r)}else for(r in t)t[r]&&(e&&(e+=" "),e+=r);return e}function c(){for(var t,n,r=0,e="",a=arguments.length;r<a;r++)(t=arguments[r])&&(n=u(t))&&(e&&(e+=" "),e+=n);return e}const b=t=>c({"navds-typo--spacing":t.spacing,"navds-typo--truncate":t.truncate,"navds-typo--semibold":t.weight==="semibold",[`navds-typo--align-${t.align}`]:t.align,[`navds-typo--color-${t.textColor}`]:t.textColor,"navds-typo--visually-hidden":t.visuallyHidden,"navds-typo--uppercase":t.uppercase});var v=globalThis&&globalThis.__rest||function(t,n){var r={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)n.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(r[e[a]]=t[e[a]]);return r};const O=f.forwardRef((t,n)=>{var{className:r,size:e="medium",as:a="p",spacing:l,truncate:o,weight:s="regular",align:i,visuallyHidden:y,textColor:p}=t,d=v(t,["className","size","as","spacing","truncate","weight","align","visuallyHidden","textColor"]);return g.createElement(a,Object.assign({},d,{ref:n,className:c(r,"navds-body-long",`navds-body-long--${e}`,b({spacing:l,truncate:o,weight:s,align:i,visuallyHidden:y,textColor:p}))}))}),z=O;var h=globalThis&&globalThis.__rest||function(t,n){var r={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)n.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(r[e[a]]=t[e[a]]);return r};const j=f.forwardRef((t,n)=>{var{className:r,size:e="medium",as:a="p",spacing:l,truncate:o,weight:s="regular",align:i,visuallyHidden:y,textColor:p}=t,d=h(t,["className","size","as","spacing","truncate","weight","align","visuallyHidden","textColor"]);return g.createElement(a,Object.assign({},d,{ref:n,className:c(r,"navds-body-short",`navds-body-short--${e}`,b({spacing:l,truncate:o,weight:s,align:i,visuallyHidden:y,textColor:p}))}))}),I=j;var w=globalThis&&globalThis.__rest||function(t,n){var r={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)n.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(r[e[a]]=t[e[a]]);return r};const R=f.forwardRef((t,n)=>{var{className:r,size:e="medium",spacing:a,uppercase:l,as:o="p",truncate:s,weight:i="regular",align:y,visuallyHidden:p,textColor:d}=t,m=w(t,["className","size","spacing","uppercase","as","truncate","weight","align","visuallyHidden","textColor"]);return g.createElement(o,Object.assign({},m,{ref:n,className:c(r,"navds-detail",b({spacing:a,truncate:s,weight:i,align:y,visuallyHidden:p,textColor:d,uppercase:l}),{"navds-detail--small":e==="small"})}))});var x=globalThis&&globalThis.__rest||function(t,n){var r={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)n.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(r[e[a]]=t[e[a]]);return r};const L=f.forwardRef((t,n)=>{var{className:r,size:e,spacing:a,as:l="p"}=t,o=x(t,["className","size","spacing","as"]);return g.createElement(l,Object.assign({},o,{ref:n,className:c("navds-error-message","navds-label",r,b({spacing:a}),{"navds-label--small":e==="small"})}))});var N=globalThis&&globalThis.__rest||function(t,n){var r={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)n.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(r[e[a]]=t[e[a]]);return r};const P=f.forwardRef((t,n)=>{var{level:r="1",size:e,className:a,as:l,spacing:o,align:s,visuallyHidden:i,textColor:y}=t,p=N(t,["level","size","className","as","spacing","align","visuallyHidden","textColor"]);const d=l??`h${r}`;return g.createElement(d,Object.assign({},p,{ref:n,className:c(a,"navds-heading",`navds-heading--${e}`,b({spacing:o,align:s,visuallyHidden:i,textColor:y}))}))}),k=P;var _=globalThis&&globalThis.__rest||function(t,n){var r={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)n.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(r[e[a]]=t[e[a]]);return r};const C=f.forwardRef((t,n)=>{var{className:r,spacing:e,as:a="p"}=t,l=_(t,["className","spacing","as"]);return g.createElement(a,Object.assign({},l,{ref:n,className:c(r,"navds-ingress",{"navds-typo--spacing":!!e})}))}),B=C;var $=globalThis&&globalThis.__rest||function(t,n){var r={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)n.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(r[e[a]]=t[e[a]]);return r};const E=f.forwardRef((t,n)=>{var{className:r,size:e="medium",as:a="label",spacing:l,visuallyHidden:o,textColor:s}=t,i=$(t,["className","size","as","spacing","visuallyHidden","textColor"]);return g.createElement(a,Object.assign({},i,{ref:n,className:c(r,"navds-label",b({spacing:l,visuallyHidden:o,textColor:s}),{"navds-label--small":e==="small"})}))}),A=E;var T=globalThis&&globalThis.__rest||function(t,n){var r={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,e=Object.getOwnPropertySymbols(t);a<e.length;a++)n.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(t,e[a])&&(r[e[a]]=t[e[a]]);return r};const S=f.forwardRef((t,n)=>{var{as:r="a",className:e,underline:a=!0,variant:l="action",inlineText:o=!1}=t,s=T(t,["as","className","underline","variant","inlineText"]);return g.createElement(r,Object.assign({},s,{ref:n,className:c("navds-link",e,`navds-link--${l}`,{"navds-link--remove-underline":!a,"navds-link--inline-text":o})}))}),D=S;export{I as B,R as D,L as E,k as H,B as I,D as L,z as a,A as b,c};

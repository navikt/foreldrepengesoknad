import{r as y,R as p}from"./index-CTjT7uj6.js";function m(t){var a,n,e="";if(typeof t=="string"||typeof t=="number")e+=t;else if(typeof t=="object")if(Array.isArray(t)){var r=t.length;for(a=0;a<r;a++)t[a]&&(n=m(t[a]))&&(e&&(e+=" "),e+=n)}else for(n in t)t[n]&&(e&&(e+=" "),e+=n);return e}function i(){for(var t,a,n=0,e="",r=arguments.length;n<r;n++)(t=arguments[n])&&(a=m(t))&&(e&&(e+=" "),e+=a);return e}const g=t=>i({"navds-typo--spacing":t.spacing,"navds-typo--truncate":t.truncate,"navds-typo--semibold":t.weight==="semibold",[`navds-typo--align-${t.align}`]:t.align,[`navds-typo--color-${t.textColor}`]:t.textColor,"navds-typo--visually-hidden":t.visuallyHidden,"navds-typo--uppercase":t.uppercase});var b=function(t,a){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const C=y.forwardRef((t,a)=>{var{className:n,size:e="medium",as:r="p",spacing:o,truncate:l,weight:s="regular",align:c,visuallyHidden:f,textColor:d}=t,u=b(t,["className","size","as","spacing","truncate","weight","align","visuallyHidden","textColor"]);return p.createElement(r,Object.assign({},u,{ref:a,className:i(n,"navds-body-long",`navds-body-long--${e}`,g({spacing:o,truncate:l,weight:s,align:c,visuallyHidden:f,textColor:d}))}))});var O=function(t,a){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const j=y.forwardRef((t,a)=>{var{className:n,size:e="medium",as:r="p",spacing:o,truncate:l,weight:s="regular",align:c,visuallyHidden:f,textColor:d}=t,u=O(t,["className","size","as","spacing","truncate","weight","align","visuallyHidden","textColor"]);return p.createElement(r,Object.assign({},u,{ref:a,className:i(n,"navds-body-short",`navds-body-short--${e}`,g({spacing:o,truncate:l,weight:s,align:c,visuallyHidden:f,textColor:d}))}))}),E=j;var w=function(t,a){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const S=y.forwardRef((t,a)=>{var{className:n,size:e="medium",spacing:r,uppercase:o,as:l="p",truncate:s,weight:c="regular",align:f,visuallyHidden:d,textColor:u}=t,v=w(t,["className","size","spacing","uppercase","as","truncate","weight","align","visuallyHidden","textColor"]);return p.createElement(l,Object.assign({},v,{ref:a,className:i(n,"navds-detail",g({spacing:r,truncate:s,weight:c,align:f,visuallyHidden:d,textColor:u,uppercase:o}),{"navds-detail--small":e==="small"})}))});var h=function(t,a){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const H=y.forwardRef((t,a)=>{var{className:n,size:e,spacing:r,as:o="p"}=t,l=h(t,["className","size","spacing","as"]);return p.createElement(o,Object.assign({},l,{ref:a,className:i("navds-error-message","navds-label",n,g({spacing:r}),{"navds-label--small":e==="small"})}))});var x=function(t,a){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const $=y.forwardRef((t,a)=>{var{level:n="1",size:e,className:r,as:o,spacing:l,align:s,visuallyHidden:c,textColor:f}=t,d=x(t,["level","size","className","as","spacing","align","visuallyHidden","textColor"]);const u=o??`h${n}`;return p.createElement(u,Object.assign({},d,{ref:a,className:i(r,"navds-heading",`navds-heading--${e}`,g({spacing:l,align:s,visuallyHidden:c,textColor:f}))}))});var N=function(t,a){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};y.forwardRef((t,a)=>{var{className:n,spacing:e,as:r="p"}=t,o=N(t,["className","spacing","as"]);return p.createElement(r,Object.assign({},o,{ref:a,className:i(n,"navds-ingress",{"navds-typo--spacing":!!e})}))});var P=function(t,a){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)a.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(n[e[r]]=t[e[r]]);return n};const z=y.forwardRef((t,a)=>{var{className:n,size:e="medium",as:r="label",spacing:o,visuallyHidden:l,textColor:s}=t,c=P(t,["className","size","as","spacing","visuallyHidden","textColor"]);return p.createElement(r,Object.assign({},c,{ref:a,className:i(n,"navds-label",g({spacing:o,visuallyHidden:l,textColor:s}),{"navds-label--small":e==="small"})}))});export{E as B,S as D,H as E,$ as H,z as L,C as a,i as c};

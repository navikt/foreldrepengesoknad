import{j as a}from"./jsx-runtime-CLpGMVip.js";import{c as f}from"./index-BDNcHBiq.js";import{u,H as l}from"./Label-vuqQZ1tj.js";import{r as h,R as v}from"./index-CR__hKHy.js";var b=function(s,r){var n={};for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&r.indexOf(e)<0&&(n[e]=s[e]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,e=Object.getOwnPropertySymbols(s);t<e.length;t++)r.indexOf(e[t])<0&&Object.prototype.propertyIsEnumerable.call(s,e[t])&&(n[e[t]]=s[e[t]]);return n};const y=h.forwardRef((s,r)=>{var{className:n,children:e,height:t,width:o,style:d,variant:c="text",as:i="div"}=s,m=b(s,["className","children","height","width","style","variant","as"]);const{cn:p}=u();return v.createElement(i,Object.assign({},m,{ref:r,className:p("navds-skeleton",n,`navds-skeleton--${c}`,{"navds-skeleton--has-children":!!e,"navds-skeleton--no-height":!t,"navds-skeleton--no-width":!o,"navds-skeleton--inline":i==="span"}),style:Object.assign(Object.assign({},d),{width:o,height:t}),"aria-hidden":!0}),e)}),j=({heading:s,children:r,showSkeleton:n=!1,skeletonProps:e,className:t})=>n&&e?a.jsxs("div",{className:"mb-8",children:[s&&a.jsx(l,{size:"medium",level:"2",className:"mb-2",children:s}),a.jsx(y,{...e})]}):a.jsxs("section",{children:[s&&a.jsx(l,{size:"medium",level:"4",className:"mb-2",children:s}),a.jsx("div",{className:f(t,"rounded-large bg-white p-4 border-2 border-deepblue-100"),children:r})]});j.__docgenInfo={description:"",methods:[],displayName:"ContentSection",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},heading:{required:!1,tsType:{name:"string"},description:""},showSkeleton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},skeletonProps:{required:!1,tsType:{name:"SkeletonProps"},description:""},className:{required:!1,tsType:{name:"string"},description:""}}};export{j as C};

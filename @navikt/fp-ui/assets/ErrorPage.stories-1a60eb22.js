import{j as e}from"./jsx-runtime-ffb262ed.js";import{I as A,v as w}from"./preview-errors-dde4324f.js";import{l as I}from"./links-dd7a50dd.js";import{U as V,V as l,F as o,L as D}from"./UiIntlProvider-8055f7f4.js";import"./index-b9347d04.js";import{C}from"./ContentWrapper-2547aca0.js";import{H as E,B as j,a as M,c as h,L as B}from"./fridagerUtils-d764f30b.js";import{A as N}from"./Alert-0abcdf68.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./index-356e4a49.js";import"./_baseToString-736b9b82.js";import"./_createSet-e8529459.js";import"./index-9d475cdf.js";import"./index-d3ea75b5.js";const{addons:T}=__STORYBOOK_MODULE_PREVIEW_API__,{global:x}=__STORYBOOK_MODULE_GLOBAL__;var L="storybook/actions",K=`${L}/action-event`,z={depth:10,clearOnStoryChange:!0,limit:50},O=(r,a)=>{let t=Object.getPrototypeOf(r);return!t||a(t)?t:O(t,a)},U=r=>!!(typeof r=="object"&&r&&O(r,a=>/^Synthetic(?:Base)?Event$/.test(a.constructor.name))&&typeof r.persist=="function"),W=r=>{if(U(r)){let a=Object.create(r.constructor.prototype,Object.getOwnPropertyDescriptors(r));a.persist();let t=Object.getOwnPropertyDescriptor(a,"view"),n=t==null?void 0:t.value;return typeof n=="object"&&(n==null?void 0:n.constructor.name)==="Window"&&Object.defineProperty(a,"view",{...t,value:Object.create(n.constructor.prototype)}),a}return r},H=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?w():Date.now().toString(36)+Math.random().toString(36).substring(2);function Y(r,a={}){let t={...z,...a},n=function(...p){var g,m;if(a.implicit){let u=(g="__STORYBOOK_PREVIEW__"in x?x.__STORYBOOK_PREVIEW__:void 0)==null?void 0:g.storyRenders.find(s=>s.phase==="playing"||s.phase==="rendering");if(u){let s=!((m=window==null?void 0:window.FEATURES)!=null&&m.disallowImplicitActionsInRenderV8),y=new A({phase:u.phase,name:r,deprecated:s});if(s)console.warn(y);else throw y}}let b=T.getChannel(),k=H(),S=5,d=p.map(W),F=p.length>1?d:d[0],R={id:k,count:0,data:{name:r,args:F},options:{...t,maxDepth:S+(t.depth||3),allowFunction:t.allowFunction||!1}};b.emit(K,R)};return n.isAction=!0,n}const c=({appName:r,errorMessage:a,retryCallback:t})=>e.jsx(V,{children:e.jsx(C,{children:e.jsxs(l,{gap:"20",children:[e.jsxs(E,{size:"large",level:"2",children:[r==="Engangsstønad"&&e.jsx(o,{id:"ErrorPage.Engangsstønad"}),r==="Foreldrepenger"&&e.jsx(o,{id:"ErrorPage.Foreldrepenger"}),r==="Svangerskapspenger"&&e.jsx(o,{id:"ErrorPage.Svangerskapspenger"})]}),e.jsxs(l,{gap:"10",children:[e.jsx(N,{variant:"warning",children:e.jsxs(l,{gap:"4",children:[e.jsx(E,{size:"small",level:"3",children:e.jsx(o,{id:"ErrorPage.Heading"})}),e.jsx(j,{children:e.jsx(o,{id:"ErrorPage.Message"})})]})}),e.jsxs(M,{gap:"4",justify:"center",children:[e.jsx(D,{href:I.kontaktOss,target:"_blank",children:e.jsx(h,{type:"button",variant:"secondary",children:e.jsx(o,{id:"ErrorPage.Contact"})})}),e.jsx(h,{type:"button",variant:"primary",onClick:t,children:e.jsx(o,{id:"ErrorPage.TryAgain"})})]}),e.jsx("div",{style:{backgroundColor:"var(--a-gray-200)",padding:"16px",borderRadius:"4px"},children:e.jsxs(l,{gap:"2",children:[e.jsx(B,{children:e.jsx(o,{id:"ErrorPage.ErrorMessage"})}),e.jsxs(j,{children:["Error: ",a]})]})})]})]})})}),P=c;try{c.displayName="ErrorPage",c.__docgenInfo={description:"",displayName:"ErrorPage",props:{appName:{defaultValue:null,description:"",name:"appName",required:!0,type:{name:"enum",value:[{value:'"Foreldrepenger"'},{value:'"Engangsstønad"'},{value:'"Svangerskapspenger"'}]}},errorMessage:{defaultValue:null,description:"",name:"errorMessage",required:!0,type:{name:"string"}},retryCallback:{defaultValue:null,description:"",name:"retryCallback",required:!0,type:{name:"() => void"}}}}}catch{}const ce={title:"ErrorPage",component:P},q=({søkPåNytt:r})=>e.jsx(P,{appName:"Engangsstønad",errorMessage:"Kall mot url: ‘/hjelpemidler/barnebriller/api/vilkarsgrunnlag’ feilet,  At S.kallFeilet",retryCallback:r}),i=q.bind({});i.args={søkPåNytt:Y("button-click")};var _,f,v;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`({
  søkPåNytt
}) => {
  return <ErrorPage appName="Engangsstønad" errorMessage="Kall mot url: ‘/hjelpemidler/barnebriller/api/vilkarsgrunnlag’ feilet,  At S.kallFeilet" retryCallback={søkPåNytt} />;
}`,...(v=(f=i.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};const pe=["VisFeilmelding"];export{i as VisFeilmelding,pe as __namedExportsOrder,ce as default};

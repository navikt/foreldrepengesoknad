import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import"./index-Bo6hejM9.js";import{B as u}from"./BlueHeading-C9A2wAyB.js";import{I as x}from"./IconCircleWrapper-CHmUJkBE.js";import{P as I}from"./Page-DRoOCrw7.js";import{c as z}from"./useId-BGzI-o9Y.js";import{r as d,R as f}from"./index-CTjT7uj6.js";import{S as D}from"./BasePrimitive-D4NMUMeT.js";import{V as i,H as m}from"./VStack-Bd1wS6ci.js";import{S as j}from"./Calendar-DOhzqje1.js";import{H as v,B as p}from"./Label-oPV7DuXz.js";import{u as F}from"./useId-BFxX0aRd.js";import{B as N}from"./Button-DtEqrV14.js";import{S as L}from"./ArrowRight-B9s6bwDs.js";import{M}from"./message-Cb07H1bc.js";import"./Box-NsBh_7cn.js";import"./useMergeRefs-Bb4JH14W.js";import"./i18n.context-CjLN2Up4.js";var H=function(t,a){var o={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&a.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(t);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(t,r[n])&&(o[r[n]]=t[r[n]]);return o};const b=d.forwardRef((t,a)=>{var{title:o,titleId:r}=t,n=H(t,["title","titleId"]);let s=F();return s=o?r||"title-"+s:void 0,d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:a,"aria-labelledby":s},n),o?d.createElement("title",{id:s},o):null,d.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25M12.75 6a.75.75 0 0 0-1.5 0v6c0 .199.079.39.22.53l2.5 2.5a.75.75 0 1 0 1.06-1.06l-2.28-2.28z",clipRule:"evenodd"}))});var T=function(t,a){var o={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&a.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(t);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(t,r[n])&&(o[r[n]]=t[r[n]]);return o};const _=d.forwardRef((t,a)=>{var{as:o="div",className:r,above:n,below:s,variant:l,asChild:C}=t,E=T(t,["as","className","above","below","variant","asChild"]);const g=l==="show"?n:s,h=l==="show"?s:n,R=C?D:o;return f.createElement(R,Object.assign({},E,{ref:a,className:z("navds-responsive",r,{[`navds-responsive__above--${g}`]:g,[`navds-responsive__below--${h}`]:h})}))});d.forwardRef((t,a)=>f.createElement(_,Object.assign({},t,{ref:a,variant:"hide"})));const w=d.forwardRef((t,a)=>f.createElement(_,Object.assign({},t,{ref:a,variant:"show"}))),k="_button_1im9m_1",B="_languageToggle_1im9m_5",V={button:k,languageToggle:B},P=({children:t,titleLabel:a,minutesLabel:o,innholdLabel:r,goToNextDefaultStep:n,icon:s,childrenBelowStartButton:l=!1})=>e.jsx(I,{header:e.jsxs(e.Fragment,{children:[e.jsx(w,{below:"md",children:e.jsx(u,{children:e.jsxs(i,{gap:"4",align:"center",children:[e.jsxs(x,{color:"blue",size:"xl",children:[s,!s&&e.jsx(j,{height:28,width:28,fontSize:"1.5rem","aria-hidden":!0})]}),e.jsxs(i,{gap:"1",align:"center",children:[e.jsx(v,{size:"large",children:a}),e.jsxs(m,{gap:"2",align:"center",children:[e.jsx(b,{"aria-hidden":!0}),e.jsx(p,{children:o})]})]})]})})}),e.jsx(w,{above:"md",children:e.jsx(u,{children:e.jsxs(i,{gap:"4",children:[e.jsxs(x,{color:"blue",size:"xl",children:[s,!s&&e.jsx(j,{height:35,width:35,fontSize:"1.5rem","aria-hidden":!0})]}),e.jsxs(i,{gap:"1",children:[e.jsx(v,{size:"large",children:a}),e.jsxs(m,{gap:"2",align:"center",children:[e.jsx(b,{"aria-hidden":!0}),e.jsx(p,{children:o})]})]})]})})})]}),children:e.jsxs(i,{gap:{xs:"3",sm:"10"},children:[e.jsx(p,{size:"large",children:r}),e.jsxs(i,{gap:{xs:l?"6":"8",sm:l?"10":"20"},children:[!l&&e.jsx(i,{gap:{xs:"2",sm:"5"},children:t}),e.jsx(m,{justify:"center",children:e.jsx(N,{onClick:n,icon:e.jsx(L,{"aria-hidden":!0,height:24,width:24}),iconPosition:"right",className:V.button,autoFocus:!0,children:e.jsx(M,{id:"FrontPage.Start"})})}),l&&e.jsx(i,{gap:{xs:"2",sm:"5"},children:t})]})]})});P.__docgenInfo={description:"",methods:[],displayName:"FrontPage",props:{childrenBelowStartButton:{defaultValue:{value:"false",computed:!1},required:!1}}};const se={title:"components/FrontPage",component:P},c={args:{children:e.jsx("div",{children:"Steginnhold"}),locale:"nb",changeLocale:()=>{},titleLabel:"Dette er tittelen på veiviseren",minutesLabel:"Ca 5 min",innholdLabel:"Dette er innhold",goToNextDefaultStep:()=>{}}};var y,O,S;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    children: <div>Steginnhold</div>,
    locale: 'nb',
    changeLocale: () => undefined,
    titleLabel: 'Dette er tittelen på veiviseren',
    minutesLabel: 'Ca 5 min',
    innholdLabel: 'Dette er innhold',
    goToNextDefaultStep: () => undefined
  }
}`,...(S=(O=c.parameters)==null?void 0:O.docs)==null?void 0:S.source}}};const ie=["Default"];export{c as Default,ie as __namedExportsOrder,se as default};

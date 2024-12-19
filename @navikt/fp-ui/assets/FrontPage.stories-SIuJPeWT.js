import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import"./index-Bo6hejM9.js";import{B as b}from"./BlueHeading-0eMYdHT7.js";import{I as y}from"./IconCircleWrapper-CHmUJkBE.js";import{L as w}from"./LanguageToggle-BZZz7tVc.js";import{P as N}from"./Page-DcKKEJEq.js";import{c as I}from"./useId-BGzI-o9Y.js";import{r as d,R as v}from"./index-CTjT7uj6.js";import{S as q}from"./BasePrimitive-D4NMUMeT.js";import{V as o,H as p}from"./VStack-Bd1wS6ci.js";import{S as O}from"./Calendar-DOhzqje1.js";import{H as S,B as g}from"./Label-oPV7DuXz.js";import{u as z}from"./useId-BFxX0aRd.js";import{B as D}from"./Button-DtEqrV14.js";import{S as F}from"./ArrowRight-B9s6bwDs.js";import{M}from"./message-Cb07H1bc.js";import"./Box-NsBh_7cn.js";import"./useFormField-BIxwv7Nz.js";import"./ChevronDown-Cwt6cPhU.js";import"./useMergeRefs-Bb4JH14W.js";import"./i18n.context-CjLN2Up4.js";var H=function(t,a){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&a.indexOf(n)<0&&(i[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(t);r<n.length;r++)a.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(t,n[r])&&(i[n[r]]=t[n[r]]);return i};const _=d.forwardRef((t,a)=>{var{title:i,titleId:n}=t,r=H(t,["title","titleId"]);let s=z();return s=i?n||"title-"+s:void 0,d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:a,"aria-labelledby":s},r),i?d.createElement("title",{id:s},i):null,d.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M3.75 12a8.25 8.25 0 1 1 16.5 0 8.25 8.25 0 0 1-16.5 0M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25M12.75 6a.75.75 0 0 0-1.5 0v6c0 .199.079.39.22.53l2.5 2.5a.75.75 0 1 0 1.06-1.06l-2.28-2.28z",clipRule:"evenodd"}))});var k=function(t,a){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&a.indexOf(n)<0&&(i[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(t);r<n.length;r++)a.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(t,n[r])&&(i[n[r]]=t[n[r]]);return i};const P=d.forwardRef((t,a)=>{var{as:i="div",className:n,above:r,below:s,variant:l,asChild:c}=t,m=k(t,["as","className","above","below","variant","asChild"]);const x=l==="show"?r:s,j=l==="show"?s:r,L=c?q:i;return v.createElement(L,Object.assign({},m,{ref:a,className:I("navds-responsive",n,{[`navds-responsive__above--${x}`]:x,[`navds-responsive__below--${j}`]:j})}))});d.forwardRef((t,a)=>v.createElement(P,Object.assign({},t,{ref:a,variant:"hide"})));const f=d.forwardRef((t,a)=>v.createElement(P,Object.assign({},t,{ref:a,variant:"show"}))),A="_button_1im9m_1",B="_languageToggle_1im9m_5",h={button:A,languageToggle:B},C=({children:t,titleLabel:a,minutesLabel:i,innholdLabel:n,goToNextDefaultStep:r,icon:s,childrenBelowStartButton:l=!1,locale:c,changeLocale:m})=>e.jsx(N,{header:e.jsxs(e.Fragment,{children:[e.jsx(f,{below:"md",children:e.jsx(b,{children:e.jsxs(o,{gap:"4",align:"center",children:[c&&m&&e.jsx("div",{className:h.languageToggle,children:e.jsx(w,{locale:c,changeLocale:m})}),e.jsxs(y,{color:"blue",size:"xl",children:[s,!s&&e.jsx(O,{height:28,width:28,fontSize:"1.5rem","aria-hidden":!0})]}),e.jsxs(o,{gap:"1",align:"center",children:[e.jsx(S,{size:"large",children:a}),e.jsxs(p,{gap:"2",align:"center",children:[e.jsx(_,{"aria-hidden":!0}),e.jsx(g,{children:i})]})]})]})})}),e.jsx(f,{above:"md",children:e.jsx(b,{children:e.jsxs(o,{gap:"4",children:[e.jsxs(y,{color:"blue",size:"xl",children:[s,!s&&e.jsx(O,{height:35,width:35,fontSize:"1.5rem","aria-hidden":!0})]}),e.jsxs(o,{gap:"1",children:[e.jsx(S,{size:"large",children:a}),e.jsxs(p,{gap:"2",align:"center",children:[e.jsx(_,{"aria-hidden":!0}),e.jsx(g,{children:i})]})]})]})})})]}),children:e.jsxs(o,{gap:{xs:"3",sm:"10"},children:[e.jsx(g,{size:"large",children:n}),e.jsxs(o,{gap:{xs:l?"6":"8",sm:l?"10":"20"},children:[!l&&e.jsx(o,{gap:{xs:"2",sm:"5"},children:t}),e.jsx(p,{justify:"center",children:e.jsx(D,{onClick:r,icon:e.jsx(F,{"aria-hidden":!0,height:24,width:24}),iconPosition:"right",className:h.button,autoFocus:!0,children:e.jsx(M,{id:"FrontPage.Start"})})}),l&&e.jsx(o,{gap:{xs:"2",sm:"5"},children:t})]}),c&&m&&e.jsx(f,{above:"md",asChild:!0,children:e.jsx(p,{justify:"center",children:e.jsx("div",{className:h.languageToggle,children:e.jsx(w,{locale:c,changeLocale:m})})})})]})});C.__docgenInfo={description:"",methods:[],displayName:"FrontPage",props:{locale:{required:!0,tsType:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},description:""},changeLocale:{required:!0,tsType:{name:"signature",type:"function",raw:"(locale: LocaleAll) => void",signature:{arguments:[{type:{name:"union",raw:"LocaleNo | 'en'",elements:[{name:"union",raw:"'nb' | 'nn'",elements:[{name:"literal",value:"'nb'"},{name:"literal",value:"'nn'"}]},{name:"literal",value:"'en'"}]},name:"locale"}],return:{name:"void"}}},description:""},children:{required:!1,tsType:{name:"union",raw:"ReactElement | ReactElement[]",elements:[{name:"ReactElement"},{name:"Array",elements:[{name:"ReactElement"}],raw:"ReactElement[]"}]},description:""},titleLabel:{required:!0,tsType:{name:"string"},description:""},minutesLabel:{required:!0,tsType:{name:"string"},description:""},innholdLabel:{required:!0,tsType:{name:"string"},description:""},goToNextDefaultStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},icon:{required:!1,tsType:{name:"ReactElement"},description:""},childrenBelowStartButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const ce={title:"components/FrontPage",component:C},u={args:{children:e.jsx("div",{children:"Steginnhold"}),locale:"nb",changeLocale:()=>{},titleLabel:"Dette er tittelen på veiviseren",minutesLabel:"Ca 5 min",innholdLabel:"Dette er innhold",goToNextDefaultStep:()=>{}}};var T,E,R;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    children: <div>Steginnhold</div>,
    locale: 'nb',
    changeLocale: () => undefined,
    titleLabel: 'Dette er tittelen på veiviseren',
    minutesLabel: 'Ca 5 min',
    innholdLabel: 'Dette er innhold',
    goToNextDefaultStep: () => undefined
  }
}`,...(R=(E=u.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};const me=["Default"];export{u as Default,me as __namedExportsOrder,ce as default};

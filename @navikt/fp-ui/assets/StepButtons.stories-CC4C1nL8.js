import{j as o}from"./jsx-runtime-Du8NFWEI.js";import{a as k}from"./chunk-MZXVCX43-DWuJqIWT.js";import"./index-Br48K-Zq.js";import{H as w}from"./VStack-DWIsOqOD.js";import{r as u}from"./index-Dl6G-zuu.js";import{B as b}from"./Button-C7PfoSK9.js";import{F as m}from"./message-D3WIBprz.js";import{u as P}from"./useId-BnKOV0D5.js";import"./v4-D8aEg3BZ.js";import"./Label-El8VFjDh.js";import"./composeEventHandlers-DeH74NdU.js";var O=function(t,n){var s={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(s[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,e=Object.getOwnPropertySymbols(t);i<e.length;i++)n.indexOf(e[i])<0&&Object.prototype.propertyIsEnumerable.call(t,e[i])&&(s[e[i]]=t[e[i]]);return s};const I=u.forwardRef((t,n)=>{var{title:s,titleId:e}=t,i=O(t,["title","titleId"]);let a=P();return a=s?e||"title-"+a:void 0,u.createElement("svg",Object.assign({width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",focusable:!1,role:"img",ref:n,"aria-labelledby":a},i),s?u.createElement("title",{id:a},s):null,u.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6.317 4.32a.75.75 0 0 0-1.023.932L7.704 12l-2.41 6.748a.75.75 0 0 0 1.023.932l15-7a.75.75 0 0 0 0-1.36l-15-7Zm2.712 6.93L7.31 6.44 19.227 12 7.31 17.56l1.719-4.81H12.5a.75.75 0 0 0 0-1.5H9.029Z",fill:"currentColor"}))}),_=I,T=({goToPreviousStep:t,nextButtonOnClick:n,isDisabledAndLoading:s=!1,isDisabled:e=!1,isLoading:i=!1,isNexButtonVisible:a=!0,isSendButton:f=!1})=>o.jsxs(w,{gap:"2",children:[o.jsx(b,{type:"button",variant:"secondary",onClick:t,style:{flex:1},children:o.jsx(m,{id:"StepButtons.Forrige"})}),a&&o.jsxs(b,{icon:f?o.jsx(_,{"aria-hidden":!0}):void 0,iconPosition:"right",type:n?"button":"submit",onClick:n,disabled:e||s,loading:i||s,style:{flex:1},children:[f&&o.jsx(m,{id:"StepButtons.Send"}),!f&&o.jsx(m,{id:"StepButtons.Neste"})]})]}),h=T;T.__docgenInfo={description:"",methods:[],displayName:"StepButtons",props:{goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},nextButtonOnClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},isDisabledAndLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isNexButtonVisible:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},isSendButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const J={title:"step/StepButtons",component:h},c=({isNextButtonVisible:t=!0,isSendButton:n=!1,isDisabledAndLoading:s=!1})=>o.jsx(h,{isNexButtonVisible:t,goToPreviousStep:k("button-click"),isSendButton:n,isDisabledAndLoading:s}),r=c.bind({});r.args={isNextButtonVisible:!1};const p=c.bind({}),l=c.bind({});l.args={isSendButton:!0};const d=c.bind({});d.args={isDisabledAndLoading:!0};var g,S,B;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`({
  isNextButtonVisible = true,
  isSendButton = false,
  isDisabledAndLoading = false
}) => <StepButtons isNexButtonVisible={isNextButtonVisible} goToPreviousStep={action('button-click')} isSendButton={isSendButton} isDisabledAndLoading={isDisabledAndLoading} />`,...(B=(S=r.parameters)==null?void 0:S.docs)==null?void 0:B.source}}};var x,v,y;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`({
  isNextButtonVisible = true,
  isSendButton = false,
  isDisabledAndLoading = false
}) => <StepButtons isNexButtonVisible={isNextButtonVisible} goToPreviousStep={action('button-click')} isSendButton={isSendButton} isDisabledAndLoading={isDisabledAndLoading} />`,...(y=(v=p.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var V,N,L;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`({
  isNextButtonVisible = true,
  isSendButton = false,
  isDisabledAndLoading = false
}) => <StepButtons isNexButtonVisible={isNextButtonVisible} goToPreviousStep={action('button-click')} isSendButton={isSendButton} isDisabledAndLoading={isDisabledAndLoading} />`,...(L=(N=l.parameters)==null?void 0:N.docs)==null?void 0:L.source}}};var j,D,A;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`({
  isNextButtonVisible = true,
  isSendButton = false,
  isDisabledAndLoading = false
}) => <StepButtons isNexButtonVisible={isNextButtonVisible} goToPreviousStep={action('button-click')} isSendButton={isSendButton} isDisabledAndLoading={isDisabledAndLoading} />`,...(A=(D=d.parameters)==null?void 0:D.docs)==null?void 0:A.source}}};const K=["SkjulNeste","VisNeste","SendSøknaden","IsDisabledAndLoading"];export{d as IsDisabledAndLoading,l as SendSøknaden,r as SkjulNeste,p as VisNeste,K as __namedExportsOrder,J as default};

import{a as k}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{j as a}from"./jsx-runtime-DwRxq3ZX.js";import"./index-Big-v_KR.js";import{H as I}from"./VStack-CX7S-mA2.js";import{r as u}from"./index-BX3iQpgp.js";import{B as g}from"./Button-CncoDHlu.js";import{M as d}from"./message-DaWxnUwA.js";import{u as L}from"./useId-BiaX0naB.js";import"./v4-CtRu48qb.js";import"./useId-BH2SjFxt.js";import"./BasePrimitive-BUl2IhFA.js";import"./create-context-DScrY5Fc.js";import"./i18n.context-CtQMyEHM.js";import"./Label-DKHN4Le_.js";var q=function(t,o){var s={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(s[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)o.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(s[e[r]]=t[e[r]]);return s};const P=u.forwardRef((t,o)=>{var{title:s,titleId:e}=t,r=q(t,["title","titleId"]);let i=L();return i=s?e||"title-"+i:void 0,u.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:o,"aria-labelledby":i},r),s?u.createElement("title",{id:i},s):null,u.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M6.317 4.32a.75.75 0 0 0-1.023.932L7.704 12l-2.41 6.748a.75.75 0 0 0 1.023.932l15-7a.75.75 0 0 0 0-1.36zm2.712 6.93L7.31 6.44 19.227 12 7.31 17.56l1.719-4.81H12.5a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),T=({goToPreviousStep:t,nextButtonOnClick:o,isDisabledAndLoading:s=!1,isDisabled:e=!1,isLoading:r=!1,isNextButtonVisible:i=!0,isSendButton:l=!1,useSimplifiedTexts:f=!1})=>a.jsxs(I,{gap:"2",children:[a.jsx(g,{type:"button",variant:"secondary",onClick:t,style:{flex:1,maxWidth:l?"fit-content":void 0},children:f?a.jsx(d,{id:"StepButtons.ForrigeSimple"}):a.jsx(d,{id:"StepButtons.Forrige"})}),i&&a.jsxs(g,{icon:l?a.jsx(P,{"aria-hidden":!0}):void 0,iconPosition:"right",type:o?"button":"submit",onClick:o,disabled:e||s,loading:r||s,style:{flex:1},children:[l&&a.jsx(d,{id:"StepButtons.Send"}),!l&&!f&&a.jsx(d,{id:"StepButtons.Neste"}),!l&&f&&a.jsx(d,{id:"StepButtons.NesteSimple"})]})]});T.__docgenInfo={description:"",methods:[],displayName:"StepButtons",props:{goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},nextButtonOnClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},isDisabledAndLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isNextButtonVisible:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},isSendButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},useSimplifiedTexts:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const Q={component:T},n={args:{isNextButtonVisible:!0,isSendButton:!1,isDisabledAndLoading:!1,goToPreviousStep:k("button-click")}},p={args:{...n.args,isNextButtonVisible:!1}},c={args:{...n.args,isSendButton:!0}},m={args:{...n.args,isDisabledAndLoading:!0}};var b,S,y;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    isNextButtonVisible: true,
    isSendButton: false,
    isDisabledAndLoading: false,
    goToPreviousStep: action('button-click')
  }
}`,...(y=(S=n.parameters)==null?void 0:S.docs)==null?void 0:y.source}}};var v,x,j;p.parameters={...p.parameters,docs:{...(v=p.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    ...VisNeste.args,
    isNextButtonVisible: false
  }
}`,...(j=(x=p.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var B,V,N;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    ...VisNeste.args,
    isSendButton: true
  }
}`,...(N=(V=c.parameters)==null?void 0:V.docs)==null?void 0:N.source}}};var h,w,O;m.parameters={...m.parameters,docs:{...(h=m.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    ...VisNeste.args,
    isDisabledAndLoading: true
  }
}`,...(O=(w=m.parameters)==null?void 0:w.docs)==null?void 0:O.source}}};const U=["VisNeste","SkjulNeste","SendSøknaden","IsDisabledAndLoading"];export{m as IsDisabledAndLoading,c as SendSøknaden,p as SkjulNeste,n as VisNeste,U as __namedExportsOrder,Q as default};

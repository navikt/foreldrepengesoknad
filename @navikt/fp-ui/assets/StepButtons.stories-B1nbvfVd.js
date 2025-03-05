import{a as I}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{j as s}from"./jsx-runtime-CLpGMVip.js";import"./index-Bv0NUv48.js";import{H as L}from"./VStack-DcgeE-Qb.js";import{r as c}from"./index-CZMpeKRu.js";import"./useId-U89bW7jp.js";import{B as b}from"./Button-M4puhhfx.js";import{M as n}from"./message-Dgb3GyQu.js";import{u as T}from"./useId-BOzDck44.js";import"./v4-CtRu48qb.js";import"./BasePrimitive-CMWW3eNW.js";import"./i18n.hooks-Dta7jMm_.js";import"./Label-QI4r3q9e.js";var P=function(t,o){var a={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&o.indexOf(e)<0&&(a[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(t);r<e.length;r++)o.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(t,e[r])&&(a[e[r]]=t[e[r]]);return a};const _=c.forwardRef((t,o)=>{var{title:a,titleId:e}=t,r=P(t,["title","titleId"]);let l=T();return l=a?e||"title-"+l:void 0,c.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:o,"aria-labelledby":l},r),a?c.createElement("title",{id:l},a):null,c.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M6.317 4.32a.75.75 0 0 0-1.023.932L7.704 12l-2.41 6.748a.75.75 0 0 0 1.023.932l15-7a.75.75 0 0 0 0-1.36zm2.712 6.93L7.31 6.44 19.227 12 7.31 17.56l1.719-4.81H12.5a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),q=({goToPreviousStep:t,nextButtonOnClick:o,isDisabledAndLoading:a=!1,isDisabled:e=!1,isLoading:r=!1,isNextButtonVisible:l=!0,isSendButton:d=!1,useSimplifiedTexts:u=!1,isJumpToEndButton:p=!1})=>s.jsxs(L,{gap:"2",children:[s.jsx(b,{type:"button",variant:"secondary",onClick:t,style:{flex:1,maxWidth:d?"fit-content":void 0},children:u?s.jsx(n,{id:"StepButtons.ForrigeSimple"}):s.jsx(n,{id:"StepButtons.Forrige"})}),l&&s.jsxs(b,{icon:d?s.jsx(_,{"aria-hidden":!0}):void 0,iconPosition:"right",type:o?"button":"submit",onClick:o,disabled:e||a,loading:r||a,style:{flex:1},children:[d&&s.jsx(n,{id:"StepButtons.Send"}),!d&&!u&&!p&&s.jsx(n,{id:"StepButtons.Neste"}),!d&&u&&!p&&s.jsx(n,{id:"StepButtons.NesteSimple"}),p&&!u&&s.jsx(n,{id:"StepButtons.GåTilOppsummering"}),p&&u&&s.jsx(n,{id:"StepButtons.GåTilOppsummeringSimple"})]})]});q.__docgenInfo={description:"",methods:[],displayName:"StepButtons",props:{goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},nextButtonOnClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},isDisabledAndLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isNextButtonVisible:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},isSendButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},useSimplifiedTexts:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isJumpToEndButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const U={component:q},i={args:{isNextButtonVisible:!0,isSendButton:!1,isDisabledAndLoading:!1,goToPreviousStep:I("button-click")}},m={args:{...i.args,isNextButtonVisible:!1}},f={args:{...i.args,isSendButton:!0}},g={args:{...i.args,isDisabledAndLoading:!0}};var S,y,v;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    isNextButtonVisible: true,
    isSendButton: false,
    isDisabledAndLoading: false,
    goToPreviousStep: action('button-click')
  }
}`,...(v=(y=i.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var x,j,V;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...VisNeste.args,
    isNextButtonVisible: false
  }
}`,...(V=(j=m.parameters)==null?void 0:j.docs)==null?void 0:V.source}}};var B,N,h;f.parameters={...f.parameters,docs:{...(B=f.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    ...VisNeste.args,
    isSendButton: true
  }
}`,...(h=(N=f.parameters)==null?void 0:N.docs)==null?void 0:h.source}}};var O,w,k;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    ...VisNeste.args,
    isDisabledAndLoading: true
  }
}`,...(k=(w=g.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};const X=["VisNeste","SkjulNeste","SendSøknaden","IsDisabledAndLoading"];export{g as IsDisabledAndLoading,f as SendSøknaden,m as SkjulNeste,i as VisNeste,X as __namedExportsOrder,U as default};

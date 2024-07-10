import{j as o}from"./jsx-runtime-_e34SzbC.js";import{a as w}from"./chunk-MZXVCX43-CM0pFb8Z.js";import"./index-DSUmsmzI.js";import{H as O}from"./VStack-CXjZFfcj.js";import{r as c}from"./index-DVXBtNgz.js";import{B as g}from"./Button-Bo6XR0GR.js";import{M as l}from"./message-DizMllxX.js";import{u as P}from"./useId-DbilmxAP.js";import"./v4-CQkTLCs1.js";import"./tslib.es6-BvlsdGqA.js";import"./clsx-B-dksMZM.js";import"./BasePrimitive-2Q3imcnG.js";import"./useId-BBol7gfI.js";import"./Label-Cf_oUe96.js";import"./composeEventHandlers-DeH74NdU.js";var I=function(t,n){var s={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&n.indexOf(e)<0&&(s[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,e=Object.getOwnPropertySymbols(t);i<e.length;i++)n.indexOf(e[i])<0&&Object.prototype.propertyIsEnumerable.call(t,e[i])&&(s[e[i]]=t[e[i]]);return s};const _=c.forwardRef((t,n)=>{var{title:s,titleId:e}=t,i=I(t,["title","titleId"]);let a=P();return a=s?e||"title-"+a:void 0,c.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:n,"aria-labelledby":a},i),s?c.createElement("title",{id:a},s):null,c.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M6.317 4.32a.75.75 0 0 0-1.023.932L7.704 12l-2.41 6.748a.75.75 0 0 0 1.023.932l15-7a.75.75 0 0 0 0-1.36zm2.712 6.93L7.31 6.44 19.227 12 7.31 17.56l1.719-4.81H12.5a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))}),T=({goToPreviousStep:t,nextButtonOnClick:n,isDisabledAndLoading:s=!1,isDisabled:e=!1,isLoading:i=!1,isNexButtonVisible:a=!0,isSendButton:r=!1,useSimplifiedTexts:b=!1})=>o.jsxs(O,{gap:"2",children:[o.jsx(g,{type:"button",variant:"secondary",onClick:t,style:{flex:1,maxWidth:r?"fit-content":void 0},children:b?o.jsx(l,{id:"StepButtons.ForrigeSimple"}):o.jsx(l,{id:"StepButtons.Forrige"})}),a&&o.jsxs(g,{icon:r?o.jsx(_,{"aria-hidden":!0}):void 0,iconPosition:"right",type:n?"button":"submit",onClick:n,disabled:e||s,loading:i||s,style:{flex:1},children:[r&&o.jsx(l,{id:"StepButtons.Send"}),!r&&!b&&o.jsx(l,{id:"StepButtons.Neste"}),!r&&b&&o.jsx(l,{id:"StepButtons.NesteSimple"})]})]}),k=T;T.__docgenInfo={description:"",methods:[],displayName:"StepButtons",props:{goToPreviousStep:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},nextButtonOnClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},isDisabledAndLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isDisabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isLoading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},isNexButtonVisible:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},isSendButton:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},useSimplifiedTexts:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const X={title:"step/StepButtons",component:k},f=({isNextButtonVisible:t=!0,isSendButton:n=!1,isDisabledAndLoading:s=!1})=>o.jsx(k,{isNexButtonVisible:t,goToPreviousStep:w("button-click"),isSendButton:n,isDisabledAndLoading:s}),d=f.bind({});d.args={isNextButtonVisible:!1};const m=f.bind({}),u=f.bind({});u.args={isSendButton:!0};const p=f.bind({});p.args={isDisabledAndLoading:!0};var S,B,x;d.parameters={...d.parameters,docs:{...(S=d.parameters)==null?void 0:S.docs,source:{originalSource:`({
  isNextButtonVisible = true,
  isSendButton = false,
  isDisabledAndLoading = false
}) => <StepButtons isNexButtonVisible={isNextButtonVisible} goToPreviousStep={action('button-click')} isSendButton={isSendButton} isDisabledAndLoading={isDisabledAndLoading} />`,...(x=(B=d.parameters)==null?void 0:B.docs)==null?void 0:x.source}}};var v,y,V;m.parameters={...m.parameters,docs:{...(v=m.parameters)==null?void 0:v.docs,source:{originalSource:`({
  isNextButtonVisible = true,
  isSendButton = false,
  isDisabledAndLoading = false
}) => <StepButtons isNexButtonVisible={isNextButtonVisible} goToPreviousStep={action('button-click')} isSendButton={isSendButton} isDisabledAndLoading={isDisabledAndLoading} />`,...(V=(y=m.parameters)==null?void 0:y.docs)==null?void 0:V.source}}};var N,j,L;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`({
  isNextButtonVisible = true,
  isSendButton = false,
  isDisabledAndLoading = false
}) => <StepButtons isNexButtonVisible={isNextButtonVisible} goToPreviousStep={action('button-click')} isSendButton={isSendButton} isDisabledAndLoading={isDisabledAndLoading} />`,...(L=(j=u.parameters)==null?void 0:j.docs)==null?void 0:L.source}}};var D,A,h;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`({
  isNextButtonVisible = true,
  isSendButton = false,
  isDisabledAndLoading = false
}) => <StepButtons isNexButtonVisible={isNextButtonVisible} goToPreviousStep={action('button-click')} isSendButton={isSendButton} isDisabledAndLoading={isDisabledAndLoading} />`,...(h=(A=p.parameters)==null?void 0:A.docs)==null?void 0:h.source}}};const Y=["SkjulNeste","VisNeste","SendSøknaden","IsDisabledAndLoading"];export{p as IsDisabledAndLoading,u as SendSøknaden,d as SkjulNeste,m as VisNeste,Y as __namedExportsOrder,X as default};

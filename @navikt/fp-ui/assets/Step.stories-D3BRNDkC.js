import{j as e}from"./jsx-runtime-Cw0GR0a5.js";import{u}from"./index-Bo6hejM9.js";import{P as B}from"./ProgressStepper-BQsGpWTi.js";import{r as j}from"./index-CTjT7uj6.js";import{B as E}from"./Banner-D4ak9Q03.js";import{H as S,a as I,B as P}from"./Label-oPV7DuXz.js";import{M as o}from"./Modal-2D4TrBDl.js";import{B as c}from"./Button-DtEqrV14.js";import{V as g}from"./VStack-Bd1wS6ci.js";import{M as f}from"./message-Cb07H1bc.js";import"./useControllableState-CZwrAZhD.js";import"./useId-BGzI-o9Y.js";import"./create-context-DOtOKOIE.js";import"./BasePrimitive-D4NMUMeT.js";import"./useMergeRefs-Bb4JH14W.js";import"./i18n.context-CjLN2Up4.js";import"./ChevronDown-Cwt6cPhU.js";import"./useId-BFxX0aRd.js";import"./index-BbmHap-z.js";import"./XMark-BMlYUUsT.js";const L="_page_hli7r_1",C="_poster_hli7r_5",H={page:L,poster:C},T=({ariaLabel:a,id:t="pageMainContent",className:n,topContentRenderer:r,children:s})=>{j.useEffect(()=>{window.scrollTo(0,0)},[]);const i=u(),d=a?i.formatMessage({id:"Page.DefaultMainRoleLabel"}):void 0;return e.jsxs("main",{"aria-label":d,id:t,children:[r==null?void 0:r(),e.jsx("div",{className:`${H.page} ${n}`,children:s})]})};T.__docgenInfo={description:"",methods:[],displayName:"Page",props:{className:{required:!1,tsType:{name:"string"},description:""},id:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'pageMainContent'",computed:!1}},ariaLabel:{required:!1,tsType:{name:"string"},description:""},topContentRenderer:{required:!1,tsType:{name:"signature",type:"function",raw:"() => React.ReactElement<any>",signature:{arguments:[],return:{name:"ReactReactElement",raw:"React.ReactElement<any>",elements:[{name:"any"}]}}},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const q=({text:a,level:t="1"})=>e.jsx(E,{children:e.jsx(S,{size:"large",level:t,children:a})});q.__docgenInfo={description:"",methods:[],displayName:"StepBanner",props:{text:{required:!0,tsType:{name:"string"},description:""},level:{required:!1,tsType:{name:"union",raw:"'1' | '2' | '3'",elements:[{name:"literal",value:"'1'"},{name:"literal",value:"'2'"},{name:"literal",value:"'3'"}]},description:"",defaultValue:{value:"'1'",computed:!1}}}};const _=({isOpen:a,setIsOpen:t,onAvbrytOgSlett:n,onAvbrytOgFortsettSenere:r})=>{const s=u();return e.jsxs(o,{open:a,onClose:()=>t(!1),"aria-label":s.formatMessage({id:"AvsluttModal.ContinueLater"}),children:[e.jsx(o.Header,{children:e.jsx(S,{size:"medium",children:s.formatMessage({id:"AvsluttModal.ContinueLater"})})}),e.jsx(o.Body,{children:e.jsx(I,{children:s.formatMessage({id:"AvsluttModal.CompleteLater"})})}),e.jsxs(o.Footer,{children:[e.jsx(c,{variant:"primary",onClick:r,children:s.formatMessage({id:"AvsluttModal.Ok"})}),e.jsx(c,{variant:"tertiary",onClick:n,children:s.formatMessage({id:"AvsluttModal.Delete"})})]})]})};_.__docgenInfo={description:"",methods:[],displayName:"AvsluttModal",props:{isOpen:{required:!0,tsType:{name:"boolean"},description:""},setIsOpen:{required:!0,tsType:{name:"signature",type:"function",raw:"(isOpen: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"isOpen"}],return:{name:"void"}}},description:""},onAvbrytOgFortsettSenere:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onAvbrytOgSlett:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const V="_stepFooter_v5ka5_1",$="_divider_v5ka5_8",y={stepFooter:V,divider:$},M=({onAvbrytOgFortsettSenere:a,onAvbrytOgSlett:t})=>{const[n,r]=j.useState(!1),s=u();return e.jsxs("div",{className:y.stepFooter,children:[e.jsx("div",{className:y.divider}),e.jsx(_,{isOpen:n,setIsOpen:r,onAvbrytOgFortsettSenere:a,onAvbrytOgSlett:t}),e.jsx(c,{variant:"tertiary",onClick:()=>r(!0),children:s.formatMessage({id:"StepFooter.Avslutt"})})]})};M.__docgenInfo={description:"",methods:[],displayName:"StepFooter",props:{onAvbrytOgFortsettSenere:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onAvbrytOgSlett:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const Y="_step_38suq_1",D="_infoMessage_38suq_5",v={step:Y,infoMessage:D},O=({bannerTitle:a,steps:t,onCancel:n,onContinueLater:r,onStepChange:s,cancelOrContinueLaterAriaLabel:i,children:d,pageAriaLabel:A,infoMessage:m,hideHeader:R,someFieldsOptional:w=!1,noFieldsRequired:F=!1})=>{const p=t.findIndex(k=>k.isSelected);if(p===-1)return null;const N=t[p].label;return e.jsxs(T,{className:v.step,ariaLabel:A,topContentRenderer:()=>e.jsx(e.Fragment,{children:a&&e.jsx(q,{text:a})}),children:[m!==void 0&&e.jsx("div",{className:v.infoMessage,children:m}),e.jsxs(g,{gap:"6",children:[e.jsx("div",{role:"presentation",children:e.jsx(B,{steps:t,hideHeader:R,onStepChange:s})}),!F&&e.jsx(P,{children:w?e.jsx(f,{id:"Step.HarValgfrieFelt"}):e.jsx(f,{id:"Step.HarObligatoriskeFelt"})}),e.jsx("section",{"aria-label":`Steg ${p+1} av ${t.length}:  ${N}`,children:e.jsxs(g,{gap:"4",children:[d,(n||r)&&e.jsx("div",{role:i?"complementary":void 0,"aria-label":i,children:e.jsx(M,{onAvbrytOgSlett:n,onAvbrytOgFortsettSenere:r})})]})})]})]})};O.__docgenInfo={description:"",methods:[],displayName:"Step",props:{bannerTitle:{required:!1,tsType:{name:"string"},description:""},steps:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onCancel:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onContinueLater:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},cancelOrContinueLaterAriaLabel:{required:!1,tsType:{name:"string"},description:""},pageAriaLabel:{required:!1,tsType:{name:"string"},description:""},infoMessage:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},hideHeader:{required:!1,tsType:{name:"boolean"},description:""},someFieldsOptional:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},noFieldsRequired:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const ce={title:"step/Step",component:O},l={args:{steps:[{id:"test",label:"Om Barnet",isSelected:!1},{id:"test2",label:"Annet",isSelected:!0},{id:"test3",label:"Oppsummering",isSelected:!1}],children:e.jsx(e.Fragment,{children:"Her er det noe kult innhold"})}};var h,x,b;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    steps: [{
      id: 'test',
      label: 'Om Barnet',
      isSelected: false
    }, {
      id: 'test2',
      label: 'Annet',
      isSelected: true
    }, {
      id: 'test3',
      label: 'Oppsummering',
      isSelected: false
    }],
    children: <>Her er det noe kult innhold</>
  }
}`,...(b=(x=l.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};const ue=["Default"];export{l as Default,ue as __namedExportsOrder,ce as default};

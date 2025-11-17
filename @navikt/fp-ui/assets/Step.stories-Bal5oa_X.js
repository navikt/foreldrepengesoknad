import{j as e}from"./iframe-_328Kk9_.js";import{P as f}from"./ProgressStepper-nKh5Rn2K.js";import{V as n}from"./VStack-C3lK0FLB.js";import{B as g}from"./Label-sQoQRbls.js";import{M as s}from"./message-B21FiguP.js";import"./preload-helper-D9Z9MdNV.js";import"./Button-B-91KJbd.js";import"./useId-BFcGEMRI.js";import"./i18n.hooks-B4XFuwZm.js";import"./Provider-BvfwZZZz.js";import"./composeEventHandlers-krbYd5LM.js";import"./ChevronDown-B30Wm_Db.js";import"./useId-kcspo8a-.js";import"./BasePrimitive-BUVq3WDU.js";const i=({steps:t,onStepChange:l,children:o,hideHeader:d,someFieldsOptional:p=!1,noFieldsRequired:m=!1})=>{const a=t.findIndex(u=>u.isSelected);if(a===-1)throw new Error("Ingen valgte steg funnet");const c=t[a].label;return e.jsxs(n,{gap:"space-24",children:[e.jsx("div",{role:"presentation",children:e.jsx(f,{steps:t,hideHeader:d,onStepChange:l})}),!m&&e.jsx(g,{children:p?e.jsx(s,{id:"Step.HarValgfrieFelt"}):e.jsx(s,{id:"Step.HarObligatoriskeFelt"})}),e.jsx("section",{"aria-label":`Steg ${a+1} av ${t.length}:  ${c}`,children:e.jsx(n,{gap:"space-16",children:o})})]})};i.__docgenInfo={description:"",methods:[],displayName:"Step",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},hideHeader:{required:!1,tsType:{name:"boolean"},description:""},someFieldsOptional:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},noFieldsRequired:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const F={title:"step/Step",component:i},r={args:{steps:[{id:"test",label:"Om Barnet",isSelected:!1},{id:"test2",label:"Annet",isSelected:!0},{id:"test3",label:"Oppsummering",isSelected:!1}],children:e.jsx(e.Fragment,{children:"Her er det noe kult innhold"})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const R=["Default"];export{r as Default,R as __namedExportsOrder,F as default};

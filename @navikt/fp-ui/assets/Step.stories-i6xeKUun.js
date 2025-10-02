import{j as e}from"./iframe-Ds-ehfsU.js";import{P as f}from"./ProgressStepper-DwsnYinM.js";import{V as n}from"./VStack-lUf-E0mQ.js";import{B as g}from"./Label-BFTR7dc5.js";import{M as s}from"./message-xCToPXAi.js";import"./preload-helper-D9Z9MdNV.js";import"./Button-RfsclA1O.js";import"./useId-BaPuh_wS.js";import"./i18n.hooks-Bo4IM2WE.js";import"./composeEventHandlers-krbYd5LM.js";import"./ChevronDown-DZjioYum.js";import"./useId-C7XAsmFW.js";import"./BasePrimitive-BrZC6uwO.js";const i=({steps:t,onStepChange:l,children:o,hideHeader:d,someFieldsOptional:p=!1,noFieldsRequired:m=!1})=>{const a=t.findIndex(u=>u.isSelected);if(a===-1)throw new Error("Ingen valgte steg funnet");const c=t[a].label;return e.jsxs(n,{gap:"space-24",children:[e.jsx("div",{role:"presentation",children:e.jsx(f,{steps:t,hideHeader:d,onStepChange:l})}),!m&&e.jsx(g,{children:p?e.jsx(s,{id:"Step.HarValgfrieFelt"}):e.jsx(s,{id:"Step.HarObligatoriskeFelt"})}),e.jsx("section",{"aria-label":`Steg ${a+1} av ${t.length}:  ${c}`,children:e.jsx(n,{gap:"space-16",children:o})})]})};i.__docgenInfo={description:"",methods:[],displayName:"Step",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},hideHeader:{required:!1,tsType:{name:"boolean"},description:""},someFieldsOptional:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},noFieldsRequired:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const w={title:"step/Step",component:i},r={args:{steps:[{id:"test",label:"Om Barnet",isSelected:!1},{id:"test2",label:"Annet",isSelected:!0},{id:"test3",label:"Oppsummering",isSelected:!1}],children:e.jsx(e.Fragment,{children:"Her er det noe kult innhold"})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const F=["Default"];export{r as Default,F as __namedExportsOrder,w as default};

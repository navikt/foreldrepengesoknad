import{j as e}from"./iframe-DNfLYLHv.js";import{P as f}from"./ProgressStepper-C1eeO7cE.js";import{V as a}from"./VStack-Dewg8uBr.js";import"./useId-DVDLCGeS.js";import{B as g}from"./Label-GR1BUY0W.js";import{M as s}from"./message-DWWHn38v.js";import"./Button-i21tYiA5.js";import"./i18n.hooks-BbH7KLlq.js";import"./ChevronDown-gTP9DuIh.js";import"./useCallbackRef-6CCJEIpy.js";import"./useId-RMYSL8TW.js";import"./BasePrimitive-BoNAoiuR.js";const i=({steps:t,onStepChange:l,children:o,hideHeader:d,someFieldsOptional:p=!1,noFieldsRequired:m=!1})=>{const n=t.findIndex(u=>u.isSelected);if(n===-1)throw new Error("Ingen valgte steg funnet");const c=t[n].label;return e.jsxs(a,{gap:"6",children:[e.jsx("div",{role:"presentation",children:e.jsx(f,{steps:t,hideHeader:d,onStepChange:l})}),!m&&e.jsx(g,{children:p?e.jsx(s,{id:"Step.HarValgfrieFelt"}):e.jsx(s,{id:"Step.HarObligatoriskeFelt"})}),e.jsx("section",{"aria-label":`Steg ${n+1} av ${t.length}:  ${c}`,children:e.jsx(a,{gap:"4",children:o})})]})};i.__docgenInfo={description:"",methods:[],displayName:"Step",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},hideHeader:{required:!1,tsType:{name:"boolean"},description:""},someFieldsOptional:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},noFieldsRequired:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const O={title:"step/Step",component:i},r={args:{steps:[{id:"test",label:"Om Barnet",isSelected:!1},{id:"test2",label:"Annet",isSelected:!0},{id:"test3",label:"Oppsummering",isSelected:!1}],children:e.jsx(e.Fragment,{children:"Her er det noe kult innhold"})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};const w=["Default"];export{r as Default,w as __namedExportsOrder,O as default};

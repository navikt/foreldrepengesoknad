import{j as e}from"./iframe-uqheWZYH.js";import{P as b}from"./ProgressStepper-Cac8xt0l.js";import{V as a}from"./VStack-BZyOm-3R.js";import"./useId-30YG5fTa.js";import{B as h}from"./Label-C3uBT4mT.js";import{M as s}from"./message-sGdfY09E.js";import"./Button-B61toliu.js";import"./i18n.hooks-DBQZCqTY.js";import"./ChevronDown-CZl9OQsC.js";import"./useCallbackRef-C67Pwb7A.js";import"./useId-DnKwO2S6.js";import"./BasePrimitive-CIpRIRQj.js";const d=({steps:t,onStepChange:p,children:m,hideHeader:c,someFieldsOptional:u=!1,noFieldsRequired:f=!1})=>{const n=t.findIndex(S=>S.isSelected);if(n===-1)throw new Error("Ingen valgte steg funnet");const g=t[n].label;return e.jsxs(a,{gap:"6",children:[e.jsx("div",{role:"presentation",children:e.jsx(b,{steps:t,hideHeader:c,onStepChange:p})}),!f&&e.jsx(h,{children:u?e.jsx(s,{id:"Step.HarValgfrieFelt"}):e.jsx(s,{id:"Step.HarObligatoriskeFelt"})}),e.jsx("section",{"aria-label":`Steg ${n+1} av ${t.length}:  ${g}`,children:e.jsx(a,{gap:"4",children:m})})]})};d.__docgenInfo={description:"",methods:[],displayName:"Step",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    id: TYPE;
    label: string;
    isSelected: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TYPE",required:!0}},{key:"label",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!0}}]}}],raw:"Array<ProgressStep<TYPE>>"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onStepChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TYPE) => void",signature:{arguments:[{type:{name:"TYPE"},name:"id"}],return:{name:"void"}}},description:""},hideHeader:{required:!1,tsType:{name:"boolean"},description:""},someFieldsOptional:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},noFieldsRequired:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const R={title:"step/Step",component:d},r={args:{steps:[{id:"test",label:"Om Barnet",isSelected:!1},{id:"test2",label:"Annet",isSelected:!0},{id:"test3",label:"Oppsummering",isSelected:!1}],children:e.jsx(e.Fragment,{children:"Her er det noe kult innhold"})}};var i,l,o;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(o=(l=r.parameters)==null?void 0:l.docs)==null?void 0:o.source}}};const H=["Default"];export{r as Default,H as __namedExportsOrder,R as default};

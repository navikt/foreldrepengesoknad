import{j as e}from"./iframe-Ds-ehfsU.js";import{S as p}from"./SkjemaRotLayout-DYjli0kW.js";import{V as i}from"./VStack-lUf-E0mQ.js";import{A as l}from"./Alert-BlqZXIIK.js";import{H as m,B as c}from"./Label-BFTR7dc5.js";import{M as r}from"./message-xCToPXAi.js";import{B as u}from"./Button-RfsclA1O.js";import"./preload-helper-D9Z9MdNV.js";import"./useId-BaPuh_wS.js";import"./BasePrimitive-BrZC6uwO.js";import"./i18n.hooks-Bo4IM2WE.js";import"./useId-C7XAsmFW.js";import"./ExclamationmarkTriangleFill--zZPB5BU.js";import"./XMark-U3429H_w.js";import"./composeEventHandlers-krbYd5LM.js";const v=({origin:o,eventName:a,eventData:g})=>{window.dekoratorenAmplitude&&window.dekoratorenAmplitude({origin:o,eventName:a,eventData:g})},d=({slettMellomlagringOgLastSidePåNytt:o,appName:a})=>(v({origin:a,eventName:"besøk",eventData:{tittel:"registerdataUtdatert"}}),e.jsx(p,{pageTitle:e.jsxs(e.Fragment,{children:[a==="engangsstonad"&&e.jsx(r,{id:"RegisterdataUtdatert.Engangsstønad"}),a==="foreldrepengesoknad"&&e.jsx(r,{id:"RegisterdataUtdatert.Foreldrepenger"}),a==="svangerskapspengesoknad"&&e.jsx(r,{id:"RegisterdataUtdatert.Svangerskapspenger"})]}),children:e.jsxs(i,{gap:"space-40",children:[e.jsx(l,{variant:"warning",children:e.jsxs(i,{gap:"space-16",children:[e.jsx(m,{size:"small",level:"3",children:e.jsx(r,{id:"RegisterdataUtdatert.Heading"})}),e.jsx(c,{children:e.jsx(r,{id:"RegisterdataUtdatert.Message"})})]})}),e.jsx("div",{children:e.jsx(u,{type:"button",variant:"primary",onClick:o,children:e.jsx(r,{id:"RegisterdataUtdatert.StartPaNytt"})})})]})}));d.__docgenInfo={description:"",methods:[],displayName:"RegisterdataUtdatert",props:{slettMellomlagringOgLastSidePåNytt:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},appName:{required:!0,tsType:{name:"union",raw:`| 'engangsstonad'
| 'foreldrepengeoversikt'
| 'foreldrepengesoknad'
| 'planlegger'
| 'svangerskapspengesoknad'
| 'veiviser-fp-eller-es'
| 'veiviser-hvor-mye'`,elements:[{name:"literal",value:"'engangsstonad'"},{name:"literal",value:"'foreldrepengeoversikt'"},{name:"literal",value:"'foreldrepengesoknad'"},{name:"literal",value:"'planlegger'"},{name:"literal",value:"'svangerskapspengesoknad'"},{name:"literal",value:"'veiviser-fp-eller-es'"},{name:"literal",value:"'veiviser-hvor-mye'"}]},description:""}}};const{action:k}=__STORYBOOK_MODULE_ACTIONS__,B={title:"pages/RegisterdataUtdatert",component:d,args:{slettMellomlagringOgLastSidePåNytt:k("button-click")}},t={args:{appName:"svangerskapspengesoknad"}},s={args:{appName:"foreldrepengesoknad"}},n={args:{appName:"engangsstonad"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    appName: 'svangerskapspengesoknad'
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    appName: 'foreldrepengesoknad'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    appName: 'engangsstonad'
  }
}`,...n.parameters?.docs?.source}}};const F=["Svangerskapspenger","Foreldrepenger","Engangsstønad"];export{n as Engangsstønad,s as Foreldrepenger,t as Svangerskapspenger,F as __namedExportsOrder,B as default};

import{j as e}from"./iframe-BRTgXwdv.js";import{S as p}from"./SkjemaRotLayout-CMq-T6pL.js";import{V as i}from"./VStack-BBm_6ru_.js";import{A as l}from"./Alert-CTefx0JH.js";import{H as m,B as c}from"./Label-DG2YzOJc.js";import{M as r}from"./message-BF5dqZiv.js";import{B as u}from"./Button-CnpU1MJM.js";import"./preload-helper-D9Z9MdNV.js";import"./useId-BPMeQ04d.js";import"./BasePrimitive-vD7n9JVM.js";import"./i18n.hooks-DCyhDanz.js";import"./useId-CAsYjhGl.js";import"./ExclamationmarkTriangleFill-DOWU1v_h.js";import"./XMark-freI-_Vq.js";import"./composeEventHandlers-krbYd5LM.js";const v=({origin:o,eventName:a,eventData:g})=>{globalThis.dekoratorenAmplitude&&globalThis.dekoratorenAmplitude({origin:o,eventName:a,eventData:g})},d=({slettMellomlagringOgLastSidePåNytt:o,appName:a})=>(v({origin:a,eventName:"besøk",eventData:{tittel:"registerdataUtdatert"}}),e.jsx(p,{pageTitle:e.jsxs(e.Fragment,{children:[a==="engangsstonad"&&e.jsx(r,{id:"RegisterdataUtdatert.Engangsstønad"}),a==="foreldrepengesoknad"&&e.jsx(r,{id:"RegisterdataUtdatert.Foreldrepenger"}),a==="svangerskapspengesoknad"&&e.jsx(r,{id:"RegisterdataUtdatert.Svangerskapspenger"})]}),children:e.jsxs(i,{gap:"space-40",children:[e.jsx(l,{variant:"warning",children:e.jsxs(i,{gap:"space-16",children:[e.jsx(m,{size:"small",level:"3",children:e.jsx(r,{id:"RegisterdataUtdatert.Heading"})}),e.jsx(c,{children:e.jsx(r,{id:"RegisterdataUtdatert.Message"})})]})}),e.jsx("div",{children:e.jsx(u,{type:"button",variant:"primary",onClick:o,children:e.jsx(r,{id:"RegisterdataUtdatert.StartPaNytt"})})})]})}));d.__docgenInfo={description:"",methods:[],displayName:"RegisterdataUtdatert",props:{slettMellomlagringOgLastSidePåNytt:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},appName:{required:!0,tsType:{name:"union",raw:`| 'engangsstonad'
| 'foreldrepengeoversikt'
| 'foreldrepengesoknad'
| 'planlegger'
| 'svangerskapspengesoknad'
| 'veiviser-fp-eller-es'
| 'veiviser-hvor-mye'`,elements:[{name:"literal",value:"'engangsstonad'"},{name:"literal",value:"'foreldrepengeoversikt'"},{name:"literal",value:"'foreldrepengesoknad'"},{name:"literal",value:"'planlegger'"},{name:"literal",value:"'svangerskapspengesoknad'"},{name:"literal",value:"'veiviser-fp-eller-es'"},{name:"literal",value:"'veiviser-hvor-mye'"}]},description:""}}};const{action:k}=__STORYBOOK_MODULE_ACTIONS__,b={title:"pages/RegisterdataUtdatert",component:d,args:{slettMellomlagringOgLastSidePåNytt:k("button-click")}},t={args:{appName:"svangerskapspengesoknad"}},s={args:{appName:"foreldrepengesoknad"}},n={args:{appName:"engangsstonad"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const B=["Svangerskapspenger","Foreldrepenger","Engangsstønad"];export{n as Engangsstønad,s as Foreldrepenger,t as Svangerskapspenger,B as __namedExportsOrder,b as default};

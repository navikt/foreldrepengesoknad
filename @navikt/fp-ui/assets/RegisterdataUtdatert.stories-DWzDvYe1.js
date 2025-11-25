import{j as e}from"./iframe-DzRddHBi.js";import{S as l}from"./SkjemaRotLayout-5lSgNQ5-.js";import{V as d}from"./VStack-wnaQgufD.js";import{A as m}from"./Alert-CDL1GjUf.js";import{H as c,B as v}from"./Label-CuS6KjTH.js";import{M as r}from"./message-_JKyYTY_.js";import{B as u}from"./Button-CoTLBtTa.js";import"./preload-helper-D9Z9MdNV.js";import"./useId-B2VijiKo.js";import"./BasePrimitive-Com-2cyq.js";import"./i18n.hooks-BSzoqO0Q.js";import"./Provider-Dceg7U0I.js";import"./useId-DUhhwO93.js";import"./XMark-CC3aTdLY.js";import"./composeEventHandlers-krbYd5LM.js";const k=({origin:o,eventName:a,eventData:p})=>{{const i=typeof dekoratorenAnalytics=="function"?dekoratorenAnalytics:void 0;i&&i({origin:o,eventName:a,eventData:p})}},g=({slettMellomlagringOgLastSidePåNytt:o,appName:a})=>(k({origin:a,eventName:"besøk",eventData:{tittel:"registerdataUtdatert"}}),e.jsx(l,{pageTitle:e.jsxs(e.Fragment,{children:[a==="engangsstonad"&&e.jsx(r,{id:"RegisterdataUtdatert.Engangsstønad"}),a==="foreldrepengesoknad"&&e.jsx(r,{id:"RegisterdataUtdatert.Foreldrepenger"}),a==="svangerskapspengesoknad"&&e.jsx(r,{id:"RegisterdataUtdatert.Svangerskapspenger"})]}),children:e.jsxs(d,{gap:"space-40",children:[e.jsx(m,{variant:"warning",children:e.jsxs(d,{gap:"space-16",children:[e.jsx(c,{size:"small",level:"3",children:e.jsx(r,{id:"RegisterdataUtdatert.Heading"})}),e.jsx(v,{children:e.jsx(r,{id:"RegisterdataUtdatert.Message"})})]})}),e.jsx("div",{children:e.jsx(u,{type:"button",variant:"primary",onClick:()=>void o(),children:e.jsx(r,{id:"RegisterdataUtdatert.StartPaNytt"})})})]})}));g.__docgenInfo={description:"",methods:[],displayName:"RegisterdataUtdatert",props:{slettMellomlagringOgLastSidePåNytt:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},appName:{required:!0,tsType:{name:"union",raw:`| 'engangsstonad'
| 'foreldrepengeoversikt'
| 'foreldrepengesoknad'
| 'planlegger'
| 'svangerskapspengesoknad'
| 'veiviser-fp-eller-es'
| 'veiviser-hvor-mye'`,elements:[{name:"literal",value:"'engangsstonad'"},{name:"literal",value:"'foreldrepengeoversikt'"},{name:"literal",value:"'foreldrepengesoknad'"},{name:"literal",value:"'planlegger'"},{name:"literal",value:"'svangerskapspengesoknad'"},{name:"literal",value:"'veiviser-fp-eller-es'"},{name:"literal",value:"'veiviser-hvor-mye'"}]},description:""}}};const{action:f}=__STORYBOOK_MODULE_ACTIONS__,F={title:"pages/RegisterdataUtdatert",component:g,args:{slettMellomlagringOgLastSidePåNytt:f("button-click")}},t={args:{appName:"svangerskapspengesoknad"}},s={args:{appName:"foreldrepengesoknad"}},n={args:{appName:"engangsstonad"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const T=["Svangerskapspenger","Foreldrepenger","Engangsstønad"];export{n as Engangsstønad,s as Foreldrepenger,t as Svangerskapspenger,T as __namedExportsOrder,F as default};

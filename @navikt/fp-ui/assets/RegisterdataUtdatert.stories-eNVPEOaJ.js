import{j as e}from"./iframe-aEl9ZN-H.js";import{S as p}from"./SkjemaRotLayout-iVywrQ_b.js";import{V as i}from"./VStack-9ik-40-6.js";import"./useId-CHuReSc0.js";import{A as l}from"./Alert-CZxjczhT.js";import{H as m,B as c}from"./Label-CIJ8-zqT.js";import{M as r}from"./message-Dq76en7r.js";import{B as u}from"./Button-BbyToz6J.js";import"./BasePrimitive-DuSc5lFR.js";import"./i18n.hooks-Dt7jjO1x.js";import"./useId-D2qjjeEX.js";import"./ExclamationmarkTriangleFill-CSpSJfiR.js";import"./XMark-BK0GODAV.js";const v=({origin:o,eventName:a,eventData:g})=>{window.dekoratorenAmplitude&&window.dekoratorenAmplitude({origin:o,eventName:a,eventData:g})},d=({slettMellomlagringOgLastSidePåNytt:o,appName:a})=>(v({origin:a,eventName:"besøk",eventData:{tittel:"registerdataUtdatert"}}),e.jsx(p,{pageTitle:e.jsxs(e.Fragment,{children:[a==="engangsstonad"&&e.jsx(r,{id:"RegisterdataUtdatert.Engangsstønad"}),a==="foreldrepengesoknad"&&e.jsx(r,{id:"RegisterdataUtdatert.Foreldrepenger"}),a==="svangerskapspengesoknad"&&e.jsx(r,{id:"RegisterdataUtdatert.Svangerskapspenger"})]}),children:e.jsxs(i,{gap:"10",children:[e.jsx(l,{variant:"warning",children:e.jsxs(i,{gap:"4",children:[e.jsx(m,{size:"small",level:"3",children:e.jsx(r,{id:"RegisterdataUtdatert.Heading"})}),e.jsx(c,{children:e.jsx(r,{id:"RegisterdataUtdatert.Message"})})]})}),e.jsx("div",{children:e.jsx(u,{type:"button",variant:"primary",onClick:o,children:e.jsx(r,{id:"RegisterdataUtdatert.StartPaNytt"})})})]})}));d.__docgenInfo={description:"",methods:[],displayName:"RegisterdataUtdatert",props:{slettMellomlagringOgLastSidePåNytt:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},appName:{required:!0,tsType:{name:"union",raw:`| 'engangsstonad'
| 'foreldrepengeoversikt'
| 'foreldrepengesoknad'
| 'planlegger'
| 'svangerskapspengesoknad'
| 'veiviser-fp-eller-es'
| 'veiviser-hvor-mye'`,elements:[{name:"literal",value:"'engangsstonad'"},{name:"literal",value:"'foreldrepengeoversikt'"},{name:"literal",value:"'foreldrepengesoknad'"},{name:"literal",value:"'planlegger'"},{name:"literal",value:"'svangerskapspengesoknad'"},{name:"literal",value:"'veiviser-fp-eller-es'"},{name:"literal",value:"'veiviser-hvor-mye'"}]},description:""}}};const{action:k}=__STORYBOOK_MODULE_ACTIONS__,M={title:"pages/RegisterdataUtdatert",component:d,args:{slettMellomlagringOgLastSidePåNytt:k("button-click")}},t={args:{appName:"svangerskapspengesoknad"}},s={args:{appName:"foreldrepengesoknad"}},n={args:{appName:"engangsstonad"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};const A=["Svangerskapspenger","Foreldrepenger","Engangsstønad"];export{n as Engangsstønad,s as Foreldrepenger,t as Svangerskapspenger,A as __namedExportsOrder,M as default};

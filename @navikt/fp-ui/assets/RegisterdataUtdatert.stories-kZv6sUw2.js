import{j as e}from"./iframe-BBzCeQVY.js";import{C as h}from"./ContentWrapper-BPTKfh6M.js";import{V as i}from"./VStack-8Bsdo43i.js";import"./useId-B7ZZ3M5-.js";import{H as d,B as S}from"./Label-B2sTwWFJ.js";import{M as r}from"./message-DbO2CTr8.js";import{A as y}from"./Alert-E5N_n13y.js";import{B as R}from"./Button-B8e5izoE.js";import"./BasePrimitive-Dia0vZea.js";import"./i18n.hooks-CHeGmdZm.js";import"./useId-CseY-IsO.js";import"./ExclamationmarkTriangleFill-Cv0J-BRH.js";import"./XMark-DXoREUg0.js";const U=({origin:o,eventName:a,eventData:j})=>{window.dekoratorenAmplitude&&window.dekoratorenAmplitude({origin:o,eventName:a,eventData:j})},x=({slettMellomlagringOgLastSidePåNytt:o,appName:a})=>(U({origin:a,eventName:"besøk",eventData:{tittel:"registerdataUtdatert"}}),e.jsx(h,{children:e.jsxs(i,{gap:"10",children:[e.jsxs(d,{size:"large",level:"2",children:[a==="engangsstonad"&&e.jsx(r,{id:"RegisterdataUtdatert.Engangsstønad"}),a==="foreldrepengesoknad"&&e.jsx(r,{id:"RegisterdataUtdatert.Foreldrepenger"}),a==="svangerskapspengesoknad"&&e.jsx(r,{id:"RegisterdataUtdatert.Svangerskapspenger"})]}),e.jsx(y,{variant:"warning",children:e.jsxs(i,{gap:"4",children:[e.jsx(d,{size:"small",level:"3",children:e.jsx(r,{id:"RegisterdataUtdatert.Heading"})}),e.jsx(S,{children:e.jsx(r,{id:"RegisterdataUtdatert.Message"})})]})}),e.jsx("div",{children:e.jsx(R,{type:"button",variant:"primary",onClick:o,children:e.jsx(r,{id:"RegisterdataUtdatert.StartPaNytt"})})})]})}));x.__docgenInfo={description:"",methods:[],displayName:"RegisterdataUtdatert",props:{slettMellomlagringOgLastSidePåNytt:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},appName:{required:!0,tsType:{name:"union",raw:`| 'engangsstonad'
| 'foreldrepengeoversikt'
| 'foreldrepengesoknad'
| 'planlegger'
| 'svangerskapspengesoknad'
| 'veiviser-fp-eller-es'
| 'veiviser-hvor-mye'`,elements:[{name:"literal",value:"'engangsstonad'"},{name:"literal",value:"'foreldrepengeoversikt'"},{name:"literal",value:"'foreldrepengesoknad'"},{name:"literal",value:"'planlegger'"},{name:"literal",value:"'svangerskapspengesoknad'"},{name:"literal",value:"'veiviser-fp-eller-es'"},{name:"literal",value:"'veiviser-hvor-mye'"}]},description:""}}};const{action:N}=__STORYBOOK_MODULE_ACTIONS__,L={title:"pages/RegisterdataUtdatert",component:x,args:{slettMellomlagringOgLastSidePåNytt:N("button-click")}},t={args:{appName:"svangerskapspengesoknad"}},s={args:{appName:"foreldrepengesoknad"}},n={args:{appName:"engangsstonad"}};var g,p,l;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    appName: 'svangerskapspengesoknad'
  }
}`,...(l=(p=t.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var m,c,v;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    appName: 'foreldrepengesoknad'
  }
}`,...(v=(c=s.parameters)==null?void 0:c.docs)==null?void 0:v.source}}};var u,k,f;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    appName: 'engangsstonad'
  }
}`,...(f=(k=n.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};const P=["Svangerskapspenger","Foreldrepenger","Engangsstønad"];export{n as Engangsstønad,s as Foreldrepenger,t as Svangerskapspenger,P as __namedExportsOrder,L as default};

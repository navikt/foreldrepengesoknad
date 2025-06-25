import{j as e}from"./iframe-Da7wuCG9.js";import{S as j}from"./SkjemaRotLayout-CA0HgBYi.js";import{V as i}from"./VStack-DVKI18g7.js";import"./useId-BsvlhaqQ.js";import{A as S}from"./Alert-gvOwA06a.js";import{H as h,B as y}from"./Label-DiXIhhaN.js";import{M as r}from"./message-DYwC4BtM.js";import{B as R}from"./Button-BrH_I3ve.js";import"./BasePrimitive-BWA1khYH.js";import"./i18n.hooks-Ci83uroF.js";import"./useId-B6vZLwpg.js";import"./ExclamationmarkTriangleFill-BPdcH3KY.js";import"./XMark-Dv1uxfYs.js";const U=({origin:o,eventName:a,eventData:x})=>{window.dekoratorenAmplitude&&window.dekoratorenAmplitude({origin:o,eventName:a,eventData:x})},f=({slettMellomlagringOgLastSidePåNytt:o,appName:a})=>(U({origin:a,eventName:"besøk",eventData:{tittel:"registerdataUtdatert"}}),e.jsx(j,{pageTitle:e.jsxs(e.Fragment,{children:[a==="engangsstonad"&&e.jsx(r,{id:"RegisterdataUtdatert.Engangsstønad"}),a==="foreldrepengesoknad"&&e.jsx(r,{id:"RegisterdataUtdatert.Foreldrepenger"}),a==="svangerskapspengesoknad"&&e.jsx(r,{id:"RegisterdataUtdatert.Svangerskapspenger"})]}),children:e.jsxs(i,{gap:"10",children:[e.jsx(S,{variant:"warning",children:e.jsxs(i,{gap:"4",children:[e.jsx(h,{size:"small",level:"3",children:e.jsx(r,{id:"RegisterdataUtdatert.Heading"})}),e.jsx(y,{children:e.jsx(r,{id:"RegisterdataUtdatert.Message"})})]})}),e.jsx("div",{children:e.jsx(R,{type:"button",variant:"primary",onClick:o,children:e.jsx(r,{id:"RegisterdataUtdatert.StartPaNytt"})})})]})}));f.__docgenInfo={description:"",methods:[],displayName:"RegisterdataUtdatert",props:{slettMellomlagringOgLastSidePåNytt:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},appName:{required:!0,tsType:{name:"union",raw:`| 'engangsstonad'
| 'foreldrepengeoversikt'
| 'foreldrepengesoknad'
| 'planlegger'
| 'svangerskapspengesoknad'
| 'veiviser-fp-eller-es'
| 'veiviser-hvor-mye'`,elements:[{name:"literal",value:"'engangsstonad'"},{name:"literal",value:"'foreldrepengeoversikt'"},{name:"literal",value:"'foreldrepengesoknad'"},{name:"literal",value:"'planlegger'"},{name:"literal",value:"'svangerskapspengesoknad'"},{name:"literal",value:"'veiviser-fp-eller-es'"},{name:"literal",value:"'veiviser-hvor-mye'"}]},description:""}}};const{action:N}=__STORYBOOK_MODULE_ACTIONS__,q={title:"pages/RegisterdataUtdatert",component:f,args:{slettMellomlagringOgLastSidePåNytt:N("button-click")}},t={args:{appName:"svangerskapspengesoknad"}},s={args:{appName:"foreldrepengesoknad"}},n={args:{appName:"engangsstonad"}};var d,g,p;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    appName: 'svangerskapspengesoknad'
  }
}`,...(p=(g=t.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var l,m,c;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    appName: 'foreldrepengesoknad'
  }
}`,...(c=(m=s.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var u,v,k;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    appName: 'engangsstonad'
  }
}`,...(k=(v=n.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};const z=["Svangerskapspenger","Foreldrepenger","Engangsstønad"];export{n as Engangsstønad,s as Foreldrepenger,t as Svangerskapspenger,z as __namedExportsOrder,q as default};

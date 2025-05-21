import{a as h}from"./index-B-lxVbXh.js";import{j as e}from"./jsx-runtime-D_zvdyIk.js";import"./index-X1_bwSmj.js";import{C as y}from"./ContentWrapper-ClUvCUNW.js";import{V as i}from"./VStack-32lFDCOV.js";import"./index-D4lIrffr.js";import"./useId-Cx4ni8Zd.js";import{H as d,B as S}from"./Label-F8KyGrrS.js";import{M as a}from"./message--3APzT3H.js";import{A as R}from"./Alert-CBhksBkd.js";import{B as U}from"./Button-DlmMXGGp.js";import"./v4-CtRu48qb.js";import"./BasePrimitive-uyBWxskk.js";import"./i18n.hooks-BZOehk24.js";import"./useId-Dtjwz75n.js";import"./ExclamationmarkTriangleFill-ApHw9iN7.js";import"./XMark-frtXudgA.js";const N=({origin:o,eventName:r,eventData:j})=>{window.dekoratorenAmplitude&&window.dekoratorenAmplitude({origin:o,eventName:r,eventData:j})},x=({slettMellomlagringOgLastSidePåNytt:o,appName:r})=>(N({origin:r,eventName:"besøk",eventData:{tittel:"registerdataUtdatert"}}),e.jsx(y,{children:e.jsxs(i,{gap:"10",children:[e.jsxs(d,{size:"large",level:"2",children:[r==="engangsstonad"&&e.jsx(a,{id:"RegisterdataUtdatert.Engangsstønad"}),r==="foreldrepengesoknad"&&e.jsx(a,{id:"RegisterdataUtdatert.Foreldrepenger"}),r==="svangerskapspengesoknad"&&e.jsx(a,{id:"RegisterdataUtdatert.Svangerskapspenger"})]}),e.jsx(R,{variant:"warning",children:e.jsxs(i,{gap:"4",children:[e.jsx(d,{size:"small",level:"3",children:e.jsx(a,{id:"RegisterdataUtdatert.Heading"})}),e.jsx(S,{children:e.jsx(a,{id:"RegisterdataUtdatert.Message"})})]})}),e.jsx("div",{children:e.jsx(U,{type:"button",variant:"primary",onClick:o,children:e.jsx(a,{id:"RegisterdataUtdatert.StartPaNytt"})})})]})}));x.__docgenInfo={description:"",methods:[],displayName:"RegisterdataUtdatert",props:{slettMellomlagringOgLastSidePåNytt:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},appName:{required:!0,tsType:{name:"union",raw:`| 'engangsstonad'
| 'foreldrepengeoversikt'
| 'foreldrepengesoknad'
| 'planlegger'
| 'svangerskapspengesoknad'
| 'veiviser-fp-eller-es'
| 'veiviser-hvor-mye'`,elements:[{name:"literal",value:"'engangsstonad'"},{name:"literal",value:"'foreldrepengeoversikt'"},{name:"literal",value:"'foreldrepengesoknad'"},{name:"literal",value:"'planlegger'"},{name:"literal",value:"'svangerskapspengesoknad'"},{name:"literal",value:"'veiviser-fp-eller-es'"},{name:"literal",value:"'veiviser-hvor-mye'"}]},description:""}}};const D={title:"pages/RegisterdataUtdatert",component:x,args:{slettMellomlagringOgLastSidePåNytt:h("button-click")}},t={args:{appName:"svangerskapspengesoknad"}},s={args:{appName:"foreldrepengesoknad"}},n={args:{appName:"engangsstonad"}};var p,g,l;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    appName: 'svangerskapspengesoknad'
  }
}`,...(l=(g=t.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};var m,c,v;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    appName: 'foreldrepengesoknad'
  }
}`,...(v=(c=s.parameters)==null?void 0:c.docs)==null?void 0:v.source}}};var u,k,f;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    appName: 'engangsstonad'
  }
}`,...(f=(k=n.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};const I=["Svangerskapspenger","Foreldrepenger","Engangsstønad"];export{n as Engangsstønad,s as Foreldrepenger,t as Svangerskapspenger,I as __namedExportsOrder,D as default};

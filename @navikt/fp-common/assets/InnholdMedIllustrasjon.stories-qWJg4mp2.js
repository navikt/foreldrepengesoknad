import{j as e}from"./jsx-runtime-Du8NFWEI.js";import{r as S}from"./index-Dl6G-zuu.js";import{b as o}from"./bemUtils-CenTME4X.js";import{g as D}from"./guid-CsArkN6i.js";import{H as U}from"./Label-DWFI51kd.js";import{S as z}from"./Sirkelmaske-DhtyqE3J.js";import"./clsx-B-dksMZM.js";const g=({tittel:r,illustrasjoner:s,infoboks:c,children:M})=>{const n=o("innholdMedIllustrasjon");return e.jsxs("div",{className:n.classNames(n.block,n.modifierConditional("medIllustrasjoner",s!==void 0)),children:[e.jsxs("div",{className:n.element("contentWrapper"),children:[e.jsx("div",{className:n.element("headerWrapper"),children:e.jsxs("header",{children:[e.jsx(U,{size:"medium",level:"3",className:n.element("tittel"),children:r}),c!==void 0&&c]})}),e.jsx("div",{className:n.element("content"),children:M})]}),s&&e.jsx("div",{className:n.element("illustrasjoner"),role:"presentation","aria-hidden":!0,children:S.Children.map(s,_=>e.jsx("div",{className:n.element("illustrasjon"),children:_},D()))})]})},v=g;g.__docgenInfo={description:"",methods:[],displayName:"InnholdMedIllustrasjon"};const N=r=>e.jsx("svg",{focusable:"false",role:"img","aria-hidden":"true",width:48,height:42,...r,children:e.jsxs("g",{fill:"none",fillRule:"evenodd",children:[e.jsx("path",{d:"M48 36a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V7h48v29z",fill:"#FFF",stroke:"#dfdfdf",strokeWidth:"1"}),e.jsx("path",{d:"M6 0h36a6 6 0 0 1 6 6v4H0V6a6 6 0 0 1 6-6zm29.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-23 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",fill:"#BA3A26"})]})});N.__docgenInfo={description:"",methods:[],displayName:"KalenderBakgrunnIkon"};const b=({uker:r})=>{const s=o("antallUkerKalenderIkon");return e.jsxs("div",{className:s.classNames(s.block,s.modifierConditional("over99",r>99)),children:[e.jsx("div",{className:s.element("ikon"),children:e.jsx(N,{})}),e.jsx("div",{className:s.element("uker"),children:r})]})};b.__docgenInfo={description:"",methods:[],displayName:"AntallUkerKalenderIkon"};const d=({uker:r})=>{const s=o("ukerSirkel");return e.jsx("div",{className:s.block,children:e.jsx("div",{className:s.element("ikon"),children:e.jsx(z,{diameter:"5rem",children:e.jsx(b,{uker:r})})})})};d.__docgenInfo={description:"",methods:[],displayName:"UkerSirkel"};const F={title:"components/InnholdMedIllustrasjon",component:v},i=r=>e.jsx(v,{...r}),a=i.bind({});a.args={tittel:"Dette er en tittel"};const l=i.bind({});l.args={tittel:"Dette er en tittel",illustrasjoner:[e.jsx(d,{uker:10},"uker")]};const t=i.bind({});t.args={tittel:"Dette er en tittel",illustrasjoner:[e.jsx(d,{uker:10},"uker")],infoboks:e.jsx("div",{children:"Dette er en infoboks"})};var m,u,h;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:"args => <InnholdMedIllustrasjon {...args} />",...(h=(u=a.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var j,p,I;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:"args => <InnholdMedIllustrasjon {...args} />",...(I=(p=l.parameters)==null?void 0:p.docs)==null?void 0:I.source}}};var k,x,f;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:"args => <InnholdMedIllustrasjon {...args} />",...(f=(x=t.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};const O=["Default","MedIllustrasjon","MedIllustrasjonOgInfoboks"];export{a as Default,l as MedIllustrasjon,t as MedIllustrasjonOgInfoboks,O as __namedExportsOrder,F as default};

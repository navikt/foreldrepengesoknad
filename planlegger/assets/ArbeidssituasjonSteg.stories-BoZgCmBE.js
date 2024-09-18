import{j as o}from"./VStack-1BYz4cx9.js";import{a as b}from"./chunk-454WOBUV-CM0pFb8Z.js";import{M as j,P as U,C as i}from"./usePlanleggerNavigator-B8FBHUH8.js";import{P as f}from"./routes-Cp-2uEwO.js";import{S as s}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{i as k}from"./amplitude-oEVdNv_j.js";import{A as R}from"./ArbeidssituasjonSteg-BnIVUbcA.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./Label-xTGzdijQ.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-Dtg6gkcN.js";import"./VeiviserPage-CD2w7MX0.js";import"./index-BRV0Se7Z.js";import"./BlueRadioGroup-fFiIFmsr.js";import"./StepButtonsHookForm-BAUb9Tg7.js";import"./Calendar-CYQP7Vnt.js";import"./index-CYM-y3Gt.js";import"./Responsive-CxM9YB4e.js";import"./ArrowLeft-DcKJ7GdH.js";import"./PlanleggerStepPage-DCecJSC-.js";import"./satserUtils-tEGAV9ZK.js";import"./validation-4HO0J-zV.js";import"./dateFormValidation-CUQTHxD6.js";import"./stringUtils-DWuGC-tf.js";import"./Spacer-BW3tgveW.js";const t={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},h=({hvemPlanlegger:S,gåTilNesteSide:F=b("button-click"),satser:O,locale:_})=>(k(),o.jsx(j,{initialEntries:[f.ARBEIDSSITUASJON],children:o.jsx(U,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:S},onDispatch:F,children:o.jsx(R,{satser:O,locale:_})})})),nr={title:"steg/ArbeidssituasjonSteg",component:R,render:h},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_FAR},satser:t}},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:s.MOR},satser:t}},a={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:"Klara Utvikler",type:s.MOR_OG_MEDMOR},satser:t}},n={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:s.FAR_OG_FAR},satser:t}};var l,m,p;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var c,d,g;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    satser: DEFAULT_SATSER
  }
}`,...(g=(d=e.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var v,u,A;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Esther Utvikler',
      navnPåMedmor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    },
    satser: DEFAULT_SATSER
  }
}`,...(A=(u=a.parameters)==null?void 0:u.docs)==null?void 0:A.source}}};var M,P,E;n.parameters={...n.parameters,docs:{...(M=n.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(E=(P=n.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};const sr=["ArbeidssituasjonMorOgFar","ArbeidssituasjonAleneforsørger","ArbeidssituasjonMorOgMedmor","ArbeidssituasjonFarOgFar"];export{e as ArbeidssituasjonAleneforsørger,n as ArbeidssituasjonFarOgFar,r as ArbeidssituasjonMorOgFar,a as ArbeidssituasjonMorOgMedmor,sr as __namedExportsOrder,nr as default};

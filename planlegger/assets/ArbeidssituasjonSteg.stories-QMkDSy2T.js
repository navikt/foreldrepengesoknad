import{j as o}from"./VStack-1BYz4cx9.js";import{a as _}from"./chunk-454WOBUV-CM0pFb8Z.js";import{M as j,P as U,C as i}from"./usePlanleggerNavigator-CSXZAriH.js";import{P as f}from"./routes-Cp-2uEwO.js";import{S as n}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{i as k}from"./Arbeidssituasjon-CIfsLvvg.js";import{A as R}from"./ArbeidssituasjonSteg-CeMcZd3V.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./Label-xTGzdijQ.js";import"./barnetUtils-Dtg6gkcN.js";import"./VeiviserPage-CkT1vu0n.js";import"./index-BRV0Se7Z.js";import"./BlueRadioGroup-HcwezNgf.js";import"./StepButtonsHookForm-CFhcz6Nn.js";import"./Calendar-CYQP7Vnt.js";import"./index-CYM-y3Gt.js";import"./Responsive-CxM9YB4e.js";import"./ArrowLeft-DcKJ7GdH.js";import"./PlanleggerStepPage-mJcSQXyF.js";import"./satserUtils-tEGAV9ZK.js";import"./validation-4HO0J-zV.js";import"./dateFormValidation-CUQTHxD6.js";import"./Spacer-BW3tgveW.js";const t={engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}],grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}]},h=({hvemPlanlegger:S,gåTilNesteSide:F=_("button-click"),satser:O})=>(k(),o.jsx(j,{initialEntries:[f.ARBEIDSSITUASJON],children:o.jsx(U,{initialState:{[i.OM_BARNET]:{erFødsel:!0,erBarnetFødt:!1,antallBarn:"1",termindato:"2024-01-01"},[i.HVEM_PLANLEGGER]:S},onDispatch:F,children:o.jsx(R,{satser:O})})})),rr={title:"steg/ArbeidssituasjonSteg",component:R,render:h},r={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:n.MOR_OG_FAR},satser:t}},e={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:n.MOR},satser:t}},a={args:{hvemPlanlegger:{navnPåMor:"Esther Utvikler",navnPåMedmor:"Klara Utvikler",type:n.MOR_OG_MEDMOR},satser:t}},s={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMedfar:"Anders Utvikler",type:n.FAR_OG_FAR},satser:t}};var m,p,l;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(l=(p=r.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var d,g,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    satser: DEFAULT_SATSER
  }
}`,...(c=(g=e.parameters)==null?void 0:g.docs)==null?void 0:c.source}}};var v,u,A;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåMor: 'Esther Utvikler',
      navnPåMedmor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    },
    satser: DEFAULT_SATSER
  }
}`,...(A=(u=a.parameters)==null?void 0:u.docs)==null?void 0:A.source}}};var M,P,E;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMedfar: 'Anders Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    satser: DEFAULT_SATSER
  }
}`,...(E=(P=s.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};const er=["ArbeidssituasjonMorOgFar","ArbeidssituasjonAleneforsørger","ArbeidssituasjonMorOgMedmor","ArbeidssituasjonFarOgFar"];export{e as ArbeidssituasjonAleneforsørger,s as ArbeidssituasjonFarOgFar,r as ArbeidssituasjonMorOgFar,a as ArbeidssituasjonMorOgMedmor,er as __namedExportsOrder,rr as default};

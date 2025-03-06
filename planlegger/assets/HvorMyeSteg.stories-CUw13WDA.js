import{j as n}from"./jsx-runtime-CLpGMVip.js";import{a as R}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as A,P as b,C as t}from"./usePlanleggerNavigator-CAGw89QL.js";import{P}from"./routes-Cyl7_Mgv.js";import{A as d}from"./Arbeidssituasjon-i2z_eSVB.js";import{S as u}from"./HvemPlanleggerUtils-DPo5gGnH.js";import{H as a}from"./HvorMyeSteg-DJc_h5wj.js";import"./v4-CtRu48qb.js";import"./index-CR__hKHy.js";import"./VeiviserPage-CDSK3RL6.js";import"./VStack-2apmvZh_.js";import"./barnetUtils-Bsg9MP1N.js";import"./barnType-CnRI8jWg.js";import"./stringUtils-DApHD7Y2.js";import"./PlanleggerStepPage-BiQLK47S.js";import"./StepButtonsHookForm-DPDTFQLl.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./Responsive-B-Uwxu87.js";import"./hvemHarRettUtils-BiLrxKWv.js";import"./validation-DYlyn1BB.js";import"./dateFormValidation-ZqQr7vQr.js";import"./satserUtils-CE-H0avb.js";import"./Wallet-CEpMmkt_.js";import"./Spacer-DmBY75Fg.js";const c={grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}],engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}]},Q={title:"steg/HvorMyeSteg",component:a,render:({hvorMye:g,hvemPlanlegger:v,arbeidssituasjon:S,gåTilNesteSide:E=R("button-click"),locale:M,satser:f})=>n.jsx(A,{initialEntries:[P.HVOR_MYE],children:n.jsx(b,{initialState:{[t.HVOR_MYE]:g,[t.HVEM_PLANLEGGER]:v,[t.ARBEIDSSITUASJON]:S},onDispatch:E,children:n.jsx(a,{locale:M,satser:f})})})},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:u.MOR_OG_FAR},arbeidssituasjon:{status:d.JOBBER,jobberAnnenPart:!0},satser:c,hvorMye:{lønnSøker1:void 0,lønnSøker2:void 0}}},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:u.MOR},arbeidssituasjon:{status:d.JOBBER},satser:c,hvorMye:{lønnSøker1:void 0}}};var o,s,i;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER,
      jobberAnnenPart: true
    },
    satser: DEFAULT_SATSER,
    hvorMye: {
      lønnSøker1: undefined,
      lønnSøker2: undefined
    }
  }
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var m,l,p;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    satser: DEFAULT_SATSER,
    hvorMye: {
      lønnSøker1: undefined
    }
  }
}`,...(p=(l=e.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const W=["FlereForsørgere","AleneforsørgerMor"];export{e as AleneforsørgerMor,r as FlereForsørgere,W as __namedExportsOrder,Q as default};

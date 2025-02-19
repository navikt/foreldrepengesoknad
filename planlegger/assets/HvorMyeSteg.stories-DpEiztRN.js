import{j as n}from"./jsx-runtime-CLpGMVip.js";import{a as R}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as A,P as b,C as t}from"./usePlanleggerNavigator-DOqh0vif.js";import{P}from"./routes-Cyl7_Mgv.js";import{A as d}from"./Arbeidssituasjon-i2z_eSVB.js";import{S as u}from"./HvemPlanleggerUtils-BK9nF1ca.js";import{H as a}from"./HvorMyeSteg-D65slHhF.js";import"./v4-CtRu48qb.js";import"./index-CR__hKHy.js";import"./VeiviserPage-C7O1QSdG.js";import"./VStack-BfPiYV8A.js";import"./barnetUtils-q5P1ZqAS.js";import"./barnType-CnRI8jWg.js";import"./PlanleggerStepPage-tAiaGuO2.js";import"./StepButtonsHookForm-mKptxFxi.js";import"./Responsive-Cl7tMJT2.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./hvemHarRettUtils-C-poRxZI.js";import"./validation-DYlyn1BB.js";import"./dateFormValidation-3CrpAqpr.js";import"./satserUtils-7zqjTyZ2.js";import"./Wallet-Dt1XIoId.js";import"./Spacer-zSi7sa7G.js";const c={grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}],engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}]},z={title:"steg/HvorMyeSteg",component:a,render:({hvorMye:g,hvemPlanlegger:v,arbeidssituasjon:S,gåTilNesteSide:E=R("button-click"),locale:M,satser:f})=>n.jsx(A,{initialEntries:[P.HVOR_MYE],children:n.jsx(b,{initialState:{[t.HVOR_MYE]:g,[t.HVEM_PLANLEGGER]:v,[t.ARBEIDSSITUASJON]:S},onDispatch:E,children:n.jsx(a,{locale:M,satser:f})})})},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:u.MOR_OG_FAR},arbeidssituasjon:{status:d.JOBBER,jobberAnnenPart:!0},satser:c,hvorMye:{lønnSøker1:void 0,lønnSøker2:void 0}}},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:u.MOR},arbeidssituasjon:{status:d.JOBBER},satser:c,hvorMye:{lønnSøker1:void 0}}};var o,s,i;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(p=(l=e.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const Q=["FlereForsørgere","AleneforsørgerMor"];export{e as AleneforsørgerMor,r as FlereForsørgere,Q as __namedExportsOrder,z as default};

import{j as n}from"./jsx-runtime-DwRxq3ZX.js";import{a as R}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as A,P as b,C as t}from"./usePlanleggerNavigator-D8MRbo-c.js";import{P}from"./routes-gnI_NAHe.js";import{A as d}from"./Arbeidssituasjon-i2z_eSVB.js";import{S as u}from"./HvemPlanleggerUtils-BK9nF1ca.js";import{H as o}from"./HvorMyeSteg-CQNfPMck.js";import"./index-BX3iQpgp.js";import"./v4-CtRu48qb.js";import"./UttaksdagenString-BukZE9W5.js";import"./VStack-D5W2V_Wo.js";import"./barnetUtils-CSRVk0a8.js";import"./barnType-CnRI8jWg.js";import"./PlanleggerStepPage-B4mv9i7n.js";import"./VeiviserPage-D4tcb8_M.js";import"./StepButtonsHookForm-BshiUIx4.js";import"./Responsive-Ce8eyPol.js";import"./index-B1dLepta.js";import"./useDescendant-CwE7bbj1.js";import"./ArrowLeft-KP0Gek8u.js";import"./ArrowRight-8JtNjBzF.js";import"./stringUtils-BLFzASq_.js";import"./hvemHarRettUtils-C-poRxZI.js";import"./validation-C6jaRJB5.js";import"./dateFormValidation-Bp6HZMTm.js";import"./satserUtils-Cswv5nKA.js";import"./Wallet-B2EmqHGK.js";import"./Spacer-BzMIvYka.js";const c={grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}],engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}]},Z={title:"steg/HvorMyeSteg",component:o,render:({hvorMye:g,hvemPlanlegger:v,arbeidssituasjon:S,gåTilNesteSide:E=R("button-click"),locale:M,satser:f})=>n.jsx(A,{initialEntries:[P.HVOR_MYE],children:n.jsx(b,{initialState:{[t.HVOR_MYE]:g,[t.HVEM_PLANLEGGER]:v,[t.ARBEIDSSITUASJON]:S},onDispatch:E,children:n.jsx(o,{locale:M,satser:f})})})},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:u.MOR_OG_FAR},arbeidssituasjon:{status:d.JOBBER,jobberAnnenPart:!0},satser:c,hvorMye:{lønnSøker1:void 0,lønnSøker2:void 0}}},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:u.MOR},arbeidssituasjon:{status:d.JOBBER},satser:c,hvorMye:{lønnSøker1:void 0}}};var a,s,i;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(p=(l=e.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const $=["FlereForsørgere","AleneforsørgerMor"];export{e as AleneforsørgerMor,r as FlereForsørgere,$ as __namedExportsOrder,Z as default};

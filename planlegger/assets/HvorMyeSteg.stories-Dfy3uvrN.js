import{j as n}from"./jsx-runtime-CLpGMVip.js";import{a as R}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as S,P as A,C as t}from"./usePlanleggerNavigator-D71TYjW0.js";import{P as b}from"./routes-Cyl7_Mgv.js";import{A as d}from"./Arbeidssituasjon-i2z_eSVB.js";import"./VeiviserPage-w-Nd3-7v.js";import{H as g}from"./HvemPlanleggerType-CugjyLV2.js";import{H as a}from"./HvorMyeSteg-BntZ35mQ.js";import"./v4-CtRu48qb.js";import"./index-CR__hKHy.js";import"./HvemPlanleggerUtils-CuWBEANq.js";import"./stringUtils-DApHD7Y2.js";import"./barnetUtils-CqUqCI0t.js";import"./barnType-CnRI8jWg.js";import"./VStack-2apmvZh_.js";import"./PlanleggerStepPage-BAnTZ_4-.js";import"./StepButtonsHookForm-B7FbpMch.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./Responsive-B-Uwxu87.js";import"./hvemHarRettUtils-Bxt4aTQI.js";import"./validation-DYlyn1BB.js";import"./dateFormValidation-DRA3PDrN.js";import"./satserUtils-CO5auz8I.js";import"./Wallet-CEpMmkt_.js";import"./Spacer-DmBY75Fg.js";const u={grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}],engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}]},W={title:"steg/HvorMyeSteg",component:a,render:({hvorMye:v,hvemPlanlegger:c,arbeidssituasjon:E,gåTilNesteSide:M=R("button-click"),locale:f,satser:P})=>n.jsx(S,{initialEntries:[b.HVOR_MYE],children:n.jsx(A,{initialState:{[t.HVOR_MYE]:v,[t.HVEM_PLANLEGGER]:c,[t.ARBEIDSSITUASJON]:E},onDispatch:M,children:n.jsx(a,{locale:f,satser:P})})})},e={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:g.MOR_OG_FAR},arbeidssituasjon:{status:d.JOBBER,jobberAnnenPart:!0},satser:u,hvorMye:{lønnSøker1:void 0,lønnSøker2:void 0}}},r={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:g.MOR},arbeidssituasjon:{status:d.JOBBER},satser:u,hvorMye:{lønnSøker1:void 0}}};var o,s,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
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
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var m,l,p;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
    },
    arbeidssituasjon: {
      status: Arbeidsstatus.JOBBER
    },
    satser: DEFAULT_SATSER,
    hvorMye: {
      lønnSøker1: undefined
    }
  }
}`,...(p=(l=r.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const X=["FlereForsørgere","AleneforsørgerMor"];export{r as AleneforsørgerMor,e as FlereForsørgere,X as __namedExportsOrder,W as default};

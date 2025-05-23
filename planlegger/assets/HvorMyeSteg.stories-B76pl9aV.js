import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{a as R}from"./index-B-lxVbXh.js";import{M as S,P as A,C as t}from"./usePlanleggerNavigator-CE_6AcPv.js";import{P as f}from"./routes-Cyl7_Mgv.js";import{A as g}from"./Arbeidssituasjon-i2z_eSVB.js";import"./VeiviserPage-CHSQEW6u.js";import{H as d}from"./HvemPlanleggerUtils-BYHEAsy1.js";import{H as a}from"./HvorMyeSteg-DzUaR7-R.js";import"./v4-CtRu48qb.js";import"./index-DQLiH3RP.js";import"./barnetUtils-DYBBskKi.js";import"./barnType-CnRI8jWg.js";import"./VStack-05Ww9A8B.js";import"./stringUtils-DApHD7Y2.js";import"./PlanleggerStepPage-ChY5fp_x.js";import"./StepButtonsHookForm-DAulkPa7.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./Responsive-CnWLTDCQ.js";import"./hvemHarRettUtils-C8lIuyXR.js";import"./validation-Dy1ue2_T.js";import"./dateFormValidation-DphE57k6.js";import"./satserUtils-9JOgwpQY.js";import"./Wallet-BDcZwlms.js";import"./Spacer-C5GDfzOr.js";const v={grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}],engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}]},z={title:"steg/HvorMyeSteg",component:a,render:({hvorMye:u,hvemPlanlegger:c,arbeidssituasjon:E,gåTilNesteSide:M=R("button-click"),satser:P})=>n.jsx(S,{initialEntries:[f.HVOR_MYE],children:n.jsx(A,{initialState:{[t.HVOR_MYE]:u,[t.HVEM_PLANLEGGER]:c,[t.ARBEIDSSITUASJON]:E},onDispatch:M,children:n.jsx(a,{satser:P})})})},r={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:d.MOR_OG_FAR},arbeidssituasjon:{status:g.JOBBER,jobberAnnenPart:!0},satser:v,hvorMye:{lønnSøker1:void 0,lønnSøker2:void 0}}},e={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:d.MOR},arbeidssituasjon:{status:g.JOBBER},satser:v,hvorMye:{lønnSøker1:void 0}}};var o,s,i;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
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
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var m,p,l;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
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
}`,...(l=(p=e.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};const Q=["FlereForsørgere","AleneforsørgerMor"];export{e as AleneforsørgerMor,r as FlereForsørgere,Q as __namedExportsOrder,z as default};

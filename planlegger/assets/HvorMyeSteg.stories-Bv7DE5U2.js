import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{a as S}from"./index-B-lxVbXh.js";import{M as A,P as b,C as t}from"./usePlanleggerNavigator-CA8DfEuq.js";import{P as f}from"./routes-Cyl7_Mgv.js";import{A as g}from"./Arbeidssituasjon-i2z_eSVB.js";import"./VeiviserPage-8Wpng40q.js";import{H as d}from"./HvemPlanleggerType-CugjyLV2.js";import{H as o}from"./HvorMyeSteg-C_yVW7q3.js";import"./v4-CtRu48qb.js";import"./index-DQLiH3RP.js";import"./HvemPlanleggerUtils-DWx8ZgD2.js";import"./stringUtils-DApHD7Y2.js";import"./barnetUtils-ZKU_BOQQ.js";import"./barnType-CnRI8jWg.js";import"./VStack-TyG4_st1.js";import"./PlanleggerStepPage-BewzdlxV.js";import"./StepButtonsHookForm-877k_zyp.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./Responsive-3gl0cHrT.js";import"./hvemHarRettUtils-Qkqdw2Ow.js";import"./validation-Dy1ue2_T.js";import"./dateFormValidation-BJvWp8x7.js";import"./satserUtils-0x8Oi8-g.js";import"./Wallet-iMv-kDkg.js";import"./Spacer-AgKh28B3.js";const v={grunnbeløp:[{fom:"01.05.2024",verdi:124028},{fom:"01.05.2023",verdi:118620}],engangstønad:[{fom:"01.01.2023",verdi:92648},{fom:"01.01.2021",verdi:90300}]},W={title:"steg/HvorMyeSteg",component:o,render:({hvorMye:u,hvemPlanlegger:c,arbeidssituasjon:E,gåTilNesteSide:M=S("button-click"),locale:P,satser:R})=>n.jsx(A,{initialEntries:[f.HVOR_MYE],children:n.jsx(b,{initialState:{[t.HVOR_MYE]:u,[t.HVEM_PLANLEGGER]:c,[t.ARBEIDSSITUASJON]:E},onDispatch:M,children:n.jsx(o,{locale:P,satser:R})})})},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:d.MOR_OG_FAR},arbeidssituasjon:{status:g.JOBBER,jobberAnnenPart:!0},satser:v,hvorMye:{lønnSøker1:void 0,lønnSøker2:void 0}}},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:d.MOR},arbeidssituasjon:{status:g.JOBBER},satser:v,hvorMye:{lønnSøker1:void 0}}};var a,s,i;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var m,l,p;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(p=(l=e.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};const X=["FlereForsørgere","AleneforsørgerMor"];export{e as AleneforsørgerMor,r as FlereForsørgere,X as __namedExportsOrder,W as default};

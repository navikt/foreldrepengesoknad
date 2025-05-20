import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{a as O}from"./index-B-lxVbXh.js";import{M as A,P as _,C as l}from"./usePlanleggerNavigator-CIgPl4Ow.js";import{P as b}from"./routes-Cyl7_Mgv.js";import"./VeiviserPage-DITRGeTc.js";import{H as n}from"./HvemPlanleggerType-CugjyLV2.js";import{B as s}from"./BarnehageplassSteg-CgkuMGYl.js";import"./v4-CtRu48qb.js";import"./index-DQLiH3RP.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./HvemPlanleggerUtils-e6RDUuR2.js";import"./stringUtils-DApHD7Y2.js";import"./barnetUtils-d6o-o0G_.js";import"./barnType-CnRI8jWg.js";import"./VStack-TyG4_st1.js";import"./PlanleggerStepPage-EiyF908T.js";import"./uttakUtils-D_j6yNz8.js";import"./KvoteOppsummering-D-aDcn8_.js";import"./StepButtonsHookForm-C859M-MZ.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./Responsive-3gl0cHrT.js";import"./dateFormValidation-un0LeywX.js";import"./validation-Dy1ue2_T.js";import"./Briefcase-XmJBY6Co.js";import"./ExpansionCard-BlEq64AH.js";import"./Exclamationmark-CaIgOQhv.js";import"./Checkmark-BGP8o-VH.js";import"./useScrollBehaviour-CPpBIkgK.js";import"./BabyWrapped-CLrMLG43.js";import"./Information-CKlGeGdR.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";const se={title:"steg/BarnehageplassSteg",component:s,render:({hvemPlanlegger:f,omBarnet:M,gåTilNesteSide:R=O("button-click"),locale:k})=>o.jsx(A,{initialEntries:[b.ARBEIDSSITUASJON],children:o.jsx(_,{initialState:{[l.HVEM_PLANLEGGER]:f,[l.OM_BARNET]:M},onDispatch:R,children:o.jsx(s,{locale:k})})})},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-12-01",antallBarn:"1"}}},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:n.MOR_OG_FAR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-09-01",termindato:"2024-09-03",antallBarn:"1"}}},t={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:n.MOR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-01-01",termindato:"2023-08-01",antallBarn:"2"}}},a={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{antallBarn:"1",erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2026-01-11",overtakelsesdato:"2026-03-01"},uttaksdata:{familiehendelsedato:"2026-03-01",startdatoPeriode1:"2026-03-01",sluttdatoPeriode1:"2027-01-01",startdatoPeriode2:"2027-01-02",sluttdatoPeriode2:"2027-06-01"}}};var m,i,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-12-01',
      antallBarn: '1'
    }
  }
}`,...(d=(i=e.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var p,g,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: true,
      erFødsel: true,
      fødselsdato: '2024-09-01',
      termindato: '2024-09-03',
      antallBarn: '1'
    }
  }
}`,...(u=(g=r.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var F,c,v;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR
    },
    omBarnet: {
      erBarnetFødt: true,
      erFødsel: true,
      fødselsdato: '2024-01-01',
      termindato: '2023-08-01',
      antallBarn: '2'
    }
  }
}`,...(v=(c=t.parameters)==null?void 0:c.docs)==null?void 0:v.source}}};var P,B,S;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    omBarnet: {
      antallBarn: '1',
      erFødsel: false,
      erBarnetFødt: true,
      fødselsdato: '2026-01-11',
      overtakelsesdato: '2026-03-01'
    },
    uttaksdata: {
      familiehendelsedato: '2026-03-01',
      startdatoPeriode1: '2026-03-01',
      sluttdatoPeriode1: '2027-01-01',
      startdatoPeriode2: '2027-01-02',
      sluttdatoPeriode2: '2027-06-01'
    }
  }
}`,...(S=(B=a.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};const me=["FlereForsørgereBarnTerminDesemberStartAugustOmToÅr","FlereForsørgereBarnFødtSeptemberStartSeptember","AleneforsørgerToBarnFødtJanuarStartAugust","FlereForsørgereAdoptertBarnFødtJanuarStartJuni2027"];export{t as AleneforsørgerToBarnFødtJanuarStartAugust,a as FlereForsørgereAdoptertBarnFødtJanuarStartJuni2027,r as FlereForsørgereBarnFødtSeptemberStartSeptember,e as FlereForsørgereBarnTerminDesemberStartAugustOmToÅr,me as __namedExportsOrder,se as default};

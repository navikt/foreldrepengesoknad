import{j as o}from"./jsx-runtime-D_zvdyIk.js";import{a as k}from"./index-B-lxVbXh.js";import{M as O,P as A,C as s}from"./usePlanleggerNavigator-79nakA9I.js";import{P as _}from"./routes-Cyl7_Mgv.js";import"./VeiviserPage-CHSQEW6u.js";import{H as n}from"./HvemPlanleggerUtils-BRHn8u1k.js";import{B as l}from"./BarnehageplassSteg-Cfyk5x0J.js";import"./v4-CtRu48qb.js";import"./index-DQLiH3RP.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-DYBBskKi.js";import"./barnType-CnRI8jWg.js";import"./VStack-05Ww9A8B.js";import"./stringUtils-DApHD7Y2.js";import"./PlanleggerStepPage-ChY5fp_x.js";import"./uttakUtils-C8aTownO.js";import"./KvoteOppsummering-ygVuYgOF.js";import"./StepButtonsHookForm-DAulkPa7.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./Responsive-CnWLTDCQ.js";import"./dateFormValidation-DphE57k6.js";import"./validation-Dy1ue2_T.js";import"./Briefcase-Cq2QXhIu.js";import"./ExpansionCard-JzbiwWRh.js";import"./Exclamationmark-D5-u_50j.js";import"./Checkmark-DM1nKV0w.js";import"./useScrollBehaviour-CPpBIkgK.js";import"./BabyWrapped-DYJcH_DD.js";import"./Information-Dkelf5g4.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";const oe={title:"steg/BarnehageplassSteg",component:l,render:({hvemPlanlegger:f,omBarnet:M,gåTilNesteSide:R=k("button-click")})=>o.jsx(O,{initialEntries:[_.ARBEIDSSITUASJON],children:o.jsx(A,{initialState:{[s.HVEM_PLANLEGGER]:f,[s.OM_BARNET]:M},onDispatch:R,children:o.jsx(l,{})})})},e={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-12-01",antallBarn:"1"}}},r={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:n.MOR_OG_FAR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-09-01",termindato:"2024-09-03",antallBarn:"1"}}},t={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:n.MOR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-01-01",termindato:"2023-08-01",antallBarn:"2"}}},a={args:{hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{antallBarn:"1",erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2026-01-11",overtakelsesdato:"2026-03-01"},uttaksdata:{familiehendelsedato:"2026-03-01",startdatoPeriode1:"2026-03-01",sluttdatoPeriode1:"2027-01-01",startdatoPeriode2:"2027-01-02",sluttdatoPeriode2:"2027-06-01"}}};var m,i,d;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
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
}`,...(u=(g=r.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var F,v,P;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
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
}`,...(P=(v=t.parameters)==null?void 0:v.docs)==null?void 0:P.source}}};var c,B,S;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
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
}`,...(S=(B=a.parameters)==null?void 0:B.docs)==null?void 0:S.source}}};const se=["FlereForsørgereBarnTerminDesemberStartAugustOmToÅr","FlereForsørgereBarnFødtSeptemberStartSeptember","AleneforsørgerToBarnFødtJanuarStartAugust","FlereForsørgereAdoptertBarnFødtJanuarStartJuni2027"];export{t as AleneforsørgerToBarnFødtJanuarStartAugust,a as FlereForsørgereAdoptertBarnFødtJanuarStartJuni2027,r as FlereForsørgereBarnFødtSeptemberStartSeptember,e as FlereForsørgereBarnTerminDesemberStartAugustOmToÅr,se as __namedExportsOrder,oe as default};

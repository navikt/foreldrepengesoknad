import{j as o}from"./jsx-runtime-CLpGMVip.js";import{a as O}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as A,P as _,C as s}from"./usePlanleggerNavigator-eMJF_Kl5.js";import{P as b}from"./routes-Cyl7_Mgv.js";import{S as n}from"./HvemPlanleggerUtils-CzKVUhpa.js";import{B as l}from"./BarnehageplassSteg-BYf333lS.js";import"./v4-CtRu48qb.js";import"./index-CR__hKHy.js";import"./VeiviserPage-C7O1QSdG.js";import"./VStack-BfPiYV8A.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-q5P1ZqAS.js";import"./barnType-CnRI8jWg.js";import"./PlanleggerStepPage-tAiaGuO2.js";import"./uttakUtils-C_md0b-6.js";import"./KvoteOppsummering-CEuKxbVL.js";import"./StepButtonsHookForm-mKptxFxi.js";import"./Responsive-Cl7tMJT2.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./dateFormValidation-3CrpAqpr.js";import"./validation-DYlyn1BB.js";import"./Briefcase-B6NMGrDt.js";import"./useScrollBehaviour-Dvq8pEsj.js";import"./BabyWrapped-DhzIQaJP.js";import"./Information-I5UdhAcs.js";import"./amplitudeUtils-1CrV70-o.js";import"./amplitude-BZcVzq_V.js";import"./ExpansionCard-h0BHGLCG.js";const ar={title:"steg/BarnehageplassSteg",component:l,render:({hvemPlanlegger:f,omBarnet:M,gåTilNesteSide:R=O("button-click"),locale:k})=>o.jsx(A,{initialEntries:[b.ARBEIDSSITUASJON],children:o.jsx(_,{initialState:{[s.HVEM_PLANLEGGER]:f,[s.OM_BARNET]:M},onDispatch:R,children:o.jsx(l,{locale:k})})})},r={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-12-01",antallBarn:"1"}}},e={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:n.MOR_OG_FAR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-09-01",termindato:"2024-09-03",antallBarn:"1"}}},t={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:n.MOR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-01-01",termindato:"2023-08-01",antallBarn:"2"}}},a={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{antallBarn:"1",erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2026-01-11",overtakelsesdato:"2026-03-01"},uttaksdata:{familiehendelsedato:"2026-03-01",startdatoPeriode1:"2026-03-01",sluttdatoPeriode1:"2027-01-01",startdatoPeriode2:"2027-01-02",sluttdatoPeriode2:"2027-06-01"}}};var i,m,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-12-01',
      antallBarn: '1'
    }
  }
}`,...(d=(m=r.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var p,u,g;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: true,
      erFødsel: true,
      fødselsdato: '2024-09-01',
      termindato: '2024-09-03',
      antallBarn: '1'
    }
  }
}`,...(g=(u=e.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var F,c,v;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR
    },
    omBarnet: {
      erBarnetFødt: true,
      erFødsel: true,
      fødselsdato: '2024-01-01',
      termindato: '2023-08-01',
      antallBarn: '2'
    }
  }
}`,...(v=(c=t.parameters)==null?void 0:c.docs)==null?void 0:v.source}}};var B,P,S;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMor: 'Klara Utvikler',
      navnPåFar: 'Espen Utvikler',
      type: Situasjon.MOR_OG_FAR
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
}`,...(S=(P=a.parameters)==null?void 0:P.docs)==null?void 0:S.source}}};const nr=["FlereForsørgereBarnTerminDesemberStartAugustOmToÅr","FlereForsørgereBarnFødtSeptemberStartSeptember","AleneforsørgerToBarnFødtJanuarStartAugust","FlereForsørgereAdoptertBarnFødtJanuarStartJuni2027"];export{t as AleneforsørgerToBarnFødtJanuarStartAugust,a as FlereForsørgereAdoptertBarnFødtJanuarStartJuni2027,e as FlereForsørgereBarnFødtSeptemberStartSeptember,r as FlereForsørgereBarnTerminDesemberStartAugustOmToÅr,nr as __namedExportsOrder,ar as default};

import{j as o}from"./jsx-runtime-CLpGMVip.js";import{a as O}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as A,P as _,C as s}from"./usePlanleggerNavigator-DXWNGG0W.js";import{P as b}from"./routes-gnI_NAHe.js";import{S as n}from"./HvemPlanleggerUtils-BK9nF1ca.js";import{B as l}from"./BarnehageplassSteg-WpIBDRmZ.js";import"./v4-CtRu48qb.js";import"./index-CR__hKHy.js";import"./UttaksdagenString-DZRvsvH4.js";import"./VStack-D_n2pLOa.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-DZa-yFdT.js";import"./barnType-CnRI8jWg.js";import"./PlanleggerStepPage-8zHC9I30.js";import"./VeiviserPage-CoDRGcGF.js";import"./uttakUtils-BrE9OMy1.js";import"./KvoteOppsummering-CGtvttF5.js";import"./stringUtils-BLFzASq_.js";import"./validation-C6jaRJB5.js";import"./dateFormValidation-D0AFPq5M.js";import"./Responsive-CdbskSYN.js";import"./Briefcase-CKCnXs77.js";import"./useScrollBehaviour-Dvq8pEsj.js";import"./BabyWrapped-q5XqJMj3.js";import"./Information-C54aOrT4.js";import"./amplitudeUtils-DAyIbceM.js";import"./amplitude-DFYcRhpr.js";import"./ExpansionCard-B9LtbfpF.js";const te={title:"steg/BarnehageplassSteg",component:l,render:({hvemPlanlegger:f,omBarnet:M,gåTilNesteSide:R=O("button-click"),locale:k})=>o.jsx(A,{initialEntries:[b.ARBEIDSSITUASJON],children:o.jsx(_,{initialState:{[s.HVEM_PLANLEGGER]:f,[s.OM_BARNET]:M},onDispatch:R,children:o.jsx(l,{locale:k})})})},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-12-01",antallBarn:"1"}}},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:n.MOR_OG_FAR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-09-01",termindato:"2024-09-03",antallBarn:"1"}}},t={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:n.MOR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-01-01",termindato:"2023-08-01",antallBarn:"2"}}},a={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{antallBarn:"1",erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2026-01-11",overtakelsesdato:"2026-03-01"},uttaksdata:{familiehendelsedato:"2026-03-01",startdatoPeriode1:"2026-03-01",sluttdatoPeriode1:"2027-01-01",startdatoPeriode2:"2027-01-02",sluttdatoPeriode2:"2027-06-01"}}};var i,m,d;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(d=(m=e.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var p,u,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var F,c,v;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(S=(P=a.parameters)==null?void 0:P.docs)==null?void 0:S.source}}};const ae=["FlereForsørgereBarnTerminDesemberStartAugustOmToÅr","FlereForsørgereBarnFødtSeptemberStartSeptember","AleneforsørgerToBarnFødtJanuarStartAugust","FlereForsørgereAdoptertBarnFødtJanuarStartJuni2027"];export{t as AleneforsørgerToBarnFødtJanuarStartAugust,a as FlereForsørgereAdoptertBarnFødtJanuarStartJuni2027,r as FlereForsørgereBarnFødtSeptemberStartSeptember,e as FlereForsørgereBarnTerminDesemberStartAugustOmToÅr,ae as __namedExportsOrder,te as default};

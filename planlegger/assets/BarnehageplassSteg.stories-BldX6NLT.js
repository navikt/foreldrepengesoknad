import{j as o}from"./jsx-runtime-Cw0GR0a5.js";import{a as A}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{M as O,P as _,C as s}from"./usePlanleggerNavigator-DSelkg69.js";import{P as b}from"./routes-gnI_NAHe.js";import{S as n}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{i as h}from"./amplitude-BsdTPldp.js";import{B as l}from"./BarnehageplassSteg-Dkr3OR1F.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./Label-CXFT65WO.js";import"./VStack-DXwxFTIo.js";import"./Arbeidssituasjon-i2z_eSVB.js";import"./barnetUtils-Dtg6gkcN.js";import"./VeiviserPage-C-zfQQ-a.js";import"./index-BRV0Se7Z.js";import"./PlanleggerStepPage-BbrKyOai.js";import"./uttakUtils-D2M1HdQ9.js";import"./useScrollBehaviour-DHGEE0Vi.js";import"./validation-4HO0J-zV.js";import"./dateFormValidation-DEZIZxBd.js";import"./BabyWrapped-f-N5pHto.js";import"./Information-BHhX2pxT.js";import"./ExpansionCard-BvsgCKVZ.js";const Z={title:"steg/BarnehageplassSteg",component:l,render:({hvemPlanlegger:f,omBarnet:M,gåTilNesteSide:R=A("button-click"),locale:k})=>(h(),o.jsx(O,{initialEntries:[b.ARBEIDSSITUASJON],children:o.jsx(_,{initialState:{[s.HVEM_PLANLEGGER]:f,[s.OM_BARNET]:M},onDispatch:R,children:o.jsx(l,{locale:k})})}))},e={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-12-01",antallBarn:"1"}}},r={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:n.MOR_OG_FAR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-09-01",termindato:"2024-09-03",antallBarn:"1"}}},a={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",type:n.MOR},omBarnet:{erBarnetFødt:!0,erFødsel:!0,fødselsdato:"2024-01-01",termindato:"2023-08-01",antallBarn:"2"}}},t={args:{locale:"nb",hvemPlanlegger:{navnPåMor:"Klara Utvikler",navnPåFar:"Espen Utvikler",type:n.MOR_OG_FAR},omBarnet:{antallBarn:"1",erFødsel:!1,erBarnetFødt:!0,fødselsdato:"2026-01-11",overtakelsesdato:"2026-03-01"},uttaksdata:{familiehendelsedato:"2026-03-01",startdatoPeriode1:"2026-03-01",sluttdatoPeriode1:"2027-01-01",startdatoPeriode2:"2027-01-02",sluttdatoPeriode2:"2027-06-01"}}};var i,m,d;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var F,c,v;a.parameters={...a.parameters,docs:{...(F=a.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(v=(c=a.parameters)==null?void 0:c.docs)==null?void 0:v.source}}};var B,P,S;t.parameters={...t.parameters,docs:{...(B=t.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(S=(P=t.parameters)==null?void 0:P.docs)==null?void 0:S.source}}};const $=["FlereForsørgereBarnTerminDesemberStartAugustOmToÅr","FlereForsørgereBarnFødtSeptemberStartSeptember","AleneforsørgerToBarnFødtJanuarStartAugust","FlereForsørgereAdoptertBarnFødtJanuarStartJuni2027"];export{a as AleneforsørgerToBarnFødtJanuarStartAugust,t as FlereForsørgereAdoptertBarnFødtJanuarStartJuni2027,r as FlereForsørgereBarnFødtSeptemberStartSeptember,e as FlereForsørgereBarnTerminDesemberStartAugustOmToÅr,$ as __namedExportsOrder,Z as default};

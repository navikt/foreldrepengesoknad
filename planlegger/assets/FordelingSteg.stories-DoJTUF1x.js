import{j as i}from"./jsx-runtime-CLpGMVip.js";import{a as M}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as U,P as f,C as r}from"./usePlanleggerNavigator-3EhbCS3C.js";import{P as h}from"./routes-Cyl7_Mgv.js";import{A as j}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as s}from"./Dekningsgrad-Bg_cIyqc.js";import{S as l}from"./HvemPlanleggerUtils-Dk36cNav.js";import{S as e}from"./KvoteOppsummering-BqoahvGx.js";import"./VeiviserPage-Dz0CIIAO.js";import{F as m}from"./FordelingSteg-DH09D0CR.js";import"./v4-CtRu48qb.js";import"./index-CR__hKHy.js";import"./barnetUtils-BVuNVKfj.js";import"./barnType-CnRI8jWg.js";import"./stringUtils-DApHD7Y2.js";import"./StepButtonsHookForm-DwLwn6D2.js";import"./VStack-2apmvZh_.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./Responsive-B-Uwxu87.js";import"./dateFormValidation-BMqwyBZI.js";import"./validation-DYlyn1BB.js";import"./Briefcase-Dm7XPCF2.js";import"./ExpansionCard-CZBYw2L8.js";import"./Checkmark-DkUBrDzq.js";import"./Exclamationmark-BUUUNLix.js";import"./PlanleggerStepPage-BXu0wHOq.js";import"./customErrorFormatter-RUbEXImz.js";import"./hvemHarRettUtils-DOxReKrb.js";import"./uttakUtils-CHBDUHSN.js";import"./useScrollBehaviour-Dvq8pEsj.js";import"./Spacer-DmBY75Fg.js";const d={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},pe={title:"steg/FordelingSteg",component:m,render:({hvemPlanlegger:u,omBarnet:T,stønadskontoer:B,gåTilNesteSide:D=M("button-click"),dekningsgrad:N=s.HUNDRE_PROSENT,locale:A})=>i.jsx(U,{initialEntries:[h.FORDELING],children:i.jsx(f,{initialState:{[r.HVEM_PLANLEGGER]:u,[r.ARBEIDSSITUASJON]:{status:j.JOBBER,jobberAnnenPart:!0},[r.OM_BARNET]:T,[r.HVOR_LANG_PERIODE]:{dekningsgrad:N}},onDispatch:D,children:i.jsx(m,{stønadskontoer:B,locale:A})})})},n={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},stønadskontoer:d}},t={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},dekningsgrad:s.ÅTTI_PROSENT,stønadskontoer:d}},a={args:{locale:"nb",hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_MEDMOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"},dekningsgrad:s.HUNDRE_PROSENT,stønadskontoer:d}},o={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Petter Pjokk",navnPåMedfar:"Espen Utvikler",type:l.FAR_OG_FAR},omBarnet:{erFødsel:!1,fødselsdato:"2024-01-01",antallBarn:"2",overtakelsesdato:"2024-01-01"},dekningsgrad:s.HUNDRE_PROSENT,stønadskontoer:d}};var g,p,F;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-01-01',
      antallBarn: '1'
    },
    stønadskontoer: DEFAULT_STØNADSKONTO
  }
}`,...(F=(p=n.parameters)==null?void 0:p.docs)==null?void 0:F.source}}};var k,c,v;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-01-01',
      antallBarn: '1'
    },
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
    stønadskontoer: DEFAULT_STØNADSKONTO
  }
}`,...(v=(c=t.parameters)==null?void 0:c.docs)==null?void 0:v.source}}};var P,E,O;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMedmor: 'Esther Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: Situasjon.MOR_OG_MEDMOR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-01-01',
      antallBarn: '2'
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    stønadskontoer: DEFAULT_STØNADSKONTO
  }
}`,...(O=(E=a.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var R,S,_;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Petter Pjokk',
      navnPåMedfar: 'Espen Utvikler',
      type: Situasjon.FAR_OG_FAR
    },
    omBarnet: {
      erFødsel: false,
      fødselsdato: '2024-01-01',
      antallBarn: '2',
      overtakelsesdato: '2024-01-01'
    },
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    stønadskontoer: DEFAULT_STØNADSKONTO
  }
}`,...(_=(S=o.parameters)==null?void 0:S.docs)==null?void 0:_.source}}};const Fe=["FlereForsørgereEttBarn","FlereForsørgereEttBarn80ProsentDekningsgrad","FlereForsørgereToBarn","FarOgFar"];export{o as FarOgFar,n as FlereForsørgereEttBarn,t as FlereForsørgereEttBarn80ProsentDekningsgrad,a as FlereForsørgereToBarn,Fe as __namedExportsOrder,pe as default};

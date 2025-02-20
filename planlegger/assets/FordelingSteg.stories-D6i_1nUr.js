import{j as i}from"./jsx-runtime-CLpGMVip.js";import{a as M}from"./chunk-D5ZWXAHU-DlerbUHg.js";import{M as U,P as f,C as r}from"./usePlanleggerNavigator-DPLnGBG5.js";import{P as h}from"./routes-Cyl7_Mgv.js";import{A as j}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as s}from"./Dekningsgrad-Bg_cIyqc.js";import{S as l}from"./HvemPlanleggerUtils-CGonF7LJ.js";import{S as e}from"./KvoteOppsummering-CSy3wRh1.js";import"./VeiviserPage-k_7-Y0Mo.js";import{F as m}from"./FordelingSteg-DC_kfY9y.js";import"./v4-CtRu48qb.js";import"./index-CR__hKHy.js";import"./barnetUtils-C0lJ0hcK.js";import"./barnType-CnRI8jWg.js";import"./StepButtonsHookForm-CVo24Iug.js";import"./VStack-CmtOnz83.js";import"./index-D2e_E8nu.js";import"./index-CtmzRm2p.js";import"./Responsive-IFi8LHQ2.js";import"./dateFormValidation-XdXp584L.js";import"./validation-DYlyn1BB.js";import"./Briefcase-BvUxfac0.js";import"./ExpansionCard-CaFEStiv.js";import"./PlanleggerStepPage-8XwwoPm1.js";import"./customErrorFormatter-RUbEXImz.js";import"./hvemHarRettUtils-1uO_MteQ.js";import"./uttakUtils-DX97QxAc.js";import"./useScrollBehaviour-Dvq8pEsj.js";import"./Spacer-zSi7sa7G.js";const d={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ie={title:"steg/FordelingSteg",component:m,render:({hvemPlanlegger:u,omBarnet:T,stønadskontoer:B,gåTilNesteSide:D=M("button-click"),dekningsgrad:N=s.HUNDRE_PROSENT,locale:A})=>i.jsx(U,{initialEntries:[h.FORDELING],children:i.jsx(f,{initialState:{[r.HVEM_PLANLEGGER]:u,[r.ARBEIDSSITUASJON]:{status:j.JOBBER,jobberAnnenPart:!0},[r.OM_BARNET]:T,[r.HVOR_LANG_PERIODE]:{dekningsgrad:N}},onDispatch:D,children:i.jsx(m,{stønadskontoer:B,locale:A})})})},n={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},stønadskontoer:d}},a={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},dekningsgrad:s.ÅTTI_PROSENT,stønadskontoer:d}},t={args:{locale:"nb",hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_MEDMOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"},dekningsgrad:s.HUNDRE_PROSENT,stønadskontoer:d}},o={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Petter Pjokk",navnPåMedfar:"Espen Utvikler",type:l.FAR_OG_FAR},omBarnet:{erFødsel:!1,fødselsdato:"2024-01-01",antallBarn:"2",overtakelsesdato:"2024-01-01"},dekningsgrad:s.HUNDRE_PROSENT,stønadskontoer:d}};var g,p,F;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(F=(p=n.parameters)==null?void 0:p.docs)==null?void 0:F.source}}};var k,c,v;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(v=(c=a.parameters)==null?void 0:c.docs)==null?void 0:v.source}}};var P,E,O;t.parameters={...t.parameters,docs:{...(P=t.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(O=(E=t.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var R,S,_;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(_=(S=o.parameters)==null?void 0:S.docs)==null?void 0:_.source}}};const me=["FlereForsørgereEttBarn","FlereForsørgereEttBarn80ProsentDekningsgrad","FlereForsørgereToBarn","FarOgFar"];export{o as FarOgFar,n as FlereForsørgereEttBarn,a as FlereForsørgereEttBarn80ProsentDekningsgrad,t as FlereForsørgereToBarn,me as __namedExportsOrder,ie as default};

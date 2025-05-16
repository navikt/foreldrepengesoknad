import{j as i}from"./jsx-runtime-D_zvdyIk.js";import{a as M}from"./index-B-lxVbXh.js";import{M as U,P as f,C as r}from"./usePlanleggerNavigator-CA8DfEuq.js";import{P as y}from"./routes-Cyl7_Mgv.js";import{A as h}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as s}from"./Dekningsgrad-Bg_cIyqc.js";import{S as e}from"./KvoteOppsummering-B6Q8W3zA.js";import"./VeiviserPage-8Wpng40q.js";import{H as l}from"./HvemPlanleggerType-CugjyLV2.js";import{F as m}from"./FordelingSteg-DN-jXLMj.js";import"./v4-CtRu48qb.js";import"./index-DQLiH3RP.js";import"./HvemPlanleggerUtils-DWx8ZgD2.js";import"./stringUtils-DApHD7Y2.js";import"./barnetUtils-ZKU_BOQQ.js";import"./barnType-CnRI8jWg.js";import"./StepButtonsHookForm-877k_zyp.js";import"./VStack-TyG4_st1.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./Responsive-3gl0cHrT.js";import"./dateFormValidation-BJvWp8x7.js";import"./validation-Dy1ue2_T.js";import"./Briefcase-XmJBY6Co.js";import"./ExpansionCard-DSVZz3RH.js";import"./Exclamationmark-CaIgOQhv.js";import"./Checkmark-BGP8o-VH.js";import"./PlanleggerStepPage-BewzdlxV.js";import"./customErrorFormatter-AuWeTsWn.js";import"./hvemHarRettUtils-Qkqdw2Ow.js";import"./uttakUtils-i9QVnjHN.js";import"./useScrollBehaviour-CPpBIkgK.js";import"./Spacer-AgKh28B3.js";const d={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},Fe={title:"steg/FordelingSteg",component:m,render:({hvemPlanlegger:B,omBarnet:D,stønadskontoer:u,gåTilNesteSide:S=M("button-click"),dekningsgrad:N=s.HUNDRE_PROSENT,locale:A})=>i.jsx(U,{initialEntries:[y.FORDELING],children:i.jsx(f,{initialState:{[r.HVEM_PLANLEGGER]:B,[r.ARBEIDSSITUASJON]:{status:h.JOBBER,jobberAnnenPart:!0},[r.OM_BARNET]:D,[r.HVOR_LANG_PERIODE]:{dekningsgrad:N}},onDispatch:S,children:i.jsx(m,{stønadskontoer:u,locale:A})})})},n={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},stønadskontoer:d}},a={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},dekningsgrad:s.ÅTTI_PROSENT,stønadskontoer:d}},t={args:{locale:"nb",hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_MEDMOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"},dekningsgrad:s.HUNDRE_PROSENT,stønadskontoer:d}},o={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Petter Pjokk",navnPåMedfar:"Espen Utvikler",type:l.FAR_OG_FAR},omBarnet:{erFødsel:!1,fødselsdato:"2024-01-01",antallBarn:"2",overtakelsesdato:"2024-01-01"},dekningsgrad:s.HUNDRE_PROSENT,stønadskontoer:d}};var g,p,F;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
    },
    omBarnet: {
      erBarnetFødt: false,
      erFødsel: true,
      termindato: '2024-01-01',
      antallBarn: '1'
    },
    stønadskontoer: DEFAULT_STØNADSKONTO
  }
}`,...(F=(p=n.parameters)==null?void 0:p.docs)==null?void 0:F.source}}};var k,v,P;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Espen Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_FAR
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
}`,...(P=(v=a.parameters)==null?void 0:v.docs)==null?void 0:P.source}}};var c,E,O;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåMedmor: 'Esther Utvikler',
      navnPåMor: 'Klara Utvikler',
      type: HvemPlanleggerType.MOR_OG_MEDMOR
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
}`,...(O=(E=t.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var R,T,_;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    locale: 'nb',
    hvemPlanlegger: {
      navnPåFar: 'Petter Pjokk',
      navnPåMedfar: 'Espen Utvikler',
      type: HvemPlanleggerType.FAR_OG_FAR
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
}`,...(_=(T=o.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};const ke=["FlereForsørgereEttBarn","FlereForsørgereEttBarn80ProsentDekningsgrad","FlereForsørgereToBarn","FarOgFar"];export{o as FarOgFar,n as FlereForsørgereEttBarn,a as FlereForsørgereEttBarn80ProsentDekningsgrad,t as FlereForsørgereToBarn,ke as __namedExportsOrder,Fe as default};

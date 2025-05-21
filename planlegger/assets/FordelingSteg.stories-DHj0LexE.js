import{j as i}from"./jsx-runtime-D_zvdyIk.js";import{a as A}from"./index-B-lxVbXh.js";import{M,P as U,C as r}from"./usePlanleggerNavigator-eoygEux_.js";import{P as f}from"./routes-Cyl7_Mgv.js";import{A as y}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as s}from"./Dekningsgrad-Bg_cIyqc.js";import{S as e}from"./KvoteOppsummering-CiMNS0bz.js";import"./VeiviserPage-CHSQEW6u.js";import{H as l}from"./HvemPlanleggerType-CugjyLV2.js";import{F as m}from"./FordelingSteg-D_ltS7Al.js";import"./v4-CtRu48qb.js";import"./index-DQLiH3RP.js";import"./HvemPlanleggerUtils-CSaQ6gna.js";import"./stringUtils-DApHD7Y2.js";import"./barnetUtils-DYBBskKi.js";import"./barnType-CnRI8jWg.js";import"./StepButtonsHookForm-DAulkPa7.js";import"./VStack-05Ww9A8B.js";import"./index-B8qOg7Wt.js";import"./index-CJPVTaBz.js";import"./Responsive-CnWLTDCQ.js";import"./dateFormValidation-DphE57k6.js";import"./validation-Dy1ue2_T.js";import"./Briefcase-Cq2QXhIu.js";import"./ExpansionCard-JzbiwWRh.js";import"./Exclamationmark-D5-u_50j.js";import"./Checkmark-DM1nKV0w.js";import"./PlanleggerStepPage-ChY5fp_x.js";import"./customErrorFormatter-AuWeTsWn.js";import"./hvemHarRettUtils-CtKbu_BH.js";import"./uttakUtils-Bp9XRlC1.js";import"./useScrollBehaviour-CPpBIkgK.js";import"./Spacer-C5GDfzOr.js";const d={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},pe={title:"steg/FordelingSteg",component:m,render:({hvemPlanlegger:B,omBarnet:D,stønadskontoer:u,gåTilNesteSide:S=A("button-click"),dekningsgrad:N=s.HUNDRE_PROSENT})=>i.jsx(M,{initialEntries:[f.FORDELING],children:i.jsx(U,{initialState:{[r.HVEM_PLANLEGGER]:B,[r.ARBEIDSSITUASJON]:{status:y.JOBBER,jobberAnnenPart:!0},[r.OM_BARNET]:D,[r.HVOR_LANG_PERIODE]:{dekningsgrad:N}},onDispatch:S,children:i.jsx(m,{stønadskontoer:u})})})},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},stønadskontoer:d}},t={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},dekningsgrad:s.ÅTTI_PROSENT,stønadskontoer:d}},a={args:{hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_MEDMOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"},dekningsgrad:s.HUNDRE_PROSENT,stønadskontoer:d}},o={args:{hvemPlanlegger:{navnPåFar:"Petter Pjokk",navnPåMedfar:"Espen Utvikler",type:l.FAR_OG_FAR},omBarnet:{erFødsel:!1,fødselsdato:"2024-01-01",antallBarn:"2",overtakelsesdato:"2024-01-01"},dekningsgrad:s.HUNDRE_PROSENT,stønadskontoer:d}};var g,p,F;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
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
}`,...(F=(p=n.parameters)==null?void 0:p.docs)==null?void 0:F.source}}};var k,v,P;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
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
}`,...(P=(v=t.parameters)==null?void 0:v.docs)==null?void 0:P.source}}};var E,O,R;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
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
}`,...(R=(O=a.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var T,c,_;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
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
}`,...(_=(c=o.parameters)==null?void 0:c.docs)==null?void 0:_.source}}};const Fe=["FlereForsørgereEttBarn","FlereForsørgereEttBarn80ProsentDekningsgrad","FlereForsørgereToBarn","FarOgFar"];export{o as FarOgFar,n as FlereForsørgereEttBarn,t as FlereForsørgereEttBarn80ProsentDekningsgrad,a as FlereForsørgereToBarn,Fe as __namedExportsOrder,pe as default};

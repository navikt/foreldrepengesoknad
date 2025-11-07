import{j as l}from"./iframe-n6-YopwE.js";import{M as p,P as O,C as e}from"./usePlanleggerNavigator-CLvJwV9n.js";import{P as k}from"./routes-Cyl7_Mgv.js";import{A as P}from"./Arbeidssituasjon-i2z_eSVB.js";import{H as o}from"./HvemPlanleggerUtils-B51YL1Zs.js";import{F as d}from"./FordelingSteg-BnL3yH8b.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-Dyg3uo-b.js";import"./PlanleggerStepPage-JWePG97O.js";import"./customErrorFormatter-CsAiuciB.js";import"./hvemHarRettUtils-6pkcisRk.js";import"./uttakUtils-BvwyIqXZ.js";import"./useScrollBehaviour-C-tEOr8l.js";import"./Spacer-DOFd39uF.js";const{action:v}=__STORYBOOK_MODULE_ACTIONS__,s={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},K={title:"steg/FordelingSteg",component:d,render:({hvemPlanlegger:g,omBarnet:m,stønadskontoer:i,gåTilNesteSide:F=v("button-click"),dekningsgrad:E="100"})=>l.jsx(p,{initialEntries:[k.FORDELING],children:l.jsx(O,{initialState:{[e.HVEM_PLANLEGGER]:g,[e.ARBEIDSSITUASJON]:{status:P.JOBBER,jobberAnnenPart:!0},[e.OM_BARNET]:m,[e.HVOR_LANG_PERIODE]:{dekningsgrad:E}},onDispatch:F,children:l.jsx(d,{stønadskontoer:i})})})},r={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:o.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},stønadskontoer:s}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:o.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},dekningsgrad:"80",stønadskontoer:s}},a={args:{hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:o.MOR_OG_MEDMOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"},dekningsgrad:"100",stønadskontoer:s}},t={args:{hvemPlanlegger:{navnPåFar:"Petter Pjokk",navnPåMedfar:"Espen Utvikler",type:o.FAR_OG_FAR},omBarnet:{erFødsel:!1,fødselsdato:"2024-01-01",antallBarn:"2",overtakelsesdato:"2024-01-01"},dekningsgrad:"100",stønadskontoer:s}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
    dekningsgrad: '80',
    stønadskontoer: DEFAULT_STØNADSKONTO
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
    dekningsgrad: '100',
    stønadskontoer: DEFAULT_STØNADSKONTO
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
    dekningsgrad: '100',
    stønadskontoer: DEFAULT_STØNADSKONTO
  }
}`,...t.parameters?.docs?.source}}};const y=["FlereForsørgereEttBarn","FlereForsørgereEttBarn80ProsentDekningsgrad","FlereForsørgereToBarn","FarOgFar"];export{t as FarOgFar,r as FlereForsørgereEttBarn,n as FlereForsørgereEttBarn80ProsentDekningsgrad,a as FlereForsørgereToBarn,y as __namedExportsOrder,K as default};

import{j as d}from"./iframe-DJZ9Zr2b.js";import{M as O,P as R,C as e}from"./usePlanleggerNavigator-DhSODmXY.js";import{P}from"./routes-Cyl7_Mgv.js";import{A as k}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as o}from"./Dekningsgrad-Bg_cIyqc.js";import{H as s}from"./HvemPlanleggerUtils-CNBm8w1y.js";import{F as g}from"./FordelingSteg-C4yWuz31.js";import"./preload-helper-D9Z9MdNV.js";import"./barnetUtils-C4-jdjCx.js";import"./PlanleggerStepPage-DasL4jV8.js";import"./customErrorFormatter-D2rQq6s0.js";import"./hvemHarRettUtils-BDAdeTLv.js";import"./uttakUtils-Bx5eJ9jN.js";import"./useScrollBehaviour-p5VWsRP1.js";import"./Spacer-DZjDyEr_.js";const{action:v}=__STORYBOOK_MODULE_ACTIONS__,l={100:{kontoer:[{konto:"MØDREKVOTE",dager:75},{konto:"FEDREKVOTE",dager:75},{konto:"FELLESPERIODE",dager:80},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:"MØDREKVOTE",dager:95},{konto:"FEDREKVOTE",dager:95},{konto:"FELLESPERIODE",dager:101},{konto:"FORELDREPENGER_FØR_FØDSEL",dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},G={title:"steg/FordelingSteg",component:g,render:({hvemPlanlegger:i,omBarnet:m,stønadskontoer:E,gåTilNesteSide:F=v("button-click"),dekningsgrad:p=o.HUNDRE_PROSENT})=>d.jsx(O,{initialEntries:[P.FORDELING],children:d.jsx(R,{initialState:{[e.HVEM_PLANLEGGER]:i,[e.ARBEIDSSITUASJON]:{status:k.JOBBER,jobberAnnenPart:!0},[e.OM_BARNET]:m,[e.HVOR_LANG_PERIODE]:{dekningsgrad:p}},onDispatch:F,children:d.jsx(g,{stønadskontoer:E})})})},r={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},stønadskontoer:l}},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},dekningsgrad:o.ÅTTI_PROSENT,stønadskontoer:l}},a={args:{hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_MEDMOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"},dekningsgrad:o.HUNDRE_PROSENT,stønadskontoer:l}},t={args:{hvemPlanlegger:{navnPåFar:"Petter Pjokk",navnPåMedfar:"Espen Utvikler",type:s.FAR_OG_FAR},omBarnet:{erFødsel:!1,fødselsdato:"2024-01-01",antallBarn:"2",overtakelsesdato:"2024-01-01"},dekningsgrad:o.HUNDRE_PROSENT,stønadskontoer:l}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT,
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
    stønadskontoer: DEFAULT_STØNADSKONTO
  }
}`,...t.parameters?.docs?.source}}};const h=["FlereForsørgereEttBarn","FlereForsørgereEttBarn80ProsentDekningsgrad","FlereForsørgereToBarn","FarOgFar"];export{t as FarOgFar,r as FlereForsørgereEttBarn,n as FlereForsørgereEttBarn80ProsentDekningsgrad,a as FlereForsørgereToBarn,h as __namedExportsOrder,G as default};

import{j as i}from"./VStack-1BYz4cx9.js";import{a as M}from"./chunk-454WOBUV-CM0pFb8Z.js";import{M as f,P as U,C as r}from"./usePlanleggerNavigator-DNOEGzM5.js";import{P as h}from"./routes-Cp-2uEwO.js";import{A as j}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as s}from"./Dekningsgrad-Bg_cIyqc.js";import{S as l}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{S as e}from"./uttakUtils-IrxiEj86.js";import"./Label-xTGzdijQ.js";import{i as b}from"./amplitude-kE79_Y7m.js";import{F as m}from"./FordelingSteg-DCzYKRan.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./barnetUtils-Dtg6gkcN.js";import"./VeiviserPage-DafArFcH.js";import"./index-BRV0Se7Z.js";import"./PlanleggerStepPage-QRrm7QNr.js";import"./StepButtonsHookForm-DK3DoRxb.js";import"./Calendar-CYQP7Vnt.js";import"./index-CYM-y3Gt.js";import"./Responsive-CxM9YB4e.js";import"./ArrowLeft-DcKJ7GdH.js";import"./hvemHarRettUtils-BiyQH6Vj.js";import"./dateFormValidation-CUQTHxD6.js";import"./validation-4HO0J-zV.js";import"./Spacer-BW3tgveW.js";const d={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},le={title:"steg/FordelingSteg",component:m,render:({hvemPlanlegger:_,omBarnet:T,stønadskontoer:B,gåTilNesteSide:D=M("button-click"),dekningsgrad:A=s.HUNDRE_PROSENT,locale:N})=>(b(),i.jsx(f,{initialEntries:[h.FORDELING],children:i.jsx(U,{initialState:{[r.HVEM_PLANLEGGER]:_,[r.ARBEIDSSITUASJON]:{status:j.JOBBER,jobberAnnenPart:!0},[r.OM_BARNET]:T,[r.HVOR_LANG_PERIODE]:{dekningsgrad:A}},onDispatch:D,children:i.jsx(m,{stønadskontoer:B,locale:N})})}))},n={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},stønadskontoer:d}},a={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},dekningsgrad:s.ÅTTI_PROSENT,stønadskontoer:d}},t={args:{locale:"nb",hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_MEDMOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"},dekningsgrad:s.HUNDRE_PROSENT,stønadskontoer:d}},o={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Petter Pjokk",navnPåMedfar:"Espen Utvikler",type:l.FAR_OG_FAR},omBarnet:{erFødsel:!1,fødselsdato:"2024-01-01",antallBarn:"2",overtakelsesdato:"2024-01-01"},dekningsgrad:s.HUNDRE_PROSENT,stønadskontoer:d}};var g,p,F;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(O=(E=t.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var R,u,S;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(S=(u=o.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};const de=["FlereForsørgereEttBarn","FlereForsørgereEttBarn80ProsentDekningsgrad","FlereForsørgereToBarn","FarOgFar"];export{o as FarOgFar,n as FlereForsørgereEttBarn,a as FlereForsørgereEttBarn80ProsentDekningsgrad,t as FlereForsørgereToBarn,de as __namedExportsOrder,le as default};

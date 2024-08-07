import{j as i}from"./jsx-runtime-Cw0GR0a5.js";import{a as f}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as D,P as T,C as r}from"./usePlanleggerNavigator-ChT3MFOW.js";import{P as U}from"./routes-Cp-2uEwO.js";import{i as A,A as N}from"./Arbeidssituasjon-D1fXC-Bb.js";import{D as s}from"./Dekningsgrad-Bg_cIyqc.js";import{S as l}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{S as e}from"./uttakUtils-BJDqa1rw.js";import"./Label-cZWDpmVx.js";import{F as O}from"./FordelingSteg-mt0hp-8m.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./barnetUtils-Dtg6gkcN.js";import"./Infobox-CmCeicoQ.js";import"./VStack-BTp1Z9Zd.js";import"./index-BRV0Se7Z.js";import"./tslib.es6-CMwweBXX.js";import"./PlanleggerStepPage-BsVQnNe3.js";import"./StepButtonsHookForm-CnABqude.js";import"./Calendar-B_DGIy38.js";import"./index-9r8iugjR.js";import"./useCallbackRef-Ds8NZ9D5.js";import"./Responsive-DpCLtDyH.js";import"./ArrowLeft-B9M5uQgf.js";import"./hvemHarRettUtils-B6yDdZku.js";import"./useScrollBehaviour-CS4WEBxz.js";import"./validation-4HO0J-zV.js";import"./Spacer-BW3tgveW.js";const h={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},j=({hvemPlanlegger:B,omBarnet:_,stønadskontoer:S=h,gåTilNesteSide:x=f("button-click"),dekningsgrad:M=s.HUNDRE_PROSENT})=>(A(),i.jsx(D,{initialEntries:[U.FORDELING],children:i.jsx(T,{initialState:{[r.HVEM_PLANLEGGER]:B,[r.ARBEIDSSITUASJON]:{status:N.JOBBER,jobberAnnenPart:!0},[r.OM_BARNET]:_,[r.HVOR_LANG_PERIODE]:{dekningsgrad:M}},onDispatch:x,children:i.jsx(O,{stønadskontoer:S})})})),de={title:"steg/FordelingSteg",component:O,render:j},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"}}},t={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},dekningsgrad:s.ÅTTI_PROSENT}},a={args:{hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_MEDMOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"},dekningsgrad:s.HUNDRE_PROSENT}},o={args:{hvemPlanlegger:{navnPåFar:"Petter Pjokk",navnPåMedfar:"Espen Utvikler",type:l.FAR_OG_FAR},omBarnet:{erFødsel:!1,fødselsdato:"2024-01-01",antallBarn:"2",overtakelsesdato:"2024-01-01"},dekningsgrad:s.HUNDRE_PROSENT}};var d,m,g;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
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
    }
  }
}`,...(g=(m=n.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var p,F,k;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
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
    dekningsgrad: Dekningsgrad.ÅTTI_PROSENT
  }
}`,...(k=(F=t.parameters)==null?void 0:F.docs)==null?void 0:k.source}}};var E,v,P;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(P=(v=a.parameters)==null?void 0:v.docs)==null?void 0:P.source}}};var R,c,u;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
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
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT
  }
}`,...(u=(c=o.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const me=["FlereForsørgereEttBarn","FlereForsørgereEttBarn80ProsentDekningsgrad","FlereForsørgereToBarn","FarOgFar"];export{o as FarOgFar,n as FlereForsørgereEttBarn,t as FlereForsørgereEttBarn80ProsentDekningsgrad,a as FlereForsørgereToBarn,me as __namedExportsOrder,de as default};

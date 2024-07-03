import{j as l}from"./VStack-WHXoK350.js";import{a as S}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as A,P as T,C as r}from"./usePlanleggerNavigator-ClDy7Zzk.js";import{P as U}from"./routes-Cp-2uEwO.js";import{i as D,A as h}from"./Arbeidssituasjon-BR5biWK-.js";import{D as R}from"./Dekningsgrad-Bg_cIyqc.js";import{S as s}from"./HvemPlanleggerUtils-D1xsqW5u.js";import{S as e}from"./uttakUtils-Cy9jfC59.js";import"./Label-DMHnewTW.js";import{F as B}from"./FordelingSteg-Da2KhzTF.js";import"./index-DVXBtNgz.js";import"./v4-CQkTLCs1.js";import"./barnetUtils-Dtg6gkcN.js";import"./Infobox-BNoYl5xh.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./PlanleggerStepPage-C4cgVV2C.js";import"./StepButtonsHookForm-C0LTTJJD.js";import"./Calendar-BZZfWk4Z.js";import"./index-Cbx7Fas8.js";import"./Responsive-CW796NqG.js";import"./ArrowLeft-Dtu47hhV.js";import"./hvemHarRettUtils-DiEVVlDi.js";import"./useScrollBehaviour-BRwzlaSf.js";import"./validation-4HO0J-zV.js";import"./Spacer-CmfZYR-2.js";const j={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},G=({hvemPlanlegger:O,omBarnet:_,stønadskontoer:x=j,gåTilNesteSide:M=S("button-click"),dekningsgrad:f=R.HUNDRE_PROSENT})=>(D(),l.jsx(A,{initialEntries:[U.FORDELING],children:l.jsx(T,{initialState:{[r.HVEM_PLANLEGGER]:O,[r.ARBEIDSSITUASJON]:{status:h.JOBBER,jobberAnnenPart:!0},[r.OM_BARNET]:_,[r.HVOR_LANG_PERIODE]:{dekningsgrad:f}},onDispatch:M,children:l.jsx(B,{stønadskontoer:x})})})),le={title:"steg/FordelingSteg",component:B,render:G},n={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"}}},t={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},dekningsgrad:R.ÅTTI_PROSENT}},a={args:{hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_MEDMOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"}}},o={args:{hvemPlanlegger:{navnPåFar:"Petter Pjokk",navnPåMedfar:"Espen Utvikler",type:s.FAR_OG_FAR},omBarnet:{erFødsel:!1,fødselsdato:"2024-01-01",antallBarn:"2",overtakelsesdato:"2024-01-01"}}};var i,d,m;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(m=(d=n.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var F,p,g;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`{
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
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var v,k,c;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
    }
  }
}`,...(c=(k=a.parameters)==null?void 0:k.docs)==null?void 0:c.source}}};var P,E,u;o.parameters={...o.parameters,docs:{...(P=o.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
    }
  }
}`,...(u=(E=o.parameters)==null?void 0:E.docs)==null?void 0:u.source}}};const ie=["FlereForsørgereEttBarn","FlereForsørgereEttBarn80ProsentDekningsgrad","FlereForsørgereToBarn","FarOgFar"];export{o as FarOgFar,n as FlereForsørgereEttBarn,t as FlereForsørgereEttBarn80ProsentDekningsgrad,a as FlereForsørgereToBarn,ie as __namedExportsOrder,le as default};

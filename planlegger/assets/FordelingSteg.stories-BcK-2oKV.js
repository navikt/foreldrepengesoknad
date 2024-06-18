import{j as o}from"./VStack-WHXoK350.js";import{a as B}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as O,P as f,C as r}from"./usePlanleggerNavigator-Dq-O5lYg.js";import{P as M}from"./routes-Cp-2uEwO.js";import{i as x,A as _}from"./Arbeidssituasjon-CN0FLUdg.js";import{D as S}from"./Dekningsgrad-Bg_cIyqc.js";import{S as s}from"./HvemPlanleggerUtils-B2i4COBs.js";import{S as e}from"./uttakUtils-Bwre5uei.js";import"./Label-fr1ceDiJ.js";import{F as c}from"./FordelingSteg-T5X5TpOq.js";import"./index-DVXBtNgz.js";import"./v4-CQkTLCs1.js";import"./barnetUtils-Dtg6gkcN.js";import"./Infobox-DsnShUVx.js";import"./index-Dcs0RV0A.js";import"./tslib.es6-CMwweBXX.js";import"./PlanleggerStepPage-XUVo4FBw.js";import"./StepButtonsHookForm-fh8Q5j67.js";import"./Calendar-BZZfWk4Z.js";import"./index-Cbx7Fas8.js";import"./Responsive-WWdcyc0t.js";import"./ArrowLeft-Dtu47hhV.js";import"./hvemHarRettUtils-BA6nnELj.js";import"./useScrollBehaviour-WVMBWXos.js";import"./Spacer-CmfZYR-2.js";const A={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:90},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},D=({hvemPlanlegger:E,omBarnet:u,stønadskontoer:P=A,gåTilNesteSide:R=B("button-click")})=>(x(),o.jsx(O,{initialEntries:[M.FORDELING],children:o.jsx(f,{initialState:{[r.HVEM_PLANLEGGER]:E,[r.ARBEIDSSITUASJON]:{status:_.JOBBER,jobberAnnenPart:!0},[r.OM_BARNET]:u,[r.HVOR_LANG_PERIODE]:{dekningsgrad:S.HUNDRE_PROSENT}},onDispatch:R,children:o.jsx(c,{stønadskontoer:P})})})),re={title:"steg/FordelingSteg",component:c,render:D},t={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"}}},n={args:{hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_MEDMOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"}}},a={args:{hvemPlanlegger:{navnPåFar:"Petter Pjokk",navnPåMedfar:"Espen Utvikler",type:s.FAR_OG_FAR},omBarnet:{erFødsel:!1,fødselsdato:"2024-01-01",antallBarn:"2",overtakelsesdato:"2024-01-01"}}};var l,i,m;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(m=(i=t.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var d,p,F;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(F=(p=n.parameters)==null?void 0:p.docs)==null?void 0:F.source}}};var g,k,v;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(v=(k=a.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};const te=["FlereForsørgereEttBarn","FlereForsørgereToBarn","FarOgFar"];export{a as FarOgFar,t as FlereForsørgereEttBarn,n as FlereForsørgereToBarn,te as __namedExportsOrder,re as default};

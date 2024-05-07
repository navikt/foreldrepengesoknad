import{j as o}from"./jsx-runtime-Du8NFWEI.js";import{a as B}from"./chunk-MZXVCX43-DWuJqIWT.js";import{M as O,P as f,C as e}from"./usePlanleggerNavigator-Bv5BjPTg.js";import{P as M}from"./routes-DI-Woyga.js";import{i as x,A as _}from"./Arbeidssituasjon-Bw9oRg1d.js";import{D as S}from"./Dekningsgrad-Bg_cIyqc.js";import{S as s}from"./HvemPlanleggerUtils-CHTffTZd.js";import{S as r}from"./uttakUtils-CrBM_WY2.js";import{F as v}from"./FordelingSteg-BQs4DeEz.js";import"./index-Dl6G-zuu.js";import"./v4-D8aEg3BZ.js";import"./dayjs.min-a42Le6oL.js";import"./barnetUtils-Dtg6gkcN.js";import"./dateUtils-C_C2kvi-.js";import"./amplitude.esm-JOtNIP3j.js";import"./isoWeek-tto3dG8J.js";import"./GreenPanel-CEPEejtT.js";import"./Box-DoqHmnCA.js";import"./clsx-B-dksMZM.js";import"./css-CqApuV4H.js";import"./Infobox-2dY1MjSC.js";import"./IconCircleWrapper-x91Dcw7p.js";import"./VStack-C-EA7mzX.js";import"./Label-DKKZxAV5.js";import"./PlanleggerStepPage-CgQnGAng.js";import"./GreenHeading-DE0ffLfD.js";import"./index-e2vXP8VC.js";import"./calendarLabel.module-Bk8mFlZK.js";import"./links-BAR-PZvy.js";import"./Button-BJE2r0D8.js";import"./useId-zmAp5ghi.js";import"./useId-BnKOV0D5.js";import"./index-BfyspvgH.js";import"./ChevronDown-CY3RuW24.js";import"./PlanleggerPage-D5WS1JMY.js";import"./StepButtonsHookForm-DUdbmqm8.js";import"./Select-B7GYbsm8.js";import"./Calendar-In9Ft7th.js";import"./index-D1_ZHIBm.js";import"./Responsive-B_ieNUio.js";import"./ArrowLeft-DH_8HH2g.js";import"./ArrowRight-CMhrL5XF.js";import"./hvemHarRettUtils-Dvw973AZ.js";import"./useScrollBehaviour-BhOrFi8k.js";import"./Spacer-DYbme5k_.js";const A={100:{kontoer:[{konto:r.Mødrekvote,dager:75},{konto:r.Fedrekvote,dager:75},{konto:r.Fellesperiode,dager:80},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:r.Mødrekvote,dager:95},{konto:r.Fedrekvote,dager:95},{konto:r.Fellesperiode,dager:90},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},D=({hvemPlanlegger:E,omBarnet:u,stønadskontoer:P=A,gåTilNesteSide:R=B("button-click")})=>(x(),o.jsx(O,{initialEntries:[M.FORDELING],children:o.jsx(f,{initialState:{[e.HVEM_PLANLEGGER]:E,[e.ARBEIDSSITUASJON]:{status:_.JOBBER,jobberAnnenPart:!0},[e.OM_BARNET]:u,[e.HVOR_LANG_PERIODE]:{dekningsgrad:S.HUNDRE_PROSENT}},onDispatch:R,children:o.jsx(v,{stønadskontoer:P,locale:"nb"})})})),Br={title:"steg/FordelingSteg",component:v,render:D},t={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"}}},n={args:{hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_MEDMOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"}}},a={args:{hvemPlanlegger:{navnPåFar:"Petter Pjokk",navnPåMedfar:"Espen Utvikler",type:s.FAR_OG_FAR},omBarnet:{erFødsel:!1,fødselsdato:"2024-01-01",antallBarn:"2",overtakelsesdato:"2024-01-01"}}};var i,m,l;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(l=(m=t.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var p,d,F;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(F=(d=n.parameters)==null?void 0:d.docs)==null?void 0:F.source}}};var g,c,k;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(k=(c=a.parameters)==null?void 0:c.docs)==null?void 0:k.source}}};const Or=["FlereForsørgereEttBarn","FlereForsørgereToBarn","FarOgFar"];export{a as FarOgFar,t as FlereForsørgereEttBarn,n as FlereForsørgereToBarn,Or as __namedExportsOrder,Br as default};

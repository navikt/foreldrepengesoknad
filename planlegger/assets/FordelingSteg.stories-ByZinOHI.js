import{j as d}from"./jsx-runtime-Cw0GR0a5.js";import{a as M}from"./chunk-D5ZWXAHU-CGElDDNX.js";import{M as f,P as U,C as r}from"./usePlanleggerNavigator-Cm6vQNA1.js";import{P as h}from"./routes-gnI_NAHe.js";import{A as j}from"./Arbeidssituasjon-i2z_eSVB.js";import{D as s}from"./Dekningsgrad-Bg_cIyqc.js";import{S as l}from"./HvemPlanleggerUtils-CRuekH12.js";import{S as e}from"./Uttaksplan-Dl087Op2.js";import"./composeEventHandlers-CQxkItEI.js";import{i as b}from"./amplitude-CwVHyeVN.js";import{F as m}from"./FordelingSteg-qcx0AwUw.js";import"./index-CTjT7uj6.js";import"./v4-CQkTLCs1.js";import"./barnetUtils-DlK2ezHC.js";import"./barnType-CnRI8jWg.js";import"./_getTag-WD7lpBXy.js";import"./stringUtils-BLFzASq_.js";import"./validation-DdAZ_Aa2.js";import"./dateFormValidation-akPD_OBx.js";import"./VStack-CL9KkpXr.js";import"./Responsive-DXvSXsD0.js";import"./Briefcase-DdOvFoVc.js";import"./VeiviserPage-96q4z1iB.js";import"./index-BRV0Se7Z.js";import"./PlanleggerStepPage-CSYOuldx.js";import"./StepButtonsHookForm-Ve1Z7aVv.js";import"./index-BbmHap-z.js";import"./useDescendant-BRdZoW52.js";import"./ArrowLeft-DucJ29WA.js";import"./ArrowRight-DKhFa6bH.js";import"./customErrorFormatter-BAPWT5E-.js";import"./hvemHarRettUtils-DaTWCV6h.js";import"./uttakUtils-6UCupljg.js";import"./useScrollBehaviour-DHGEE0Vi.js";import"./Spacer-BW3tgveW.js";const i={100:{kontoer:[{konto:e.Mødrekvote,dager:75},{konto:e.Fedrekvote,dager:75},{konto:e.Fellesperiode,dager:80},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:e.Mødrekvote,dager:95},{konto:e.Fedrekvote,dager:95},{konto:e.Fellesperiode,dager:101},{konto:e.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},ve={title:"steg/FordelingSteg",component:m,render:({hvemPlanlegger:_,omBarnet:T,stønadskontoer:B,gåTilNesteSide:D=M("button-click"),dekningsgrad:A=s.HUNDRE_PROSENT,locale:N})=>(b(),d.jsx(f,{initialEntries:[h.FORDELING],children:d.jsx(U,{initialState:{[r.HVEM_PLANLEGGER]:_,[r.ARBEIDSSITUASJON]:{status:j.JOBBER,jobberAnnenPart:!0},[r.OM_BARNET]:T,[r.HVOR_LANG_PERIODE]:{dekningsgrad:A}},onDispatch:D,children:d.jsx(m,{stønadskontoer:B,locale:N})})}))},n={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},stønadskontoer:i}},t={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"},dekningsgrad:s.ÅTTI_PROSENT,stønadskontoer:i}},a={args:{locale:"nb",hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:l.MOR_OG_MEDMOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"},dekningsgrad:s.HUNDRE_PROSENT,stønadskontoer:i}},o={args:{locale:"nb",hvemPlanlegger:{navnPåFar:"Petter Pjokk",navnPåMedfar:"Espen Utvikler",type:l.FAR_OG_FAR},omBarnet:{erFødsel:!1,fødselsdato:"2024-01-01",antallBarn:"2",overtakelsesdato:"2024-01-01"},dekningsgrad:s.HUNDRE_PROSENT,stønadskontoer:i}};var g,p,F;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(F=(p=n.parameters)==null?void 0:p.docs)==null?void 0:F.source}}};var k,c,v;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(v=(c=t.parameters)==null?void 0:c.docs)==null?void 0:v.source}}};var P,E,O;a.parameters={...a.parameters,docs:{...(P=a.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(O=(E=a.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var R,u,S;o.parameters={...o.parameters,docs:{...(R=o.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(S=(u=o.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};const Pe=["FlereForsørgereEttBarn","FlereForsørgereEttBarn80ProsentDekningsgrad","FlereForsørgereToBarn","FarOgFar"];export{o as FarOgFar,n as FlereForsørgereEttBarn,t as FlereForsørgereEttBarn80ProsentDekningsgrad,a as FlereForsørgereToBarn,Pe as __namedExportsOrder,ve as default};

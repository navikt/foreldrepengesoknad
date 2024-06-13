import{j as o}from"./jsx-runtime-_e34SzbC.js";import{a as B}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{M as O,P as f,C as e}from"./usePlanleggerNavigator-BZ6Y1tld.js";import{P as M}from"./routes-Cp-2uEwO.js";import{i as x,A as _}from"./Arbeidssituasjon-rAW6RSqH.js";import{D as S}from"./Dekningsgrad-Bg_cIyqc.js";import{S as s}from"./HvemPlanleggerUtils-CHTffTZd.js";import{S as r}from"./uttakUtils-DxdAnUVc.js";import"./Uttaksdagen-oR0d4Gua.js";import{F as c}from"./FordelingSteg-BcFYS4c-.js";import"./index-DVXBtNgz.js";import"./v4-CQkTLCs1.js";import"./barnetUtils-Dtg6gkcN.js";import"./amplitude.esm-BThBy0fb.js";import"./GreenPanel-h__UB972.js";import"./Box-DGewKQma.js";import"./clsx-B-dksMZM.js";import"./css-CqApuV4H.js";import"./Infobox-4DkbJ68c.js";import"./IconCircleWrapper-C8foAhsL.js";import"./VStack-DzX3uTsq.js";import"./Label-DFEFJLqZ.js";import"./PlanleggerStepPage-IAHPTAH1.js";import"./GreenHeading-B5QLwpFd.js";import"./index-Bomzi5Jd.js";import"./tslib.es6-pJfR_DrR.js";import"./infobox.module-BJ80kPYT.js";import"./Button-DG980N3E.js";import"./useId-BuMKUBu9.js";import"./useId-DbilmxAP.js";import"./index-Dcs0RV0A.js";import"./ChevronDown-CcwFV5Ek.js";import"./PlanleggerPage-BF_Tk5Tl.js";import"./StepButtonsHookForm-DkEHdO1U.js";import"./Select-Dt8IwbBp.js";import"./Calendar-DfqO_VWn.js";import"./index-Cbx7Fas8.js";import"./Responsive-CUg94mp6.js";import"./ArrowLeft-CBeUisJv.js";import"./ArrowRight-BQL9b638.js";import"./hvemHarRettUtils-DP-A7Fyr.js";import"./useScrollBehaviour-WVMBWXos.js";import"./Spacer-CmfZYR-2.js";const A={100:{kontoer:[{konto:r.Mødrekvote,dager:75},{konto:r.Fedrekvote,dager:75},{konto:r.Fellesperiode,dager:80},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}},80:{kontoer:[{konto:r.Mødrekvote,dager:95},{konto:r.Fedrekvote,dager:95},{konto:r.Fellesperiode,dager:90},{konto:r.ForeldrepengerFørFødsel,dager:15}],minsteretter:{farRundtFødsel:0,toTette:0}}},D=({hvemPlanlegger:E,omBarnet:u,stønadskontoer:P=A,gåTilNesteSide:R=B("button-click")})=>(x(),o.jsx(O,{initialEntries:[M.FORDELING],children:o.jsx(f,{initialState:{[e.HVEM_PLANLEGGER]:E,[e.ARBEIDSSITUASJON]:{status:_.JOBBER,jobberAnnenPart:!0},[e.OM_BARNET]:u,[e.HVOR_LANG_PERIODE]:{dekningsgrad:S.HUNDRE_PROSENT}},onDispatch:R,children:o.jsx(c,{stønadskontoer:P})})})),Pr={title:"steg/FordelingSteg",component:c,render:D},t={args:{hvemPlanlegger:{navnPåFar:"Espen Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_FAR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"1"}}},n={args:{hvemPlanlegger:{navnPåMedmor:"Esther Utvikler",navnPåMor:"Klara Utvikler",type:s.MOR_OG_MEDMOR},omBarnet:{erBarnetFødt:!1,erFødsel:!0,termindato:"2024-01-01",antallBarn:"2"}}},a={args:{hvemPlanlegger:{navnPåFar:"Petter Pjokk",navnPåMedfar:"Espen Utvikler",type:s.FAR_OG_FAR},omBarnet:{erFødsel:!1,fødselsdato:"2024-01-01",antallBarn:"2",overtakelsesdato:"2024-01-01"}}};var i,m,l;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(F=(d=n.parameters)==null?void 0:d.docs)==null?void 0:F.source}}};var g,k,v;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(v=(k=a.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};const Rr=["FlereForsørgereEttBarn","FlereForsørgereToBarn","FarOgFar"];export{a as FarOgFar,t as FlereForsørgereEttBarn,n as FlereForsørgereToBarn,Rr as __namedExportsOrder,Pr as default};
